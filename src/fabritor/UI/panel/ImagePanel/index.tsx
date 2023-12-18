import LocalImagePanel from './LocalImagePanel';
import { createSvg, createImage } from '@/editor/image';
import RemoteImagePanel from './RemoteImagePanel';
import { Flex } from 'antd';

export default function ImagePanel () {
  const addImage = async (options) => {
    await createImage({
      imageSource: options.img || options.url
    });
  }

  const addSvg = async (options) => {
    await createSvg(options);
  }

  return (
    <div className="fabritor-panel-wrapper">
      <Flex gap={10} justify="space-around">
        <LocalImagePanel addImage={addImage} addSvg={addSvg} />
        <RemoteImagePanel addImage={addImage} />
      </Flex>
    </div>
  )
}