"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhysXShape = exports.EPhysXShapeType = void 0;

var _index = require("../../../core/index.js");

var _index2 = require("../../../core/geometry/index.js");

var _index3 = require("../../framework/index.js");

var _physxAdapter = require("../physx-adapter.js");

var _physxEnum = require("../physx-enum.js");

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

/* eslint-disable @typescript-eslint/no-unsafe-return */
let EPhysXShapeType;
exports.EPhysXShapeType = EPhysXShapeType;

(function (EPhysXShapeType) {
  EPhysXShapeType[EPhysXShapeType["SPHERE"] = 0] = "SPHERE";
  EPhysXShapeType[EPhysXShapeType["BOX"] = 1] = "BOX";
  EPhysXShapeType[EPhysXShapeType["CAPSULE"] = 2] = "CAPSULE";
  EPhysXShapeType[EPhysXShapeType["CYLINDER"] = 3] = "CYLINDER";
  EPhysXShapeType[EPhysXShapeType["CONE"] = 4] = "CONE";
  EPhysXShapeType[EPhysXShapeType["PLANE"] = 5] = "PLANE";
  EPhysXShapeType[EPhysXShapeType["TERRAIN"] = 6] = "TERRAIN";
  EPhysXShapeType[EPhysXShapeType["MESH"] = 7] = "MESH";
})(EPhysXShapeType || (exports.EPhysXShapeType = EPhysXShapeType = {}));

class PhysXShape {
  static get MESH_SCALE() {
    if (!this._MESH_SCALE) {
      this._MESH_SCALE = new _physxAdapter.PX.MeshScale(_index.Vec3.ZERO, _index.Quat.IDENTITY);
    }

    return this._MESH_SCALE;
  }

  get impl() {
    return this._impl;
  }

  get collider() {
    return this._collider;
  }

  get attachedRigidBody() {
    return null;
  }

  constructor(type) {
    this.id = void 0;
    this.type = void 0;
    this._impl = null;
    this._collider = null;
    this._flags = void 0;
    this._rotation = new _index.Quat(0, 0, 0, 1);
    this._index = -1;
    this._word3 = 0;
    this._isEnabled = false;
    this.type = type;
    this.id = PhysXShape.idCounter++;
  }

  initialize(v) {
    this._collider = v;
    this._flags = (0, _physxAdapter.getShapeFlags)(v.isTrigger);
    this._sharedBody = _index3.PhysicsSystem.instance.physicsWorld.getSharedBody(v.node);
    this._sharedBody.reference = true;
    this.onComponentSet();
    (0, _physxAdapter.addReference)(this, this._impl);
  }

  setIndex(v) {
    this._index = v;
  } // virtual


  onComponentSet() {} // virtual


  updateScale() {}

  onLoad() {
    this.setMaterial(this._collider.sharedMaterial);
    this.setCenter(this._collider.center);
  }

  onEnable() {
    this.addToBody();
    this._isEnabled = true;
    this._sharedBody.enabled = true;
  }

  onDisable() {
    this.removeFromBody();
    this._isEnabled = false;
    this._sharedBody.enabled = false;
  }

  onDestroy() {
    this._sharedBody.reference = false;

    if (this._impl) {
      (0, _physxAdapter.removeReference)(this, this._impl);

      this._impl.release();

      this._impl = null;
    }

    this._flags = null;
    this._collider = null;
  }

  setMaterial(v) {
    if (v == null) v = _index3.PhysicsSystem.instance.defaultMaterial;
    const mat = this.getSharedMaterial(v);

    this._impl.setMaterials((0, _physxAdapter.getShapeMaterials)(mat));
  }

