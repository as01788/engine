"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PointToPointConstraint = void 0;

var _index = require("../../../../core/data/decorators/index.js");

var _internal253Aconstants = require("../../../../../../virtual/internal%253Aconstants.js");

var _constraint = require("./constraint.js");

var _index2 = require("../../../../core/index.js");

var _physicsEnum = require("../../physics-enum.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

let PointToPointConstraint = (_dec = (0, _index.ccclass)('cc.PointToPointConstraint'), _dec2 = (0, _index.help)('i18n:cc.PointToPointConstraint'), _dec3 = (0, _index.menu)('Physics/PointToPointConstraint(beta)'), _dec4 = (0, _index.type)(_index2.Vec3), _dec5 = (0, _index.type)(_index2.Vec3), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = (_temp = class PointToPointConstraint extends _constraint.Constraint {
  /**
   * @en
   * The position of the own rigid body in local space with respect to the constraint axis.
   * @zh
   * 在本地空间中，自身刚体相对于约束关节的位置。
   */
  get pivotA() {
    return this._pivotA;
  }

  set pivotA(v) {
    _index2.Vec3.copy(this._pivotA, v);

    if (!_internal253Aconstants.EDITOR) {
      this.constraint.setPivotA(this._pivotA);
    }
  }
  /**
   * @en
   * The position of the connected rigid body in the local space with respect to the constraint axis.
   * @zh
   * 在本地空间中，连接刚体相对于约束关节的位置。
   */


  get pivotB() {
    return this._pivotB;
  }

  set pivotB(v) {
    _index2.Vec3.copy(this._pivotB, v);

    if (!_internal253Aconstants.EDITOR) {
      this.constraint.setPivotB(this._pivotB);
    }
  }

  get constraint() {
    return this._constraint;
  }

  constructor() {
    super(_physicsEnum.EConstraintType.POINT_TO_POINT);

    _initializerDefineProperty(this, "_pivotA", _descriptor, this);

    _initializerDefineProperty(this, "_pivotB", _descriptor2, this);
  }

}, _temp), (_applyDecoratedDescriptor(_class2.prototype, "pivotA", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "pivotA"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "pivotB", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "pivotB"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_pivotA", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Vec3();
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_pivotB", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Vec3();
  }
})), _class2)) || _class) || _class) || _class);
exports.PointToPointConstraint = PointToPointConstraint;