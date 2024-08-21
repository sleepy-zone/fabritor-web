import { Button } from 'antd';
import { useContext } from 'react';
import { GlobalStateContext } from '@/context';
import { groupSelection, ungroup } from '@/utils/helper';
import { useTranslation } from '@/i18n/utils';

export default function GroupSetter () {
  const { object, editor } = useContext(GlobalStateContext);
  const { t } = useTranslation();

  if (!object || (object.type !== 'group' && object.type !== 'activeSelection')) return null;

  return (
    <div>
      {
        object.type === 'group' ?
        <Button type="primary" block onClick={() => { ungroup(editor.canvas, object); }}>{t('setter.group.ung')}</Button> :
        <Button type="primary" block onClick={() => { groupSelection(editor.canvas, object); }}>{t('setter.group.g')}</Button>
      }
    </div>
  )
}