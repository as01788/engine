"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PipelineUBO = void 0;

var _define = require("./define.js");

var _index = require("../gfx/index.js");

var _index2 = require("../math/index.js");

var _globalExports = require("../global-exports.js");

var _shadows = require("../renderer/scene/shadows.js");

var _sceneCulling = require("./scene-culling.js");

var _light = require("../renderer/scene/light.js");

var _builtinResMgr = require("../builtin/builtin-res-mgr.js");

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
const _matShadowView = new _index2.Mat4();

const _matShadowProj = new _index2.Mat4();

const _matShadowViewProj = new _index2.Mat4();

const _vec4ShadowInfo = new _index2.Vec4();

class PipelineUBO {
  constructor() {
    this._globalUBO = new Float32Array(_define.UBOGlobal.COUNT);
    this._cameraUBO = new Float32Array(_define.UBOCamera.COUNT);
    this._shadowUBO = new Float32Array(_define.UBOShadow.COUNT);
  }

  static updateGlobalUBOView(window, bufferView) {
    const root = _globalExports.legacyCC.director.root;
    const fv = bufferView;
    const shadingWidth = Math.floor(window.width);
    const shadingHeight = Math.floor(window.height); // update UBOGlobal

    fv[_define.UBOGlobal.TIME_OFFSET] = root.cumulativeTime;
    fv[_define.UBOGlobal.TIME_OFFSET + 1] = root.frameTime;
    fv[_define.UBOGlobal.TIME_OFFSET + 2] = _globalExports.legacyCC.director.getTotalFrames();
    fv[_define.UBOGlobal.SCREEN_SIZE_OFFSET] = shadingWidth;
    fv[_define.UBOGlobal.SCREEN_SIZE_OFFSET + 1] = shadingHeight;
    fv[_define.UBOGlobal.SCREEN_SIZE_OFFSET + 2] = 1.0 / shadingWidth;
    fv[_define.UBOGlobal.SCREEN_SIZE_OFFSET + 3] = 1.0 / shadingHeight;
    fv[_define.UBOGlobal.NATIVE_SIZE_OFFSET] = shadingWidth;
    fv[_define.UBOGlobal.NATIVE_SIZE_OFFSET + 1] = shadingHeight;
    fv[_define.UBOGlobal.NATIVE_SIZE_OFFSET + 2] = 1.0 / fv[_define.UBOGlobal.NATIVE_SIZE_OFFSET];
    fv[_define.UBOGlobal.NATIVE_SIZE_OFFSET + 3] = 1.0 / fv[_define.UBOGlobal.NATIVE_SIZE_OFFSET + 1];
  }

