import { useContext } from 'react';
import { Flex } from 'antd';
import TextSetter from './TextSetter';
import ImageSetter from './ImageSetter';
import SketchSetter from './SketchSetter';
import { GloablStateContext } from '@/context';
import { LineSetter, ShapeSetter } from './ShapeSetter';
import CommonSetter from './CommonSetter';
import { SKETCH_ID } from '@/utils/constants';

import './index.scss';

export default function Toolbar () {
  const { object, isReady } = useContext(GloablStateContext);
  const objectType = object?.get?.('type') || '';
  console.log('objectType', objectType, object);

  const renderSetter = () => {
    if (!isReady) return null;
    if (!object || object.id === SKETCH_ID) return <SketchSetter />;
    switch (objectType) {
      case 'textbox':
      case 'f-text':
        return <TextSetter />;
      case 'rect':
      case 'circle':
      case 'triangle':
      case 'polygon':
      case 'ellipse':  
        return <ShapeSetter />;
      case 'line':
      case 'f-line':
        return <LineSetter />;
      case 'f-image':
      case 'image':
        return <ImageSetter />;
      case 'path':
      case 'group':
        return null;
      default:
        return <SketchSetter />;
    }
  }

  return (
    <Flex
      className="fabritor-toolbar"
      align="center"
      wrap="nowrap"
    >
      {renderSetter()}
      <CommonSetter />
    </Flex>
  )
}