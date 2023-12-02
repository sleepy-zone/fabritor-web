import { Flex, Popover, Space, Slider } from 'antd';
import ColorSetter from '@/fabritor/components/ColorSetter';

export default function BorderSetter (props) {
  const { value, onChange } = props;

  const handleChange = (v, key) => {
    onChange && onChange({
      ...value,
      [key]: v
    });
  }

  return (
    <Popover
      content={
        <Flex vertical gap={8}>
          <Space direction="vertical">
            <span>颜色</span>
            <ColorSetter
              value={value?.stroke}
              onChange={(v) => { handleChange(v, 'stroke') }}
            />
          </Space>
          <Space direction="vertical">
            <span>粗细</span>
            <Slider
              min={1}
              max={100}
              style={{ width: 180 }}
              value={value?.strokeWidth}
              onChange={(v) => { handleChange(v, 'strokeWidth') }}
            />
          </Space>
        </Flex>
      }
      placement="bottom"
      trigger="click"
    >
      <span className="fabritor-toolbar-setter-trigger">边框</span>
    </Popover>
  )
}