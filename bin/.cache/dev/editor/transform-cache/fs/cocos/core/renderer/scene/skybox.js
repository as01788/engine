"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Skybox = void 0;

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

var _index = require("../../builtin/index.js");

var _material = require("../../assets/material.js");

var _define = require("../../pipeline/define.js");

var _materialInstance = require("../core/material-instance.js");

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
let skybox_mesh = null;
let skybox_material = null;

class Skybox {
  get model() {
    return this._model;
  }
  /**
   * @en Whether activate skybox in the scene
   * @zh 是否启用天空盒？
   */


  get enabled() {
    return this._enabled;
  }

  set enabled(val) {
    this._setEnabled(val);

    if (val) this.activate();else this._updatePipeline();
  }
  /**
   * @en HDR
   * @zh 是否启用HDR？
   */


  get useHDR() {
    return this._useHDR;
  }

  set useHDR(val) {
    this._setUseHDR(val);

    this.setEnvMaps(this._envmapHDR, this._envmapLDR);
  }
  /**
   * @en Whether use IBL
   * @zh 是否启用IBL？
   */


  get useIBL() {
    return this._useIBL;
  }

  set useIBL(val) {
    this._setUseIBL(val);

    this._updatePipeline();
  }
  /**
   * @en Whether use diffuse convolution map lighting
   * @zh 是否为IBL启用漫反射卷积图？
   */


  get useDiffuseMap() {
    return this._useDiffuseMap;
  }

  set useDiffuseMap(val) {
    this._useDiffuseMap = val;

    this._updateGlobalBinding();

    this._updatePipeline();
  }
  /**
   * @en Whether enable RGBE data support in skybox shader
   * @zh 是否需要开启 shader 内的 RGBE 数据支持？
   */


  get isRGBE() {
    if (this.envmap) {
      return this.envmap.isRGBE;
    } else {
      return false;
    }
  }
  /**
   * @en The texture cube used for the skybox
   * @zh 使用的立方体贴图
   */


  get envmap() {
    const isHDR = _globalExports.legacyCC.director.root.pipeline.pipelineSceneData.isHDR;

    if (isHDR) {
      return this._envmapHDR;
    } else {
      return this._envmapLDR;
    }
  }

  set envmap(val) {
    const root = _globalExports.legacyCC.director.root;
    const isHDR = root.pipeline.pipelineSceneData.isHDR;

    if (isHDR) {
      this.setEnvMaps(val, this._envmapLDR);
    } else {
      this.setEnvMaps(this._envmapHDR, val);
    }
  }
  /**
   * @en The texture cube used diffuse convolution map
   * @zh 使用的漫反射卷积图
   */


  get diffuseMap() {
    const isHDR = _globalExports.legacyCC.director.root.pipeline.pipelineSceneData.isHDR;

    if (isHDR) {
      return this._diffuseMapHDR;
    } else {
      return this._diffuseMapLDR;
    }
  }

  set diffuseMap(val) {
    const isHDR = _globalExports.legacyCC.director.root.pipeline.pipelineSceneData.isHDR;

    if (isHDR) {
      this.setDiffuseMaps(val, this._diffuseMapLDR);
    } else {
      this.setDiffuseMaps(this._diffuseMapHDR, val);
    }
  }

  get native() {
    return this._nativeObj;
  }

  constructor() {
    this._envmapLDR = null;
    this._envmapHDR = null;
    this._diffuseMapLDR = null;
    this._diffuseMapHDR = null;
    this._globalDSManager = null;
    this._model = null;
    this._default = null;
    this._enabled = false;
    this._useIBL = false;
    this._useHDR = true;
    this._useDiffuseMap = false;

    if (_internal253Aconstants.JSB) {
      this._nativeObj = new _nativeScene.NaitveSkybox();
    }
  }

