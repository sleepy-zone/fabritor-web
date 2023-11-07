import { Layout, Tabs, Flex } from 'antd';
import { AlertOutlined, FileTextOutlined, PictureOutlined } from '@ant-design/icons';
import TextPanel from './TextPanel';
import ImagePanel from './ImagePanel';

import './index.scss';

const { Sider } = Layout;

const siderStyle: React.CSSProperties = {
  backgroundColor: '#fff'
};

const iconStyle = { fontSize: 18, marginRight: 0 };

const OBJECT_TYPES = [
  {
    label: '模板',
    value: 'template',
    icon: <AlertOutlined style={iconStyle} />
  },
  {
    label: '文字',
    value: 'text',
    icon: <FileTextOutlined style={iconStyle} />
  },
  {
    label: '图片',
    value: 'image',
    icon: <PictureOutlined style={iconStyle} />
  }
]

export default function Panel () {
  const renderPanel = (value) => {
    if (value === 'template') {
      return '模板'
    }
    if (value === 'text') {
      return <TextPanel />;
    }
    if (value === 'image') {
      return <ImagePanel />;
    }
    return value;
  }

  const renderLabel = (item) => {
    return (
      <Flex vertical justify="center">
        <div>{item.icon}</div>
        <div>{item.label}</div>
      </Flex>
    )
  }

  return (
    <Sider
      style={siderStyle}
      width={360}
    >
      <Tabs
        defaultActiveKey='image'
        tabPosition="left"
        style={{ height: '100%' }}
        size="small"
        items={
          OBJECT_TYPES.map((item) => {
            return {
              label: renderLabel(item),
              key: item.value,
              children: renderPanel(item.value)
            };
          })
        }
      />
    </Sider>
  )
}