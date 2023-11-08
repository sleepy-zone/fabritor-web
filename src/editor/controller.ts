// cursor css https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor

import { fabric } from 'fabric';
import { ROTATE_SVG } from '@/assets/icon';

const ROTATE_IMG = document.createElement('img');
ROTATE_IMG.src = ROTATE_SVG;

const renderSizeIcon = (ctx, left, top, styleOverride, fabricObject, TBorLR) => {
  const xSize = TBorLR === 'TB' ? 20 : 6;
  const ySize = TBorLR === 'TB' ? 6 : 20;;
  ctx.save();
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#dddddd';
  ctx.lineWidth = 2;
  ctx.shadowBlur = 6;
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

const renderVertexIcon = (ctx, left, top, styleOverride, fabricObject) => {
  const size = 12;
  ctx.save();
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#dddddd';
  ctx.lineWidth = 2;
  ctx.shadowBlur = 6;
  ctx.shadowColor = '#dddddd';
  ctx.beginPath();
  ctx.arc(left, top, size / 2, 0, 2 * Math.PI, false);
  ctx.stroke();
  ctx.fill();
  ctx.restore();
}

const renderRotateIcon = (ctx, left, top, styleOverride, fabricObject) => {
  const size = 24;
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
  ctx.drawImage(ROTATE_IMG, -size / 2, -size / 2, size, size);
  ctx.restore();
}

export const renderController = () => {
  // middle top
  const mtConfig = {
    x: 0,
    y: -0.5,
    offsetY: -1,
    cursorStyleHandler: () => 'ns-resize',
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
    cursorStyleHandler: () => 'ns-resize',
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
    cursorStyleHandler: () => 'ew-resize',
    render: renderLRIcon
  };
  Object.keys(mlConfig).forEach(key => {
    fabric.Object.prototype.controls.ml[key] = mlConfig[key];
    // TextBox 
    // https://github.com/fabricjs/fabric.js/blob/5.x/src/mixins/default_controls.js
    fabric.Textbox.prototype.controls.ml[key] = mlConfig[key];
  });

  // middle right
  const mrConfig = {
    x: 0.5,
    y: 0,
    offsetX: 1,
    cursorStyleHandler: () => 'ew-resize',
    render: renderLRIcon
  };
  Object.keys(mrConfig).forEach(key => {
    fabric.Object.prototype.controls.mr[key] = mrConfig[key];
    fabric.Textbox.prototype.controls.mr[key] = mrConfig[key];
  });

  // top left
  const tlConfig = {
    x: -0.5,
    y: -0.5,
    cursorStyleHandler: () => 'nwse-resize',
    render: renderVertexIcon
  }
  Object.keys(tlConfig).forEach(key => {
    fabric.Object.prototype.controls.tl[key] = tlConfig[key];
  });

  // top right
  const trConfig = {
    x: 0.5,
    y: -0.5,
    cursorStyleHandler: () => 'nesw-resize',
    render: renderVertexIcon
  }
  Object.keys(trConfig).forEach(key => {
    fabric.Object.prototype.controls.tr[key] = trConfig[key];
  });

  // bottom left
  const blConfig = {
    x: -0.5,
    y: 0.5,
    cursorStyleHandler: () => 'nesw-resize',
    render: renderVertexIcon
  }
  Object.keys(blConfig).forEach(key => {
    fabric.Object.prototype.controls.bl[key] = blConfig[key];
  });

  // top right
  const brConfig = {
    x: 0.5,
    y: 0.5,
    cursorStyleHandler: () => 'nwse-resize',
    render: renderVertexIcon
  }
  Object.keys(brConfig).forEach(key => {
    fabric.Object.prototype.controls.br[key] = brConfig[key];
  });
}

export const renderRotateController = () => {
  const mtrConfig = {
    x: 0,
    y: 0.5,
    offsetY: 38,
    cursorStyleHandler: () => 'crosshair',
    render: renderRotateIcon,
    withConnection: false
  };
  Object.keys(mtrConfig).forEach(key => {
    fabric.Object.prototype.controls.mtr[key] = mtrConfig[key];
  });
}

// copy & paste & delete & more
export const renderToolBarController = () => {

}