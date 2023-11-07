import { useContext } from 'react';
import { Button } from 'antd';
import { getGlobalEditor } from '@/utils/global';
import { GloablStateContext } from '@/context';
import PresetFontPanel from './PresetFontPanel';
import { createTextbox } from '@/editor/textbox';

export default function TextPanel () {
  const { setActiveObject } = useContext(GloablStateContext);

  const handleAddText = async (options) => {
    const editor = getGlobalEditor();
    const textbox = await createTextbox(options);
    editor.canvas.setActiveObject(textbox);
    setActiveObject(textbox);
  }

  // const clear = () => {
  //   const editor = getGlobalEditor();
  //   editor.canvas.discardActiveObject();
  //   editor.canvas.requestRenderAll();
  //   setActiveObject(null);
  // }

  return (
    <div className="fabritor-panel-text-wrapper">
      <Button type="primary" block onClick={() => { handleAddText({}) }} size="large">
        添加文本框
      </Button>
      <PresetFontPanel addTextBox={handleAddText} />
    </div>
  )
}