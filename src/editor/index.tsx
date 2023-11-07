import { fabric } from 'fabric';
import { calcCanvasZoomLevel } from '@/utils/helper';

export default class Editor {
  public canvas: fabric.Canvas;
  private _options;
  private _template;
  public sketch: fabric.Rect;

  constructor (options) {
    const { template, ...rest } = options;
    this._options = rest;
    this._template = template;
    this.init();
  }

  public init() {
    this._initFabric();
    this._initSketch();
    this._initEvents();
  }

  private _initFabric () {
    const { canvasEl, workspaceEl } = this._options;
    this.canvas = new fabric.Canvas(canvasEl, {
      containerClass: 'fabritor-canvas',
      enableRetinaScaling: true,
      fireRightClick: true,
      stopContextMenu: true,
      controlsAboveOverlay: true,
      width: workspaceEl.offsetWidth,
      height: workspaceEl.offsetHeight,
      backgroundColor: '#ddd'
    });
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
      id: 'fabritor-sketch'
    });
    this.canvas.add(sketch);
    this.canvas.requestRenderAll();
    this.sketch = sketch;

    this._adjustSketch2Canvas();
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
  }

  public destroy () {
    if (this.canvas) {
      this.canvas.dispose();
      // @ts-ignore
      this.canvas = null;
    }
  }
}