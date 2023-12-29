import { Flex } from 'antd';
import LocalImagePanel from './LocalImageSelector';
import RemoteImagePanel from './RemoteImageSelector';

export default function ImageSelector (props) {
  const { onChange } = props;

  return (
    <Flex gap={10} justify="space-around">
      <LocalImagePanel onChange={onChange} />
      <RemoteImagePanel onChange={onChange} />
    </Flex>
  )
}