import { Flex, Slider, InputNumber } from 'antd';

export default function SliderInputNumber (props) {
  const { min = 1, max = 100, step = 1, sliderProps, inputProps, onChange, value } = props;
  return (
    <Flex gap={4}>
      <Slider
        style={{ flex: 1 }}
        min={min}
        max={max}
        step={step}
        onChange={onChange} 
        value={value}
        {...sliderProps}
      />
      <InputNumber
        min={min}
        max={max}
        step={step}
        onChange={onChange} 
        value={value}
        style={{ width: 56 }}
        {...inputProps}
      />
    </Flex>
  )
}