import { useContext, useEffect } from 'react';
import { fabric } from 'fabric';
import { Form } from 'antd';
import ColorSetter from '../ColorSetter';
import SizeSetter from '../SizeSetter';
import { GlobalStateContext } from '@/context';
import { transformColors2Fill, transformFill2Colors } from '@/utils';
import { useTranslation } from '@/i18n/utils';

const { Item: FormItem } = Form;

export default function SketchSetter() {
  const [form] = Form.useForm();
  const { editor } = useContext(GlobalStateContext);
  const { t } = useTranslation();

  const handleFill = (_fill) => {
    const { sketch, canvas } = editor;
    let fill = transformColors2Fill(_fill);
    if (typeof fill !== 'string') {
      fill = new fabric.Gradient(fill);
    }
    sketch.set('fill', fill);
    canvas.requestRenderAll();
  }

  const handleValuesChange = (values) => {
    Object.keys(values).forEach((key) => {
      if (key === 'size') {
        editor.setSketchSize({ width: values[key][0], height: values[key][1] });
      } else if (key === 'fill') {
        handleFill(values[key]);
      }
    });
    editor.fireCustomModifiedEvent();
  }

  useEffect(() => {
    if (!editor) return;
    const { sketch } = editor;
    form.setFieldsValue({
      size: [sketch.width, sketch.height],
      fill: transformFill2Colors(sketch.fill)
    });
  }, [editor]);

  return (
    <Form
      layout="vertical"
      colon={false}
      form={form}
      onValuesChange={handleValuesChange}
    >
      <FormItem label={t('setter.sketch.size')} name="size">
        <SizeSetter />
      </FormItem>
      <FormItem label={t('setter.sketch.fill')} name="fill">
        <ColorSetter type="sketch" />
      </FormItem>
    </Form>
  );
}