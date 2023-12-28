import { fabric } from 'fabric';
import { ColorPicker, Popover } from 'antd';
import { ColorsPicker } from 'react-colors-beauty';
import { FontColorsOutlined, BgColorsOutlined } from '@ant-design/icons';
import { useEffect, useState, useContext } from 'react';
import { GloablStateContext } from '@/context';
import { transformColors2Fill, transformFill2Colors } from '@/utils';

export default function ColorSetter (props) {
  const { effectKey = 'fill', trigger, type } = props;
  const [value, setValue] = useState<any>();
  const { object } = useContext(GloablStateContext);

  const handleChange = (v) => {
    if (!v || !object) return;
    setValue(v);
    const fill = transformColors2Fill(v);
    console.log(fill)
    object.set(effectKey, fill);
    object?.canvas?.requestRenderAll();
  }

  const renderTrigger = () => {
    if (trigger) return trigger;
    if (type === 'fontColor') {
      return <FontColorsOutlined style={{ fontSize: 22, color: value, border: value === '#ffffff' ? '1px solid #ccc' : ''  }} />;
    }
    if (type === 'sketch') {
      return <BgColorsOutlined style={{ fontSize: 22, color: value, border: value === '#ffffff' ? '1px solid #ccc' : '' }} />
    }
    return (
      <div style={{ width: 24, height: 24, backgroundColor: value, border: '1px solid #ccc', borderRadius: 4 }} />
    )
  }

  useEffect(() => {
    if (object) {
      const colors = object[effectKey];
      if (typeof colors === 'string') {
        setValue(transformFill2Colors(colors));
      }
    }
  }, [object]);

  return (
    <Popover
      content={
        <ColorsPicker value={value} onChange={handleChange} format="hex" />
      }
      trigger="click"
    >
      <div className="fabritor-toolbar-setter-trigger">
        {renderTrigger()}
      </div>
    </Popover>
  )
}