import { fabric } from 'fabric';

// @ts-ignore fabric controlsUtils
const controlsUtils = fabric.controlsUtils;

const changeEnd = (eventData, transform, x, y) => {
  const { target } = transform;
  const path = target.path;
  target._setPath([...path, [ 'L', eventData.x - x, 0 ]]);
  return true;
}

export const initFLineControl = () => {
  const objectControls = fabric.Object.prototype.controls;

  if (fabric.FLine) {
    const flineControls: any = fabric.FLine.prototype.controls = {};
    flineControls.tr = objectControls.tr;
    flineControls.br = objectControls.br;
    flineControls.tl = objectControls.tl;
    flineControls.bl = objectControls.bl;
    flineControls.mt = objectControls.mt;
    flineControls.mb = objectControls.mb;

    flineControls.ml = new fabric.Control({
      x: -0.5,
      y: 0,
      actionHandler: controlsUtils.changeWidth,
      cursorStyleHandler: objectControls.ml.cursorStyleHandler,
      actionName: 'resizing',
      render: objectControls.bl.render
    });

    flineControls.mr = new fabric.Control({
      x: 0.5,
      y: 0,
      actionHandler: changeEnd,
      cursorStyleHandler: objectControls.mr.cursorStyleHandler,
      actionName: 'resizing',
      render: objectControls.br.render
    });
  }
}