import { fabric } from 'fabric';
import { getGlobalEditor } from '@/utils/global';
import { uuid } from '@/utils';
import { setObject2Center } from '@/utils/helper';

export const drawLine = (options) => {
  let { path, left, top, ...rest } = options || {};

  const editor = getGlobalEditor();
  const { canvas } = editor;

  const line = new fabric.Path(path, {
    stroke: '#000000',
    id: uuid(),
    sub_type: 'line',
    ...rest
  });

  setObject2Center(line, options, editor);

  line.setControlVisible('mt', false);
  line.setControlVisible('mb', false);
  // line.setControlVisible('ml', false);
  // line.setControlVisible('mr', false);
  line.setControlVisible('tl', false);
  line.setControlVisible('tr', false);
  line.setControlVisible('bl', false);
  // line.setControlVisible('br', false);

  canvas.add(line);
  canvas.setActiveObject(line);
  canvas.requestRenderAll();
  return line;
}