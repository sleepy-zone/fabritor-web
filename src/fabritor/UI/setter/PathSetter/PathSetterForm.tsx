import { Form } from 'antd';
import SolidColorSetter from '../ColorSetter/Solid';
import ColorSetter from '../ColorSetter';
import SliderInputNumber from '@/fabritor/components/SliderInputNumber';
import { useContext, useEffect } from 'react';
import { GloablStateContext } from '@/context';
import { useTranslation } from '@/i18n/utils';

const { Item: FormItem } = Form;

export default function PathSetterForm (props) {
  const { value, onChange, shouldFireEvent, showPenTip, showFillConfig } = props;
  const [form] = Form.useForm();
  const { editor } = useContext(GloablStateContext);
  const { t } = useTranslation();

  const fireEvent = () => {
    if (shouldFireEvent) {
      editor.fireCustomModifiedEvent();
    }
  }

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
      {showPenTip ? <FormItem label={<span style={{ fontSize: 15, fontWeight: 'bold' }}>{t('panel.paint.title')}</span>} /> : null }
      <FormItem
        label={showFillConfig ? t('common.stroke') : t('common.stroke_color')}
        name="color"
      >
        <SolidColorSetter onChange={fireEvent} />
      </FormItem>
      <FormItem
        label={t('common.line_width')}
        name="width"
      >
        <SliderInputNumber min={1} max={100} onChangeComplete={fireEvent} />
      </FormItem>
      {
        showFillConfig ?
        <FormItem
          label={t('common.fill')}
          name="fill"
        >
          <ColorSetter onChange={fireEvent} />
        </FormItem> : null
      }
      <FormItem label={<span style={{ fontSize: 15, fontWeight: 'bold' }}>{t('common.shadow')}</span>} />
      <FormItem
        label={t('common.color')}
        name={['shadow', 'color']}
      >
        <SolidColorSetter onChange={fireEvent} />
      </FormItem>
      <FormItem
        label={t('common.width')}
        name={['shadow', 'width']}
      >
        <SliderInputNumber min={0} max={50} onChangeComplete={fireEvent} />
      </FormItem>
      <FormItem
        label={t('common.offset')}
        name={['shadow', 'offset']}
      >
        <SliderInputNumber min={0} max={20} onChangeComplete={fireEvent} />
      </FormItem>
    </Form>
  )
}