  static updateCameraUBOView(pipeline, bufferView, camera) {
    const root = _globalExports.legacyCC.director.root;
    const scene = camera.scene ? camera.scene : _globalExports.legacyCC.director.getScene().renderScene;
    const mainLight = scene.mainLight;
    const sceneData = pipeline.pipelineSceneData;
    const ambient = sceneData.ambient;
    const fog = sceneData.fog;
    const cv = bufferView;
    const exposure = camera.exposure;
    const isHDR = sceneData.isHDR; // update camera ubo

    cv[_define.UBOCamera.SCREEN_SCALE_OFFSET] = sceneData.shadingScale;
    cv[_define.UBOCamera.SCREEN_SCALE_OFFSET + 1] = sceneData.shadingScale;
    cv[_define.UBOCamera.SCREEN_SCALE_OFFSET + 2] = 1.0 / cv[_define.UBOCamera.SCREEN_SCALE_OFFSET];
    cv[_define.UBOCamera.SCREEN_SCALE_OFFSET + 3] = 1.0 / cv[_define.UBOCamera.SCREEN_SCALE_OFFSET + 1];
    cv[_define.UBOCamera.EXPOSURE_OFFSET] = exposure;
    cv[_define.UBOCamera.EXPOSURE_OFFSET + 1] = 1.0 / exposure;
    cv[_define.UBOCamera.EXPOSURE_OFFSET + 2] = isHDR ? 1.0 : 0.0;
    cv[_define.UBOCamera.EXPOSURE_OFFSET + 3] = 0.0;

    if (mainLight) {
      _index2.Vec3.toArray(cv, mainLight.direction, _define.UBOCamera.MAIN_LIT_DIR_OFFSET);

      _index2.Vec3.toArray(cv, mainLight.color, _define.UBOCamera.MAIN_LIT_COLOR_OFFSET);

      if (mainLight.useColorTemperature) {
        const colorTempRGB = mainLight.colorTemperatureRGB;
        cv[_define.UBOCamera.MAIN_LIT_COLOR_OFFSET] *= colorTempRGB.x;
        cv[_define.UBOCamera.MAIN_LIT_COLOR_OFFSET + 1] *= colorTempRGB.y;
        cv[_define.UBOCamera.MAIN_LIT_COLOR_OFFSET + 2] *= colorTempRGB.z;
      }

      if (isHDR) {
        cv[_define.UBOCamera.MAIN_LIT_COLOR_OFFSET + 3] = mainLight.illuminance * exposure;
      } else {
        cv[_define.UBOCamera.MAIN_LIT_COLOR_OFFSET + 3] = mainLight.illuminance;
      }
    } else {
      _index2.Vec3.toArray(cv, _index2.Vec3.UNIT_Z, _define.UBOCamera.MAIN_LIT_DIR_OFFSET);

      _index2.Vec4.toArray(cv, _index2.Vec4.ZERO, _define.UBOCamera.MAIN_LIT_COLOR_OFFSET);
    }

    const skyColor = ambient.skyColor;

    if (isHDR) {
      skyColor.w = ambient.skyIllum * exposure;
    } else {
      skyColor.w = ambient.skyIllum;
    }

    cv[_define.UBOCamera.AMBIENT_SKY_OFFSET + 0] = skyColor.x;
    cv[_define.UBOCamera.AMBIENT_SKY_OFFSET + 1] = skyColor.y;
    cv[_define.UBOCamera.AMBIENT_SKY_OFFSET + 2] = skyColor.z;
    cv[_define.UBOCamera.AMBIENT_SKY_OFFSET + 3] = skyColor.w;
    cv[_define.UBOCamera.AMBIENT_GROUND_OFFSET + 0] = ambient.groundAlbedo.x;
    cv[_define.UBOCamera.AMBIENT_GROUND_OFFSET + 1] = ambient.groundAlbedo.y;
    cv[_define.UBOCamera.AMBIENT_GROUND_OFFSET + 2] = ambient.groundAlbedo.z;
    cv[_define.UBOCamera.AMBIENT_GROUND_OFFSET + 3] = ambient.groundAlbedo.w;

    _index2.Mat4.toArray(cv, camera.matView, _define.UBOCamera.MAT_VIEW_OFFSET);

    _index2.Mat4.toArray(cv, camera.node.worldMatrix, _define.UBOCamera.MAT_VIEW_INV_OFFSET);

    _index2.Vec3.toArray(cv, camera.position, _define.UBOCamera.CAMERA_POS_OFFSET);

    _index2.Mat4.toArray(cv, camera.matProj, _define.UBOCamera.MAT_PROJ_OFFSET);

    _index2.Mat4.toArray(cv, camera.matProjInv, _define.UBOCamera.MAT_PROJ_INV_OFFSET);

    _index2.Mat4.toArray(cv, camera.matViewProj, _define.UBOCamera.MAT_VIEW_PROJ_OFFSET);

    _index2.Mat4.toArray(cv, camera.matViewProjInv, _define.UBOCamera.MAT_VIEW_PROJ_INV_OFFSET);

    cv[_define.UBOCamera.CAMERA_POS_OFFSET + 3] = this.getCombineSignY();
    const colorTempRGB = fog.colorArray;
    cv[_define.UBOCamera.GLOBAL_FOG_COLOR_OFFSET] = colorTempRGB.x;
    cv[_define.UBOCamera.GLOBAL_FOG_COLOR_OFFSET + 1] = colorTempRGB.y;
    cv[_define.UBOCamera.GLOBAL_FOG_COLOR_OFFSET + 2] = colorTempRGB.z;
    cv[_define.UBOCamera.GLOBAL_FOG_COLOR_OFFSET + 3] = colorTempRGB.z;
    cv[_define.UBOCamera.GLOBAL_FOG_BASE_OFFSET] = fog.fogStart;
    cv[_define.UBOCamera.GLOBAL_FOG_BASE_OFFSET + 1] = fog.fogEnd;
    cv[_define.UBOCamera.GLOBAL_FOG_BASE_OFFSET + 2] = fog.fogDensity;
    cv[_define.UBOCamera.GLOBAL_FOG_ADD_OFFSET] = fog.fogTop;
    cv[_define.UBOCamera.GLOBAL_FOG_ADD_OFFSET + 1] = fog.fogRange;
    cv[_define.UBOCamera.GLOBAL_FOG_ADD_OFFSET + 2] = fog.fogAtten;
    cv[_define.UBOCamera.NEAR_FAR_OFFSET] = camera.nearClip;
    cv[_define.UBOCamera.NEAR_FAR_OFFSET + 1] = camera.farClip;
    cv[_define.UBOCamera.VIEW_PORT_OFFSET] = camera.viewport.x;
    cv[_define.UBOCamera.VIEW_PORT_OFFSET + 1] = camera.viewport.y;
    cv[_define.UBOCamera.VIEW_PORT_OFFSET + 1] = camera.viewport.z;
    cv[_define.UBOCamera.VIEW_PORT_OFFSET + 1] = camera.viewport.w;
  }

