import { Flex, List } from 'antd';
import { getGlobalEditor } from '@/utils/global';
import { useEffect, useContext, useState } from 'react';
import { GloablStateContext } from '@/context';
import { SKETCH_ID } from '@/utils/constants';
import { GroupOutlined } from '@ant-design/icons';
import ContextMenu from '@/fabritor/components/ContextMenu';

export default function Layer () {
  const { isReady, object: activeObject } = useContext(GloablStateContext);
  const [layers, setLayers] = useState([]);

  const getCanvasLayers = (objects) => {
    const _layers: any = [];
    const length = objects.length;
    if (!length) {
      setLayers([]);
      return;
    }
    for (let i = length - 1; i >= 0; i--) {
      let object = objects[i];
      if (object && object.id !== SKETCH_ID) {
        _layers.push({
          cover: object.toDataURL(),
          group: object.type === 'group',
          object
        });
      }
    }
    setLayers(_layers);
  }

  const handleLayerChange = () => {
    const editor = getGlobalEditor();
    const co = editor.canvas.getActiveObject();
    const index = layers.findIndex(item => item.object === co);
    if (index === -1) {
      getCanvasLayers(editor.canvas.getObjects());
      return;
    }
    if (co) {
      const _layers: any = [...layers];
      _layers.splice(index, 1, {
        cover: co.toDataURL({}),
        group: co.type === 'group',
        object: co
      });
      setLayers(_layers);
    }
  }

  const handleItemClick = (item) => {
    const editor = getGlobalEditor();
    editor.canvas.discardActiveObject();
    editor.canvas.setActiveObject(item.object);
    editor.canvas.requestRenderAll();
  }

  useEffect(() => {
    let canvas;
    const initCanvasLayers = () => { getCanvasLayers(canvas.getObjects()); }

    if (isReady) {
      setLayers([]);
      const editor = getGlobalEditor();
      canvas = editor.canvas;
      initCanvasLayers();

      canvas.on({
        'object:added': handleLayerChange,
        'object:removed': handleLayerChange,
        'object:modified': handleLayerChange,
        'object:skewing': handleLayerChange,
        'fabritor:object:modified': handleLayerChange
      });
    }

    return () => {
      if (canvas) {
        canvas.off({
          'object:added': handleLayerChange,
          'object:removed':handleLayerChange,
          'object:modified': handleLayerChange,
          'object:skewing': handleLayerChange,
          'fabritor:object:modified': handleLayerChange
        });
      }
    }
  }, [isReady]);

  return (
    <div className="fabritor-panel-template-wrapper" style={{ paddingTop: 0 }}>
      <List
        dataSource={layers}
        renderItem={(item: any) => (
          <ContextMenu object={item.object} noCareOpen>
            <List.Item
              className="fabritor-panel-layer-item"
              style={{
                border: activeObject === item.object ? ' 2px solid #ff2222' : '2px solid transparent',
                padding: '10px 16px'
              }}
              onClick={() => { handleItemClick(item) }}
            >
              <Flex justify="space-between" align="center" style={{ width: '100%', height: 40 }}>
                <img src={item.cover} style={{ maxWidth: 200, maxHeight: 34 }} />
                {
                  item.group ?
                  <GroupOutlined style={{ fontSize: 18, color: 'rgba(17, 23, 29, 0.6)' }} /> : null
                }
              </Flex>
            </List.Item>
          </ContextMenu>
        )}
      />
    </div>
  )
}