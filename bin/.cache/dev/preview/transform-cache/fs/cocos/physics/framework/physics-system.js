System.register("q-bundled:///fs/cocos/physics/framework/physics-system.js", ["../../../../virtual/internal%253Aconstants.js", "../../core/math/index.js", "../../core/director.js", "../../core/components/index.js", "./assets/physics-material.js", "../../core/index.js", "./physics-ray-result.js", "./collision-matrix.js", "./physics-enum.js", "./physics-selector.js", "../../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var EDITOR, Vec3, director, Director, System, PhysicsMaterial, RecyclePool, game, Enum, PhysicsRayResult, CollisionMatrix, PhysicsGroup, constructDefaultWorld, selector, legacyCC, PhysicsSystem;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_coreMathIndexJs) {
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_coreDirectorJs) {
      director = _coreDirectorJs.director;
      Director = _coreDirectorJs.Director;
    }, function (_coreComponentsIndexJs) {
      System = _coreComponentsIndexJs.System;
    }, function (_assetsPhysicsMaterialJs) {
      PhysicsMaterial = _assetsPhysicsMaterialJs.PhysicsMaterial;
    }, function (_coreIndexJs) {
      RecyclePool = _coreIndexJs.RecyclePool;
      game = _coreIndexJs.game;
      Enum = _coreIndexJs.Enum;
    }, function (_physicsRayResultJs) {
      PhysicsRayResult = _physicsRayResultJs.PhysicsRayResult;
    }, function (_collisionMatrixJs) {
      CollisionMatrix = _collisionMatrixJs.CollisionMatrix;
    }, function (_physicsEnumJs) {
      PhysicsGroup = _physicsEnumJs.PhysicsGroup;
    }, function (_physicsSelectorJs) {
      constructDefaultWorld = _physicsSelectorJs.constructDefaultWorld;
      selector = _physicsSelectorJs.selector;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      legacyCC.internal.PhysicsGroup = PhysicsGroup;
      /**
       * @en
       * Physics system.
       * @zh
       * 物理系统。
       */

      _export("PhysicsSystem", PhysicsSystem = /*#__PURE__*/function (_System) {
        _inheritsLoose(PhysicsSystem, _System);

        function PhysicsSystem() {
          var _this;

          _this = _System.call(this) || this;
          _this.raycastClosestResult = new PhysicsRayResult();
          _this.raycastResults = [];
          _this.collisionMatrix = new CollisionMatrix(1);
          _this.minVolumeSize = 1e-5;
          _this.useNodeChains = false;
          _this._enable = true;
          _this._allowSleep = true;
          _this._maxSubSteps = 1;
          _this._subStepCount = 0;
          _this._fixedTimeStep = 1.0 / 60.0;
          _this._autoSimulation = true;
          _this._accumulator = 0;
          _this._sleepThreshold = 0.1;
          _this._gravity = new Vec3(0, -10, 0);
          _this._material = new PhysicsMaterial();
          _this.raycastOptions = {
            group: -1,
            mask: -1,
            queryTrigger: true,
            maxDistance: 10000000
          };
          _this.raycastResultPool = new RecyclePool(function () {
            return new PhysicsRayResult();
          }, 1);

          _this._material.on(PhysicsMaterial.EVENT_UPDATE, _this._updateMaterial, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = PhysicsSystem.prototype;

        _proto.postUpdate = function postUpdate(deltaTime) {
          if (EDITOR && !this._executeInEditMode && !selector.runInEditor) return;
          if (!this.physicsWorld) return;

          if (!this._enable) {
            this.physicsWorld.syncSceneToPhysics();
            return;
          }

          if (this._autoSimulation) {
            this._subStepCount = 0;
            this._accumulator += deltaTime;
            director.emit(Director.EVENT_BEFORE_PHYSICS);

            while (this._subStepCount < this._maxSubSteps) {
              if (this._accumulator >= this._fixedTimeStep) {
                this.physicsWorld.syncSceneToPhysics();
                this.physicsWorld.step(this._fixedTimeStep);
                this.physicsWorld.emitEvents();
                this.physicsWorld.syncAfterEvents();
                this._accumulator -= this._fixedTimeStep;
                this._subStepCount++;
              } else {
                this.physicsWorld.syncSceneToPhysics();
                break;
              }
            }

            director.emit(Director.EVENT_AFTER_PHYSICS);
          }
        }
        /**
         * @en
         * Reset the physics configuration.
         * @zh
         * 重置物理配置。
         */
        ;

        _proto.resetConfiguration = function resetConfiguration(config) {
          var con = config || (game.config ? game.config.physics : null);

          if (con) {
            if (typeof con.allowSleep === 'boolean') this._allowSleep = con.allowSleep;
            if (typeof con.fixedTimeStep === 'number') this._fixedTimeStep = con.fixedTimeStep;
            if (typeof con.maxSubSteps === 'number') this._maxSubSteps = con.maxSubSteps;
            if (typeof con.sleepThreshold === 'number') this._sleepThreshold = con.sleepThreshold;
            if (typeof con.autoSimulation === 'boolean') this.autoSimulation = con.autoSimulation;
            if (con.gravity) Vec3.copy(this._gravity, con.gravity);

            if (con.defaultMaterial) {
              this._material.setValues(con.defaultMaterial.friction, con.defaultMaterial.rollingFriction, con.defaultMaterial.spinningFriction, con.defaultMaterial.restitution);
            }

            if (con.collisionMatrix) {
              for (var i in con.collisionMatrix) {
                this.collisionMatrix["" + (1 << parseInt(i))] = con.collisionMatrix[i];
              }
            }

            if (con.collisionGroups) {
              var cg = con.collisionGroups;

              if (cg instanceof Array) {
                cg.forEach(function (v) {
                  PhysicsGroup[v.name] = 1 << v.index;
                });
                Enum.update(PhysicsGroup);
              }
            }
          }

          if (this.physicsWorld) {
            this.physicsWorld.setGravity(this._gravity);
            this.physicsWorld.setAllowSleep(this._allowSleep);
            this.physicsWorld.setDefaultMaterial(this._material);
          }
        }
        /**
         * @en
         * Reset the accumulator of time to given value.
         * @zh
         * 重置时间累积总量为给定值。
         */
        ;

        _proto.resetAccumulator = function resetAccumulator(time) {
          if (time === void 0) {
            time = 0;
          }

          this._accumulator = time;
        }
        /**
         * @en
         * Perform simulation steps for the physics world.
         * @zh
         * 执行物理世界的模拟步进。
         * @param fixedTimeStep
         */
        ;

        _proto.step = function step(fixedTimeStep, deltaTime, maxSubSteps) {
          if (this.physicsWorld) this.physicsWorld.step(fixedTimeStep, deltaTime, maxSubSteps);
        }
        /**
         * @en
         * Sync the scene world transform changes to the physics world.
         * @zh
         * 同步场景世界的变化信息到物理世界中。
         */
        ;

        _proto.syncSceneToPhysics = function syncSceneToPhysics() {
          if (this.physicsWorld) this.physicsWorld.syncSceneToPhysics();
        }
        /**
         * @en
         * Emit trigger and collision events.
         * @zh
         * 触发`trigger`和`collision`事件。
         */
        ;

        _proto.emitEvents = function emitEvents() {
          if (this.physicsWorld) this.physicsWorld.emitEvents();
        }
        /**
         * @en
         * Collision detect all collider, and record all the detected results, through PhysicsSystem.Instance.RaycastResults access to the results.
         * @zh
         * 检测所有的碰撞盒，并记录所有被检测到的结果，通过 PhysicsSystem.instance.raycastResults 访问结果。
         * @param worldRay 世界空间下的一条射线
         * @param mask 掩码，默认为 0xffffffff
         * @param maxDistance 最大检测距离，默认为 10000000，目前请勿传入 Infinity 或 Number.MAX_VALUE
         * @param queryTrigger 是否检测触发器
         * @return boolean 表示是否有检测到碰撞盒
         */
        ;

        _proto.raycast = function raycast(worldRay, mask, maxDistance, queryTrigger) {
          if (mask === void 0) {
            mask = 0xffffffff;
          }

          if (maxDistance === void 0) {
            maxDistance = 10000000;
          }

          if (queryTrigger === void 0) {
            queryTrigger = true;
          }

          if (!this.physicsWorld) return false;
          this.raycastResultPool.reset();
          this.raycastResults.length = 0;
          this.raycastOptions.mask = mask >>> 0;
          this.raycastOptions.maxDistance = maxDistance;
          this.raycastOptions.queryTrigger = queryTrigger;
          return this.physicsWorld.raycast(worldRay, this.raycastOptions, this.raycastResultPool, this.raycastResults);
        }
        /**
         * @en
         * Collision detect all collider, and record and ray test results with the shortest distance
         * by PhysicsSystem.Instance.RaycastClosestResult access to the results.
         * @zh
         * 检测所有的碰撞盒，并记录与射线距离最短的检测结果，通过 PhysicsSystem.instance.raycastClosestResult 访问结果。
         * @param worldRay 世界空间下的一条射线
         * @param mask 掩码，默认为 0xffffffff
         * @param maxDistance 最大检测距离，默认为 10000000，目前请勿传入 Infinity 或 Number.MAX_VALUE
         * @param queryTrigger 是否检测触发器
         * @return boolean 表示是否有检测到碰撞盒
         */
        ;

        _proto.raycastClosest = function raycastClosest(worldRay, mask, maxDistance, queryTrigger) {
          if (mask === void 0) {
            mask = 0xffffffff;
          }

          if (maxDistance === void 0) {
            maxDistance = 10000000;
          }

          if (queryTrigger === void 0) {
            queryTrigger = true;
          }

          if (!this.physicsWorld) return false;
          this.raycastOptions.mask = mask >>> 0;
          this.raycastOptions.maxDistance = maxDistance;
          this.raycastOptions.queryTrigger = queryTrigger;
          return this.physicsWorld.raycastClosest(worldRay, this.raycastOptions, this.raycastClosestResult);
        };

        _proto._updateMaterial = function _updateMaterial() {
          if (this.physicsWorld) this.physicsWorld.setDefaultMaterial(this._material);
        }
        /**
         * @en
         * Construct and register the system singleton.
         * If the module is pre-loaded, it will be executed automatically.
         * @zh
         * 构造并注册系统单例。
         * 预先加载模块的情况下，会自动执行。
         */
        ;

        PhysicsSystem.constructAndRegister = function constructAndRegister() {
          if (!PhysicsSystem._instance) {
            // Construct physics world and physics system only once
            var sys = new PhysicsSystem();
            sys.resetConfiguration();
            constructDefaultWorld(sys);
            PhysicsSystem._instance = sys;
            director.registerSystem(PhysicsSystem.ID, sys, sys.priority);
          }
        };

        _createClass(PhysicsSystem, [{
          key: "enable",
          get:
          /**
           * @en
           * Gets or sets whether the physical system is enabled, which can be used to pause or continue running the physical system.
           * @zh
           * 获取或设置是否启用物理系统，可以用于暂停或继续运行物理系统。
           */
          function get() {
            return this._enable;
          },
          set: function set(value) {
            this._enable = value;
          }
          /**
           * @zh
           * Gets or sets whether the physical system allows automatic sleep, which defaults to true.
           * @zh
           * 获取或设置物理系统是否允许自动休眠，默认为 true。
           */

        }, {
          key: "allowSleep",
          get: function get() {
            return this._allowSleep;
          },
          set: function set(v) {
            this._allowSleep = v;

            if (this.physicsWorld) {
              this.physicsWorld.setAllowSleep(v);
            }
          }
          /**
           * @en
           * Gets or sets the maximum number of simulated substeps per frame.
           * @zh
           * 获取或设置每帧模拟的最大子步数。
           */

        }, {
          key: "maxSubSteps",
          get: function get() {
            return this._maxSubSteps;
          },
          set: function set(value) {
            this._maxSubSteps = value;
          }
          /**
           * @en
           * Gets or sets the fixed delta time consumed by each simulation step in seconds.
           * @zh
           * 获取或设置每步模拟消耗的固定时间（以 s 为单位）。
           */

        }, {
          key: "fixedTimeStep",
          get: function get() {
            return this._fixedTimeStep;
          },
          set: function set(value) {
            this._fixedTimeStep = value;
          }
          /**
           * @en
           * Gets or sets the value of gravity in the physical world, which defaults to (0, -10, 0).
           * @zh
           * 获取或设置物理世界的重力数值，默认为 (0, -10, 0)。
           */

        }, {
          key: "gravity",
          get: function get() {
            return this._gravity;
          },
          set: function set(gravity) {
            this._gravity.set(gravity);

            if (this.physicsWorld) {
              this.physicsWorld.setGravity(gravity);
            }
          }
          /**
           * @en
           * Gets or sets the default speed threshold for going to sleep.
           * @zh
           * 获取或设置进入休眠的默认速度临界值。
           */

        }, {
          key: "sleepThreshold",
          get: function get() {
            return this._sleepThreshold;
          },
          set: function set(v) {
            this._sleepThreshold = v;
          }
          /**
           * @en
           * Turn on or off the automatic simulation.
           * @zh
           * 获取或设置是否自动模拟。
           */

        }, {
          key: "autoSimulation",
          get: function get() {
            return this._autoSimulation;
          },
          set: function set(value) {
            this._autoSimulation = value;
          }
          /**
           * @en
           * Gets the global default physical material.
           * @zh
           * 获取全局的默认物理材质。
           */

        }, {
          key: "defaultMaterial",
          get: function get() {
            return this._material;
          }
          /**
           * @en
           * Gets the wrappered object of the physical world through which you can access the actual underlying object.
           * @zh
           * 获取物理世界的封装对象，通过它你可以访问到实际的底层对象。
           */

        }, {
          key: "physicsWorld",
          get: function get() {
            return selector.physicsWorld;
          }
          /**
           * @en
           * Gets the raycastClosest test result.
           * @zh
           * 获取 raycastClosest 的检测结果。
           */

        }], [{
          key: "PHYSICS_NONE",
          get: function get() {
            return !selector.id;
          }
        }, {
          key: "PHYSICS_BUILTIN",
          get: function get() {
            return selector.id === 'builtin';
          }
        }, {
          key: "PHYSICS_CANNON",
          get: function get() {
            return selector.id === 'cannon.js';
          }
        }, {
          key: "PHYSICS_BULLET",
          get: function get() {
            return selector.id === 'bullet';
          }
        }, {
          key: "PHYSICS_PHYSX",
          get: function get() {
            return selector.id === 'physx';
          }
          /**
           * @en
           * Gets the ID of the system.
           * @zh
           * 获取此系统的ID。
           */

        }, {
          key: "PhysicsGroup",
          get:
          /**
           * @en
           * Gets the predefined physics groups.
           * @zh
           * 获取预定义的物理分组。
           */
          function get() {
            return PhysicsGroup;
          }
          /**
           * @en
           * Gets the physical system instance.
           * @zh
           * 获取物理系统实例。
           */

        }, {
          key: "instance",
          get: function get() {
            return PhysicsSystem._instance;
          }
        }]);

        return PhysicsSystem;
      }(System));
      /**
       * By registering the initialization event, the system can be automatically
       * constructed and registered when the module is pre-loaded
       */


      PhysicsSystem.ID = 'PHYSICS';
      PhysicsSystem._instance = null;
      director.once(Director.EVENT_INIT, function () {
        PhysicsSystem.constructAndRegister();
      });
    }
  };
});