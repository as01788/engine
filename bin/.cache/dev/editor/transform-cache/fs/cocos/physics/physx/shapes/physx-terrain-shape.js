"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhysXTerrainShape = void 0;

var _physxAdapter = require("../physx-adapter.js");

var _physxInstance = require("../physx-instance.js");

var _physxShape = require("./physx-shape.js");

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
class PhysXTerrainShape extends _physxShape.PhysXShape {
  constructor() {
    super(_physxShape.EPhysXShapeType.TERRAIN);
  }

  setTerrain(v) {
    if (v && this._impl == null) {
      const physics = _physxInstance.PhysXInstance.physics;
      const collider = this.collider;

      if (_physxAdapter.PX.TERRAIN_STATIC[v._uuid] == null) {
        const cooking = _physxInstance.PhysXInstance.cooking;
        _physxAdapter.PX.TERRAIN_STATIC[v._uuid] = (0, _physxAdapter.createHeightField)(v, PhysXTerrainShape.heightScale, cooking, physics);
      }

      const hf = _physxAdapter.PX.TERRAIN_STATIC[v._uuid];
      const pxmat = this.getSharedMaterial(collider.sharedMaterial);
      const geometry = (0, _physxAdapter.createHeightFieldGeometry)(hf, 0, PhysXTerrainShape.heightScale, v.tileSize, v.tileSize);
      this._impl = physics.createShape(geometry, pxmat, true, this._flags);
      this.updateByReAdd();
    }
  }

  get collider() {
    return this._collider;
  }

  onComponentSet() {
    this.setTerrain(this.collider.terrain);
  }

  updateScale() {
    this.setCenter(this._collider.center);
  }
  /* override */


  setCenter(v) {
    if (this._impl) this._impl.setLocalPose((0, _physxAdapter.getTempTransform)(v, this._rotation));
  }

  setMaterial(v) {
    if (this._impl) super.setMaterial(v);
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

exports.PhysXTerrainShape = PhysXTerrainShape;
PhysXTerrainShape.heightScale = 1 / 5000;