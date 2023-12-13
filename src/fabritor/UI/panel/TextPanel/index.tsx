import { Button } from 'antd';
import PresetFontPanel from './PresetFontPanel';
import { createTextbox } from '@/editor/textbox';

export default function TextPanel () {
  const handleAddText = async (options) => {
    await createTextbox(options);
  }

  return (
    <div className="fabritor-panel-wrapper">
      <Button type="primary" block onClick={() => { handleAddText({}) }} size="large">
        添加文本框
      </Button>
      <PresetFontPanel addTextBox={handleAddText} />
    </div>
  )
}