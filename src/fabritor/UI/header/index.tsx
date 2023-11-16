import { useContext } from 'react';
import { Flex, Layout } from 'antd';
import Export from './Export';
import BaseInfo from './BaseInfo';
import { GloablStateContext } from '@/context';

const { Header} = Layout;

const headerStyle: React.CSSProperties = {
  height: 54,
  backgroundColor: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid #e8e8e8'
};

export default function () {
  const { isReady } = useContext(GloablStateContext);
  return (
    <Header style={headerStyle}>
      <div>fabritor, A creative editor based on fabricjs.</div>
      {
        isReady ?
        <Flex gap={40} align="center">
          <BaseInfo />
          <Export />
        </Flex> : null
      }
    </Header>
  )
}