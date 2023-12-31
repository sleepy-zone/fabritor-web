import { useContext, useEffect } from 'react';
import { Form, Select } from 'antd';
import { FONT_PRESET_FAMILY_LIST } from '@/utils/constants';
import { GloablStateContext } from '@/context';
import FontStyleSetter from './FontStyleSetter';
import AlignSetter from './AlignSetter';
import ColorSetter from '@/fabritor/components/ColorSetter';
import { loadFont } from '@/utils';
import { getGlobalEditor } from '@/utils/global';
import SpaceSetter from './SpaceSetter';
import { FunctionOutlined } from '@ant-design/icons';
import FontSizeSetter from './FontSize';

const { Item: FormItem } = Form;

export default function TextSetter () {
  const { object, setFxType } = useContext(GloablStateContext);
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

  const handleTextStroke = (border) => {
    object.set('stroke', border.stroke);
    object.set('strokeWidth', border.strokeWidth);
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
      } else if (key === 'border') {
        handleTextStroke(values[key]);
      } else {
        const selectedText = object.getSelectedText();
        if (selectedText && key === 'fill') {
          object.setSelectionStyles({ fill: values[key] });
        } else {
          object.set('styles', {});
          object.set(key, values[key]);
        }
      }
    }
   
    const editor = getGlobalEditor();
    editor.canvas.requestRenderAll();

    editor.fireCustomModifiedEvent();
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
      },
      border: {
        stroke: object.stroke,
        strokeWidth: object.strokeWidth
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
          style={{ width: 160 }}
        />
      </FormItem>
      <FormItem
        name="fontSize"
      >
        <FontSizeSetter />
      </FormItem>
      <FormItem>
        <ColorSetter type="fontColor" defaultColor="#000000" />
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
      <FormItem>
        <span
          className="fabritor-toolbar-setter-trigger"
          onClick={() => { setFxType('text'); }}
        >
          <FunctionOutlined style={{ fontSize: 22 }} />
        </span>
      </FormItem>
    </Form>
  )
}