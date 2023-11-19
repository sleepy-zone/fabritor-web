import { fabric } from 'fabric';
import { uuid } from '@/utils';
import { getGlobalEditor } from '@/utils/global';

export default function createRect (options) {
  const editor = getGlobalEditor();
  const { canvas } = editor;
  const rect = new fabric.Rect({
    id: uuid(),
    ...options,
  });
  canvas.add(rect);
  canvas.requestRenderAll();
  return rect;
}

export const createImageRect = async (options) => {
  const editor = getGlobalEditor();
  const { canvas, sketch } = editor;
  const { image, left, top, ...rest } = options;
  const rect = new fabric.Rect({
    id: uuid(),
    sub_type: 'image',
    ...rest,
  });

  rect.set({
    fill: new fabric.Pattern({
      source: image,
      repeat: 'no-repeat'
    }),
    width: image.width,
    height: image.height
  });

  if (left == null) {
    // @ts-ignore
    rect.set('left', sketch.width / 2 - rect.width / 2);
  } else {
    rect.set('left', left);
  }
  if (top == null) {
    // @ts-ignore
    rect.set('top', sketch.height / 2 - rect.height / 2);
  } else {
    rect.set('top', top);
  }

  canvas.add(rect);
  canvas.requestRenderAll();
  canvas.setActiveObject(rect);
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