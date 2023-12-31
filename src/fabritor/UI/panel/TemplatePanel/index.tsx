import { useRef, useContext, useEffect, useState } from 'react';
import { Button } from 'antd';
import LocalFileSelector from '@/fabritor/components/LocalFileSelector';
import { getGlobalEditor } from '@/utils/global';
import { GloablStateContext } from '@/context';
import Title from '@/fabritor/components/Title';
import getTemplateList, { getTemplate } from './template-list';
import FallList from '@/fabritor/components/FallList';

export default function TemplatePanel (props) {
  const { onLoadTpl } = props;
  const localFileSelectorRef = useRef<any>(null);
  const { isReady, setReady, setActiveObject } = useContext(GloablStateContext);
  const [tList, setTList] = useState([]);

  const startLoad = () => {
    localFileSelectorRef.current?.start?.();
  }

  const handleFileChange = (file) => {
    if (!isReady) return;
    setReady(false);
    const editor = getGlobalEditor();
    editor.canSaveLocal = false;
    const reader = new FileReader();
    editor.canvas.discardActiveObject();
    reader.onload = (async (evt) => {
      const json = evt.target?.result as string;
      if (json) {
        await editor.loadFromJSON(json, true);
        setReady(true);
        onLoadTpl();
        setActiveObject(editor.sketch);
      }
      editor.canSaveLocal = true;
    });
    reader.readAsText(file);
  }

  const handleLoadTemplate = async (item) => {
    if (!isReady) return;
    const editor = getGlobalEditor();
    setReady(false);
    editor.canSaveLocal = false;
    const json = await getTemplate(item.url);
    await editor.loadFromJSON(json, true);
    onLoadTpl();
    setActiveObject(editor.sketch);
    setReady(true);
    editor.canSaveLocal = true;
  }

  useEffect(() => {
    getTemplateList().then((res) => {
      setTList(res);
    }).catch(() => {});
  }, []);

  return (
    <div className="fabritor-panel-template-wrapper" style={{ paddingTop: 0 }}>
      <Button type="primary" block onClick={startLoad} size="large">
        加载本地模板
      </Button>
      <Title>选择一个模板开始</Title>
      <FallList list={tList} itemClick={handleLoadTemplate} />
      <LocalFileSelector ref={localFileSelectorRef} accept="application/json" onChange={handleFileChange} />
    </div>
  )
}