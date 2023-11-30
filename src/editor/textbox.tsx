import { fabric } from 'fabric';
import { TEXTBOX_DEFAULT_CONFIG } from '../utils/constants';
import { uuid, loadFont } from '@/utils';
import { getGlobalEditor } from '@/utils/global';
import { setObject2Center } from '@/utils/helper';

export const createTextbox = async (options) => {
  const { text = '', left, top, fontFamily, ...rest } = options || {};
  const editor = getGlobalEditor();
  const { canvas } = editor;

  const textBox = new fabric.Textbox(text || '双击进行编辑', {
    ...TEXTBOX_DEFAULT_CONFIG,
    ...rest,
    id: uuid()
  });

  setObject2Center(textBox, options, editor);

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