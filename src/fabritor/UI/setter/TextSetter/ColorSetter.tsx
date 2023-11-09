import { ColorPicker } from 'antd';

export default function ColorSetter (props) {
  const { value, onChange, ...rest } = props;

  const handleChange = (v) => {
    onChange && onChange(v.toHexString())
  }

  return (
    <ColorPicker
      value={value}
      onChange={handleChange}
      format="hex"
      showText
      presets={[
        {
          label: 'Recommended',
          colors: [
            '#000000', '#000000E0', '#000000A6', '#00000073', '#00000040', '#00000026', '#0000001A',
            '#00000012', '#0000000A','#00000005',
            '#D9E3F0', '#F47373', '#697689', '#37D67A', '#2CCCE4', '#555555', '#DCE775', '#FF8A65', '#BA68C8',
            '#F5222D4D', '#FA8C164D', '#FADB144D', '#8BBB114D', '#52C41A4D', '#13A8A84D', '#1677FF4D', '#2F54EB4D', '#722ED14D', '#EB2F964D'
          ]
        }
      ]}
      {...rest}
    />
  )
}