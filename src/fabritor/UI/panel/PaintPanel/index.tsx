import { Tooltip, Flex, Button } from 'antd';
import Title from '@/fabritor/components/Title';
import { useContext, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import { DRAW_MODE_CURSOR, DRAG_ICON } from '@/assets/icon';
import BrushList from './brush-list';
import { GloablStateContext } from '@/context';
import PathSetterForm from '../../setter/PathSetter/PathSetterForm';
import { useTranslation } from '@/i18n/utils';

export default function PaintPanel () {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDrawingMode, setIsDrawingMode] = useState(true);
  const { editor } = useContext(GloablStateContext);
  const [penFormValues, setPenFormValues] = useState({});
  const { t } = useTranslation();

  const handleBrushChange = (options) => {
    if (options.color) {
      editor.canvas.freeDrawingBrush.color = options.color;
    }
    if (options.width) {
      editor.canvas.freeDrawingBrush.width = options.width;
    }
    if (options.strokeLineCap) {
      editor.canvas.freeDrawingBrush.strokeLineCap = options.strokeLineCap;
    }
    if (options.shadow) {
      const shadow = editor.canvas.freeDrawingBrush.shadow;
      const originalShadowObject = shadow ? shadow.toObject() : {};
      const newShadowObject = {
        blur: options.shadow.width || originalShadowObject.blur,
        offsetX: options.shadow.offset || originalShadowObject.offsetX,
        offsetY: options.shadow.offset || originalShadowObject.offsetY,
        affectStroke: true,
        color: options.shadow.color || originalShadowObject.color,
      }
      editor.canvas.freeDrawingBrush.shadow = new fabric.Shadow(newShadowObject);
    }
  }

  const stopFreeDrawMode = () => {
    editor.canvas.isDrawingMode = !editor.canvas.isDrawingMode;
    setIsDrawingMode(!isDrawingMode);
  }

  const initBrush = () => {
    if (editor) {
      editor.canvas.isDrawingMode = true;
      editor.canvas.freeDrawingCursor = `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(DRAW_MODE_CURSOR)}") 4 12, crosshair`;
      const freeDrawingBrush = new fabric.PencilBrush(editor.canvas);
      editor.canvas.freeDrawingBrush = freeDrawingBrush;
      const { color, width } = BrushList[0].options;
      freeDrawingBrush.color = color;
      freeDrawingBrush.width = width;
      freeDrawingBrush.shadow = new fabric.Shadow({
        blur: 0,
        offsetX: 0,
        offsetY: 0,
        affectStroke: true,
        color: '#000000',
      });

      setPenFormValues({
        color,
        width,
        shadow: {
          color: '#000000',
          width: 0,
          offset: 0
        }
      });
    }

    return () => {
      if (editor?.canvas) {
        editor.canvas.isDrawingMode = false;
      }
    }
  }

  useEffect(() => {
    return initBrush();
  }, []);

  return (
    <div className="fabritor-panel-wrapper">
      <Flex wrap="wrap" justify="space-around">
        {
          BrushList.map((item , index) => (
            <Tooltip trigger="hover" title={item.title}>
              <div
                key={item.key}
                className="fabritor-panel-shape-item"
                onClick={() => {
                  handleBrushChange(item.options);
                  setActiveIndex(index); 
                  setPenFormValues({
                    ...penFormValues,
                    ...item.options
                  });
                }}
                style={{ 
                  padding: '4px 8px',
                  backgroundColor: activeIndex === index ? '#eeeeee' : 'rgba(0,0,0,0)',
                  borderRadius: 8
                }}
              >
                <img src={`data:image/svg+xml,${encodeURIComponent(item.svg)}`} alt="" style={{ width: 56, height: 56 }} />
              </div>
            </Tooltip>
          ))
        }
      </Flex>
      <PathSetterForm
        onChange={handleBrushChange}
        value={penFormValues}
        showPenTip
      />
      <Title>{t('common.operate')}</Title>
      <Flex wrap="wrap" justify="space-around">
        <Button
          style={{ width: 64 }}
          onClick={stopFreeDrawMode}
          type={isDrawingMode ? 'default' : 'primary'} 
          title={isDrawingMode ? t('panel.paint.stop') : t('panel.paint.start')}
        >
          <img src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(DRAG_ICON)}`} style={{ width: 22, height: 22 }} />
        </Button>
      </Flex>
    </div>
  )
}