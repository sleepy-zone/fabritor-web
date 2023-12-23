import { fabric } from 'fabric';
import { getGlobalEditor } from '@/utils/global';
import { uuid } from '@/utils';
import { setObject2Center } from '@/utils/helper';

export const drawLine = (options) => {
  let { left, top, ...rest } = options || {};

  const editor = getGlobalEditor();
  const { canvas } = editor;

  const line = new fabric.FLine({
    stroke: '#000000',
    id: uuid(),
    ...rest
  });

  setObject2Center(line, options, editor);

  canvas.add(line);
  canvas.setActiveObject(line);
  canvas.requestRenderAll();
  return line;
}