  _setEnabled(val) {
    this._enabled = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.enabled = val;
    }
  }

  _setUseIBL(val) {
    this._useIBL = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.useIBL = val;
    }
  }

  _setUseHDR(val) {
    this._useHDR = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.useHDR = val;
    }
  }

  _setUseDiffuseMap(val) {
    this._useDiffuseMap = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.useDiffuseMap = val;
    }
  }

  initialize(skyboxInfo) {
    this._setEnabled(skyboxInfo.enabled);

    this._setUseIBL(skyboxInfo.useIBL);

    this._setUseDiffuseMap(skyboxInfo.applyDiffuseMap);

    this._setUseHDR(skyboxInfo.useHDR);
  }

  setEnvMaps(envmapHDR, envmapLDR) {
    this._envmapHDR = envmapHDR;
    this._envmapLDR = envmapLDR;
    const root = _globalExports.legacyCC.director.root;
    const isHDR = root.pipeline.pipelineSceneData.isHDR;

    if (isHDR) {
      if (envmapHDR) {
        root.pipeline.pipelineSceneData.ambient.groundAlbedo.w = envmapHDR.mipmapLevel;
      }
    } else if (envmapLDR) {
      root.pipeline.pipelineSceneData.ambient.groundAlbedo.w = envmapLDR.mipmapLevel;
    }

    this._updateGlobalBinding();

    this._updatePipeline();
  }

  setDiffuseMaps(diffuseMapHDR, diffuseMapLDR) {
    this._diffuseMapHDR = diffuseMapHDR;
    this._diffuseMapLDR = diffuseMapLDR;

    this._updateGlobalBinding();

    this._updatePipeline();
  }

  activate() {
    const pipeline = _globalExports.legacyCC.director.root.pipeline;
    this._globalDSManager = pipeline.globalDSManager;
    this._default = _index.builtinResMgr.get('default-cube-texture');

    if (!this._model) {
      this._model = _globalExports.legacyCC.director.root.createModel(_globalExports.legacyCC.renderer.scene.Model); // @ts-expect-error private member access

      this._model._initLocalDescriptors = () => {}; // @ts-expect-error private member access


      this._model._initWorldBoundDescriptors = () => {};

      if (_internal253Aconstants.JSB) {
        this._nativeObj.model = this._model.native;
      }
    }

    let isRGBE = this._default.isRGBE;

    if (this.envmap) {
      isRGBE = this.envmap.isRGBE;
    }

    if (!skybox_material) {
      const mat = new _material.Material();
      mat.initialize({
        effectName: 'skybox',
        defines: {
          USE_RGBE_CUBEMAP: isRGBE
        }
      });
      skybox_material = new _materialInstance.MaterialInstance({
        parent: mat
      });
    }

    if (this.enabled) {
      if (!skybox_mesh) {
        skybox_mesh = _globalExports.legacyCC.utils.createMesh(_globalExports.legacyCC.primitives.box({
          width: 2,
          height: 2,
          length: 2
        }));
      }

      this._model.initSubModel(0, skybox_mesh.renderingSubMeshes[0], skybox_material);
    }

    if (!this.envmap) {
      this.envmap = this._default;
    }

    if (!this.diffuseMap) {
      this.diffuseMap = this._default;
    }

    this._updateGlobalBinding();

    this._updatePipeline();
  }

  _updatePipeline() {
    if (this.enabled && skybox_material) {
      skybox_material.recompileShaders({
        USE_RGBE_CUBEMAP: this.isRGBE
      });
    }

    if (this._model) {
      this._model.setSubModelMaterial(0, skybox_material);
    }

    if (_internal253Aconstants.JSB) {
      this._nativeObj.isRGBE = this.isRGBE;
    }

    const root = _globalExports.legacyCC.director.root;
    const pipeline = root.pipeline;
    const useIBLValue = this.useIBL ? this.isRGBE ? 2 : 1 : 0;
    const useDiffuseMapValue = this.useIBL && this.useDiffuseMap && this.diffuseMap ? this.isRGBE ? 2 : 1 : 0;
    const useHDRValue = this.useHDR;

    if (pipeline.macros.CC_USE_IBL === useIBLValue && pipeline.macros.CC_USE_DIFFUSEMAP === useDiffuseMapValue && pipeline.macros.CC_USE_HDR === useHDRValue) {
      return;
    }

    pipeline.macros.CC_USE_IBL = useIBLValue;
    pipeline.macros.CC_USE_DIFFUSEMAP = useDiffuseMapValue;
    pipeline.macros.CC_USE_HDR = useHDRValue;
    root.onGlobalPipelineStateChanged();
  }

  _updateGlobalBinding() {
    if (this._globalDSManager) {
      const device = _globalExports.legacyCC.director.root.device;
      const envmap = this.envmap ? this.envmap : this._default;

      if (envmap) {
        const texture = envmap.getGFXTexture();
        const sampler = device.getSampler(envmap.getSamplerInfo());

        this._globalDSManager.bindSampler(_define.UNIFORM_ENVIRONMENT_BINDING, sampler);

        this._globalDSManager.bindTexture(_define.UNIFORM_ENVIRONMENT_BINDING, texture);
      }

      const diffuseMap = this.diffuseMap ? this.diffuseMap : this._default;

      if (diffuseMap) {
        const texture = diffuseMap.getGFXTexture();
        const sampler = device.getSampler(diffuseMap.getSamplerInfo());

        this._globalDSManager.bindSampler(_define.UNIFORM_DIFFUSEMAP_BINDING, sampler);

        this._globalDSManager.bindTexture(_define.UNIFORM_DIFFUSEMAP_BINDING, texture);
      }

      this._globalDSManager.update();
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

exports.Skybox = Skybox;
_globalExports.legacyCC.Skybox = Skybox;