import { fabric } from 'fabric';
const clone = fabric.util.object.clone;

const additionalProps =
('fontFamily fontWeight fontSize text underline overline linethrough' +
' textAlign fontStyle lineHeight textBackgroundColor charSpacing styles' +
' direction path pathStartOffset pathSide pathAlign minWidth splitByGrapheme').split(' ');

export const createFTextClass = () => {
  // @ts-ignore custom f-text
  fabric.FText = fabric.util.createClass(fabric.Textbox, {
    type: 'f-text',

    padding: 4,

    paintFirst: 'stroke',

    initDimensions: function() {
      if (this.__skipDimension) {
        return;
      }
      this.isEditing && this.initDelayedCursor();
      this.clearContextTop();
      this._clearCache();
      // clear dynamicMinWidth as it will be different after we re-wrap line
      this.dynamicMinWidth = 0;
      // wrap lines
      this._styleMap = this._generateStyleMap(this._splitText());
      // if after wrapping, the width is smaller than dynamicMinWidth, change the width and re-wrap
      if (this.dynamicMinWidth > this.width) {
        this._set('width', this.dynamicMinWidth);
      }
      if (this.textAlign.indexOf('justify') !== -1) {
        // once text is measured we need to make space fatter to make justified text.
        this.enlargeSpaces();
      }
      // clear cache and re-calculate height
      const height = this.calcTextHeight();
      if (!this.path) {
        this.height = height;
      } else {
        this.height = this.path.height > height ? this.path.height : height;
      }
      this.saveState({ propertySet: '_dimensionAffectingProps' });
    },

    toObject: function(propertiesToInclude) {
      const allProperties = additionalProps.concat(propertiesToInclude);
      const obj = this.callSuper('toObject', allProperties);
      obj.styles = fabric.util.stylesToArray(this.styles, this.text);
      if (obj.path) {
        obj.path = this.path.toObject();
      }
      return obj;
    },
  });

  fabric.FText.fromObject = function(object, callback) {
    const objectCopy = clone(object), path = object.path;
    delete objectCopy.path;
    return fabric.Object._fromObject('FText', objectCopy, function(textInstance) {
      textInstance.styles = fabric.util.stylesFromArray(object.styles, object.text);
      if (path) {
        fabric.Object._fromObject('Path', path, function(pathInstance) {
          textInstance.set('path', pathInstance);
          callback(textInstance);
        }, 'path');
      }
      else {
        callback(textInstance);
      }
    }, 'text');
  };
}