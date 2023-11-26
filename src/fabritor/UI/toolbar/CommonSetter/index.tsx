import { useContext, useEffect, useState } from 'react';
import { GloablStateContext } from '@/context';
import { Form } from 'antd';
import { DragOutlined } from '@ant-design/icons';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { SKETCH_ID } from '@/utils/constants';
import { getGlobalEditor } from '@/utils/global';
import OpacitySetter from '@/fabritor/components/OpacitySetter';

const { Item: FormItem } = Form;

export default function CommonSetter () {
  const { object, setActiveObject } = useContext(GloablStateContext);
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
  }

  const handleOpacity = (v) => {
    const editor = getGlobalEditor();
    object.set('opacity', v);
    setOpacity(v);
    editor.canvas.requestRenderAll();
  }

  const enablePan = () => {
    const editor = getGlobalEditor();
    const enable = editor.switchEnablePan();
    setPanEnable(enable);
    if (enable) {
      setActiveObject(null);
    }
  }

  useEffect(() => {
    if (object) {
      setLock(object?.lockMovementX);
    }
  }, [object]);

  return (
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
      <FormItem>
        <span className="fabritor-toolbar-setter-trigger" onClick={enablePan}>
          {
            panEnable? 
            <DragOutlined style={{ fontSize: 22, color: panEnable ? '#000' : '#ccc' }} /> :
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4941" width="22" height="22"><path d="M630.57970569 637.6867208l110.35938764 236.66748681c6.20083831 13.29490805 0.44014302 29.08827497-12.84181964 35.28911328l-96.26186588 44.88164187c-13.29490805 6.20083831-29.08827497 0.45308839-35.28911329-12.84181965l-112.87079191-242.05276602-138.77450271 138.77450272c-10.36925155 10.36925155-27.17235831 10.36925155-37.54160987 0.01294537a26.56392533 26.56392533 0 0 1-7.78017501-18.78375032V147.18616969c0-14.66711861 11.88386133-26.55097995 26.55097995-26.55097996 6.60214518 0 12.97127348 2.45962272 17.86462814 6.89988899l494.18998519 449.26950715c10.84823072 9.86438163 11.65084445 26.65454302 1.78646281 37.50277374a26.56004172 26.56004172 0 0 1-17.6057205 8.6086795L630.57970569 637.6867208z" p-id="4942" fill="#2c2c2c"></path></svg>
          }
        </span>
      </FormItem>
    </Form>
  )
}