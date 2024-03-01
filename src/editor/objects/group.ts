import { fabric } from 'fabric';
import { getGlobalEditor } from '@/utils/global';
import { uuid } from '@/utils';

export const createGroup = (options) => {
  const { items, ...rest } = options;
  const editor = getGlobalEditor();
  const { canvas } = editor;

  const group = new fabric.Group(items, {
    id: uuid(),
    ...rest
  });

  canvas.add(group);
  return group;
}