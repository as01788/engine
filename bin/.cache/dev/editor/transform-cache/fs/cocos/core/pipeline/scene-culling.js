"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getShadowWorldMatrix = getShadowWorldMatrix;
exports.updatePlanarPROJ = updatePlanarPROJ;
exports.validPunctualLightsCulling = validPunctualLightsCulling;
exports.getCameraWorldMatrix = getCameraWorldMatrix;
exports.QuantizeDirLightShadowCamera = QuantizeDirLightShadowCamera;
exports.sceneCulling = sceneCulling;

var _index = require("../geometry/index.js");

var _camera = require("../renderer/scene/camera.js");

var _index2 = require("../math/index.js");

var _index3 = require("../memop/index.js");

var _define = require("./define.js");

var _shadows = require("../renderer/scene/shadows.js");

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
 * @packageDocumentation
 * @hidden
 */
const _tempVec3 = new _index2.Vec3();

const _dir_negate = new _index2.Vec3();

const _vec3_p = new _index2.Vec3();

const _shadowPos = new _index2.Vec3();

const _mat4_trans = new _index2.Mat4();

const _castLightViewBounds = new _index.AABB();

const _castWorldBounds = new _index.AABB();

let _castBoundsInited = false;

const _sphere = _index.Sphere.create(0, 0, 0, 1);

const _cameraBoundingSphere = new _index.Sphere();

const _validFrustum = new _index.Frustum();

_validFrustum.accurate = true;

let _lightViewFrustum = new _index.Frustum();

_lightViewFrustum.accurate = true;

const _dirLightFrustum = new _index.Frustum();

const _matShadowTrans = new _index2.Mat4();

const _matShadowView = new _index2.Mat4();

const _matShadowViewInv = new _index2.Mat4();

const _matShadowProj = new _index2.Mat4();

const _matShadowViewProj = new _index2.Mat4();

const _matShadowViewProjArbitaryPos = new _index2.Mat4();

const _matShadowViewProjArbitaryPosInv = new _index2.Mat4();

const _projPos = new _index2.Vec3();

const _texelSize = new _index2.Vec2();

const _projSnap = new _index2.Vec3();

const _snap = new _index2.Vec3();

const _focus = new _index2.Vec3(0, 0, 0);

const _ab = new _index.AABB();

const roPool = new _index3.Pool(() => ({
  model: null,
  depth: 0
}), 128);
const dirShadowPool = new _index3.Pool(() => ({
  model: null,
  depth: 0
}), 128);
const castShadowPool = new _index3.Pool(() => ({
  model: null,
  depth: 0
}), 128);

function getRenderObject(model, camera) {
  let depth = 0;

  if (model.node) {
    _index2.Vec3.subtract(_tempVec3, model.node.worldPosition, camera.position);

    depth = _index2.Vec3.dot(_tempVec3, camera.forward);
  }

  const ro = roPool.alloc();
  ro.model = model;
  ro.depth = depth;
  return ro;
}

function getDirShadowRenderObject(model, camera) {
  let depth = 0;

  if (model.node) {
    _index2.Vec3.subtract(_tempVec3, model.node.worldPosition, camera.position);

    depth = _index2.Vec3.dot(_tempVec3, camera.forward);
  }

  const ro = dirShadowPool.alloc();
  ro.model = model;
  ro.depth = depth;
  return ro;
}

function getCastShadowRenderObject(model, camera) {
  let depth = 0;

  if (model.node) {
    _index2.Vec3.subtract(_tempVec3, model.node.worldPosition, camera.position);

    depth = _index2.Vec3.dot(_tempVec3, camera.forward);
  }

  const ro = castShadowPool.alloc();
  ro.model = model;
  ro.depth = depth;
  return ro;
}

function getShadowWorldMatrix(pipeline, rotation, dir, out) {
  const shadows = pipeline.pipelineSceneData.shadows;

  _index2.Vec3.negate(_dir_negate, dir);

  const distance = shadows.fixedSphere.radius * _shadows.Shadows.COEFFICIENT_OF_EXPANSION;

  _index2.Vec3.multiplyScalar(_vec3_p, _dir_negate, distance);

  _index2.Vec3.add(_vec3_p, _vec3_p, shadows.fixedSphere.center);

  out.set(_vec3_p);

  _index2.Mat4.fromRT(_mat4_trans, rotation, _vec3_p);

  return _mat4_trans;
}

