import { Flex } from 'antd';
import Title from '@/fabritor/components/Title';
import LineTypeList from './line-type-list';
import ShapeTypeList from './shape-type-list';
import { drawLine } from '@/editor/line';
import createRect from '@/editor/rect';
import createShape from '@/editor/shape';

export default function ShapePanel () {
  const addLine = (item) => {
    drawLine(item.options || {});
  }

  const addShape = (item) => {
    switch(item.key) {
      case 'rect':
      case 'rect-r':
        createRect(item.options);
        break;
      default:
        createShape(item.shape, item.options);
        break;
    }
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
              <img src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(item.elem)}`} style={{ width: 56, height: 56 }} />
            </div>
          ))
        }
      </Flex>
    </div>
  )
}