  static updateShadowUBOView(pipeline, bufferView, camera) {
    const device = pipeline.device;
    const mainLight = camera.scene.mainLight;
    const sceneData = pipeline.pipelineSceneData;
    const shadowInfo = sceneData.shadows;
    const sv = bufferView;

    if (shadowInfo.enabled) {
      if (mainLight && shadowInfo.type === _shadows.ShadowType.ShadowMap) {
        let near = 0.1;
        let far = 0;
        let matShadowView;
        let matShadowProj;
        let matShadowViewProj;

        if (!shadowInfo.fixedArea) {
          near = 0.1;
          far = shadowInfo.shadowCameraFar;
          matShadowView = shadowInfo.matShadowView;
          matShadowProj = shadowInfo.matShadowProj;
          matShadowViewProj = shadowInfo.matShadowViewProj;
        } else {
          _index2.Mat4.invert(_matShadowView, mainLight.node.getWorldMatrix());

          matShadowView = _matShadowView;
          const x = shadowInfo.orthoSize;
          const y = shadowInfo.orthoSize;
          near = shadowInfo.near;
          far = shadowInfo.far;

          _index2.Mat4.ortho(_matShadowProj, -x, x, -y, y, near, far, device.capabilities.clipSpaceMinZ, device.capabilities.clipSpaceSignY);

          matShadowProj = _matShadowProj;

          _index2.Mat4.multiply(_matShadowViewProj, _matShadowProj, _matShadowView);

          matShadowViewProj = _matShadowViewProj;
        }

        _index2.Mat4.toArray(bufferView, matShadowView, _define.UBOShadow.MAT_LIGHT_VIEW_OFFSET);

        sv[_define.UBOShadow.SHADOW_PROJ_DEPTH_INFO_OFFSET + 0] = matShadowProj.m10;
        sv[_define.UBOShadow.SHADOW_PROJ_DEPTH_INFO_OFFSET + 1] = matShadowProj.m14;
        sv[_define.UBOShadow.SHADOW_PROJ_DEPTH_INFO_OFFSET + 2] = matShadowProj.m11;
        sv[_define.UBOShadow.SHADOW_PROJ_DEPTH_INFO_OFFSET + 3] = matShadowProj.m15;
        sv[_define.UBOShadow.SHADOW_PROJ_INFO_OFFSET + 0] = matShadowProj.m00;
        sv[_define.UBOShadow.SHADOW_PROJ_INFO_OFFSET + 1] = matShadowProj.m05;
        sv[_define.UBOShadow.SHADOW_PROJ_INFO_OFFSET + 2] = 1.0 / matShadowProj.m00;
        sv[_define.UBOShadow.SHADOW_PROJ_INFO_OFFSET + 3] = 1.0 / matShadowProj.m05;

        _index2.Mat4.toArray(bufferView, matShadowViewProj, _define.UBOShadow.MAT_LIGHT_VIEW_PROJ_OFFSET);

        const linear = 0.0;
        const packing = (0, _define.supportsFloatTexture)(device) ? 0.0 : 1.0;
        sv[_define.UBOShadow.SHADOW_NEAR_FAR_LINEAR_SATURATION_INFO_OFFSET + 0] = near;
        sv[_define.UBOShadow.SHADOW_NEAR_FAR_LINEAR_SATURATION_INFO_OFFSET + 1] = far;
        sv[_define.UBOShadow.SHADOW_NEAR_FAR_LINEAR_SATURATION_INFO_OFFSET + 2] = linear;
        sv[_define.UBOShadow.SHADOW_NEAR_FAR_LINEAR_SATURATION_INFO_OFFSET + 3] = 1.0 - shadowInfo.saturation;
        sv[_define.UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 0] = shadowInfo.size.x;
        sv[_define.UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 1] = shadowInfo.size.y;
        sv[_define.UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 2] = shadowInfo.pcf;
        sv[_define.UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 3] = shadowInfo.bias;
        sv[_define.UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 0] = 0.0;
        sv[_define.UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 1] = packing;
        sv[_define.UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 2] = shadowInfo.normalBias;
        sv[_define.UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 3] = 0.0;
      } else if (mainLight && shadowInfo.type === _shadows.ShadowType.Planar) {
        (0, _sceneCulling.updatePlanarPROJ)(shadowInfo, mainLight, sv);
      }

      _index2.Color.toArray(sv, shadowInfo.shadowColor, _define.UBOShadow.SHADOW_COLOR_OFFSET);
    }
  }

