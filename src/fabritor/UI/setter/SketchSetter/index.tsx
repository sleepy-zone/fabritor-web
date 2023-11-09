import { useEffect } from 'react';
import { Button, Form, Input, InputNumber } from 'antd';
import ColorSetter from '../TextSetter/ColorSetter';
import Title from '@/fabritor/components/Title';
import { getGlobalEditor } from '@/utils/global';
const { Item: FormItem } = Form;
export default function SketchSetter() {
  const [form] = Form.useForm();
  const [sizeForm] = Form.useForm();
  const handleValuesChange = (values) => {
    const editor = getGlobalEditor();
    const { sketch, canvas } = editor;
    Object.keys(values).forEach(key => {
      sketch.set(key, values[key]);
    });
    canvas.requestRenderAll();
  }
  const handleSizeChange = (size) => {
    const editor = getGlobalEditor();
    editor.setSketchSize(size);
  }
  useEffect(() => {
    const editor = getGlobalEditor();
    if (!editor) return;
    const { sketch } = editor;
    form.setFieldsValue({
      // @ts-ignore
      fabritor_desc: sketch.fabritor_desc,
      fill: sketch.fill,
    });
    sizeForm.setFieldsValue({
      width: sketch.width,
      height: sketch.height
    });
  }, []);
  return (
    <div className="fabritor-setter-form">
      <Title>尺寸设置</Title>
      <Form
        name="fabritor-sketch-size-setter-form"
        form={sizeForm}
        onFinish={handleSizeChange}
      >
        <FormItem
          label="宽度"
          name="width"
        >
          <InputNumber />
        </FormItem>
        <FormItem
          label="高度"
          name="height"
        >
          <InputNumber />
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" style={{ marginLeft: 42 }}>确认</Button>
        </FormItem>
      </Form>
      <Title>其他设置</Title>
      <Form
        name="fabritor-sketch-rest-setter-form"
        form={form}
        onValuesChange={handleValuesChange}
      >
        <FormItem
          label="描述"
          name="fabritor_desc"
        >
          <Input />
        </FormItem>
        <FormItem
          label="背景色"
          name="fill"
        >
          <ColorSetter />
        </FormItem>
      </Form>
    </div>
  );
}