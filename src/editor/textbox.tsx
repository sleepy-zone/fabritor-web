import { fabric } from 'fabric';
import { TEXTBOX_DEFAULT_CONFIG } from '../utils/constants';
import { uuid, loadFont } from '@/utils';
import { getGlobalEditor } from '@/utils/global';

export const createTextbox = async (options) => {
  const { text = '', left, top, fontFamily, ...rest } = options || {};
  const editor = getGlobalEditor();
  const { canvas, sketch } = editor;

  const textBox = new fabric.Textbox(text || '双击进行编辑', {
    ...TEXTBOX_DEFAULT_CONFIG,
    ...rest,
    id: uuid()
  });

  if (left == null) {
    // @ts-ignore
    textBox.set('left', sketch.width / 2 - textBox.width / 2);
  } else {
    textBox.set('left', left);
  }
  if (top == null) {
    // @ts-ignore
    textBox.set('top', sketch.height / 2 - textBox.calcTextHeight() / 2);
  } else {
    textBox.set('top', top);
  }

  textBox.setControlVisible('mt', false);
  textBox.setControlVisible('mb', false);

  if (fontFamily) {
    try {
      await loadFont(fontFamily);
    } finally {
      textBox.set('fontFamily', fontFamily);
    }
  }

  canvas.add(textBox);
  canvas.setActiveObject(textBox);
  canvas.requestRenderAll();

  return textBox;
}