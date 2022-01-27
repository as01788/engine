"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fog = exports.FogType = void 0;

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

var _index = require("../../value-types/index.js");

var _index2 = require("../../math/index.js");

var _globalExports = require("../../global-exports.js");

var _nativeScene = require("./native-scene.js");

var _pipelineFuncs = require("../../pipeline/pipeline-funcs.js");

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
const _v4 = new _index2.Vec4();
/**
 * @zh
 * 全局雾类型。
 * @en
 * The global fog type
 * @static
 * @enum FogInfo.FogType
 */


const FogType = (0, _index.Enum)({
  /**
   * @zh
   * 线性雾。
   * @en
   * Linear fog
   * @readonly
   */
  LINEAR: 0,

  /**
   * @zh
   * 指数雾。
   * @en
   * Exponential fog
   * @readonly
   */
  EXP: 1,

  /**
   * @zh
   * 指数平方雾。
   * @en
   * Exponential square fog
   * @readonly
   */
  EXP_SQUARED: 2,

  /**
   * @zh
   * 层叠雾。
   * @en
   * Layered fog
   * @readonly
   */
  LAYERED: 3
});
exports.FogType = FogType;
const FOG_TYPE_NONE = FogType.LAYERED + 1;

class Fog {
  /**
   * @zh 是否启用全局雾效
   * @en Enable global fog
   */
  set enabled(val) {
    this._setEnable(val);

    if (!val) {
      this._type = FOG_TYPE_NONE;

      this._updatePipeline();
    } else {
      this.activate();
    }
  }

  get enabled() {
    return this._enabled;
  }
  /**
   * @zh 是否启用精确雾效(像素雾)计算
   * @en Enable accurate fog (pixel fog)
   */


  set accurate(val) {
    this._setAccurate(val);

    this._updatePipeline();
  }

  get accurate() {
    return this._accurate;
  }
  /**
   * @zh 全局雾颜色
   * @en Global fog color
   */


  set fogColor(val) {
    this._fogColor.set(val);

    _v4.set(val.x, val.y, val.z, val.w);

    (0, _pipelineFuncs.SRGBToLinear)(this._colorArray, _v4);

    if (_internal253Aconstants.JSB) {
      this._nativeObj.color = this._fogColor;
    }
  }

  get fogColor() {
    return this._fogColor;
  }
  /**
   * @zh 当前雾化类型。
   * @en The current global fog type.
   * @returns {FogType}
   * Returns the current global fog type
   * - -1:Disable global Fog
   * - 0:Linear fog
   * - 1:Exponential fog
   * - 2:Exponential square fog
   * - 3:Layered fog
   */


  get type() {
    return this._type;
  }

  set type(val) {
    this._setType(val);

    if (this.enabled) this._updatePipeline();
  }
  /**
   * @zh 全局雾浓度
   * @en Global fog density
   */


  get fogDensity() {
    return this._fogDensity;
  }

  set fogDensity(val) {
    this._fogDensity = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.density = val;
    }
  }
  /**
   * @zh 雾效起始位置，只适用于线性雾
   * @en Global fog start position, only for linear fog
   */


  get fogStart() {
    return this._fogStart;
  }

  set fogStart(val) {
    this._fogStart = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.start = val;
    }
  }
  /**
   * @zh 雾效结束位置，只适用于线性雾
   * @en Global fog end position, only for linear fog
   */


  get fogEnd() {
    return this._fogEnd;
  }

  set fogEnd(val) {
    this._fogEnd = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.end = val;
    }
  }
  /**
   * @zh 雾效衰减
   * @en Global fog attenuation
   */


  get fogAtten() {
    return this._fogAtten;
  }

  set fogAtten(val) {
    this._fogAtten = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.atten = val;
    }
  }
  /**
   * @zh 雾效顶部范围，只适用于层级雾
   * @en Global fog top range, only for layered fog
   */


  get fogTop() {
    return this._fogTop;
  }

  set fogTop(val) {
    this._fogTop = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.top = val;
    }
  }
  /**
   * @zh 雾效范围，只适用于层级雾
   * @en Global fog range, only for layered fog
   */


  get fogRange() {
    return this._fogRange;
  }

  set fogRange(val) {
    this._fogRange = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.range = val;
    }
  }

  get colorArray() {
    return this._colorArray;
  }

  get native() {
    return this._nativeObj;
  }

  constructor() {
    this._fogColor = new _index2.Color('#C8C8C8');
    this._colorArray = new _index2.Vec4(0.2, 0.2, 0.2, 1.0);
    this._enabled = false;
    this._accurate = false;
    this._type = 0;
    this._fogDensity = 0.3;
    this._fogStart = 0.5;
    this._fogEnd = 300;
    this._fogAtten = 5;
    this._fogTop = 1.5;
    this._fogRange = 1.2;

    if (_internal253Aconstants.JSB) {
      this._nativeObj = new _nativeScene.NativeFog();
    }
  }

  _setType(val) {
    this._type = this.enabled ? val : FOG_TYPE_NONE;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.type = this._type;
    }
  }

  _setEnable(val) {
    this._enabled = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.enabled = val;
    }
  }

  _setAccurate(val) {
    this._accurate = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.accurate = val;
    }
  }

  initialize(fogInfo) {
    this.fogColor = fogInfo.fogColor;

    this._setEnable(fogInfo.enabled);

    this._setAccurate(fogInfo.accurate);

    this._setType(fogInfo.type);

    this.fogDensity = fogInfo.fogDensity;
    this.fogStart = fogInfo.fogStart;
    this.fogEnd = fogInfo.fogEnd;
    this.fogAtten = fogInfo.fogAtten;
    this.fogTop = fogInfo.fogTop;
    this.fogRange = fogInfo.fogRange;
  }

  activate() {
    this._updatePipeline();
  }

  _updatePipeline() {
    const root = _globalExports.legacyCC.director.root;
    const value = this.enabled ? this.type : FOG_TYPE_NONE;
    const accurateValue = this.accurate ? 1 : 0;
    const pipeline = root.pipeline;

    if (pipeline.macros.CC_USE_FOG === value && pipeline.macros.CC_USE_ACCURATE_FOG === accurateValue) {
      return;
    }

    pipeline.macros.CC_USE_FOG = value;
    pipeline.macros.CC_USE_ACCURATE_FOG = accurateValue;
    root.onGlobalPipelineStateChanged();
  }

  _destroy() {
    if (_internal253Aconstants.JSB) {
      this._nativeObj = null;
    }
  }

  destroy() {
    this._destroy();
  }

}

exports.Fog = Fog;
_globalExports.legacyCC.Fog = Fog;