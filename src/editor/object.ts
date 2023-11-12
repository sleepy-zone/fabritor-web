import { fabric } from 'fabric';
import { OBJECT_DEFAULT_CONFIG, IMAGE_DEFAULT_CONFIG } from '@/utils/constants';

export const initObjectPrototype = () => {
  Object.keys(OBJECT_DEFAULT_CONFIG).forEach(key => {
    fabric.Object.prototype[key] = OBJECT_DEFAULT_CONFIG[key];
  });

  Object.keys(IMAGE_DEFAULT_CONFIG).forEach(key => {
    fabric.Image.prototype[key] = IMAGE_DEFAULT_CONFIG[key];
  });
}