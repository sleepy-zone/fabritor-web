import { Button, Form, Input, InputNumber, QRCode, Radio, Collapse, Flex } from 'antd';
import AppSubPanel from './AppSubPanel';
import ColorSetter from '@/fabritor/UI/setter/ColorSetter/Solid';
import { useContext, useEffect, useRef, useState } from 'react';
import { createImage } from '@/editor/objects/image';
import { GloablStateContext } from '@/context';
import { useTranslation } from '@/i18n/utils';

const { Item: FormItem } = Form;

export default function QRCodePanel (props) {
  const { back } = props;
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [QRCodeConfig, setQRCodeConfig] = useState({ value: 'fabritor' });
  const qrRef = useRef<HTMLDivElement>(null);
  const { editor } = useContext(GloablStateContext);
  const { t } = useTranslation();

  const handleValuesChange = (values) => {
    setQRCodeConfig({
      ...QRCodeConfig,
      ...values
    });
  }

  const add2Canvas = () => {
    if (!QRCodeConfig.value || !qrRef.current) return;
    const canvasEl = qrRef.current.querySelector('canvas');
    if (!canvasEl) return;
    const img = new Image();
    img.onload = () => {
      createImage({
        imageSource: img,
        canvas: editor.canvas
      });
    }
    img.src = canvasEl.toDataURL();
  }

  useEffect(() => {
    form.setFieldsValue({
      value: 'fabritor',
      size: 160
    });
    form2.setFieldsValue({
      color: '#000000',
      bgColor: '#00000000',
      iconSize: 40,
      errorLevel: 'M'
    });
  }, []);

  return (
    <AppSubPanel title={t('panel.app.qrcode')} back={back}>
      <Form
        form={form}
        onValuesChange={handleValuesChange}
      >
        <FormItem name="value" label={t('common.text')}>
          <Input />
        </FormItem>
        <FormItem name="size" label={t('common.size')}>
          <InputNumber />
        </FormItem>
      </Form>
      <Collapse
        items={[
          {
            key: '1',
            label: t('panel.app.more'),
            children: (
              <Form
                form={form2}
                onValuesChange={handleValuesChange}
              >
                <FormItem name="color" label={t('common.color')}>
                  <ColorSetter />
                </FormItem>
                <FormItem name="bgColor" label={t('common.background_color')}>
                  <ColorSetter />
                </FormItem>
                <FormItem name="errorLevel" label={t('panel.app.error_level')}>
                  <Radio.Group options={['L', 'M', 'Q', 'H']} />
                </FormItem>
                <FormItem name="icon" label={t('panel.app.image')}>
                  <Input placeholder={t('panel.app.only_image_url')} />
                </FormItem>
                <FormItem name="iconSize" label={t('panel.app.image_size')}>
                  <InputNumber />
                </FormItem>
              </Form>
            )
          }
        ]}
      />
      {
        QRCodeConfig.value ?
        <Flex vertical align="center" gap={10} style={{ marginTop: 16 }} ref={qrRef}> 
          <QRCode
            type="canvas"
            {...QRCodeConfig}
            style={{ maxWidth: 200 }}
          />
          <Button type="primary" onClick={add2Canvas}>{t('panel.app.add')}</Button>
        </Flex> : null
      }
    </AppSubPanel>
  )
}