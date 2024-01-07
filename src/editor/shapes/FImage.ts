import { fabric } from 'fabric';
import { message } from 'antd';

export const loadImage = async (imageSource) => {
  if (typeof imageSource === 'string') {
    return new Promise<fabric.Image>((resolve, reject) => {
      fabric.Image.fromURL(imageSource, (img) => {
        if (!img) {
          message.error('加载远程图片失败');
          reject();
          return;
        }
        resolve(img);
      }, {
        crossOrigin: 'anonymous'
      });
    });
  }
  return Promise.resolve(new fabric.Image(imageSource));
}

export const createFImageClass = () => {
  // @ts-ignore custom image
  fabric.FImage = fabric.util.createClass(fabric.Group, {
    type: 'f-image',

    initialize (options, alreayGrouped = false) {
      const { image, imageBorder = {}, ...rest } = options;
      image.set({
        originX: 'center',
        originY: 'center'
      });
      this.img = image;
      this.borderRect = this._createBorderRect(imageBorder);
      this.img.clipPath = this._createClipPath();
      this.callSuper('initialize', [this.img, this.borderRect], {
        borderColor: '#FF2222',
        borderDashArray: null,
        borderScaleFactor: 2,
        padding: 0,
        subTargetCheck: false,
        imageBorder,
        ...rest
      }, alreayGrouped);
    },

    _createBorderRect ({ stroke, strokeWidth, borderRadius }) {
      const width = this.img.getScaledWidth();
      const height = this.img.getScaledHeight();
      const options = {
        width,
        height,
        rx: borderRadius || 0,
        ry: borderRadius || 0,
        originX: 'center',
        originY: 'center',
        fill: '#00000000',
        paintFirst: 'fill'
      };
      if (stroke) options.stroke = stroke;
      if (strokeWidth) options.strokeWidth = strokeWidth;
      return new fabric.Rect(options);
    },

    _createClipPath () {
      const width = this.img.width;
      const height = this.img.height;
      console.log(width, height)
      return new fabric.Rect({
        originX: 'center',
        originY: 'center',
        width,
        height,
        rx: this.borderRect.rx || 0,
        ry: this.borderRect.ry || 0
      });
    },

    setSrc (src, callback) {
      this.img.setSrc(src, () => {
        const width = this.img.getScaledWidth();
        const height = this.img.getScaledHeight();
        this.img.setCoords();
        this.borderRect.set({ width, height, dirty: true });
        this.img.set({
          clipPath: this._createClipPath(),
          dirty: true
        });
        this.addWithUpdate();
        callback && callback();
      });
    },

    getSrc () {
      return this.img.getSrc();
    },

    setBorder (b) {
      this.borderRect.set({
        stroke: b.stroke || null,
        strokeWidth: b.strokeWidth || 1,
        rx: b.borderRadius || 0,
        ry: b.borderRadius || 0,
        strokeDashArray: b.strokeDashArray || null
      });
      this.img.setCoords();
      this.img.set({
        clipPath: this._createClipPath(),
        dirty: true
      });
      this.imageBorder = {...b};
      this.addWithUpdate();
    },

    getBorder () {
      return this.imageBorder;
    },

    // http://fabricjs.com/fabric-filters
    applyFilter (filter) {
      try {
        this.img.filters = filter ? [filter] : [];
        this.img.applyFilters();
      } catch(e) {
        console.log(e);
      }
    },

    applyFilterValue (prop, value) {
      const filter = this.getFilter();
      if (filter) {
        filter[prop] = value;
        this.img.filters = [filter];
        this.img.applyFilters();
      }
    },

    getFilter () {
      return this.img.filters[0];
    }
  });

  fabric.FImage.fromObject = (object, callback) => {
    const { objects, ...options } = object;
    const imgJson = {...objects[0]};
    fabric.Image.fromObject(imgJson, (img) => {
      callback(new fabric.FImage({ image: img, ...options }, true));
    });
  }
}