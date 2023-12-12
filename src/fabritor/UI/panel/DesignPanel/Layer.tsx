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
    const editor = getGlobalEditor();
    const _layers: any = [];
    const length = objects.length;
    if (!length) {
      setLayers([]);
      return;
    }
    const activeObject = editor.canvas.getActiveObject();
    for (let i = length - 1; i >= 0; i--) {
      let object = objects[i];
      if (object && object.id !== SKETCH_ID) {
        if (activeObject === object) {
          object.__cover = object.toDataURL();
        } else {
          if (!object.__cover) {
            object.__cover = object.toDataURL();
          }
        }

        _layers.push({
          cover: object.__cover,
          group: object.type === 'group',
          object
        });
      }
    }
    setLayers(_layers);
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
        'object:added': initCanvasLayers,
        'object:removed': initCanvasLayers,
        'object:modified': initCanvasLayers,
        'object:skewing': initCanvasLayers,
        'fabritor:object:modified': initCanvasLayers
      });
    }

    return () => {
      if (canvas) {
        canvas.off({
          'object:added': initCanvasLayers,
          'object:removed':initCanvasLayers,
          'object:modified': initCanvasLayers,
          'object:skewing': initCanvasLayers,
          'fabritor:object:modified': initCanvasLayers
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