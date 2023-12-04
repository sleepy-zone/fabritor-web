import { fabric } from 'fabric';

export const createFLineClass = () => {
  // @ts-ignore FLine
  fabric.FLine = fabric.util.createClass(fabric.Path, {
    type: 'f-line'
  }); 
}

export default function createCustomClass () {
  createFLineClass();
}