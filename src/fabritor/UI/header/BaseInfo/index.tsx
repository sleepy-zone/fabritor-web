import { useState, useEffect } from 'react';
import { Typography } from 'antd';
import { getGlobalEditor } from '@/utils/global';

const { Title } = Typography;

export default function BaseInfo () {
  const [desc, setDesc] = useState('');

  const handleChange = (v) => {
    setDesc(v);
    const editor = getGlobalEditor();
    if (!editor) return;
    const { sketch } = editor;
    // @ts-ignore custom desc
    sketch.set('fabritor_desc', v);
  }

  useEffect(() => {
    const editor = getGlobalEditor();
    if (!editor) return;
    const { sketch } = editor;
    // @ts-ignore custom desc
    setDesc(sketch.fabritor_desc);
  }, []);

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