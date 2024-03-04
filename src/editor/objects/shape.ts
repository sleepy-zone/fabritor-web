import { fabric } from 'fabric';
import { uuid } from '@/utils';

export default function createShape (ShapeClass, options) {
  const { points, canvas, ...rest } = options || {};
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