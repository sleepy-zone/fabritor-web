import { fabric } from 'fabric';

const controlsUtils = fabric.controlsUtils;

const changeLineEnd = (eventData, transform, x, y) => {
  const { target } = transform;
  target.set({ x2: x, y2: y  });
  return true;
}

const changeLineStart = (eventData, transform, x, y) => {
  const { target } = transform;
  target.set({ x1: x, y1: y  });
  return true;
}

const linePositionHandler = (x, y) => {
  return (dim, finalMatrix, fabricObject) => {
    if (fabricObject) {
      const points = fabricObject.calcLinePoints();
      const localPoint = new fabric.Point(points[x], points[y]);
      
      // move 不会改变 x1 y1 x2 y2
      const point = fabric.util.transformPoint(localPoint, fabric.util.multiplyTransformMatrices(
        fabricObject.canvas.viewportTransform,
        fabricObject.calcTransformMatrix()
      ));
      return point;
    }
    return {} as fabric.Point;
  }
}

export const initLineControl = () => {
  const objectControls = fabric.Object.prototype.controls;

  if (fabric.Line) {
    const lineControls: any = fabric.Line.prototype.controls = {};
    lineControls.copy = objectControls.copy;
    lineControls.del = objectControls.del;

    lineControls.l1 = new fabric.Control({
      positionHandler: linePositionHandler('x1', 'y1'),
      actionHandler: changeLineStart,
      cursorStyleHandler: () => 'crosshair',
      actionName: 'line-change',
      render: objectControls.br.render
    });

    lineControls.l2 = new fabric.Control({
      positionHandler: linePositionHandler('x2', 'y2'),
      actionHandler: changeLineEnd,
      cursorStyleHandler: () => 'crosshair',
      actionName: 'line-change',
      render: objectControls.br.render
    });
  }
}