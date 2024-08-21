import { fabric } from 'fabric';
import { useContext, useEffect, useState } from 'react';
import PathSetterForm from './PathSetterForm';
import { GlobalStateContext } from '@/context';
import { transformFill2Colors, transformColors2Fill } from '@/utils';

export default function PathSetter () {
  const { object, editor } = useContext(GlobalStateContext);
  const [value, setValue] = useState({});

  const handleChange = (values) => {
    if (values.color) {
      object.set('stroke', values.color);
    }
    if (values.width) {
      object.set('strokeWidth', values.width)
    }
    if (values.fill) {
      let fill = transformColors2Fill(values.fill);
      if (typeof fill !== 'string') {
        fill = new fabric.Gradient(fill);
      }
      object.set('fill', fill);
    }
    if (values.shadow) {
      const shadow = object.shadow;
      const originalShadowObject = shadow ? shadow.toObject() : {};
      const newShadowObject = {
        blur: values.shadow.width || originalShadowObject.blur,
        offsetX: values.shadow.offset || originalShadowObject.offsetX,
        offsetY: values.shadow.offset || originalShadowObject.offsetY,
        affectStroke: true,
        color: values.shadow.color || originalShadowObject.color || '#000000',
      }
      object.set('shadow', new fabric.Shadow(newShadowObject));
    }

    editor.canvas.requestRenderAll();
  }

  useEffect(() => {
    if (object) {
      const shadow = object.shadow as fabric.Shadow;
      setValue({
        color: object.stroke,
        width: object.strokeWidth,
        fill: transformFill2Colors(object.fill || '#ffffff'),
        shadow: {
          color: shadow?.color || '#000000',
          width: shadow?.blur || 0,
          offset: shadow?.offsetX || 0
        }
      });
    }
  }, [object]);

  if (!object || object.type !== 'path') return null;

  return (
    <PathSetterForm
      showFillConfig={object?.sub_type}
      shouldFireEvent
      value={value}
      onChange={handleChange}
    />
  )
}