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

    setSrc (src, callback) {
      this.img.setSrc(src, () => {
        const width = this.img.getScaledWidth();
        const height = this.img.getScaledHeight();
        this.img.setCoords();
        this.borderRect.set({ width, height });
        this.addWithUpdate(this.borderRect);
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
      this.imageBorder = {...b};
      this.addWithUpdate();
    },

    getBorder () {
      return this.imageBorder;
    }
  });

  fabric.FImage.fromObject = (object, callback) => {
    const { objects, ...options } = object;
    const imgJson = {...objects[0]};
    const { src, ...imgOptions } = imgJson;
    loadImage(imgJson.src).then((img) => {
      img.set(imgOptions);
      callback(new fabric.FImage({ image: img, ...options }, true));
    });
  }
}