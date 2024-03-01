import { fabric } from 'fabric';
import { uuid } from '@/utils';
import { getGlobalEditor } from '@/utils/global';

export default function createRect (options) {
  const { width = 200, height = 200, ...rest } = options || {};
  const editor = getGlobalEditor();
  const { canvas } = editor;
  const rect = new fabric.Rect({
    id: uuid(),
    width,
    height,
    ...rest,
  });

  canvas.add(rect);
  canvas.viewportCenterObject(rect);
  canvas.setActiveObject(rect);
  canvas.requestRenderAll();
  return rect;
}