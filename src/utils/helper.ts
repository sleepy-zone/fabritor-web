import { fabric } from 'fabric';
import { FABRITOR_CUSTOM_PROPS } from './constants';
import { createTextbox } from '@/editor/objects/textbox';
import { getSystemClipboard } from './index';
import { createFImage } from '@/editor/objects/image';
import { handleMouseOutCorner } from '@/editor/controller';

// @ts-ignore fabric controlsUtils
const controlsUtils = fabric.controlsUtils;

export const calcCanvasZoomLevel = (
  containerSize,
  sketchSize
) => {
  if (sketchSize.width < containerSize.width && sketchSize.height <= containerSize.height) {
    return 1;
  }

  let level = 1;
  if (containerSize.width / containerSize.height < sketchSize.width / sketchSize.height) {
    level = containerSize.width / sketchSize.width;
  } else {
    level = containerSize.height / sketchSize.height;
  }

  level = Number(level.toFixed(2));
  return level;
}

let _clipboard;

export const copyObject = async (canvas, target) => {
  // clone what are you copying since you
  // may want copy and paste on different moment.
  // and you do not want the changes happened
  // later to reflect on the copy.
  return new Promise((resolve) => {
    if (!target) {
      target = canvas.getActiveObject();
    }
    if (!target) return Promise.resolve(false);

    // 清空系统剪贴板
    navigator.clipboard.writeText('');
    return target.clone(cloned => {
      _clipboard = cloned;
      return resolve(true);
    }, FABRITOR_CUSTOM_PROPS);
  });
}

export const pasteObject = async (canvas) => {
  // 先尝试读取系统剪贴板
  try {
    const { type, result } = await getSystemClipboard() || {};
    if (result) {
      if (type === 'text') {
        createTextbox({ text: result, canvas });
      } else if (type === 'image') {
        createFImage({ imageSource: result, canvas })
      }
      return;
    }
  } catch (err) {
    console.error('Failed to read clipboard contents: ', err);
  }

  // clone again, so you can do multiple copies.
  _clipboard.clone((cloned) => {
    canvas.discardActiveObject();
    cloned.set({
      left: cloned.left + 50,
      top: cloned.top + 50,
      evented: true,
    });

    if(cloned.type === 'f-line' || cloned.type === 'f-arrow' || cloned.type === 'f-tri-arrow') {
      handleFLinePointsWhenMoving({ target: cloned, transform: { original: { left: cloned.left - 50, top: cloned.top - 50 } } })
    }

    if (cloned.type === 'activeSelection') {
      // active selection needs a reference to the canvas.
      cloned.canvas = canvas;
      cloned.forEachObject((obj) => {
        canvas.add(obj);
      });
      // this should solve the unselectability
      cloned.setCoords();
    } else {
      canvas.add(cloned);
    }

    canvas.setActiveObject(cloned);
    canvas.requestRenderAll();
    canvas.fire('fabritor:clone', { target: cloned });
  }, FABRITOR_CUSTOM_PROPS);
}

export const removeObject = (target, canvas) => {
  if (!target) {
    target = canvas.getActiveObject();
  }
  if (!target) return;
  if (target.type === 'activeSelection') {
    target.getObjects().forEach((obj) => {
      canvas.remove(obj);
    });
    canvas.discardActiveObject();
  } else {
    canvas.remove(target);
  }
  handleMouseOutCorner(target);
  canvas.requestRenderAll();
  canvas.fire('fabritor:del', { target: null });
  return true;
}

export const groupSelection = (canvas, target) => {
  if (!target) {
    target = canvas.getActiveObject();
  }
  if (!target || target.type !== 'activeSelection') {
    return;
  }

  canvas.getActiveObjects().forEach((o) => {
    if (o.type === 'f-image') {
      o.img.clipPath= null;
    }
  });

  target.toGroup();
  canvas.requestRenderAll();
  canvas.fire('fabritor:group');
}

export const ungroup = (canvas, target) => {
  if (!target) {
    target = canvas.getActiveObject();
  }
  if (!target || target.type !== 'group') {
    return;
  }
  target.getObjects().forEach((obj) => {
    obj.set({
      lockMovementX: false,
      lockMovementY: false,
      hasControls: true,
      selectable: true
    });
  });
  target.toActiveSelection();
  canvas.requestRenderAll();
  canvas.fire('fabritor:ungroup');
}

export const changeLayerLevel = (level, editor, target) => {
  if (!target) {
    target = editor.canvas.getActiveObject();
  }
  if (!target || target.type === 'activeSelection') {
    return;
  }
  switch (level) {
    case 'layer-up':
      target.bringForward();
      break;
    case 'layer-top':
      target.bringToFront();
      break;
    case 'layer-down':
      target.sendBackwards();
      break;
    case 'layer-bottom':
      target.sendToBack();
      break;
    default:
      break;
  }
  editor.sketch.sendToBack();
  editor.canvas.requestRenderAll();
  editor.fireCustomModifiedEvent();
}

/**
   * Transforms a point described by x and y in a distance from the top left corner of the object
   * bounding box.
   * @param {Object} transform
   * @param {String} originX
   * @param {String} originY
   * @param {number} x
   * @param {number} y
   * @return {Fabric.Point} the normalized point
   */
export const getLocalPoint = (transform, originX, originY, x, y) => {
  var target = transform.target,
      control = target.controls[transform.corner],
      zoom = target.canvas.getZoom(),
      padding = target.padding / zoom,
      localPoint = target.toLocalPoint(new fabric.Point(x, y), originX, originY);
  if (localPoint.x >= padding) {
    localPoint.x -= padding;
  }
  if (localPoint.x <= -padding) {
    localPoint.x += padding;
  }
  if (localPoint.y >= padding) {
    localPoint.y -= padding;
  }
  if (localPoint.y <= padding) {
    localPoint.y += padding;
  }
  localPoint.x -= control.offsetX;
  localPoint.y -= control.offsetY;
  return localPoint;
}

function isTransformCentered(transform) {
  return transform.originX === 'center' && transform.originY === 'center';
}

const _changeHeight = (eventData, transform, x, y) => {
  const target = transform.target, localPoint = getLocalPoint(transform, transform.originX, transform.originY, x, y),
      strokePadding = target.strokeWidth / (target.strokeUniform ? target.scaleX : 1),
      multiplier = isTransformCentered(transform) ? 2 : 1,
      oldHeight = target.height,
      newHeight = Math.abs(localPoint.y * multiplier / target.scaleY) - strokePadding;
  target.set('height', Math.max(newHeight, 0));
  return oldHeight !== newHeight;
}

export const changeHeight = controlsUtils.wrapWithFireEvent('resizing', controlsUtils.wrapWithFixedAnchor(_changeHeight));

export const handleFLinePointsWhenMoving = (opt) => {
  const { target, transform, action } = opt;
  if (action === 'line-points-change') return;
  const {  original } = transform;
  const deltaLeft = target.left - original.left;
  const deltaTop = target.top - original.top;
  target.set({
    x1: target.x1 + deltaLeft,
    y1: target.y1 + deltaTop,
    x2: target.x2 + deltaLeft,
    y2: target.y2 + deltaTop
  });
}