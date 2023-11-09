import { Layout } from 'antd';
import Export from './Export';

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
  return (
    <Header style={headerStyle}>
      <div>fabritor, A creative editor based on fabricjs.</div>
      <Export />
    </Header>
  )
}