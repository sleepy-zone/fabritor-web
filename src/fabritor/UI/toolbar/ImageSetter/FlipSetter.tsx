import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';

const items: MenuProps['items'] = [
  {
    key: 'flipX',
    label: '水平翻转'
  },
  {
    key: 'flipY',
    label: '垂直翻转'
  }
]

export default function FlipSetter (props) {
  const { onChange } = props;

  const onClick = ({ key }) => {
    onChange && onChange(key);
  }
  
  return (
    <Dropdown
      placement="bottom"
      trigger={["click"]}
      menu={{ items, onClick }}
      arrow
    >
      <span className="fabritor-toolbar-setter-trigger">翻转</span>
    </Dropdown>
  )
}