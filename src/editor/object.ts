import { fabric } from 'fabric';
import { OBJECT_DEFAULT_CONFIG } from '@/utils/constants';

export const initObjectPrototype = () => {
  Object.keys(OBJECT_DEFAULT_CONFIG).forEach(key => {
    fabric.Object.prototype[key] = OBJECT_DEFAULT_CONFIG[key];
  });

  fabric.Textbox.prototype.padding = 4;

  const asConfig = {
    borderColor: '#cccddd',
    borderDashArray: [7, 10],
    borderScaleFactor: 3,
    padding: 10
  }
  Object.keys(asConfig).forEach(key => {
    fabric.ActiveSelection.prototype[key] = asConfig[key];
  });

  const LineHideControls = ['mt', 'mb', 'bl', 'tl', 'tr', 'br'];
  const LineConfig = {
    borderColor: 'rgba(0,0,0,0)'
  }
  LineHideControls.forEach((c) => {
    fabric.Line.prototype.setControlVisible(c, false);
  });
  Object.keys(LineConfig).forEach(key => {
    fabric.Line.prototype[key] = LineConfig[key];
  });
}