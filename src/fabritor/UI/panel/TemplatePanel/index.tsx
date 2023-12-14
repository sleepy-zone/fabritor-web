import { useRef, useContext, useEffect, useState } from 'react';
import { Button, Flex, Card } from 'antd';
import LocalFileSelector from '@/fabritor/components/LocalFileSelector';
import { getGlobalEditor } from '@/utils/global';
import { GloablStateContext } from '@/context';
import Title from '@/fabritor/components/Title';
import getTemplateList, { getTemplate } from './template-list';

export default function TemplatePanel (props) {
  const { onLoadTpl } = props;
  const localFileSelectorRef = useRef<any>(null);
  const { isReady, setReady } = useContext(GloablStateContext);
  const [templateList, setTemplateList] = useState([]);

  const startLoad = () => {
    localFileSelectorRef.current?.start?.();
  }

  const handleFileChange = (file) => {
    if (!isReady) return;
    setReady(false);
    const editor = getGlobalEditor();
    const reader = new FileReader();
    editor.canvas.discardActiveObject();
    reader.onload = (async (evt) => {
      const json = evt.target?.result as string;
      if (json) {
        await editor.loadFromJSON(json, true);
        setReady(true);
        onLoadTpl();
      }
    });
    reader.readAsText(file);
  }

  const handleLoadTemplate = async (item) => {
    if (!isReady) return;
    const editor = getGlobalEditor();
    setReady(false);
    const json = await getTemplate(item.url);
    await editor.loadFromJSON(json, true);
    onLoadTpl();
    setReady(true);
  }

  useEffect(() => {
    getTemplateList().then((res) => {
      setTemplateList(res);
    }).catch(() => {
      setTemplateList([]);
    });
  }, []);

  return (
    <div className="fabritor-panel-template-wrapper" style={{ paddingTop: 0 }}>
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
              key={item.url}
              cover={
                <img
                  src={item.cover} 
                />
              }
              onClick={() => { handleLoadTemplate(item) }}
            >
              <Card.Meta description={item.title} />
            </Card>
          ))
        }
      </Flex>
      <LocalFileSelector ref={localFileSelectorRef} accept="application/json" onChange={handleFileChange} />
    </div>
  )
}