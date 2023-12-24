import { Slider, Form, Switch } from 'antd';
import { useEffect } from 'react';

const { Item: FormItem } = Form;

export default function TextPath (props) {
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
    <Form form={form} onValuesChange={handleChange}>
      <FormItem label="启用" name="enable" valuePropName="checked">
        <Switch />
      </FormItem>
      <FormItem label="偏移" name="offset">
        <Slider
          min={-100}
          max={100}
        />
      </FormItem>
    </Form>
  )
}