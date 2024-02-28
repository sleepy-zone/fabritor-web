import { fabric } from 'fabric';

export const createFLineClass = () => {
  // @ts-ignore FLine
  fabric.FLine = fabric.util.createClass(fabric.Line, {
    type: 'f-line',

    borderColor: '#00000000',

    setStrokeWidth (w) {
      this.set('strokeWidth', w);
    },

    setStrokeDashArray (dashArray) {
      this.set('strokeDashArray', dashArray);
    }
  }); 

  // @ts-ignore FLine
  fabric.FLine.fromObject = (object, callback) => {
    function _callback(instance) {
      delete instance.points;
      callback && callback(instance);
    };
    const options = { ...object };
    options.points = [object.x1, object.y1, object.x2, object.y2];
    fabric.Object._fromObject('FLine', options, _callback, 'points');
  };
}