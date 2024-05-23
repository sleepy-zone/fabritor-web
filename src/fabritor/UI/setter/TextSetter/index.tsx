import { useContext, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import { Form, Select } from 'antd';
import { FONT_PRESET_FAMILY_LIST } from '@/utils/constants';
import { GloablStateContext } from '@/context';
import FontStyleSetter from './FontStyleSetter';
import AlignSetter from './AlignSetter';
import ColorSetter from '../ColorSetter';
import { loadFont, transformColors2Fill, transformFill2Colors } from '@/utils';
import { FunctionOutlined, RightOutlined } from '@ant-design/icons';
import SliderInputNumber from '@/fabritor/components/SliderInputNumber';
import FList from '@/fabritor/components/FList';
import MoreConfigWrapper from '../Form/MoreConfigWrapper';
import TextFx from './TextFx';
import { useTranslation } from '@/i18n/utils';

const { Item: FormItem } = Form;

export default function TextSetter () {
  const { object, editor }= useContext(GloablStateContext);
  const [form] = Form.useForm();
  const [openFx, setOpenFx] = useState(false);
  const { t } = useTranslation();

  const TEXT_ADVANCE_CONFIG = [
    {
      icon: <FunctionOutlined style={{ fontSize: 22 }} />,
      label: t('setter.text.fx.title'),
      key: 'fx',
      onClick: () => { setOpenFx(true) }
    }
  ]

  const handleFontStyles = (styles) => {
    object.set({
      fontWeight: styles?.bold ? 'bold' : 'normal',
      fontStyle: styles?.italic ? 'italic' : 'normal',
      underline: !!styles.underline,
      linethrough: !!styles.linethrough
    });
  }

  const handleFill = (_fill) => {
    let fill = transformColors2Fill(_fill);
    // text gradient nor support percentage https://github.com/fabricjs/fabric.js/issues/8168  
    if (typeof fill !== 'string') {
      fill.gradientUnits = 'pixels';
      const { coords } = fill;
      fill.coords = {
        x1: coords.x1 === 1 ? object.width : 0,
        y1: coords.y1 === 1 ? object.height : 0,
        x2: coords.x2 === 1 ? object.width : 0,
        y2: coords.y2 === 1 ? object.height : 0,
        r1: 0,
        r2: object.width > object.height ? object.width / 2  : object.height
      }
    }
    if (typeof fill !== 'string') {
      fill = new fabric.Gradient(fill);
    }
    object.set({ fill });
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
      } else if (key === 'fill') {
        handleFill(values[key]);
      } else {
        const selectedText = object.getSelectedText();
        if (selectedText && key === 'fill') {
          object.setSelectionStyles({ fill: values[key] });
        } else {
          object.set('styles', {});
          object.set(key, values[key]);
        }
      }

      if (key !== 'fontSize' && key !== 'lineHeight' && key !== 'charSpacing') {
        editor.fireCustomModifiedEvent();
      }
    }
   
    editor.canvas.requestRenderAll();
  }

  useEffect(() => {
    form.setFieldsValue({
      fontFamily: object.fontFamily,
      fontSize: object.fontSize,
      fill: transformFill2Colors(object.fill),
      textAlign: object.textAlign,
      lineHeight: object.lineHeight,
      charSpacing: object.charSpacing,
      fontStyles: {
        bold: object.fontWeight === 'bold',
        italic: object.fontStyle === 'italic',
        underline: object.underline,
        linethrough: object.linethrough
      }
    });
  }, [object]);

  return (
    <>
      <Form
        form={form}
        onValuesChange={handleValuesChange}
        colon={false}
      >
        <FormItem
          name="fontFamily"
          label={t('setter.text.font_family')}
        >
          <Select
            options={FONT_PRESET_FAMILY_LIST}
          />
        </FormItem>
        <FormItem
          name="fontSize"
          label={t('setter.text.font_size')}
        >
          <SliderInputNumber max={400} onChangeComplete={() =>{ editor.fireCustomModifiedEvent() }} />
        </FormItem>
        <FormItem
          name="fill"
          label={t('setter.text.fill')}
        >
          <ColorSetter type="fontColor" defaultColor="#000000" />
        </FormItem>
        <FormItem
          name="textAlign"
          label={t('setter.text.text_align')}
        >
          <AlignSetter />
        </FormItem>
        <FormItem
          name="fontStyles"
          label={t('setter.text.font_styles')}
        >
          <FontStyleSetter />
        </FormItem>
        <FormItem
          name="charSpacing"
          label={t('setter.text.char_spacing')}
        >
          <SliderInputNumber
            min={-200}
            max={800}
            onChangeComplete={() =>{ editor.fireCustomModifiedEvent() }}
          />
        </FormItem>
        <FormItem
          name="lineHeight"
          label={t('setter.text.line_height')}
        >
          <SliderInputNumber
            min={0.5}
            max={2.5}
            step={0.01}
            onChangeComplete={() =>{ editor.fireCustomModifiedEvent() }}
          />
        </FormItem>
      </Form>
      <FList 
        dataSource={TEXT_ADVANCE_CONFIG}
        renderItemChildren={(item) => (
          <>
            {item.icon}
            <span style={{ fontSize: 16, fontWeight: 'bold', margin: '0 6px 0 10px' }}>
              {item.label}
            </span>
            <RightOutlined />
          </>
        )}
      />
      <MoreConfigWrapper
        open={openFx}
        setOpen={setOpenFx}
        title={`${t('panel.text.title')} ${t('setter.text.fx.title')}`}
      >
        <TextFx />
      </MoreConfigWrapper>
    </>
  )
}