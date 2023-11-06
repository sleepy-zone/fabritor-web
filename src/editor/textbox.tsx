import { fabric } from 'fabric';
import { TEXTBOX_DEFAULT_CONFIG } from '../utils/constants';
import { uuid, loadFont } from '@/utils';

export const createTextbox = async (options, editor) => {
  const { text = '', left, top, fontFamily, ...rest } = options || {};
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

  if (fontFamily) {
    await loadFont(fontFamily);
    textBox.set('fontFamily', fontFamily);
  }

  canvas.add(textBox);
  canvas.requestRenderAll();
  return textBox;
}