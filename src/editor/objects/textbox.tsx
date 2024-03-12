import { fabric } from 'fabric';
import { TEXTBOX_DEFAULT_CONFIG } from '@/utils/constants';
import { uuid, loadFont } from '@/utils';

export const getTextboxWidth = (textbox) => {
  const textLines = textbox.textLines || [];
  if (!textLines || !textLines.length) return 0;
  let width = 0;
  for (let i = 0; i < textLines.length; i++) {
    width += textbox.measureLine(i).width;
  }
  return width + 4;
}

export const getPathOffset = (textbox) => {
  if (!textbox.path) {
    return 100;
  }
  const path = textbox.path.path;
  const offset = Math.ceil(path[1][2] / (getTextboxWidth(textbox) / 2) * 100);
  return offset > 100 ? 100 : offset;
}

export const drawTextPath = (textbox, offset) => {
  if (textbox.isEditing) return;

  // textbox should 1 line when use path
  const width = getTextboxWidth(textbox);
  const path = new fabric.Path(`M 0 0 Q ${width / 2} ${width / 2 * offset / 100} ${width} 0`, {
    visible: false,
    stroke: '#000000',
    fill: '#00000000'
  });
  textbox.set({
    path,
    width
  });
  textbox.canvas.requestRenderAll();
}

// 移除 path 属性位置错误，拖动一下才会更新。
export const removeTextPath = (textbox) => {
  textbox.set({
    path: null
  });
  textbox.canvas.requestRenderAll();
}

export const createTextbox = async (options) => {
  const { text = '', fontFamily, canvas, ...rest } = options || {};

  let tmpPathInfo = { hasPath: false, offset: 100 };

  const textBox = new fabric.FText(text || '这是一段文本', {
    ...TEXTBOX_DEFAULT_CONFIG,
    ...rest,
    fontFamily,
    pathAlign: 'center',
    id: uuid()
  });

  textBox.on('editing:entered', () => {
    if (textBox.path) {
      tmpPathInfo.hasPath = true;
      tmpPathInfo.offset = getPathOffset(textBox);
      textBox.set('path', null);
      textBox.initDimensions();
      canvas.requestRenderAll();
    } else {
      tmpPathInfo.hasPath = false;
    }
  });

  textBox.on('editing:exited', () => {
    if (tmpPathInfo.hasPath) {
      drawTextPath(textBox, tmpPathInfo.offset);
      canvas.requestRenderAll();
    }
  });

  if (options.left == null && options.top == null) {
    canvas.viewportCenterObject(textBox);
  } else if (options.left == null) {
    canvas.viewportCenterObjectH(textBox);
  }
  canvas.add(textBox);
  canvas.setActiveObject(textBox);
  canvas.requestRenderAll();

  if (fontFamily) {
    try {
      await loadFont(fontFamily);
    } finally {
      textBox.set('fontFamily', fontFamily);
      canvas.requestRenderAll();
    }
  }

  return textBox;
}