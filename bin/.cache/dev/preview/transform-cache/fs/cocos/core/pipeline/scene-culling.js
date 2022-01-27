System.register("q-bundled:///fs/cocos/core/pipeline/scene-culling.js", ["../geometry/index.js", "../renderer/scene/camera.js", "../math/index.js", "../memop/index.js", "./define.js", "../renderer/scene/shadows.js"], function (_export, _context) {
  "use strict";

  var AABB, Frustum, intersect, Sphere, SKYBOX_FLAG, Vec2, Vec3, Mat4, Pool, UBOShadow, ShadowType, Shadows, _tempVec3, _dir_negate, _vec3_p, _shadowPos, _mat4_trans, _castLightViewBounds, _castWorldBounds, _castBoundsInited, _sphere, _cameraBoundingSphere, _validFrustum, _lightViewFrustum, _dirLightFrustum, _matShadowTrans, _matShadowView, _matShadowViewInv, _matShadowProj, _matShadowViewProj, _matShadowViewProjArbitaryPos, _matShadowViewProjArbitaryPosInv, _projPos, _texelSize, _projSnap, _snap, _focus, _ab, roPool, dirShadowPool, castShadowPool;

  function getRenderObject(model, camera) {
    var depth = 0;

    if (model.node) {
      Vec3.subtract(_tempVec3, model.node.worldPosition, camera.position);
      depth = Vec3.dot(_tempVec3, camera.forward);
    }

    var ro = roPool.alloc();
    ro.model = model;
    ro.depth = depth;
    return ro;
  }

  function getDirShadowRenderObject(model, camera) {
    var depth = 0;

    if (model.node) {
      Vec3.subtract(_tempVec3, model.node.worldPosition, camera.position);
      depth = Vec3.dot(_tempVec3, camera.forward);
    }

    var ro = dirShadowPool.alloc();
    ro.model = model;
    ro.depth = depth;
    return ro;
  }

  function getCastShadowRenderObject(model, camera) {
    var depth = 0;

    if (model.node) {
      Vec3.subtract(_tempVec3, model.node.worldPosition, camera.position);
      depth = Vec3.dot(_tempVec3, camera.forward);
    }

    var ro = castShadowPool.alloc();
    ro.model = model;
    ro.depth = depth;
    return ro;
  }

  function getShadowWorldMatrix(pipeline, rotation, dir, out) {
    var shadows = pipeline.pipelineSceneData.shadows;
    Vec3.negate(_dir_negate, dir);
    var distance = shadows.fixedSphere.radius * Shadows.COEFFICIENT_OF_EXPANSION;
    Vec3.multiplyScalar(_vec3_p, _dir_negate, distance);
    Vec3.add(_vec3_p, _vec3_p, shadows.fixedSphere.center);
    out.set(_vec3_p);
    Mat4.fromRT(_mat4_trans, rotation, _vec3_p);
    return _mat4_trans;
  }

  function updateSphereLight(pipeline, light) {
    var shadows = pipeline.pipelineSceneData.shadows;
    var pos = light.node.worldPosition;
    var n = shadows.normal;
    var d = shadows.distance + 0.001; // avoid z-fighting

    var NdL = Vec3.dot(n, pos);
    var lx = pos.x;
    var ly = pos.y;
    var lz = pos.z;
    var nx = n.x;
    var ny = n.y;
    var nz = n.z;
    var m = shadows.matLight;
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
    pipeline.pipelineUBO.updateShadowUBORange(UBOShadow.MAT_LIGHT_PLANE_PROJ_OFFSET, shadows.matLight);
  }

  function updateDirLight(pipeline, light) {
    var shadows = pipeline.pipelineSceneData.shadows;
    var dir = light.direction;
    var n = shadows.normal;
    var d = shadows.distance + 0.001; // avoid z-fighting

    var NdL = Vec3.dot(n, dir);
    var scale = 1 / NdL;
    var lx = dir.x * scale;
    var ly = dir.y * scale;
    var lz = dir.z * scale;
    var nx = n.x;
    var ny = n.y;
    var nz = n.z;
    var m = shadows.matLight;
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
    pipeline.pipelineUBO.updateShadowUBORange(UBOShadow.MAT_LIGHT_PLANE_PROJ_OFFSET, shadows.matLight);
  }

  function updatePlanarPROJ(shadowInfo, light, shadowUBO) {
    var dir = light.direction;
    var n = shadowInfo.normal;
    var d = shadowInfo.distance + 0.001; // avoid z-fighting

    var NdL = Vec3.dot(n, dir);
    var scale = 1 / NdL;
    var lx = dir.x * scale;
    var ly = dir.y * scale;
    var lz = dir.z * scale;
    var nx = n.x;
    var ny = n.y;
    var nz = n.z;
    var m = shadowInfo.matLight;
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
    Mat4.toArray(shadowUBO, m, UBOShadow.MAT_LIGHT_PLANE_PROJ_OFFSET);
  }

  function validPunctualLightsCulling(pipeline, camera) {
    var sceneData = pipeline.pipelineSceneData;
    var validPunctualLights = sceneData.validPunctualLights;
    validPunctualLights.length = 0;
    var _ref = camera.scene,
        spotLights = _ref.spotLights;

    for (var i = 0; i < spotLights.length; i++) {
      var light = spotLights[i];

      if (light.baked) {
        continue;
      }

      Sphere.set(_sphere, light.position.x, light.position.y, light.position.z, light.range);

      if (intersect.sphereFrustum(_sphere, camera.frustum)) {
        validPunctualLights.push(light);
      }
    }

    var _ref2 = camera.scene,
        sphereLights = _ref2.sphereLights;

    for (var _i = 0; _i < sphereLights.length; _i++) {
      var _light = sphereLights[_i];

      if (_light.baked) {
        continue;
      }

      Sphere.set(_sphere, _light.position.x, _light.position.y, _light.position.z, _light.range);

      if (intersect.sphereFrustum(_sphere, camera.frustum)) {
        validPunctualLights.push(_light);
      }
    }
  }

  function getCameraWorldMatrix(out, camera) {
    if (!camera.node) {
      return;
    }

    var cameraNode = camera.node;
    var position = cameraNode.getWorldPosition();
    var rotation = cameraNode.getWorldRotation();
    Mat4.fromRT(out, rotation, position);
    out.m08 *= -1.0;
    out.m09 *= -1.0;
    out.m10 *= -1.0;
  }

  function QuantizeDirLightShadowCamera(out, pipeline, dirLight, camera, shadowInfo) {
    var device = pipeline.device;
    var invisibleOcclusionRange = shadowInfo.invisibleOcclusionRange;
    var shadowMapWidth = shadowInfo.size.x; // Raw data

    getCameraWorldMatrix(_mat4_trans, camera);
    Frustum.split(_validFrustum, camera, _mat4_trans, 0.1, shadowInfo.shadowDistance);
    _lightViewFrustum = Frustum.clone(_validFrustum); // view matrix with range back

    Mat4.fromRT(_matShadowTrans, dirLight.node.rotation, _focus);
    Mat4.invert(_matShadowView, _matShadowTrans);
    Mat4.invert(_matShadowViewInv, _matShadowView);

    var shadowViewArbitaryPos = _matShadowView.clone();

    _lightViewFrustum.transform(_matShadowView); // bounding box in light space


    AABB.fromPoints(_castLightViewBounds, new Vec3(10000000, 10000000, 10000000), new Vec3(-10000000, -10000000, -10000000));

    _castLightViewBounds.mergeFrustum(_lightViewFrustum);

    var r = _castLightViewBounds.halfExtents.z * 2.0;

    _shadowPos.set(_castLightViewBounds.center.x, _castLightViewBounds.center.y, _castLightViewBounds.center.z + _castLightViewBounds.halfExtents.z + invisibleOcclusionRange);

    Vec3.transformMat4(_shadowPos, _shadowPos, _matShadowViewInv);
    Mat4.fromRT(_matShadowTrans, dirLight.node.rotation, _shadowPos);
    Mat4.invert(_matShadowView, _matShadowTrans);
    Mat4.invert(_matShadowViewInv, _matShadowView); // calculate projection matrix params
    // min value may lead to some shadow leaks

    var orthoSizeMin = Vec3.distance(_validFrustum.vertices[0], _validFrustum.vertices[6]); // max value is accurate but poor usage for shadowmap

    _cameraBoundingSphere.center.set(0, 0, 0);

    _cameraBoundingSphere.radius = -1.0;

    _cameraBoundingSphere.mergePoints(_validFrustum.vertices);

    var orthoSizeMax = _cameraBoundingSphere.radius * 2.0; // use lerp(min, accurate_max) to save shadowmap usage

    var orthoSize = orthoSizeMin * 0.8 + orthoSizeMax * 0.2;
    shadowInfo.shadowCameraFar = r + invisibleOcclusionRange; // snap to whole texels

    var halfOrthoSize = orthoSize * 0.5;
    Mat4.ortho(_matShadowProj, -halfOrthoSize, halfOrthoSize, -halfOrthoSize, halfOrthoSize, 0.1, shadowInfo.shadowCameraFar, device.capabilities.clipSpaceMinZ, device.capabilities.clipSpaceSignY);

    if (shadowMapWidth > 0.0) {
      Mat4.multiply(_matShadowViewProjArbitaryPos, _matShadowProj, shadowViewArbitaryPos);
      Vec3.transformMat4(_projPos, _shadowPos, _matShadowViewProjArbitaryPos);
      var invActualSize = 2.0 / shadowMapWidth;

      _texelSize.set(invActualSize, invActualSize);

      var modX = _projPos.x % _texelSize.x;
      var modY = _projPos.y % _texelSize.y;

      _projSnap.set(_projPos.x - modX, _projPos.y - modY, _projPos.z);

      Mat4.invert(_matShadowViewProjArbitaryPosInv, _matShadowViewProjArbitaryPos);
      Vec3.transformMat4(_snap, _projSnap, _matShadowViewProjArbitaryPosInv);
      Mat4.fromRT(_matShadowTrans, dirLight.node.rotation, _snap);
      Mat4.invert(_matShadowView, _matShadowTrans);
      Mat4.invert(_matShadowViewInv, _matShadowView);
      Frustum.createOrtho(out, orthoSize, orthoSize, 0.1, shadowInfo.shadowCameraFar, _matShadowViewInv);
    } else {
      for (var i = 0; i < 8; i++) {
        out.vertices[i].set(0.0, 0.0, 0.0);
      }

      out.updatePlanes();
    }

    Mat4.multiply(_matShadowViewProj, _matShadowProj, _matShadowView);
    shadowInfo.matShadowView = _matShadowView;
    shadowInfo.matShadowProj = _matShadowProj;
    shadowInfo.matShadowViewProj = _matShadowViewProj;
  }

  function sceneCulling(pipeline, camera) {
    var scene = camera.scene;
    var mainLight = scene.mainLight;
    var sceneData = pipeline.pipelineSceneData;
    var shadows = sceneData.shadows;
    var skybox = sceneData.skybox;
    var renderObjects = sceneData.renderObjects;
    roPool.freeArray(renderObjects);
    renderObjects.length = 0;
    var castShadowObjects = sceneData.castShadowObjects;
    castShadowPool.freeArray(castShadowObjects);
    castShadowObjects.length = 0;
    _castBoundsInited = false;
    var dirShadowObjects = null;

    if (shadows.enabled) {
      pipeline.pipelineUBO.updateShadowUBORange(UBOShadow.SHADOW_COLOR_OFFSET, shadows.shadowColor);

      if (shadows.type === ShadowType.ShadowMap) {
        dirShadowObjects = pipeline.pipelineSceneData.dirShadowObjects;
        dirShadowPool.freeArray(dirShadowObjects);
        dirShadowObjects.length = 0; // update dirLightFrustum

        if (mainLight && mainLight.node) {
          QuantizeDirLightShadowCamera(_dirLightFrustum, pipeline, mainLight, camera, shadows);
        } else {
          for (var i = 0; i < 8; i++) {
            _dirLightFrustum.vertices[i].set(0.0, 0.0, 0.0);
          }

          _dirLightFrustum.updatePlanes();
        }
      }
    }

    if (mainLight) {
      if (shadows.type === ShadowType.Planar) {
        updateDirLight(pipeline, mainLight);
      }
    }

    if (skybox.enabled && skybox.model && camera.clearFlag & SKYBOX_FLAG) {
      renderObjects.push(getRenderObject(skybox.model, camera));
    }

    var models = scene.models;
    var visibility = camera.visibility;

    for (var _i2 = 0; _i2 < models.length; _i2++) {
      var model = models[_i2]; // filter model by view visibility

      if (model.enabled) {
        if (model.castShadow) {
          castShadowObjects.push(getCastShadowRenderObject(model, camera));
        }

        if (shadows.firstSetCSM && model.worldBounds) {
          if (!_castBoundsInited) {
            _castWorldBounds.copy(model.worldBounds);

            _castBoundsInited = true;
          }

          AABB.merge(_castWorldBounds, _castWorldBounds, model.worldBounds);
        }

        if (model.node && (visibility & model.node.layer) === model.node.layer || visibility & model.visFlags) {
          // shadow render Object
          if (dirShadowObjects != null && model.castShadow && model.worldBounds) {
            // frustum culling
            if (shadows.fixedArea) {
              AABB.transform(_ab, model.worldBounds, shadows.matLight);

              if (intersect.aabbFrustum(_ab, camera.frustum)) {
                dirShadowObjects.push(getDirShadowRenderObject(model, camera));
              }
            } else {
              // eslint-disable-next-line no-lonely-if
              if (intersect.aabbFrustum(model.worldBounds, _dirLightFrustum)) {
                dirShadowObjects.push(getDirShadowRenderObject(model, camera));
              }
            }
          } // frustum culling


          if (model.worldBounds && !intersect.aabbFrustum(model.worldBounds, camera.frustum)) {
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

  _export({
    getShadowWorldMatrix: getShadowWorldMatrix,
    updatePlanarPROJ: updatePlanarPROJ,
    validPunctualLightsCulling: validPunctualLightsCulling,
    getCameraWorldMatrix: getCameraWorldMatrix,
    QuantizeDirLightShadowCamera: QuantizeDirLightShadowCamera,
    sceneCulling: sceneCulling
  });

  return {
    setters: [function (_geometryIndexJs) {
      AABB = _geometryIndexJs.AABB;
      Frustum = _geometryIndexJs.Frustum;
      intersect = _geometryIndexJs.intersect;
      Sphere = _geometryIndexJs.Sphere;
    }, function (_rendererSceneCameraJs) {
      SKYBOX_FLAG = _rendererSceneCameraJs.SKYBOX_FLAG;
    }, function (_mathIndexJs) {
      Vec2 = _mathIndexJs.Vec2;
      Vec3 = _mathIndexJs.Vec3;
      Mat4 = _mathIndexJs.Mat4;
    }, function (_memopIndexJs) {
      Pool = _memopIndexJs.Pool;
    }, function (_defineJs) {
      UBOShadow = _defineJs.UBOShadow;
    }, function (_rendererSceneShadowsJs) {
      ShadowType = _rendererSceneShadowsJs.ShadowType;
      Shadows = _rendererSceneShadowsJs.Shadows;
    }],
    execute: function () {
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
      _tempVec3 = new Vec3();
      _dir_negate = new Vec3();
      _vec3_p = new Vec3();
      _shadowPos = new Vec3();
      _mat4_trans = new Mat4();
      _castLightViewBounds = new AABB();
      _castWorldBounds = new AABB();
      _castBoundsInited = false;
      _sphere = Sphere.create(0, 0, 0, 1);
      _cameraBoundingSphere = new Sphere();
      _validFrustum = new Frustum();
      _validFrustum.accurate = true;
      _lightViewFrustum = new Frustum();
      _lightViewFrustum.accurate = true;
      _dirLightFrustum = new Frustum();
      _matShadowTrans = new Mat4();
      _matShadowView = new Mat4();
      _matShadowViewInv = new Mat4();
      _matShadowProj = new Mat4();
      _matShadowViewProj = new Mat4();
      _matShadowViewProjArbitaryPos = new Mat4();
      _matShadowViewProjArbitaryPosInv = new Mat4();
      _projPos = new Vec3();
      _texelSize = new Vec2();
      _projSnap = new Vec3();
      _snap = new Vec3();
      _focus = new Vec3(0, 0, 0);
      _ab = new AABB();
      roPool = new Pool(function () {
        return {
          model: null,
          depth: 0
        };
      }, 128);
      dirShadowPool = new Pool(function () {
        return {
          model: null,
          depth: 0
        };
      }, 128);
      castShadowPool = new Pool(function () {
        return {
          model: null,
          depth: 0
        };
      }, 128);
    }
  };
});