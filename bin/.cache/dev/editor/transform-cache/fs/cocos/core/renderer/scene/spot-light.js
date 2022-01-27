"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpotLight = void 0;

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

var _index = require("../../geometry/index.js");

var _globalExports = require("../../global-exports.js");

var _index2 = require("../../math/index.js");

var _light = require("./light.js");

/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */
const _forward = new _index2.Vec3(0, 0, -1);

const _qt = new _index2.Quat();

const _matView = new _index2.Mat4();

const _matProj = new _index2.Mat4();

const _matViewProj = new _index2.Mat4();

const _matViewProjInv = new _index2.Mat4();

class SpotLight extends _light.Light {
  /**
   * @en Cached uniform variables.
   * @zh 缓存下来的 uniform 变量。
   */

  /**
   * @en User-specified full-angle radians.
   * @zh 用户指定的全角弧度。
   */
  _init() {
    super._init();

    if (_internal253Aconstants.JSB) {
      const nativeSpotLight = this._nativeObj;
      nativeSpotLight.setAABB(this._aabb.native);
      nativeSpotLight.setFrustum(this._frustum);
      nativeSpotLight.setDirection(this._dir);
      nativeSpotLight.setPosition(this._pos);
    }
  }

  _destroy() {
    super._destroy();
  }

  _setDirection(dir) {
    this._dir.set(dir);

    if (_internal253Aconstants.JSB) {
      this._nativeObj.setDirection(dir);
    }
  }

  get position() {
    return this._pos;
  }

  set size(size) {
    this._size = size;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.setSize(size);
    }
  }

  get size() {
    return this._size;
  }

  set range(range) {
    this._range = range;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.setRange(range);
    }

    this._needUpdate = true;
  }

  get range() {
    return this._range;
  }

  get luminance() {
    const isHDR = _globalExports.legacyCC.director.root.pipeline.pipelineSceneData.isHDR;

    if (isHDR) {
      return this._luminanceHDR;
    } else {
      return this._luminanceLDR;
    }
  }

  set luminance(value) {
    const isHDR = _globalExports.legacyCC.director.root.pipeline.pipelineSceneData.isHDR;

    if (isHDR) {
      this.luminanceHDR = value;
    } else {
      this.luminanceLDR = value;
    }
  }

  get luminanceHDR() {
    return this._luminanceHDR;
  }

  set luminanceHDR(value) {
    this._luminanceHDR = value;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.setLuminanceHDR(value);
    }
  }

  get luminanceLDR() {
    return this._luminanceLDR;
  }

  set luminanceLDR(value) {
    this._luminanceLDR = value;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.setLuminanceLDR(value);
    }
  }

  get direction() {
    return this._dir;
  } // 获取 cache 下来的 cos(angle / 2) 属性值，uniform 里需要


  get spotAngle() {
    return this._spotAngle;
  } // 设置用户指定的全角弧度，同时计算 cache 下来的 cos(angle / 2) 属性值，uniform 里需要。


  set spotAngle(val) {
    this._angle = val;
    this._spotAngle = Math.cos(val * 0.5);

    if (_internal253Aconstants.JSB) {
      this._nativeObj.setAngle(this._spotAngle);
    }

    this._needUpdate = true;
  }

  get angle() {
    return this._angle;
  }

  set aspect(val) {
    this._aspect = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.setAspect(val);
    }

    this._needUpdate = true;
  }

  get aspect() {
    return this._aspect;
  }

  get aabb() {
    return this._aabb;
  }

  get frustum() {
    return this._frustum;
  }

  constructor() {
    super();
    this._dir = new _index2.Vec3(1.0, -1.0, -1.0);
    this._range = 5.0;
    this._spotAngle = Math.cos(Math.PI / 6);
    this._pos = void 0;
    this._aabb = void 0;
    this._frustum = void 0;
    this._angle = 0;
    this._needUpdate = false;
    this._size = 0.15;
    this._luminanceHDR = 0;
    this._luminanceLDR = 0;
    this._aspect = 0;
    this._aabb = _index.AABB.create();
    this._frustum = _index.Frustum.create();
    this._pos = new _index2.Vec3();
    this._type = _light.LightType.SPOT;
  }

  initialize() {
    super.initialize();
    const size = 0.15;
    this.size = size;
    this.aspect = 1.0;
    this.luminance = 1700 / (0, _light.nt2lm)(size);
    this.luminanceLDR = 1.0;
    this.range = Math.cos(Math.PI / 6);

    this._setDirection(new _index2.Vec3(1.0, -1.0, -1.0));
  }

  update() {
    if (this._node && (this._node.hasChangedFlags || this._needUpdate)) {
      this._node.getWorldPosition(this._pos);

      _index2.Vec3.transformQuat(this._dir, _forward, this._node.getWorldRotation(_qt));

      _index2.Vec3.normalize(this._dir, this._dir);

      _index.AABB.set(this._aabb, this._pos.x, this._pos.y, this._pos.z, this._range, this._range, this._range); // view matrix


      this._node.getWorldRT(_matView);

      _index2.Mat4.invert(_matView, _matView);

      _index2.Mat4.perspective(_matProj, this._angle, 1.0, 0.001, this._range); // view-projection


      _index2.Mat4.multiply(_matViewProj, _matProj, _matView); // Mat4.invert(_matViewProjInv, _matViewProj);


      this._frustum.update(_matViewProj, _matViewProjInv);

      this._needUpdate = false;
    }
  }

}

exports.SpotLight = SpotLight;