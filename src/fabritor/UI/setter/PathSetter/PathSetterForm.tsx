import { Form } from 'antd';
import SolidColorSetter from '../ColorSetter/Solid';
import ColorSetter from '../ColorSetter';
import SliderInputNumber from '@/fabritor/components/SliderInputNumber';
import { useEffect } from 'react';

const { Item: FormItem } = Form;

export default function PathSetterForm (props) {
  const { value, onChange, showPenTip, showFillConfig } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(value);
  }, [value]);

  return (
    <Form
      form={form}
      onValuesChange={onChange}
      style={{ marginBottom: 0, marginTop: 16 }}
      colon={false}
    >
      {showPenTip ? <FormItem label={<span style={{ fontSize: 15, fontWeight: 'bold' }}>画笔</span>} /> : null }
      <FormItem
        label={showFillConfig ? '描边' : '颜色'}
        name="color"
      >
        <SolidColorSetter />
      </FormItem>
      <FormItem
        label="线宽"
        name="width"
      >
        <SliderInputNumber min={1} max={100} />
      </FormItem>
      {
        showFillConfig ?
        <FormItem
          label="填充"
          name="fill"
        >
          <ColorSetter />
        </FormItem> : null
      }
      <FormItem label={<span style={{ fontSize: 15, fontWeight: 'bold' }}>阴影</span>} />
      <FormItem
        label="颜色"
        name={['shadow', 'color']}
      >
        <ColorSetter />
      </FormItem>
      <FormItem
        label="宽度"
        name={['shadow', 'width']}
      >
        <SliderInputNumber min={0} max={50} />
      </FormItem>
      <FormItem
        label="偏移"
        name={['shadow', 'offset']}
      >
        <SliderInputNumber min={0} max={20} />
      </FormItem>
    </Form>
  )
}