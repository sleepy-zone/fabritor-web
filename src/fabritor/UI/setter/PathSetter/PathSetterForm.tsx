import { Form } from 'antd';
import SolidColorSetter from '../ColorSetter/Solid';
import ColorSetter from '../ColorSetter';
import SliderInputNumber from '@/fabritor/components/SliderInputNumber';
import { useContext, useEffect } from 'react';
import { GloablStateContext } from '@/context';

const { Item: FormItem } = Form;

export default function PathSetterForm (props) {
  const { value, onChange, shouldFireEvent, showPenTip, showFillConfig } = props;
  const [form] = Form.useForm();
  const { editor } = useContext(GloablStateContext);

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
      {showPenTip ? <FormItem label={<span style={{ fontSize: 15, fontWeight: 'bold' }}>画笔</span>} /> : null }
      <FormItem
        label={showFillConfig ? '描边' : '颜色'}
        name="color"
      >
        <SolidColorSetter onChange={fireEvent} />
      </FormItem>
      <FormItem
        label="线宽"
        name="width"
      >
        <SliderInputNumber min={1} max={100} onChangeComplete={fireEvent} />
      </FormItem>
      {
        showFillConfig ?
        <FormItem
          label="填充"
          name="fill"
        >
          <ColorSetter onChange={fireEvent} />
        </FormItem> : null
      }
      <FormItem label={<span style={{ fontSize: 15, fontWeight: 'bold' }}>阴影</span>} />
      <FormItem
        label="颜色"
        name={['shadow', 'color']}
      >
        <SolidColorSetter onChange={fireEvent} />
      </FormItem>
      <FormItem
        label="宽度"
        name={['shadow', 'width']}
      >
        <SliderInputNumber min={0} max={50} onChangeComplete={fireEvent} />
      </FormItem>
      <FormItem
        label="偏移"
        name={['shadow', 'offset']}
      >
        <SliderInputNumber min={0} max={20} onChangeComplete={fireEvent} />
      </FormItem>
    </Form>
  )
}