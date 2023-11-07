import { ColorPicker } from 'antd';

export default function AlignSetter (props) {
  const { value, onChange, ...rest } = props;

  const handleChange = (v) => {
    onChange && onChange(v.toHexString())
  }

  return (
    <ColorPicker value={value} onChange={handleChange} format="hex" showText {...rest} />
  )
}