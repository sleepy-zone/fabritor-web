import { fabric } from 'fabric';
import { getGlobalEditor } from '@/utils/global';
import { uuid } from '@/utils';

export const drawLine = (options) => {
  const { points, ...rest } = options;
  const editor = getGlobalEditor();
  const { canvas } = editor;

  const line = new fabric.FLine(points || [0, 0, 300, 0], {
    strokeWidth: 4,
    stroke: '#000000',
    id: uuid(),
    ...rest
  });

  canvas.add(line);
  canvas.setActiveObject(line);
  canvas.viewportCenterObject(line);
  line.set({
    x1: line.left,
    y1: line.top,
    x2: line.left + 300,
    y2: line.top
  })
  canvas.requestRenderAll();
  return line;
}