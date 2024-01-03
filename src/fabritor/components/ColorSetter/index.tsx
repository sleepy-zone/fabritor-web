import { Popover } from 'antd';
import { ColorsPicker, Color } from 'react-colors-beauty';
import type { ColorsValue } from 'react-colors-beauty';
import { useEffect, useState, useContext } from 'react';
import { GloablStateContext } from '@/context';
import { transformColors2Fill, transformFill2Colors } from '@/utils';
import { fabric } from 'fabric';

export default function ColorSetter (props) {
  const { effectKey = 'fill', defaultColor = '#ffffff', trigger, type } = props;
  const [value, setValue] = useState<ColorsValue>();
  const { object } = useContext(GloablStateContext);

  const handleChange = (v) => {
    if (!v) return;
    if (!v.color) v.color = defaultColor;
    setValue(v);
    let fill = transformColors2Fill(v);
    if (object.type === 'f-text' && typeof fill !== 'string') {
      // text gradient nor support percentage https://github.com/fabricjs/fabric.js/issues/8168  
      fill.gradientUnits = 'pixels';
      const { coords } = fill;
      fill.coords = {
        x1: coords.x1 === 1 ? object.width : 0,
        y1: coords.y1 === 1 ? object.height : 0,
        x2: coords.x2 === 1 ? object.width : 0,
        y2: coords.y2 === 1 ? object.height : 0,
        r1: 0,
        r2: object.width > object.height ? object.width / 2  : object.height
      }
    }
    if (typeof fill !== 'string') {
      fill = new fabric.Gradient(fill);
    }
    object.set(effectKey, fill);
    object?.canvas?.requestRenderAll();
  }

  const calcIconFill = () => {
    switch(value?.type) {
      case 'solid':
        return value.color;
      case 'linear':
      case 'radial':
        return `url(#colorsetter-icon-gradient) ${value.color || 'rgba(0, 0, 0, 0.88)'}`;
      default:
        return 'rgba(0, 0, 0, 0.88)';
    }
  }

  const calcBackgroundColor = () => {
    switch(value?.type) {
      case 'solid':
        return value.color;
      case 'linear':
        return `linear-gradient(${value.gradient?.angle}deg, ${value.gradient?.colorStops.map(stop => `${stop.color} ${stop.offset * 100}%`)})`;
      case 'radial':
        return `radial-gradient(at 50% 50%, ${value.gradient?.colorStops.map(stop => `${stop.color} ${stop.offset * 100}%`)})`;
      default:
        return 'rgba(0, 0, 0, 0.88)';
    }
  }

  const calcTriggerBorder = () => {
    if (value?.type === 'solid') {
      const c = new Color(value.color);
      if (c.toHexString() === '#ffffff') {
        return '1px solid rgb(204,204,204)';
      }
      return;
    }
    return;
  }

  const renderTrigger = () => {
    if (trigger) return trigger;
    if (type === 'fontColor') {
      return (
        <svg viewBox="64 64 896 896" focusable="false" width={22} height={22} fill={calcIconFill()} aria-hidden="true">
          <path d="M904 816H120c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-80c0-4.4-3.6-8-8-8zm-650.3-80h85c4.2 0 8-2.7 9.3-6.8l53.7-166h219.2l53.2 166c1.3 4 5 6.8 9.3 6.8h89.1c1.1 0 2.2-.2 3.2-.5a9.7 9.7 0 006-12.4L573.6 118.6a9.9 9.9 0 00-9.2-6.6H462.1c-4.2 0-7.9 2.6-9.2 6.6L244.5 723.1c-.4 1-.5 2.1-.5 3.2-.1 5.3 4.3 9.7 9.7 9.7zm255.9-516.1h4.1l83.8 263.8H424.9l84.7-263.8z"></path>
        </svg>
      )
    }
    if (type === 'sketch') {
      return (
        <svg width={22} height={22} viewBox="64 64 896 896" focusable="false" fill={calcIconFill()} aria-hidden="true">
          <path d="M766.4 744.3c43.7 0 79.4-36.2 79.4-80.5 0-53.5-79.4-140.8-79.4-140.8S687 610.3 687 663.8c0 44.3 35.7 80.5 79.4 80.5zm-377.1-44.1c7.1 7.1 18.6 7.1 25.6 0l256.1-256c7.1-7.1 7.1-18.6 0-25.6l-256-256c-.6-.6-1.3-1.2-2-1.7l-78.2-78.2a9.11 9.11 0 00-12.8 0l-48 48a9.11 9.11 0 000 12.8l67.2 67.2-207.8 207.9c-7.1 7.1-7.1 18.6 0 25.6l255.9 256zm12.9-448.6l178.9 178.9H223.4l178.8-178.9zM904 816H120c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-80c0-4.4-3.6-8-8-8z"></path>
        </svg>
      )
    }
    return (
      <div style={{ width: 24, height: 24, background: calcBackgroundColor(), borderRadius: 4 }} />
    )
  }

  useEffect(() => {
    if (object) {
      const colors = object[effectKey];
      if (object.type === 'f-text' && effectKey === 'fill' && colors instanceof fabric.Pattern) {
        setValue({ type: 'solid', color: '#000000' });
      } else {
        // @ts-ignore
        setValue(transformFill2Colors(colors));
      }
    }
  }, [object]);

  return (
    <>
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
          <div style={{ borderRadius: 4, border: calcTriggerBorder(), lineHeight: 0  }}>
          {renderTrigger()}
          </div>
        </div>
      </Popover>

      <svg style={{ width:0, height: 0, position: 'absolute' }} aria-hidden="true" focusable="false">
        <linearGradient id="colorsetter-icon-gradient" x2="1" y2="1">
          {
            value?.gradient?.colorStops.map(stop => (
              <stop offset={`${stop.offset * 100}%`} stop-color={stop.color} />
            ))
          }
        </linearGradient>
      </svg>
    </>
  )
}