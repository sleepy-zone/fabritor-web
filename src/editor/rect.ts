import { fabric } from 'fabric';
import { uuid } from '@/utils';
import { getGlobalEditor } from '@/utils/global';
import { setObject2Center } from '@/utils/helper';

export default function createRect (options) {
  const { width = 200, height = 200, left, top, ...rest } = options || {};
  const editor = getGlobalEditor();
  const { canvas } = editor;
  const rect = new fabric.Rect({
    id: uuid(),
    width,
    height,
    ...rest,
  });

  setObject2Center(rect, options, editor);

  canvas.add(rect);
  canvas.requestRenderAll();
  canvas.setActiveObject(rect);
  return rect;
}