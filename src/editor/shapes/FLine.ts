import { fabric } from 'fabric';

export const createFLineClass = () => {
  // @ts-ignore FLine
  fabric.FLine = fabric.util.createClass(fabric.Path, {
    type: 'f-line',

    initialize (options) {
      const { start, end, min, max, arrow = [], middleIndex, ...rest } = options;
      this.setOptions(rest);
      this.max = max;
      this.min = min;
      this.middleIndex = middleIndex;
      this._setPath([['M', ...start], ['L', ...end], ...arrow]);
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
            item[1] = endX - 15;
          }
        });
      }
      this._setPath([path[0], path[1], ...arrow]);
    },

    setStrokeWidth (w) {
      const left = this.left;
      const top = this.top;
      const path = this.path; 
      const arrow = path.slice(2);
      this.set('strokeWidth', w);
      // if (arrow && arrow.length) {
      //   arrow.forEach((item, index) => {
      //     if (index !== this.middleIndex) {
      //       item[1] -= w;
      //     }
      //   });
      // }
      // this.set({ left, top });
      // this._setPath([path[0], path[1], ...arrow]);
    },

    setStrokeDashArray (dashArray) {
      this.set('strokeDashArray', dashArray);
    }
  }); 

  fabric.FLine.fromObject = fabric.Path.fromObject;
  fabric.FLine.ATTRIBUTE_NAMES = fabric.Path.ATTRIBUTE_NAMES;
}