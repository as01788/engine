"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneGlobals = exports.OctreeInfo = exports.DEFAULT_OCTREE_DEPTH = exports.DEFAULT_WORLD_MAX_POS = exports.DEFAULT_WORLD_MIN_POS = exports.ShadowsInfo = exports.FogInfo = exports.SkyboxInfo = exports.AmbientInfo = void 0;

var _index = require("../data/decorators/index.js");

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _textureCube = require("../assets/texture-cube.js");

var _attribute = require("../data/utils/attribute.js");

var _index2 = require("../math/index.js");

var _ambient = require("../renderer/scene/ambient.js");

var _shadows = require("../renderer/scene/shadows.js");

var _fog = require("../renderer/scene/fog.js");

var _globalExports = require("../global-exports.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _class4, _class5, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _temp2, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _dec58, _dec59, _dec60, _dec61, _dec62, _dec63, _dec64, _dec65, _dec66, _class7, _class8, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _class9, _temp3, _dec67, _dec68, _dec69, _dec70, _dec71, _dec72, _dec73, _dec74, _dec75, _dec76, _dec77, _dec78, _dec79, _dec80, _dec81, _dec82, _dec83, _dec84, _dec85, _dec86, _dec87, _dec88, _dec89, _dec90, _dec91, _dec92, _dec93, _dec94, _dec95, _dec96, _dec97, _dec98, _dec99, _dec100, _dec101, _dec102, _dec103, _dec104, _dec105, _dec106, _dec107, _dec108, _dec109, _dec110, _dec111, _dec112, _dec113, _dec114, _class10, _class11, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _descriptor29, _descriptor30, _descriptor31, _descriptor32, _descriptor33, _descriptor34, _descriptor35, _descriptor36, _descriptor37, _descriptor38, _descriptor39, _descriptor40, _descriptor41, _descriptor42, _temp4, _dec115, _dec116, _dec117, _dec118, _dec119, _dec120, _dec121, _dec122, _dec123, _dec124, _class13, _class14, _descriptor43, _descriptor44, _descriptor45, _descriptor46, _temp5, _dec125, _dec126, _class16, _class17, _descriptor47, _descriptor48, _descriptor49, _descriptor50, _descriptor51, _temp6;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const _up = new _index2.Vec3(0, 1, 0);

const _v3 = new _index2.Vec3();

const _v4 = new _index2.Vec4();

const _col = new _index2.Color();

const _qt = new _index2.Quat(); // Normalize HDR color


const normalizeHDRColor = color => {
  const intensity = 1.0 / Math.max(Math.max(Math.max(color.x, color.y), color.z), 0.0001);

  if (intensity < 1.0) {
    color.x *= intensity;
    color.y *= intensity;
    color.z *= intensity;
  }
};
/**
 * @en Environment lighting information in the Scene
 * @zh 场景的环境光照相关信息
 */


let AmbientInfo = (_dec = (0, _index.ccclass)('cc.AmbientInfo'), _dec2 = (0, _index.help)('i18n:cc.Ambient'), _dec3 = (0, _index.formerlySerializedAs)('_skyColor'), _dec4 = (0, _index.formerlySerializedAs)('_skyIllum'), _dec5 = (0, _index.formerlySerializedAs)('_groundAlbedo'), _dec6 = (0, _index.visible)(() => {
  const scene = _globalExports.legacyCC.director.getScene();

  const skybox = scene.globals.skybox;

  if (skybox.useIBL && skybox.applyDiffuseMap) {
    return false;
  } else {
    return true;
  }
}), _dec7 = (0, _index.tooltip)('i18n:ambient.skyLightingColor'), _dec8 = (0, _index.type)(_attribute.CCFloat), _dec9 = (0, _index.tooltip)('i18n:ambient.skyIllum'), _dec10 = (0, _index.visible)(() => {
  const scene = _globalExports.legacyCC.director.getScene();

  const skybox = scene.globals.skybox;

  if (skybox.useIBL && skybox.applyDiffuseMap) {
    return false;
  } else {
    return true;
  }
}), _dec11 = (0, _index.tooltip)('i18n:ambient.groundLightingColor'), _dec(_class = _dec2(_class = (_class2 = (_temp = class AmbientInfo {
  constructor() {
    _initializerDefineProperty(this, "_skyColorHDR", _descriptor, this);

    _initializerDefineProperty(this, "_skyIllumHDR", _descriptor2, this);

    _initializerDefineProperty(this, "_groundAlbedoHDR", _descriptor3, this);

    _initializerDefineProperty(this, "_skyColorLDR", _descriptor4, this);

    _initializerDefineProperty(this, "_skyIllumLDR", _descriptor5, this);

    _initializerDefineProperty(this, "_groundAlbedoLDR", _descriptor6, this);

    this._resource = null;
  }

  get skyColorHDR() {
    return this._skyColorHDR;
  }

  get groundAlbedoHDR() {
    return this._groundAlbedoHDR;
  }

  get skyIllumHDR() {
    return this._skyIllumHDR;
  }

  get skyColorLDR() {
    return this._skyColorLDR;
  }

  get groundAlbedoLDR() {
    return this._groundAlbedoLDR;
  }

  get skyIllumLDR() {
    return this._skyIllumLDR;
  }
  /**
   * @en Sky lighting color configurable in editor with color picker
   * @zh 编辑器中可配置的天空光照颜色（通过颜色拾取器）
   */


  set skyLightingColor(val) {
    _v4.set(val.x, val.y, val.z, val.w);

    if (_globalExports.legacyCC.director.root.pipeline.pipelineSceneData.isHDR) {
      this._skyColorHDR.set(_v4);
    } else {
      this._skyColorLDR.set(_v4);
    }

    if (this._resource) {
      this._resource.skyColor.set(_v4);
    }
  }

  get skyLightingColor() {
    const isHDR = _globalExports.legacyCC.director.root.pipeline.pipelineSceneData.isHDR;

    _v4.set(isHDR ? this._skyColorHDR : this._skyColorLDR);

    normalizeHDRColor(_v4);
    return _col.set(_v4.x * 255, _v4.y * 255, _v4.z * 255, 255);
  }

  set skyColor(val) {
    if (_globalExports.legacyCC.director.root.pipeline.pipelineSceneData.isHDR) {
      this._skyColorHDR.set(val);
    } else {
      this._skyColorLDR.set(val);
    }

    if (this._resource) {
      this._resource.skyColor.set(val);
    }
  }
  /**
   * @en Sky illuminance
   * @zh 天空亮度
   */


  set skyIllum(val) {
    if (_globalExports.legacyCC.director.root.pipeline.pipelineSceneData.isHDR) {
      this._skyIllumHDR = val;
    } else {
      this._skyIllumLDR = val;
    }

    if (this._resource) {
      this._resource.skyIllum = val;
    }
  }

  get skyIllum() {
    if (_globalExports.legacyCC.director.root.pipeline.pipelineSceneData.isHDR) {
      return this._skyIllumHDR;
    } else {
      return this._skyIllumLDR;
    }
  }
  /**
   * @en Ground lighting color configurable in editor with color picker
   * @zh 编辑器中可配置的地面光照颜色（通过颜色拾取器）
   */


  set groundLightingColor(val) {
    _v4.set(val.x, val.y, val.z, val.w);

    if (_globalExports.legacyCC.director.root.pipeline.pipelineSceneData.isHDR) {
      this._groundAlbedoHDR.set(_v4);
    } else {
      this._groundAlbedoLDR.set(_v4);
    }

    if (this._resource) {
      this._resource.groundAlbedo.set(_v4);
    }
  }

  get groundLightingColor() {
    const isHDR = _globalExports.legacyCC.director.root.pipeline.pipelineSceneData.isHDR;

    _v4.set(isHDR ? this._groundAlbedoHDR : this._groundAlbedoLDR);

    normalizeHDRColor(_v4);
    return _col.set(_v4.x * 255, _v4.y * 255, _v4.z * 255, 255);
  }

  set groundAlbedo(val) {
    if (_globalExports.legacyCC.director.root.pipeline.pipelineSceneData.isHDR) {
      this._groundAlbedoHDR.set(val);
    } else {
      this._groundAlbedoLDR.set(val);
    }

    if (this._resource) {
      this._resource.groundAlbedo.set(val);
    }
  }

  activate(resource) {
    this._resource = resource;

    this._resource.initialize(this);
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_skyColorHDR", [_index.serializable, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Vec4(0.2, 0.5, 0.8, 1.0);
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_skyIllumHDR", [_index.serializable, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _ambient.Ambient.SKY_ILLUM;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_groundAlbedoHDR", [_index.serializable, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Vec4(0.2, 0.2, 0.2, 1.0);
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_skyColorLDR", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Vec4(0.2, 0.5, 0.8, 1.0);
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_skyIllumLDR", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _ambient.Ambient.SKY_ILLUM;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_groundAlbedoLDR", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Vec4(0.2, 0.2, 0.2, 1.0);
  }
}), _applyDecoratedDescriptor(_class2.prototype, "skyLightingColor", [_dec6, _index.editable, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "skyLightingColor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "skyIllum", [_index.editable, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "skyIllum"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "groundLightingColor", [_dec10, _index.editable, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "groundLightingColor"), _class2.prototype)), _class2)) || _class) || _class);
exports.AmbientInfo = AmbientInfo;
_globalExports.legacyCC.AmbientInfo = AmbientInfo;
/**
 * @en Skybox related information
 * @zh 天空盒相关信息
 */

let SkyboxInfo = (_dec12 = (0, _index.ccclass)('cc.SkyboxInfo'), _dec13 = (0, _index.help)('i18n:cc.Skybox'), _dec14 = (0, _index.type)(_textureCube.TextureCube), _dec15 = (0, _index.formerlySerializedAs)('_envmap'), _dec16 = (0, _index.type)(_textureCube.TextureCube), _dec17 = (0, _index.type)(_textureCube.TextureCube), _dec18 = (0, _index.type)(_textureCube.TextureCube), _dec19 = (0, _index.visible)(function () {
  if (this.useIBL) {
    return true;
  }

  return false;
}), _dec20 = (0, _index.tooltip)('i18n:skybox.applyDiffuseMap'), _dec21 = (0, _index.tooltip)('i18n:skybox.enabled'), _dec22 = (0, _index.tooltip)('i18n:skybox.useIBL'), _dec23 = (0, _index.tooltip)('i18n:skybox.useHDR'), _dec24 = (0, _index.type)(_textureCube.TextureCube), _dec25 = (0, _index.tooltip)('i18n:skybox.envmap'), _dec26 = (0, _index.visible)(function () {
  if (this.useIBL) {
    return true;
  }

  return false;
}), _dec27 = (0, _index.type)(_textureCube.TextureCube), _dec12(_class4 = _dec13(_class4 = (_class5 = (_temp2 = class SkyboxInfo {
  constructor() {
    _initializerDefineProperty(this, "_applyDiffuseMap", _descriptor7, this);

    _initializerDefineProperty(this, "_envmapHDR", _descriptor8, this);

    _initializerDefineProperty(this, "_envmapLDR", _descriptor9, this);

    _initializerDefineProperty(this, "_diffuseMapHDR", _descriptor10, this);

    _initializerDefineProperty(this, "_diffuseMapLDR", _descriptor11, this);

    _initializerDefineProperty(this, "_enabled", _descriptor12, this);

    _initializerDefineProperty(this, "_useIBL", _descriptor13, this);

    _initializerDefineProperty(this, "_useHDR", _descriptor14, this);

    this._resource = null;
  }

  /**
   * @en Whether to use diffuse convolution map. Enabled -> Will use map specified. Disabled -> Will revert to hemispheric lighting
   * @zh 是否为IBL启用漫反射卷积图？不启用的话将使用默认的半球光照
   */
  set applyDiffuseMap(val) {
    this._applyDiffuseMap = val;

    if (this._resource) {
      this._resource.useDiffuseMap = val;
    }
  }

  get applyDiffuseMap() {
    return this._applyDiffuseMap;
  }
  /**
   * @en Whether activate skybox in the scene
   * @zh 是否启用天空盒？
   */


  set enabled(val) {
    if (this._enabled === val) return;
    this._enabled = val;

    if (this._resource) {
      this._resource.enabled = this._enabled;
    }
  }

  get enabled() {
    return this._enabled;
  }
  /**
   * @en Whether use environment lighting
   * @zh 是否启用环境光照？
   */


  set useIBL(val) {
    this._useIBL = val;

    if (this._resource) {
      this._resource.useIBL = this._useIBL;
    }
  }

  get useIBL() {
    return this._useIBL;
  }
  /**
   * @en Toggle HDR (TODO: This SHOULD be moved into it's own subgroup away from skybox)
   * @zh 是否启用HDR？
   */


  set useHDR(val) {
    _globalExports.legacyCC.director.root.pipeline.pipelineSceneData.isHDR = val;
    this._useHDR = val; // Switch UI to and from LDR/HDR textures depends on HDR state

    if (this._resource) {
      this.envmap = this._resource.envmap;
      this.diffuseMap = this._resource.diffuseMap;

      if (this.diffuseMap == null) {
        this.applyDiffuseMap = false;
      }
    }

    if (this._resource) {
      this._resource.useHDR = this._useHDR;
    }
  }

  get useHDR() {
    _globalExports.legacyCC.director.root.pipeline.pipelineSceneData.isHDR = this._useHDR;
    return this._useHDR;
  }
  /**
   * @en The texture cube used for the skybox
   * @zh 使用的立方体贴图
   */


  set envmap(val) {
    const isHDR = _globalExports.legacyCC.director.root.pipeline.pipelineSceneData.isHDR;

    if (isHDR) {
      this._envmapHDR = val;
    } else {
      this._envmapLDR = val;
    }

    if (!this._envmapHDR) {
      this._diffuseMapHDR = null;
      this._applyDiffuseMap = false;
      this.useIBL = false;
    }

    if (this._resource) {
      this._resource.setEnvMaps(this._envmapHDR, this._envmapLDR);

      this._resource.setDiffuseMaps(this._diffuseMapHDR, this._diffuseMapLDR);

      this._resource.useDiffuseMap = this._applyDiffuseMap;
      this._resource.envmap = val;
    }
  }

  get envmap() {
    const isHDR = _globalExports.legacyCC.director.root.pipeline.pipelineSceneData.isHDR;

    if (isHDR) {
      return this._envmapHDR;
    } else {
      return this._envmapLDR;
    }
  }
  /**
   * @en The optional diffusion convolution map used in tandem with IBL
   * @zh 使用的漫反射卷积图
   */


  set diffuseMap(val) {
    const isHDR = _globalExports.legacyCC.director.root.pipeline.pipelineSceneData.isHDR;

    if (isHDR) {
      this._diffuseMapHDR = val;
    } else {
      this._diffuseMapLDR = val;
    }

    if (this._resource) {
      this._resource.setDiffuseMaps(this._diffuseMapHDR, this._diffuseMapLDR);
    }
  }

  get diffuseMap() {
    const isHDR = _globalExports.legacyCC.director.root.pipeline.pipelineSceneData.isHDR;

    if (isHDR) {
      return this._diffuseMapHDR;
    } else {
      return this._diffuseMapLDR;
    }
  }

  activate(resource) {
    this._resource = resource;

    this._resource.initialize(this);

    this._resource.setEnvMaps(this._envmapHDR, this._envmapLDR);

    this._resource.setDiffuseMaps(this._diffuseMapHDR, this._diffuseMapLDR);

    this._resource.activate(); // update global DS first

  }

}, _temp2), (_descriptor7 = _applyDecoratedDescriptor(_class5.prototype, "_applyDiffuseMap", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class5.prototype, "_envmapHDR", [_index.serializable, _dec14, _dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class5.prototype, "_envmapLDR", [_index.serializable, _dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class5.prototype, "_diffuseMapHDR", [_index.serializable, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class5.prototype, "_diffuseMapLDR", [_index.serializable, _dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class5.prototype, "_enabled", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class5.prototype, "_useIBL", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor14 = _applyDecoratedDescriptor(_class5.prototype, "_useHDR", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _applyDecoratedDescriptor(_class5.prototype, "applyDiffuseMap", [_dec19, _index.editable, _dec20], Object.getOwnPropertyDescriptor(_class5.prototype, "applyDiffuseMap"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "enabled", [_index.editable, _dec21], Object.getOwnPropertyDescriptor(_class5.prototype, "enabled"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "useIBL", [_index.editable, _dec22], Object.getOwnPropertyDescriptor(_class5.prototype, "useIBL"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "useHDR", [_index.editable, _dec23], Object.getOwnPropertyDescriptor(_class5.prototype, "useHDR"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "envmap", [_index.editable, _dec24, _dec25], Object.getOwnPropertyDescriptor(_class5.prototype, "envmap"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "diffuseMap", [_dec26, _index.editable, _index.readOnly, _dec27], Object.getOwnPropertyDescriptor(_class5.prototype, "diffuseMap"), _class5.prototype)), _class5)) || _class4) || _class4);
exports.SkyboxInfo = SkyboxInfo;
_globalExports.legacyCC.SkyboxInfo = SkyboxInfo;
/**
 * @zh 全局雾相关信息
 * @en Global fog info
 */

let FogInfo = (_dec28 = (0, _index.ccclass)('cc.FogInfo'), _dec29 = (0, _index.help)('i18n:cc.Fog'), _dec30 = (0, _index.tooltip)('i18n:fog.enabled'), _dec31 = (0, _index.tooltip)('i18n:fog.accurate'), _dec32 = (0, _index.tooltip)('i18n:fog.fogColor'), _dec33 = (0, _index.type)(_fog.FogType), _dec34 = (0, _index.tooltip)('i18n:fog.type'), _dec35 = (0, _index.visible)(function () {
  return this._type !== _fog.FogType.LAYERED && this._type !== _fog.FogType.LINEAR;
}), _dec36 = (0, _index.type)(_attribute.CCFloat), _dec37 = (0, _index.range)([0, 1]), _dec38 = (0, _index.rangeStep)(0.01), _dec39 = (0, _index.displayOrder)(3), _dec40 = (0, _index.tooltip)('i18n:fog.fogDensity'), _dec41 = (0, _index.visible)(function () {
  return this._type !== _fog.FogType.LAYERED;
}), _dec42 = (0, _index.type)(_attribute.CCFloat), _dec43 = (0, _index.rangeStep)(0.01), _dec44 = (0, _index.displayOrder)(4), _dec45 = (0, _index.tooltip)('i18n:fog.fogStart'), _dec46 = (0, _index.visible)(function () {
  return this._type === _fog.FogType.LINEAR;
}), _dec47 = (0, _index.type)(_attribute.CCFloat), _dec48 = (0, _index.rangeStep)(0.01), _dec49 = (0, _index.displayOrder)(5), _dec50 = (0, _index.tooltip)('i18n:fog.fogEnd'), _dec51 = (0, _index.visible)(function () {
  return this._type !== _fog.FogType.LINEAR;
}), _dec52 = (0, _index.type)(_attribute.CCFloat), _dec53 = (0, _index.rangeMin)(0.01), _dec54 = (0, _index.rangeStep)(0.01), _dec55 = (0, _index.displayOrder)(6), _dec56 = (0, _index.tooltip)('i18n:fog.fogAtten'), _dec57 = (0, _index.visible)(function () {
  return this._type === _fog.FogType.LAYERED;
}), _dec58 = (0, _index.type)(_attribute.CCFloat), _dec59 = (0, _index.rangeStep)(0.01), _dec60 = (0, _index.displayOrder)(7), _dec61 = (0, _index.tooltip)('i18n:fog.fogTop'), _dec62 = (0, _index.visible)(function () {
  return this._type === _fog.FogType.LAYERED;
}), _dec63 = (0, _index.type)(_attribute.CCFloat), _dec64 = (0, _index.rangeStep)(0.01), _dec65 = (0, _index.displayOrder)(8), _dec66 = (0, _index.tooltip)('i18n:fog.fogRange'), _dec28(_class7 = _dec29(_class7 = (_class8 = (_temp3 = _class9 = class FogInfo {
  constructor() {
    _initializerDefineProperty(this, "_type", _descriptor15, this);

    _initializerDefineProperty(this, "_fogColor", _descriptor16, this);

    _initializerDefineProperty(this, "_enabled", _descriptor17, this);

    _initializerDefineProperty(this, "_fogDensity", _descriptor18, this);

    _initializerDefineProperty(this, "_fogStart", _descriptor19, this);

    _initializerDefineProperty(this, "_fogEnd", _descriptor20, this);

    _initializerDefineProperty(this, "_fogAtten", _descriptor21, this);

    _initializerDefineProperty(this, "_fogTop", _descriptor22, this);

    _initializerDefineProperty(this, "_fogRange", _descriptor23, this);

    _initializerDefineProperty(this, "_accurate", _descriptor24, this);

    this._resource = null;
  }

  /**
   * @zh 是否启用全局雾效
   * @en Enable global fog
   */
  set enabled(val) {
    if (this._enabled === val) return;
    this._enabled = val;

    if (this._resource) {
      this._resource.enabled = val;

      if (val) {
        this._resource.type = this._type;
      }
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
    if (this._accurate === val) return;
    this._accurate = val;

    if (this._resource) {
      this._resource.accurate = val;

      if (val) {
        this._resource.type = this._type;
      }
    }
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

    if (this._resource) {
      this._resource.fogColor = this._fogColor;
    }
  }

  get fogColor() {
    return this._fogColor;
  }
  /**
   * @zh 全局雾类型
   * @en Global fog type
   */


  get type() {
    return this._type;
  }

  set type(val) {
    this._type = val;

    if (this._resource) {
      this._resource.type = val;
    }
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

    if (this._resource) {
      this._resource.fogDensity = val;
    }
  }
  /**
   * @zh 雾效起始位置
   * @en Global fog start position
   */


  get fogStart() {
    return this._fogStart;
  }

  set fogStart(val) {
    this._fogStart = val;

    if (this._resource) {
      this._resource.fogStart = val;
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

    if (this._resource) {
      this._resource.fogEnd = val;
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

    if (this._resource) {
      this._resource.fogAtten = val;
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

    if (this._resource) {
      this._resource.fogTop = val;
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

    if (this._resource) {
      this._resource.fogRange = val;
    }
  }

  activate(resource) {
    this._resource = resource;

    this._resource.initialize(this);

    this._resource.activate();
  }

}, _class9.FogType = _fog.FogType, _temp3), (_descriptor15 = _applyDecoratedDescriptor(_class8.prototype, "_type", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _fog.FogType.LINEAR;
  }
}), _descriptor16 = _applyDecoratedDescriptor(_class8.prototype, "_fogColor", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Color('#C8C8C8');
  }
}), _descriptor17 = _applyDecoratedDescriptor(_class8.prototype, "_enabled", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor18 = _applyDecoratedDescriptor(_class8.prototype, "_fogDensity", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.3;
  }
}), _descriptor19 = _applyDecoratedDescriptor(_class8.prototype, "_fogStart", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.5;
  }
}), _descriptor20 = _applyDecoratedDescriptor(_class8.prototype, "_fogEnd", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 300;
  }
}), _descriptor21 = _applyDecoratedDescriptor(_class8.prototype, "_fogAtten", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 5;
  }
}), _descriptor22 = _applyDecoratedDescriptor(_class8.prototype, "_fogTop", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1.5;
  }
}), _descriptor23 = _applyDecoratedDescriptor(_class8.prototype, "_fogRange", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1.2;
  }
}), _descriptor24 = _applyDecoratedDescriptor(_class8.prototype, "_accurate", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _applyDecoratedDescriptor(_class8.prototype, "enabled", [_index.editable, _dec30], Object.getOwnPropertyDescriptor(_class8.prototype, "enabled"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "accurate", [_index.editable, _dec31], Object.getOwnPropertyDescriptor(_class8.prototype, "accurate"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogColor", [_index.editable, _dec32], Object.getOwnPropertyDescriptor(_class8.prototype, "fogColor"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "type", [_index.editable, _dec33, _dec34], Object.getOwnPropertyDescriptor(_class8.prototype, "type"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogDensity", [_dec35, _dec36, _dec37, _dec38, _index.slide, _dec39, _dec40], Object.getOwnPropertyDescriptor(_class8.prototype, "fogDensity"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogStart", [_dec41, _dec42, _dec43, _dec44, _dec45], Object.getOwnPropertyDescriptor(_class8.prototype, "fogStart"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogEnd", [_dec46, _dec47, _dec48, _dec49, _dec50], Object.getOwnPropertyDescriptor(_class8.prototype, "fogEnd"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogAtten", [_dec51, _dec52, _dec53, _dec54, _dec55, _dec56], Object.getOwnPropertyDescriptor(_class8.prototype, "fogAtten"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogTop", [_dec57, _dec58, _dec59, _dec60, _dec61], Object.getOwnPropertyDescriptor(_class8.prototype, "fogTop"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogRange", [_dec62, _dec63, _dec64, _dec65, _dec66], Object.getOwnPropertyDescriptor(_class8.prototype, "fogRange"), _class8.prototype)), _class8)) || _class7) || _class7);
/**
 * @en Scene level planar shadow related information
 * @zh 平面阴影相关信息
 */

exports.FogInfo = FogInfo;
let ShadowsInfo = (_dec67 = (0, _index.ccclass)('cc.ShadowsInfo'), _dec68 = (0, _index.help)('i18n:cc.Shadow'), _dec69 = (0, _index.tooltip)('i18n:shadow.enabled'), _dec70 = (0, _index.type)(_shadows.ShadowType), _dec71 = (0, _index.visible)(function () {
  return this._type === _shadows.ShadowType.Planar;
}), _dec72 = (0, _index.visible)(function () {
  return this._type === _shadows.ShadowType.Planar;
}), _dec73 = (0, _index.tooltip)('i18n:shadow.normal'), _dec74 = (0, _index.type)(_attribute.CCFloat), _dec75 = (0, _index.tooltip)('i18n:shadow.distance'), _dec76 = (0, _index.visible)(function () {
  return this._type === _shadows.ShadowType.Planar;
}), _dec77 = (0, _index.range)([0.0, 1.0, 0.01]), _dec78 = (0, _index.type)(_attribute.CCFloat), _dec79 = (0, _index.tooltip)('i18n:shadow.saturation'), _dec80 = (0, _index.visible)(function () {
  return this._type === _shadows.ShadowType.ShadowMap;
}), _dec81 = (0, _index.type)(_shadows.PCFType), _dec82 = (0, _index.tooltip)('i18n:shadow.pcf'), _dec83 = (0, _index.visible)(function () {
  return this._type === _shadows.ShadowType.ShadowMap;
}), _dec84 = (0, _index.type)(_attribute.CCInteger), _dec85 = (0, _index.visible)(function () {
  return this._type === _shadows.ShadowType.ShadowMap;
}), _dec86 = (0, _index.type)(_attribute.CCFloat), _dec87 = (0, _index.tooltip)('i18n:shadow.bias'), _dec88 = (0, _index.visible)(function () {
  return this._type === _shadows.ShadowType.ShadowMap;
}), _dec89 = (0, _index.type)(_attribute.CCFloat), _dec90 = (0, _index.tooltip)('i18n:shadow.normalBias'), _dec91 = (0, _index.visible)(function () {
  return this._type === _shadows.ShadowType.ShadowMap;
}), _dec92 = (0, _index.type)(_shadows.ShadowSize), _dec93 = (0, _index.tooltip)('i18n:shadow.shadowMapSize'), _dec94 = (0, _index.visible)(function () {
  return this._type === _shadows.ShadowType.ShadowMap;
}), _dec95 = (0, _index.type)(_attribute.CCBoolean), _dec96 = (0, _index.tooltip)('i18n:shadow.fixedArea'), _dec97 = (0, _index.visible)(function () {
  return this._type === _shadows.ShadowType.ShadowMap;
}), _dec98 = (0, _index.type)(_attribute.CCFloat), _dec99 = (0, _index.tooltip)('i18n:shadow.near'), _dec100 = (0, _index.visible)(function () {
  return this._type === _shadows.ShadowType.ShadowMap && this._fixedArea === true;
}), _dec101 = (0, _index.type)(_attribute.CCFloat), _dec102 = (0, _index.tooltip)('i18n:shadow.far'), _dec103 = (0, _index.visible)(function () {
  return this._type === _shadows.ShadowType.ShadowMap && this._fixedArea === true;
}), _dec104 = (0, _index.range)([0.0, 2000.0, 0.1]), _dec105 = (0, _index.type)(_attribute.CCFloat), _dec106 = (0, _index.tooltip)('i18n:shadow.invisibleOcclusionRange'), _dec107 = (0, _index.visible)(function () {
  return this._type === _shadows.ShadowType.ShadowMap && this._fixedArea === false;
}), _dec108 = (0, _index.range)([0.0, 2000.0, 0.1]), _dec109 = (0, _index.type)(_attribute.CCFloat), _dec110 = (0, _index.tooltip)('i18n:shadow.shadowDistance'), _dec111 = (0, _index.visible)(function () {
  return this._type === _shadows.ShadowType.ShadowMap && this._fixedArea === false;
}), _dec112 = (0, _index.type)(_attribute.CCFloat), _dec113 = (0, _index.tooltip)('i18n:shadow.orthoSize'), _dec114 = (0, _index.visible)(function () {
  return this._type === _shadows.ShadowType.ShadowMap && this._fixedArea === true;
}), _dec67(_class10 = _dec68(_class10 = (_class11 = (_temp4 = class ShadowsInfo {
  constructor() {
    _initializerDefineProperty(this, "_type", _descriptor25, this);

    _initializerDefineProperty(this, "_enabled", _descriptor26, this);

    _initializerDefineProperty(this, "_normal", _descriptor27, this);

    _initializerDefineProperty(this, "_distance", _descriptor28, this);

    _initializerDefineProperty(this, "_shadowColor", _descriptor29, this);

    _initializerDefineProperty(this, "_firstSetCSM", _descriptor30, this);

    _initializerDefineProperty(this, "_fixedArea", _descriptor31, this);

    _initializerDefineProperty(this, "_pcf", _descriptor32, this);

    _initializerDefineProperty(this, "_bias", _descriptor33, this);

    _initializerDefineProperty(this, "_normalBias", _descriptor34, this);

    _initializerDefineProperty(this, "_near", _descriptor35, this);

    _initializerDefineProperty(this, "_far", _descriptor36, this);

    _initializerDefineProperty(this, "_shadowDistance", _descriptor37, this);

    _initializerDefineProperty(this, "_invisibleOcclusionRange", _descriptor38, this);

    _initializerDefineProperty(this, "_orthoSize", _descriptor39, this);

    _initializerDefineProperty(this, "_maxReceived", _descriptor40, this);

    _initializerDefineProperty(this, "_size", _descriptor41, this);

    _initializerDefineProperty(this, "_saturation", _descriptor42, this);

    this._resource = null;
  }

  /**
   * @en Whether activate planar shadow
   * @zh 是否启用平面阴影？
   */
  set enabled(val) {
    if (this._enabled === val) return;
    this._enabled = val;

    if (this._resource) {
      this._resource.enabled = val;

      if (val) {
        this._resource.type = this._type;
      }
    }
  }

  get enabled() {
    return this._enabled;
  }

  set type(val) {
    this._type = val;

    if (this._resource) {
      this._resource.type = val;
    }
  }

  get type() {
    return this._type;
  }
  /**
   * @en Shadow color
   * @zh 阴影颜色
   */


  set shadowColor(val) {
    this._shadowColor.set(val);

    if (this._resource) {
      this._resource.shadowColor = val;
    }
  }

  get shadowColor() {
    return this._shadowColor;
  }
  /**
   * @en The normal of the plane which receives shadow
   * @zh 阴影接收平面的法线
   */


  set normal(val) {
    _index2.Vec3.copy(this._normal, val);

    if (this._resource) {
      this._resource.normal = val;
    }
  }

  get normal() {
    return this._normal;
  }
  /**
   * @en The distance from coordinate origin to the receiving plane.
   * @zh 阴影接收平面与原点的距离
   */


  set distance(val) {
    this._distance = val;

    if (this._resource) {
      this._resource.distance = val;
    }
  }

  get distance() {
    return this._distance;
  }
  /**
   * @en Shadow color saturation
   * @zh 阴影颜色饱和度
   */


  set saturation(val) {
    if (val > 1.0) {
      this._saturation = val / val;

      if (this._resource) {
        this._resource.saturation = val / val;
      }
    } else {
      this._saturation = val;

      if (this._resource) {
        this._resource.saturation = val;
      }
    }
  }

  get saturation() {
    return this._saturation;
  }
  /**
   * @en The normal of the plane which receives shadow
   * @zh 阴影接收平面的法线
   */


  set pcf(val) {
    this._pcf = val;

    if (this._resource) {
      this._resource.pcf = val;
    }
  }

  get pcf() {
    return this._pcf;
  }
  /**
   * @en get or set shadow max received
   * @zh 获取或者设置阴影接收的最大光源数量
   */


  set maxReceived(val) {
    this._maxReceived = val;

    if (this._resource) {
      this._resource.maxReceived = val;
    }
  }

  get maxReceived() {
    return this._maxReceived;
  }
  /**
   * @en get or set shadow map sampler offset
   * @zh 获取或者设置阴影纹理偏移值
   */


  set bias(val) {
    this._bias = val;

    if (this._resource) {
      this._resource.bias = val;
    }
  }

  get bias() {
    return this._bias;
  }
  /**
   * @en on or off Self-shadowing.
   * @zh 打开或者关闭自阴影。
   */


  set normalBias(val) {
    this._normalBias = val;

    if (this._resource) {
      this._resource.normalBias = val;
    }
  }

  get normalBias() {
    return this._normalBias;
  }
  /**
   * @en get or set shadow map size
   * @zh 获取或者设置阴影纹理大小
   */


  set shadowMapSize(value) {
    this._size.set(value, value);

    if (this._resource) {
      this._resource.size.set(value, value);

      this._resource.shadowMapDirty = true;
    }
  }

  get shadowMapSize() {
    return this._size.x;
  }

  get size() {
    return this._size;
  }
  /**
   * @en get or set fixed area shadow
   * @zh 是否是固定区域阴影
   */


  set fixedArea(val) {
    this._fixedArea = val;

    if (this._resource) {
      this._resource.fixedArea = val;
    }
  }

  get fixedArea() {
    return this._fixedArea;
  }
  /**
   * @en get or set shadow camera near
   * @zh 获取或者设置阴影相机近裁剪面
   */


  set near(val) {
    this._near = val;

    if (this._resource) {
      this._resource.near = val;
    }
  }

  get near() {
    return this._near;
  }
  /**
   * @en get or set shadow camera far
   * @zh 获取或者设置阴影相机远裁剪面
   */


  set far(val) {
    this._far = Math.min(val, _shadows.Shadows.MAX_FAR);

    if (this._resource) {
      this._resource.far = this._far;
    }
  }

  get far() {
    return this._far;
  }
  /**
   * @en get or set shadow camera far
   * @zh 获取或者设置潜在阴影产生的范围
   */


  set invisibleOcclusionRange(val) {
    this._invisibleOcclusionRange = Math.min(val, _shadows.Shadows.MAX_FAR);

    if (this._resource) {
      this._resource.invisibleOcclusionRange = this._invisibleOcclusionRange;
    }
  }

  get invisibleOcclusionRange() {
    return this._invisibleOcclusionRange;
  }
  /**
   * @en get or set shadow camera far
   * @zh 获取或者设置潜在阴影产生的范围
   */


  set shadowDistance(val) {
    this._shadowDistance = Math.min(val, _shadows.Shadows.MAX_FAR);

    if (this._resource) {
      this._resource.shadowDistance = this._shadowDistance;
    }
  }

  get shadowDistance() {
    return this._shadowDistance;
  }
  /**
   * @en get or set shadow camera orthoSize
   * @zh 获取或者设置阴影相机正交大小
   */


  set orthoSize(val) {
    this._orthoSize = val;

    if (this._resource) {
      this._resource.orthoSize = val;
    }
  }

  get orthoSize() {
    return this._orthoSize;
  }
  /**
   * @en Set plane which receives shadow with the given node's world transformation
   * @zh 根据指定节点的世界变换设置阴影接收平面的信息
   * @param node The node for setting up the plane
   */


  setPlaneFromNode(node) {
    node.getWorldRotation(_qt);
    this.normal = _index2.Vec3.transformQuat(_v3, _up, _qt);
    node.getWorldPosition(_v3);
    this.distance = _index2.Vec3.dot(this._normal, _v3);
  }

  activate(resource) {
    this.pcf = Math.min(this._pcf, _shadows.PCFType.SOFT_2X);
    this._resource = resource;

    if (_internal253Aconstants.EDITOR && this._firstSetCSM) {
      this._resource.firstSetCSM = this._firstSetCSM; // Only the first time render in editor will trigger the auto calculation of shadowDistance

      _globalExports.legacyCC.director.once(_globalExports.legacyCC.Director.EVENT_AFTER_DRAW, () => {
        // Sync automatic calculated shadowDistance in renderer
        this._firstSetCSM = false;

        if (this._resource) {
          this.shadowDistance = Math.min(this._resource.shadowDistance, _shadows.Shadows.MAX_FAR);
        }
      });
    }

    this._resource.initialize(this);

    this._resource.activate();
  }

}, _temp4), (_descriptor25 = _applyDecoratedDescriptor(_class11.prototype, "_type", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _shadows.ShadowType.Planar;
  }
}), _descriptor26 = _applyDecoratedDescriptor(_class11.prototype, "_enabled", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor27 = _applyDecoratedDescriptor(_class11.prototype, "_normal", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Vec3(0, 1, 0);
  }
}), _descriptor28 = _applyDecoratedDescriptor(_class11.prototype, "_distance", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor29 = _applyDecoratedDescriptor(_class11.prototype, "_shadowColor", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Color(0, 0, 0, 76);
  }
}), _descriptor30 = _applyDecoratedDescriptor(_class11.prototype, "_firstSetCSM", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor31 = _applyDecoratedDescriptor(_class11.prototype, "_fixedArea", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor32 = _applyDecoratedDescriptor(_class11.prototype, "_pcf", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _shadows.PCFType.HARD;
  }
}), _descriptor33 = _applyDecoratedDescriptor(_class11.prototype, "_bias", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.00001;
  }
}), _descriptor34 = _applyDecoratedDescriptor(_class11.prototype, "_normalBias", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.0;
  }
}), _descriptor35 = _applyDecoratedDescriptor(_class11.prototype, "_near", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.1;
  }
}), _descriptor36 = _applyDecoratedDescriptor(_class11.prototype, "_far", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 10.0;
  }
}), _descriptor37 = _applyDecoratedDescriptor(_class11.prototype, "_shadowDistance", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 100;
  }
}), _descriptor38 = _applyDecoratedDescriptor(_class11.prototype, "_invisibleOcclusionRange", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 200;
  }
}), _descriptor39 = _applyDecoratedDescriptor(_class11.prototype, "_orthoSize", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 5;
  }
}), _descriptor40 = _applyDecoratedDescriptor(_class11.prototype, "_maxReceived", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 4;
  }
}), _descriptor41 = _applyDecoratedDescriptor(_class11.prototype, "_size", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Vec2(512, 512);
  }
}), _descriptor42 = _applyDecoratedDescriptor(_class11.prototype, "_saturation", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.75;
  }
}), _applyDecoratedDescriptor(_class11.prototype, "enabled", [_index.editable, _dec69], Object.getOwnPropertyDescriptor(_class11.prototype, "enabled"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "type", [_index.editable, _dec70], Object.getOwnPropertyDescriptor(_class11.prototype, "type"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "shadowColor", [_dec71], Object.getOwnPropertyDescriptor(_class11.prototype, "shadowColor"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "normal", [_dec72, _dec73], Object.getOwnPropertyDescriptor(_class11.prototype, "normal"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "distance", [_dec74, _dec75, _dec76], Object.getOwnPropertyDescriptor(_class11.prototype, "distance"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "saturation", [_index.editable, _dec77, _index.slide, _dec78, _dec79, _dec80], Object.getOwnPropertyDescriptor(_class11.prototype, "saturation"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "pcf", [_dec81, _dec82, _dec83], Object.getOwnPropertyDescriptor(_class11.prototype, "pcf"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "maxReceived", [_dec84, _dec85], Object.getOwnPropertyDescriptor(_class11.prototype, "maxReceived"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "bias", [_dec86, _dec87, _dec88], Object.getOwnPropertyDescriptor(_class11.prototype, "bias"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "normalBias", [_dec89, _dec90, _dec91], Object.getOwnPropertyDescriptor(_class11.prototype, "normalBias"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "shadowMapSize", [_dec92, _dec93, _dec94], Object.getOwnPropertyDescriptor(_class11.prototype, "shadowMapSize"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "fixedArea", [_dec95, _dec96, _dec97], Object.getOwnPropertyDescriptor(_class11.prototype, "fixedArea"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "near", [_dec98, _dec99, _dec100], Object.getOwnPropertyDescriptor(_class11.prototype, "near"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "far", [_dec101, _dec102, _dec103], Object.getOwnPropertyDescriptor(_class11.prototype, "far"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "invisibleOcclusionRange", [_index.editable, _dec104, _index.slide, _dec105, _dec106, _dec107], Object.getOwnPropertyDescriptor(_class11.prototype, "invisibleOcclusionRange"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "shadowDistance", [_index.editable, _dec108, _index.slide, _dec109, _dec110, _dec111], Object.getOwnPropertyDescriptor(_class11.prototype, "shadowDistance"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "orthoSize", [_dec112, _dec113, _dec114], Object.getOwnPropertyDescriptor(_class11.prototype, "orthoSize"), _class11.prototype)), _class11)) || _class10) || _class10);
exports.ShadowsInfo = ShadowsInfo;
_globalExports.legacyCC.ShadowsInfo = ShadowsInfo;
/**
 * @en Scene level octree related information
 * @zh 场景八叉树相关信息
 */

const DEFAULT_WORLD_MIN_POS = new _index2.Vec3(-1024.0, -1024.0, -1024.0);
exports.DEFAULT_WORLD_MIN_POS = DEFAULT_WORLD_MIN_POS;
const DEFAULT_WORLD_MAX_POS = new _index2.Vec3(1024.0, 1024.0, 1024.0);
exports.DEFAULT_WORLD_MAX_POS = DEFAULT_WORLD_MAX_POS;
const DEFAULT_OCTREE_DEPTH = 8;
exports.DEFAULT_OCTREE_DEPTH = DEFAULT_OCTREE_DEPTH;
let OctreeInfo = (_dec115 = (0, _index.ccclass)('cc.OctreeInfo'), _dec116 = (0, _index.help)('i18n:cc.OctreeCulling'), _dec117 = (0, _index.tooltip)('i18n:octree_culling.enabled'), _dec118 = (0, _index.tooltip)('i18n:octree_culling.minPos'), _dec119 = (0, _index.displayName)('World MinPos'), _dec120 = (0, _index.tooltip)('i18n:octree_culling.maxPos'), _dec121 = (0, _index.displayName)('World MaxPos'), _dec122 = (0, _index.range)([4, 12, 1]), _dec123 = (0, _index.type)(_attribute.CCInteger), _dec124 = (0, _index.tooltip)('i18n:octree_culling.depth'), _dec115(_class13 = _dec116(_class13 = (_class14 = (_temp5 = class OctreeInfo {
  constructor() {
    _initializerDefineProperty(this, "_enabled", _descriptor43, this);

    _initializerDefineProperty(this, "_minPos", _descriptor44, this);

    _initializerDefineProperty(this, "_maxPos", _descriptor45, this);

    _initializerDefineProperty(this, "_depth", _descriptor46, this);

    this._resource = null;
  }

  /**
   * @en Whether activate octree
   * @zh 是否启用八叉树加速剔除？
   */
  set enabled(val) {
    if (this._enabled === val) return;
    this._enabled = val;

    if (this._resource) {
      this._resource.enabled = val;
    }
  }

  get enabled() {
    return this._enabled;
  }

  set minPos(val) {
    this._minPos = val;

    if (this._resource) {
      this._resource.minPos = val;
    }
  }

  get minPos() {
    return this._minPos;
  }

  set maxPos(val) {
    this._maxPos = val;

    if (this._resource) {
      this._resource.maxPos = val;
    }
  }

  get maxPos() {
    return this._maxPos;
  }

  set depth(val) {
    this._depth = val;

    if (this._resource) {
      this._resource.depth = val;
    }
  }

  get depth() {
    return this._depth;
  }

  activate(resource) {
    this._resource = resource;

    this._resource.initialize(this);
  }

}, _temp5), (_descriptor43 = _applyDecoratedDescriptor(_class14.prototype, "_enabled", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor44 = _applyDecoratedDescriptor(_class14.prototype, "_minPos", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Vec3(DEFAULT_WORLD_MIN_POS);
  }
}), _descriptor45 = _applyDecoratedDescriptor(_class14.prototype, "_maxPos", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Vec3(DEFAULT_WORLD_MAX_POS);
  }
}), _descriptor46 = _applyDecoratedDescriptor(_class14.prototype, "_depth", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return DEFAULT_OCTREE_DEPTH;
  }
}), _applyDecoratedDescriptor(_class14.prototype, "enabled", [_index.editable, _dec117], Object.getOwnPropertyDescriptor(_class14.prototype, "enabled"), _class14.prototype), _applyDecoratedDescriptor(_class14.prototype, "minPos", [_index.editable, _dec118, _dec119], Object.getOwnPropertyDescriptor(_class14.prototype, "minPos"), _class14.prototype), _applyDecoratedDescriptor(_class14.prototype, "maxPos", [_index.editable, _dec120, _dec121], Object.getOwnPropertyDescriptor(_class14.prototype, "maxPos"), _class14.prototype), _applyDecoratedDescriptor(_class14.prototype, "depth", [_index.editable, _dec122, _dec123, _dec124], Object.getOwnPropertyDescriptor(_class14.prototype, "depth"), _class14.prototype)), _class14)) || _class13) || _class13);
/**
 * @en All scene related global parameters, it affects all content in the corresponding scene
 * @zh 各类场景级别的渲染参数，将影响全场景的所有物体
 */

exports.OctreeInfo = OctreeInfo;
let SceneGlobals = (_dec125 = (0, _index.ccclass)('cc.SceneGlobals'), _dec126 = (0, _index.type)(SkyboxInfo), _dec125(_class16 = (_class17 = (_temp6 = class SceneGlobals {
  constructor() {
    _initializerDefineProperty(this, "ambient", _descriptor47, this);

    _initializerDefineProperty(this, "shadows", _descriptor48, this);

    _initializerDefineProperty(this, "_skybox", _descriptor49, this);

    _initializerDefineProperty(this, "fog", _descriptor50, this);

    _initializerDefineProperty(this, "octree", _descriptor51, this);
  }

  /**
   * @en Skybox related information
   * @zh 天空盒相关信息
   */
  get skybox() {
    return this._skybox;
  }

  set skybox(value) {
    this._skybox = value;
  }
  /**
   * @en Octree related information
   * @zh 八叉树相关信息
   */


  activate() {
    const sceneData = _globalExports.legacyCC.director.root.pipeline.pipelineSceneData;
    this.skybox.activate(sceneData.skybox);
    this.ambient.activate(sceneData.ambient);
    this.shadows.activate(sceneData.shadows);
    this.fog.activate(sceneData.fog);
    this.octree.activate(sceneData.octree);
  }

}, _temp6), (_descriptor47 = _applyDecoratedDescriptor(_class17.prototype, "ambient", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new AmbientInfo();
  }
}), _descriptor48 = _applyDecoratedDescriptor(_class17.prototype, "shadows", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new ShadowsInfo();
  }
}), _descriptor49 = _applyDecoratedDescriptor(_class17.prototype, "_skybox", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new SkyboxInfo();
  }
}), _descriptor50 = _applyDecoratedDescriptor(_class17.prototype, "fog", [_index.editable, _index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new FogInfo();
  }
}), _applyDecoratedDescriptor(_class17.prototype, "skybox", [_index.editable, _dec126], Object.getOwnPropertyDescriptor(_class17.prototype, "skybox"), _class17.prototype), _descriptor51 = _applyDecoratedDescriptor(_class17.prototype, "octree", [_index.editable, _index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new OctreeInfo();
  }
})), _class17)) || _class16);
exports.SceneGlobals = SceneGlobals;
_globalExports.legacyCC.SceneGlobals = SceneGlobals;