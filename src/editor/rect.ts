import { fabric } from 'fabric';
import { uuid } from '@/utils';
import { getGlobalEditor } from '@/utils/global';
import { setObject2Center } from '@/utils/helper';
import { message } from 'antd';

const loadImageFromUrl = (url) => {
  return new Promise((resolve, reject) => {
    fabric.util.loadImage(url, (img) => {
      if (!img) {
        message.error('加载远程图片失败');
        reject();
        return;
      }
      resolve(img);
    }, {
      crossOrigin: 'anonymous'
    });
  });
}

export default function createRect (options) {
  const { width = 200, height = 200, left, top, ...rest } = options || {};
  const editor = getGlobalEditor();
  const { canvas } = editor;
  const rect = new fabric.Rect({
    id: uuid(),
    width,
    height,
    ...rest,
  });

  setObject2Center(rect, options, editor);

  canvas.add(rect);
  canvas.requestRenderAll();
  canvas.setActiveObject(rect);
  return rect;
}

export const createImageRect = async (options) => {
  const editor = getGlobalEditor();
  const { canvas } = editor;
  let { image, url, left, top, ...rest } = options;
  const rect = new fabric.Rect({
    id: uuid(),
    sub_type: 'image',
    ...rest,
  });

  if (!image) {
    try {
      image = await loadImageFromUrl(url);
    } catch(e) { console.log(e); }
  }

  if (!image) {
    return;
  }

  rect.set({
    fill: new fabric.Pattern({
      source: image,
      repeat: 'no-repeat'
    }),
    width: image.width,
    height: image.height
  });

  setObject2Center(rect, options, editor);

  canvas.add(rect);
  canvas.requestRenderAll();
  canvas.setActiveObject(rect);
  return rect;
}