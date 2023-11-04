import { Layout } from 'antd';

const { Header} = Layout;

const headerStyle: React.CSSProperties = {
  height: 48,
  lineHeight: '48px',
  backgroundColor: '#fff',
  borderBottom: '1px solid #ddd'
};

export default function () {
  return (
    <Header style={headerStyle}>
      fabritor web
    </Header>
  )
}