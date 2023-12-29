import { ColorPicker } from 'antd';

export default function SolidColorSetter (props) {
  const { value, onChange, trigger } = props;

  const renderTrigger = () => {
    if (trigger) return trigger;
    return (
      <div style={{ width: 24, height: 24, backgroundColor: value, border: '1px solid #ccc', borderRadius: 4 }} />
    )
  }

  return (
    <ColorPicker
      value={value}
      onChange={onChange}
    >
      <div className="fabritor-toolbar-setter-trigger">
        {renderTrigger()}
      </div>
    </ColorPicker>
  )
}