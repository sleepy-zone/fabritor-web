import hotkeys from 'hotkeys-js';
import { copyObjecy, pasteObject, removeObject } from '@/utils/helper';
let _clipboard;
export default function initHotKey (canvas) {
  // @ts-ignore
  hotkeys('ctrl+c,command+c', async (event) => {
    event.preventDefault();
    _clipboard = await copyObjecy(canvas);
  });
  hotkeys('ctrl+v,command+v', (event) => {
    event.preventDefault();
    if (_clipboard) {
      pasteObject(_clipboard, canvas);
    }
  });
  hotkeys('delete,del,backspace', (event) => {
    event.preventDefault();
    removeObject(canvas.getActiveObject(), canvas);
  });
}