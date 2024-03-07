import { Flex } from 'antd';

export default function Center (props) {
  const { children, height = 46, style, ...rest } = props;

  return (
    <Flex justify="center" align="center" {...rest} style={{ height, ...style  }} >
      {children}
    </Flex>
  )
}

export const CenterH = (props) => {
  return (
    <Center align="normal" {...props} />
  )
}

export const CenterV = (props) => {
  return (
    <Center justify="normal" {...props} />
  )
}