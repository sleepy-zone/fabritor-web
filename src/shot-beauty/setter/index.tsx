import { Layout, Form, Slider } from 'antd';

const { Sider } = Layout;
const { Item: FormItem } = Form;

const siderStyle: React.CSSProperties = {
  height: '100%',
  backgroundColor: '#ffffff',
  padding: '32px 28px'
}

export default function Setter () {
  const [form] = Form.useForm();
  return (
    <Sider style={siderStyle} width={340}> 
      <Form
        form={form}
        layout="vertical"
      >
        <FormItem label="外边距" name="padding">
          <Slider />
        </FormItem>
        <FormItem label="背景" name="back">
          <Slider />
        </FormItem>
        <FormItem label="边框" name="border">
          <Slider />
        </FormItem>
        <FormItem label="裁剪" name="clip">
          <Slider />
        </FormItem>
        <FormItem label="特效" name="fx">
          <Slider />
        </FormItem>
        <FormItem label="水印" name="waterMark">
          <Slider />
        </FormItem>
      </Form>
    </Sider>
  )
}