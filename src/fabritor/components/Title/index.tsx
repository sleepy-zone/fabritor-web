import { Divider } from 'antd';

export default function (props) {
  const { children } = props;
  return (
    <Divider>{children}</Divider>
  )
}