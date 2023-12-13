import { LeftOutlined } from '@ant-design/icons';
import { Card, Flex } from 'antd';

export default function AppSubPanel (props) {
  const { title, children, back } = props;

  const back2AppList = () => {
    back && back();
  }

  return (
    <Card
      bordered={false}
      style={{ marginLeft: -24, boxShadow: 'none' }}
      bodyStyle={{ padding: 12 }}
      title={
        <Flex justify="space-between">
          <LeftOutlined onClick={back2AppList} />
          <p>{title}</p>
        </Flex>
      }
    >
      {children}
    </Card>
  )
}