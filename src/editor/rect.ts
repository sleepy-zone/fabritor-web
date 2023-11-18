import { fabric } from 'fabric';
import { uuid } from '@/utils';
import { getGlobalEditor } from '@/utils/global';

export default function createRect (options) {
  const editor = getGlobalEditor();
  const { canvas } = editor;
  const rect = new fabric.Rect({
    // @ts-ignore custom id 
    id: uuid(),
    ...options,
  });
  canvas.add(rect);
  canvas.requestRenderAll();
  return rect;
}

export const drawObjectBox = (target) => {
  const editor = getGlobalEditor();
  const { canvas } = editor;
  const bound = target.getBoundingRect();
  const ctx = canvas.getContext();
  const activeObject = canvas.getActiveObject();
  // @ts-ignore
  if (target.id === activeObject?.id) return;
  ctx.strokeStyle = '#FF6666';
  ctx.lineWidth = 2;
  ctx.strokeRect(
    bound.left + 0.5,
    bound.top + 0.5,
    bound.width,
    bound.height
  );
}