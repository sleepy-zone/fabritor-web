import { useContext, useEffect, useState } from 'react';
import { Layout, Typography } from 'antd';
import { GloablStateContext } from '@/context';
import { SKETCH_ID } from '@/utils/constants';
import SketchSetter from './SketchSetter';
import TextSetter from './TextSetter';
import { CenterV } from '@/fabritor/components/Center';

const { Sider } = Layout;
const { Title } = Typography;

const siderStyle: React.CSSProperties = {
  position: 'relative',
  backgroundColor: '#fff',
  borderLeft: '1px solid #e8e8e8'
};

export default function Setter () {
  const { object, isReady } = useContext(GloablStateContext);
  const objectType = object?.get?.('type') || '';
  console.log('objectType', objectType, object);

  const renderSetter = () => {
    if (!isReady) return null;
    if (!object || object.id === SKETCH_ID) return <SketchSetter />;
    switch (objectType) {
      case 'textbox':
      case 'f-text':
        return <TextSetter />;
      // case 'rect':
      // case 'circle':
      // case 'triangle':
      // case 'polygon':
      // case 'ellipse':  
      //   return <ShapeSetter />;
      // case 'line':
      // case 'f-line':
      // case 'f-arrow':
      // case 'f-tri-arrow':
      //   return <LineSetter />;
      // case 'f-image':
      //   return <ImageSetter />;
      // case 'image':
      // case 'path':
      // case 'group':
      // case 'activeSelection':
      //   return null;
      default:
        return <SketchSetter />;
    }
  }

  const getSetterTitle = () => {
    if (!isReady) return null;
    if (!object || object.id === SKETCH_ID) return '画布';
    switch (objectType) {
      case 'textbox':
      case 'f-text':
        return '文字';
      case 'rect':
      case 'circle':
      case 'triangle':
      case 'polygon':
      case 'ellipse':  
        return '形状';
      case 'line':
      case 'f-line':
      case 'f-arrow':
      case 'f-tri-arrow':
        return '线条';
      case 'f-image':
        return '图片';
      // case 'image':
      // case 'path':
      case 'group':
      case 'activeSelection':
        return '组合';
      default:
        return '画布';
    }
  }

  const renderSetterTitle = () => {
    const title = getSetterTitle();
    if (!title) {
      return null;
    }
    return (
      <CenterV style={{ borderBottom: '1px solid #e8e8e8', paddingLeft: 16 }}>
        <Title level={5}>
          {getSetterTitle()}
        </Title>
      </CenterV>
    )
  }

  return (
    <Sider
      style={siderStyle}
      width={280}
      className="fabritor-sider"
    >
      {renderSetterTitle()}
      <div
        style={{ padding: 16 }}
      >
        {renderSetter()}
      </div>
    </Sider>
  )
}