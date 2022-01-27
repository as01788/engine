"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Shadows = exports.PCFType = exports.ShadowType = exports.ShadowSize = void 0;

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

var _material = require("../../assets/material.js");

var _index = require("../../geometry/index.js");

var _index2 = require("../../math/index.js");

var _globalExports = require("../../global-exports.js");

var _index3 = require("../../value-types/index.js");

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

/**
 * @zh 阴影贴图分辨率。
 * @en The shadow map size.
 * @static
 * @enum Shadows.ShadowSize
 */
const ShadowSize = (0, _index3.Enum)({
  /**
   * @zh 分辨率 256 * 256。
   * @en shadow resolution 256 * 256.
   * @readonly
   */
  Low_256x256: 256,

  /**
   * @zh 分辨率 512 * 512。
   * @en shadow resolution 512 * 512.
   * @readonly
   */
  Medium_512x512: 512,

  /**
   * @zh 分辨率 1024 * 1024。
   * @en shadow resolution 1024 * 1024.
   * @readonly
   */
  High_1024x1024: 1024,

  /**
   * @zh 分辨率 2048 * 2048。
   * @en shadow resolution 2048 * 2048.
   * @readonly
   */
  Ultra_2048x2048: 2048
});
/**
 * @zh 阴影类型。
 * @en The shadow type
 * @enum Shadows.ShadowType
 */

exports.ShadowSize = ShadowSize;
const ShadowType = (0, _index3.Enum)({
  /**
   * @zh 平面阴影。
   * @en Planar shadow
   * @property Planar
   * @readonly
   */
  Planar: 0,

  /**
   * @zh 阴影贴图。
   * @en Shadow type
   * @property ShadowMap
   * @readonly
   */
  ShadowMap: 1
});
/**
 * @zh pcf阴影等级。
 * @en The pcf type
 * @static
 * @enum Shadows.PCFType
 */

exports.ShadowType = ShadowType;
const PCFType = (0, _index3.Enum)({
  /**
   * @zh x1 次采样
   * @en x1 times
   * @readonly
   */
  HARD: 0,

  /**
   * @zh 软阴影
   * @en soft shadow
   * @readonly
   */
  SOFT: 1,

  /**
   * @zh 软阴影
   * @en soft shadow
   * @readonly
   */
  SOFT_2X: 2
});
exports.PCFType = PCFType;
const SHADOW_TYPE_NONE = ShadowType.ShadowMap + 1;

class Shadows {
  /**
   * @en MAX_FAR. This is shadow camera max far.
   * @zh 阴影相机的最远视距。
   */

  /**
   * @en EXPANSION_RATIO. This is shadow boundingBox Coefficient of expansion.
   * @zh 阴影包围盒扩大系数。
   */

  /**
   * @en Whether activate planar shadow.
   * @zh 是否启用平面阴影？
   */
  get enabled() {
    return this._enabled;
  }

  set enabled(val) {
    this._setEnable(val);

    this.activate();
  }
  /**
   * @en The normal of the plane which receives shadow.
   * @zh 阴影接收平面的法线。
   */


  get normal() {
    return this._normal;
  }

  set normal(val) {
    _index2.Vec3.copy(this._normal, val);

    if (_internal253Aconstants.JSB) {
      this._nativeObj.normal = this._normal;
    }
  }
  /**
   * @en The distance from coordinate origin to the receiving plane.
   * @zh 阴影接收平面与原点的距离。
   */


  get distance() {
    return this._distance;
  }

