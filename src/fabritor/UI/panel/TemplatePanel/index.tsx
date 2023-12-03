import { useRef, useContext } from 'react';
import { Button, Flex, Card } from 'antd';
import LocalFileSelector from '@/fabritor/components/LocalFileSelector';
import { getGlobalEditor } from '@/utils/global';
import { GloablStateContext } from '@/context';
import Title from '@/fabritor/components/Title';
import templateList from './template-list';

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
        await editor.loadFromJSON(json, true);
        setReady(true);
      }
    });
    reader.readAsText(file);
  }

  const handleLoadTemplate = async (item) => {
    const editor = getGlobalEditor();
    setReady(false);
    await editor.loadFromJSON(item.template, true);
    setReady(true);
  }

  return (
    <div className="fabritor-panel-text-wrapper fabritor-panel-template-wrapper">
      <Button type="primary" block onClick={startLoad} size="large">
        加载本地模板
      </Button>
      <Title>选择一个模板开始</Title>
      <Flex gap={10} wrap="wrap" justify="space-around">
        {
          templateList.map(item => (
            <Card
              hoverable
              style={{ width: 140 }}
              key={item.key}
              cover={
                <img
                  src={item.preview} 
                />
              }
              onClick={() => { handleLoadTemplate(item) }}
            >
              <Card.Meta description={item.desc} />
            </Card>
          ))
        }
      </Flex>
      <LocalFileSelector ref={localFileSelectorRef} accept="application/json" onChange={handleFileChange} />
    </div>
  )
}