import { Layout, Form, Slider } from 'antd';
import { useContext, useEffect } from 'react';
import { GloablStateContext } from '@/context';
import { getGlobalEditor } from '@/utils/global';
import Blank from './Blank';

const { Sider } = Layout;
const { Item: FormItem } = Form;

const siderStyle: React.CSSProperties = {
  height: '100%',
  backgroundColor: '#ffffff',
  padding: '32px 28px'
}

export default function Setter () {
  const [form] = Form.useForm();
  const { globalImage, isReady, setGlobalImage } = useContext(GloablStateContext);

  const handleValuesChange = (values) => {
    console.log(values);
    const keys = Object.keys(values);
    const editor = getGlobalEditor();
    const { image, paddingBase } = globalImage;
    for (let key of keys) {
      const value = values[key];
      switch(key) {
        case 'padding':
          const paddingValue = Math.round(paddingBase * value / 100)
          editor.setSketchSize({
            width: image.width + paddingValue,
            height: image.height + paddingValue
          }, true);
          editor.canvas.viewportCenterObject(image);
          setGlobalImage({ ...globalImage, paddingRatio: value });
          break;
        case 'borderRadius':
          image.setBorder({ borderRadius: value });
          editor.canvas.requestRenderAll();
        default:
          break;
      }
    }
  }

  useEffect(() => {
    if (globalImage && isReady) {
      const { paddingRatio, image } = globalImage;
      const { borderRadius } = image.getBorder();
      form.setFieldsValue({
        padding: paddingRatio,
        borderRadius
      });
    }
  }, [globalImage, isReady]);

  if (!isReady || !globalImage) {
    return <Sider style={siderStyle} width={340}><Blank /></Sider>;
  }

  return (
    <Sider style={siderStyle} width={340}> 
      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleValuesChange}
      >
        <FormItem label="边距" name="padding">
          <Slider min={0} max={100} />
        </FormItem>
        <FormItem label="圆角" name="borderRadius">
          <Slider min={0} max={100} />
        </FormItem>
        <FormItem label="背景" name="background">
          <Slider />
        </FormItem>
        <FormItem label="裁剪" name="clip">
          <Slider />
        </FormItem>
        <FormItem label="阴影" name="shadow">
          <Slider />
        </FormItem>
        <FormItem label="滤镜" name="fx">
          <Slider />
        </FormItem>
        <FormItem label="水印" name="waterMark">
          <Slider />
        </FormItem>
      </Form>
    </Sider>
  )
}