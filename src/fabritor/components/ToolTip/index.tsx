import { useImperativeHandle, forwardRef, useState } from 'react';

function ToolTip (props, ref) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [content, setContent] = useState('');
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      show (_pos, _content) {
        setOpen(true);
        setPos(_pos);
        setContent(_content);
      },
      close () {
        setOpen(false);
      }
    }
  });

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
      <div
        style={{
          padding: '6px 6px',
          color: '#fff',
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          borderRadius: 6
        }}
        role="tooltip"
      >
        {content}
      </div>
    </div>
  )
}

export default forwardRef(ToolTip);
