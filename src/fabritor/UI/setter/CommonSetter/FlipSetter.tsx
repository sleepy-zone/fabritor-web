import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { Trans } from '@/i18n/utils';

const items: MenuProps['items'] = [
  {
    key: 'flipX',
    label: <Trans i18nKey="setter.common.flip_x" />
  },
  {
    key: 'flipY',
    label: <Trans i18nKey="setter.common.flip_y" />
  }
]

export default function FlipSetter (props) {
  const { onChange } = props;

  const onClick = ({ key }) => {
    onChange?.(key);
  }
  
  return (
    <Dropdown
      placement="bottom"
      trigger={["click"]}
      menu={{ items, onClick }}
      arrow
    >
      <span>
      <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 10H40C41.8856 10 42.8284 10 43.4142 10.5858C44 11.1716 44 12.1144 44 14V34C44 35.8856 44 36.8284 43.4142 37.4142C42.8284 38 41.8856 38 40 38H30" stroke="currentColor" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter"/><path d="M18 10H8C6.11438 10 5.17157 10 4.58579 10.5858C4 11.1716 4 12.1144 4 14V34C4 35.8856 4 36.8284 4.58579 37.4142C5.17157 38 6.11438 38 8 38H18" stroke="currentColor" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter"/><path d="M24 6V42" stroke="currentColor" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter"/></svg>
      </span>
    </Dropdown>
  )
}