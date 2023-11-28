import { useContext, useEffect } from 'react';
import { Form } from 'antd';
import { GloablStateContext } from '@/context';
import { getGlobalEditor } from '@/utils/global';
import ColorSetter from '@/fabritor/components/ColorSetter';
import StrokeSetter from './StrokeSetter';

const { Item: FormItem } = Form;

export default function LineSetter () {
  const { object } = useContext(GloablStateContext);
  const [form] = Form.useForm();

  const getObjectBorderType = (stroke, strokeWidth, strokeDashArray) => {
    if (!stroke) {
      return 'none';
    }
    if (strokeDashArray?.length) {
      let [d1, d2] = strokeDashArray;
      d1 = d1 / (strokeWidth / 2 > 1 ? strokeWidth / 2 : strokeWidth);
      d2 = d2 / (strokeWidth / 2 > 1 ? strokeWidth / 2 : strokeWidth * 2);
      return [d1, d2].join(',');
    }
    return 'line';
  }

  const handleStrokeConfig = (strokeConfig) => {
    if (!strokeConfig) return;
    const { line, arrow } = object;
    const { strokeWidth = 1, round = false, type = 'line' } = strokeConfig;

    line.set('strokeWidth', strokeWidth);
    // arrow.set('strokeWidth', strokeWidth);
    arrow.scaleX = arrow.scaleY = 1 + strokeWidth / 5; // simple calc

    line.set('strokeLineCap', round ? 'round' : 'butt');

    if (type !== 'line') {
      const dashArray = type.split(',');
      dashArray[0] = dashArray[0] * (strokeWidth / 2 > 1 ? strokeWidth / 2 : strokeWidth);
      dashArray[1] = dashArray[1] * (strokeWidth / 2 > 1 ? strokeWidth : strokeWidth * 2);
      line.set('strokeDashArray', dashArray);
    } else {
      line.set('strokeDashArray', null);
    }
  }

  const handleValuesChange = (values) => {
    const keys = Object.keys(values);
    const { line, arrow } = object;
    if (!keys?.length) return;
    for (let key of keys) {
      switch (key) {
        case 'stroke':
          line.set('stroke', values[key]);
          arrow.set({
            fill: values[key],
            stroke: values[key]
          });
          break;
        case 'strokeConfig':
          handleStrokeConfig(values[key]);
          break;
        default:
          break;
      }
    }
   
    object.addWithUpdate();

    const editor = getGlobalEditor();
    editor.canvas.requestRenderAll();
  }

  useEffect(() => {
    const { line } = object;
    if (line) {
      form.setFieldsValue({
        stroke: line.stroke,
        strokeConfig: {
          type: getObjectBorderType(line.stroke, line.strokeWidth, line.strokeDashArray),
          strokeWidth: line.strokeWidth,
          round: line.strokeLineCap === 'round'
        }
      });
    }
  }, [object]);

  return (
    <Form
      form={form}
      onValuesChange={handleValuesChange}
      layout="inline"
    >
      <FormItem
        name="stroke"
      >
        <ColorSetter />
      </FormItem>
      <FormItem
        name="strokeConfig"
      >
        <StrokeSetter />
      </FormItem>
    </Form>
  )
}