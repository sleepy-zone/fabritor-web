import { uuid } from '@/utils';
import { getGlobalEditor } from '@/utils/global';

export default function createShape (ShapeClass, options) {
  const { left, top, points, ...rest } = options;
  const editor = getGlobalEditor();
  const { canvas, sketch } = editor;
  const object = new ShapeClass({
    id: uuid(),
    ...rest,
  });

  if (left == null) {
    // @ts-ignore
    object.set('left', sketch.width / 2 - object.width / 2);
  } else {
    object.set('left', left);
  }
  if (top == null) {
    // @ts-ignore
    object.set('top', sketch.height / 2 - object.height / 2);
  } else {
    object.set('top', top);
  }

  canvas.add(object);
  canvas.requestRenderAll();
  canvas.setActiveObject(object);
  return object;
}