import { useContext, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import { Form, Modal } from 'antd';
import ColorSetter from '../ColorSetter';
import SizeSetter from '../SizeSetter';
import ToolbarDivider from '@/fabritor/components/ToolbarDivider';
import { DRAG_ICON } from '@/assets/icon';
import { ClearOutlined, ExclamationCircleFilled, DragOutlined } from '@ant-design/icons';
import { GloablStateContext } from '@/context';
import { transformColors2Fill, transformFill2Colors } from '@/utils';

const { Item: FormItem } = Form;

export default function SketchSetter() {
  const [form] = Form.useForm();
  const { setActiveObject, editor } = useContext(GloablStateContext);
  const [panEnable, setPanEnable] = useState(false);

  const handleFill = (_fill) => {
    const { sketch, canvas } = editor;
    let fill = transformColors2Fill(_fill);
    if (typeof fill !== 'string') {
      fill = new fabric.Gradient(fill);
    }
    sketch.set('fill', fill);
    canvas.requestRenderAll();
  }

  const handleValuesChange = (values) => {
    Object.keys(values).forEach((key) => {
      if (key === 'size') {
        editor.setSketchSize({ width: values[key][0], height: values[key][1] });
      } else if (key === 'fill') {
        handleFill(values[key]);
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
      size: [sketch.width, sketch.height],
      fill: transformFill2Colors(sketch.fill)
    });
  }, [editor]);

  return (
    <Form
      layout="vertical"
      colon={false}
      form={form}
      onValuesChange={handleValuesChange}
    >
      <FormItem label="画布尺寸" name="size">
        <SizeSetter />
      </FormItem>
      <FormItem label="画布背景色" name="fill">
        <ColorSetter type="sketch" />
      </FormItem>
      {/* <FormItem>
        <ColorSetter type="sketch" />
      </FormItem>
      <ToolbarDivider />
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
      </FormItem> */}
    </Form>
  );
}