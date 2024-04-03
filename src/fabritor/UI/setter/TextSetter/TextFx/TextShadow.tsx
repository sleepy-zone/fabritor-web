import { Slider, Form, Switch } from 'antd';
import ColorSetter from '../../ColorSetter/Solid';
import { useEffect } from 'react';

const { Item: FormItem } = Form;

export default function TextShadow (props) {
  const [form] = Form.useForm();
  const { value, onChange } = props;

  const handleChange = (v) => {
    onChange && onChange({
      ...value,
      ...v
    });
  }

  useEffect(() => {
    if (value) {
      form.setFieldsValue(value);
    }
  }, [value]);

  return (
    <Form form={form} onValuesChange={handleChange} colon={false}>
      <FormItem label={<span style={{ fontSize: 15, fontWeight: 'bold' }}>阴影</span>} />
      <FormItem label="颜色" name="color">
        <ColorSetter />
      </FormItem>
      <FormItem label="模糊" name="blur">
        <Slider
          min={0}
          max={20}
        />
      </FormItem>
      <FormItem label="偏移" name="offset">
        <Slider
          min={-180}
          max={180}
        />
      </FormItem>
    </Form>
  )
}