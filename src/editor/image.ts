import { fabric } from 'fabric';
import { uuid } from '@/utils';
import { getGlobalEditor } from '@/utils/global';
import { setObject2Center } from '@/utils/helper';
import { message } from 'antd';

export const loadImageFromUrl = async (url) => {
  return new Promise<fabric.Image>((resolve, reject) => {
    fabric.Image.fromURL(url, (img) => {
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

export const loadSvgFromUrl = async (url) => {
  return new Promise((resolve) => {
    fabric.loadSVGFromURL(url, (objects, options) => {
      const svg = fabric.util.groupSVGElements(objects, options);
      resolve(svg);
    });
  });
}

export const createImage = async (options) => {
  const { url, left, top, ...rest } = options || {};
  const editor = getGlobalEditor();
  const { canvas } = editor;

  let img!: fabric.Image;
  if (options.url) {
    try {
      img = await loadImageFromUrl(url);
    } catch(e) { console.log(e); }
  }
  if (options.img) {
    img = new fabric.Image(options.img);
  }
  
  if (!img) return;

  img.set({
    ...rest,
    id: uuid()
  });

  setObject2Center(img, options, editor);

  canvas.add(img);
  canvas.setActiveObject(img);
  canvas.requestRenderAll();

  return img;
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