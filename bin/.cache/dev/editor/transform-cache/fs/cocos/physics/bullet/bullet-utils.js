"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cocos2BulletVec3 = cocos2BulletVec3;
exports.bullet2CocosVec3 = bullet2CocosVec3;
exports.cocos2BulletQuat = cocos2BulletQuat;
exports.bullet2CocosQuat = bullet2CocosQuat;
exports.cocos2BulletTriMesh = cocos2BulletTriMesh;

var _index = require("../../core/gfx/index.js");

var _instantiated = require("./instantiated.js");

var _bulletCache = require("./bullet-cache.js");

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
function cocos2BulletVec3(out, v) {
  _instantiated.bt.Vec3_set(out, v.x, v.y, v.z);

  return out;
}

function bullet2CocosVec3(out, v) {
  out.x = _instantiated.bt.Vec3_x(v);
  out.y = _instantiated.bt.Vec3_y(v);
  out.z = _instantiated.bt.Vec3_z(v);
  return out;
}

function cocos2BulletQuat(out, q) {
  _instantiated.bt.Quat_set(out, q.x, q.y, q.z, q.w);

  return out;
}

function bullet2CocosQuat(out, q) {
  out.x = _instantiated.bt.Quat_x(q);
  out.y = _instantiated.bt.Quat_y(q);
  out.z = _instantiated.bt.Quat_z(q);
  out.w = _instantiated.bt.Quat_w(q);
  return out;
}

function cocos2BulletTriMesh(out, mesh) {
  const len = mesh.renderingSubMeshes.length;

  for (let i = 0; i < len; i++) {
    const subMesh = mesh.renderingSubMeshes[i];
    const geoInfo = subMesh.geometricInfo;

    if (geoInfo) {
      const primitiveMode = subMesh.primitiveMode;
      const vb = geoInfo.positions;
      const ib = geoInfo.indices;
      const v0 = _bulletCache.BulletCache.instance.BT_V3_0;
      const v1 = _bulletCache.BulletCache.instance.BT_V3_1;
      const v2 = _bulletCache.BulletCache.instance.BT_V3_2;

      if (primitiveMode === _index.PrimitiveMode.TRIANGLE_LIST) {
        const cnt = ib.length;

        for (let j = 0; j < cnt; j += 3) {
          const i0 = ib[j] * 3;
          const i1 = ib[j + 1] * 3;
          const i2 = ib[j + 2] * 3;

          _instantiated.bt.Vec3_set(v0, vb[i0], vb[i0 + 1], vb[i0 + 2]);

          _instantiated.bt.Vec3_set(v1, vb[i1], vb[i1 + 1], vb[i1 + 2]);

          _instantiated.bt.Vec3_set(v2, vb[i2], vb[i2 + 1], vb[i2 + 2]);

          _instantiated.bt.TriangleMesh_addTriangle(out, v0, v1, v2);
        }
      } else if (primitiveMode === _index.PrimitiveMode.TRIANGLE_STRIP) {
        const cnt = ib.length - 2;
        let rev = 0;

        for (let j = 0; j < cnt; j += 1) {
          const i0 = ib[j - rev] * 3;
          const i1 = ib[j + rev + 1] * 3;
          const i2 = ib[j + 2] * 3;
          rev = ~rev;

          _instantiated.bt.Vec3_set(v0, vb[i0], vb[i0 + 1], vb[i0 + 2]);

          _instantiated.bt.Vec3_set(v1, vb[i1], vb[i1 + 1], vb[i1 + 2]);

          _instantiated.bt.Vec3_set(v2, vb[i2], vb[i2 + 1], vb[i2 + 2]);

          _instantiated.bt.TriangleMesh_addTriangle(out, v0, v1, v2);
        }
      } else if (primitiveMode === _index.PrimitiveMode.TRIANGLE_FAN) {
        const cnt = ib.length - 1;
        const i0 = ib[0] * 3;

        _instantiated.bt.Vec3_set(v0, vb[i0], vb[i0 + 1], vb[i0 + 2]);

        for (let j = 1; j < cnt; j += 1) {
          const i1 = ib[j] * 3;
          const i2 = ib[j + 1] * 3;

          _instantiated.bt.Vec3_set(v1, vb[i1], vb[i1 + 1], vb[i1 + 2]);

          _instantiated.bt.Vec3_set(v2, vb[i2], vb[i2 + 1], vb[i2 + 2]);

          _instantiated.bt.TriangleMesh_addTriangle(out, v0, v1, v2);
        }
      }
    }
  }

  return out;
}