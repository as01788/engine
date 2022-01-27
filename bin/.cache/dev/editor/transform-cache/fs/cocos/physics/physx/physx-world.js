"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhysXWorld = void 0;

var _index = require("../../core/index.js");

var _physxAdapter = require("./physx-adapter.js");

var _physxSharedBody = require("./physx-shared-body.js");

var _array = require("../../core/utils/array.js");

var _tupleDictionary = require("../utils/tuple-dictionary.js");

var _physxContactEquation = require("./physx-contact-equation.js");

var _util = require("../utils/util.js");

var _physxEnum = require("./physx-enum.js");

var _physxInstance = require("./physx-instance.js");

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
class PhysXWorld extends _physxInstance.PhysXInstance {
  setAllowSleep(_v) {}

  setDefaultMaterial(_v) {}

  setGravity(gravity) {
    this.scene.setGravity(gravity);
  }

  get impl() {
    return this.scene;
  }

  constructor() {
    super();
    this.scene = void 0;
    this.callback = PhysXCallback;
    this.wrappedBodies = [];
    this._isNeedFetch = false;
    (0, _physxAdapter.initializeWorld)(this);
  }

  destroy() {
    if (this.wrappedBodies.length) (0, _index.error)('You should destroy all physics component first.');
    this.scene.release();
  }

  step(deltaTime, _timeSinceLastCalled, _maxSubStep = 0) {
    this._simulate(deltaTime);

    if (!_physxAdapter.PX.MULTI_THREAD) {
      this._fetchResults();

      for (let i = 0; i < this.wrappedBodies.length; i++) {
        const body = this.wrappedBodies[i];
        body.syncPhysicsToScene();
      }
    }
  }

  _simulate(dt) {
    if (!this._isNeedFetch) {
      (0, _physxAdapter.simulateScene)(this.scene, dt);
      this._isNeedFetch = true;
    }
  }

  _fetchResults() {
    if (this._isNeedFetch) {
      this.scene.fetchResults(true);
      this._isNeedFetch = false;
    }
  }

  syncSceneToPhysics() {
    for (let i = 0; i < this.wrappedBodies.length; i++) {
      const body = this.wrappedBodies[i];
      body.syncSceneToPhysics();
    }
  } // only used in muti-thread for now


  syncPhysicsToScene() {
    this._fetchResults();

    for (let i = 0; i < this.wrappedBodies.length; i++) {
      const body = this.wrappedBodies[i];
      body.syncPhysicsToScene();
    }
  }

  syncAfterEvents() {
    for (let i = 0; i < this.wrappedBodies.length; i++) {
      const body = this.wrappedBodies[i];
      body.syncSceneWithCheck();
    }
  }

  getSharedBody(node, wrappedBody) {
    return _physxSharedBody.PhysXSharedBody.getSharedBody(node, this, wrappedBody);
  }

  addActor(body) {
    const index = this.wrappedBodies.indexOf(body);

    if (index < 0) {
      (0, _physxAdapter.addActorToScene)(this.scene, body.impl);
      this.wrappedBodies.push(body);
    }
  }

  removeActor(body) {
    const index = this.wrappedBodies.indexOf(body);

    if (index >= 0) {
      this.scene.removeActor(body.impl, true);
      (0, _array.fastRemoveAt)(this.wrappedBodies, index);
    }
  }

  addConstraint(_constraint) {}

  removeConstraint(_constraint) {}

  raycast(worldRay, options, pool, results) {
    return (0, _physxAdapter.raycastAll)(this, worldRay, options, pool, results);
  }

  raycastClosest(worldRay, options, result) {
    return (0, _physxAdapter.raycastClosest)(this, worldRay, options, result);
  }

  emitEvents() {
    (0, _physxAdapter.gatherEvents)(this);
    PhysXCallback.emitTriggerEvent();
    PhysXCallback.emitCollisionEvent();
  }

} ///
/// Event Callback
///


