import { fabric } from 'fabric';
import { message } from 'antd';
import { calcCanvasZoomLevel } from '@/utils/helper';
import initControl, { handleMouseOverCorner } from './controller';
import { initObjectPrototype } from './object';
import { throttle } from 'lodash-es';
import { loadFont } from '@/utils';
import { initAligningGuidelines, initCenteringGuidelines } from './guide-lines';
import initHotKey from './hotkey';
import { SKETCH_ID } from '@/utils/constants';
import { drawObjectBox } from './rect';
import createArrowLineClass from './arrow';

export default class Editor {
  public canvas: fabric.Canvas;
  private _options;
  private _template;
  public sketch: fabric.Rect;
  private _resizeObserver: ResizeObserver | null;

  constructor (options) {
    const { template, ...rest } = options;
    this._options = rest;
    this._template = template;
    this.init();
  }

  public init() {
    this._initObject();
    this._initFabric();
    this._initEvents();
    this._initSketch();
    this._initGuidelines();
    initHotKey(this.canvas);
  }

  private _initObject () {
    initControl();
    initObjectPrototype();
    createArrowLineClass();
  }

  private _initFabric () {
    const { canvasEl, workspaceEl } = this._options;
    this.canvas = new fabric.Canvas(canvasEl, {
      selection: true,
      containerClass: 'fabritor-canvas',
      enableRetinaScaling: true,
      fireRightClick: true,
      controlsAboveOverlay: true,
      width: workspaceEl.offsetWidth,
      height: workspaceEl.offsetHeight,
      backgroundColor: '#ddd',
      preserveObjectStacking: true
    });
  }

  private _initGuidelines () {
    initAligningGuidelines(this.canvas);
    initCenteringGuidelines(this.canvas);
  }

  private _initSketch () {
    // 默认小红书尺寸
    const { width = 1242, height = 1660 } = this._template || {};
    const sketch = new fabric.Rect({
      fill: '#ffffff',
      left: 0,
      top: 0,
      width,
      height,
      selectable: false,
      hasControls: false,
      hoverCursor: 'default',
      // @ts-ignore custom id 
      id: SKETCH_ID,
      // @ts-ignore custom desc
      fabritor_desc: '我的画板',
    });
    this.canvas.add(sketch);
    this.canvas.requestRenderAll();
    this.sketch = sketch;

    this._initResizeObserver();

    this._adjustSketch2Canvas();
  }

  public setSketchSize (size) {
    this.sketch.set(size);
    this._adjustSketch2Canvas();
  }

  private _initResizeObserver () {
    const { workspaceEl } = this._options;
    this._resizeObserver = new ResizeObserver(
      throttle(() => {
        this.canvas.setWidth(workspaceEl.offsetWidth);
        this.canvas.setHeight(workspaceEl.offsetHeight);
        this._adjustSketch2Canvas();
      }, 50)
    );
    this._resizeObserver.observe(workspaceEl);
  }

  private _adjustSketch2Canvas () {
    const zoomLevel = calcCanvasZoomLevel(
      {
        width: this.canvas.width,
        height: this.canvas.height
      },
      {
        width: this.sketch.width,
        height: this.sketch.height
      }
    );

    const center = this.canvas.getCenter();
    this.canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoomLevel - 0.06);

    // sketch 移至画布中心
    const sketchCenter = this.sketch.getCenterPoint();
    const viewportTransform = this.canvas.viewportTransform;
    // @ts-ignore 平移
    viewportTransform[4] = this.canvas.width / 2 - sketchCenter.x * viewportTransform[0];
    // @ts-ignore 平移 
    viewportTransform[5] = this.canvas.height / 2 - sketchCenter.y * viewportTransform[3];
    // @ts-ignore
    this.canvas.setViewportTransform(viewportTransform);
    this.canvas.requestRenderAll();

    this.sketch.clone((cloned) => {
      this.canvas.clipPath = cloned;
      this.canvas.requestRenderAll();
    });
  }

  private _initEvents () {
    const { sketchEventHandler } = this._options;
    this.canvas.on('mouse:down', sketchEventHandler?.clickHandler);
    this.canvas.on('mouse:over', (opt) => {
      const { target } = opt;
      // @ts-ignore
      if (!target || target.id === SKETCH_ID) return;
      drawObjectBox(target);
      // @ts-ignore
      const corner = target?.__corner;
      if (corner) {
        handleMouseOverCorner(corner, opt.target);
      }
    });
    this.canvas.on('mouse:out', (opt) => {
      const { target } = opt;
      // @ts-ignore
      if (!target || target.id === SKETCH_ID) return;
      this.canvas.requestRenderAll();
    });
    this.canvas.on('mouse:up', sketchEventHandler?.mouseupHandler);
    this.canvas.on('mouse:wheel', this._scrollSketch.bind(this));

    this.canvas.on('object:rotating', sketchEventHandler?.rotateHandler);

    this.canvas.on('selection:created', (opt) => { sketchEventHandler?.selectionHandler(opt); });
    this.canvas.on('selection:updated', (opt) => { sketchEventHandler?.selectionHandler(opt); });
    this.canvas.on('selection:cleared', (opt) => { sketchEventHandler?.selectionHandler(opt); });

    this.canvas.on('fabritor:clone', sketchEventHandler?.cloneHandler);
    this.canvas.on('fabritor:del', sketchEventHandler?.delHandler);
    this.canvas.on('fabritor:group', sketchEventHandler?.groupHandler);
    this.canvas.on('fabritor:ungroup', sketchEventHandler?.groupHandler);
  }

  private _scrollSketch (opt) {
    const delta = opt.e.deltaY;
    let zoom = this.canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    const center = this.canvas.getCenter();
    this.canvas.zoomToPoint({ x: center.left, y: center.top }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
  }

  public destroy () {
    if (this.canvas) {
      this.canvas.dispose();
      // @ts-ignore
      this.canvas = null;
    }
    const { workspaceEl } = this._options;
    if (this._resizeObserver) {
      this._resizeObserver.unobserve(workspaceEl);
      this._resizeObserver = null;
    }
  }

  public export2Img (options) {
    const transform = this.canvas.viewportTransform;
    this.canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    const { left, top, width, height } = this.sketch;
    const dataURL = this.canvas.toDataURL({
      // multiplier: 2,
      left,
      top,
      width,
      height,
      format: 'png',
      ...options
    });
    // @ts-ignore
    this.canvas.setViewportTransform(transform);
    return dataURL;
  }

  public export2Svg () {
    const { left, top, width, height } = this.sketch;
    const svg = this.canvas.toSVG({
      width,
      height,
      viewBox: {
        x: left,
        y: top,
        width,
        height
      } as any
    });
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }

  public export2Json () {
    const json = this.canvas.toJSON(['id', 'fabritor_desc', 'selectable', 'hasControls']);
    return `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(json, null, 2)
    )}`;
  }

  public async loadFromJSON (json) {
    if (!json) return;
    if (typeof json === 'string') {
      try {
        json = JSON.parse(json);
      } catch(e) {
        message.error('加载本地模板失败，请重试');
        return;
      }
    }
    const { objects } = json;
    for (let item of objects) {
      if (item.type === 'textbox') {
        await loadFont(item.fontFamily);
      }
    }
    this.canvas.loadFromJSON(json, () => {
      this.canvas.requestRenderAll();
    }, (o, obj) => {
      if (obj.id === SKETCH_ID) {
        this.sketch = obj;
        this.setSketchSize({ width: obj.width, height: obj.height });
      }
    });
  }
}