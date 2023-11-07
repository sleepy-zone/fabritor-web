import { useContext } from 'react';
import { GloablStateContext } from '@/context';
import LocalImagePanel from './LocalImagePanel';
import { createImage, createSvg } from '@/editor/image';

export default function ImagePanel () {
  const { setActiveObject } = useContext(GloablStateContext);

  const addImage = async (options) => {
    const img = await createImage(options);
    setActiveObject(img);
  }

  const addSvg = async (options) => {
    const svg = await createSvg(options);
    setActiveObject(svg);
  }

  return (
    <div className="fabritor-panel-text-wrapper">
      <LocalImagePanel addImage={addImage} addSvg={addSvg} />
    </div>
  )
}