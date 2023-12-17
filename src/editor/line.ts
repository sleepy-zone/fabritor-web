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

  line.setControlVisible('mt', false);
  line.setControlVisible('mb', false);
  // line.setControlVisible('ml', false);
  // line.setControlVisible('mr', false);
  line.setControlVisible('tl', false);
  line.setControlVisible('tr', false);
  line.setControlVisible('bl', false);
  line.setControlVisible('br', false);

  canvas.add(line);
  canvas.setActiveObject(line);
  canvas.requestRenderAll();
  return line;
}

export const drawTextPath = (textbox, offset) => {
  const width = textbox.width;
  const pathStr = `M 0 0 Q ${width / 2} ${offset} ${width} 0`;
  const path = new fabric.Path(pathStr, {
    visible: false,
    stroke: '#000000',
    fill: '#00000000'
  });

  return path;
}