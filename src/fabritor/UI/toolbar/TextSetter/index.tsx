import { useContext, useEffect } from 'react';
import { Form, InputNumber, Select } from 'antd';
import { FONT_PRESET_FAMILY_LIST } from '@/utils/constants';
import { GloablStateContext } from '@/context';
import FontStyleSetter from './FontStyleSetter';
import AlignSetter from './AlignSetter';
import ColorSetter from '@/fabritor/components/ColorSetter';
import { loadFont } from '@/utils';
import { getGlobalEditor } from '@/utils/global';

const { Item: FormItem } = Form;

export default function TextSetter () {
  const { object } = useContext(GloablStateContext);
  const [form] = Form.useForm();

  const handleFontStyles = (styles) => {
    object.set('fontWeight', styles?.bold ? 'bold' : 'normal');
    object.set('fontStyle', styles?.italic ? 'italic' : 'normal');
    object.set('underline', !!styles.underline);
    object.set('linethrough', !!styles.linethrough);
  }

  const handleValuesChange = async (values) => {
    const keys = Object.keys(values);
    if (!keys?.length) return;

    for (let key of keys) {
      if (key === 'fontStyles') {
        handleFontStyles(values[key]);
      } else if (key === 'fontFamily') {
        try {
          await loadFont(values[key]);
        } finally {
          object.set(key, values[key]);
        }
      } else {
        object.set(key, values[key]);
      }
    }
   
    const editor = getGlobalEditor();
    editor.canvas.requestRenderAll();
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
    <Form
      form={form}
      onValuesChange={handleValuesChange}
      layout="inline"
    >
      <FormItem name="fontFamily">
        <Select
          options={[{ label: '系统默认', value: 'Times New Roman' }, ...FONT_PRESET_FAMILY_LIST]}
        />
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
        <ColorSetter />
      </FormItem>
      <FormItem name="textAlign">
        <AlignSetter />
      </FormItem>
      <FormItem name="fontStyles">
        <FontStyleSetter />
      </FormItem>
      {/*特效*/}
    </Form>
  )
}