import { useContext, useEffect } from 'react';
import { Form, InputNumber, Select } from 'antd';
import { FONT_PRESET_FAMILY_LIST } from '@/utils/constants';
import { GloablStateContext } from '@/context';
import FontStyleSetter from './FontStyleSetter';
import AlignSetter from './AlignSetter';
import ColorSetter from '@/fabritor/components/ColorSetter';
import { loadFont } from '@/utils';
import { getGlobalEditor } from '@/utils/global';
import SpaceSetter from './SpaceSetter';

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

  const handleFontSpace = (space) => {
    object.set('lineHeight', space.lineHeight);
    object.set('charSpacing', space.charSpacing);
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
      } else if (key === 'space') {
        handleFontSpace(values[key]);
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
      space: {
        lineHeight: object.lineHeight,
        charSpacing: object.charSpacing
      },
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
      className="fabritor-toolbar-form-text"
    >
      <FormItem name="fontFamily">
        <Select
          options={FONT_PRESET_FAMILY_LIST}
          style={{ width: 180 }}
        />
      </FormItem>
      <FormItem
        name="fontSize"
      >
        <InputNumber style={{ width: 66 }} min={1} />
      </FormItem>
      <FormItem
        name="fill"
      >
        <ColorSetter type="fontColor" />
      </FormItem>
      <FormItem
        name="space"
      >
        <SpaceSetter />
      </FormItem>
      <FormItem name="textAlign">
        <AlignSetter />
      </FormItem>
      <FormItem name="fontStyles">
        <FontStyleSetter />
      </FormItem>
    </Form>
  )
}