function updateSphereLight(pipeline, light) {
  const shadows = pipeline.pipelineSceneData.shadows;
  const pos = light.node.worldPosition;
  const n = shadows.normal;
  const d = shadows.distance + 0.001; // avoid z-fighting

  const NdL = _index2.Vec3.dot(n, pos);

  const lx = pos.x;
  const ly = pos.y;
  const lz = pos.z;
  const nx = n.x;
  const ny = n.y;
  const nz = n.z;
  const m = shadows.matLight;
  m.m00 = NdL - d - lx * nx;
  m.m01 = -ly * nx;
  m.m02 = -lz * nx;
  m.m03 = -nx;
  m.m04 = -lx * ny;
  m.m05 = NdL - d - ly * ny;
  m.m06 = -lz * ny;
  m.m07 = -ny;
  m.m08 = -lx * nz;
  m.m09 = -ly * nz;
  m.m10 = NdL - d - lz * nz;
  m.m11 = -nz;
  m.m12 = lx * d;
  m.m13 = ly * d;
  m.m14 = lz * d;
  m.m15 = NdL;
  pipeline.pipelineUBO.updateShadowUBORange(_define.UBOShadow.MAT_LIGHT_PLANE_PROJ_OFFSET, shadows.matLight);
}

function updateDirLight(pipeline, light) {
  const shadows = pipeline.pipelineSceneData.shadows;
  const dir = light.direction;
  const n = shadows.normal;
  const d = shadows.distance + 0.001; // avoid z-fighting

  const NdL = _index2.Vec3.dot(n, dir);

  const scale = 1 / NdL;
  const lx = dir.x * scale;
  const ly = dir.y * scale;
  const lz = dir.z * scale;
  const nx = n.x;
  const ny = n.y;
  const nz = n.z;
  const m = shadows.matLight;
  m.m00 = 1 - nx * lx;
  m.m01 = -nx * ly;
  m.m02 = -nx * lz;
  m.m03 = 0;
  m.m04 = -ny * lx;
  m.m05 = 1 - ny * ly;
  m.m06 = -ny * lz;
  m.m07 = 0;
  m.m08 = -nz * lx;
  m.m09 = -nz * ly;
  m.m10 = 1 - nz * lz;
  m.m11 = 0;
  m.m12 = lx * d;
  m.m13 = ly * d;
  m.m14 = lz * d;
  m.m15 = 1;
  pipeline.pipelineUBO.updateShadowUBORange(_define.UBOShadow.MAT_LIGHT_PLANE_PROJ_OFFSET, shadows.matLight);
}

function updatePlanarPROJ(shadowInfo, light, shadowUBO) {
  const dir = light.direction;
  const n = shadowInfo.normal;
  const d = shadowInfo.distance + 0.001; // avoid z-fighting

  const NdL = _index2.Vec3.dot(n, dir);

  const scale = 1 / NdL;
  const lx = dir.x * scale;
  const ly = dir.y * scale;
  const lz = dir.z * scale;
  const nx = n.x;
  const ny = n.y;
  const nz = n.z;
  const m = shadowInfo.matLight;
  m.m00 = 1 - nx * lx;
  m.m01 = -nx * ly;
  m.m02 = -nx * lz;
  m.m03 = 0;
  m.m04 = -ny * lx;
  m.m05 = 1 - ny * ly;
  m.m06 = -ny * lz;
  m.m07 = 0;
  m.m08 = -nz * lx;
  m.m09 = -nz * ly;
  m.m10 = 1 - nz * lz;
  m.m11 = 0;
  m.m12 = lx * d;
  m.m13 = ly * d;
  m.m14 = lz * d;
  m.m15 = 1;

  _index2.Mat4.toArray(shadowUBO, m, _define.UBOShadow.MAT_LIGHT_PLANE_PROJ_OFFSET);
}

function validPunctualLightsCulling(pipeline, camera) {
  const sceneData = pipeline.pipelineSceneData;
  const validPunctualLights = sceneData.validPunctualLights;
  validPunctualLights.length = 0;
  const {
    spotLights
  } = camera.scene;

  for (let i = 0; i < spotLights.length; i++) {
    const light = spotLights[i];

    if (light.baked) {
      continue;
    }

    _index.Sphere.set(_sphere, light.position.x, light.position.y, light.position.z, light.range);

    if (_index.intersect.sphereFrustum(_sphere, camera.frustum)) {
      validPunctualLights.push(light);
    }
  }

  const {
    sphereLights
  } = camera.scene;

  for (let i = 0; i < sphereLights.length; i++) {
    const light = sphereLights[i];

    if (light.baked) {
      continue;
    }

    _index.Sphere.set(_sphere, light.position.x, light.position.y, light.position.z, light.range);

    if (_index.intersect.sphereFrustum(_sphere, camera.frustum)) {
      validPunctualLights.push(light);
    }
  }
}

