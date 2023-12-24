import { useContext, useEffect } from 'react';
import { Slider, Form } from 'antd';
import Title from '@/fabritor/components/Title';
import ColorSetter from '@/fabritor/components/ColorSetter';
import { GloablStateContext } from '@/context';
import { getGlobalEditor } from '@/utils/global';
import TextShadow from './TextShadow';
import TextPath from './TextPath';
import { drawTextPath, getPathOffset, removeTextPath } from '@/editor/textbox';

const { Item: FormItem } = Form;

export default function TextFx () {
  const [form] = Form.useForm();
  const { object, setFxType } = useContext(GloablStateContext);

  const handleFxValueChange = (values) => {
    const editor = getGlobalEditor();
    Object.keys(values).forEach((key) => {
      const v = values[key];
      if (key === 'shadow') {
        if (v.enable) {
          object.shadow = {
            color: v.color,
            blur: v.blur,
            offsetX: v.offset,
            offsetY: v.offset
          };
        } else {
          object.shadow = null;
        }
      } else if (key === 'path') {
        if (v.enable) {
          drawTextPath(object, v.offset);
        } else {
          removeTextPath(object);
        }
      } else {
        object.set(key, v);
      }
    });
    editor.canvas.requestRenderAll();
    editor.fireCustomModifiedEvent();
  }

  const initObjectFx = () => {
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
      }
    });
  }

  useEffect(() => {
    if (!object || (object.type !== 'textbox' && object.type !== 'f-text')) {
      setFxType('');
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
        <FormItem label="颜色" name="stroke">
          <ColorSetter />
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
      </Form>
    </div>
  )
}