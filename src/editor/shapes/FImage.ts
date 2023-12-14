import { fabric } from 'fabric';
import { message } from 'antd';

const loadImage = (image) => {
  return new Promise((resolve, reject) => {
    if (typeof image === 'string') {
      fabric.util.loadImage(image, (img) => {
        if (!img) {
          message.error('加载远程图片失败');
          reject();
          return;
        }
        resolve(img);
      }, null, 'anonymous');
    } else {
      resolve(image);
    }
  });
}

export const createFImageClass = () => {
  // @ts-ignore FImage
  fabric.FImage = fabric.util.createClass(fabric.Rect, {
    type: 'f-image',

    initialize (options) {
      this.callSuper('initialize', options);
      let { imageSource, afterInit, ...rest } = options;

      if (!imageSource) {
        return;
      }

      this.setOptions(rest);
      loadImage(imageSource).then((img: HTMLImageElement) => {
        this.set({
          fill: new fabric.Pattern({
            source: img,
            repeat: 'no-repeat'
          }),
          width: img.width,
          height: img.height
        });
        afterInit && afterInit();
        this.canvas.requestRenderAll();
      }).catch((e) => {});
    }
  });

  // @ts-ignore FImage
  fabric.FImage.fromObject = (object, callback) => {
    const options = {...object};
    fabric.Object._fromObject('FImage', options, callback);
  }
}