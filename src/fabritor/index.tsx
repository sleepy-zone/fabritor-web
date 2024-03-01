import { fabric } from 'fabric';
import { useEffect, useRef, useState } from 'react';
import { Layout, Spin } from 'antd';
import Panel from './UI/panel';
import Toolbar from './UI/toolbar';
import Editor from '@/editor';
import { GloablStateContext } from '@/context';
import ContextMenu from './components/ContextMenu';
import { SKETCH_ID } from '@/utils/constants';
import ToolTip from './components/ToolTip';
import Export from './UI/header/Export';

import '../font.css';

const { Content } = Layout;

const workspaceStyle: React.CSSProperties = {
  background: '#ddd',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  flex: 1
}

const contentStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
}

export default function Fabritor () {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const workspaceEl = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<Editor | null>(null);
  const [activeObject, setActiveObject] = useState<fabric.Object | null | undefined>(null);
  const [isReady, setReady] = useState(false);
  const [fxType, setFxType] = useState('');
  const contextMenuRef = useRef<any>(null);
  const rotateAngleTipRef = useRef<any>(null);

  const clickHandler = (opt) => {
    const { target } = opt;
    if (!target) {
      contextMenuRef.current?.hide();
      return;
    }

    if (opt.button === 3) { // 右键
      if (target.id !== SKETCH_ID) {
        editor?.canvas.setActiveObject(target);
      }
      setTimeout(() => {
        contextMenuRef.current?.show();
      }, 50);
    } else {
      contextMenuRef.current?.hide();
    }
  }

  const selectionHandler = (opt) => {
    const { selected } = opt;
    if (selected && selected.length) {
      const selection = editor?.canvas.getActiveObject();
      setActiveObject(selection);
    } else {
      // @ts-ignore
      setActiveObject(editor?.sketch);
    }
  }

  const rotateHandler = (opt) => {
    const { target, e } = opt;
    rotateAngleTipRef.current.show({
      left: e.pageX + 16,
      top: e.pageY
    }, `${Math.round(target.angle)}°`);
  }

  const mouseupHandler = () => {
    rotateAngleTipRef.current.close();
  }

  useEffect(() => {
    setTimeout(async () => {
      const _editor = new Editor({
        canvasEl: canvasEl.current,
        workspaceEl: workspaceEl.current,
        sketchEventHandler: {
          clickHandler,
          mouseupHandler,
          selectionHandler,
          rotateHandler,
          groupHandler: () => { setActiveObject(editor?.canvas.getActiveObject()) }
        }
      });
  
      await _editor.init();
      setEditor(_editor);
      setReady(true);
      setActiveObject(_editor.sketch);
    }, 300);

    return () => {
      if (editor) {
        editor.destroy();
      }
    }
  }, []);

  return (
    <GloablStateContext.Provider
      value={{
        object: activeObject,
        setActiveObject,
        isReady,
        setReady,
        fxType,
        setFxType,
        editor
      }}
    >
      <Layout style={{ height: '100%' }} className="fabritor-layout">
        <Spin spinning={!isReady} fullscreen />
        <ToolTip ref={rotateAngleTipRef} />
        <Export />
        <Layout>
          <Panel />
          <Content style={contentStyle}>
            <Toolbar />
            <ContextMenu ref={contextMenuRef} object={activeObject}>
              <div style={workspaceStyle} ref={workspaceEl} className="fabritor-workspace">
                <canvas ref={canvasEl} />
              </div>
            </ContextMenu>
          </Content>
        </Layout>
      </Layout>
    </GloablStateContext.Provider>
  )
}