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
            '#000000', '#545454', '#737373', '#a6a6a6', '#d9d9d9', '#ffffff', '#D9E3F0', '#F47373', '#697689', '#37D67A', '#2CCCE4', '#555555', '#DCE775', '#FF8A65', '#BA68C8', '#5ce1e6',
            '#FF3131', '#ff5757', '#ff66c4', '#cb6ce6', '#8c52ff', '#5e17eb', '#0097b2', '#0cc0df',
            '#00bf63', '#7ed597', '#c1ff72', '#ffde59', '#ffbd59', '#ff914d'
          ]
        }
      ]}
      {...rest}
    />
  )
}