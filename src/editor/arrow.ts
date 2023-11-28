import { fabric } from 'fabric';
import { getGlobalEditor } from '@/utils/global';
import { uuid } from '@/utils';

export const drawArrowLine = async (options) => {
  const { svg, left, top, subType, ...rest  } = options || {};
  const editor = getGlobalEditor();
  const { canvas, sketch } = editor;

  return new Promise((resolve) => {
    fabric.loadSVGFromString(svg, (objects, o) => {
      const pg = fabric.util.groupSVGElements(objects, o);

      const line = objects.find(item => item.type === 'line');
      line?.set({
        strokeUniform: true,
        originY: 'center',
        top: 0,
        strokeWidth: 2
      });

      const arrow = objects.find(item => item.type === 'path');
      arrow?.set({
        originY: 'center',
        top: 0
      });

      pg.set({
        id: uuid(),
        sub_type: subType,
        line,
        arrow,
        subTargetCheck: false,
        ...rest
      });
      

      pg.setControlVisible('mt', false);
      pg.setControlVisible('mb', false);
      // pg.setControlVisible('ml', false);
      // pg.setControlVisible('mr', false);
      pg.setControlVisible('tl', false);
      pg.setControlVisible('tr', false);
      pg.setControlVisible('bl', false);
      pg.setControlVisible('br', false);

      if (left == null) {
        // @ts-ignore
        pg.set('left', sketch.width / 2 - pg.width / 2);
      } else {
        pg.set('left', left);
      }
      if (top == null) {
        // @ts-ignore
        pg.set('top', sketch.height / 2 - pg.height / 2);
      } else {
        pg.set('top', top);
      }

      pg.addWithUpdate();

      canvas.add(pg);
      canvas.setActiveObject(pg);
      canvas.requestRenderAll();

      resolve(pg);
    });
  });
}