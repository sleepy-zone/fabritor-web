import { fabric } from 'fabric';
import { useContext, useEffect } from 'react';
import { Form } from 'antd';
import ToolbarDivider from '@/fabritor/components/ToolbarDivider';
import ReplaceSetter from './ReplaceSetter';
import { GloablStateContext } from '@/context';
import FlipSetter from './FlipSetter';
import { getGlobalEditor } from '@/utils/global';
import BorderSetter from './BorderSetter';

const { Item: FormItem } = Form;

const getObjectBorderType = (stroke, strokeWidth, strokeDashArray) => {
  if (!stroke) {
    return 'none';
  }
  if (strokeDashArray?.length) {
    let [d1, d2] = strokeDashArray;
    d1 = d1 / (strokeWidth / 2 > 1 ? strokeWidth / 2 : strokeWidth);
    d2 = d2 / (strokeWidth / 4 > 1 ? strokeWidth / 4 : strokeWidth);
    return [d1, d2].join(',');
  }
  return 'line';
}

export default function ImageSetter () {
  const { object } = useContext(GloablStateContext);
  const [form] = Form.useForm();

  const handleImageReplace = (rp) => {
    const editor = getGlobalEditor();
    if (rp.img) {
      object.set({
        fill: new fabric.Pattern({
          source: rp.img,
          repeat: 'no-repeat'
        }),
        width: rp.img.width,
        height: rp.img.height
      });
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
  
      if (type !== 'line') {
        const dashArray = type.split(',');
        dashArray[0] = dashArray[0] * (strokeWidth / 2 > 1 ? strokeWidth / 2 : strokeWidth);
        dashArray[1] = dashArray[1] * (strokeWidth / 4 > 1 ? strokeWidth / 4 : strokeWidth);
        object.set('strokeDashArray', dashArray);
      } else {
        object.set('strokeDashArray', null);
      }
    }

    object.set('rx', borderRadius);
    object.set('ry', borderRadius);

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
          type: getObjectBorderType(object.stroke, object.strokeWidth, object.strokeDashArray),
          stroke: object.stroke || '#000000',
          strokeWidth: object.strokeWidth || 1,
          borderRadius: object.rx || object.ry
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
    </Form>
  )
}