import { fabric } from 'fabric';
import { uuid } from '@/utils';

export const loadSvgFromString = async (string) => {
  return new Promise((resolve) => {
    fabric.loadSVGFromString(string, (objects, options) => {
      const svg = fabric.util.groupSVGElements(objects, options);
      resolve(svg);
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

export const createPathFromSvg = async (options) => {
  const { svgString, canvas, ...rest } = options || {};

  const svg = await loadSvgFromString(svgString) as fabric.Path;

  svg.set({
    ...rest,
    id: uuid()
  });

  canvas.viewportCenterObject(svg);
  canvas.add(svg);
  canvas.setActiveObject(svg);
  canvas.requestRenderAll();

  return svg;
}