  static updateShadowUBOLightView(pipeline, bufferView, light) {
    const device = pipeline.device;
    const shadowInfo = pipeline.pipelineSceneData.shadows;
    const sv = bufferView;
    const linear = 0.0;
    const packing = (0, _define.supportsFloatTexture)(device) ? 0.0 : 1.0;
    let near = 0.1;
    let far = 0;
    let matShadowView;
    let matShadowProj;
    let matShadowViewProj;

    switch (light.type) {
      case _light.LightType.DIRECTIONAL:
        if (!shadowInfo.fixedArea) {
          near = 0.1;
          far = shadowInfo.shadowCameraFar;
          matShadowView = shadowInfo.matShadowView;
          matShadowProj = shadowInfo.matShadowProj;
          matShadowViewProj = shadowInfo.matShadowViewProj;
        } else {
          _index2.Mat4.invert(_matShadowView, light.node.getWorldMatrix());

          matShadowView = _matShadowView;
          const x = shadowInfo.orthoSize;
          const y = shadowInfo.orthoSize;
          near = shadowInfo.near;
          far = shadowInfo.far;

          _index2.Mat4.ortho(_matShadowProj, -x, x, -y, y, near, far, device.capabilities.clipSpaceMinZ, device.capabilities.clipSpaceSignY);

          matShadowProj = _matShadowProj;

          _index2.Mat4.multiply(_matShadowViewProj, _matShadowProj, _matShadowView);

          matShadowViewProj = _matShadowViewProj;
        }

        _index2.Mat4.toArray(bufferView, matShadowView, _define.UBOShadow.MAT_LIGHT_VIEW_OFFSET);

        sv[_define.UBOShadow.SHADOW_PROJ_DEPTH_INFO_OFFSET + 0] = matShadowProj.m10;
        sv[_define.UBOShadow.SHADOW_PROJ_DEPTH_INFO_OFFSET + 1] = matShadowProj.m14;
        sv[_define.UBOShadow.SHADOW_PROJ_DEPTH_INFO_OFFSET + 2] = matShadowProj.m11;
        sv[_define.UBOShadow.SHADOW_PROJ_DEPTH_INFO_OFFSET + 3] = matShadowProj.m15;
        sv[_define.UBOShadow.SHADOW_PROJ_INFO_OFFSET + 0] = matShadowProj.m00;
        sv[_define.UBOShadow.SHADOW_PROJ_INFO_OFFSET + 1] = matShadowProj.m05;
        sv[_define.UBOShadow.SHADOW_PROJ_INFO_OFFSET + 2] = 1.0 / matShadowProj.m00;
        sv[_define.UBOShadow.SHADOW_PROJ_INFO_OFFSET + 3] = 1.0 / matShadowProj.m05;

        _index2.Mat4.toArray(bufferView, matShadowViewProj, _define.UBOShadow.MAT_LIGHT_VIEW_PROJ_OFFSET);

        _vec4ShadowInfo.set(near, far, linear, 1.0 - shadowInfo.saturation);

        _index2.Vec4.toArray(sv, _vec4ShadowInfo, _define.UBOShadow.SHADOW_NEAR_FAR_LINEAR_SATURATION_INFO_OFFSET);

        _vec4ShadowInfo.set(0.0, packing, shadowInfo.normalBias, 0.0);

        _index2.Vec4.toArray(sv, _vec4ShadowInfo, _define.UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET);

        break;

      case _light.LightType.SPOT:
        _index2.Mat4.invert(_matShadowView, light.node.getWorldMatrix());

        _index2.Mat4.toArray(sv, _matShadowView, _define.UBOShadow.MAT_LIGHT_VIEW_OFFSET);

        _index2.Mat4.perspective(_matShadowProj, light.angle, light.aspect, 0.001, light.range);

        _index2.Mat4.multiply(_matShadowViewProj, _matShadowProj, _matShadowView);

        _index2.Mat4.toArray(sv, _matShadowViewProj, _define.UBOShadow.MAT_LIGHT_VIEW_PROJ_OFFSET);

        _vec4ShadowInfo.set(0.01, light.range, linear, 1.0 - shadowInfo.saturation);

        _index2.Vec4.toArray(sv, _vec4ShadowInfo, _define.UBOShadow.SHADOW_NEAR_FAR_LINEAR_SATURATION_INFO_OFFSET);

        _vec4ShadowInfo.set(1.0, packing, shadowInfo.normalBias, 0.0);

        _index2.Vec4.toArray(sv, _vec4ShadowInfo, _define.UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET);

        break;

      default:
    }

    _vec4ShadowInfo.set(shadowInfo.size.x, shadowInfo.size.y, shadowInfo.pcf, shadowInfo.bias);

    _index2.Vec4.toArray(sv, _vec4ShadowInfo, _define.UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET);

    _index2.Color.toArray(sv, shadowInfo.shadowColor, _define.UBOShadow.SHADOW_COLOR_OFFSET);
  }

