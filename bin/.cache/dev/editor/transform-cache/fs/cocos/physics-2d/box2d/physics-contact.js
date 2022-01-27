"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhysicsContact = void 0;

var _box2d = _interopRequireDefault(require("@cocos/box2d"));

var _index = require("../../core/index.js");

var _physicsTypes = require("../framework/physics-types.js");

var _index2 = require("../framework/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

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
const pools = []; // temp world manifold

const pointCache = [new _index.Vec2(), new _index.Vec2()];
const b2worldmanifold = new _box2d.default.WorldManifold();
const worldmanifold = {
  points: [],
  separations: [],
  normal: new _index.Vec2()
};

class ManifoldPoint {
  constructor() {
    this.localPoint = new _index.Vec2();
    this.normalImpulse = 0;
    this.tangentImpulse = 0;
  }

}

const manifoldPointCache = [new ManifoldPoint(), new ManifoldPoint()];
const manifold = {
  type: 0,
  localPoint: new _index.Vec2(),
  localNormal: new _index.Vec2(),
  points: []
};
const impulse = {
  normalImpulses: [],
  tangentImpulses: []
};

class PhysicsContact {
  constructor() {
    this.colliderA = null;
    this.colliderB = null;
    this.disabled = false;
    this.disabledOnce = false;
    this._impulse = null;
    this._inverted = false;
    this._b2contact = null;
  }

  static get(b2contact) {
    let c = pools.pop();

    if (!c) {
      c = new PhysicsContact();
    }

    c.init(b2contact);
    return c;
  }

  static put(b2contact) {
    const c = b2contact.m_userData;
    if (!c) return;
    pools.push(c);
    c.reset();
  }

  _setImpulse(impulse) {
    this._impulse = impulse;
  }

  init(b2contact) {
    this.colliderA = b2contact.m_fixtureA.m_userData.collider;
    this.colliderB = b2contact.m_fixtureB.m_userData.collider;
    this.disabled = false;
    this.disabledOnce = false;
    this._impulse = null;
    this._inverted = false;
    this._b2contact = b2contact;
    b2contact.m_userData = this;
  }

  reset() {
    this.setTangentSpeed(0);
    this.resetFriction();
    this.resetRestitution();
    this.colliderA = null;
    this.colliderB = null;
    this.disabled = false;
    this._impulse = null;
    this._b2contact.m_userData = null;
    this._b2contact = null;
  }

  getWorldManifold() {
    const points = worldmanifold.points;
    const separations = worldmanifold.separations;
    const normal = worldmanifold.normal;

    this._b2contact.GetWorldManifold(b2worldmanifold);

    const b2points = b2worldmanifold.points;
    const b2separations = b2worldmanifold.separations;

    const count = this._b2contact.GetManifold().pointCount;

    points.length = separations.length = count;

    for (let i = 0; i < count; i++) {
      const p = pointCache[i];
      p.x = b2points[i].x * _physicsTypes.PHYSICS_2D_PTM_RATIO;
      p.y = b2points[i].y * _physicsTypes.PHYSICS_2D_PTM_RATIO;
      points[i] = p;
      separations[i] = b2separations[i] * _physicsTypes.PHYSICS_2D_PTM_RATIO;
    }

    normal.x = b2worldmanifold.normal.x;
    normal.y = b2worldmanifold.normal.y;

    if (this._inverted) {
      normal.x *= -1;
      normal.y *= -1;
    }

    return worldmanifold;
  }

  getManifold() {
    const points = manifold.points;
    const localNormal = manifold.localNormal;
    const localPoint = manifold.localPoint;

    const b2manifold = this._b2contact.GetManifold();

    const b2points = b2manifold.points;
    const count = points.length = b2manifold.pointCount;

    for (let i = 0; i < count; i++) {
      const p = manifoldPointCache[i];
      const b2p = b2points[i];
      p.localPoint.x = b2p.localPoint.x * _physicsTypes.PHYSICS_2D_PTM_RATIO;
      p.localPoint.y = b2p.localPoint.y * _physicsTypes.PHYSICS_2D_PTM_RATIO;
      p.normalImpulse = b2p.normalImpulse * _physicsTypes.PHYSICS_2D_PTM_RATIO;
      p.tangentImpulse = b2p.tangentImpulse;
      points[i] = p;
    }

    localPoint.x = b2manifold.localPoint.x * _physicsTypes.PHYSICS_2D_PTM_RATIO;
    localPoint.y = b2manifold.localPoint.y * _physicsTypes.PHYSICS_2D_PTM_RATIO;
    localNormal.x = b2manifold.localNormal.x;
    localNormal.y = b2manifold.localNormal.y;
    manifold.type = b2manifold.type;

    if (this._inverted) {
      localNormal.x *= -1;
      localNormal.y *= -1;
    }

    return manifold;
  }

  getImpulse() {
    const b2impulse = this._impulse;
    if (!b2impulse) return null;
    const normalImpulses = impulse.normalImpulses;
    const tangentImpulses = impulse.tangentImpulses;
    const count = b2impulse.count;

    for (let i = 0; i < count; i++) {
      normalImpulses[i] = b2impulse.normalImpulses[i] * _physicsTypes.PHYSICS_2D_PTM_RATIO;
      tangentImpulses[i] = b2impulse.tangentImpulses[i];
    }

    tangentImpulses.length = normalImpulses.length = count;
    return impulse;
  }

  emit(contactType) {
    let func;

    switch (contactType) {
      case _index2.Contact2DType.BEGIN_CONTACT:
        func = 'onBeginContact';
        break;

      case _index2.Contact2DType.END_CONTACT:
        func = 'onEndContact';
        break;

      case _index2.Contact2DType.PRE_SOLVE:
        func = 'onPreSolve';
        break;

      case _index2.Contact2DType.POST_SOLVE:
        func = 'onPostSolve';
        break;
    }

    const colliderA = this.colliderA;
    const colliderB = this.colliderB;
    const bodyA = colliderA.body;
    const bodyB = colliderB.body;

    if (bodyA.enabledContactListener) {
      colliderA === null || colliderA === void 0 ? void 0 : colliderA.emit(contactType, colliderA, colliderB, this);
    }

    if (bodyB.enabledContactListener) {
      colliderB === null || colliderB === void 0 ? void 0 : colliderB.emit(contactType, colliderB, colliderA, this);
    }

    if (bodyA.enabledContactListener || bodyB.enabledContactListener) {
      _index2.PhysicsSystem2D.instance.emit(contactType, colliderA, colliderB);
    }

    if (this.disabled || this.disabledOnce) {
      this.setEnabled(false);
      this.disabledOnce = false;
    }
  }

  setEnabled(value) {
    this._b2contact.SetEnabled(value);
  }

  isTouching() {
    return this._b2contact.IsTouching();
  }

  setTangentSpeed(value) {
    this._b2contact.SetTangentSpeed(value);
  }

  getTangentSpeed() {
    return this._b2contact.GetTangentSpeed();
  }

  setFriction(value) {
    this._b2contact.SetFriction(value);
  }

  getFriction() {
    return this._b2contact.GetFriction();
  }

  resetFriction() {
    return this._b2contact.ResetFriction();
  }

  setRestitution(value) {
    this._b2contact.SetRestitution(value);
  }

  getRestitution() {
    return this._b2contact.GetRestitution();
  }

  resetRestitution() {
    return this._b2contact.ResetRestitution();
  }

}

exports.PhysicsContact = PhysicsContact;