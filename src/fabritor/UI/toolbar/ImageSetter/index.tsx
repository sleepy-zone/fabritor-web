import { useContext, useEffect } from 'react';
import { Form } from 'antd';
import ToolbarDivider from '@/fabritor/components/ToolbarDivider';
import ReplaceSetter from './ReplaceSetter';
import { GloablStateContext } from '@/context';
import FlipSetter from './FlipSetter';
import { getGlobalEditor } from '@/utils/global';
import BorderSetter from './BorderSetter';
import ClipSetter from './Clip';
import { createClipRect } from '@/editor/image';

const { Item: FormItem } = Form;

export default function ImageSetter () {
  const { object } = useContext(GloablStateContext);
  const [form] = Form.useForm();

  const handleImageReplace = (base64) => {
    const editor = getGlobalEditor();
    if (base64) {
      object.set('pattern', null);
      object.setSrc(base64, () => {
        editor.canvas.requestRenderAll();
        object.setCoords();
      });
    }
  }

  const handleBorder = (border) => {
    const editor = getGlobalEditor();
    const { borderRadius } = border || {};

    const c = createClipRect(object, { rx: borderRadius, ry: borderRadius });
    object.set('clipPath', c);

    editor.canvas.requestRenderAll();
  }

  const handleValuesChange = (values) => {
    const editor = getGlobalEditor();
    if (values.img) {
      handleImageReplace(values.img);
    }
    if (values.flip) {
      object.set(values.flip, !object[values.flip]);
      editor.canvas.requestRenderAll();
    }
    if (values.border) {
      handleBorder(values.border);
    }
    editor.fireCustomModifiedEvent();
  }

  useEffect(() => {
    if (object) {
      form.setFieldsValue({
        border: {
          borderRadius: object.clipPath?.rx || 0
        },
        opacity: object.opacity
      });
    }
  }, [object]);

  return (
    <Form
      layout="inline"
      form={form}
      onValuesChange={handleValuesChange}
      className="fabritor-toolbar-form"
    >
      <FormItem name="img">
        <ReplaceSetter />
      </FormItem>
      <ToolbarDivider />
      <FormItem name="flip">
        <FlipSetter />
      </FormItem>
      <ToolbarDivider />
      <FormItem name="border">
        <BorderSetter />
      </FormItem>
      <ToolbarDivider />
      <FormItem>
        <ClipSetter object={object} />
      </FormItem>
      <ToolbarDivider />
    </Form>
  )
}