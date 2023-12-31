import { fabric } from 'fabric';
import { message } from 'antd';
import { calcCanvasZoomLevel } from '@/utils/helper';
import initControl, { handleMouseOutCorner, handleMouseOverCorner } from './controller';
import { initObjectPrototype } from './object';
import { throttle } from 'lodash-es';
import { loadFont } from '@/utils';
import { initAligningGuidelines, initCenteringGuidelines } from './guide-lines';
import initHotKey from './hotkey';
import { SKETCH_ID, FABRITOR_CUSTOM_PROPS, SCHEMA_VERSION, SCHEMA_VERSION_KEY } from '@/utils/constants';
import FabricHistory from './history';
import { createGroup } from './group';
import createCustomClass from './shapes';

export default class Editor {
  public canvas: fabric.Canvas;
  private _options;
  private _template;
  public sketch: fabric.Rect;
  private _resizeObserver: ResizeObserver | null;
  private _pan;
  public fhistory;
  public canSaveLocal: boolean;

  constructor (options) {
    const { template, ...rest } = options;
    this._options = rest;
    this._template = template;
    this.canSaveLocal = false;
    this._pan = {
      enable: false,
      isDragging: false,
      lastPosX: 0,
      lastPosY: 0
    }
  }

  public async init() {
    this._initObject();
    this._initCanvas();
    this._initEvents();
    this._initSketch();
    this._initGuidelines();
    this.fhistory = new FabricHistory(this);
    initHotKey(this.canvas, this.fhistory);

    await this._loadLocal();
    this.canSaveLocal = true;
    this._save2Local();
  }

  private _initObject () {
    createCustomClass();
    initControl();
    initObjectPrototype();
  }

  private _initCanvas () {
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
    this.canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoomLevel - 0.04);

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
    this.canvas.on('mouse:down', (opt) => {
      if (!this._pan.enable) {
        sketchEventHandler?.clickHandler?.(opt);
      }
      const evt = opt.e;
      if (this._pan.enable) {
        this._pan = {
          enable: true,
          isDragging: true,
          lastPosX: evt.clientX,
          lastPosY: evt.clientY
        }
      }
    });
    this.canvas.on('mouse:move', (opt) => {
      if (this._pan.enable && this._pan.isDragging) {
        const { e } = opt;
        const vpt = this.canvas.viewportTransform;
        // @ts-ignore
        vpt[4] += e.clientX - this._pan.lastPosX;
        // @ts-ignore
        vpt[5] += e.clientY - this._pan.lastPosY;
        this.canvas.requestRenderAll();
        this._pan.lastPosX = e.clientX;
        this._pan.lastPosY = e.clientY;
      }
    });
    this.canvas.on('mouse:over', (opt) => {
      const { target } = opt;
      if (this._pan.enable) return;

      const corner = target?.__corner;
      if (corner) {
        handleMouseOverCorner(corner, opt.target);
      }

      if (!target || target.id === SKETCH_ID) return;
      if (target === this.canvas.getActiveObject()) return;

      // @ts-ignore
      target._renderControls(this.canvas.contextTop, { hasControls: false });
    });
    this.canvas.on('mouse:out', (opt) => {
      const { target } = opt;
      // @ts-ignore
      if (!target || target.id === SKETCH_ID) return;
      handleMouseOutCorner(target);
      this.canvas.requestRenderAll();
    });
    this.canvas.on('mouse:up', (opt) => {
      sketchEventHandler?.mouseupHandler?.(opt);
      // on mouse up we want to recalculate new interaction
      // for all objects, so we call setViewportTransform
      if (this._pan.enable) {
        // @ts-ignore
        this.canvas.setViewportTransform(this.canvas.viewportTransform);
        this._pan.isDragging = false;
      }
    });
    this.canvas.on('mouse:wheel', this._scrollSketch.bind(this));

    this.canvas.on('object:rotating', sketchEventHandler?.rotateHandler);

    this.canvas.on('selection:created', (opt) => { sketchEventHandler?.selectionHandler(opt); });
    this.canvas.on('selection:updated', (opt) => { sketchEventHandler?.selectionHandler(opt); });
    this.canvas.on('selection:cleared', (opt) => { sketchEventHandler?.selectionHandler(opt); });

    this.canvas.on('fabritor:clone', sketchEventHandler?.cloneHandler);
    this.canvas.on('fabritor:del', sketchEventHandler?.delHandler);
    this.canvas.on('fabritor:group', sketchEventHandler?.groupHandler);
    this.canvas.on('fabritor:ungroup', sketchEventHandler?.groupHandler);

    this.canvas.on('mouse:dblclick', (opt) => {
      const { target, subTargets } = opt;
      const subTarget = subTargets?.[0];
      if (target?.type === 'group' && subTarget) {
        if (subTarget.type === 'f-text') {
          this._editTextInGroup(target, subTarget);
        } else {
          subTarget.set('hasControls', false);
          this.canvas.discardActiveObject();
          this.canvas.setActiveObject(subTarget);
          this.canvas.requestRenderAll();
          sketchEventHandler?.dblObjectHandler?.(subTarget, opt);
        }
      }
    });

