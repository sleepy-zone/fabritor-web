import hotkeys from 'hotkeys-js';
import { copyObject, pasteObject, removeObject } from '@/utils/helper';

export default function initHotKey (canvas, fhistory) {
  // @ts-ignore
  hotkeys('ctrl+c,command+c', async (event) => {
    // event.preventDefault();
    await copyObject(canvas, null);
  });

  hotkeys('ctrl+v,command+v', (event) => {
    // event.preventDefault();
    pasteObject(canvas);
  });

  hotkeys('delete,del,backspace', (event) => {
    event.preventDefault();
    removeObject(null, canvas);
  });

  hotkeys('ctrl+z,command+z', (event) => {
    event.preventDefault();
    fhistory.undo();
  });

  hotkeys('ctrl+shift+z,command+shift+z', (event) => {
    event.preventDefault();
    fhistory.redo();
  });

  hotkeys('up, right, down, left', (event, handler) => {
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    if (activeObject.type === 'f-text' && activeObject.isEditing) return;
    event.preventDefault();
    switch (handler.key) {
      case 'up':
        activeObject.set('top', activeObject.top - 1);
        break;
      case 'right':
        activeObject.set('left', activeObject.left + 1);
        break;
      case 'down':
        activeObject.set('top', activeObject.top + 1);
        break;
      case 'left':
        activeObject.set('left', activeObject.left - 1);
        break;
      default:
        break;
    }
    if (activeObject.group) {
      activeObject.addWithUpdate();
    }
    canvas.requestRenderAll();
  });
}