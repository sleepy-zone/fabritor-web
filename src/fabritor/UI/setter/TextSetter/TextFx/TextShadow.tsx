import { Slider, Form } from 'antd';
import ColorSetter from '../../ColorSetter/Solid';
import { useEffect } from 'react';
import { useTranslation } from '@/i18n/utils';

const { Item: FormItem } = Form;

export default function TextShadow (props) {
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
      <FormItem label={<span style={{ fontSize: 15, fontWeight: 'bold' }}>{t('common.shadow')}</span>} />
      <FormItem label={t('common.color')} name="color">
        <ColorSetter />
      </FormItem>
      <FormItem label={t('common.blur')} name="blur">
        <Slider
          min={0}
          max={20}
        />
      </FormItem>
      <FormItem label={t('common.offset')} name="offset">
        <Slider
          min={-180}
          max={180}
        />
      </FormItem>
    </Form>
  )
}