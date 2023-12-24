import { useContext, useEffect, useState } from 'react';
import { GloablStateContext } from '@/context';
import { Form } from 'antd';
import { DragOutlined } from '@ant-design/icons';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { SKETCH_ID } from '@/utils/constants';
import { getGlobalEditor } from '@/utils/global';
import OpacitySetter from '@/fabritor/components/OpacitySetter';
import { DRAG_ICON } from '@/assets/icon';
import BaseInfo from '../../header/BaseInfo';

const { Item: FormItem } = Form;

export default function CommonSetter () {
  const { object, isReady } = useContext(GloablStateContext);
  const [lock, setLock] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [panEnable, setPanEnable] = useState(false);

  const handleLock = () => {
    const editor = getGlobalEditor();
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
    const editor = getGlobalEditor();
    object.set('opacity', v);
    setOpacity(v);
    editor.canvas.requestRenderAll();
    editor.fireCustomModifiedEvent();
  }

  const enablePan = () => {
    const editor = getGlobalEditor();
    const enable = editor.switchEnablePan();
    setPanEnable(enable);
  }

  useEffect(() => {
    if (object) {
      setLock(object?.lockMovementX);
      setOpacity(object?.opacity);
    }
  }, [object]);

  return (
    <>
      <Form
        layout="inline"
        className="fabritor-toolbar-form-text"
      >
        {
          object && object.id !== SKETCH_ID ?
          <FormItem>
            <span className="fabritor-toolbar-setter-trigger" onClick={handleLock}>
              {
                lock ? 
                <UnlockOutlined style={{ fontSize: 22 }} /> :
                <LockOutlined style={{ fontSize: 22 }} />
              }
            </span>
          </FormItem> : null
        }
        {
          object && object.id !== SKETCH_ID ?
          <FormItem>
            <OpacitySetter value={opacity} onChange={handleOpacity} />
          </FormItem> : null
        }
      </Form>
      <Form
        layout="inline"
        className="fabritor-toolbar-form-text"
        style={{ marginLeft: 'auto' }}
      >
        <FormItem>
          <span className="fabritor-toolbar-setter-trigger" onClick={enablePan}>
            {
              panEnable? 
              <DragOutlined style={{ fontSize: 22, color: panEnable ? '#000' : '#ccc' }} /> :
              <img src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(DRAG_ICON)}`} style={{ width: 22, height: 22 }} />
            }
          </span>
        </FormItem>
        {
          isReady ?
          <FormItem>
            <BaseInfo />
          </FormItem> : null
        }
      </Form>
    </>
  )
}