import { useContext } from 'react';
import { Flex, Layout } from 'antd';
import { LOGO_ICON2 } from '@/assets/icon';
import BaseInfo from '@/fabritor/UI/header/BaseInfo';
import Export from './export';
import { GloablStateContext } from '@/context';

const { Header} = Layout;

const headerStyle: React.CSSProperties = {
  padding: '0 16px',
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
      <Flex align="center" gap={8}>
        <img src={LOGO_ICON2} />
        <span style={{ fontWeight: 'bold', fontSize: 15 }}>ShotBeauty</span>
      </Flex>
      { isReady ? <BaseInfo /> : null }
      <Export type="button" />
    </Header>
  )
}