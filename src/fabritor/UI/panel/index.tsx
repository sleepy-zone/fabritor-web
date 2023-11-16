import { Layout, Tabs, Flex } from 'antd';
import { AlertOutlined, FileTextOutlined, PictureOutlined, BorderOutlined, BulbOutlined } from '@ant-design/icons';
import TextPanel from './TextPanel';
import ImagePanel from './ImagePanel';
import TemplatePanel from './TemplatePanel';
import ShapePanel from './ShapePanel';

import './index.scss';

const { Sider } = Layout;

const siderStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRight: '1px solid #e8e8e8'
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
  },
  {
    label: '形状',
    value: 'shape',
    icon: <BorderOutlined style={iconStyle} />
  },
  {
    label: '画笔',
    value: 'paint',
    icon: <BulbOutlined style={iconStyle} />
  }
]

export default function Panel () {
  const renderPanel = (value) => {
    if (value === 'template') {
      return <TemplatePanel />;
    }
    if (value === 'text') {
      return <TextPanel />;
    }
    if (value === 'image') {
      return <ImagePanel />;
    }
    if (value === 'shape') {
      return <ShapePanel />;
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
        defaultActiveKey='template'
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