import { fabric } from 'fabric';
import { uuid } from '@/utils';
import { getGlobalEditor } from '@/utils/global';
import { setObject2Center } from '@/utils/helper';

export default function createShape (ShapeClass, options) {
  const { left, top, points, ...rest } = options || {};
  const editor = getGlobalEditor();
  const { canvas } = editor;
  let object;
  if (ShapeClass === fabric.Polygon) {
    object = new fabric.Polygon(points, {
      id: uuid(),
      ...rest,
    });
  } else {
    object = new ShapeClass({
      id: uuid(),
      ...rest,
    });
  }

  setObject2Center(object, options, editor);

  canvas.add(object);
  canvas.requestRenderAll();
  canvas.setActiveObject(object);
  return object;
}