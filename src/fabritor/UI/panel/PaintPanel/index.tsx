import { Tooltip, Flex, Form, Slider, Button } from 'antd';
import Title from '@/fabritor/components/Title';
import { getGlobalEditor } from '@/utils/global';
import { useEffect, useState } from 'react';
import { fabric } from 'fabric';
import { DRAW_MODE_CURSOR, DRAG_ICON } from '@/assets/icon';
import ColorSetter from '@/fabritor/components/ColorSetter/Solid';
import BrushList from './brush-list';

export default function PaintPanel () {
  const [penForm] = Form.useForm();
  const [shadowForm] = Form.useForm();
  const { Item: FormItem } = Form;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDrawingMode, setIsDrawingMode] = useState(true);
  const [isClearMode, setIsClearMode] = useState(false);

  const handleBrushChange = (options) => {
    const editor = getGlobalEditor();
    if (options.color) {
      editor.canvas.freeDrawingBrush.color = options.color;
      penForm.setFieldValue('color', options.color);
    }
    if (options.width) {
      editor.canvas.freeDrawingBrush.width = options.width;
      penForm.setFieldValue('width', options.width);
    }
    if (options.strokeLineCap) {
      editor.canvas.freeDrawingBrush.strokeLineCap = options.strokeLineCap;
    }
    if (options.shadow) {
      editor.canvas.freeDrawingBrush.shadow = new fabric.Shadow({
        blur: options.shadow.width,
        offsetX: options.shadow.offset,
        offsetY: options.shadow.offset,
        affectStroke: true,
        color: options.shadow.color,
      });
    }
  }

  const handlePenChange = (values) => {
    handleBrushChange(values);
  }

  const handleShadowChange = () => {
    handleBrushChange({
      shadow: shadowForm.getFieldsValue()
    });
  }

  const stopFreeDrawMode = () => {
    const editor = getGlobalEditor();
    editor.canvas.isDrawingMode = !editor.canvas.isDrawingMode;
    setIsDrawingMode(!isDrawingMode);
  }

  // const startClearMode = () => {
  //   const editor = getGlobalEditor();
  //   const { canvas } = editor;
  //   if (!isClearMode) {
  //     canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
  //     canvas.isDrawingMode = true;
  //   } else {
  //     new fabric.PencilBrush(editor.canvas);
  //   }
  //   setIsClearMode(!isClearMode);
  // }

  const initBrush = () => {
    const editor = getGlobalEditor();
    if (editor?.canvas) {
      editor.canvas.isDrawingMode = true;
      editor.canvas.freeDrawingCursor = `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(DRAW_MODE_CURSOR)}") 4 12, crosshair`;
      const freeDrawingBrush = new fabric.PencilBrush(editor.canvas);
      editor.canvas.freeDrawingBrush = freeDrawingBrush;
      const { color, width } = BrushList[0].options;
      freeDrawingBrush.color = color;
      freeDrawingBrush.width = width;

      penForm.setFieldsValue({
        color,
        width
      });
      shadowForm.setFieldsValue({
        color: '#000000',
        width: 0,
        offset: 0
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
      <Title>画笔类型</Title>
      <Flex wrap="wrap" justify="space-around">
        {
          BrushList.map((item , index) => (
            <Tooltip trigger="hover" title={item.title}>
              <div
                key={item.key}
                className="fabritor-panel-shape-item"
                onClick={() => { handleBrushChange(item.options); setActiveIndex(index); }}
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
      <Title>画笔设置</Title>
      <Form
        form={penForm}
        onValuesChange={handlePenChange}
      >
        <FormItem
          label="颜色"
          name="color"
        >
          <ColorSetter />
        </FormItem>
        <FormItem
          label="线宽"
          name="width"
        >
          <Slider min={1} max={100} />
        </FormItem>
      </Form>
      <Title>阴影设置</Title>
      <Form
        form={shadowForm}
        onValuesChange={handleShadowChange}
      >
        <FormItem
          label="颜色"
          name="color"
        >
          <ColorSetter />
        </FormItem>
        <FormItem
          label="宽度"
          name="width"
        >
          <Slider min={0} max={50} />
        </FormItem>
        <FormItem
          label="偏移"
          name="offset"
        >
          <Slider min={0} max={50} />
        </FormItem>
      </Form>
      <Title>操作</Title>
      <Flex wrap="wrap" justify="space-around">
        <Button style={{ width: 64 }} onClick={stopFreeDrawMode} type={isDrawingMode ? "default" : "primary"} title="停止绘图">
          <img src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(DRAG_ICON)}`} style={{ width: 22, height: 22 }} />
        </Button>
        {/* <Button icon={<ClearOutlined />} style={{ width: 64 }} onClick={startClearMode} type={!isClearMode ? "default" : "primary"}/> */}
      </Flex>
    </div>
  )
}