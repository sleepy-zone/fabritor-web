import i18n from './index';

export const translate = (key) => {
  return i18n.t(key);
}

export { useTranslation, Trans } from 'react-i18next';