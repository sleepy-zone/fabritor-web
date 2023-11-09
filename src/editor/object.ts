import { fabric } from 'fabric';
import { OBJECT_DEFAULT_CONFIG } from '@/utils/constants';

export const initObjectPrototype = () => {
  Object.keys(OBJECT_DEFAULT_CONFIG).forEach(key => {
    fabric.Object.prototype[key] = OBJECT_DEFAULT_CONFIG[key];
  });
}