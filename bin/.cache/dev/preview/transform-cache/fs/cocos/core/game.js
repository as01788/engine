System.register("q-bundled:///fs/cocos/core/game.js", ["../../../virtual/internal%253Aconstants.js", "pal/system-info", "./event/index.js", "../input/index.js", "./platform/debug.js", "./gfx/index.js", "./platform/sys.js", "./platform/macro.js", "./global-exports.js", "./pipeline/define.js", "./pipeline/index.js", "../../pal/system-info/enum-type/index.js", "./scene-graph/index.js", "./math/bits.js", "./data/garbage-collection.js", "./platform/screen.js"], function (_export, _context) {
  "use strict";

  var EDITOR, HTML5, JSB, PREVIEW, RUNTIME_BASED, TEST, systemInfo, EventTarget, input, debug, Device, DeviceInfo, SwapchainInfo, sys, macro, legacyCC, VERSION, bindingMappingInfo, RenderPipeline, BrowserType, Layers, log2, garbageCollectionManager, screen, Game, game;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      HTML5 = _virtualInternal253AconstantsJs.HTML5;
      JSB = _virtualInternal253AconstantsJs.JSB;
      PREVIEW = _virtualInternal253AconstantsJs.PREVIEW;
      RUNTIME_BASED = _virtualInternal253AconstantsJs.RUNTIME_BASED;
      TEST = _virtualInternal253AconstantsJs.TEST;
    }, function (_palSystemInfo) {
      systemInfo = _palSystemInfo.systemInfo;
    }, function (_eventIndexJs) {
      EventTarget = _eventIndexJs.EventTarget;
    }, function (_inputIndexJs) {
      input = _inputIndexJs.input;
    }, function (_platformDebugJs) {
      debug = _platformDebugJs;
    }, function (_gfxIndexJs) {
      Device = _gfxIndexJs.Device;
      DeviceInfo = _gfxIndexJs.DeviceInfo;
      SwapchainInfo = _gfxIndexJs.SwapchainInfo;
    }, function (_platformSysJs) {
      sys = _platformSysJs.sys;
    }, function (_platformMacroJs) {
      macro = _platformMacroJs.macro;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
      VERSION = _globalExportsJs.VERSION;
    }, function (_pipelineDefineJs) {
      bindingMappingInfo = _pipelineDefineJs.bindingMappingInfo;
    }, function (_pipelineIndexJs) {
      RenderPipeline = _pipelineIndexJs.RenderPipeline;
    }, function (_palSystemInfoEnumTypeIndexJs) {
      BrowserType = _palSystemInfoEnumTypeIndexJs.BrowserType;
    }, function (_sceneGraphIndexJs) {
      Layers = _sceneGraphIndexJs.Layers;
    }, function (_mathBitsJs) {
      log2 = _mathBitsJs.log2;
    }, function (_dataGarbageCollectionJs) {
      garbageCollectionManager = _dataGarbageCollectionJs.garbageCollectionManager;
    }, function (_platformScreenJs) {
      screen = _platformScreenJs.screen;
    }],
    execute: function () {
      /**
       * @en An object to boot the game.
       * @zh 包含游戏主体信息并负责驱动游戏的游戏对象。
       */
      _export("Game", Game = /*#__PURE__*/function (_EventTarget) {
        _inheritsLoose(Game, _EventTarget);

        function Game() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _EventTarget.call.apply(_EventTarget, [this].concat(args)) || this;
          _this.frame = null;
          _this.container = null;
          _this.canvas = null;
          _this.renderType = -1;
          _this.eventTargetOn = _EventTarget.prototype.on;
          _this.eventTargetOnce = _EventTarget.prototype.once;
          _this.config = {};
          _this.onStart = null;
          _this.frameTime = 1000 / 60;
          _this.collisionMatrix = [];
          _this.groupList = [];
          _this._persistRootNodes = {};
          _this._gfxDevice = null;
          _this._swapchain = null;
          _this._configLoaded = false;
          _this._isCloning = false;
          _this._inited = false;
          _this._engineInited = false;
          _this._rendererInitialized = false;
          _this._paused = true;
          _this._frameRate = 60;
          _this._intervalId = 0;
          _this._initTime = 0;
          _this._startTime = 0;
          _this._deltaTime = 0.0;
          return _this;
        }

        var _proto = Game.prototype;

        // @Methods
        //  @Game play control

        /**
         * @en Set frame rate of game.
         * @zh 设置游戏帧率。
         * @deprecated since v3.3.0 please use [[game.frameRate]]
         */
        _proto.setFrameRate = function setFrameRate(frameRate) {
          this.frameRate = frameRate;
        }
        /**
         * @en Get frame rate set for the game, it doesn't represent the real frame rate.
         * @zh 获取设置的游戏帧率（不等同于实际帧率）。
         * @return frame rate
         * @deprecated since v3.3.0 please use [[game.frameRate]]
         */
        ;

        _proto.getFrameRate = function getFrameRate() {
          return this.frameRate;
        }
        /**
         * @en Run the game frame by frame with a fixed delta time correspond to frame rate.
         * @zh 以固定帧间隔执行一帧游戏循环，帧间隔与设定的帧率匹配。
         */
        ;

        _proto.step = function step() {
          legacyCC.director.tick(this.frameTime / 1000);
        }
        /**
         * @en Pause the game main loop. This will pause:
         * - game logic execution
         * - rendering process
         * - input event dispatching (excluding Web and Minigame platforms)
         *
         * This is different with `director.pause()` which only pause the game logic execution.
         *
         * @zh 暂停游戏主循环。包含：
         * - 游戏逻辑
         * - 渲染
         * - 输入事件派发（Web 和小游戏平台除外）
         *
         * 这点和只暂停游戏逻辑的 `director.pause()` 不同。
         */
        ;

        _proto.pause = function pause() {
          if (this._paused) {
            return;
          }

          this._paused = true;

          if (this._intervalId) {
            window.cAF(this._intervalId);
            this._intervalId = 0;
          }
        }
        /**
         * @en Resume the game from pause. This will resume:<br>
         * game logic execution, rendering process, event manager, background music and all audio effects.<br>
         * @zh 恢复游戏主循环。包含：游戏逻辑，渲染，事件处理，背景音乐和所有音效。
         */
        ;

        _proto.resume = function resume() {
          if (!this._paused) {
            return;
          } // @ts-expect-error _clearEvents is a private method.


          input._clearEvents();

          if (this._intervalId) {
            window.cAF(this._intervalId);
            this._intervalId = 0;
          }

          this._paused = false;

          this._updateCallback();

          this._intervalId = window.rAF(this._frameCB);
        }
        /**
         * @en Check whether the game is paused.
         * @zh 判断游戏是否暂停。
         */
        ;

        _proto.isPaused = function isPaused() {
          return this._paused;
        }
        /**
         * @en Restart game.
         * @zh 重新开始游戏
         */
        ;

        _proto.restart = function restart() {
          var _this2 = this;

          var endFramePromise = new Promise(function (resolve) {
            return legacyCC.director.once(legacyCC.Director.EVENT_END_FRAME, function () {
              return resolve();
            });
          });
          return endFramePromise.then(function () {
            for (var id in _this2._persistRootNodes) {
              _this2.removePersistRootNode(_this2._persistRootNodes[id]);
            } // Clear scene


            legacyCC.director.getScene().destroy();

            legacyCC.Object._deferredDestroy();

            legacyCC.director.reset();

            _this2.pause();

            return _this2._setRenderPipelineNShowSplash().then(function () {
              _this2.resume();

              _this2._safeEmit(Game.EVENT_RESTART);
            });
          });
        }
        /**
         * @en End game, it will close the game window
         * @zh 退出游戏
         */
        ;

        _proto.end = function end() {
          systemInfo.close();
        }
        /**
         * @en
         * Register an callback of a specific event type on the game object.<br>
         * This type of event should be triggered via `emit`.<br>
         * @zh
         * 注册 game 的特定事件类型回调。这种类型的事件应该被 `emit` 触发。<br>
         *
         * @param type - A string representing the event type to listen for.
         * @param callback - The callback that will be invoked when the event is dispatched.<br>
         *                              The callback is ignored if it is a duplicate (the callbacks are unique).
         * @param target - The target (this object) to invoke the callback, can be null
         * @param once - After the first invocation, whether the callback should be unregistered.
         * @return - Just returns the incoming callback so you can save the anonymous function easier.
         */
        ;

        _proto.on = function on(type, callback, target, once) {
          // Make sure EVENT_ENGINE_INITED callbacks to be invoked
          if (this._engineInited && type === Game.EVENT_ENGINE_INITED || this._inited && type === Game.EVENT_GAME_INITED || this._rendererInitialized && type === Game.EVENT_RENDERER_INITED) {
            callback.call(target);
          }

          return this.eventTargetOn(type, callback, target, once);
        }
        /**
         * @en
         * Register an callback of a specific event type on the game object,<br>
         * the callback will remove itself after the first time it is triggered.<br>
         * @zh
         * 注册 game 的特定事件类型回调，回调会在第一时间被触发后删除自身。
         *
         * @param type - A string representing the event type to listen for.
         * @param callback - The callback that will be invoked when the event is dispatched.<br>
         *                              The callback is ignored if it is a duplicate (the callbacks are unique).
         * @param target - The target (this object) to invoke the callback, can be null
         */
        ;

        _proto.once = function once(type, callback, target) {
          // Make sure EVENT_ENGINE_INITED callbacks to be invoked
          if (this._engineInited && type === Game.EVENT_ENGINE_INITED) {
            return callback.call(target);
          }

          return this.eventTargetOnce(type, callback, target);
        }
        /**
         * @en Init game with configuration object.
         * @zh 使用指定的配置初始化引擎。
         * @param config - Pass configuration object
         */
        ;

        _proto.init = function init(config) {
          var _this3 = this;

          this._initConfig(config); // TODO: unify the screen initialization workflow.


          if (HTML5) {
            // @ts-expect-error access private method.
            screen._init({
              configOrientation: config.orientation || 'auto',
              exactFitScreen: config.exactFitScreen
            });
          } // Init assetManager


          if (this.config.assetOptions) {
            legacyCC.assetManager.init(this.config.assetOptions);
          }

          if (this.config.layers) {
            var userLayers = this.config.layers;

            for (var i = 0; i < userLayers.length; i++) {
              var layer = userLayers[i];
              var bitNum = log2(layer.value);
              Layers.addLayer(layer.name, bitNum);
            }
          }

          return this._initEngine().then(function () {
            if (!EDITOR) {
              _this3._initEvents();
            }

            if (legacyCC.director.root && legacyCC.director.root.dataPoolManager) {
              legacyCC.director.root.dataPoolManager.jointTexturePool.registerCustomTextureLayouts(config.customJointTextureLayouts);
            }

            return _this3._engineInited;
          });
        }
        /**
         * @en Run game with configuration object and onStart function.
         * @zh 运行游戏，并且指定引擎配置和 onStart 的回调。
         * @param onStart - function to be executed after game initialized
         */
        ;

        _proto.run = function run(configOrCallback, onStart) {
          var _this4 = this;

          // To compatible with older version,
          // we allow the `run(config, onstart?)` form. But it's deprecated.
          var initPromise;

          if (typeof configOrCallback !== 'function' && configOrCallback) {
            initPromise = this.init(configOrCallback);
            this.onStart = onStart !== null && onStart !== void 0 ? onStart : null;
          } else {
            this.onStart = configOrCallback !== null && configOrCallback !== void 0 ? configOrCallback : null;
          }

          garbageCollectionManager.init();
          return Promise.resolve(initPromise).then(function () {
            return _this4._setRenderPipelineNShowSplash();
          }).then(function () {
            if (!HTML5) {
              // @ts-expect-error access private method.
              screen._init({
                configOrientation: 'auto',
                exactFitScreen: true
              });
            }
          });
        } //  @ Persist root node section

        /**
         * @en
         * Add a persistent root node to the game, the persistent node won't be destroyed during scene transition.<br>
         * The target node must be placed in the root level of hierarchy, otherwise this API won't have any effect.
         * @zh
         * 声明常驻根节点，该节点不会在场景切换中被销毁。<br>
         * 目标节点必须位于为层级的根节点，否则无效。
         * @param node - The node to be made persistent
         */
        ;

        _proto.addPersistRootNode = function addPersistRootNode(node) {
          if (!legacyCC.Node.isNode(node) || !node.uuid) {
            debug.warnID(3800);
            return;
          }

          var id = node.uuid;

          if (!this._persistRootNodes[id]) {
            var scene = legacyCC.director._scene;

            if (legacyCC.isValid(scene)) {
              if (!node.parent) {
                node.parent = scene;
              } else if (!(node.parent instanceof legacyCC.Scene)) {
                debug.warnID(3801);
                return;
              } else if (node.parent !== scene) {
                debug.warnID(3802);
                return;
              } else {
                node._originalSceneId = scene.uuid;
              }
            }

            this._persistRootNodes[id] = node;
            node._persistNode = true;

            legacyCC.assetManager._releaseManager._addPersistNodeRef(node);
          }
        }
        /**
         * @en Remove a persistent root node.
         * @zh 取消常驻根节点。
         * @param node - The node to be removed from persistent node list
         */
        ;

        _proto.removePersistRootNode = function removePersistRootNode(node) {
          var id = node.uuid || '';

          if (node === this._persistRootNodes[id]) {
            delete this._persistRootNodes[id];
            node._persistNode = false;
            node._originalSceneId = '';

            legacyCC.assetManager._releaseManager._removePersistNodeRef(node);
          }
        }
        /**
         * @en Check whether the node is a persistent root node.
         * @zh 检查节点是否是常驻根节点。
         * @param node - The node to be checked
         */
        ;

        _proto.isPersistRootNode = function isPersistRootNode(node) {
          return !!node._persistNode;
        } //  @Engine loading
        ;

        _proto._initEngine = function _initEngine() {
          var _this5 = this;

          this._initDevice();

          var director = legacyCC.director;
          return Promise.resolve(director._init()).then(function () {
            legacyCC.view.init(); // Log engine version

            debug.log("Cocos Creator v" + VERSION);

            _this5.emit(Game.EVENT_ENGINE_INITED);

            _this5._engineInited = true;

            if (legacyCC.internal.dynamicAtlasManager) {
              legacyCC.internal.dynamicAtlasManager.enabled = !macro.CLEANUP_IMAGE_CACHE;
            }
          });
        } // @Methods
        //  @Time ticker section
        ;

        _proto._setAnimFrame = function _setAnimFrame() {
          var frameRate = this._frameRate;

          if (JSB) {
            // @ts-expect-error JSB Call
            jsb.setPreferredFramesPerSecond(frameRate);
            window.rAF = window.requestAnimationFrame;
            window.cAF = window.cancelAnimationFrame;
          } else {
            var rAF = window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;

            if (frameRate !== 60 && frameRate !== 30) {
              window.rAF = this._stTime.bind(this);
              window.cAF = this._ctTime;
            } else {
              window.rAF = rAF || this._stTime.bind(this);
              window.cAF = window.cancelAnimationFrame || window.cancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || window.msCancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.ocancelAnimationFrame || this._ctTime; // update callback function for 30 fps version

              this._updateCallback();
            }
          }
        };

        _proto._stTime = function _stTime(callback) {
          var currTime = performance.now();
          var elapseTime = Math.max(0, currTime - this._startTime);
          var timeToCall = Math.max(0, this.frameTime - elapseTime);
          var id = window.setTimeout(callback, timeToCall);
          return id;
        };

        _proto._ctTime = function _ctTime(id) {
          window.clearTimeout(id);
        };

        _proto._calculateDT = function _calculateDT(now) {
          if (!now) now = performance.now();
          this._deltaTime = now > this._startTime ? (now - this._startTime) / 1000 : 0;

          if (this._deltaTime > Game.DEBUG_DT_THRESHOLD) {
            this._deltaTime = this.frameTime / 1000;
          }

          this._startTime = now;
          return this._deltaTime;
        };

        _proto._updateCallback = function _updateCallback() {
          var _this6 = this;

          var director = legacyCC.director;
          var callback;

          if (!JSB && !RUNTIME_BASED && this._frameRate === 30) {
            var skip = true;

            callback = function callback(time) {
              _this6._intervalId = window.rAF(_this6._frameCB);
              skip = !skip;

              if (skip) {
                return;
              }

              director.tick(_this6._calculateDT(time));
            };
          } else {
            callback = function callback(time) {
              director.tick(_this6._calculateDT(time));
              _this6._intervalId = window.rAF(_this6._frameCB);
            };
          }

          this._frameCB = callback;
        } // Run game.
        ;

        _proto._runMainLoop = function _runMainLoop() {
          if (!this._inited || EDITOR && !legacyCC.GAME_VIEW) {
            return;
          }

          var config = this.config;
          var director = legacyCC.director;
          debug.setDisplayStats(!!config.showFPS);
          director.startAnimation();
          this.resume();
        } // @Game loading section
        ;

        _proto._initConfig = function _initConfig(config) {
          // Configs adjustment
          if (typeof config.debugMode !== 'number') {
            config.debugMode = debug.DebugMode.NONE;
          }

          config.exposeClassName = !!config.exposeClassName;

          if (typeof config.frameRate !== 'number') {
            config.frameRate = 60;
          }

          var renderMode = config.renderMode;

          if (typeof renderMode !== 'number' || renderMode > 3 || renderMode < 0) {
            config.renderMode = 0;
          }

          config.showFPS = !!config.showFPS;

          debug._resetDebugSetting(config.debugMode);

          this.config = config;
          this._configLoaded = true;
          this.frameRate = config.frameRate;
        };

        _proto._determineRenderType = function _determineRenderType() {
          var config = this.config;
          var userRenderMode = parseInt(config.renderMode, 10); // Determine RenderType

          this.renderType = Game.RENDER_TYPE_CANVAS;
          var supportRender = false;

          if (userRenderMode === 1) {
            this.renderType = Game.RENDER_TYPE_CANVAS;
            supportRender = true;
          } else if (userRenderMode === 0 || userRenderMode === 2) {
            this.renderType = Game.RENDER_TYPE_WEBGL;
            supportRender = true;
          } else if (userRenderMode === 3) {
            this.renderType = Game.RENDER_TYPE_HEADLESS;
            supportRender = true;
          }

          if (!supportRender) {
            throw new Error(debug.getError(3820, userRenderMode));
          }
        };

        _proto._initDevice = function _initDevice() {
          // Avoid setup to be called twice.
          if (this._rendererInitialized) {
            return;
          } // Obtain platform-related objects through the adapter


          var adapter = this.config.adapter;

          if (adapter) {
            this.canvas = adapter.canvas;
            this.frame = adapter.frame;
            this.container = adapter.container;
          }

          this._determineRenderType(); // WebGL context created successfully


          if (this.renderType === Game.RENDER_TYPE_WEBGL) {
            var deviceInfo = new DeviceInfo(bindingMappingInfo);

            if (JSB && window.gfx) {
              this._gfxDevice = gfx.DeviceManager.create(deviceInfo);
            } else {
              var useWebGL2 = !!window.WebGL2RenderingContext;
              var userAgent = window.navigator.userAgent.toLowerCase();

              if (userAgent.indexOf('safari') !== -1 && userAgent.indexOf('chrome') === -1 || sys.browserType === BrowserType.UC // UC browser implementation doesn't conform to WebGL2 standard
              ) {
                  useWebGL2 = false;
                }

              var deviceCtors = [];

              if (useWebGL2 && legacyCC.WebGL2Device) {
                deviceCtors.push(legacyCC.WebGL2Device);
              }

              if (legacyCC.WebGLDevice) {
                deviceCtors.push(legacyCC.WebGLDevice);
              }

              if (legacyCC.EmptyDevice) {
                deviceCtors.push(legacyCC.EmptyDevice);
              }

              Device.canvas = this.canvas;

              for (var i = 0; i < deviceCtors.length; i++) {
                this._gfxDevice = new deviceCtors[i]();

                if (this._gfxDevice.initialize(deviceInfo)) {
                  break;
                }
              }
            }
          } else if (this.renderType === Game.RENDER_TYPE_HEADLESS && legacyCC.EmptyDevice) {
            this._gfxDevice = new legacyCC.EmptyDevice();

            this._gfxDevice.initialize(new DeviceInfo(bindingMappingInfo));
          }

          if (!this._gfxDevice) {
            // todo fix here for wechat game
            debug.error('can not support canvas rendering in 3D');
            this.renderType = Game.RENDER_TYPE_CANVAS;
            return;
          }

          var swapchainInfo = new SwapchainInfo(this.canvas);
          var windowSize = screen.windowSize;
          swapchainInfo.width = windowSize.width;
          swapchainInfo.height = windowSize.height;
          this._swapchain = this._gfxDevice.createSwapchain(swapchainInfo);

          this.canvas.oncontextmenu = function () {
            return false;
          };
        };

        _proto._initEvents = function _initEvents() {
          systemInfo.on('show', this._onShow, this);
          systemInfo.on('hide', this._onHide, this);
        };

        _proto._onHide = function _onHide() {
          this.emit(Game.EVENT_HIDE);
          this.pause();
        };

        _proto._onShow = function _onShow() {
          this.emit(Game.EVENT_SHOW);
          this.resume();
        };

        _proto._setRenderPipelineNShowSplash = function _setRenderPipelineNShowSplash() {
          var _this7 = this;

          // The test environment does not currently support the renderer
          if (TEST) {
            return Promise.resolve(function () {
              _this7._rendererInitialized = true;

              _this7._safeEmit(Game.EVENT_RENDERER_INITED);

              _this7._inited = true;

              _this7._setAnimFrame();

              _this7._runMainLoop();

              _this7._safeEmit(Game.EVENT_GAME_INITED);

              if (_this7.onStart) {
                _this7.onStart();
              }
            }());
          }

          return Promise.resolve(this._setupRenderPipeline()).then(function () {
            return Promise.resolve(_this7._showSplashScreen()).then(function () {
              _this7._inited = true;
              _this7._initTime = performance.now();

              _this7._runMainLoop();

              _this7._safeEmit(Game.EVENT_GAME_INITED);

              if (_this7.onStart) {
                _this7.onStart();
              }
            });
          });
        };

        _proto._setupRenderPipeline = function _setupRenderPipeline() {
          var _this8 = this;

          var renderPipeline = this.config.renderPipeline;

          if (!renderPipeline) {
            return this._setRenderPipeline();
          }

          return new Promise(function (resolve, reject) {
            legacyCC.assetManager.loadAny(renderPipeline, function (err, asset) {
              return err || !(asset instanceof RenderPipeline) ? reject(err) : resolve(asset);
            });
          }).then(function (asset) {
            _this8._setRenderPipeline(asset);
          })["catch"](function (reason) {
            debug.warn(reason);
            debug.warn("Failed load render pipeline: " + renderPipeline + ", engine failed to initialize, will fallback to default pipeline");

            _this8._setRenderPipeline();
          });
        };

        _proto._showSplashScreen = function _showSplashScreen() {
          if (!EDITOR && !PREVIEW && legacyCC.internal.SplashScreen) {
            var splashScreen = legacyCC.internal.SplashScreen.instance;
            splashScreen.main(legacyCC.director.root);
            return new Promise(function (resolve) {
              splashScreen.setOnFinish(function () {
                return resolve();
              });
              splashScreen.loadFinish = true;
            });
          }

          return null;
        };

        _proto._setRenderPipeline = function _setRenderPipeline(rppl) {
          if (!legacyCC.director.root.setRenderPipeline(rppl)) {
            this._setRenderPipeline();
          }

          this._rendererInitialized = true;

          this._safeEmit(Game.EVENT_RENDERER_INITED);
        };

        _proto._safeEmit = function _safeEmit(event) {
          if (EDITOR) {
            try {
              this.emit(event);
            } catch (e) {
              debug.warn(e);
            }
          } else {
            this.emit(event);
          }
        };

        _createClass(Game, [{
          key: "inited",
          get:
          /**
           * @en Indicates whether the engine and the renderer has been initialized
           * @zh 引擎和渲染器是否以完成初始化
           */
          function get() {
            return this._inited;
          }
          /**
           * @en Expected frame rate of the game.
           * @zh 游戏的设定帧率。
           */

        }, {
          key: "frameRate",
          get: function get() {
            return this._frameRate;
          },
          set: function set(frameRate) {
            if (typeof frameRate !== 'number') {
              frameRate = parseInt(frameRate, 10);

              if (Number.isNaN(frameRate)) {
                frameRate = 60;
              }
            }

            this._frameRate = frameRate;
            this.frameTime = 1000 / frameRate;

            this._setAnimFrame();
          }
          /**
           * @en The delta time since last frame, unit: s.
           * @zh 获取上一帧的增量时间，以秒为单位。
           */

        }, {
          key: "deltaTime",
          get: function get() {
            return this._deltaTime;
          }
          /**
           * @en The total passed time since game start, unit: ms
           * @zh 获取从游戏开始到现在总共经过的时间，以毫秒为单位
           */

        }, {
          key: "totalTime",
          get: function get() {
            return performance.now() - this._initTime;
          }
          /**
           * @en The start time of the current frame in milliseconds.
           * @zh 获取当前帧开始的时间（以 ms 为单位）。
           */

        }, {
          key: "frameStartTime",
          get: function get() {
            return this._startTime;
          }
          /**
           * @en The expected delta time of each frame in milliseconds
           * @zh 期望帧率对应的每帧时间（以 ms 为单位）
           */

        }]);

        return Game;
      }(EventTarget));

      Game.EVENT_HIDE = 'game_on_hide';
      Game.EVENT_SHOW = 'game_on_show';
      Game.EVENT_LOW_MEMORY = 'game_on_low_memory';
      Game.EVENT_GAME_INITED = 'game_inited';
      Game.EVENT_ENGINE_INITED = 'engine_inited';
      Game.EVENT_RENDERER_INITED = 'renderer_inited';
      Game.EVENT_RESTART = 'game_on_restart';
      Game.RENDER_TYPE_CANVAS = 0;
      Game.RENDER_TYPE_WEBGL = 1;
      Game.RENDER_TYPE_OPENGL = 2;
      Game.RENDER_TYPE_HEADLESS = 3;
      Game.DEBUG_DT_THRESHOLD = 1;
      legacyCC.Game = Game;
      /**
       * @en
       * This is a Game instance.
       * @zh
       * 这是一个 Game 类的实例，包含游戏主体信息并负责驱动游戏的游戏对象。
       */

      _export("game", game = legacyCC.game = new Game());
    }
  };
});