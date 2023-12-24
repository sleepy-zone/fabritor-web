// cursor css https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor

import { fabric } from 'fabric';
import { ROTATE_SVG, ROTATE_SVG_ACTIVE, ROTATE_CURSOR, COPY_SVG, DEL_SVG, COPY_SVG_ACTIVE, DEL_SVG_ACTIVE } from '@/assets/icon';
import { copyObject, pasteObject, removeObject } from '@/utils/helper';
import { initRectControl } from './rect';
import { initFLineControl } from './fline';
import { initFTextControl } from './ftext';

const ROTATE_IMG = document.createElement('img');
ROTATE_IMG.src = ROTATE_SVG;
const ROTATE_IMG_ACTIVE = document.createElement('img');
ROTATE_IMG_ACTIVE.src = ROTATE_SVG_ACTIVE;

const COPY_IMG = document.createElement('img');
COPY_IMG.src = COPY_SVG;
const COPY_IMG_ACTIVE = document.createElement('img');
COPY_IMG_ACTIVE.src = COPY_SVG_ACTIVE;

const DEL_IMG = document.createElement('img');
DEL_IMG.src = DEL_SVG;
const DEL_IMG_ACTIVE = document.createElement('img');
DEL_IMG_ACTIVE.src = DEL_SVG_ACTIVE;

const renderSizeIcon = (ctx, left, top, styleOverride, fabricObject, TBorLR) => {
  const xSize = TBorLR === 'TB' ? 20 : 6;
  const ySize = TBorLR === 'TB' ? 6 : 20;;
  ctx.save();
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#bbbbbb';
  ctx.lineWidth = 2;
  ctx.shadowBlur = 2;
  ctx.shadowColor = '#dddddd';
  ctx.translate(left, top);
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
  ctx.beginPath();
  ctx.roundRect(-xSize / 2, -ySize / 2, xSize, ySize, 10);
  ctx.stroke();
  ctx.fill();
  ctx.restore();
}

const renderLRIcon = (ctx, left, top, styleOverride, fabricObject) => {
  renderSizeIcon(ctx, left, top, styleOverride, fabricObject, 'LR');
}

const renderTBIcon = (ctx, left, top, styleOverride, fabricObject) => {
  renderSizeIcon(ctx, left, top, styleOverride, fabricObject, 'TB');
}

export const renderVertexIcon = (ctx, left, top, styleOverride, fabricObject) => {
  const size = 12;
  ctx.save();
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#bbbbbb';
  ctx.lineWidth = 2;
  ctx.shadowBlur = 2;
  ctx.shadowColor = '#dddddd';
  ctx.beginPath();
  ctx.arc(left, top, size / 2, 0, 2 * Math.PI, false);
  ctx.stroke();
  ctx.fill();
  ctx.restore();
}

function renderSvgIcon(icon) {
  return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
    const size = 28;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(icon, -size / 2, -size / 2, size, size);
    ctx.restore();
  }
}

const handleCopyObject = async (eventData, transform) => {
  const target = transform.target;
  const canvas = target.canvas;
  await copyObject(canvas, target);
  pasteObject(canvas);
  return true;
}

const handleDelObject = (eventData, transform) => {
  const target = transform.target;
  const canvas = target.canvas;
  removeObject(target, canvas);
  return true;
}

