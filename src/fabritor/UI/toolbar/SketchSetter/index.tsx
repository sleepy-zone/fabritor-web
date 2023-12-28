import { useContext, useEffect } from 'react';
import { Form, Modal } from 'antd';
import ColorSetter from '@/fabritor/components/ColorSetter';
import SizeSetter from '@/fabritor/components/SizeSetter';
import { getGlobalEditor } from '@/utils/global';
import ToolbarDivider from '@/fabritor/components/ToolbarDivider';
import { ClearOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { GloablStateContext } from '@/context';

const { Item: FormItem } = Form;

export default function SketchSetter() {
  const [form] = Form.useForm();
  const { setActiveObject } = useContext(GloablStateContext);

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
    editor.fireCustomModifiedEvent();
  }

  const clearCanvas = () => {
    Modal.confirm({
      title: '确认清空画布？',
      icon: <ExclamationCircleFilled />,
      async onOk () {
        const editor = getGlobalEditor();
        await editor.clearCanvas();
        setActiveObject(editor.sketch);
      },
      okText: '确认',
      cancelText: '取消'
    });
  }

  useEffect(() => {
    const editor = getGlobalEditor();
    if (!editor) return;
    const { sketch } = editor;
    form.setFieldsValue({
      fill: sketch.fill,
      size: [sketch.width, sketch.height]
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
        <ColorSetter type="sketch" />
      </FormItem>
      <ToolbarDivider />
      <FormItem name="size">
        <SizeSetter />
      </FormItem>
      <ToolbarDivider />
      <FormItem>
        <span className="fabritor-toolbar-setter-trigger" onClick={clearCanvas}>
          <ClearOutlined style={{ fontSize: 20 }} />
        </span>
      </FormItem>
    </Form>
  );
}