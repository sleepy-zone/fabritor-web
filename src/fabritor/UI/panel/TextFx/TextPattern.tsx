import { Form, Switch, Radio } from 'antd';
import { useEffect } from 'react';
import ImageSelector from '@/fabritor/components/ImageSelector';

const { Item: FormItem } = Form;

export default function TextPattern (props) {
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
      <FormItem label="图片" name="url">
        <ImageSelector />
      </FormItem>
      <FormItem label="重复" name="repeat">
        <Radio.Group direction="vertical" options={[
          {
            label: '重复(repeat)',
            value: 'repeat'
          },
          {
            label: '横向重复(repeat-x)',
            value: 'repeat-x'
          },
          {
            label: '纵向重复(repeat-y)',
            value: 'repeat-y'
          },
          {
            label: '无重复(no-repeat)',
            value: 'no-repeat'
          }
        ]} />
      </FormItem>
    </Form>
  )
}