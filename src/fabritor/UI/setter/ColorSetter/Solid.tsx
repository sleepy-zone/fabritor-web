import { ColorPicker } from 'antd';
import { Color } from 'react-colors-beauty';

export default function SolidColorSetter (props) {
  const { value, onChange, trigger } = props;

  const handleChange = (v) => {
    onChange && onChange(v.toHexString());
  }

  const calcTriggerBg = () => {
    if (value?.type === 'solid') {
      const c = new Color(value.color);
      if (c.toHexString() === '#ffffff') {
        return 'rgba(103,103,103,0.24)';
      }
    }
    return null;
  }

  const renderTrigger = () => {
    if (trigger) return trigger;
    return (
      <div style={{ width: 24, height: 24, backgroundColor: value, border: '1px solid #ccc', borderRadius: 4 }} />
    )
  }

  return (
    <ColorPicker
      value={value}
      onChange={handleChange}
    >
      <div 
        className="fabritor-toolbar-item"
        style={{
          borderRadius: 4,
          backgroundColor: calcTriggerBg()
        }}
      >
        {renderTrigger()}
      </div>
    </ColorPicker>
  )
}