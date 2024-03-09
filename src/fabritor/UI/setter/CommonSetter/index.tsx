import { useContext, useEffect, useState } from 'react';
import { GloablStateContext } from '@/context';
import { LockOutlined, UnlockOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import { SKETCH_ID } from '@/utils/constants';
import OpacitySetter from './OpacitySetter';
import ToolbarItem from '../../header/Toolbar/ToolbarItem';
import { CenterV } from '@/fabritor/components/Center';
import { copyObject, pasteObject, removeObject } from '@/utils/helper';
import FlipSetter from './FlipSetter';

export default function CommonSetter () {
  const { object, editor } = useContext(GloablStateContext);
  const [lock, setLock] = useState(false);
  const [opacity, setOpacity] = useState(1);

  const handleLock = () => {
    object.set({
      lockMovementX: !lock,
      lockMovementY: !lock,
      hasControls: !!lock
    });
    editor.canvas.requestRenderAll();
    setLock(!lock);
    editor.fireCustomModifiedEvent();
  }

  const handleOpacity = (v) => {
    object.set('opacity', v);
    setOpacity(v);
    editor.canvas.requestRenderAll();
    editor.fireCustomModifiedEvent();
  }

  const handleFlip = (key) => {
    object.set(key, !object[key]);
    editor.canvas.requestRenderAll();
    editor.fireCustomModifiedEvent();
  }

  useEffect(() => {
    if (object) {
      setLock(object.lockMovementX);
      setOpacity(object.opacity);
    }
  }, [object]);

  if (!object || object.id === SKETCH_ID) return null;

  return (
    <>
      <CenterV gap={8} justify="space-between">
        <ToolbarItem tooltipProps={{ placement: 'top' }} onClick={handleLock} title={lock ? '解锁' : '锁定'}>
          {
            lock ? 
            <UnlockOutlined style={{ fontSize: 20 }} /> :
            <LockOutlined style={{ fontSize: 20 }} />
          }
        </ToolbarItem>
        <ToolbarItem tooltipProps={{ placement: 'top' }} title="透明度">
          <OpacitySetter value={opacity} onChange={handleOpacity} />
        </ToolbarItem>
        <ToolbarItem
          tooltipProps={{ placement: 'top' }}
          title="创建副本"
          onClick={
            async () => {
              await copyObject(editor.canvas, object);
              await pasteObject(editor.canvas);
            }
          }
        >
          <CopyOutlined style={{ fontSize: 20 }} />
        </ToolbarItem>
        <ToolbarItem
          tooltipProps={{ placement: 'top' }}
          title="删除"
          onClick={() => { removeObject(null, editor.canvas); }}
        >
          <DeleteOutlined style={{ fontSize: 20 }} />
        </ToolbarItem>
        {
          object.type === 'f-image' ?
          <ToolbarItem
            tooltipProps={{ placement: 'top' }}
            title="翻转"
          >
            <FlipSetter onChange={handleFlip} />
          </ToolbarItem> : null
        }
      </CenterV>
    </>
  )
}