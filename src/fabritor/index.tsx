import { useEffect, useRef, useState } from 'react';
import { Layout, Spin } from 'antd';
import Header from './UI/header';
import Panel from './UI/panel';
import Setter from './UI/setter';
import Editor from '@/editor';
import { setGlobalEditor } from '@/utils/global';
import { GloablStateContext } from '@/context';

import '../font.css';
import { SKETCH_ID } from '@/utils/constants';
import ContextMenu from './components/ContextMenu';

const { Content } = Layout;

const workspaceStyle = {
  background: '#ddd',
  width: '100%',
  height: '100%'
}

export default function Fabritor () {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const workspaceEl = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Editor | null>();
  const [activeObject, setActiveObject] = useState<fabric.Object | null>();
  const [isReady, setReady] = useState(false);
  const contextMenuRef = useRef<any>(null);

  const clickHandler = (opt) => {
    const { target } = opt;
    if (!target) {
      setActiveObject(null);
      contextMenuRef.current?.hide();
      return;
    }
    setActiveObject(target);

    if (opt.button === 3) {
      if (target.id !== SKETCH_ID) {
        editorRef.current?.canvas.setActiveObject(target);
      }
      setTimeout(() => {
        contextMenuRef.current?.show();
      }, 50);
    } else {
      contextMenuRef.current?.hide();
    }
  }

  useEffect(() => {
    setTimeout(() => {
      const editor = new Editor({
        canvasEl: canvasEl.current,
        workspaceEl: workspaceEl.current,
        sketchEventHandler: {
          clickHandler,
          cloneHandler: (opt) => { setActiveObject(opt.target) },
          delHandler: () => { setActiveObject(null) }
        }
      });
  
      editorRef.current = editor;
      setGlobalEditor(editor);
      setReady(true);
    }, 300);

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    }
  }, []);

  return (
    <GloablStateContext.Provider
      value={{
        object: activeObject,
        setActiveObject,
        isReady,
        setReady
      }}
    >
      <Layout style={{ height: '100%' }} className="fabritor-layout">
        <Spin spinning={!isReady} fullscreen />
        <Header />
        <Layout>
          <Panel />
          <Content>
            <ContextMenu ref={contextMenuRef}>
              <div style={workspaceStyle} ref={workspaceEl}>
                <canvas ref={canvasEl} />
              </div>
            </ContextMenu>
          </Content>
          <Setter />
        </Layout>
      </Layout>
    </GloablStateContext.Provider>
  )
}