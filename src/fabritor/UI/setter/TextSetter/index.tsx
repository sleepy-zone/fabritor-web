import { useContext, useEffect } from 'react';
import { Form, Radio, InputNumber, ColorPicker, Select, Space, Button } from 'antd';
import { TEXT_ALIGN_LIST, FONT_PRESET_FAMILY_LIST } from '@/utils/constants';
import { BoldOutlined, ItalicOutlined, UnderlineOutlined, StrikethroughOutlined } from '@ant-design/icons';
import { GloablStateContext } from '@/context';
import FontStylePanel from '../../panel/TextPanel/FontStylePanel';

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
      textAlign: object.textAlign,
      lineHeight: object.lineHeight,
      fontStyles: {
        bold: object.fontWeight === 'bold',
        italic: object.fontStyle === 'italic',
        underline: object.underline,
        linethrough: object.linethrough
      }
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
          label="行高"
          name="lineHeight"
        >
          <InputNumber precision={2} step={0.01}/>
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
          <Radio.Group
            options={TEXT_ALIGN_LIST}
            optionType="button"
            buttonStyle="solid"
          />
        </FormItem>
        <FormItem
          label="样式"
          name="fontStyles"
        >
          <FontStylePanel />
        </FormItem>
        {/*竖版*/}
        {/*特效*/}
      </Form>
    </div>
  )
}