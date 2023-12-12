import { fabric } from 'fabric';
import { changeHeight } from '@/utils/helper';

// @ts-ignore fabric controlsUtils
const controlsUtils = fabric.controlsUtils;

export const initRectControl = () => {
  const objectControls = fabric.Object.prototype.controls;

  if (fabric.Rect) {
    const rectControls: any = fabric.Rect.prototype.controls = {};
    rectControls.tr = objectControls.tr;
    rectControls.br = objectControls.br;
    rectControls.tl = objectControls.tl;
    rectControls.bl = objectControls.bl;
    rectControls.mt = objectControls.mt;
    rectControls.mb = objectControls.mb;
    rectControls.mtr = objectControls.mtr;
    rectControls.copy = objectControls.copy;
    rectControls.del = objectControls.del;

    rectControls.ml = new fabric.Control({
      x: -0.5,
      y: 0,
      actionHandler: controlsUtils.changeWidth,
      cursorStyleHandler: objectControls.ml.cursorStyleHandler,
      actionName: 'resizing',
      render: objectControls.ml.render
    });

    rectControls.mr = new fabric.Control({
      x: 0.5,
      y: 0,
      actionHandler: controlsUtils.changeWidth,
      cursorStyleHandler: objectControls.mr.cursorStyleHandler,
      actionName: 'resizing',
      render: objectControls.mr.render
    });

    rectControls.mt = new fabric.Control({
      x: 0,
      y: -0.5,
      offsetY: -1,
      actionHandler: changeHeight,
      cursorStyleHandler: objectControls.mt.cursorStyleHandler,
      actionName: 'resizing',
      render: objectControls.mt.render
    });

    rectControls.mb = new fabric.Control({
      x: 0,
      y: 0.5,
      offsetY: 1,
      actionHandler: changeHeight,
      cursorStyleHandler: objectControls.mb.cursorStyleHandler,
      actionName: 'resizing',
      render: objectControls.mb.render
    });
  }
}