"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditorExtendableMixin = EditorExtendableMixin;
exports.EditorExtendable = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _index = require("./decorators/index.js");

var _js = require("../utils/js.js");

var _editorExtrasTag = require("./editor-extras-tag.js");

var _asserts = require("./utils/asserts.js");

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

// Functions and classes exposed from this module are useful to
// make a class to be `EditorExtendableObject`.
//
// These helpers are used internally, don't expose them to user.

/**
 * Creates a mixin class which inherits from specific base class and implements the `EditorExtendableObject` interface.
 * @param Base The base class.
 * @param className Assign an optional cc class name. If the base class is not cc class, this param is required.
 * @returns The mixin class.
 */
function EditorExtendableMixin(Base, className) {
  return editorExtendableInternal(Base);
}

class Empty {}
/**
 * Class which implements the `EditorExtendableObject` interface.
 */


const EditorExtendable = editorExtendableInternal();
exports.EditorExtendable = EditorExtendable;
// Note: Babel does not support decorators on computed property currently.
// So we have to use its literal value below.
(0, _asserts.assertIsTrue)(_editorExtrasTag.editorExtrasTag === '__editorExtras__', 'editorExtrasTag needs to be updated.'); // eslint-disable-next-line @typescript-eslint/ban-types

function editorExtendableInternal(Base, className) {
  if (!_internal253Aconstants.EDITOR) {
    return Base !== null && Base !== void 0 ? Base : Empty;
  }

  let name;

  if (className) {
    name = className;
  } else if (!Base) {
    name = `cc.EditorExtendable`;
  } else {
    const baseName = _js.js.getClassName(Base);

    if (baseName) {
      name = `cc.EditorExtendable/${baseName}`;
    } else {
      throw new Error(`You should supply a class name to EditorExtendable when mixin with ${Base.name}.`);
    }
  }

  let EditorExtendable;

  if (Base) {
    var _dec, _class, _class2, _descriptor, _temp;

    let C = (_dec = (0, _index.ccclass)(name), _dec(_class = (_class2 = (_temp = class C extends Base {
      constructor(...args) {
        super(...args);

        _initializerDefineProperty(this, "__editorExtras__", _descriptor, this);
      }

    }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "__editorExtras__", [_index.editorOnly], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: null
    })), _class2)) || _class);
    EditorExtendable = C;
  } else {
    var _dec2, _class4, _class5, _descriptor2, _temp2;

    let C = (_dec2 = (0, _index.ccclass)(name), _dec2(_class4 = (_class5 = (_temp2 = class C {
      constructor() {
        _initializerDefineProperty(this, "__editorExtras__", _descriptor2, this);
      }

    }, _temp2), (_descriptor2 = _applyDecoratedDescriptor(_class5.prototype, "__editorExtras__", [_index.editorOnly], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: null
    })), _class5)) || _class4);
    EditorExtendable = C;
  }

  return EditorExtendable;
}