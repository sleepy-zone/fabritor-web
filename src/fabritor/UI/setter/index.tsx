import { Layout } from 'antd';

const { Sider } = Layout;

const siderStyle: React.CSSProperties = {
  backgroundColor: '#fff'
};

export default function Setter () {
  return (
    <Sider
      style={siderStyle}
      width={300}
    >
      Setter
    </Sider>
  )
}