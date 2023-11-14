import { fabric } from 'fabric';

export default function createArrowLineClass () {
  // @ts-ignore arrow-line
  fabric.ArrowLine = fabric.util.createClass(fabric.Line, {
    type: 'arrow-line',

    initialize (element, options = {}) {
      this.callSuper('initialize', element, options);
    },

    _render (ctx) {
      this.ctx = ctx;
      this.callSuper('_render', ctx);
      let p = this.calcLinePoints();
      let xDiff = this.x2 - this.x1;
      let yDiff = this.y2 - this.y1;
      let angle = Math.atan2(yDiff, xDiff);
      this.drawArrow(angle, p.x2, p.y2);
    },

    drawArrow (angle, xPos, yPos) {
      this.ctx.save();
      this.ctx.translate(xPos, yPos);
      this.ctx.rotate(angle);
      this.ctx.beginPath();
      // Move 5px in front of line to start the arrow so it does not have the square line end showing in front (0,0)
      this.ctx.moveTo(10, 0);
      this.ctx.lineTo(-15, 15);
      this.ctx.lineTo(-15, -15);
      this.ctx.closePath();
      this.ctx.fillStyle = this.stroke;
      this.ctx.fill();
      this.ctx.restore();
    }
  });

  // @ts-ignore arrow-line
  fabric.ArrowLine.fromObject = function(object, callback) {
    // @ts-ignore arrow-line
    callback && callback(new fabric.ArrowLine([object.x1, object.y1, object.x2, object.y2], object));
  };
}