import { useContext, useEffect } from 'react';
import { Space, Button } from 'antd';
import { BoldOutlined, ItalicOutlined, UnderlineOutlined, StrikethroughOutlined } from '@ant-design/icons';

const FONT_STYLES = [
  {
    icon: <BoldOutlined />,
    value: 'bold'
  },
  {
    icon: <ItalicOutlined />,
    value: 'italic'
  },
  {
    icon: <UnderlineOutlined />,
    value: 'underline'
  },
  {
    icon: <StrikethroughOutlined />,
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

  useEffect(() => {
    console.log(value)
  }, [value]);

  return (
    <Space.Compact block>
      {
        FONT_STYLES.map(FONT_STYLE => (
          <Button
            style={{ width: 50 }}
            icon={FONT_STYLE.icon}
            key={FONT_STYLE.value}
            type={ value?.[FONT_STYLE.value] ? 'primary' : 'default' }
            ghost={value?.[FONT_STYLE.value]}
            onClick={() => { handleClick(FONT_STYLE.value) }}
          />
        ))
      }
    </Space.Compact>
  )
}