import { fabric } from 'fabric';
import { uuid } from '@/utils';
import { getGlobalEditor } from '@/utils/global';
import { setObject2Center } from '@/utils/helper';
import { message } from 'antd';

export const loadImageDom = async (url) => {
  return new Promise((resolve, reject) => {
    fabric.util.loadImage(url, (img) => {
      if (img) {
        return resolve(img);
      }
      message.error('加载图片失败');
      return reject();
    }, null, 'anonymous');
  });
}

export const loadImage = async (imageSource) => {
  if (typeof imageSource === 'string') {
    return new Promise<fabric.Image>((resolve, reject) => {
      fabric.Image.fromURL(imageSource, (img) => {
        if (!img) {
          message.error('加载图片失败');
          reject();
          return;
        }
        resolve(img);
      }, {
        crossOrigin: 'anonymous'
      });
    });
  }
  return Promise.resolve(new fabric.Image(imageSource));
}

export const loadSvgFromUrl = async (url) => {
  return new Promise((resolve) => {
    fabric.loadSVGFromURL(url, (objects, options) => {
      const svg = fabric.util.groupSVGElements(objects, options);
      resolve(svg);
    });
  });
}

export const createClipRect = (object, options = {}) => {
  const width = object.getScaledWidth();
  const height = object.getScaledHeight();
  return new fabric.Rect({
    left: -width / 2,
    top: -height / 2,
    width,
    height,
    ...options
  });
}

export const createImage = async (options) => {
  const { imageSource, left, top, ...rest } = options || {};
  const editor = getGlobalEditor();
  const { canvas } = editor;

  let img!: fabric.Image;
  try {
    img = await loadImage(imageSource);
  } catch(e) { console.log(e); }
  
  if (!img) return;

  img.set({
    ...rest,
    paintFirst: 'fill',
    id: uuid()
  });

  setObject2Center(img, options, editor);

  canvas.add(img);
  canvas.setActiveObject(img);
  canvas.requestRenderAll();

  return img;
}

export const createFImage = async (options) => {
  const { imageSource } = options || {};
  const editor = getGlobalEditor();
  const { canvas } = editor;

  let img!: fabric.Image;
  try {
    img = await loadImage(imageSource);
  } catch(e) { console.log(e); }
  
  if (!img) return;

  const fimg = new fabric.FImage({
    image: img,
    id: uuid()
  });

  setObject2Center(fimg, options, editor);

  canvas.add(fimg);
  canvas.setActiveObject(fimg);
  canvas.requestRenderAll();
}

export const createSvg = async (options) => {
  const { url, left, top, ...rest } = options || {};
  const editor = getGlobalEditor();
  const { canvas } = editor;

  const svg: fabric.Group = await loadSvgFromUrl(url);

  svg.set({
    ...rest,
    id: uuid()
  });

  setObject2Center(svg, options, editor);

  canvas.add(svg);
  canvas.setActiveObject(svg);
  canvas.requestRenderAll();

  return svg;
}