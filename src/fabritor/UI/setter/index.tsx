import { useContext } from 'react';
import { Layout } from 'antd';
import TextSetter from './TextSetter';
import { GloablStateContext } from '@/context';

import './index.scss';

const { Sider } = Layout;

const siderStyle: React.CSSProperties = {
  backgroundColor: '#fff'
};

export default function Setter (props) {
  const { object } = useContext(GloablStateContext);
  const objectType = object?.get?.('type') || '';

  return (
    <Sider
      style={siderStyle}
      width={300}
    >
      {
        objectType === 'textbox' ?
        <TextSetter object={object} /> : null
      }
    </Sider>
  )
}