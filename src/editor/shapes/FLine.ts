import { fabric } from 'fabric';

export const createFLineClass = () => {
  // @ts-ignore FLine
  fabric.FLine = fabric.util.createClass(fabric.Path, {
    type: 'f-line',

    padding: 2,

    initialize (options) {
      const { start, end, arrow = [], left, top } = options;
      this.setOptions({
        arrowDelta: 15,
        ...options
      });
      this._setPath([['M', ...start], ['L', ...end], ...arrow]);
      this.set({ left, top });
    },

    setStartX (startX) {
      const path = this.path; 
      path[0][1] = startX;
      this._setPath(path);
    },

    setEndX (endX) {
      const path = this.path; 
      const arrow = path.slice(2);
      path[1][1] = endX;
      if (arrow && arrow.length) {
        arrow.forEach((item, index) => {
          if (index === this.middleIndex) {
            item[1] = endX;
          } else {
            item[1] = endX - this.arrowDelta;
          }
        });
      }
      this._setPath([path[0], path[1], ...arrow]);
    },

    setStrokeWidth (w) {
      const { left, top, path, strokeWidth } = this;
      const arrow = path.slice(2);
      const delta = w - strokeWidth;
      this.set('strokeWidth', w);
      if (arrow && arrow.length) {
        arrow.forEach((item, index) => {
          if (index !== this.middleIndex) {
            item[1] -= delta;
            item[2] > 0 ? item[2] += delta : item[2] -= delta;
          }
        });
        this.arrowDelta = arrow[this.middleIndex][1] - arrow[0][1];
      }
      this._setPath([path[0], path[1], ...arrow]);
      this.set({ left, top });
    },

    setStrokeDashArray (dashArray) {
      this.set('strokeDashArray', dashArray);
    }
  }); 

  fabric.FLine.fromObject = (object, callback) => {
    const options = {...object};
    const path = object.path;
    options.arrow = path.slice(2);
    options.start = path[0].slice(1);
    options.end = path[1].slice(1);
    fabric.Object._fromObject('FLine', options, callback);
  }
  fabric.FLine.ATTRIBUTE_NAMES = fabric.Path.ATTRIBUTE_NAMES;
}