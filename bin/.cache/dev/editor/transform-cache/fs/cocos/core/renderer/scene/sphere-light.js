"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SphereLight = void 0;

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
class SphereLight extends _light.Light {
  _init() {
    super._init();

    if (_internal253Aconstants.JSB) {
      this._nativeObj.setPosition(this._pos);

      this._nativeObj.setAABB(this._aabb.native);
    }
  }

  _destroy() {
    super._destroy();
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

  set luminanceLDR(value) {
    this._luminanceLDR = value;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.setLuminanceLDR(value);
    }
  }

  get aabb() {
    return this._aabb;
  }

  constructor() {
    super();
    this._needUpdate = false;
    this._size = 0.15;
    this._range = 1.0;
    this._luminanceHDR = 0;
    this._luminanceLDR = 0;
    this._pos = void 0;
    this._aabb = void 0;
    this._aabb = _index.AABB.create();
    this._pos = new _index2.Vec3();
    this._type = _light.LightType.SPHERE;
  }

  initialize() {
    super.initialize();
    const size = 0.15;
    this.size = size;
    this.range = 1.0;
    this.luminance = 1700 / (0, _light.nt2lm)(size);
    this.luminanceLDR = 1.0;
  }

  update() {
    if (this._node && (this._node.hasChangedFlags || this._needUpdate)) {
      this._node.getWorldPosition(this._pos);

      const range = this._range;

      _index.AABB.set(this._aabb, this._pos.x, this._pos.y, this._pos.z, range, range, range);

      this._needUpdate = false;
    }
  }

}

exports.SphereLight = SphereLight;