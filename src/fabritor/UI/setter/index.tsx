import { useContext } from 'react';
import { Layout } from 'antd';
import TextSetter from './TextSetter';
import ImageSetter from './ImageSetter';
import SketchSetter from './SketchSetter';
import { GloablStateContext } from '@/context';
import { LineSetter } from './ShapeSetter';

import './index.scss';

const { Sider } = Layout;

const siderStyle: React.CSSProperties = {
  backgroundColor: '#fff'
};

export default function Setter (props) {
  const { object, isReady } = useContext(GloablStateContext);
  const objectType = object?.get?.('type') || '';
  console.log('objectType', objectType);

  const renderSetter = () => {
    if (!isReady) return null;
    switch (objectType) {
      case 'textbox':
        return <TextSetter />;
      case 'image':
        return <ImageSetter />;
      case 'line':
      case 'arrow-line':
        return <LineSetter />;  
      default:
        return <SketchSetter />;
    }
  }

  return (
    <Sider
      style={siderStyle}
      width={340}
    >
      {renderSetter()}
    </Sider>
  )
}