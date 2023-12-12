import { Flex, Card } from 'antd';
import { QrcodeOutlined, SmileOutlined } from '@ant-design/icons';

const APP_LIST = [
  {
    title: '二维码',
    key: 'qrcode',
    icon: <QrcodeOutlined style={{ fontSize: 30 }} />
  },
  {
    title: 'Emoji',
    key: 'emoji',
    icon: <SmileOutlined style={{ fontSize: 30 }} />
  }
];

export default function AppPanel () {
  return (
    <div className="fabritor-panel-text-wrapper">
      <Flex
        wrap="wrap"
        gap={12}
        justify="space-around"
      >
        {
          APP_LIST.map(item => (
            <Card
              hoverable
              style={{ width: 150, paddingTop: 12 }}
              key={item.key}
              cover={item.icon}
              bodyStyle={{ padding: 12 }}
            >
              <Card.Meta description={item.title} style={{ textAlign: 'center' }} />
            </Card>
          ))
        }
      </Flex>
    </div>
  )
}