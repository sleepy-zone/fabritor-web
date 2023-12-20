import { Flex, Popover, Space, Radio, Slider, Switch } from 'antd';

const BORDER_TYPES = [
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

export default function StrokeSetter (props) {
  const { value, onChange, borderTypesDisabled } = props;

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
            disabled={borderTypesDisabled}
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
            <Switch checked={value?.round} onChange={ (v) => { handleChange(v, 'round')} } />
          </Space>
        </Flex>
      }
      placement="bottom"
      trigger="click"
    >
      <span className="fabritor-toolbar-setter-trigger">线段</span>
    </Popover>
  )
}