import { useContext, useEffect } from 'react';
import { fabric } from 'fabric';
import { Slider, Form } from 'antd';
import Title from '@/fabritor/components/Title';
import ColorSetter from '@/fabritor/components/ColorSetter';
import { GloablStateContext } from '@/context';
import TextShadow from './TextShadow';
import TextPath from './TextPath';
import TextPattern from './TextPattern';
import { drawTextPath, getPathOffset, removeTextPath } from '@/editor/objects/textbox';
import { loadImageDom } from '@/editor/objects/image';

const { Item: FormItem } = Form;

export default function TextFx () {
  const [form] = Form.useForm();
  const { object, setFxType, editor } = useContext(GloablStateContext);

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

  const handleFxValueChange = async (values) => {
    if (!object || !editor) return;
    const keys = Object.keys(values);
    for (let key of keys) {
      const v = values[key];
      if (key === 'shadow') {
        if (v.enable) {
          // @ts-ignore object shadow
          object.shadow = {
            color: v.color,
            blur: v.blur,
            offsetX: v.offset,
            offsetY: v.offset
          };
        } else {
          object.shadow = undefined;
        }
      } else if (key === 'path') {
        if (v.enable) {
          drawTextPath(object, v.offset);
        } else {
          removeTextPath(object);
        }
      } else if (key === 'pattern') {
        await handleTextPattern(v);
      } else {
        object.set(key as (keyof fabric.Object), v);
      }
    }
    editor.canvas.requestRenderAll();
    editor.fireCustomModifiedEvent();
  }

  const initObjectFx = () => {
    if (!object) return;
    const fill = object.fill;
    form.setFieldsValue({
      stroke: object.stroke,
      strokeWidth: object.strokeWidth || 0,
      textBackgroundColor: object.textBackgroundColor,
      shadow: {
        enable: !!object.shadow,
        color: object.shadow?.color || object.stroke,
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
    if (!object || (object.type !== 'textbox' && object.type !== 'f-text')) {
      setFxType?.('');
    } else {
      initObjectFx();
    }
  }, [object]);

  return (
    <div className="fabritor-setter-panel">
      <Form
        form={form}
        onValuesChange={handleFxValueChange}
        style={{ padding: '0 16px' }}
      >
        <Title>描边</Title>
        <FormItem label="颜色">
          <ColorSetter effectKey="stroke" />
        </FormItem>
        <FormItem label="粗细" name="strokeWidth">
          <Slider
            min={0}
            max={100}
          />
        </FormItem>
        <Title>阴影</Title>
        <FormItem name="shadow">
          <TextShadow />
        </FormItem>
        <Title>波浪型文字</Title>
        <FormItem name="path">
          <TextPath />
        </FormItem>
        <Title>图片填充</Title>
        <FormItem name="pattern">
          <TextPattern />
        </FormItem>
      </Form>
    </div>
  )
}