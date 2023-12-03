import LocalImagePanel from './LocalImagePanel';
import { createSvg } from '@/editor/image';
import { createImageRect } from '@/editor/rect';
import RemoteImagePanel from './RemoteImagePanel';
import { Flex } from 'antd';

export default function ImagePanel () {
  const addImage = async (options) => {
    await createImageRect({
      image: options.img,
      url: options.url
    });
  }

  const addSvg = async (options) => {
    await createSvg(options);
  }

  return (
    <div className="fabritor-panel-text-wrapper">
      <Flex gap={10} justify="space-around">
        <LocalImagePanel addImage={addImage} addSvg={addSvg} />
        <RemoteImagePanel addImage={addImage} />
      </Flex>
    </div>
  )
}