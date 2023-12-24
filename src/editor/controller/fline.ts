import { fabric } from 'fabric';
import { getLocalPoint } from '@/utils/helper';

const changeEnd = (eventData, transform, x, y) => {
  const { target, originX, originY } = transform;
  let { left, top, width } = target;
  const localPoint = getLocalPoint(transform, originX, originY, x, y);
  if (localPoint.x < 0) {
    left += (localPoint.x + width);
  } 
  target.setEndX(Math.abs(localPoint.x));
  target.set({ left, top, dirty: true });
  target.setCoords();
  
  return true;
}

export const initFLineControl = () => {
  const objectControls = fabric.Object.prototype.controls;

  if (fabric.FLine) {
    const flineControls: any = fabric.FLine.prototype.controls = {};
    // flineControls.tr = objectControls.tr;
    // flineControls.br = objectControls.br;
    // flineControls.tl = objectControls.tl;
    // flineControls.bl = objectControls.bl;
    // flineControls.mt = objectControls.mt;
    // flineControls.mb = objectControls.mb;
    flineControls.mtr = objectControls.mtr;
    flineControls.copy = objectControls.copy;
    flineControls.del = objectControls.del;

    flineControls.ml = new fabric.Control({
      x: -0.5,
      y: 0,
      actionHandler: changeEnd,
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