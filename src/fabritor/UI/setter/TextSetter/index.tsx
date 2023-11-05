import { useContext, useEffect } from 'react';
import { Form, InputNumber, ColorPicker, Select } from 'antd';
import { TEXT_ALIGN_LIST, FONT_PRESET_FAMILY_LIST } from '@/utils/constants';
import { GloablStateContext } from '@/context';

const { Item: FormItem } = Form;

export default function TextSetter (props) {
  const { object } = useContext(GloablStateContext);
  const [form] = Form.useForm();

  const handleValuesChange = (values) => {
    console.log(values)
  }

  useEffect(() => {
    form.setFieldsValue({
      fontFamily: object.fontFamily,
      fontSize: object.fontSize,
      fill: object.fill,
      textAlign: object.textAlign
    });
  }, [object]);

  return (
    <div className="fabritor-setter-form">
      <Form
        name="fabritor-text-setter-form"
        form={form}
        onValuesChange={handleValuesChange}
      >
        <FormItem
          label="字体"
          name="fontFamily"
        >
          <Select options={FONT_PRESET_FAMILY_LIST} />
        </FormItem>
        <FormItem
          label="字号"
          name="fontSize"
        >
          <InputNumber />
        </FormItem>
        <FormItem
          label="颜色"
          name="fill"
        >
          <ColorPicker />
        </FormItem>
        <FormItem
          label="对齐"
          name="textAlign"
        >
          <Select options={TEXT_ALIGN_LIST} />
        </FormItem>
      </Form>
    </div>
  )
}