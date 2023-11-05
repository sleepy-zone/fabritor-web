import { useContext } from 'react';
import { Button } from 'antd';
import { getGlobalEditor } from '@/utils/global';
import { GloablStateContext } from '@/context';

export default function TextPanel () {
  const { setActiveObject } = useContext(GloablStateContext);

  const handleAddText = () => {
    const editor = getGlobalEditor();
    const textbox = editor.addTextbox();
    editor.canvas.setActiveObject(textbox);
    setActiveObject(textbox);
  }

  return (
    <div className="fabritor-panel-text-wrapper">
      <Button type="primary" block onClick={handleAddText}>
        添加文本框
      </Button>
    </div>
  )
}