System.register("q-bundled:///fs/cocos/physics/physx/physx-world.js", ["../../core/index.js", "./physx-adapter.js", "./physx-shared-body.js", "../../core/utils/array.js", "../utils/tuple-dictionary.js", "./physx-contact-equation.js", "../utils/util.js", "./physx-enum.js", "./physx-instance.js"], function (_export, _context) {
  "use strict";

  var error, addActorToScene, raycastAll, simulateScene, initializeWorld, _raycastClosest, gatherEvents, getWrapShape, PX, getContactDataOrByteOffset, PhysXSharedBody, fastRemoveAt, TupleDictionary, PhysXContactEquation, CollisionEventObject, TriggerEventObject, EFilterDataWord3, PhysXInstance, PhysXWorld, triggerEventBeginDic, triggerEventEndDic, triggerEventsPool, contactEventDic, contactEventsPool, contactsPool, PhysXCallback;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_coreIndexJs) {
      error = _coreIndexJs.error;
    }, function (_physxAdapterJs) {
      addActorToScene = _physxAdapterJs.addActorToScene;
      raycastAll = _physxAdapterJs.raycastAll;
      simulateScene = _physxAdapterJs.simulateScene;
      initializeWorld = _physxAdapterJs.initializeWorld;
      _raycastClosest = _physxAdapterJs.raycastClosest;
      gatherEvents = _physxAdapterJs.gatherEvents;
      getWrapShape = _physxAdapterJs.getWrapShape;
      PX = _physxAdapterJs.PX;
      getContactDataOrByteOffset = _physxAdapterJs.getContactDataOrByteOffset;
    }, function (_physxSharedBodyJs) {
      PhysXSharedBody = _physxSharedBodyJs.PhysXSharedBody;
    }, function (_coreUtilsArrayJs) {
      fastRemoveAt = _coreUtilsArrayJs.fastRemoveAt;
    }, function (_utilsTupleDictionaryJs) {
      TupleDictionary = _utilsTupleDictionaryJs.TupleDictionary;
    }, function (_physxContactEquationJs) {
      PhysXContactEquation = _physxContactEquationJs.PhysXContactEquation;
    }, function (_utilsUtilJs) {
      CollisionEventObject = _utilsUtilJs.CollisionEventObject;
      TriggerEventObject = _utilsUtilJs.TriggerEventObject;
    }, function (_physxEnumJs) {
      EFilterDataWord3 = _physxEnumJs.EFilterDataWord3;
    }, function (_physxInstanceJs) {
      PhysXInstance = _physxInstanceJs.PhysXInstance;
    }],
    execute: function () {
      _export("PhysXWorld", PhysXWorld = /*#__PURE__*/function (_PhysXInstance) {
        _inheritsLoose(PhysXWorld, _PhysXInstance);

        var _proto = PhysXWorld.prototype;

        _proto.setAllowSleep = function setAllowSleep(_v) {};

        _proto.setDefaultMaterial = function setDefaultMaterial(_v) {};

        _proto.setGravity = function setGravity(gravity) {
          this.scene.setGravity(gravity);
        };

        function PhysXWorld() {
          var _this;

          _this = _PhysXInstance.call(this) || this;
          _this.scene = void 0;
          _this.callback = PhysXCallback;
          _this.wrappedBodies = [];
          _this._isNeedFetch = false;
          initializeWorld(_assertThisInitialized(_this));
          return _this;
        }

        _proto.destroy = function destroy() {
          if (this.wrappedBodies.length) error('You should destroy all physics component first.');
          this.scene.release();
        };

        _proto.step = function step(deltaTime, _timeSinceLastCalled, _maxSubStep) {
          if (_maxSubStep === void 0) {
            _maxSubStep = 0;
          }

          this._simulate(deltaTime);

          if (!PX.MULTI_THREAD) {
            this._fetchResults();

            for (var i = 0; i < this.wrappedBodies.length; i++) {
              var body = this.wrappedBodies[i];
              body.syncPhysicsToScene();
            }
          }
        };

        _proto._simulate = function _simulate(dt) {
          if (!this._isNeedFetch) {
            simulateScene(this.scene, dt);
            this._isNeedFetch = true;
          }
        };

        _proto._fetchResults = function _fetchResults() {
          if (this._isNeedFetch) {
            this.scene.fetchResults(true);
            this._isNeedFetch = false;
          }
        };

        _proto.syncSceneToPhysics = function syncSceneToPhysics() {
          for (var i = 0; i < this.wrappedBodies.length; i++) {
            var body = this.wrappedBodies[i];
            body.syncSceneToPhysics();
          }
        } // only used in muti-thread for now
        ;

        _proto.syncPhysicsToScene = function syncPhysicsToScene() {
          this._fetchResults();

          for (var i = 0; i < this.wrappedBodies.length; i++) {
            var body = this.wrappedBodies[i];
            body.syncPhysicsToScene();
          }
        };

        _proto.syncAfterEvents = function syncAfterEvents() {
          for (var i = 0; i < this.wrappedBodies.length; i++) {
            var body = this.wrappedBodies[i];
            body.syncSceneWithCheck();
          }
        };

        _proto.getSharedBody = function getSharedBody(node, wrappedBody) {
          return PhysXSharedBody.getSharedBody(node, this, wrappedBody);
        };

        _proto.addActor = function addActor(body) {
          var index = this.wrappedBodies.indexOf(body);

          if (index < 0) {
            addActorToScene(this.scene, body.impl);
            this.wrappedBodies.push(body);
          }
        };

        _proto.removeActor = function removeActor(body) {
          var index = this.wrappedBodies.indexOf(body);

          if (index >= 0) {
            this.scene.removeActor(body.impl, true);
            fastRemoveAt(this.wrappedBodies, index);
          }
        };

        _proto.addConstraint = function addConstraint(_constraint) {};

        _proto.removeConstraint = function removeConstraint(_constraint) {};

        _proto.raycast = function raycast(worldRay, options, pool, results) {
          return raycastAll(this, worldRay, options, pool, results);
        };

        _proto.raycastClosest = function raycastClosest(worldRay, options, result) {
          return _raycastClosest(this, worldRay, options, result);
        };

        _proto.emitEvents = function emitEvents() {
          gatherEvents(this);
          PhysXCallback.emitTriggerEvent();
          PhysXCallback.emitCollisionEvent();
        };

        _createClass(PhysXWorld, [{
          key: "impl",
          get: function get() {
            return this.scene;
          }
        }]);

        return PhysXWorld;
      }(PhysXInstance)); ///
      /// Event Callback
      ///


      triggerEventBeginDic = new TupleDictionary();
      triggerEventEndDic = new TupleDictionary();
      triggerEventsPool = [];
      contactEventDic = new TupleDictionary();
      contactEventsPool = [];
      contactsPool = [];
      PhysXCallback = {
        eventCallback: {
          onContactBegin: function onContactBegin(a, b, c, d, o) {
            var wpa = getWrapShape(a);
            var wpb = getWrapShape(b);
            PhysXCallback.onCollision('onCollisionEnter', wpa, wpb, c, d, o);
          },
          onContactEnd: function onContactEnd(a, b, c, d, o) {
            var wpa = getWrapShape(a);
            var wpb = getWrapShape(b);
            PhysXCallback.onCollision('onCollisionExit', wpa, wpb, c, d, o);
          },
          onContactPersist: function onContactPersist(a, b, c, d, o) {
            var wpa = getWrapShape(a);
            var wpb = getWrapShape(b);
            PhysXCallback.onCollision('onCollisionStay', wpa, wpb, c, d, o);
          },
          onTriggerBegin: function onTriggerBegin(a, b) {
            var wpa = getWrapShape(a);
            var wpb = getWrapShape(b);
            PhysXCallback.onTrigger('onTriggerEnter', wpa, wpb, true);
          },
          onTriggerEnd: function onTriggerEnd(a, b) {
            var wpa = getWrapShape(a);
            var wpb = getWrapShape(b);
            PhysXCallback.onTrigger('onTriggerExit', wpa, wpb, false);
          }
        },
        // eNONE = 0,   //!< the query should ignore this shape
        // eTOUCH = 1,  //!< a hit on the shape touches the intersection geometry of the query but does not block it
        // eBLOCK = 2   //!< a hit on the shape blocks the query (does not block overlap queries)
        queryCallback: {
          preFilter: function preFilter(filterData, shape, _actor, _out) {
            var word3 = filterData.word3;
            var shapeFlags = shape.getFlags();

            if (word3 & EFilterDataWord3.QUERY_CHECK_TRIGGER && shapeFlags.isSet(PX.ShapeFlag.eTRIGGER_SHAPE)) {
              return PX.QueryHitType.eNONE;
            }

            return word3 & EFilterDataWord3.QUERY_SINGLE_HIT ? PX.QueryHitType.eBLOCK : PX.QueryHitType.eTOUCH;
          },
          preFilterForByteDance: function preFilterForByteDance(filterData, shapeFlags, hitFlags) {
            var word3 = filterData.word3;

            if (word3 & EFilterDataWord3.QUERY_CHECK_TRIGGER && shapeFlags & PX.ShapeFlag.eTRIGGER_SHAPE) {
              return PX.QueryHitType.eNONE;
            }

            return word3 & EFilterDataWord3.QUERY_SINGLE_HIT ? PX.QueryHitType.eBLOCK : PX.QueryHitType.eTOUCH;
          }
        },
        onTrigger: function onTrigger(type, wpa, wpb, isEnter) {
          if (wpa && wpb) {
            if (wpa.collider.needTriggerEvent || wpb.collider.needTriggerEvent) {
              var tE;

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
        emitTriggerEvent: function emitTriggerEvent() {
          var len = triggerEventEndDic.getLength();

          while (len--) {
            var key = triggerEventEndDic.getKeyByIndex(len);
            var data = triggerEventEndDic.getDataByKey(key);
            triggerEventsPool.push(data);
            var dataBeg = triggerEventBeginDic.getDataByKey(key);

            if (dataBeg) {
              triggerEventsPool.push(dataBeg);
              triggerEventBeginDic.set(data.a.id, data.b.id, null);
            }

            var colliderA = data.a.collider;
            var colliderB = data.b.collider;

            if (colliderA && colliderB) {
              var type = 'onTriggerExit';
              TriggerEventObject.type = type;

              if (colliderA.needTriggerEvent) {
                TriggerEventObject.selfCollider = colliderA;
                TriggerEventObject.otherCollider = colliderB;
                colliderA.emit(type, TriggerEventObject);
              }

              if (colliderB.needTriggerEvent) {
                TriggerEventObject.selfCollider = colliderB;
                TriggerEventObject.otherCollider = colliderA;
                colliderB.emit(type, TriggerEventObject);
              }
            }
          }

          triggerEventEndDic.reset();
          len = triggerEventBeginDic.getLength();

          while (len--) {
            var _key = triggerEventBeginDic.getKeyByIndex(len);

            var _data = triggerEventBeginDic.getDataByKey(_key);

            var _colliderA = _data.a.collider;
            var _colliderB = _data.b.collider;

            if (!_colliderA || !_colliderA.isValid || !_colliderB || !_colliderB.isValid) {
              triggerEventsPool.push(_data);
              triggerEventBeginDic.set(_data.a.id, _data.b.id, null);
            } else {
              var _type = _data.times++ ? 'onTriggerStay' : 'onTriggerEnter';

              TriggerEventObject.type = _type;

              if (_colliderA.needTriggerEvent) {
                TriggerEventObject.selfCollider = _colliderA;
                TriggerEventObject.otherCollider = _colliderB;

                _colliderA.emit(_type, TriggerEventObject);
              }

              if (_colliderB.needTriggerEvent) {
                TriggerEventObject.selfCollider = _colliderB;
                TriggerEventObject.otherCollider = _colliderA;

                _colliderB.emit(_type, TriggerEventObject);
              }
            }
          }
        },

        /**
         * @param c the contact count, how many the contacts in this pair
         * @param d the contact buffer, the buffer stores all contacts
         * @param o the data offset, the first contact offset in the contact buffer
         */
        onCollision: function onCollision(type, wpa, wpb, c, d, o) {
          if (wpa && wpb) {
            if (wpa.collider.needCollisionEvent || wpb.collider.needCollisionEvent) {
              if (contactEventsPool.length > 0) {
                var cE = contactEventsPool.pop();
                cE.type = type;
                cE.a = wpa;
                cE.b = wpb;
                cE.contactCount = c;
                cE.buffer = d;
                cE.offset = o;
                contactEventDic.set(wpa.id, wpb.id, cE);
              } else {
                var _cE = {
                  type: type,
                  a: wpa,
                  b: wpb,
                  contactCount: c,
                  buffer: d,
                  offset: o
                };
                contactEventDic.set(wpa.id, wpb.id, _cE);
              }
            }
          }
        },
        emitCollisionEvent: function emitCollisionEvent() {
          var len = contactEventDic.getLength();

          while (len--) {
            var key = contactEventDic.getKeyByIndex(len);
            var data = contactEventDic.getDataByKey(key);
            contactEventsPool.push(data);
            var colliderA = data.a.collider;
            var colliderB = data.b.collider;

            if (colliderA && colliderA.isValid && colliderB && colliderB.isValid) {
              CollisionEventObject.type = data.type;
              CollisionEventObject.impl = data.buffer;
              var c = data.contactCount;
              var d = data.buffer;
              var o = data.offset;
              var contacts = CollisionEventObject.contacts;
              contactsPool.push.apply(contactsPool, contacts);
              contacts.length = 0;

              for (var i = 0; i < c; i++) {
                if (contactsPool.length > 0) {
                  var _c = contactsPool.pop();

                  _c.colliderA = colliderA;
                  _c.colliderB = colliderB;
                  _c.impl = getContactDataOrByteOffset(i, o);
                  contacts.push(_c);
                } else {
                  var _c2 = new PhysXContactEquation(CollisionEventObject);

                  _c2.colliderA = colliderA;
                  _c2.colliderB = colliderB;
                  _c2.impl = getContactDataOrByteOffset(i, o);
                  contacts.push(_c2);
                }
              }

              if (colliderA.needCollisionEvent) {
                CollisionEventObject.selfCollider = colliderA;
                CollisionEventObject.otherCollider = colliderB;
                colliderA.emit(CollisionEventObject.type, CollisionEventObject);
              }

              if (colliderB.needCollisionEvent) {
                CollisionEventObject.selfCollider = colliderB;
                CollisionEventObject.otherCollider = colliderA;
                colliderB.emit(CollisionEventObject.type, CollisionEventObject);
              }
            }
          }

          contactEventDic.reset();
        }
      };
    }
  };
});