import { Layout } from 'antd';
import Header from './UI/header';
import Panel from './UI/panel';
import Setter from './UI/setter';

const { Content } = Layout;

const contentStyle: React.CSSProperties = {
  backgroundColor: '#ddd',
};

export default function Fabritor () {
  return (
    <Layout style={{ height: '100%' }} className="fabritor-layout">
      <Header />
      <Layout>
        <Panel />
        <Content style={contentStyle}>main content</Content>
        <Setter />
      </Layout>
    </Layout>
  )
}