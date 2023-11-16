import { Popover, InputNumber, Space, Button } from 'antd';
import { useEffect, useState } from 'react';

export default function SizeSetter (props) {
  const { value, onChange } = props;
  const [innerValue, setInnerValue] = useState<number[]>([]);

  const handleChange = (v, index) => {
    const _innerValue = [...innerValue];
    _innerValue[index] = v;
    setInnerValue(_innerValue);
  }

  const handleConfirm = () => {
    onChange(innerValue);
  }

  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  return (
    <Popover
      content={
        <Space>
          宽度：<InputNumber value={innerValue?.[0]} onChange={(v) => { handleChange(v, 0) }}/>
          高度：<InputNumber value={innerValue?.[1]} onChange={(v) => { handleChange(v, 1) }} />
          <Button type="primary" onClick={handleConfirm}>确认</Button>
        </Space>
      }
      placement="bottom"
      trigger="click"
    >
      <span className="fabritor-toolbar-setter-trigger">画布尺寸</span>
    </Popover>
  )
}