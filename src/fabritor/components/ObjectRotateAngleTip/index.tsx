import { GlobalStateContext } from '@/context';
import { Tag } from 'antd';
import { useState, useContext, useEffect } from 'react';

function ObjectRotateAngleTip () {
  const [pos, setPos] = useState({ left: 0, top: 0 });
  const [content, setContent] = useState('');
  const [open, setOpen] = useState(false);
  const { editor } = useContext(GlobalStateContext);

  const rotateHandler = (opt) => {
    const { target, e } = opt;
    setPos({
      left: e.pageX + 16,
      top: e.pageY
    });
    setContent(`${Math.round(target.angle)}°`);
    setOpen(true);
  }

  const mouseupHandler = () => {
    setOpen(false);
  }

  useEffect(() => {
    if (editor) {
      editor.canvas.on('object:rotating', rotateHandler);
      editor.canvas.on('mouse:up', mouseupHandler);
    }
  }, [editor]);

  return (
    <div
      style={{
        fontSize: 12,
        position: 'fixed',
        zIndex: 9999,
        width: 'max-content',
        display: open ? 'block' : 'none',
        ...pos
      }}
    >
      <Tag color="rgba(0, 0, 0, 0.85)">{content}</Tag>
    </div>
  )
}

export default ObjectRotateAngleTip;
