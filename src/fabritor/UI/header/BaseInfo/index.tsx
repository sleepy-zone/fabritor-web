import { useState, useEffect, useContext } from 'react';
import { Typography } from 'antd';
import { GloablStateContext } from '@/context';

const { Title } = Typography;

export default function BaseInfo () {
  const [desc, setDesc] = useState('');
  const { editor } = useContext(GloablStateContext);

  const handleChange = (v) => {
    setDesc(v);
    if (!editor) return;
    const { sketch } = editor;
    // @ts-ignore custom desc
    sketch.set('fabritor_desc', v);
  }

  useEffect(() => {
    if (!editor) return;
    const { sketch } = editor;
    // @ts-ignore custom desc
    setDesc(sketch.fabritor_desc);
  }, [editor]);

  return (
    <Title
      level={5}
      editable={{
        onChange: handleChange
      }}
      style={{ margin: 0, fontSize: 16 }}
    >
      {desc || ''}
    </Title>
  )
}