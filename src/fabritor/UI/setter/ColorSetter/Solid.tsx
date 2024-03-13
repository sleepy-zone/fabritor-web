import { Popover } from 'antd';
import { Color, ColorPicker } from 'react-colors-beauty';

export default function SolidColorSetter (props) {
  const { value, onChange, trigger } = props;

  const handleChange = (v) => {
    onChange?.(v);
  }

  const calcTriggerBg = () => {
    const c = new Color(value);
    if (c.toHexString() === '#ffffff') {
      return 'rgba(103,103,103,0.24)';
    }
    return null;
  }

  const renderTrigger = () => {
    if (trigger) return trigger;
    return (
      <svg width={22} height={22} viewBox="64 64 896 896" focusable="false" fill={value} aria-hidden="true">
        <path d="M766.4 744.3c43.7 0 79.4-36.2 79.4-80.5 0-53.5-79.4-140.8-79.4-140.8S687 610.3 687 663.8c0 44.3 35.7 80.5 79.4 80.5zm-377.1-44.1c7.1 7.1 18.6 7.1 25.6 0l256.1-256c7.1-7.1 7.1-18.6 0-25.6l-256-256c-.6-.6-1.3-1.2-2-1.7l-78.2-78.2a9.11 9.11 0 00-12.8 0l-48 48a9.11 9.11 0 000 12.8l67.2 67.2-207.8 207.9c-7.1 7.1-7.1 18.6 0 25.6l255.9 256zm12.9-448.6l178.9 178.9H223.4l178.8-178.9zM904 816H120c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-80c0-4.4-3.6-8-8-8z"></path>
      </svg>
    )
  }

  return (
    <Popover
      content={
        <ColorPicker
          value={value}
          onChange={handleChange}
          format="hex"
        />
      }
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
    </Popover>
  )
}