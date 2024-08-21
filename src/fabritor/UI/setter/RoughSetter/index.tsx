import { useContext, useEffect } from 'react';
import { fabric } from 'fabric';
import { Form } from 'antd';
import ColorSetter from '../ColorSetter/Solid';
import { GlobalStateContext } from '@/context';
import { useTranslation } from '@/i18n/utils';

const { Item: FormItem } = Form;

export default function RoughSetter() {
  const [form] = Form.useForm();
  const { editor, object } = useContext(GlobalStateContext);
  const { t } = useTranslation();

  const handleValuesChange = (values) => {
    Object.keys(values).forEach((key) => {
      if (object.type === 'path') {
        object.set('stroke', values[key]);
      } else {
        const _objects = (object as fabric.Group).getObjects();
        if (key === 'stroke') {
          _objects[1].set('stroke', values[key]);
        } else if (key === 'fill') {
          _objects[0].set('stroke', values[key]);
        }
      }
    });
    editor.canvas.requestRenderAll();
    editor.fireCustomModifiedEvent();
  }

  useEffect(() => {
    if (object?.sub_type) {
      if (object.type === 'path') {
        form.setFieldsValue({
          stroke: object.stroke
        });
      } else {
        const _objects = (object as fabric.Group).getObjects();
        form.setFieldsValue({
          stroke: _objects[1].stroke,
          fill: _objects[0].stroke
        });
      }
    }
  }, [editor]);

  return (
    <Form
      colon={false}
      form={form}
      onValuesChange={handleValuesChange}
    >
      <FormItem
        label={t('common.stroke')}
        name="stroke"
      >
        <ColorSetter />
      </FormItem>
      {
        object?.type === 'group' ?
        <FormItem
          label={t('common.fill')}
          name="fill"
        >
          <ColorSetter />
        </FormItem> : null
      }
    </Form>
  );
}