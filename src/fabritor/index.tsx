import { useEffect, useRef } from 'react';
import { Layout } from 'antd';
import Header from './UI/header';
import Panel from './UI/panel';
import Setter from './UI/setter';
import Editor from '@/editor';
import { setGlobalEditor } from '@/utils/global';

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

  useEffect(() => {
    setTimeout(() => {
      const editor = new Editor({
        canvasEl: canvasEl.current,
        workspaceEl: workspaceEl.current
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
  )
}