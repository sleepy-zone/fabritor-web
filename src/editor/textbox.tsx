import { fabric } from 'fabric';
import { TEXTBOX_DEFAULT_CONFIG } from '../utils/constants';
import { uuid, loadFont } from '@/utils';
import { getGlobalEditor } from '@/utils/global';
import { setObject2Center } from '@/utils/helper';
import { drawTextPath } from './line';

export const createTextbox = async (options) => {
  const { text = '', left, top, fontFamily, ...rest } = options || {};
  const editor = getGlobalEditor();
  const { canvas } = editor;

  let hasPath;

  const textBox = new fabric.Textbox(text || '双击进行编辑', {
    ...TEXTBOX_DEFAULT_CONFIG,
    ...rest,
    pathAlign: 'center',
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

  textBox.on('editing:entered', () => {
    if (textBox.path) {
      hasPath = true;
      textBox.set('path', undefined);
      textBox.setCoords();
      editor.canvas.requestRenderAll();
    } else {
      hasPath = false;
    }
  });

  textBox.on('editing:exited', () => {
    if (hasPath) {
      const _path = drawTextPath(textBox, Math.floor(textBox.width / 2));
      textBox.set('path', _path);
      textBox.setCoords();
      editor.canvas.requestRenderAll();
    }
  });

  canvas.add(textBox);
  canvas.setActiveObject(textBox);
  canvas.requestRenderAll();

  return textBox;
}