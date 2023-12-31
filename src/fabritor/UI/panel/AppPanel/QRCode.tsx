import { Button, Form, Input, InputNumber, QRCode, Radio, Collapse, Flex } from 'antd';
import AppSubPanel from './AppSubPanel';
import ColorSetter from '@/fabritor/components/ColorSetter/Solid';
import { useEffect, useRef, useState } from 'react';
import { createImage } from '@/editor/image';

const { Item: FormItem } = Form;

export default function QRCodePanel (props) {
  const { back } = props;
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [QRCodeConfig, setQRCodeConfig] = useState({ value: 'fabritor' });
  const qrRef = useRef<HTMLDivElement>(null);

  const handleValuesChange = (values) => {
    setQRCodeConfig({
      ...QRCodeConfig,
      ...values
    });
  }

  const add2Canvas = () => {
    if (!QRCodeConfig.value || !qrRef.current) return;
    const canvas = qrRef.current.querySelector('canvas');
    if (!canvas) return;
    const img = new Image();
    img.onload = () => {
      createImage({
        imageSource: img
      });
    }
    img.src = canvas.toDataURL();
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
    <AppSubPanel title="二维码" back={back}>
      <Form
        form={form}
        onValuesChange={handleValuesChange}
      >
        <FormItem name="value" label="文本">
          <Input />
        </FormItem>
        <FormItem name="size" label="大小">
          <InputNumber />
        </FormItem>
      </Form>
      <Collapse
        items={[
          {
            key: '1',
            label: '其他设置',
            children: (
              <Form
                form={form2}
                onValuesChange={handleValuesChange}
              >
                <FormItem name="color" label="颜色">
                  <ColorSetter />
                </FormItem>
                <FormItem name="bgColor" label="背景色">
                  <ColorSetter />
                </FormItem>
                <FormItem name="errorLevel" label="纠错等级">
                  <Radio.Group options={['L', 'M', 'Q', 'H']} />
                </FormItem>
                <FormItem name="icon" label="内置图片">
                  <Input placeholder="仅支持图片链接" />
                </FormItem>
                <FormItem name="iconSize" label="内置图片大小">
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
          <Button type="primary" onClick={add2Canvas}>添加至画布</Button>
        </Flex> : null
      }
    </AppSubPanel>
  )
}