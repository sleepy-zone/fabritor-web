import { useContext } from 'react';
import { Flex } from 'antd';
import TextSetter from './TextSetter';
// import ImageSetter from './ImageSetter';
import SketchSetter from './SketchSetter';
import { GloablStateContext } from '@/context';
import { LineSetter } from './ShapeSetter';
import { SKETCH_ID } from '@/utils/constants';

import './index.scss';

export default function Toolbar () {
  const { object, isReady } = useContext(GloablStateContext);
  const objectType = object?.get?.('type') || '';
  console.log('objectType', objectType);

  const renderSetter = () => {
    if (!isReady) return null;
    if (!object || object.id === SKETCH_ID) return <SketchSetter />;
    switch (objectType) {
      case 'textbox':
        return <TextSetter />;
      // case 'image':
      //   return <ImageSetter />;
      case 'line':
      case 'arrow-line':
        return <LineSetter />;  
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
    </Flex>
  )
}