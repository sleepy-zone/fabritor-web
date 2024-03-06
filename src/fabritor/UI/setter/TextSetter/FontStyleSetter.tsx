import { Space, Button, Popover } from 'antd';
import { BoldOutlined, ItalicOutlined, UnderlineOutlined, StrikethroughOutlined } from '@ant-design/icons';

const FONT_STYLES = [
  {
    icon: BoldOutlined,
    value: 'bold'
  },
  {
    icon: ItalicOutlined,
    value: 'italic'
  },
  {
    icon: UnderlineOutlined,
    value: 'underline'
  },
  {
    icon: StrikethroughOutlined,
    value: 'linethrough'
  }
]

export default function FontStylePanel (props) {
  const { value, onChange } = props;

  const handleClick = (v) => {
    onChange && onChange({
      ...value,
      [v]: !value[v]
    });
  }

  return (
    <Popover
      content={
        <Space.Compact block>
          {
            FONT_STYLES.map(FONT_STYLE => (
              <Button
                style={{ width: 46 }}
                icon={
                  <FONT_STYLE.icon
                    style={{ 
                      color: value?.[FONT_STYLE.value] ? '#1677ff' : ''
                    }}
                  />
                }
                key={FONT_STYLE.value}
                onClick={() => { handleClick(FONT_STYLE.value) }}
              />
            ))
          }
        </Space.Compact>
      }
      placement="bottom"
      trigger="click"
    >
      <span className="fabritor-toolbar-setter-trigger">
        <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 6H42V16" stroke="#000000" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter"/><path d="M17 32L19.1875 27M31 32L28.8125 27M19.1875 27L24 16L28.8125 27M19.1875 27H28.8125" stroke="#000000" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter"/><path d="M16 6H6V16" stroke="#000000" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter"/><path d="M32 42H42V32" stroke="#000000" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter"/><path d="M16 42H6V32" stroke="#000000" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter"/></svg>
      </span>
    </Popover>
  )
}