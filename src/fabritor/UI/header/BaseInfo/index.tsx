import { useState, useEffect, useContext } from 'react';
import { Typography } from 'antd';
import { GloablStateContext } from '@/context';

const { Text } = Typography;

export default function BaseInfo () {
  const [desc, setDesc] = useState('');
  const { editor } = useContext(GloablStateContext);

  const handleChange = (v) => {
    const _v = v || '我的画板 by fabritor';
    setDesc(_v);
    if (!editor) return;
    const { sketch } = editor;
    // @ts-ignore custom desc
    sketch.set('fabritor_desc', _v);

    editor.fireCustomModifiedEvent();
  }

  useEffect(() => {
    if (!editor) return;
    const { sketch } = editor;
    // @ts-ignore custom desc
    setDesc(sketch.fabritor_desc);
  }, [editor?.sketch]);

  return (
    <Text
      editable={{
        onChange: handleChange,
        autoSize: {
          minRows: 1,
          maxRows: 1
        }
      }}
      ellipsis={{
        rows: 1
      }}
      style={{ margin: 0, width: 200 }}
    >
      {desc || ''}
    </Text>
  )
}