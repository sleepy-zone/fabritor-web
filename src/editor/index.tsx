import { fabric } from 'fabric';
import { message } from 'antd';
import { calcCanvasZoomLevel, handleFLinePointsWhenMoving } from '@/utils/helper';
import initControl, { handleMouseOutCorner, handleMouseOverCorner } from './controller';
import { initObjectPrototype } from './objects/init';
import { throttle } from 'lodash-es';
import { loadFont } from '@/utils';
import { initAligningGuidelines, initCenteringGuidelines } from './guide-lines';
import initHotKey from './extensions/hotkey';
import { SKETCH_ID, FABRITOR_CUSTOM_PROPS, SCHEMA_VERSION, SCHEMA_VERSION_KEY } from '@/utils/constants';
import FabricHistory from './extensions/history';
import AutoSave from './extensions/autosave';
import { createGroup } from './objects/group';
import createCustomClass from './custom-objects';
import { HOVER_OBJECT_CORNER, HOVER_OBJECT_CONTROL, CAPTURE_SUBTARGET_WHEN_DBLCLICK, LOAD_JSON_IGNORE_LOAD_FONT } from '@/config';
import { translate } from '@/i18n/utils';
export default class Editor {
  public canvas: fabric.Canvas;
  private _options;
  private _template;
  public sketch: fabric.Rect;
  private _resizeObserver: ResizeObserver | null;
  private _pan;
  public fhistory;
  public autoSave;

  constructor (options) {
    const { template, ...rest } = options;
    this._options = rest;
    this._template = template;
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

    this.autoSave = new AutoSave(this);
    await this.autoSave.loadFromLocal();

    this.fhistory = new FabricHistory(this);
    initHotKey(this.canvas, this.fhistory);

    this.autoSave.init();
  }

  private _initObject () {
    initObjectPrototype();
    createCustomClass();
    initControl();
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
      preserveObjectStacking: true,
      imageSmoothingEnabled: false
    });
  }

  private _initGuidelines () {
    initAligningGuidelines(this.canvas);
    initCenteringGuidelines(this.canvas);
  }

  private _initSketch () {
    // default size: xiaohongshu
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
      fabritor_desc: translate('header.fabritor_desc'),
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
    this.canvas.on('mouse:down', (opt) => {
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

      if (HOVER_OBJECT_CORNER) {
        const corner = target?.__corner;
        if (corner) {
          handleMouseOverCorner(corner, opt.target);
        }
      }

      if (HOVER_OBJECT_CONTROL) {
        if (target && target.id !== SKETCH_ID && target !== this.canvas.getActiveObject()) {
          // @ts-ignore
          target._renderControls(this.canvas.contextTop, { hasControls: false });
        }
      }
    });
    this.canvas.on('mouse:out', (opt) => {
      const { target } = opt;
      if (HOVER_OBJECT_CORNER) {
        if (target && target.id !== SKETCH_ID) {
          handleMouseOutCorner(target);
          this.canvas.requestRenderAll();
        }
      }
    });
    this.canvas.on('mouse:up', (opt) => {
      // on mouse up we want to recalculate new interaction
      // for all objects, so we call setViewportTransform
      if (this._pan.enable) {
        // @ts-ignore
        this.canvas.setViewportTransform(this.canvas.viewportTransform);
        this._pan.isDragging = false;
      }
    });
    this.canvas.on('mouse:wheel', this._scrollSketch.bind(this));

    this.canvas.on('mouse:dblclick', (opt) => {
      const { target, subTargets } = opt;
      const subTarget = subTargets?.[0];
      if (target?.type === 'group' && subTarget) {
        if (subTarget.type === 'f-text') {
          this._editTextInGroup(target, subTarget);
        } else {
          if (CAPTURE_SUBTARGET_WHEN_DBLCLICK) {
            subTarget.set('hasControls', false);
            this.canvas.discardActiveObject();
            this.canvas.setActiveObject(subTarget);
            this.canvas.requestRenderAll();
          }
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

      if (target.type === 'f-line' || target.type === 'f-arrow' || target.type === 'f-tri-arrow') {
        // fabric Line doesnot change points when moving
        // but change left/top when change points ....
        handleFLinePointsWhenMoving(opt);
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
        items,
        canvas: this.canvas
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

  public getIfPanEnable () {
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
    if (this.fhistory) {
      this.fhistory.dispose();
    }
    if (this.autoSave) {
      this.autoSave.dispose();
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

  public canvas2Json () {
    const json = this.canvas.toJSON(FABRITOR_CUSTOM_PROPS);
    json[SCHEMA_VERSION_KEY] = SCHEMA_VERSION;
    return json;
  }

  public async loadFromJSON (json, errorToast = false) {
    if (!json) return false;
    if (typeof json === 'string') {
      try {
        json = JSON.parse(json);
      } catch(e) {
        console.log(e)
        errorToast && message.error('加载本地模板失败，请重试');
        return false;
      }
    }
    if (json[SCHEMA_VERSION_KEY] !== SCHEMA_VERSION) {
      console.warn('此模板已经无法与当前版本兼容，请更换模板');
      return false;
    }

    if (LOAD_JSON_IGNORE_LOAD_FONT) {
      const { objects } = json;
      for (let item of objects) {
        if (item.type === 'f-text') {
          await loadFont(item.fontFamily);
        }
      }
    }

    const lastActiveObject = this.canvas.getActiveObject();
    let nowActiveObject;

    // disabled auto save when load json
    this.autoSave.setCanSave(false);

    return new Promise((resolve) => {
      this.canvas.loadFromJSON(json, () => {
        this.canvas.requestRenderAll();

        this.autoSave.setCanSave(true);
        this.canvas.fire('fabritor:load:json', { lastActiveObject: nowActiveObject });
        resolve(true);
      }, (o, obj) => {
        if (obj.id === SKETCH_ID) {
          this.sketch = obj;
          this.setSketchSize({ width: obj.width, height: obj.height });
        }
        // after undo/redo record last active object
        if (obj.id === lastActiveObject?.id) {
          nowActiveObject = obj;
        }
      });
    });
  }

  public async clearCanvas () {
    const { width, height, fabritor_desc } = this.sketch;
    const originalJson = `{"fabritor_schema_version":3,"version":"5.3.0","objects":[{"type":"rect","version":"5.3.0","originX":"left","originY":"top","left":0,"top":0,"width":${width},"height":${height},"fill":"#ffffff","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":true,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"stroke","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"rx":0,"ry":0,"id":"fabritor-sketch","fabritor_desc":"${fabritor_desc}","selectable":false,"hasControls":false}],"clipPath":{"type":"rect","version":"5.3.0","originX":"left","originY":"top","left":0,"top":0,"width":${width},"height":${height},"fill":"#ffffff","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":true,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"stroke","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"rx":0,"ry":0,"selectable":true,"hasControls":true},"background":"#ddd"}`;
    await this.loadFromJSON(originalJson);
    this.fhistory.reset();
  }
}