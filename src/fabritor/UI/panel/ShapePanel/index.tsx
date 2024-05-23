import { Flex, Tag } from 'antd';
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
import Center from '@/fabritor/components/Center';
import { useTranslation } from '@/i18n/utils';

export default function ShapePanel () {
  const { editor, roughSvg } = useContext(GloablStateContext);
  const { t } = useTranslation();

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
    const { key, options } = item;
    const canvas = editor.canvas;
    let svg;
    switch (key) {
      case 'rough-line':
        svg = roughSvg.line(0, 0, 300, 0, options);
        break;
      case 'rough-rect':
        svg = roughSvg.rectangle(0, 0, 400, 400, options);
        break;
      case 'rough-circle':
        svg = roughSvg.circle(0, 0, 300, options);
        break;
      case 'rough-ellipse':
        svg = roughSvg.ellipse(0, 0, 300, 150, options);
        break;
      case 'rough-right-angle':
        svg = roughSvg.polygon([[0, 0], [0, 300], [300, 300]], options);
        break;
      case 'rough-diamond':
        svg = roughSvg.polygon([[0, 150], [150, 300], [300, 150], [150, 0]], options);
      default:
        break;
    }

    console.log(svg)
    const svgString = `<svg fill="none" xmlns="http://www.w3.org/2000/svg">${svg.innerHTML}</svg>`
    createPathFromSvg({ svgString, canvas, sub_type: 'rough' });
  }

  return (
    <div className="fabritor-panel-wrapper">
      <Title>{t('panel.material.line')}</Title>
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
      <Title>{t('panel.material.shape')}</Title>
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
      <Title>
        <div style={{ position: 'relative' }}>
          <span>{t('panel.material.hand_drawn')}</span>
          <Tag color='#f50' style={{ position: 'absolute', right: -48, top: -5, padding: '0 4px' }}>beta</Tag>
        </div>
      </Title>
      <Flex gap={10} wrap="wrap" justify="space-around">
        {
          RoughTypeList.map(item => (
            <div
              key={item.key}
              onClick={() => { addRough(item) }}
              className="fabritor-panel-shape-item"
            >
              <Center style={{ width: 64, height: 64 }}>
                <img src={item.elem} style={{ width: 64 }} />
              </Center>
            </div>
          ))
        }
      </Flex>
    </div>
  )
}