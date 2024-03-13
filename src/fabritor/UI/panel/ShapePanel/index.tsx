import { Flex } from 'antd';
import Title from '@/fabritor/components/Title';
import LineTypeList from './line-type-list';
import ShapeTypeList from './shape-type-list';
import RoughTypeList from './rough-type-list';
import { drawArrowLine, drawLine, drawTriArrowLine } from '@/editor/objects/line';
import createRect from '@/editor/objects/rect';
import createShape from '@/editor/objects/shape';
import { useContext } from 'react';
import { GloablStateContext } from '@/context';
import { createPathFromSvg } from '@/editor/objects/path';

export default function ShapePanel () {
  const { editor, roughSvg } = useContext(GloablStateContext);

  const addLine = (item) => {
    const { type, options = {} } = item;
    const canvas = editor.canvas;
    switch (type) {
      case 'f-line':
        drawLine({ ...options, canvas });
        break;
      case 'f-arrow':
        drawArrowLine({ ...options, canvas });
        break;
      case 'f-tri-arrow':
        drawTriArrowLine({ ...options, canvas });
        break;
      default:
        break;
    }
  }

  const addShape = (item) => {
    const { key, elem, options } = item;
    const canvas = editor.canvas;
    switch(key) {
      case 'rect':
      case 'rect-r':
        createRect({ ...options, canvas });
        break;
      case 'star':
      case 'heart':
        createPathFromSvg({ svgString: elem, canvas, sub_type: key, strokeWidth: 20 });
        break;
      default:
        createShape(item.shape, { ...options, canvas });
        break;
    }
  }

  const addRough = (item) => {
    const { key, elem, options } = item;
    const canvas = editor.canvas;

    const r = roughSvg.rectangle(0, 0, 400, 400, {
      fill: '#F6C445',
      stroke: '#EC6A52',
      hachureGap: 16,
      fillWeight: 6,
      strokeWidth: 6
    });
    console.log(r)
    const svgString = `<svg fill="none" xmlns="http://www.w3.org/2000/svg">${r.innerHTML}</svg>`
    createPathFromSvg({ svgString, canvas, sub_type: key });
  }

  return (
    <div className="fabritor-panel-wrapper">
      <Title>线条</Title>
      <Flex gap={10} wrap="wrap" justify="space-around">
        {
          LineTypeList.map(item => (
            <div
              key={item.key}
              onClick={() => { addLine(item) }}
              className="fabritor-panel-shape-item"
            >
              <img src={`data:image/svg+xml,${encodeURIComponent(item.svg)}`} alt="" style={{ width: 48, height: 48 }} />
            </div>
          ))
        }
      </Flex>
      <Title>形状</Title>
      <Flex gap={10} wrap="wrap" justify="space-around">
        {
          ShapeTypeList.map(item => (
            <div
              key={item.key}
              onClick={() => { addShape(item) }}
              className="fabritor-panel-shape-item"
            >
              <img src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(item.elem)}`} style={{ width: 64, height: 64 }} />
            </div>
          ))
        }
      </Flex>
      <Title>手绘风格形状</Title>
      <Flex gap={10} wrap="wrap" justify="space-around">
        {
          RoughTypeList.map(item => (
            <div
              key={item.key}
              onClick={() => { addRough(item) }}
              className="fabritor-panel-shape-item"
            >
              {item.elem}
            </div>
          ))
        }
      </Flex>
    </div>
  )
}