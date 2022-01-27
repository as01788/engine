"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ambient = void 0;

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

var _index = require("../../math/index.js");

var _globalExports = require("../../global-exports.js");

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
class Ambient {
  /**
   * @en Enable ambient
   * @zh 是否开启环境光
   */
  set enabled(val) {
    this._enabled = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.enabled = val;
    }
  }

  get enabled() {
    return this._enabled;
  }
  /**
   * @en Sky color
   * @zh 天空颜色
   */


  get skyColor() {
    const isHDR = _globalExports.legacyCC.director.root.pipeline.pipelineSceneData.isHDR;

    if (isHDR) {
      return this._skyColorHDR;
    } else {
      return this._skyColorLDR;
    }
  }

  set skyColor(color) {
    const isHDR = _globalExports.legacyCC.director.root.pipeline.pipelineSceneData.isHDR;

    if (isHDR) {
      this._skyColorHDR.x = color.x;
      this._skyColorHDR.y = color.y;
      this._skyColorHDR.z = color.z;
    } else {
      this._skyColorLDR.x = color.x;
      this._skyColorLDR.y = color.y;
      this._skyColorLDR.z = color.z;
    }

    if (_internal253Aconstants.JSB) {
      this._nativeObj.skyColor = isHDR ? this._skyColorHDR : this._skyColorLDR;
    }
  }
  /**
   * @en Sky illuminance
   * @zh 天空亮度
   */


  get skyIllum() {
    const isHDR = _globalExports.legacyCC.director.root.pipeline.pipelineSceneData.isHDR;

    if (isHDR) {
      return this._skyIllumHDR;
    } else {
      return this._skyIllumLDR;
    }
  }

  set skyIllum(illum) {
    const isHDR = _globalExports.legacyCC.director.root.pipeline.pipelineSceneData.isHDR;

    if (isHDR) {
      this._skyIllumHDR = illum;
    } else {
      this._skyIllumLDR = illum;
    }

    if (_internal253Aconstants.JSB) {
      this._nativeObj.skyIllum = isHDR ? this._skyIllumHDR : this._skyIllumLDR;
    }
  }
  /**
   * @en Ground color
   * @zh 地面颜色
   */


  get groundAlbedo() {
    const isHDR = _globalExports.legacyCC.director.root.pipeline.pipelineSceneData.isHDR;

    if (isHDR) {
      return this._groundAlbedoHDR;
    } else {
      return this._groundAlbedoLDR;
    }
  }

  set groundAlbedo(color) {
    const isHDR = _globalExports.legacyCC.director.root.pipeline.pipelineSceneData.isHDR;

    if (isHDR) {
      this._groundAlbedoHDR.x = color.x;
      this._groundAlbedoHDR.y = color.y;
      this._groundAlbedoHDR.z = color.z;
    } else {
      this._groundAlbedoLDR.x = color.x;
      this._groundAlbedoLDR.y = color.y;
      this._groundAlbedoLDR.z = color.z;
    }

    if (_internal253Aconstants.JSB) {
      this._nativeObj.groundAlbedo = isHDR ? this._groundAlbedoHDR : this._groundAlbedoLDR;
    }
  }

  get native() {
    return this._nativeObj;
  }

  constructor() {
    this._groundAlbedoHDR = new _index.Vec4(0.2, 0.2, 0.2, 1.0);
    this._skyColorHDR = new _index.Vec4(0.2, 0.5, 0.8, 1.0);
    this._skyIllumHDR = 0;
    this._groundAlbedoLDR = new _index.Vec4(0.2, 0.2, 0.2, 1.0);
    this._skyColorLDR = new _index.Vec4(0.2, 0.5, 0.8, 1.0);
    this._skyIllumLDR = 0;
    this._enabled = false;

    if (_internal253Aconstants.JSB) {
      this._nativeObj = new _nativeScene.NativeAmbient();
    }
  }

  initialize(ambientInfo) {
    // Init HDR/LDR from serialized data on load
    this._skyColorHDR = ambientInfo.skyColorHDR;
    this._groundAlbedoHDR.x = ambientInfo.groundAlbedoHDR.x;
    this._groundAlbedoHDR.y = ambientInfo.groundAlbedoHDR.y;
    this._groundAlbedoHDR.z = ambientInfo.groundAlbedoHDR.z;
    this._skyIllumHDR = ambientInfo.skyIllumHDR;
    this._skyColorLDR = ambientInfo.skyColorLDR;
    this._groundAlbedoLDR.x = ambientInfo.groundAlbedoLDR.x;
    this._groundAlbedoLDR.y = ambientInfo.groundAlbedoLDR.y;
    this._groundAlbedoLDR.z = ambientInfo.groundAlbedoLDR.z;
    this._skyIllumLDR = ambientInfo.skyIllumLDR;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.skyIllum = this.skyIllum;
      this._nativeObj.skyColor = this.skyColor;
      this._nativeObj.groundAlbedo = this.groundAlbedo;
    }
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

exports.Ambient = Ambient;
Ambient.SUN_ILLUM = 65000.0;
Ambient.SKY_ILLUM = 20000.0;
_globalExports.legacyCC.Ambient = Ambient;