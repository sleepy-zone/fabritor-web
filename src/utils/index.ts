import * as FontFaceObserver from 'fontfaceobserver';
import { v4 as uuidv4 } from 'uuid';
import { FONT_PRESET_FAMILY_LIST, LOG_PREFIX } from './constants';

export const loadFont = async (f: string) => {
  if (!f) return Promise.resolve();
  const item = FONT_PRESET_FAMILY_LIST.find(_item => _item.value === f);
  if (!item) return Promise.resolve();
  const font = new FontFaceObserver(f);
  return font.load(null, 1000 * 100).catch((e) => { console.error(LOG_PREFIX, e); });
}

export const uuid = () => {
  return uuidv4();
}
