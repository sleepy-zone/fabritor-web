import { useContext } from 'react';
import { Button } from 'antd';
import { GloablStateContext } from '@/context';
import PresetFontPanel from './PresetFontPanel';
import { createTextbox } from '@/editor/textbox';

export default function TextPanel () {
  const { setActiveObject } = useContext(GloablStateContext);

  const handleAddText = async (options) => {
    const textbox = await createTextbox(options);
    setActiveObject(textbox);
  }

  return (
    <div className="fabritor-panel-text-wrapper">
      <Button type="primary" block onClick={() => { handleAddText({}) }} size="large">
        添加文本框
      </Button>
      <PresetFontPanel addTextBox={handleAddText} />
    </div>
  )
}