import { createContext, useEffect, useRef, useState } from 'react';
import { Layout } from 'antd';
import Header from './UI/header';
import Panel from './UI/panel';
import Setter from './UI/setter';
import Editor from '@/editor';
import { setGlobalEditor } from '@/utils/global';
import { GloablStateContext } from '@/context';

import '../font.css';

const { Content } = Layout;

const workspaceStyle = {
  background: '#ddd',
  width: '100%',
  height: '100%'
}

export default function Fabritor () {
  const canvasEl = useRef<HTMLCanvasElement>();
  const workspaceEl = useRef<HTMLDivElement>();
  const editorRef = useRef<Editor | null>();
  const [activeObject, setActiveObject] = useState<fabric.Object | null>();

  const clickHandler = (opt) => {
    const { target } = opt;
    if (!target || target.id === 'fabritor-sketch') {
      setActiveObject(null);
      return;
    }
    setActiveObject(target);
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
        setActiveObject
      }}
    >
      <Layout style={{ height: '100%' }} className="fabritor-layout">
        <Header />
        <Layout>
          <Panel />
          <Content>
            <div style={workspaceStyle} ref={workspaceEl}>
              <canvas ref={canvasEl} />
            </div>
          </Content>
          <Setter />
        </Layout>
      </Layout>
    </GloablStateContext.Provider>
  )
}