exports.PhysXWorld = PhysXWorld;
const triggerEventBeginDic = new _tupleDictionary.TupleDictionary();
const triggerEventEndDic = new _tupleDictionary.TupleDictionary();
const triggerEventsPool = [];
const contactEventDic = new _tupleDictionary.TupleDictionary();
const contactEventsPool = [];
const contactsPool = [];
const PhysXCallback = {
  eventCallback: {
    onContactBegin: (a, b, c, d, o) => {
      const wpa = (0, _physxAdapter.getWrapShape)(a);
      const wpb = (0, _physxAdapter.getWrapShape)(b);
      PhysXCallback.onCollision('onCollisionEnter', wpa, wpb, c, d, o);
    },
    onContactEnd: (a, b, c, d, o) => {
      const wpa = (0, _physxAdapter.getWrapShape)(a);
      const wpb = (0, _physxAdapter.getWrapShape)(b);
      PhysXCallback.onCollision('onCollisionExit', wpa, wpb, c, d, o);
    },
    onContactPersist: (a, b, c, d, o) => {
      const wpa = (0, _physxAdapter.getWrapShape)(a);
      const wpb = (0, _physxAdapter.getWrapShape)(b);
      PhysXCallback.onCollision('onCollisionStay', wpa, wpb, c, d, o);
    },
    onTriggerBegin: (a, b) => {
      const wpa = (0, _physxAdapter.getWrapShape)(a);
      const wpb = (0, _physxAdapter.getWrapShape)(b);
      PhysXCallback.onTrigger('onTriggerEnter', wpa, wpb, true);
    },
    onTriggerEnd: (a, b) => {
      const wpa = (0, _physxAdapter.getWrapShape)(a);
      const wpb = (0, _physxAdapter.getWrapShape)(b);
      PhysXCallback.onTrigger('onTriggerExit', wpa, wpb, false);
    }
  },
  // eNONE = 0,   //!< the query should ignore this shape
  // eTOUCH = 1,  //!< a hit on the shape touches the intersection geometry of the query but does not block it
  // eBLOCK = 2   //!< a hit on the shape blocks the query (does not block overlap queries)
  queryCallback: {
    preFilter(filterData, shape, _actor, _out) {
      const word3 = filterData.word3;
      const shapeFlags = shape.getFlags();

      if (word3 & _physxEnum.EFilterDataWord3.QUERY_CHECK_TRIGGER && shapeFlags.isSet(_physxAdapter.PX.ShapeFlag.eTRIGGER_SHAPE)) {
        return _physxAdapter.PX.QueryHitType.eNONE;
      }

      return word3 & _physxEnum.EFilterDataWord3.QUERY_SINGLE_HIT ? _physxAdapter.PX.QueryHitType.eBLOCK : _physxAdapter.PX.QueryHitType.eTOUCH;
    },

    preFilterForByteDance(filterData, shapeFlags, hitFlags) {
      const word3 = filterData.word3;

      if (word3 & _physxEnum.EFilterDataWord3.QUERY_CHECK_TRIGGER && shapeFlags & _physxAdapter.PX.ShapeFlag.eTRIGGER_SHAPE) {
        return _physxAdapter.PX.QueryHitType.eNONE;
      }

      return word3 & _physxEnum.EFilterDataWord3.QUERY_SINGLE_HIT ? _physxAdapter.PX.QueryHitType.eBLOCK : _physxAdapter.PX.QueryHitType.eTOUCH;
    }

  },

  onTrigger(type, wpa, wpb, isEnter) {
    if (wpa && wpb) {
      if (wpa.collider.needTriggerEvent || wpb.collider.needTriggerEvent) {
        let tE;

        if (triggerEventsPool.length > 0) {
          tE = triggerEventsPool.pop();
          tE.a = wpa;
          tE.b = wpb;
          tE.times = 0;
        } else {
          tE = {
            a: wpa,
            b: wpb,
            times: 0
          };
        }

        if (isEnter) {
          triggerEventBeginDic.set(wpa.id, wpb.id, tE);
        } else {
          triggerEventEndDic.set(wpa.id, wpb.id, tE);
        }
      }
    }
  },

  emitTriggerEvent() {
    let len = triggerEventEndDic.getLength();

    while (len--) {
      const key = triggerEventEndDic.getKeyByIndex(len);
      const data = triggerEventEndDic.getDataByKey(key);
      triggerEventsPool.push(data);
      const dataBeg = triggerEventBeginDic.getDataByKey(key);

      if (dataBeg) {
        triggerEventsPool.push(dataBeg);
        triggerEventBeginDic.set(data.a.id, data.b.id, null);
      }

      const colliderA = data.a.collider;
      const colliderB = data.b.collider;

      if (colliderA && colliderB) {
        const type = 'onTriggerExit';
        _util.TriggerEventObject.type = type;

        if (colliderA.needTriggerEvent) {
          _util.TriggerEventObject.selfCollider = colliderA;
          _util.TriggerEventObject.otherCollider = colliderB;
          colliderA.emit(type, _util.TriggerEventObject);
        }

        if (colliderB.needTriggerEvent) {
          _util.TriggerEventObject.selfCollider = colliderB;
          _util.TriggerEventObject.otherCollider = colliderA;
          colliderB.emit(type, _util.TriggerEventObject);
        }
      }
    }

    triggerEventEndDic.reset();
    len = triggerEventBeginDic.getLength();

    while (len--) {
      const key = triggerEventBeginDic.getKeyByIndex(len);
      const data = triggerEventBeginDic.getDataByKey(key);
      const colliderA = data.a.collider;
      const colliderB = data.b.collider;

      if (!colliderA || !colliderA.isValid || !colliderB || !colliderB.isValid) {
        triggerEventsPool.push(data);
        triggerEventBeginDic.set(data.a.id, data.b.id, null);
      } else {
        const type = data.times++ ? 'onTriggerStay' : 'onTriggerEnter';
        _util.TriggerEventObject.type = type;

        if (colliderA.needTriggerEvent) {
          _util.TriggerEventObject.selfCollider = colliderA;
          _util.TriggerEventObject.otherCollider = colliderB;
          colliderA.emit(type, _util.TriggerEventObject);
        }

        if (colliderB.needTriggerEvent) {
          _util.TriggerEventObject.selfCollider = colliderB;
          _util.TriggerEventObject.otherCollider = colliderA;
          colliderB.emit(type, _util.TriggerEventObject);
        }
      }
    }
  },

  /**
   * @param c the contact count, how many the contacts in this pair
   * @param d the contact buffer, the buffer stores all contacts
   * @param o the data offset, the first contact offset in the contact buffer
   */
  onCollision(type, wpa, wpb, c, d, o) {
    if (wpa && wpb) {
      if (wpa.collider.needCollisionEvent || wpb.collider.needCollisionEvent) {
        if (contactEventsPool.length > 0) {
          const cE = contactEventsPool.pop();
          cE.type = type;
          cE.a = wpa;
          cE.b = wpb;
          cE.contactCount = c;
          cE.buffer = d;
          cE.offset = o;
          contactEventDic.set(wpa.id, wpb.id, cE);
        } else {
          const cE = {
            type,
            a: wpa,
            b: wpb,
            contactCount: c,
            buffer: d,
            offset: o
          };
          contactEventDic.set(wpa.id, wpb.id, cE);
        }
      }
    }
  },

  emitCollisionEvent() {
    let len = contactEventDic.getLength();

    while (len--) {
      const key = contactEventDic.getKeyByIndex(len);
      const data = contactEventDic.getDataByKey(key);
      contactEventsPool.push(data);
      const colliderA = data.a.collider;
      const colliderB = data.b.collider;

      if (colliderA && colliderA.isValid && colliderB && colliderB.isValid) {
        _util.CollisionEventObject.type = data.type;
        _util.CollisionEventObject.impl = data.buffer;
        const c = data.contactCount;
        const d = data.buffer;
        const o = data.offset;
        const contacts = _util.CollisionEventObject.contacts;
        contactsPool.push.apply(contactsPool, contacts);
        contacts.length = 0;

        for (let i = 0; i < c; i++) {
          if (contactsPool.length > 0) {
            const c = contactsPool.pop();
            c.colliderA = colliderA;
            c.colliderB = colliderB;
            c.impl = (0, _physxAdapter.getContactDataOrByteOffset)(i, o);
            contacts.push(c);
          } else {
            const c = new _physxContactEquation.PhysXContactEquation(_util.CollisionEventObject);
            c.colliderA = colliderA;
            c.colliderB = colliderB;
            c.impl = (0, _physxAdapter.getContactDataOrByteOffset)(i, o);
            contacts.push(c);
          }
        }

        if (colliderA.needCollisionEvent) {
          _util.CollisionEventObject.selfCollider = colliderA;
          _util.CollisionEventObject.otherCollider = colliderB;
          colliderA.emit(_util.CollisionEventObject.type, _util.CollisionEventObject);
        }

        if (colliderB.needCollisionEvent) {
          _util.CollisionEventObject.selfCollider = colliderB;
          _util.CollisionEventObject.otherCollider = colliderA;
          colliderB.emit(_util.CollisionEventObject.type, _util.CollisionEventObject);
        }
      }
    }

    contactEventDic.reset();
  }

};