function getCameraWorldMatrix(out, camera) {
  if (!camera.node) {
    return;
  }

  const cameraNode = camera.node;
  const position = cameraNode.getWorldPosition();
  const rotation = cameraNode.getWorldRotation();

  _index2.Mat4.fromRT(out, rotation, position);

  out.m08 *= -1.0;
  out.m09 *= -1.0;
  out.m10 *= -1.0;
}

function QuantizeDirLightShadowCamera(out, pipeline, dirLight, camera, shadowInfo) {
  const device = pipeline.device;
  const invisibleOcclusionRange = shadowInfo.invisibleOcclusionRange;
  const shadowMapWidth = shadowInfo.size.x; // Raw data

  getCameraWorldMatrix(_mat4_trans, camera);

  _index.Frustum.split(_validFrustum, camera, _mat4_trans, 0.1, shadowInfo.shadowDistance);

  _lightViewFrustum = _index.Frustum.clone(_validFrustum); // view matrix with range back

  _index2.Mat4.fromRT(_matShadowTrans, dirLight.node.rotation, _focus);

  _index2.Mat4.invert(_matShadowView, _matShadowTrans);

  _index2.Mat4.invert(_matShadowViewInv, _matShadowView);

  const shadowViewArbitaryPos = _matShadowView.clone();

  _lightViewFrustum.transform(_matShadowView); // bounding box in light space


  _index.AABB.fromPoints(_castLightViewBounds, new _index2.Vec3(10000000, 10000000, 10000000), new _index2.Vec3(-10000000, -10000000, -10000000));

  _castLightViewBounds.mergeFrustum(_lightViewFrustum);

  const r = _castLightViewBounds.halfExtents.z * 2.0;

  _shadowPos.set(_castLightViewBounds.center.x, _castLightViewBounds.center.y, _castLightViewBounds.center.z + _castLightViewBounds.halfExtents.z + invisibleOcclusionRange);

  _index2.Vec3.transformMat4(_shadowPos, _shadowPos, _matShadowViewInv);

  _index2.Mat4.fromRT(_matShadowTrans, dirLight.node.rotation, _shadowPos);

  _index2.Mat4.invert(_matShadowView, _matShadowTrans);

  _index2.Mat4.invert(_matShadowViewInv, _matShadowView); // calculate projection matrix params
  // min value may lead to some shadow leaks


  const orthoSizeMin = _index2.Vec3.distance(_validFrustum.vertices[0], _validFrustum.vertices[6]); // max value is accurate but poor usage for shadowmap


  _cameraBoundingSphere.center.set(0, 0, 0);

  _cameraBoundingSphere.radius = -1.0;

  _cameraBoundingSphere.mergePoints(_validFrustum.vertices);

  const orthoSizeMax = _cameraBoundingSphere.radius * 2.0; // use lerp(min, accurate_max) to save shadowmap usage

  const orthoSize = orthoSizeMin * 0.8 + orthoSizeMax * 0.2;
  shadowInfo.shadowCameraFar = r + invisibleOcclusionRange; // snap to whole texels

  const halfOrthoSize = orthoSize * 0.5;

  _index2.Mat4.ortho(_matShadowProj, -halfOrthoSize, halfOrthoSize, -halfOrthoSize, halfOrthoSize, 0.1, shadowInfo.shadowCameraFar, device.capabilities.clipSpaceMinZ, device.capabilities.clipSpaceSignY);

  if (shadowMapWidth > 0.0) {
    _index2.Mat4.multiply(_matShadowViewProjArbitaryPos, _matShadowProj, shadowViewArbitaryPos);

    _index2.Vec3.transformMat4(_projPos, _shadowPos, _matShadowViewProjArbitaryPos);

    const invActualSize = 2.0 / shadowMapWidth;

    _texelSize.set(invActualSize, invActualSize);

    const modX = _projPos.x % _texelSize.x;
    const modY = _projPos.y % _texelSize.y;

    _projSnap.set(_projPos.x - modX, _projPos.y - modY, _projPos.z);

    _index2.Mat4.invert(_matShadowViewProjArbitaryPosInv, _matShadowViewProjArbitaryPos);

    _index2.Vec3.transformMat4(_snap, _projSnap, _matShadowViewProjArbitaryPosInv);

    _index2.Mat4.fromRT(_matShadowTrans, dirLight.node.rotation, _snap);

    _index2.Mat4.invert(_matShadowView, _matShadowTrans);

    _index2.Mat4.invert(_matShadowViewInv, _matShadowView);

    _index.Frustum.createOrtho(out, orthoSize, orthoSize, 0.1, shadowInfo.shadowCameraFar, _matShadowViewInv);
  } else {
    for (let i = 0; i < 8; i++) {
      out.vertices[i].set(0.0, 0.0, 0.0);
    }

    out.updatePlanes();
  }

  _index2.Mat4.multiply(_matShadowViewProj, _matShadowProj, _matShadowView);

  shadowInfo.matShadowView = _matShadowView;
  shadowInfo.matShadowProj = _matShadowProj;
  shadowInfo.matShadowViewProj = _matShadowViewProj;
}

