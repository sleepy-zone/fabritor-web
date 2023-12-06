import { useContext } from 'react';
import { Flex, Layout } from 'antd';
import Export from './Export';
import BaseInfo from './BaseInfo';
import { GloablStateContext } from '@/context';
import { LOGO_ICON } from '@/assets/icon';

const { Header} = Layout;

const headerStyle: React.CSSProperties = {
  padding: '0 30px',
  height: 50,
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
      <Flex align="center" gap={12}>
        <img src={LOGO_ICON} />
        <span style={{ fontWeight: 'bold', fontSize: 16 }}>fabritor, A creative editor based on fabricjs.</span>
      </Flex>
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