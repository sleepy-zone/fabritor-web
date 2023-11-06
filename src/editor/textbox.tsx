import { fabric } from 'fabric';
import { TEXTBOX_DEFAULT_CONFIG } from '../utils/constants';
import { uuid } from '@/utils';

export const createTextbox = (options, editor) => {
  const { text = '', left, top, ...rest } = options || {};
  const { canvas, sketch } = editor;

  const textBox = new fabric.Textbox(text || '双击进行编辑', {
    ...TEXTBOX_DEFAULT_CONFIG,
    ...rest,
    id: uuid()
  });

  if (left == null) {
    // @ts-ignore
    textBox.set('left', sketch.width / 2 - textBox.width / 2);
  }
  if (top == null) {
    textBox.set('top', sketch.height / 2 - textBox.calcTextHeight() / 2);
  }

  textBox.setControlVisible('mt', false);
  textBox.setControlVisible('mb', false);

  canvas.add(textBox);
  canvas.requestRenderAll();
  return textBox;
}