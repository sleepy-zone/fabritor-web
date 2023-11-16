import { useEffect } from 'react';
import { Form } from 'antd';
import ColorSetter from '@/fabritor/components/ColorSetter';
import SizeSetter from '@/fabritor/components/SizeSetter';
import { getGlobalEditor } from '@/utils/global';
import ToolbarDivider from '@/fabritor/components/ToolbarDivider';

const { Item: FormItem } = Form;

export default function SketchSetter() {
  const [form] = Form.useForm();

  const handleValuesChange = (values) => {
    const editor = getGlobalEditor();
    const { sketch, canvas } = editor;
    Object.keys(values).forEach((key) => {
      if (key === 'size') {
        editor.setSketchSize({ width: values[key][0], height: values[key][1] });
      } else {
        sketch.set(key, values[key]);
        canvas.requestRenderAll();
      }
    });
  }

  useEffect(() => {
    const editor = getGlobalEditor();
    if (!editor) return;
    const { sketch } = editor;
    form.setFieldsValue({
      fill: sketch.fill,
      size: [sketch.width, sketch.height],
    });
  }, []);

  return (
    <Form
      layout="inline"
      form={form}
      onValuesChange={handleValuesChange}
      className="fabritor-toolbar-form"
    >
      <FormItem name="fill">
        <ColorSetter />
      </FormItem>
      <ToolbarDivider />
      <FormItem name="size">
        <SizeSetter />
      </FormItem>
    </Form>
  );
}