import { useContext, useEffect, useState } from 'react';
import { Form, Modal } from 'antd';
import ColorSetter from '@/fabritor/components/ColorSetter';
import SizeSetter from '@/fabritor/components/SizeSetter';
import ToolbarDivider from '@/fabritor/components/ToolbarDivider';
import { DRAG_ICON } from '@/assets/icon';
import { ClearOutlined, ExclamationCircleFilled, DragOutlined } from '@ant-design/icons';
import { GloablStateContext } from '@/context';

const { Item: FormItem } = Form;

export default function SketchSetter() {
  const [form] = Form.useForm();
  const { setActiveObject, editor } = useContext(GloablStateContext);
  const [panEnable, setPanEnable] = useState(false);

  const handleValuesChange = (values) => {
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
        await editor.clearCanvas();
        setActiveObject(editor.sketch);
      },
      okText: '确认',
      cancelText: '取消'
    });
  }

  const enablePan = () => {
    const enable = editor.switchEnablePan();
    setPanEnable(enable);
  }

  useEffect(() => {
    if (!editor) return;
    const { sketch } = editor;
    form.setFieldsValue({
      size: [sketch.width, sketch.height]
    });
  }, [editor]);

  return (
    <Form
      layout="inline"
      form={form}
      onValuesChange={handleValuesChange}
      className="fabritor-toolbar-form"
    >
      <FormItem>
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
      <ToolbarDivider />
      <FormItem>
        <span className="fabritor-toolbar-setter-trigger" onClick={enablePan}>
          {
            panEnable? 
            <DragOutlined style={{ fontSize: 22, color: panEnable ? '#000' : '#ccc' }} /> :
            <img src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(DRAG_ICON)}`} style={{ width: 22, height: 22 }} />
          }
        </span>
      </FormItem>
    </Form>
  );
}