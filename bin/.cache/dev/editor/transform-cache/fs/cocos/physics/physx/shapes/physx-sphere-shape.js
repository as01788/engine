"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhysXSphereShape = void 0;

var _index = require("../../../core/index.js");

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
class PhysXSphereShape extends _physxShape.PhysXShape {
  constructor() {
    super(_physxShape.EPhysXShapeType.SPHERE);

    if (!PhysXSphereShape.SPHERE_GEOMETRY) {
      PhysXSphereShape.SPHERE_GEOMETRY = new _physxAdapter.PX.SphereGeometry(0.5);
    }
  }

  updateRadius() {
    this.updateScale();
  }

  get collider() {
    return this._collider;
  }

  onComponentSet() {
    this.updateGeometry();
    const pxmat = this.getSharedMaterial(this.collider.sharedMaterial);
    this._impl = _physxInstance.PhysXInstance.physics.createShape(PhysXSphereShape.SPHERE_GEOMETRY, pxmat, true, this._flags);
  }

  updateScale() {
    this.updateGeometry();

    this._impl.setGeometry(PhysXSphereShape.SPHERE_GEOMETRY);

    this.setCenter(this._collider.center);
  }

  updateGeometry() {
    const co = this.collider;
    const maxSp = Math.abs((0, _index.absMaxComponent)(this.collider.node.worldScale));
    PhysXSphereShape.SPHERE_GEOMETRY.setRadius(Math.max(0.0001, co.radius * maxSp));
  }

}

exports.PhysXSphereShape = PhysXSphereShape;
PhysXSphereShape.SPHERE_GEOMETRY = void 0;