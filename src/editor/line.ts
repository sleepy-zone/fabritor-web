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

  // line.on('scaling', (opt) => {
  //   console.log(opt);
  // });

  canvas.add(line);
  canvas.setActiveObject(line);
  canvas.requestRenderAll();
  return line;
}