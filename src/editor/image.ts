import { fabric } from 'fabric';
import { uuid } from '@/utils';
import { getGlobalEditor } from '@/utils/global';

export const loadImageFromUrl = async (url) => {
  return new Promise<fabric.Image>((resolve) => {
    fabric.Image.fromURL(url, (img) => {
      resolve(img);
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
  const { canvas, sketch } = editor;

  let img!: fabric.Image;
  if (options.url) {
    img = await loadImageFromUrl(url);
  }
  if (options.img) {
    img = new fabric.Image(options.img);
  }

  img.set({
    ...rest,
    id: uuid()
  });

  if (left == null) {
    // @ts-ignore
    img.set('left', sketch.width / 2 - img.getScaledWidth() / 2);
  } else {
    img.set('left', left);
  }
  if (top == null) {
    // @ts-ignore
    img.set('top', sketch.height / 2 - img.getScaledHeight() / 2);
  } else {
    img.set('top', top);
  }

  canvas.add(img);
  canvas.setActiveObject(img);
  canvas.requestRenderAll();

  return img;
}

export const createSvg = async (options) => {
  const { url, left, top, ...rest } = options || {};
  const editor = getGlobalEditor();
  const { canvas, sketch } = editor;

  const svg: fabric.Group = await loadSvgFromUrl(url);

  svg.set({
    ...rest,
    id: uuid()
  });

  if (left == null) {
    // @ts-ignore
    svg.set('left', sketch.width / 2 - svg.width / 2);
  } else {
    svg.set('left', left);
  }
  if (top == null) {
    // @ts-ignore
    svg.set('top', sketch.height / 2 - svg.height / 2);
  } else {
    svg.set('top', top);
  }

  canvas.add(svg);
  canvas.setActiveObject(svg);
  canvas.requestRenderAll();

  return svg;
}