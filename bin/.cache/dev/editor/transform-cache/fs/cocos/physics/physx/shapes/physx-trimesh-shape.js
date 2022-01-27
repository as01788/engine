"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhysXTrimeshShape = void 0;

var _index = require("../../../core/index.js");

var _physxAdapter = require("../physx-adapter.js");

var _physxShape = require("./physx-shape.js");

var _index2 = require("../../../core/gfx/index.js");

var _physxInstance = require("../physx-instance.js");

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
class PhysXTrimeshShape extends _physxShape.PhysXShape {
  constructor() {
    super(_physxShape.EPhysXShapeType.MESH);
    this.geometry = void 0;
  }

  setMesh(v) {
    if (v && v.renderingSubMeshes.length > 0 && this._impl == null) {
      const physics = _physxInstance.PhysXInstance.physics;
      const collider = this.collider;
      const pxmat = this.getSharedMaterial(collider.sharedMaterial);
      const meshScale = _physxShape.PhysXShape.MESH_SCALE;
      meshScale.setScale(_index.Vec3.ONE);
      meshScale.setRotation(_index.Quat.IDENTITY);

      if (collider.convex) {
        if (_physxAdapter.PX.MESH_CONVEX[v._uuid] == null) {
          const cooking = _physxInstance.PhysXInstance.cooking;
          const posBuf = v.readAttribute(0, _index2.AttributeName.ATTR_POSITION);
          _physxAdapter.PX.MESH_CONVEX[v._uuid] = (0, _physxAdapter.createConvexMesh)(posBuf, cooking, physics);
        }

        const convexMesh = _physxAdapter.PX.MESH_CONVEX[v._uuid];
        this.geometry = new _physxAdapter.PX.ConvexMeshGeometry(convexMesh, meshScale, (0, _physxAdapter.createMeshGeometryFlags)(0, true));
      } else {
        if (_physxAdapter.PX.MESH_STATIC[v._uuid] == null) {
          const cooking = _physxInstance.PhysXInstance.cooking;
          const posBuf = v.readAttribute(0, _index2.AttributeName.ATTR_POSITION);
          const indBuf = v.readIndices(0); // Uint16Array ?

          _physxAdapter.PX.MESH_STATIC[v._uuid] = (0, _physxAdapter.createTriangleMesh)(posBuf, indBuf, cooking, physics);
        }

        const trimesh = _physxAdapter.PX.MESH_STATIC[v._uuid];
        this.geometry = new _physxAdapter.PX.TriangleMeshGeometry(trimesh, meshScale, (0, _physxAdapter.createMeshGeometryFlags)(0, false));
      }

      this.updateGeometry();
      this._impl = physics.createShape(this.geometry, pxmat, true, this._flags);
      this.updateByReAdd();
    }
  }

  get collider() {
    return this._collider;
  }

  onComponentSet() {
    this.setMesh(this.collider.mesh);
  }

  updateScale() {
    this.updateGeometry();
    this.setCenter(this._collider.center);
  }

  updateGeometry() {
    const meshScale = _physxShape.PhysXShape.MESH_SCALE;
    meshScale.setScale(this.collider.node.worldScale);
    meshScale.setRotation(_index.Quat.IDENTITY);
    this.geometry.setScale(meshScale);
  }
  /* override */


  setMaterial(v) {
    if (this._impl) super.setMaterial(v);
  }

  setCenter(v) {
    if (this._impl) super.setCenter(v);
  }

  setAsTrigger(v) {
    if (this._impl) super.setAsTrigger(v);
  }

  setFilerData(v) {
    if (this._impl) super.setFilerData(v);
  }

  addToBody() {
    if (this._impl) super.addToBody();
  }

  removeFromBody() {
    if (this._impl) super.removeFromBody();
  }

}

exports.PhysXTrimeshShape = PhysXTrimeshShape;