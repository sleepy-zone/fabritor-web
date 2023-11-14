import { useContext, useEffect } from 'react';
import { Form, InputNumber, Slider, Switch } from 'antd';
import { GloablStateContext } from '@/context';
import { getGlobalEditor } from '@/utils/global';
import ColorSetter from '../TextSetter/ColorSetter';
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
      round: object.strokeLineCap === 'round',
      opacity: object.opacity
    });
  }, [object]);
  return (
    <div className="fabritor-setter-form">
      <Form
        name="fabritor-line-setter-form"
        form={form}
        onValuesChange={handleValuesChange}
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
          <Slider min={1} max={50} />
        </FormItem>
        <FormItem
          label="透明度"
          name="opacity"
        >
          <Slider step={0.01} min={0} max={1} />
        </FormItem>
      </Form>
    </div>
  )
}