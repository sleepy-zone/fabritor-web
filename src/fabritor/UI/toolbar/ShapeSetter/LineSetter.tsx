import { useContext, useEffect } from 'react';
import { Form, InputNumber, Switch } from 'antd';
import { GloablStateContext } from '@/context';
import { getGlobalEditor } from '@/utils/global';
import ColorSetter from '@/fabritor/components/ColorSetter';

const { Item: FormItem } = Form;

export default function LineSetter () {
  const { object } = useContext(GloablStateContext);
  const [form] = Form.useForm();

  const handleValuesChange = (values) => {
    const keys = Object.keys(values);
    if (!keys?.length) return;
    for (let key of keys) {
      if (key === 'round') {
        object.set('strokeLineCap', values[key] ? 'round' : 'butt');
      } else {
        object.set(key, values[key]);
      }
    }
   
    const editor = getGlobalEditor();
    editor.canvas.requestRenderAll();
  }

  useEffect(() => {
    form.setFieldsValue({
      stroke: object.stroke,
      strokeWidth: object.strokeWidth,
      round: object.strokeLineCap === 'round'
    });
  }, [object]);

  return (
    <Form
      form={form}
      onValuesChange={handleValuesChange}
      layout="inline"
    >
      <FormItem
        label="颜色"
        name="stroke"
      >
        <ColorSetter />
      </FormItem>
      <FormItem
        label="圆角"
        name="round"
        valuePropName="checked"
      >
        <Switch />
      </FormItem>
      <FormItem
        label="粗细"
        name="strokeWidth"
      >
        <InputNumber min={1} max={50} style={{ width: 60 }} />
      </FormItem>
    </Form>
  )
}