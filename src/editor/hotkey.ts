import hotkeys from 'hotkeys-js';
import { copyObject, pasteObject, removeObject } from '@/utils/helper';

export default function initHotKey (canvas, fhistory) {
  // @ts-ignore
  hotkeys('ctrl+c,command+c', async (event) => {
    event.preventDefault();
    await copyObject(canvas, null);
  });

  hotkeys('ctrl+v,command+v', (event) => {
    event.preventDefault();
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
}