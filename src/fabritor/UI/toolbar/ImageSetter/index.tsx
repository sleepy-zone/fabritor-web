import { useContext, useEffect } from 'react';
import { Form } from 'antd';
import ToolbarDivider from '@/fabritor/components/ToolbarDivider';
import ReplaceSetter from './ReplaceSetter';
import { GloablStateContext } from '@/context';
import FlipSetter from './FlipSetter';
import { getGlobalEditor } from '@/utils/global';
import BorderSetter from './BorderSetter';
import ClipSetter from './Clip';

const { Item: FormItem } = Form;

export default function ImageSetter () {
  const { object } = useContext(GloablStateContext);
  const [form] = Form.useForm();

  const handleImageReplace = (base64) => {
    const editor = getGlobalEditor();
    if (base64) {
      object.setSrc(base64, () => {
        editor.canvas.requestRenderAll();
      });
    }
  }

  const handleBorder = (border) => {
    const editor = getGlobalEditor();
    const { type, stroke = '#000000', strokeWidth, borderRadius } = border || {};
    if (type === 'none') {
      object.setBorder({ stroke: null });
    } else {
      object.setBorder({
        stroke,
        strokeWidth,
        borderRadius
      });
    }

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
      const border = object.getBorder();
      form.setFieldsValue({
        border: {
          type: border.stroke ? 'line' : 'none',
          ...border,
          stroke: border.stroke || '#000000'
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