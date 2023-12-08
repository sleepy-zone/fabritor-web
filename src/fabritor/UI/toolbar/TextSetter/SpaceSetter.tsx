import { Flex, Popover, Space, Radio, Slider } from 'antd';
import { LineHeightOutlined } from '@ant-design/icons';

export default function SpaceSetter (props) {
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
        <Flex vertical gap={8} style={{ width: 200 }}>
          <Space direction="vertical">
            <span>行间距</span>
            <Slider
              min={0.5}
              max={2.5}
              step={0.01}
              value={value?.lineHeight}
              onChange={(v) => { handleChange(v, 'lineHeight') }}
            />
          </Space>
          <Space direction="vertical">
            <span>字间距</span>
            <Slider
              min={-200}
              max={800}
              step={1}
              value={value?.charSpacing}
              onChange={(v) => { handleChange(v, 'charSpacing') }}
            />
          </Space>
        </Flex>
      }
      placement="bottom"
      trigger="click"
    >
      <span className="fabritor-toolbar-setter-trigger">
        <LineHeightOutlined style={{ fontSize: 22 }} />
      </span>
    </Popover>
  )
}