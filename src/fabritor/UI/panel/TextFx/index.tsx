import { fabric } from 'fabric';
import { useContext, useEffect, useState } from 'react';
import { Flex, Space, Slider } from 'antd';
import Title from '@/fabritor/components/Title';
import ColorSetter from '@/fabritor/components/ColorSetter';
import { GloablStateContext } from '@/context';
import { getGlobalEditor } from '@/utils/global';
import TextShadow from './TextShadow';

export default function TextFx () {
  const { object, setFxType } = useContext(GloablStateContext);
  const [fxValue, setFxValue] = useState({});

  const handleFxValueChange = (v, key) => {
    const editor = getGlobalEditor();
    if (key === 'shadow') {
      object.shadow = new fabric.Shadow({
        color: v.color,
        blur: v.blur,
        offsetX: v.offset,
        offsetY: v.offset
      });
    } else {
      object.set(key, v);
    }
    editor.canvas.requestRenderAll();
    editor.fireCustomModifiedEvent();
    setFxValue({
      ...fxValue,
      [key]: v
    });
  }

  const initObjectFx = () => {
    setFxValue({
      stroke: object.stroke,
      strokeWidth: object.strokeWidth,
      textBackgroundColor: object.textBackgroundColor,
      shadow: {
        color: object.shadow?.color || object.stroke,
        blur: object.shadow?.blur || 0,
        offset: object.shadow?.offsetX || 0
      }
    });
  }

  useEffect(() => {
    if (!object || object.type !== 'textbox') {
      setFxType('');
    } else {
      initObjectFx();
    }
  }, [object]);

  return (
    <div className="fabritor-setter-panel">
      <div style={{ padding: 16 }}>
        <Title>描边</Title>
        <Flex vertical gap={8}>
          <Flex justify="space-between" align="center">
            <span>颜色</span>
            <ColorSetter
              value={fxValue?.stroke}
              onChange={(v) => { handleFxValueChange(v, 'stroke') }}
            />
          </Flex>
          <Space direction="vertical">
            <span>粗细</span>
            <Slider
              min={0}
              max={100}
              style={{ width: '100%' }}
              value={fxValue?.strokeWidth}
              onChange={(v) => { handleFxValueChange(v, 'strokeWidth') }}
            />
          </Space>
          <Flex justify="space-between" align="center">
            <span>背景色</span>
            <ColorSetter
              value={fxValue?.textBackgroundColor}
              onChange={(v) => { handleFxValueChange(v, 'textBackgroundColor') }}
            />
          </Flex>
        </Flex>
        <Title>阴影</Title>
        <TextShadow value={fxValue?.shadow} onChange={(v) => handleFxValueChange(v, 'shadow')} />
        {/* <Title>形状</Title> */}
      </div>
    </div>
  )
}