"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorTemperatureToRGB = ColorTemperatureToRGB;
exports.Light = exports.nt2lm = exports.LightType = void 0;

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

var _index = require("../../math/index.js");

var _nodeEnum = require("../../scene-graph/node-enum.js");

var _nativeScene = require("./native-scene.js");

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
// Color temperature (in Kelvin) to RGB
function ColorTemperatureToRGB(rgb, kelvin) {
  if (kelvin < 1000.0) {
    kelvin = 1000.0;
  } else if (kelvin > 15000.0) {
    kelvin = 15000.0;
  } // Approximate Planckian locus in CIE 1960 UCS


  const kSqr = kelvin * kelvin;
  const u = (0.860117757 + 1.54118254e-4 * kelvin + 1.28641212e-7 * kSqr) / (1.0 + 8.42420235e-4 * kelvin + 7.08145163e-7 * kSqr);
  const v = (0.317398726 + 4.22806245e-5 * kelvin + 4.20481691e-8 * kSqr) / (1.0 - 2.89741816e-5 * kelvin + 1.61456053e-7 * kSqr);
  const d = 2.0 * u - 8.0 * v + 4.0;
  const x = 3.0 * u / d;
  const y = 2.0 * v / d;
  const z = 1.0 - x - y;
  const X = 1.0 / y * x;
  const Z = 1.0 / y * z; // XYZ to RGB with BT.709 primaries

  rgb.x = 3.2404542 * X + -1.5371385 + -0.4985314 * Z;
  rgb.y = -0.9692660 * X + 1.8760108 + 0.0415560 * Z;
  rgb.z = 0.0556434 * X + -0.2040259 + 1.0572252 * Z;
}

let LightType;
exports.LightType = LightType;

(function (LightType) {
  LightType[LightType["DIRECTIONAL"] = 0] = "DIRECTIONAL";
  LightType[LightType["SPHERE"] = 1] = "SPHERE";
  LightType[LightType["SPOT"] = 2] = "SPOT";
  LightType[LightType["UNKNOWN"] = 3] = "UNKNOWN";
})(LightType || (exports.LightType = LightType = {}));

const nt2lm = size => 4 * Math.PI * Math.PI * size * size;

exports.nt2lm = nt2lm;

class Light {
  constructor() {
    this._baked = false;
    this._color = new _index.Vec3(1, 1, 1);
    this._colorTemp = 6550.0;
    this._colorTempRGB = new _index.Vec3(1, 1, 1);
    this._scene = null;
    this._node = null;
    this._name = null;
    this._useColorTemperature = false;
    this._type = LightType.UNKNOWN;
  }

  _init() {
    if (_internal253Aconstants.JSB) {
      switch (this._type) {
        case LightType.DIRECTIONAL:
          this._nativeObj = new _nativeScene.NativeDirectionalLight();
          break;

        case LightType.SPHERE:
          this._nativeObj = new _nativeScene.NativeSphereLight();
          break;

        case LightType.SPOT:
          this._nativeObj = new _nativeScene.NativeSpotLight();
          break;

        default:
          break;
      }

      this._nativeObj.setType(this._type);
    }
  }

  _destroy() {
    if (_internal253Aconstants.JSB) {
      this._nativeObj = null;
    }
  }

  get baked() {
    return this._baked;
  }

  set baked(val) {
    this._baked = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.setBaked(val);
    }
  }

  set color(color) {
    this._color.set(color);

    if (_internal253Aconstants.JSB) {
      this._nativeObj.setColor(color);
    }
  }

  get color() {
    return this._color;
  }

  set useColorTemperature(enable) {
    this._useColorTemperature = enable;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.setUseColorTemperature(enable);
    }
  }

  get useColorTemperature() {
    return this._useColorTemperature;
  }

  set colorTemperature(val) {
    this._colorTemp = val;
    ColorTemperatureToRGB(this._colorTempRGB, this._colorTemp);

    if (_internal253Aconstants.JSB) {
      this._nativeObj.setColorTemperatureRGB(this._colorTempRGB);
    }
  }

  get colorTemperature() {
    return this._colorTemp;
  }

  get colorTemperatureRGB() {
    return this._colorTempRGB;
  }

  set node(n) {
    this._node = n;

    if (this._node) {
      this._node.hasChangedFlags |= _nodeEnum.TransformBit.ROTATION;

      if (_internal253Aconstants.JSB) {
        this._nativeObj.setNode(n ? n.native : null);
      }
    }
  }

  get node() {
    return this._node;
  }

  get type() {
    return this._type;
  }

  get name() {
    return this._name;
  }

  set name(n) {
    this._name = n;
  }

  get scene() {
    return this._scene;
  }

  get native() {
    return this._nativeObj;
  }

  initialize() {
    this._init();

    this.color = new _index.Vec3(1, 1, 1);
    this.colorTemperature = 6550.0;
  }

  attachToScene(scene) {
    this._scene = scene;
  }

  detachFromScene() {
    this._scene = null;
  }

  destroy() {
    this._name = null;
    this._node = null;

    this._destroy();
  }

  update() {}

}

exports.Light = Light;