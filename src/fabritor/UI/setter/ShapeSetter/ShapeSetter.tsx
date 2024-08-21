import { useContext, useEffect } from 'react';
import { fabric } from 'fabric';
import { Form } from 'antd';
import { GlobalStateContext } from '@/context';
import ColorSetter from '../ColorSetter';
import BorderSetter, { getObjectBorderType, getStrokeDashArray } from '../BorderSetter';
import { transformColors2Fill, transformFill2Colors } from '@/utils';
import { useTranslation } from '@/i18n/utils';

const { Item: FormItem } = Form;

export default function ShapeSetter () {
  const { object, editor } = useContext(GlobalStateContext);
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleBorder = (border) => {
    const { type, stroke = '#000', strokeWidth, borderRadius } = border || {};
    if (type === 'none') {
      object.set({ stroke: null, strokeWidth: 1 });
    } else {
      object.set({
        stroke,
        strokeWidth,
        strokeDashArray: getStrokeDashArray({ type, strokeWidth })
      });
    }

    if (object.type === 'rect') {
      object.set({
        rx: borderRadius,
        ry: borderRadius
      });
    } else {
      object.set('strokeLineJoin', borderRadius > 0 ? 'round' : 'miter');
    }

    object.setCoords();
    editor.canvas.requestRenderAll();
  }

  const handleValuesChange = (values) => {
    if (values.fill) {
      let fill = transformColors2Fill(values.fill);
      if (typeof fill !== 'string') {
        fill = new fabric.Gradient(fill);
      }
      object.set('fill', fill);
      editor.canvas.requestRenderAll();
    }
    if (values.border) {
      handleBorder(values.border);
    }
  }


  useEffect(() => {
    if (object) {
      form.setFieldsValue({
        border: {
          type: getObjectBorderType(object),
          stroke: object.stroke || '#000000',
          strokeWidth: object.strokeWidth || 1,
          borderRadius: object.rx || object.ry || (object.strokeLineJoin === 'round' ? 100 : 0)
        },
        fill: transformFill2Colors(object.fill)
      });
    }
  }, [object]);

  return (
    <Form
      form={form}
      onValuesChange={handleValuesChange}
      colon={false}
    >
      <FormItem name="fill" label={t('common.color')}>
        <ColorSetter defaultColor="#000000" />
      </FormItem>
      <FormItem
        name="border"
        label={<span style={{ fontWeight: 'bold', fontSize: 15 }}>{t('common.border')}</span>}
        labelCol={{ span: 24 }}
      >
        <BorderSetter />
      </FormItem>
    </Form>
  )
}