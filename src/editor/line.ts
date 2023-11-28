import { fabric } from 'fabric';
import { getGlobalEditor } from '@/utils/global';
import { uuid } from '@/utils';

export const drawLine = (options) => {
  let { left, top, width = 300, strokeWidth = 4, type = 'line' } = options || {};

  const editor = getGlobalEditor();
  const { canvas, sketch } = editor;

  if (left == null) {
    left = (sketch.width || 0) / 2 - width / 2;
  }
  if (top == null) {
    top = (sketch.height || 0) / 2 - strokeWidth / 2;
  }

  const points: number[] = [left, top, left + width, top];
  const line = new fabric.Line(points, {
    stroke: '#000000',
    strokeWidth,
    id: uuid(),
    ...options
  });
  canvas.add(line);
  canvas.setActiveObject(line);
  canvas.requestRenderAll();
  return line;
}