export const renderController = () => {
  // middle top
  const mtConfig = {
    x: 0,
    y: -0.5,
    offsetY: -1,
    render: renderTBIcon
  };
  Object.keys(mtConfig).forEach(key => {
    fabric.Object.prototype.controls.mt[key] = mtConfig[key];
  });

  // middle bottom
  const mbConfig = {
    x: 0,
    y: 0.5,
    offsetY: 1,
    render: renderTBIcon
  };
  Object.keys(mbConfig).forEach(key => {
    fabric.Object.prototype.controls.mb[key] = mbConfig[key];
  });

  // middle left
  const mlConfig = {
    x: -0.5,
    y: 0,
    offsetX: -1,
    render: renderLRIcon
  };
  Object.keys(mlConfig).forEach(key => {
    fabric.Object.prototype.controls.ml[key] = mlConfig[key];
  });

  // middle right
  const mrConfig = {
    x: 0.5,
    y: 0,
    offsetX: 1,
    render: renderLRIcon
  };
  Object.keys(mrConfig).forEach(key => {
    fabric.Object.prototype.controls.mr[key] = mrConfig[key];
  });

  // top left
  const tlConfig = {
    x: -0.5,
    y: -0.5,
    render: renderVertexIcon
  }
  Object.keys(tlConfig).forEach(key => {
    fabric.Object.prototype.controls.tl[key] = tlConfig[key];
  });

  // top right
  const trConfig = {
    x: 0.5,
    y: -0.5,
    render: renderVertexIcon
  }
  Object.keys(trConfig).forEach(key => {
    fabric.Object.prototype.controls.tr[key] = trConfig[key];
  });

  // bottom left
  const blConfig = {
    x: -0.5,
    y: 0.5,
    render: renderVertexIcon
  }
  Object.keys(blConfig).forEach(key => {
    fabric.Object.prototype.controls.bl[key] = blConfig[key];
  });

  // top right
  const brConfig = {
    x: 0.5,
    y: 0.5,
    render: renderVertexIcon
  }
  Object.keys(brConfig).forEach(key => {
    fabric.Object.prototype.controls.br[key] = brConfig[key];
  });
}

// reference: https://medium.com/@luizzappa/custom-icon-and-cursor-in-fabric-js-controls-4714ba0ac28f
export const renderRotateController = () => {
  const mtrConfig = {
    x: 0,
    y: 0.5,
    offsetY: 38,
    // TODO change cursor rotation
    cursorStyleHandler: () => `url("data:image/svg+xml;charset=utf-8,${ROTATE_CURSOR}") 12 12, crosshair`,
    render: renderSvgIcon(ROTATE_IMG),
    withConnection: false
  };
  Object.keys(mtrConfig).forEach(key => {
    fabric.Object.prototype.controls.mtr[key] = mtrConfig[key];
  });
}

// copy & paste & delete & more
export const renderToolBarController = () => {
  const copyControl = new fabric.Control({
    x: 0,
    y: -0.5,
    offsetX: -24,
    offsetY: -26,
    cursorStyle: 'pointer',
    mouseUpHandler: handleCopyObject,
    render: renderSvgIcon(COPY_IMG)
  });
  fabric.Object.prototype.controls.copy = copyControl;

  const delControl = new fabric.Control({
    x: 0,
    y: -0.5,
    offsetX: 24,
    offsetY: -26,
    cursorStyle: 'pointer',
    mouseUpHandler: handleDelObject,
    render: renderSvgIcon(DEL_IMG)
  });
  fabric.Object.prototype.controls.del = delControl;
}

// TODO handle corner mouse over
export const handleMouseOverCorner = (corner, target) => {
  if (corner === 'mtr') {
    target.controls[corner].render = renderSvgIcon(ROTATE_IMG_ACTIVE);
  }
  if (corner === 'copy') {
    target.controls[corner].render = renderSvgIcon(COPY_IMG_ACTIVE);
  }
  if (corner === 'del') {
    target.controls[corner].render = renderSvgIcon(DEL_IMG_ACTIVE);
  }
  target.canvas.requestRenderAll();
}

export const handleMouseOutCorner = (target) => {
  if (!target) return;
  target.controls.mtr.render = renderSvgIcon(ROTATE_IMG);
  target.controls.copy.render = renderSvgIcon(COPY_IMG);
  target.controls.del.render = renderSvgIcon(DEL_IMG);
}

export default function initControl () {
  renderController();
  renderRotateController();
  renderToolBarController();
  initRectControl();
  initFLineControl();
  initFTextControl();
}