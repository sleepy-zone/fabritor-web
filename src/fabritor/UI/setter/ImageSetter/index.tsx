import { fabric } from 'fabric';
import { useContext, useEffect } from 'react';
import { Col, Form, Row } from 'antd';
import { FunctionOutlined, RightOutlined } from '@ant-design/icons';
import ReplaceSetter from './ReplaceSetter';
import { GloablStateContext } from '@/context';
import FlipSetter from './FlipSetter';
import BorderSetter from './BorderSetter';
import { getObjectBorderType, getStrokeDashArray } from '../BorderSetter'
import ClipSetter from './Clip';
import Title from '@/fabritor/components/Title';
import FList from '@/fabritor/components/FList';

const { Item: FormItem } = Form;

const IMAGE_ADVANCE_CONFIG = [
  {
    icon: <FunctionOutlined style={{ fontSize: 22 }} />,
    label: '特效',
    key: 'fx'
  }
];

export default function ImageSetter () {
  const { object, setFxType, editor } = useContext(GloablStateContext);
  const [form] = Form.useForm();

  const handleImageReplace = (base64) => {
    if (base64) {
      (object as fabric.Image).setSrc(base64, () => {
        editor.canvas.requestRenderAll();
      });
    }
  }

  const handleBorder = (border) => {
    const { type, stroke = '#000000', strokeWidth, borderRadius } = border || {};
    if (type === 'none') {
      object.setBorder({ stroke: null, borderRadius });
    } else {
      object.setBorder({
        stroke,
        strokeWidth,
        borderRadius,
        strokeDashArray: getStrokeDashArray(border)
      });
    }

    editor.canvas.requestRenderAll();
  }

  const handleValuesChange = (values) => {
    if (values.img) {
      handleImageReplace(values.img);
    }
    if (values.flip) {
      object.set(values.flip, !object[values.flip]);
      editor.canvas.requestRenderAll();
    }
    if (values.border) {
      handleBorder(values.border);
    }
    editor.fireCustomModifiedEvent();
  }

  useEffect(() => {
    if (object) {
      const border = object.getBorder();
      form.setFieldsValue({
        border: {
          type: getObjectBorderType(border),
          ...border,
          stroke: border.stroke || '#000000'
        },
        opacity: object.opacity
      });
    }
  }, [object]);

  return (
    <>
    <Form
      form={form}
      onValuesChange={handleValuesChange}
      colon={false}
    >
      <FormItem name="img">
        <ReplaceSetter />
      </FormItem>
      <Row gutter={8}>
        <Col span={12}>
          <FormItem>
            <ClipSetter object={object} />
          </FormItem>
        </Col>
        {/* <FormItem name="flip">
          <FlipSetter />
        </FormItem> */}
        <Col span={12}>
          <FormItem name="border">
            <BorderSetter />
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Title>高级设置</Title>
    <FList 
        dataSource={IMAGE_ADVANCE_CONFIG}
        renderItemChildren={(item) => (
          <>
            {item.icon}
            <span style={{ fontSize: 16, fontWeight: 'bold', margin: '0 6px 0 10px' }}>
              {item.label}
            </span>
            <RightOutlined />
          </>
        )}
      />
    </>
  )
}