  /**
   *|combinedSignY|clipSpaceSignY|screenSpaceSignY| Backends |
   *|    :--:     |    :--:      |      :--:      |   :--:   |
   *|      0      |      -1      |      -1        |  Vulkan  |
   *|      1      |       1      |      -1        |  Metal   |
   *|      2      |      -1      |       1        |          |
   *|      3      |       1      |       1        |  GL-like |
   */
  static getCombineSignY() {
    return PipelineUBO._combineSignY;
  }

  _initCombineSignY() {
    const device = this._device;
    PipelineUBO._combineSignY = device.capabilities.screenSpaceSignY * 0.5 + 0.5 << 1 | device.capabilities.clipSpaceSignY * 0.5 + 0.5;
  }

  activate(device, pipeline) {
    this._device = device;
    this._pipeline = pipeline;
    const ds = this._pipeline.descriptorSet;

    this._initCombineSignY();

    const globalUBO = device.createBuffer(new _index.BufferInfo(_index.BufferUsageBit.UNIFORM | _index.BufferUsageBit.TRANSFER_DST, _index.MemoryUsageBit.HOST | _index.MemoryUsageBit.DEVICE, _define.UBOGlobal.SIZE, _define.UBOGlobal.SIZE));
    ds.bindBuffer(_define.UBOGlobal.BINDING, globalUBO);
    const cameraUBO = device.createBuffer(new _index.BufferInfo(_index.BufferUsageBit.UNIFORM | _index.BufferUsageBit.TRANSFER_DST, _index.MemoryUsageBit.HOST | _index.MemoryUsageBit.DEVICE, _define.UBOCamera.SIZE, _define.UBOCamera.SIZE));
    ds.bindBuffer(_define.UBOCamera.BINDING, cameraUBO);
    const shadowUBO = device.createBuffer(new _index.BufferInfo(_index.BufferUsageBit.UNIFORM | _index.BufferUsageBit.TRANSFER_DST, _index.MemoryUsageBit.HOST | _index.MemoryUsageBit.DEVICE, _define.UBOShadow.SIZE, _define.UBOShadow.SIZE));
    ds.bindBuffer(_define.UBOShadow.BINDING, shadowUBO);
  }
  /**
   * @en Update all UBOs
   * @zh 更新全部 UBO。
   */


