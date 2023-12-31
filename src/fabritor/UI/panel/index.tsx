import { Layout, Tabs, Flex, FloatButton } from 'antd';
import { useContext, useEffect } from 'react';
import { AlertOutlined, FileTextOutlined, PictureOutlined, BorderOutlined, BulbOutlined, AppstoreOutlined, GithubFilled } from '@ant-design/icons';
import TextPanel from './TextPanel';
import ImagePanel from './ImagePanel';
import ShapePanel from './ShapePanel';
import PaintPanel from './PaintPanel';
import DesignPanel from './DesignPanel';
import Header from '../header';
import TextFx from './TextFx';
import ImageFx from './ImageFx';
import { GloablStateContext } from '@/context';
import AppPanel from './AppPanel';

import './index.scss';
import { useState } from 'react';

const { Sider } = Layout;

const siderStyle: React.CSSProperties = {
  position: 'relative',
  backgroundColor: '#fff',
  borderRight: '1px solid #e8e8e8'
};

const iconStyle = { fontSize: 18, marginRight: 0 };

const OBJECT_TYPES = [
  {
    label: '设计',
    value: 'design',
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
    label: '素材',
    value: 'shape',
    icon: <BorderOutlined style={iconStyle} />
  },
  {
    label: '画笔',
    value: 'paint',
    icon: <BulbOutlined style={iconStyle} />
  },
  {
    label: '应用',
    value: 'app',
    icon: <AppstoreOutlined style={iconStyle} />
  }
];

export default function Panel () {
  const { fxType, setFxType } = useContext(GloablStateContext);
  const [activeKey, setActiveKey] = useState('design');
  const [designDefaultKey, setDesignDefaultKey] = useState('template');

  const renderPanel = (value) => {
    if (value === 'design') {
      return <DesignPanel defaultKey={designDefaultKey} />;
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
    if (value === 'paint') {
      return <PaintPanel />;
    }
    if (value === 'app') {
      return <AppPanel />;
    }
    return null;
  }

  const renderLabel = (item) => {
    return (
      <Flex vertical justify="center">
        <div>{item.icon}</div>
        <div>{item.label}</div>
      </Flex>
    )
  }

  const handleTabChange = (k) => {
    setDesignDefaultKey('layers');
    setActiveKey(k);
    setFxType('');
  }

  useEffect(() => {
    if (fxType) {
      setActiveKey('');
    } else {
      setActiveKey(activeKey || 'design');
      setDesignDefaultKey('layers');
    }
  }, [fxType]);

  return (
    <Sider
      style={siderStyle}
      width={420}
      className="fabritor-sider"
    >
      <Header />
      <Tabs
        activeKey={activeKey}
        tabPosition="left"
        style={{ flex: 1, overflow: 'auto' }}
        size="small"
        destroyInactiveTabPane
        onChange={handleTabChange}
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
      {
        fxType === 'text' ? <TextFx /> : null
      }
      {
        fxType === 'image' ? <ImageFx /> : null
      }
      <FloatButton
        icon={<GithubFilled />}
        style={{ left: 10, bottom: 14 }}
        href="https://github.com/sleepy-zone/fabritor-web"
        target="_blank"
      />
    </Sider>
  )
}