import { fabric } from 'fabric';

export const createFLineClass = () => {
  // @ts-ignore FLine
  fabric.FLine = fabric.util.createClass(fabric.Path, {
    type: 'f-line',

    initialize (options) {
      const { start, end, ...rest } = options;
      this.setOptions(rest);
      this._setPath([['M', ...start], ['L', ...end]]);
    },

    setStartX (startX) {
      const path = this.path; 
      path[0][1] = startX;
      this._setPath(path);
    },

    setEndX (endX) {
      const path = this.path; 
      path[1][1] = endX;
      this._setPath(path);
    }
  }); 
}

export default function createCustomClass () {
  createFLineClass();
}