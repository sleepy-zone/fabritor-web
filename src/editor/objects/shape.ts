import { fabric } from 'fabric';
import { uuid } from '@/utils';
import { getGlobalEditor } from '@/utils/global';

export default function createShape (ShapeClass, options) {
  const { points, ...rest } = options || {};
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

  canvas.add(object);
  canvas.viewportCenterObject(object);
  canvas.setActiveObject(object);
  canvas.requestRenderAll();
  return object;
}