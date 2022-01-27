"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("../../core/data/decorators/index.js");

var _index2 = require("../../core/math/index.js");

var _particle = require("../particle.js");

var _curveRange = _interopRequireDefault(require("./curve-range.js"));

var _enum = require("../enum.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const ROTATION_OVERTIME_RAND_OFFSET = _enum.ModuleRandSeed.ROTATION;
let RotationOvertimeModule = (_dec = (0, _index.ccclass)('cc.RotationOvertimeModule'), _dec2 = (0, _index.displayOrder)(0), _dec3 = (0, _index.displayOrder)(1), _dec4 = (0, _index.tooltip)('i18n:rotationOvertimeModule.separateAxes'), _dec5 = (0, _index.type)(_curveRange.default), _dec6 = (0, _index.range)([-1, 1]), _dec7 = (0, _index.displayOrder)(2), _dec8 = (0, _index.tooltip)('i18n:rotationOvertimeModule.x'), _dec9 = (0, _index.type)(_curveRange.default), _dec10 = (0, _index.range)([-1, 1]), _dec11 = (0, _index.displayOrder)(3), _dec12 = (0, _index.tooltip)('i18n:rotationOvertimeModule.y'), _dec13 = (0, _index.type)(_curveRange.default), _dec14 = (0, _index.range)([-1, 1]), _dec15 = (0, _index.displayOrder)(4), _dec16 = (0, _index.tooltip)('i18n:rotationOvertimeModule.z'), _dec(_class = (_class2 = (_temp = class RotationOvertimeModule extends _particle.ParticleModuleBase {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_enable", _descriptor, this);

    _initializerDefineProperty(this, "_separateAxes", _descriptor2, this);

    _initializerDefineProperty(this, "x", _descriptor3, this);

    _initializerDefineProperty(this, "y", _descriptor4, this);

    _initializerDefineProperty(this, "z", _descriptor5, this);

    this.name = _particle.PARTICLE_MODULE_NAME.ROTATION;
    this._startMat = new _index2.Mat4();
    this._matRot = new _index2.Mat4();
    this._quatRot = new _index2.Quat();
    this._otherEuler = new _index2.Vec3();
  }

  /**
   * @zh 是否启用。
   */
  get enable() {
    return this._enable;
  }

  set enable(val) {
    if (this._enable === val) return;
    this._enable = val;
    if (!this.target) return;
    this.target.enableModule(this.name, val, this);
  }

  /**
   * @zh 是否三个轴分开设定旋转（暂不支持）。
   */
  get separateAxes() {
    return this._separateAxes;
  }

  set separateAxes(val) {
    this._separateAxes = val;
  }
  /**
   * @zh 绕 X 轴设定旋转。
   */


  _processRotation(p, r2d) {
    // Same as the particle-vs-legacy.chunk glsl statemants
    const renderMode = p.particleSystem.processor.getInfo().renderMode;

    if (renderMode !== _enum.RenderMode.Mesh) {
      if (renderMode === _enum.RenderMode.StrecthedBillboard) {
        this._quatRot.set(0, 0, 0, 1);
      }
    }

    _index2.Quat.normalize(this._quatRot, this._quatRot);

    if (this._quatRot.w < 0.0) {
      // Use vec3 to save quat so we need identify negative w
      this._quatRot.x += _particle.Particle.INDENTIFY_NEG_QUAT; // Indentify negative w & revert the quat in shader
    }
  }

  animate(p, dt) {
    const normalizedTime = 1 - p.remainingLifetime / p.startLifetime;
    const rotationRand = (0, _index2.pseudoRandom)(p.randomSeed + ROTATION_OVERTIME_RAND_OFFSET);
    const renderMode = p.particleSystem.processor.getInfo().renderMode;

    if (!this._separateAxes || renderMode === _enum.RenderMode.VerticalBillboard || renderMode === _enum.RenderMode.HorizontalBillboard) {
      _index2.Quat.fromEuler(p.deltaQuat, 0, 0, this.z.evaluate(normalizedTime, rotationRand) * dt * _particle.Particle.R2D);
    } else {
      _index2.Quat.fromEuler(p.deltaQuat, this.x.evaluate(normalizedTime, rotationRand) * dt * _particle.Particle.R2D, this.y.evaluate(normalizedTime, rotationRand) * dt * _particle.Particle.R2D, this.z.evaluate(normalizedTime, rotationRand) * dt * _particle.Particle.R2D);
    } // Rotation-overtime combine with start rotation, after that we get quat from the mat


    p.deltaMat = _index2.Mat4.fromQuat(p.deltaMat, p.deltaQuat);
    p.localMat = p.localMat.multiply(p.deltaMat); // accumulate rotation

    if (!p.startRotated) {
      if (renderMode !== _enum.RenderMode.Mesh) {
        if (renderMode === _enum.RenderMode.StrecthedBillboard) {
          p.startEuler.set(0, 0, 0);
        } else if (renderMode !== _enum.RenderMode.Billboard) {
          p.startEuler.set(0, 0, p.startEuler.z);
        }
      }

      _index2.Quat.fromEuler(p.startRotation, p.startEuler.x * _particle.Particle.R2D, p.startEuler.y * _particle.Particle.R2D, p.startEuler.z * _particle.Particle.R2D);

      p.startRotated = true;
    }

    this._startMat = _index2.Mat4.fromQuat(this._startMat, p.startRotation);
    this._matRot = this._startMat.multiply(p.localMat);

    _index2.Mat4.getRotation(this._quatRot, this._matRot);

    this._processRotation(p, _particle.Particle.R2D);

    p.rotation.set(this._quatRot.x, this._quatRot.y, this._quatRot.z);
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_enable", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "enable", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "enable"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_separateAxes", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "separateAxes", [_dec3, _dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "separateAxes"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "x", [_dec5, _index.serializable, _dec6, _index.radian, _dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _curveRange.default();
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "y", [_dec9, _index.serializable, _dec10, _index.radian, _dec11, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _curveRange.default();
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "z", [_dec13, _index.serializable, _dec14, _index.radian, _dec15, _dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _curveRange.default();
  }
})), _class2)) || _class);
exports.default = RotationOvertimeModule;