function sceneCulling(pipeline, camera) {
  const scene = camera.scene;
  const mainLight = scene.mainLight;
  const sceneData = pipeline.pipelineSceneData;
  const shadows = sceneData.shadows;
  const skybox = sceneData.skybox;
  const renderObjects = sceneData.renderObjects;
  roPool.freeArray(renderObjects);
  renderObjects.length = 0;
  const castShadowObjects = sceneData.castShadowObjects;
  castShadowPool.freeArray(castShadowObjects);
  castShadowObjects.length = 0;
  _castBoundsInited = false;
  let dirShadowObjects = null;

  if (shadows.enabled) {
    pipeline.pipelineUBO.updateShadowUBORange(_define.UBOShadow.SHADOW_COLOR_OFFSET, shadows.shadowColor);

    if (shadows.type === _shadows.ShadowType.ShadowMap) {
      dirShadowObjects = pipeline.pipelineSceneData.dirShadowObjects;
      dirShadowPool.freeArray(dirShadowObjects);
      dirShadowObjects.length = 0; // update dirLightFrustum

      if (mainLight && mainLight.node) {
        QuantizeDirLightShadowCamera(_dirLightFrustum, pipeline, mainLight, camera, shadows);
      } else {
        for (let i = 0; i < 8; i++) {
          _dirLightFrustum.vertices[i].set(0.0, 0.0, 0.0);
        }

        _dirLightFrustum.updatePlanes();
      }
    }
  }

  if (mainLight) {
    if (shadows.type === _shadows.ShadowType.Planar) {
      updateDirLight(pipeline, mainLight);
    }
  }

  if (skybox.enabled && skybox.model && camera.clearFlag & _camera.SKYBOX_FLAG) {
    renderObjects.push(getRenderObject(skybox.model, camera));
  }

  const models = scene.models;
  const visibility = camera.visibility;

  for (let i = 0; i < models.length; i++) {
    const model = models[i]; // filter model by view visibility

    if (model.enabled) {
      if (model.castShadow) {
        castShadowObjects.push(getCastShadowRenderObject(model, camera));
      }

      if (shadows.firstSetCSM && model.worldBounds) {
        if (!_castBoundsInited) {
          _castWorldBounds.copy(model.worldBounds);

          _castBoundsInited = true;
        }

        _index.AABB.merge(_castWorldBounds, _castWorldBounds, model.worldBounds);
      }

      if (model.node && (visibility & model.node.layer) === model.node.layer || visibility & model.visFlags) {
        // shadow render Object
        if (dirShadowObjects != null && model.castShadow && model.worldBounds) {
          // frustum culling
          if (shadows.fixedArea) {
            _index.AABB.transform(_ab, model.worldBounds, shadows.matLight);

            if (_index.intersect.aabbFrustum(_ab, camera.frustum)) {
              dirShadowObjects.push(getDirShadowRenderObject(model, camera));
            }
          } else {
            // eslint-disable-next-line no-lonely-if
            if (_index.intersect.aabbFrustum(model.worldBounds, _dirLightFrustum)) {
              dirShadowObjects.push(getDirShadowRenderObject(model, camera));
            }
          }
        } // frustum culling


        if (model.worldBounds && !_index.intersect.aabbFrustum(model.worldBounds, camera.frustum)) {
          continue;
        }

        renderObjects.push(getRenderObject(model, camera));
      }
    }
  } // FirstSetCSM flag Bit Control


  if (shadows.firstSetCSM) {
    shadows.shadowDistance = _castWorldBounds.halfExtents.length() * 2.0;
    shadows.firstSetCSM = false;
  }
}