  updateGlobalUBO(window) {
    const globalDSManager = this._pipeline.globalDSManager;
    const ds = this._pipeline.descriptorSet;
    const cmdBuffer = this._pipeline.commandBuffers;
    ds.update();
    PipelineUBO.updateGlobalUBOView(window, this._globalUBO);
    cmdBuffer[0].updateBuffer(ds.getBuffer(_define.UBOGlobal.BINDING), this._globalUBO);
    globalDSManager.bindBuffer(_define.UBOGlobal.BINDING, ds.getBuffer(_define.UBOGlobal.BINDING));
    globalDSManager.update();
  }

  updateCameraUBO(camera) {
    const globalDSManager = this._pipeline.globalDSManager;
    const ds = this._pipeline.descriptorSet;
    const cmdBuffer = this._pipeline.commandBuffers;
    PipelineUBO.updateCameraUBOView(this._pipeline, this._cameraUBO, camera);
    cmdBuffer[0].updateBuffer(ds.getBuffer(_define.UBOCamera.BINDING), this._cameraUBO);
    globalDSManager.bindBuffer(_define.UBOCamera.BINDING, ds.getBuffer(_define.UBOCamera.BINDING));
    globalDSManager.update();
  }

  updateShadowUBO(camera) {
    const sceneData = this._pipeline.pipelineSceneData;
    const shadowInfo = sceneData.shadows;
    if (!shadowInfo.enabled) return;
    const ds = this._pipeline.descriptorSet;
    const cmdBuffer = this._pipeline.commandBuffers;
    const shadowFrameBufferMap = sceneData.shadowFrameBufferMap;
    const mainLight = camera.scene.mainLight;

    if (mainLight && shadowFrameBufferMap.has(mainLight)) {
      ds.bindTexture(_define.UNIFORM_SHADOWMAP_BINDING, shadowFrameBufferMap.get(mainLight).colorTextures[0]);
    }

    PipelineUBO.updateShadowUBOView(this._pipeline, this._shadowUBO, camera);
    ds.update();
    cmdBuffer[0].updateBuffer(ds.getBuffer(_define.UBOShadow.BINDING), this._shadowUBO);
  }

  updateShadowUBOLight(globalDS, light) {
    PipelineUBO.updateShadowUBOLightView(this._pipeline, this._shadowUBO, light);
    globalDS.bindTexture(_define.UNIFORM_SHADOWMAP_BINDING, _builtinResMgr.builtinResMgr.get('default-texture').getGFXTexture());
    globalDS.bindTexture(_define.UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING, _builtinResMgr.builtinResMgr.get('default-texture').getGFXTexture());
    globalDS.update();
    globalDS.getBuffer(_define.UBOShadow.BINDING).update(this._shadowUBO);
  }

  updateShadowUBORange(offset, data) {
    if (data instanceof _index2.Mat4) {
      _index2.Mat4.toArray(this._shadowUBO, data, offset);
    } else if (data instanceof _index2.Color) {
      _index2.Color.toArray(this._shadowUBO, data, offset);
    }
  }

  destroy() {}

}

exports.PipelineUBO = PipelineUBO;
PipelineUBO._combineSignY = 0;