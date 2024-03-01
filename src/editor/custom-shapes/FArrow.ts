import { fabric } from 'fabric';

const extend = fabric.util.object.extend;

export const createFArrowClass = () => {
  // @ts-ignore custom arrow
  fabric.FArrow = fabric.util.createClass(fabric.Line, {

    type: 'f-arrow',

    borderColor: '#00000000',
  
    _render: function(ctx) {
      this.callSuper('_render', ctx);
  
      ctx.save();

      if (!this.oldArrowInfo) {
        this.oldArrowInfo = {
          left: -28,
          top: -15,
          bottom: 15,
          strokeWidth: this.strokeWidth
        };
      }
      var xDiff = this.x2 - this.x1;
      var yDiff = this.y2 - this.y1;
      var angle = Math.atan2(yDiff, xDiff);
      ctx.translate((this.x2 - this.x1) / 2, (this.y2 - this.y1) / 2);
      ctx.rotate(angle);

      const delta = this.strokeWidth - this.oldArrowInfo.strokeWidth;
      ctx.lineJoin = this.strokeLineJoin;
      ctx.lineCap = this.strokeLineCap;
      ctx.strokeStyle = this.stroke;
      ctx.beginPath();

      ctx.moveTo(0, 0);
      ctx.lineTo(this.oldArrowInfo.left - delta, this.oldArrowInfo.bottom + delta);
      ctx.lineTo(this.oldArrowInfo.left - delta, this.oldArrowInfo.top - delta);
      ctx.closePath();
      ctx.fillStyle = this.stroke;
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    },

    setStrokeWidth (w) {
      this.set('strokeWidth', w);
    },

    setStrokeDashArray (dashArray) {
      this.set('strokeDashArray', dashArray);
    },

    setStrokeLineCap (isRound) {
      this.set('strokeLineCap', isRound ? 'round' : 'butt');
      this.set('strokeLineJoin', isRound ? 'round' : 'miter')
    },

    toObject (propertiesToInclude) {
      return extend(this.callSuper('toObject', propertiesToInclude), { x1: this.x1, y1: this.y1, x2: this.x2, y2: this.y2 });
    },
  });
  
  fabric.FArrow.fromObject = function(object, callback) {
    callback && callback(new fabric.FArrow([object.x1, object.y1, object.x2, object.y2], object));
  };
}

// Triangle Arrow Head
export const createFTriArrowClass = () => {
  // @ts-ignore custom arrow
  fabric.FTriArrow = fabric.util.createClass(fabric.Line, {

    type: 'f-tri-arrow',

    borderColor: '#00000000',
  
    _render: function(ctx) {
      this.callSuper('_render', ctx);
  
      ctx.save();

      if (!this.oldArrowInfo) {
        this.oldArrowInfo = {
          left: -24,
          top: -16,
          bottom: 16,
          strokeWidth: this.strokeWidth
        };
      }
      var xDiff = this.x2 - this.x1;
      var yDiff = this.y2 - this.y1;
      var angle = Math.atan2(yDiff, xDiff);
      ctx.translate((this.x2 - this.x1) / 2, (this.y2 - this.y1) / 2);
      ctx.rotate(angle);

      const delta = this.strokeWidth - this.oldArrowInfo.strokeWidth;
      ctx.lineJoin = this.strokeLineJoin;
      ctx.lineCap = this.strokeLineCap;
      ctx.strokeStyle = this.stroke;
      ctx.beginPath();

      ctx.moveTo(this.oldArrowInfo.left - delta, this.oldArrowInfo.bottom + delta);
      ctx.lineTo(0, 0);
      ctx.lineTo(this.oldArrowInfo.left - delta, this.oldArrowInfo.top - delta);
      ctx.fillStyle = '#00000000';
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    },

    setStrokeWidth (w) {
      this.set('strokeWidth', w);
    },

    setStrokeDashArray (dashArray) {
      this.set('strokeDashArray', dashArray);
    },

    setStrokeLineCap (isRound) {
      this.set('strokeLineCap', isRound ? 'round' : 'butt');
      this.set('strokeLineJoin', isRound ? 'round' : 'miter')
    },

    toObject (propertiesToInclude) {
      return extend(this.callSuper('toObject', propertiesToInclude), { x1: this.x1, y1: this.y1, x2: this.x2, y2: this.y2 });
    },
  });
  
  fabric.FTriArrow.fromObject = function(object, callback) {
    callback && callback(new fabric.FTriArrow([object.x1, object.y1, object.x2, object.y2], object));
  };
}