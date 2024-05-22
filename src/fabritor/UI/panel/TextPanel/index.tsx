import { Button } from 'antd';
import PresetFontPanel from './PresetFontPanel';
import { createTextbox } from '@/editor/objects/textbox';
import { useContext } from 'react';
import { GloablStateContext } from '@/context';
import { useTranslation } from '@/i18n/utils';

export default function TextPanel () {
  const { editor } = useContext(GloablStateContext);
  const { t } = useTranslation();
  
  const handleAddText = async (options) => {
    await createTextbox({  ...options, canvas: editor.canvas });
  }

  return (
    <div className="fabritor-panel-wrapper">
      <Button type="primary" block onClick={() => { handleAddText({}) }} size="large">
        {t('panel.text.add')}
      </Button>
      <PresetFontPanel addTextBox={handleAddText} />
    </div>
  )
}