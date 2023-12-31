import { useContext, useEffect } from 'react';
import { Form } from 'antd';
import { FunctionOutlined } from '@ant-design/icons';
import ToolbarDivider from '@/fabritor/components/ToolbarDivider';
import ReplaceSetter from './ReplaceSetter';
import { GloablStateContext } from '@/context';
import FlipSetter from './FlipSetter';
import { getGlobalEditor } from '@/utils/global';
import BorderSetter from './BorderSetter';
import ClipSetter from './Clip';

const { Item: FormItem } = Form;

const getObjectBorderType = ({stroke, strokeWidth, strokeDashArray}) => {
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

const getStrokeDashArray = ({ type, strokeWidth }) => {
  if (!type) return null;
  if (type !== 'line') {
    const dashArray = type.split(',');
    dashArray[0] = dashArray[0] * (strokeWidth / 2 > 1 ? strokeWidth / 2 : strokeWidth);
    dashArray[1] = dashArray[1] * (strokeWidth / 4 > 1 ? strokeWidth / 4 : strokeWidth);
    return dashArray;
  } 
  return null;
}

export default function ImageSetter () {
  const { object, setFxType } = useContext(GloablStateContext);
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
      object.setBorder({ stroke: null, borderRadius });
    } else {
      object.setBorder({
        stroke,
        strokeWidth,
        borderRadius,
        strokeDashArray: getStrokeDashArray(border)
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
          type: getObjectBorderType(border),
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
      <FormItem>
        <span
          className="fabritor-toolbar-setter-trigger"
          onClick={() => { setFxType('image'); }}
        >
          <FunctionOutlined style={{ fontSize: 22 }} />
        </span>
      </FormItem>
      <ToolbarDivider />
    </Form>
  )
}