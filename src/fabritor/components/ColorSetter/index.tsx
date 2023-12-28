import { Popover } from 'antd';
import { ColorsPicker } from 'react-colors-beauty';
import { FontColorsOutlined, BgColorsOutlined } from '@ant-design/icons';
import { useEffect, useState, useContext } from 'react';
import { GloablStateContext } from '@/context';
import { transformColors2Fill, transformFill2Colors } from '@/utils';

export default function ColorSetter (props) {
  const { effectKey = 'fill', defaultColor = '#ffffff', trigger, type } = props;
  const [value, setValue] = useState<any>();
  const { object } = useContext(GloablStateContext);

  const handleChange = (v) => {
    if (!v) return;
    if (!v.color) v.color = defaultColor;
    setValue(v);
    const fill = transformColors2Fill(v);
    object.set(effectKey, fill);
    object?.canvas?.requestRenderAll();
  }

  const renderTrigger = () => {
    // TODO color value / other color Setter
    if (trigger) return trigger;
    if (type === 'fontColor') {
      return <FontColorsOutlined style={{ fontSize: 22, color: value }} />;
    }
    if (type === 'sketch') {
      return <BgColorsOutlined style={{ fontSize: 22, color: value }} />
    }
    return (
      <div style={{ width: 24, height: 24, backgroundColor: value, borderRadius: 4 }} />
    )
  }

  useEffect(() => {
    if (object) {
      const colors = object[effectKey];
      setValue(transformFill2Colors(colors));
    }
  }, [object]);

  return (
    <Popover
      content={
        <ColorsPicker
          value={value}
          onChange={handleChange}
          format="hex"
          angleType="rotate"
        />
      }
      trigger="click"
    >
      <div className="fabritor-toolbar-setter-trigger">
        {renderTrigger()}
      </div>
    </Popover>
  )
}