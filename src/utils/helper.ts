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
    return target.clone(cloned => {
      _clipboard = cloned;
      return resolve(true);
    });
  });
}
export const pasteObject = (canvas) => {
  // clone again, so you can do multiple copies.
  if (!_clipboard) return;
  _clipboard.clone((cloned) => {
    canvas.discardActiveObject();
    cloned.set({
      left: cloned.left + 50,
      top: cloned.top + 50,
      evented: true,
    });
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
    // target.top += 50;
    // target.left += 50;
    canvas.setActiveObject(cloned);
    canvas.requestRenderAll();
      canvas.fire('fabritor:clone', { target: cloned });
  });
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
  canvas.requestRenderAll();
  canvas.fire('fabritor:del', { target: null });
  return true;
}

export const groupSelection = (canvas) => {
  const target = canvas.getActiveObject();
  if (!target || target.type !== 'activeSelection') {
    return;
  }
  target.toGroup();
  canvas.requestRenderAll();
}

export const ungroup = (canvas) => {
  const target = canvas.getActiveObject();
  if (!target || target.type !== 'group') {
    return;
  }
  target.toActiveSelection();
  canvas.requestRenderAll();
}

export const changeLayerLevel = (level, editor) => {
  const target = editor.canvas.getActiveObject();
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
}