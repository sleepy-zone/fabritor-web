import { useRef, useContext } from 'react';
import { Button } from 'antd';
import LocalFileSelector from '@/fabritor/components/LocalFileSelector';
import { getGlobalEditor } from '@/utils/global';
import { GloablStateContext } from '@/context';
import Title from '@/fabritor/components/Title';

export default function TemplatePanel () {
  const localFileSelectorRef = useRef<any>(null);
  const { setReady } = useContext(GloablStateContext);

  const startLoad = () => {
    localFileSelectorRef.current?.start?.();
  }

  const handleFileChange = (file) => {
    setReady(false);
    const editor = getGlobalEditor();
    const reader = new FileReader();
    editor.canvas.discardActiveObject();
    reader.onload = (async (evt) => {
      const json = evt.target?.result as string;
      if (json) {
        await editor.loadFromJSON(json);
        setReady(true);
      }
    });
    reader.readAsText(file);
  }

  return (
    <div className="fabritor-panel-text-wrapper">
      <Button type="primary" block onClick={startLoad} size="large">
        加载本地模板
      </Button>
      <Title>选择一个模板开始</Title>
      <LocalFileSelector ref={localFileSelectorRef} accept="application/json" onChange={handleFileChange} />
    </div>
  )
}