import { useContext, useEffect } from 'react';
import { fabric } from 'fabric';
import { Form } from 'antd';
import ColorSetter from '../../ColorSetter';
import { GloablStateContext } from '@/context';
import TextShadow from './TextShadow';
import TextPath from './TextPath';
import TextPattern from './TextPattern';
import { drawTextPath, getPathOffset, removeTextPath } from '@/editor/objects/textbox';
import { loadImageDom } from '@/editor/objects/image';
import { transformColors2Fill, transformFill2Colors } from '@/utils';
import SliderInputNumber from '@/fabritor/components/SliderInputNumber';
import { useTranslation } from '@/i18n/utils';

const { Item: FormItem } = Form;

export default function TextFx () {
  const [form] = Form.useForm();
  const { object, editor } = useContext(GloablStateContext);
  const { t } = useTranslation();

  const handleTextPattern = async (pattern) => {
    if (!object) return;
    if (!pattern.enable || !pattern.url) {
      if (object.fill instanceof fabric.Pattern) {
        object.set('fill', '#000000');
      }
      return Promise.resolve();
    }

    try {
      const img = await loadImageDom(pattern.url);
      object.set('fill', new fabric.Pattern({
        source: img as HTMLImageElement,
        repeat: 'repeat'
      }));
    } catch(e) {
      console.log(e);
    }
  }

  const handleStroke = (_stroke) => {
    let stroke = transformColors2Fill(_stroke);
    if (typeof stroke !== 'string') {
      stroke = new fabric.Gradient(stroke);
    }
    object.set('stroke', stroke);
  }

  const handleFxValueChange = async (values) => {
    if (!object || !editor) return;
    const keys = Object.keys(values);
    for (let key of keys) {
      const v = values[key];
      if (key === 'shadow') {
        // @ts-ignore object shadow
        object.shadow = {
          color: v.color,
          blur: v.blur,
          offsetX: v.offset,
          offsetY: v.offset
        };
      } else if (key === 'path') {
        if (v.enable) {
          drawTextPath(object, v.offset);
        } else {
          removeTextPath(object);
        }
      } else if (key === 'pattern') {
        await handleTextPattern(v);
      } else if (key === 'stroke') {
        handleStroke(v);
      } else {
        object.set(key as (keyof fabric.Object), v);
      }
    }
    editor.canvas.requestRenderAll();
    editor.fireCustomModifiedEvent();
  }

  const initObjectFx = () => {
    const fill = object.fill;
    form.setFieldsValue({
      stroke: transformFill2Colors(object.stroke),
      strokeWidth: object.strokeWidth || 0,
      textBackgroundColor: object.textBackgroundColor,
      shadow: {
        color: object.shadow?.color || object.stroke || '#000000',
        blur: object.shadow?.blur || 0,
        offset: object.shadow?.offsetX || 0
      },
      path: {
        enable: !!object.path,
        offset: getPathOffset(object)
      },
      pattern: {
        enable: fill instanceof fabric.Pattern,
        url: fill?.source?.src
      }
    });
  }

  useEffect(() => {
    if (object && object.type === 'f-text') {
      initObjectFx();
    }
  }, [object]);

  return (
    <Form
      form={form}
      onValuesChange={handleFxValueChange}
      colon={false}
      style={{ marginTop: 24 }}
    >
      <FormItem label={<span style={{ fontSize: 15, fontWeight: 'bold' }}>{t('common.stroke')}</span>} />
      <FormItem label={t('common.stroke_color')} name="stroke">
        <ColorSetter />
      </FormItem>
      <FormItem label={t('common.stroke_width')} name="strokeWidth">
        <SliderInputNumber
          min={0}
          max={20}
        />
      </FormItem>

      <FormItem name="shadow" style={{ marginBottom: 0 }}>
        <TextShadow />
      </FormItem>
      
      {/* warning: text path conflict with gradient fill */}
      <FormItem name="path" style={{ marginBottom: 0 }}>
        <TextPath />
      </FormItem>
      
      <FormItem name="pattern">
        <TextPattern />
      </FormItem>
    </Form>
  )
}