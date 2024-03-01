import { fabric } from 'fabric';
import { uuid } from '@/utils';

export default function createRect (options) {
  const { canvas, ...rest } = options || {};
  const rect = new fabric.Rect({
    id: uuid(),
    width: 200,
    height: 200,
    ...rest,
  });

  canvas.add(rect);
  canvas.viewportCenterObject(rect);
  canvas.setActiveObject(rect);
  canvas.requestRenderAll();
  return rect;
}