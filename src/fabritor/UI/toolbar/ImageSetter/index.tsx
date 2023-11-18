import { fabric } from 'fabric';
import { useContext, useEffect } from 'react';
import { Form, InputNumber, Select } from 'antd';
import ToolbarDivider from '@/fabritor/components/ToolbarDivider';
import ReplaceSetter from './ReplaceSetter';
import { GloablStateContext } from '@/context';
import FlipSetter from './FlipSetter';
import { getGlobalEditor } from '@/utils/global';
import ColorSetter from '@/fabritor/components/ColorSetter';
import BorderSetter from './BorderSetter';

const { Item: FormItem } = Form;

const roundedCorners = (fabricObject, cornerRadius) => new fabric.Rect({
  width: fabricObject.width,
  height: fabricObject.height,
  rx: cornerRadius / fabricObject.scaleX,
  ry: cornerRadius / fabricObject.scaleY,
  left: -fabricObject.width / 2,
  top: -fabricObject.height / 2
});

const getObjectBorderType = (stroke, strokeDashArray) => {
  if (!stroke) {
    return 'none';
  }
  if (strokeDashArray?.length) {
    return strokeDashArray.join(',');
  }
  return 'line';
}

export default function ImageSetter () {
  const { object } = useContext(GloablStateContext);
  const [form] = Form.useForm();

  const handleImageReplace = (rp) => {
    const editor = getGlobalEditor();
    if (rp.img) {
      object.setElement(rp.img);
      editor.canvas.requestRenderAll();
      object.setCoords();
    }
  }

  const handleBorder = (border) => {
    const editor = getGlobalEditor();
    const { type, stroke = '#000', strokeWidth, borderRadius } = border || {};
    if (type === 'none') {
      object.set('stroke', null);
    } else {
      object.set('stroke', stroke);
      object.set('strokeWidth', strokeWidth);

      // 边框位置 位于图片的内部，现在在边上一半
      // 
  
      if (type !== 'line') {
        const dashArray = type.split(',');
        dashArray[0] = dashArray[0] * (strokeWidth / 2 > 1 ? strokeWidth / 2 : strokeWidth);
        dashArray[1] = dashArray[1] * (strokeWidth / 4 > 1 ? strokeWidth / 4 : strokeWidth);
        object.set('strokeDashArray', dashArray);
      } else {
        object.set('strokeDashArray', null);
      }
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
      // object.set("clipPath", roundedCorners(object, 60))
      handleBorder(values.border);
    }
  }

  useEffect(() => {
    if (object) {
      form.setFieldsValue({
        border: {
          type: getObjectBorderType(object.stroke, object.strokeDashArray),
          stroke: object.stroke || '#000000',
          strokeWidth: object.strokeWidth || 1,
          borderRadius: 0
        }
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
      {/* 边框、边框颜色、透明度、锁定、特效 */}
    </Form>
  )
}