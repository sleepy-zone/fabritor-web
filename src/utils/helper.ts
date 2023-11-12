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

export const copyObjecy = async (canvas) => {
  // clone what are you copying since you
  // may want copy and paste on different moment.
  // and you do not want the changes happened
  // later to reflect on the copy.
  return new Promise((resolve) => {
    const object = canvas.getActiveObject();
    if (!object) return Promise.resolve(null);
    return object.clone((cloned) => {
      resolve(cloned);
    });
  });
}
export const pasteObject = (target, canvas) => {
  // clone again, so you can do multiple copies.
 target.clone((cloned) => {
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
  if (!target) return;
  canvas.remove(target);
  canvas.requestRenderAll();
  canvas.fire('fabritor:del', { target: null });
  return true;
}