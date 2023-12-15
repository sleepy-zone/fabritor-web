import { Flex, Layout } from 'antd';
import { LOGO_ICON } from '@/assets/icon';

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
  return (
    <Header style={headerStyle}>
      <Flex align="center" gap={5}>
        <img src={LOGO_ICON} />
        <span style={{ fontWeight: 'bold', fontSize: 15 }}>fabritor, A creative editor based on fabricjs.</span>
      </Flex>
    </Header>
  )
}