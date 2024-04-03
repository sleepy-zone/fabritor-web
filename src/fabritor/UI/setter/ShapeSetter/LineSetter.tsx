import { useContext, useEffect } from 'react';
import { Form, Radio, Switch } from 'antd';
import { GloablStateContext } from '@/context';
import ColorSetter from '../ColorSetter/Solid';
import SliderInputNumber from '@/fabritor/components/SliderInputNumber';
import { BORDER_TYPES, getObjectBorderType, getStrokeDashArray } from '../BorderSetter';

const { Item: FormItem } = Form;

const LINE_BORDER_TYPES = BORDER_TYPES.slice(1);

export default function LineSetter () {
  const { object, editor } = useContext(GloablStateContext);
  const [form] = Form.useForm();

  const handleValuesChange = (values) => {
    const keys = Object.keys(values);
    if (!keys?.length) return;
    for (let key of keys) {
      switch (key) {
        case 'stroke':
          object.set('stroke', values[key]);
          break;
        case 'strokeWidth':
          object.setStrokeWidth(values[key]);
          break;
        case 'round':
          object.set('strokeLineCap', values[key] ? 'round' : 'butt');
          break;
        case 'type':
          object.set('strokeDashArray', getStrokeDashArray({ type: values[key], strokeWidth: object.strokeWidth }));
          break;
        default:
          break;
      }
    }

    object.setCoords();

    editor.canvas.requestRenderAll();
    editor.fireCustomModifiedEvent();
    // TODO editor.fireCustomModifiedEvent();
  }

  useEffect(() => {
    form.setFieldsValue({
      stroke: object.stroke || '#000000',
      type: getObjectBorderType(object),
      strokeWidth: object.strokeWidth,
      round: object.strokeLineCap === 'round'
    });
  }, [object]);

  return (
    <Form
      form={form}
      onValuesChange={handleValuesChange}
      colon={false}
    >
      <FormItem
        name="stroke"
        label="颜色"
      >
        <ColorSetter />
      </FormItem>
      <FormItem name="type" label="样式" labelCol={{ span: 24 }}>
        <Radio.Group>
          {
            LINE_BORDER_TYPES.map(item => (
              <Radio.Button key={item.key} value={item.key}>
                <span
                  dangerouslySetInnerHTML={{ __html: item.svg }}
                  style={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    marginTop: 6
                  }}
                />
              </Radio.Button>
            ))
          }
        </Radio.Group>
      </FormItem>
      <FormItem
        name="strokeWidth"
        label="粗细"
      >
        <SliderInputNumber
          min={1}
          max={50}
        />
      </FormItem>
      <FormItem
        name="round"
        label="圆角"
        valuePropName="checked"
      >
        <Switch />
      </FormItem>
    </Form>
  )
}