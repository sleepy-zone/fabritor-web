import { useContext } from 'react';
import { Layout } from 'antd';
import TextSetter from './TextSetter';
import ImageSetter from './ImageSetter';
import { GloablStateContext } from '@/context';

import './index.scss';

const { Sider } = Layout;

const siderStyle: React.CSSProperties = {
  backgroundColor: '#fff'
};

export default function Setter (props) {
  const { object } = useContext(GloablStateContext);
  const objectType = object?.get?.('type') || '';
  console.log('objectType', objectType);

  return (
    <Sider
      style={siderStyle}
      width={300}
    >
      {
        objectType === 'textbox' ?
        <TextSetter /> : null
      }
      {
        objectType === 'image' ?
        <ImageSetter /> : null
      }
    </Sider>
  )
}