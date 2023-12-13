import { Flex, Card } from 'antd';
import { QrcodeOutlined, SmileOutlined } from '@ant-design/icons';
import { useState } from 'react';
import QRCodePanel from './QRCode';
import EmojiPanel from './Emoji';

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
  const [app, setApp] = useState('');
  
  const handleAppClick = (item) => {
    setApp(item.key);
  }

  const back2List = () => { setApp(''); }

  const renderAppList = () => {
    return (
      <Flex
        wrap="wrap"
        gap={12}
        justify="space-around"
        style={{ padding: '16px 16px 16px 0', marginLeft: -8 }}
      >
        {
          APP_LIST.map(item => (
            <Card
              hoverable
              style={{ width: 150, paddingTop: 12 }}
              key={item.key}
              cover={item.icon}
              bodyStyle={{ padding: 12 }}
              onClick={() => { handleAppClick(item) }}
            >
              <Card.Meta description={item.title} style={{ textAlign: 'center' }} />
            </Card>
          ))
        }
      </Flex>
    )
  }

  const renderApp = () => {
    if (app === 'qrcode') {
      return <QRCodePanel back={back2List} />;
    }
    if (app === 'emoji') {
      return <EmojiPanel back={back2List} />
    }
    return null;
  }

  return (
    <div>
      {
        app ? renderApp() : renderAppList()
      }
    </div>
  )
}