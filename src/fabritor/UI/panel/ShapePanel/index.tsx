import { useContext } from 'react';
import { Flex } from 'antd';
import Title from '@/fabritor/components/Title';
import LineTypeList from './line-type-list';
import ShapeTypeList from './shape-type-list';
import { drawLine } from '@/editor/line';
import { GloablStateContext } from '@/context';
import createRect from '@/editor/rect';
import { drawArrowLine } from '@/editor/arrow';

export default function ShapePanel () {
  const { setActiveObject } = useContext(GloablStateContext);

  const addLine = async (item) => {
    let line;
    if (item.key.startsWith('arrow')) {
      line = await drawArrowLine({ svg: item.svg, ...item.options });
    } else {
      line = drawLine(item.options || {});
    }
    setActiveObject(line);
  }

  const addShape = (item) => {
    let shape;
    switch(item.key) {
      case 'rect':
        shape = createRect({});
        break;
      case 'rect-r':
        shape = createRect({ rx: 20, ry: 20 });
        break;
      default:
        break;
    }
    setActiveObject(shape);
  }

  return (
    <div className="fabritor-panel-text-wrapper">
      <Title>线条</Title>
      <Flex gap={10} wrap="wrap">
        {
          LineTypeList.map(item => (
            <div
              key={item.key}
              onClick={() => { addLine(item) }}
              className="fabritor-panel-shape-item"
            >
              <img src={`data:image/svg+xml,${encodeURIComponent(item.svg)}`} alt="" style={{ width: 56, height: 56 }} />
            </div>
          ))
        }
      </Flex>
      <Title>形状</Title>
      <Flex gap={10} wrap="wrap">
        {
          ShapeTypeList.map(item => (
            <div
              key={item.key}
              onClick={() => { addShape(item) }}
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