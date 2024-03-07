import { ColorPicker } from 'antd';
import { Color } from 'react-colors-beauty';

const colors = [
  '#9AC1F0', '#72FA93', '#A0E548', '#E45F2B', '#F6C445',
  '#93AEC1', '#9DBDBA', '#F8B042', '#EC6A52', '#F3B7AD',
  '#BD9E84', '#C5DFDF', '#E68815', '#A71666', '#D31638',
  '#45496A', '#7D8BAE', '#E5857B', '#F1B2B2', '#E8CCC7',
  '#F8A57F', '#FAD4A6', '#FBE7AB', '#45958E', '#B7BDA0',
  '#8B86BE', '#86ABBA'
];

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
      presets={[
        {
          label: '', colors
        }
      ]}
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