import { Button } from 'antd';
import { getGlobalEditor } from '@/utils/global';

import './index.scss';

export default function TextPanel () {
  const handleAddText = () => {
    const editor = getGlobalEditor();
    editor.addTextbox();
  }

  return (
    <div className="fabritor-panel-text-wrapper">
      <Button type="primary" block onClick={handleAddText}>
        添加文本框
      </Button>
    </div>
  )
}