  getSharedMaterial(v) {
    if (!_physxAdapter.PX.CACHE_MAT[v.id]) {
      const physics = _physxInstance.PhysXInstance.physics;
      const mat = physics.createMaterial(v.friction, v.friction, v.restitution);
      mat.setFrictionCombineMode(_physxAdapter.PX.CombineMode.eMULTIPLY);
      mat.setRestitutionCombineMode(_physxAdapter.PX.CombineMode.eMULTIPLY);
      _physxAdapter.PX.CACHE_MAT[v.id] = mat;
      return mat;
    }

    const mat = _physxAdapter.PX.CACHE_MAT[v.id];
    mat.setStaticFriction(v.friction);
    mat.setDynamicFriction(v.friction);
    mat.setRestitution(v.restitution);
    return mat;
  }

  setAsTrigger(v) {
    if (v) {
      this._impl.setFlag(_physxAdapter.PX.ShapeFlag.eSIMULATION_SHAPE, !v);

      this._impl.setFlag(_physxAdapter.PX.ShapeFlag.eTRIGGER_SHAPE, v);
    } else {
      this._impl.setFlag(_physxAdapter.PX.ShapeFlag.eTRIGGER_SHAPE, v);

      this._impl.setFlag(_physxAdapter.PX.ShapeFlag.eSIMULATION_SHAPE, !v);
    }

    if (this._index >= 0) {
      this._sharedBody.removeShape(this);

      this._sharedBody.addShape(this);
    }
  }

  setCenter(v) {
    const pos = _physxAdapter._trans.translation;
    const rot = _physxAdapter._trans.rotation;

    _index.Vec3.multiply(pos, v, this._collider.node.worldScale);

    _index.Quat.copy(rot, this._rotation);

    const trans = (0, _physxAdapter.getTempTransform)(pos, rot);

    this._impl.setLocalPose(trans);

    if (this._collider.enabled && !this._collider.isTrigger) {
      this._sharedBody.updateCenterOfMass();
    }
  }

  getAABB(v) {
    (0, _physxAdapter.getShapeWorldBounds)(this.impl, this._sharedBody.impl, 1, v);
  }

  getBoundingSphere(v) {
    _index2.AABB.toBoundingSphere(v, this._collider.worldBounds);
  }

  setGroup(v) {
    this._sharedBody.setGroup(v);
  }

  getGroup() {
    return this._sharedBody.getGroup();
  }

  addGroup(v) {
    this._sharedBody.addGroup(v);
  }

  removeGroup(v) {
    this._sharedBody.removeGroup(v);
  }

  setMask(v) {
    this._sharedBody.setMask(v);
  }

  getMask() {
    return this._sharedBody.getMask();
  }

  addMask(v) {
    this._sharedBody.addMask(v);
  }

  removeMask(v) {
    this._sharedBody.removeMask(v);
  }

  updateFilterData(filterData) {
    this._word3 = _physxEnum.EFilterDataWord3.DETECT_CONTACT_CCD;

    if (this._collider.needTriggerEvent) {
      this._word3 |= _physxEnum.EFilterDataWord3.DETECT_TRIGGER_EVENT;
    }

    if (this._collider.needCollisionEvent) {
      this._word3 |= _physxEnum.EFilterDataWord3.DETECT_CONTACT_EVENT | _physxEnum.EFilterDataWord3.DETECT_CONTACT_POINT;
    }

    filterData.word2 = this.id;
    filterData.word3 = this._word3;
    this.setFilerData(filterData);
  }

  updateEventListener() {
    if (this._sharedBody) this.updateFilterData(this._sharedBody.filterData);
  }

  updateByReAdd() {
    if (this._isEnabled) {
      this.removeFromBody();
      this.addToBody();
    }
  } // virtual


  setFilerData(filterData) {
    this._impl.setQueryFilterData(filterData);

    this._impl.setSimulationFilterData(filterData);
  } // virtual


  addToBody() {
    this._sharedBody.addShape(this);
  } // virtual


  removeFromBody() {
    this._sharedBody.removeShape(this);
  }

}

exports.PhysXShape = PhysXShape;
PhysXShape._MESH_SCALE = void 0;
PhysXShape.idCounter = 0;