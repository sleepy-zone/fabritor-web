import { Layout, Tabs, Flex, FloatButton } from 'antd';
import { useContext } from 'react';
import {
  AlertOutlined,
  FileTextOutlined,
  PictureOutlined,
  BorderOutlined,
  BulbOutlined,
  AppstoreOutlined,
  GithubFilled,
} from '@ant-design/icons';
import TextPanel from './TextPanel';
import ImagePanel from './ImagePanel';
import ShapePanel from './ShapePanel';
import PaintPanel from './PaintPanel';
import DesignPanel from './DesignPanel';
import { GloablStateContext } from '@/context';
import AppPanel from './AppPanel';
import { PANEL_WIDTH } from '@/config';

import './index.scss';

const { Sider } = Layout;

const siderStyle: React.CSSProperties = {
  position: 'relative',
  backgroundColor: '#fff',
  borderRight: '1px solid #e8e8e8',
};

const iconStyle = { fontSize: 18, marginRight: 0 };

const OBJECT_TYPES = [
  {
    label: '图层',
    value: 'design',
    icon: <AlertOutlined style={iconStyle} />,
    children: <DesignPanel />,
  },
  {
    label: '文字',
    value: 'text',
    icon: <FileTextOutlined style={iconStyle} />,
    children: <TextPanel />,
  },
  {
    label: '图片',
    value: 'image',
    icon: <PictureOutlined style={iconStyle} />,
    children: <ImagePanel />,
  },
  {
    label: '素材',
    value: 'shape',
    icon: <BorderOutlined style={iconStyle} />,
    children: <ShapePanel />,
  },
  {
    label: '画笔',
    value: 'paint',
    icon: <BulbOutlined style={iconStyle} />,
    children: <PaintPanel />,
    isDrawingMode: true,
  },
  {
    label: '应用',
    value: 'app',
    icon: <AppstoreOutlined style={iconStyle} />,
    children: <AppPanel />,
  },
];

export default function Panel() {
  const { editor } = useContext(GloablStateContext);

  const renderLabel = (item) => {
    return (
      <Flex vertical justify="center">
        <div>{item.icon}</div>
        <div>{item.label}</div>
      </Flex>
    );
  };

  const handleTabChange = (k) => {
    if (editor?.canvas) {
      const findItem = OBJECT_TYPES.find((item) => item.value === k) || {
        isDrawingMode: false,
      };
      editor.canvas.isDrawingMode = !!findItem.isDrawingMode;
    }
  };

  return (
    <Sider style={siderStyle} width={PANEL_WIDTH} className="fabritor-sider">
      <Tabs
        tabPosition="left"
        style={{ flex: 1, overflow: 'auto' }}
        size="small"
        onChange={handleTabChange}
        items={OBJECT_TYPES.map((item) => {
          return {
            label: renderLabel(item),
            key: item.value,
            children: item.children,
          };
        })}
      />
      <FloatButton
        icon={<GithubFilled />}
        style={{ left: 10, bottom: 14 }}
        href="https://github.com/sleepy-zone/fabritor-web"
        target="_blank"
      />
    </Sider>
  );
}