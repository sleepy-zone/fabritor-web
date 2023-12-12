import { Flex, Space, Slider } from 'antd';
import ColorSetter from '@/fabritor/components/ColorSetter';

export default function TextShadow (props) {
  const { value, onChange } = props;

  const handleChange = (v, key) => {
    onChange && onChange({
      ...value,
      [key]: v
    });
  }

  return (
    <Flex vertical gap={8}>
      <Flex justify="space-between" align="center">
        <span>颜色</span>
        <ColorSetter
          value={value?.color}
          onChange={(v) => { handleChange(v, 'color') }}
        />
      </Flex>
      <Space direction="vertical">
        <span>模糊</span>
        <Slider
          min={0}
          max={100}
          style={{ width: '100%' }}
          value={value?.blur}
          onChange={(v) => { handleChange(v, 'blur') }}
        />
      </Space>
      <Space direction="vertical">
        <span>偏移量</span>
        <Slider
          min={-180}
          max={180}
          style={{ width: '100%' }}
          value={value?.offset}
          onChange={(v) => { handleChange(v, 'offset') }}
        />
      </Space>
    </Flex>
  )
}