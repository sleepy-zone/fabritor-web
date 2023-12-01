import LocalImagePanel from './LocalImagePanel';
import { createSvg } from '@/editor/image';
import { createImageRect } from '@/editor/rect';

export default function ImagePanel () {
  const addImage = async (options) => {
    await createImageRect({
      image: options.img
    });
  }

  const addSvg = async (options) => {
    await createSvg(options);
  }

  return (
    <div className="fabritor-panel-text-wrapper">
      <LocalImagePanel addImage={addImage} addSvg={addSvg} />
    </div>
  )
}