    this.canvas.on('object:modified', (opt) => {
      const { target } = opt;
      if (!target || target.id === SKETCH_ID) return;
      const scaledWidth = target.getScaledWidth();
      const scaledHeight = target.getScaledHeight();
      if (target.type !== 'f-line' && target.type !== 'f-image') {
        if (target.type !== 'f-text') {
          target.setControlVisible('mt', scaledWidth >= 100);
          target.setControlVisible('mb', scaledWidth >= 100);
        }
        target.setControlVisible('ml', scaledHeight >= 40);
        target.setControlVisible('mr', scaledHeight >= 40);
        this.canvas.requestRenderAll();
      }
    });
  }

  private _editTextInGroup (group, textbox) {
    let items = group.getObjects();

    textbox.on('editing:exited', () => {
      for (let i = 0; i < items.length; i++) {
        this.canvas.remove(items[i]);
      }
      const grp = createGroup({
        items
      });
      this.canvas.renderAll();
      this.canvas.setActiveObject(grp);
      this.canvas.fire('fabritor:group', { target: this.canvas.getActiveObject() });

      textbox.off('editing:exited');
    });

    group._restoreObjectsState();
    this.canvas.remove(group);
    this.canvas.renderAll();
    for (let i = 0; i < items.length; i++) {
      items[i].selectable = false;
      items[i].set('hasControls', false);
      this.canvas.add(items[i]);
    }
    this.canvas.renderAll();

    this.canvas.setActiveObject(textbox);
    textbox.enterEditing();
    textbox.selectAll();
  }

  public switchEnablePan () {
    this._pan.enable = !this._pan.enable;
    this.canvas.discardActiveObject();
    this.canvas.hoverCursor = this._pan.enable ? 'grab' : 'move';
    this.canvas.getObjects().forEach((obj) => {
      if (obj.id !== SKETCH_ID) {
        obj.set('selectable', !this._pan.enable);
      }
    });
    this.canvas.selection = !this._pan.enable;
    this.canvas.requestRenderAll();
    return this._pan.enable;
  }

  public fireCustomModifiedEvent (data: any = null) {
    this.canvas.fire('fabritor:object:modified', data);
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
    const json = this.canvas2Json();
    return `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(json, null, 2)
    )}`;
  }

  private async _loadLocal () {
    try {
      const jsonStr = localStorage.getItem('fabritor_web_json')
      if (jsonStr) {
        const json = JSON.parse(jsonStr);
        await this.loadFromJSON(json);
      }
    } catch(e) {  console.log(e) }
  }

  private _save2Local () {
    setInterval(() => {
      try {
        if (this.canSaveLocal) {
          const json = this.canvas2Json();
          localStorage.setItem('fabritor_web_json', JSON.stringify(json));
        }
      } catch(e) {  console.log(e) }
    }, 2000);
  }

  public canvas2Json () {
    const json = this.canvas.toJSON(FABRITOR_CUSTOM_PROPS);
    json[SCHEMA_VERSION_KEY] = SCHEMA_VERSION;
    return json;
  }

  public async loadFromJSON (json, addHistory = false) {
    if (!json) return;
    if (typeof json === 'string') {
      try {
        json = JSON.parse(json);
      } catch(e) {
        message.error('加载本地模板失败，请重试');
        return;
      }
    }
    if (json[SCHEMA_VERSION_KEY] !== SCHEMA_VERSION) {
      message.error(`此模板已经无法与当前版本兼容，请更换模板`);
      return;
    }
    const { objects } = json;
    for (let item of objects) {
      if (item.type === 'f-text') {
        await loadFont(item.fontFamily);
      }
    }
    this.fhistory.historyProcessing = true;
    return new Promise((resolve) => {
      this.canvas.loadFromJSON(json, () => {
        this.canvas.requestRenderAll();
        this.fhistory.historyProcessing = false;
        if (addHistory) {
          this.fhistory._historySaveAction();
        }
        resolve(true);
      }, (o, obj) => {
        if (obj.id === SKETCH_ID) {
          this.sketch = obj;
          this.setSketchSize({ width: obj.width, height: obj.height });
        }
      });
    });
  }

  public async clearCanvas () {
    const originalJson = '{"fabritor_schema_version":2,"version":"5.3.0","objects":[{"type":"rect","version":"5.3.0","originX":"left","originY":"top","left":0,"top":0,"width":1242,"height":1660,"fill":"#ffffff","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":true,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"stroke","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"rx":0,"ry":0,"id":"fabritor-sketch","fabritor_desc":"我的画板","selectable":false,"hasControls":false}],"clipPath":{"type":"rect","version":"5.3.0","originX":"left","originY":"top","left":0,"top":0,"width":1242,"height":1660,"fill":"#ffffff","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":true,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"stroke","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"rx":0,"ry":0,"selectable":true,"hasControls":true},"background":"#ddd"}';
    this.canvas.clear();
    await this.loadFromJSON(originalJson);
  }
}