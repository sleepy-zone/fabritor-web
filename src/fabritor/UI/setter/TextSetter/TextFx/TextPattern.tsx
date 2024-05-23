import { Form, Switch, Row, Col } from 'antd';
import { useEffect } from 'react';
import ImageSelector from '@/fabritor/components/ImageSelector';
import { useTranslation } from '@/i18n/utils';

const { Item: FormItem } = Form;

export default function TextPattern (props) {
  const [form] = Form.useForm();
  const { value, onChange } = props;
  const { t } = useTranslation();

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
      <Row gutter={16}>
        <Col>
          <FormItem label={<span style={{ fontSize: 15, fontWeight: 'bold' }}>{t('setter.text.fx.fill_image')}</span>} />
        </Col>
        <Col>
          <FormItem name="enable" valuePropName="checked">
            <Switch />
          </FormItem>
        </Col>
      </Row>
      <FormItem name="url">
        <ImageSelector size="middle" type="default" />
      </FormItem>
    </Form>
  )
}