  set distance(val) {
    this._distance = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.distance = val;
    }
  }
  /**
   * @en Shadow color.
   * @zh 阴影颜色。
   */


  get shadowColor() {
    return this._shadowColor;
  }

  set shadowColor(color) {
    this._shadowColor = color;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.color = color;
    }
  }
  /**
   * @en get or set shadow invisible Occlusion Range.
   * @zh 控制潜在遮挡体产生的范围。
   */


  get invisibleOcclusionRange() {
    return this._invisibleOcclusionRange;
  }

  set invisibleOcclusionRange(val) {
    this._invisibleOcclusionRange = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.invisibleOcclusionRange = val;
    }
  }
  /**
   * @en get or set shadow distance.
   * @zh 控制阴影的可视范围。
   */


  get shadowDistance() {
    return this._shadowDistance;
  }

  set shadowDistance(val) {
    this._shadowDistance = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.shadowDistance = val;
    }
  }
  /**
   * @en Shadow type.
   * @zh 阴影类型。
   */


  get type() {
    return this._type;
  }

  set type(val) {
    this._setType(val);

    this.activate();
  }
  /**
   * @en get or set shadow camera near.
   * @zh 获取或者设置阴影相机近裁剪面。
   */


  get near() {
    return this._near;
  }

  set near(val) {
    this._near = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.nearValue = val;
    }
  }
  /**
   * @en get or set shadow camera far.
   * @zh 获取或者设置阴影相机远裁剪面。
   */


  get far() {
    return this._far;
  }

  set far(val) {
    this._far = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.farValue = val;
    }
  }
  /**
   * @en get or set shadow camera orthoSize.
   * @zh 获取或者设置阴影相机正交大小。
   */


  get orthoSize() {
    return this._orthoSize;
  }

  set orthoSize(val) {
    this._orthoSize = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.orthoSize = val;
    }
  }
  /**
   * @en get or set shadow camera orthoSize.
   * @zh 获取或者设置阴影纹理大小。
   */


  get size() {
    return this._size;
  }

  set size(val) {
    this._size.set(val);

    if (_internal253Aconstants.JSB) {
      this._nativeObj.size = val;
    }
  }
  /**
   * @en get or set shadow pcf.
   * @zh 获取或者设置阴影pcf等级。
   */


  get pcf() {
    return this._pcf;
  }

  set pcf(val) {
    this._pcf = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.pcfType = val;
    }
  }
  /**
   * @en shadow Map size has been modified.
   * @zh 阴影贴图大小是否被修改。
   */


  get shadowMapDirty() {
    return this._shadowMapDirty;
  }

  set shadowMapDirty(val) {
    this._shadowMapDirty = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.shadowMapDirty = val;
    }
  }
  /**
   * @en get or set shadow bias.
   * @zh 获取或者设置阴影偏移量。
   */


  get bias() {
    return this._bias;
  }

  set bias(val) {
    this._bias = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.bias = val;
    }
  }
  /**
   * @en get or set normal bias.
   * @zh 设置或者获取法线偏移。
   */


  get normalBias() {
    return this._normalBias;
  }

  set normalBias(val) {
    this._normalBias = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.normalBias = val;
    }
  }
  /**
   * @en get or set shadow saturation.
   * @zh 设置或者获取阴影饱和度。
   */


  get saturation() {
    return this._saturation;
  }

  set saturation(val) {
    this._saturation = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.saturation = val;
    }
  }
  /**
   * @en get or set fixed area shadow
   * @zh 是否是固定区域阴影
   */


  get fixedArea() {
    return this._fixedArea;
  }

  set fixedArea(val) {
    this._fixedArea = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.fixedArea = val;
    }
  }

  get matLight() {
    return this._matLight;
  }

  get material() {
    return this._material;
  }

  get instancingMaterial() {
    return this._instancingMaterial;
  }
  /**
   * @en The bounding sphere of the shadow map.
   * @zh 用于计算固定区域阴影 Shadow map 的场景包围球.
   */


  get native() {
    return this._nativeObj;
  }

  constructor() {
    this.fixedSphere = new _index.Sphere(0.0, 0.0, 0.0, 0.01);
    this.maxReceived = 4;
    this.firstSetCSM = false;
    this.shadowCameraFar = 0;
    this.matShadowView = new _index2.Mat4();
    this.matShadowProj = new _index2.Mat4();
    this.matShadowViewProj = new _index2.Mat4();
    this._normal = new _index2.Vec3(0, 1, 0);
    this._shadowColor = new _index2.Color(0, 0, 0, 76);
    this._matLight = new _index2.Mat4();
    this._material = null;
    this._instancingMaterial = null;
    this._size = new _index2.Vec2(512, 512);
    this._enabled = false;
    this._distance = 0;
    this._type = SHADOW_TYPE_NONE;
    this._near = 0.1;
    this._far = 10;
    this._invisibleOcclusionRange = 200;
    this._shadowDistance = 100;
    this._orthoSize = 1;
    this._pcf = 0;
    this._shadowMapDirty = false;
    this._bias = 0;
    this._normalBias = 0;
    this._fixedArea = false;
    this._saturation = 0.75;

    if (_internal253Aconstants.JSB) {
      this._nativeObj = new _nativeScene.NativeShadow();
    }
  }

  getPlanarShader(patches) {
    if (!this._material) {
      this._material = new _material.Material();

      this._material.initialize({
        effectName: 'planar-shadow'
      });

      if (_internal253Aconstants.JSB) {
        this._nativeObj.planarPass = this._material.passes[0].native;
      }
    }

    return this._material.passes[0].getShaderVariant(patches);
  }

  getPlanarInstanceShader(patches) {
    if (!this._instancingMaterial) {
      this._instancingMaterial = new _material.Material();

      this._instancingMaterial.initialize({
        effectName: 'planar-shadow',
        defines: {
          USE_INSTANCING: true
        }
      });

      if (_internal253Aconstants.JSB) {
        this._nativeObj.instancePass = this._instancingMaterial.passes[0].native;
      }
    }

    return this._instancingMaterial.passes[0].getShaderVariant(patches);
  }

  _setEnable(val) {
    this._enabled = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.enabled = val;
      if (!val) this._setType(SHADOW_TYPE_NONE);
    }
  }

  _setType(val) {
    this._type = this.enabled ? val : SHADOW_TYPE_NONE;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.shadowType = this._type;
    }
  }

  initialize(shadowsInfo) {
    this.near = shadowsInfo.near;
    this.far = shadowsInfo.far;
    this.invisibleOcclusionRange = shadowsInfo.invisibleOcclusionRange;
    this.shadowDistance = shadowsInfo.shadowDistance;
    this.orthoSize = shadowsInfo.orthoSize;
    this.size = shadowsInfo.size;
    this.pcf = shadowsInfo.pcf;
    this.normal = shadowsInfo.normal;
    this.distance = shadowsInfo.distance;
    this.shadowColor = shadowsInfo.shadowColor;
    this.bias = shadowsInfo.bias;
    this.normalBias = shadowsInfo.normalBias;
    this.maxReceived = shadowsInfo.maxReceived;
    this.fixedArea = shadowsInfo.fixedArea;

    this._setEnable(shadowsInfo.enabled);

    this._setType(shadowsInfo.type);

    this.saturation = shadowsInfo.saturation;
  }

  activate() {
    if (this.enabled) {
      if (this.type === ShadowType.ShadowMap) {
        this._updatePipeline();
      } else {
        this._updatePlanarInfo();
      }
    } else {
      const root = _globalExports.legacyCC.director.root;
      const pipeline = root.pipeline;
      pipeline.macros.CC_ENABLE_DIR_SHADOW = 0;
      root.onGlobalPipelineStateChanged();
    }
  }

  _updatePlanarInfo() {
    if (!this._material) {
      this._material = new _material.Material();

      this._material.initialize({
        effectName: 'planar-shadow'
      });

      if (_internal253Aconstants.JSB) {
        this._nativeObj.planarPass = this._material.passes[0].native;
      }
    }

    if (!this._instancingMaterial) {
      this._instancingMaterial = new _material.Material();

      this._instancingMaterial.initialize({
        effectName: 'planar-shadow',
        defines: {
          USE_INSTANCING: true
        }
      });

      if (_internal253Aconstants.JSB) {
        this._nativeObj.instancePass = this._instancingMaterial.passes[0].native;
      }
    }

    const root = _globalExports.legacyCC.director.root;
    const pipeline = root.pipeline;
    pipeline.macros.CC_ENABLE_DIR_SHADOW = 0;
    root.onGlobalPipelineStateChanged();
  }

  _updatePipeline() {
    const root = _globalExports.legacyCC.director.root;
    const pipeline = root.pipeline;
    pipeline.macros.CC_ENABLE_DIR_SHADOW = 1;
    root.onGlobalPipelineStateChanged();
  }

  _destroy() {
    if (_internal253Aconstants.JSB) {
      this._nativeObj = null;
    }
  }

  destroy() {
    this._destroy();

    if (this._material) {
      this._material.destroy();
    }

    if (this._instancingMaterial) {
      this._instancingMaterial.destroy();
    }

    this.fixedSphere.destroy();
  }

}

exports.Shadows = Shadows;
Shadows.MAX_FAR = 2000.0;
Shadows.COEFFICIENT_OF_EXPANSION = 2.0 * Math.sqrt(3.0);
_globalExports.legacyCC.Shadows = Shadows;