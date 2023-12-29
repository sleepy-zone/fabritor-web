import { Flex, Popover, Space, Radio, Slider } from 'antd';
import ColorSetter from '@/fabritor/components/ColorSetter/Solid';

const BORDER_TYPES = [
  {
    key: 'none',
    svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.071 19.071c-3.905 3.905-10.237 3.905-14.142 0-3.905-3.905-3.905-10.237 0-14.142 3.905-3.905 10.237-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142ZM5.482 17.457 17.457 5.482A8.5 8.5 0 0 0 5.482 17.457Zm1.06 1.06A8.501 8.501 0 0 0 18.519 6.544L6.543 18.518Z" fill="currentColor"></path></svg>'
  },
  {
    key: 'line',
    svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><line x2="24" y1="50%" y2="50%" stroke="currentColor" stroke-width="2" shape-rendering="crispEdges"></line></svg>'
  },
  {
    key: '12,2',
    svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="-1" x2="25" y1="50%" y2="50%" stroke="currentColor" stroke-dasharray="12 2" stroke-width="2" shape-rendering="crispEdges"></line></svg>'
  },
  {
    key: '6,2',
    svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="1" x2="23" y1="50%" y2="50%" stroke="currentColor" stroke-dasharray="6 2" stroke-width="2" shape-rendering="crispEdges"></line></svg>'
  },
  {
    key: '2,2',
    svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="1" x2="23" y1="50%" y2="50%" stroke="currentColor" stroke-dasharray="2 2" stroke-width="2" shape-rendering="crispEdges"></line></svg>'
  }
]

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
          <Radio.Group
            value={value?.type}
            onChange={(v) => { handleChange(v.target.value, 'type') }}
          >
            {
              BORDER_TYPES.map(item => (
                <Radio.Button key={item.key} value={item.key}>
                  <span
                    dangerouslySetInnerHTML={{ __html: item.svg }}
                    style={{ 
                      display: 'inline-flex',
                      alignItems: 'center',
                      marginTop: 3
                    }}
                  />
                </Radio.Button>
              ))
            }
          </Radio.Group>
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
              value={value?.strokeWidth}
              onChange={(v) => { handleChange(v, 'strokeWidth') }}
            />
          </Space>
          <Space direction="vertical">
            <span>圆角</span>
            <Slider
              min={0}
              max={200}
              value={value?.borderRadius}
              onChange={(v) => { handleChange(v, 'borderRadius') }}
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