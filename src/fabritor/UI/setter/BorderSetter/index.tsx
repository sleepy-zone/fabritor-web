import { useContext, useEffect } from 'react';
import { Radio, Form } from 'antd';
import ColorSetter from '../ColorSetter/Solid';
import SliderInputNumber from '@/fabritor/components/SliderInputNumber';
import { GloablStateContext } from '@/context';
import { useTranslation } from '@/i18n/utils';

const { Item: FormItem } = Form;

export const getObjectBorderType = ({stroke, strokeWidth, strokeDashArray}) => {
  if (!stroke) {
    return 'none';
  }
  if (strokeDashArray?.length) {
    let [d1, d2] = strokeDashArray;
    d1 = d1 / (strokeWidth / 2 > 1 ? strokeWidth / 2 : strokeWidth);
    d2 = d2 / (strokeWidth / 4 > 1 ? strokeWidth / 4 : strokeWidth);
    return [d1, d2].join(',');
  }
  return 'line';
}

export const getStrokeDashArray = ({ type, strokeWidth }) => {
  if (!type) return null;
  if (type !== 'line') {
    const dashArray = type.split(',');
    dashArray[0] = dashArray[0] * (strokeWidth / 2 > 1 ? strokeWidth / 2 : strokeWidth);
    dashArray[1] = dashArray[1] * (strokeWidth / 4 > 1 ? strokeWidth / 4 : strokeWidth);
    return dashArray;
  } 
  return null;
}

export const BORDER_TYPES = [
  {
    key: 'none',
    svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.071 19.071c-3.905 3.905-10.237 3.905-14.142 0-3.905-3.905-3.905-10.237 0-14.142 3.905-3.905 10.237-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142ZM5.482 17.457 17.457 5.482A8.5 8.5 0 0 0 5.482 17.457Zm1.06 1.06A8.501 8.501 0 0 0 18.519 6.544L6.543 18.518Z" fill="currentColor"></path></svg>'
  },
  {
    key: 'line',
    svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><line x2="24" y1="50%" y2="50%" stroke="currentColor" stroke-width="2" shape-rendering="crispEdges"></line></svg>'
  },
  {
    key: '12,2',
    svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="-1" x2="25" y1="50%" y2="50%" stroke="currentColor" stroke-dasharray="12 2" stroke-width="2" shape-rendering="crispEdges"></line></svg>'
  },
  {
    key: '6,2',
    svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="1" x2="23" y1="50%" y2="50%" stroke="currentColor" stroke-dasharray="6 2" stroke-width="2" shape-rendering="crispEdges"></line></svg>'
  },
  {
    key: '2,2',
    svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="1" x2="23" y1="50%" y2="50%" stroke="currentColor" stroke-dasharray="2 2" stroke-width="2" shape-rendering="crispEdges"></line></svg>'
  }
]

export default function BorderSetter (props) {
  const { value, onChange } = props;
  const { editor } = useContext(GloablStateContext);
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleChange = (v) => {
    onChange && onChange({
      ...value,
      ...v
    });
  }

  const fireEvent = () => {
    editor.fireCustomModifiedEvent();
  }

  useEffect(() => {
    form.setFieldsValue(value);
  }, [value]);

  return (
    <Form
      form={form}
      onValuesChange={handleChange}
      colon={false}
    >
      <FormItem name="type" label={t('common.style')} labelCol={{ span: 24 }}>
        <Radio.Group onChange={fireEvent}>
        {
          BORDER_TYPES.map(item => (
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
      <FormItem name="stroke" label={t('common.stroke_color')}>
        <ColorSetter onChange={fireEvent} />
      </FormItem>
      <FormItem name="strokeWidth" label={t('common.stroke_width')}>
        <SliderInputNumber
          min={1}
          max={100}
          onChangeComplete={fireEvent}
        />
      </FormItem>
      <FormItem name="borderRadius" label={t('common.round')}>
        <SliderInputNumber
          min={0}
          max={200}
          onChangeComplete={fireEvent}
        />
      </FormItem>
    </Form>
  )
}