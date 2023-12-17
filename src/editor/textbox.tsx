import { fabric } from 'fabric';
import { TEXTBOX_DEFAULT_CONFIG } from '../utils/constants';
import { uuid, loadFont } from '@/utils';
import { getGlobalEditor } from '@/utils/global';
import { setObject2Center } from '@/utils/helper';

export const getTextboxWidth = (textbox) => {
  const textLines = textbox.textLines || [];
  if (!textLines || !textLines.length) return 0;
  let width = 0;
  for (let i = 0; i < textLines.length; i++) {
    width += textbox.measureLine(i).width;
  }
  return width;
}

export const drawTextPath = (textbox, offset) => {
  const width = textbox.width;
  const pathStr = `M 0 0 Q ${width / 2} ${offset} ${width} 0`;
  const path = new fabric.Path(pathStr, {
    visible: false,
    stroke: '#000000',
    fill: '#00000000'
  });

  textbox.set('path', path);
  textbox.set('_forceClearCache', true);
}

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
      editor.canvas.requestRenderAll();
    } else {
      hasPath = false;
    }
  });

  textBox.on('editing:exited', () => {
    if (hasPath) {
      const width = getTextboxWidth(textBox) + 10;
      textBox.set('width', width);
      editor.canvas.requestRenderAll();
      drawTextPath(textBox, Math.floor(width / 2));
      editor.canvas.requestRenderAll();
    }
  });

  canvas.add(textBox);
  canvas.setActiveObject(textBox);
  canvas.requestRenderAll();

  return textBox;
}