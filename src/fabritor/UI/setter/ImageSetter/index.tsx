import { Tabs } from 'antd';
import { FunctionOutlined, BarsOutlined, ExpandOutlined } from '@ant-design/icons';

const IMAGE_SETTER_TYPES = [
  {
    label: '滤镜',
    value: 'fx',
    icon: FunctionOutlined
  },
  {
    label: '调整',
    value: 'opt',
    icon: BarsOutlined
  },
  {
    label: '裁剪',
    value: 'clip',
    icon: ExpandOutlined
  },
]

export default function ImageSetter () {
  return (
    <Tabs
      centered
      items={IMAGE_SETTER_TYPES.map(item => ({
        label: (
          <span>
            <item.icon />
            {item.label}
          </span>
        ),
        key: item.value,
        children: item.label
      }))}
    />
  );
}