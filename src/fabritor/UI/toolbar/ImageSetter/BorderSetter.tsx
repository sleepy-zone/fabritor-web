import { Popover, Slider } from 'antd';

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
        <Slider
          min={0}
          max={200}
          style={{ width: 200 }}
          value={value?.borderRadius}
          onChange={(v) => { handleChange(v, 'borderRadius') }}
        />
      }
      placement="bottom"
      trigger="click"
    >
      <span className="fabritor-toolbar-setter-trigger">圆角</span>
    </Popover>
  )
}