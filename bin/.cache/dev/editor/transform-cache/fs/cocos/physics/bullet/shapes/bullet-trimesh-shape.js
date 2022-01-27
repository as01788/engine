"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletTrimeshShape = void 0;

var _bulletShape = require("./bullet-shape.js");

var _index = require("../../../core/index.js");

var _bulletUtils = require("../bullet-utils.js");

var _bulletCache = require("../bullet-cache.js");

var _instantiated = require("../instantiated.js");

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
class BulletTrimeshShape extends _bulletShape.BulletShape {
  constructor(...args) {
    super(...args);
    this.refBtTriangleMesh = 0;
  }

  get collider() {
    return this._collider;
  }

  setMesh(v) {
    if (!this._isInitialized) return;

    if (this._impl && _bulletCache.BulletCache.isNotEmptyShape(this._impl)) {
      // TODO: change the mesh after initialization
      (0, _index.warnID)(9620);
    } else {
      const mesh = v;

      if (mesh && mesh.renderingSubMeshes.length > 0) {
        const btTriangleMesh = this._getBtTriangleMesh(mesh);

        if (this.collider.convex) {
          this._impl = _instantiated.bt.ConvexTriangleMeshShape_new(btTriangleMesh);
        } else {
          this._impl = _instantiated.bt.BvhTriangleMeshShape_new(btTriangleMesh, true, true);
        }

        const bt_v3 = _bulletCache.BulletCache.instance.BT_V3_0;
        (0, _bulletUtils.cocos2BulletVec3)(bt_v3, this._collider.node.worldScale);

        _instantiated.bt.CollisionShape_setMargin(this._impl, 0.01);

        _instantiated.bt.CollisionShape_setLocalScaling(this._impl, bt_v3);

        this.setCompound(this._compound);
        this.updateByReAdd();
        this.setWrapper();
      } else {
        this._impl = _instantiated.bt.EmptyShape_static();
      }
    }
  }

  onComponentSet() {
    this.setMesh(this.collider.mesh);
  }

  onDestroy() {
    if (this.refBtTriangleMesh) {
      _instantiated.bt.TriangleMesh_del(this.refBtTriangleMesh);
    }

    super.onDestroy();
  }

  updateScale() {
    super.updateScale();
    const bt_v3 = _bulletCache.BulletCache.instance.BT_V3_0;
    (0, _bulletUtils.cocos2BulletVec3)(bt_v3, this._collider.node.worldScale);

    _instantiated.bt.CollisionShape_setLocalScaling(this._impl, bt_v3);

    this.updateCompoundTransform();
  }

  _getBtTriangleMesh(mesh) {
    this.refBtTriangleMesh = _instantiated.bt.TriangleMesh_new();
    (0, _bulletUtils.cocos2BulletTriMesh)(this.refBtTriangleMesh, mesh);
    return this.refBtTriangleMesh;
  }

}

exports.BulletTrimeshShape = BulletTrimeshShape;