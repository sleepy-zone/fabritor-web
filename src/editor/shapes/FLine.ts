import { fabric } from 'fabric';

const extend = fabric.util.object.extend;

export const createFLineClass = () => {
  // @ts-ignore FLine
  fabric.FLine = fabric.util.createClass(fabric.Line, {
    type: 'f-line',

    padding: 6,

    borderColor: '#00000000',

    setStrokeWidth (w) {
      this.set('strokeWidth', w);
    },

    setStrokeDashArray (dashArray) {
      this.set('strokeDashArray', dashArray);
    },

    setStrokeLineCap (isRound) {
      this.set('strokeLineCap', isRound ? 'round' : 'butt');
    },

    toObject (propertiesToInclude) {
      return extend(this.callSuper('toObject', propertiesToInclude), { x1: this.x1, y1: this.y1, x2: this.x2, y2: this.y2 });
    },
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