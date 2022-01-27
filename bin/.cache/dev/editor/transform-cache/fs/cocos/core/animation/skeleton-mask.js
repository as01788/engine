"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkeletonMask = void 0;

var _index = require("../data/decorators/index.js");

var _asset = require("../assets/asset.js");

var _dec, _class, _class2, _descriptor, _temp, _dec2, _class4, _class5, _descriptor2, _descriptor3, _temp2;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let SkeletonMask = (_dec = (0, _index.ccclass)('cc.SkeletonMask'), _dec(_class = (_class2 = (_temp = class SkeletonMask extends _asset.Asset {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_jointMasks", _descriptor, this);
  }

  get joints() {
    return this._jointMasks;
  }

  set joints(value) {
    this._jointMasks = Array.from(value, ({
      path,
      enabled
    }) => {
      const jointMask = new JointMask();
      jointMask.path = path;
      jointMask.enabled = enabled;
      return jointMask;
    });
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_jointMasks", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class2)) || _class);
exports.SkeletonMask = SkeletonMask;
let JointMask = (_dec2 = (0, _index.ccclass)('cc.JointMask'), _dec2(_class4 = (_class5 = (_temp2 = class JointMask {
  constructor() {
    _initializerDefineProperty(this, "path", _descriptor2, this);

    _initializerDefineProperty(this, "enabled", _descriptor3, this);
  }

}, _temp2), (_descriptor2 = _applyDecoratedDescriptor(_class5.prototype, "path", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "enabled", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class5)) || _class4);