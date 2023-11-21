import ToolbarDivider from '@/fabritor/components/ToolbarDivider';
import { useContext, useEffect, useState } from 'react';
import { GloablStateContext } from '@/context';
import { Form } from 'antd';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { SKETCH_ID } from '@/utils/constants';
import { getGlobalEditor } from '@/utils/global';

const { Item: FormItem } = Form;

export default function CommonSetter () {
  const { object } = useContext(GloablStateContext);
  const [lock, setLock] = useState(false);

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

  useEffect(() => {
    if (object) {
      setLock(object?.lockMovementX);
    }
  }, [object]);

  if (!object) return null;

  return (
    <Form
      layout="inline"
      className="fabritor-toolbar-form-text"
    >
      {
        object.type !== 'activeSelection' && object.id !== SKETCH_ID ?
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
    </Form>
  )
}