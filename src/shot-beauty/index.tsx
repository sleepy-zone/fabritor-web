import { fabric } from 'fabric';
import { useEffect, useRef, useState } from 'react';
import { Layout, Spin } from 'antd';
import Editor from '@/editor';
import { setGlobalEditor } from '@/utils/global';
import { GloablStateContext } from '@/context';
import ToolTip from '../fabritor/components/ToolTip';
import Header from './header';
import Panel from './panel';
import Setter from './setter';

const { Content } = Layout;

const workspaceStyle: React.CSSProperties = {
  background: '#eeeeee',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  flex: 1
}

const contentStyle: React.CSSProperties = {
  display: 'flex',
  height: '100%'
}

export default function Fabritor () {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const workspaceEl = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Editor | null>();
  const [activeObject, setActiveObject] = useState<fabric.Object | null | undefined>(null);
  const [isReady, setReady] = useState(false);
  const [fxType, setFxType] = useState('');
  const rotateAngleTipRef = useRef<any>(null);

  const selectionHandler = (opt) => {
    const { selected } = opt;
    if (selected && selected.length) {
      const selection = editorRef.current?.canvas.getActiveObject();
      setActiveObject(selection);
    } else {
      // @ts-ignore
      setActiveObject(editorRef.current?.sketch);
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

  const preventContextMenu = (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    setTimeout(async () => {
      const editor = new Editor({
        canvasEl: canvasEl.current,
        workspaceEl: workspaceEl.current,
        selection: false,
        fireRightClick: false,
        backgroundColor: '#eeeeee',
        storageLocal: false,
        withHistory: false,
        template: {
          width: 1280,
          height: 800,
          fabritor_desc: 'My_ShotBeauty',
          fill: new fabric.Gradient({
            type: 'linear',
            gradientUnits: 'percentage',
            coords: { x1: 0, y1: 0, x2: 1, y2: 0 },
            colorStops: [{ offset: 0, color: '#f3b7ad' }, { offset: 1, color: '#fad4a6' }]
          })
        },
        sketchEventHandler: {
          mouseupHandler,
          selectionHandler,
          rotateHandler
        }
      });
  
      await editor.init();
      editorRef.current = editor;
      setGlobalEditor(editor);
      setReady(true);
      setActiveObject(editor.sketch);
    }, 300);

    document.addEventListener('contextmenu', preventContextMenu);

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }

      document.removeEventListener('contextmenu', preventContextMenu);
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
        setFxType
      }}
    >
      <Layout style={{ height: '100%' }} className="fabritor-layout">
        <Spin spinning={!isReady} fullscreen />
        <ToolTip ref={rotateAngleTipRef} />
        <Header />
        <Layout>
          <Panel />
          <Content style={contentStyle}>
            <div style={workspaceStyle} ref={workspaceEl} className="fabritor-workspace">
              <canvas ref={canvasEl} />
            </div>
          </Content>
          <Setter />
        </Layout>
      </Layout>
    </GloablStateContext.Provider>
  )
}