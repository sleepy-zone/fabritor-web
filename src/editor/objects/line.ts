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
    strokeLineJoin: 'round',
    strokeLineCap: 'round',
    borderColor: '#00000000',
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
  });
  canvas.requestRenderAll();
  return line;
}

export const drawArrowLine = (options) => {
  const { points, ...rest } = options;
  const editor = getGlobalEditor();
  const { canvas } = editor;

  const arrow = new fabric.FArrow(points || [0, 0, 300, 0], {
    strokeWidth: 4,
    stroke: '#000000',
    fill: '#000000',
    strokeLineJoin: 'round',
    strokeLineCap: 'round',
    borderColor: '#00000000',
    ...rest
  });

  canvas.add(arrow);
  canvas.setActiveObject(arrow);
  canvas.viewportCenterObject(arrow);
  arrow.set({
    x1: arrow.left,
    y1: arrow.top,
    x2: arrow.left + 300,
    y2: arrow.top
  });
  canvas.requestRenderAll();
  return arrow;
}

export const drawTriArrowLine = (options) => {
  const { points, ...rest } = options;
  const editor = getGlobalEditor();
  const { canvas } = editor;

  const arrow = new fabric.FTriArrow(points || [0, 0, 300, 0], {
    strokeWidth: 4,
    stroke: '#000000',
    fill: '#000000',
    strokeLineJoin: 'round',
    strokeLineCap: 'round',
    borderColor: '#00000000',
    ...rest
  });

  canvas.add(arrow);
  canvas.setActiveObject(arrow);
  canvas.viewportCenterObject(arrow);
  arrow.set({
    x1: arrow.left,
    y1: arrow.top,
    x2: arrow.left + 300,
    y2: arrow.top
  });
  canvas.requestRenderAll();
  return arrow;
}