"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.game = exports.Game = void 0;

var _internal253Aconstants = require("../../../virtual/internal%253Aconstants.js");

var _systemInfo = require("pal/system-info");

var _index = require("./event/index.js");

var _index2 = require("../input/index.js");

var debug = _interopRequireWildcard(require("./platform/debug.js"));

var _index3 = require("./gfx/index.js");

var _sys = require("./platform/sys.js");

var _macro = require("./platform/macro.js");

var _globalExports = require("./global-exports.js");

var _define = require("./pipeline/define.js");

var _index4 = require("./pipeline/index.js");

var _index5 = require("../../pal/system-info/enum-type/index.js");

var _index6 = require("./scene-graph/index.js");

var _bits = require("./math/bits.js");

var _garbageCollection = require("./data/garbage-collection.js");

var _screen = require("./platform/screen.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

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
 * @module core
 */

/**
 * @en An object to boot the game.
 * @zh 包含游戏主体信息并负责驱动游戏的游戏对象。
 */
class Game extends _index.EventTarget {
  constructor(...args) {
    super(...args);
    this.frame = null;
    this.container = null;
    this.canvas = null;
    this.renderType = -1;
    this.eventTargetOn = super.on;
    this.eventTargetOnce = super.once;
    this.config = {};
    this.onStart = null;
    this.frameTime = 1000 / 60;
    this.collisionMatrix = [];
    this.groupList = [];
    this._persistRootNodes = {};
    this._gfxDevice = null;
    this._swapchain = null;
    this._configLoaded = false;
    this._isCloning = false;
    this._inited = false;
    this._engineInited = false;
    this._rendererInitialized = false;
    this._paused = true;
    this._frameRate = 60;
    this._intervalId = 0;
    this._initTime = 0;
    this._startTime = 0;
    this._deltaTime = 0.0;
  }

  /**
   * @en Indicates whether the engine and the renderer has been initialized
   * @zh 引擎和渲染器是否以完成初始化
   */
  get inited() {
    return this._inited;
  }
  /**
   * @en Expected frame rate of the game.
   * @zh 游戏的设定帧率。
   */


  get frameRate() {
    return this._frameRate;
  }

  set frameRate(frameRate) {
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


  get deltaTime() {
    return this._deltaTime;
  }
  /**
   * @en The total passed time since game start, unit: ms
   * @zh 获取从游戏开始到现在总共经过的时间，以毫秒为单位
   */


  get totalTime() {
    return performance.now() - this._initTime;
  }
  /**
   * @en The start time of the current frame in milliseconds.
   * @zh 获取当前帧开始的时间（以 ms 为单位）。
   */


  get frameStartTime() {
    return this._startTime;
  }
  /**
   * @en The expected delta time of each frame in milliseconds
   * @zh 期望帧率对应的每帧时间（以 ms 为单位）
   */


  // @Methods
  //  @Game play control

  /**
   * @en Set frame rate of game.
   * @zh 设置游戏帧率。
   * @deprecated since v3.3.0 please use [[game.frameRate]]
   */
  setFrameRate(frameRate) {
    this.frameRate = frameRate;
  }
  /**
   * @en Get frame rate set for the game, it doesn't represent the real frame rate.
   * @zh 获取设置的游戏帧率（不等同于实际帧率）。
   * @return frame rate
   * @deprecated since v3.3.0 please use [[game.frameRate]]
   */


  getFrameRate() {
    return this.frameRate;
  }
  /**
   * @en Run the game frame by frame with a fixed delta time correspond to frame rate.
   * @zh 以固定帧间隔执行一帧游戏循环，帧间隔与设定的帧率匹配。
   */


  step() {
    _globalExports.legacyCC.director.tick(this.frameTime / 1000);
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


  pause() {
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


  resume() {
    if (!this._paused) {
      return;
    } // @ts-expect-error _clearEvents is a private method.


    _index2.input._clearEvents();

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


  isPaused() {
    return this._paused;
  }
  /**
   * @en Restart game.
   * @zh 重新开始游戏
   */


  restart() {
    const endFramePromise = new Promise(resolve => _globalExports.legacyCC.director.once(_globalExports.legacyCC.Director.EVENT_END_FRAME, () => resolve()));
    return endFramePromise.then(() => {
      for (const id in this._persistRootNodes) {
        this.removePersistRootNode(this._persistRootNodes[id]);
      } // Clear scene


      _globalExports.legacyCC.director.getScene().destroy();

      _globalExports.legacyCC.Object._deferredDestroy();

      _globalExports.legacyCC.director.reset();

      this.pause();
      return this._setRenderPipelineNShowSplash().then(() => {
        this.resume();

        this._safeEmit(Game.EVENT_RESTART);
      });
    });
  }
  /**
   * @en End game, it will close the game window
   * @zh 退出游戏
   */


  end() {
    _systemInfo.systemInfo.close();
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


  on(type, callback, target, once) {
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


  once(type, callback, target) {
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


  init(config) {
    this._initConfig(config); // TODO: unify the screen initialization workflow.


    if (_internal253Aconstants.HTML5) {
      // @ts-expect-error access private method.
      _screen.screen._init({
        configOrientation: config.orientation || 'auto',
        exactFitScreen: config.exactFitScreen
      });
    } // Init assetManager


    if (this.config.assetOptions) {
      _globalExports.legacyCC.assetManager.init(this.config.assetOptions);
    }

    if (this.config.layers) {
      const userLayers = this.config.layers;

      for (let i = 0; i < userLayers.length; i++) {
        const layer = userLayers[i];
        const bitNum = (0, _bits.log2)(layer.value);

        _index6.Layers.addLayer(layer.name, bitNum);
      }
    }

    return this._initEngine().then(() => {
      if (!_internal253Aconstants.EDITOR) {
        this._initEvents();
      }

      if (_globalExports.legacyCC.director.root && _globalExports.legacyCC.director.root.dataPoolManager) {
        _globalExports.legacyCC.director.root.dataPoolManager.jointTexturePool.registerCustomTextureLayouts(config.customJointTextureLayouts);
      }

      return this._engineInited;
    });
  }
  /**
   * @en Run game with configuration object and onStart function.
   * @zh 运行游戏，并且指定引擎配置和 onStart 的回调。
   * @param onStart - function to be executed after game initialized
   */


  run(configOrCallback, onStart) {
    // To compatible with older version,
    // we allow the `run(config, onstart?)` form. But it's deprecated.
    let initPromise;

    if (typeof configOrCallback !== 'function' && configOrCallback) {
      initPromise = this.init(configOrCallback);
      this.onStart = onStart !== null && onStart !== void 0 ? onStart : null;
    } else {
      this.onStart = configOrCallback !== null && configOrCallback !== void 0 ? configOrCallback : null;
    }

    _garbageCollection.garbageCollectionManager.init();

    return Promise.resolve(initPromise).then(() => this._setRenderPipelineNShowSplash()).then(() => {
      if (!_internal253Aconstants.HTML5) {
        // @ts-expect-error access private method.
        _screen.screen._init({
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


  addPersistRootNode(node) {
    if (!_globalExports.legacyCC.Node.isNode(node) || !node.uuid) {
      debug.warnID(3800);
      return;
    }

    const id = node.uuid;

    if (!this._persistRootNodes[id]) {
      const scene = _globalExports.legacyCC.director._scene;

      if (_globalExports.legacyCC.isValid(scene)) {
        if (!node.parent) {
          node.parent = scene;
        } else if (!(node.parent instanceof _globalExports.legacyCC.Scene)) {
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

      _globalExports.legacyCC.assetManager._releaseManager._addPersistNodeRef(node);
    }
  }
  /**
   * @en Remove a persistent root node.
   * @zh 取消常驻根节点。
   * @param node - The node to be removed from persistent node list
   */


  removePersistRootNode(node) {
    const id = node.uuid || '';

    if (node === this._persistRootNodes[id]) {
      delete this._persistRootNodes[id];
      node._persistNode = false;
      node._originalSceneId = '';

      _globalExports.legacyCC.assetManager._releaseManager._removePersistNodeRef(node);
    }
  }
  /**
   * @en Check whether the node is a persistent root node.
   * @zh 检查节点是否是常驻根节点。
   * @param node - The node to be checked
   */


  isPersistRootNode(node) {
    return !!node._persistNode;
  } //  @Engine loading


  _initEngine() {
    this._initDevice();

    const director = _globalExports.legacyCC.director;
    return Promise.resolve(director._init()).then(() => {
      _globalExports.legacyCC.view.init(); // Log engine version


      debug.log(`Cocos Creator v${_globalExports.VERSION}`);
      this.emit(Game.EVENT_ENGINE_INITED);
      this._engineInited = true;

      if (_globalExports.legacyCC.internal.dynamicAtlasManager) {
        _globalExports.legacyCC.internal.dynamicAtlasManager.enabled = !_macro.macro.CLEANUP_IMAGE_CACHE;
      }
    });
  } // @Methods
  //  @Time ticker section


  _setAnimFrame() {
    const frameRate = this._frameRate;

    if (_internal253Aconstants.JSB) {
      // @ts-expect-error JSB Call
      jsb.setPreferredFramesPerSecond(frameRate);
      window.rAF = window.requestAnimationFrame;
      window.cAF = window.cancelAnimationFrame;
    } else {
      const rAF = window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;

      if (frameRate !== 60 && frameRate !== 30) {
        window.rAF = this._stTime.bind(this);
        window.cAF = this._ctTime;
      } else {
        window.rAF = rAF || this._stTime.bind(this);
        window.cAF = window.cancelAnimationFrame || window.cancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || window.msCancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.ocancelAnimationFrame || this._ctTime; // update callback function for 30 fps version

        this._updateCallback();
      }
    }
  }

  _stTime(callback) {
    const currTime = performance.now();
    const elapseTime = Math.max(0, currTime - this._startTime);
    const timeToCall = Math.max(0, this.frameTime - elapseTime);
    const id = window.setTimeout(callback, timeToCall);
    return id;
  }

  _ctTime(id) {
    window.clearTimeout(id);
  }

  _calculateDT(now) {
    if (!now) now = performance.now();
    this._deltaTime = now > this._startTime ? (now - this._startTime) / 1000 : 0;

    if (this._deltaTime > Game.DEBUG_DT_THRESHOLD) {
      this._deltaTime = this.frameTime / 1000;
    }

    this._startTime = now;
    return this._deltaTime;
  }

  _updateCallback() {
    const director = _globalExports.legacyCC.director;
    let callback;

    if (!_internal253Aconstants.JSB && !_internal253Aconstants.RUNTIME_BASED && this._frameRate === 30) {
      let skip = true;

      callback = time => {
        this._intervalId = window.rAF(this._frameCB);
        skip = !skip;

        if (skip) {
          return;
        }

        director.tick(this._calculateDT(time));
      };
    } else {
      callback = time => {
        director.tick(this._calculateDT(time));
        this._intervalId = window.rAF(this._frameCB);
      };
    }

    this._frameCB = callback;
  } // Run game.


  _runMainLoop() {
    if (!this._inited || _internal253Aconstants.EDITOR && !_globalExports.legacyCC.GAME_VIEW) {
      return;
    }

    const config = this.config;
    const director = _globalExports.legacyCC.director;
    debug.setDisplayStats(!!config.showFPS);
    director.startAnimation();
    this.resume();
  } // @Game loading section


  _initConfig(config) {
    // Configs adjustment
    if (typeof config.debugMode !== 'number') {
      config.debugMode = debug.DebugMode.NONE;
    }

    config.exposeClassName = !!config.exposeClassName;

    if (typeof config.frameRate !== 'number') {
      config.frameRate = 60;
    }

    const renderMode = config.renderMode;

    if (typeof renderMode !== 'number' || renderMode > 3 || renderMode < 0) {
      config.renderMode = 0;
    }

    config.showFPS = !!config.showFPS;

    debug._resetDebugSetting(config.debugMode);

    this.config = config;
    this._configLoaded = true;
    this.frameRate = config.frameRate;
  }

  _determineRenderType() {
    const config = this.config;
    const userRenderMode = parseInt(config.renderMode, 10); // Determine RenderType

    this.renderType = Game.RENDER_TYPE_CANVAS;
    let supportRender = false;

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
  }

  _initDevice() {
    // Avoid setup to be called twice.
    if (this._rendererInitialized) {
      return;
    } // Obtain platform-related objects through the adapter


    const adapter = this.config.adapter;

    if (adapter) {
      this.canvas = adapter.canvas;
      this.frame = adapter.frame;
      this.container = adapter.container;
    }

    this._determineRenderType(); // WebGL context created successfully


    if (this.renderType === Game.RENDER_TYPE_WEBGL) {
      const deviceInfo = new _index3.DeviceInfo(_define.bindingMappingInfo);

      if (_internal253Aconstants.JSB && window.gfx) {
        this._gfxDevice = gfx.DeviceManager.create(deviceInfo);
      } else {
        let useWebGL2 = !!window.WebGL2RenderingContext;
        const userAgent = window.navigator.userAgent.toLowerCase();

        if (userAgent.indexOf('safari') !== -1 && userAgent.indexOf('chrome') === -1 || _sys.sys.browserType === _index5.BrowserType.UC // UC browser implementation doesn't conform to WebGL2 standard
        ) {
            useWebGL2 = false;
          }

        const deviceCtors = [];

        if (useWebGL2 && _globalExports.legacyCC.WebGL2Device) {
          deviceCtors.push(_globalExports.legacyCC.WebGL2Device);
        }

        if (_globalExports.legacyCC.WebGLDevice) {
          deviceCtors.push(_globalExports.legacyCC.WebGLDevice);
        }

        if (_globalExports.legacyCC.EmptyDevice) {
          deviceCtors.push(_globalExports.legacyCC.EmptyDevice);
        }

        _index3.Device.canvas = this.canvas;

        for (let i = 0; i < deviceCtors.length; i++) {
          this._gfxDevice = new deviceCtors[i]();

          if (this._gfxDevice.initialize(deviceInfo)) {
            break;
          }
        }
      }
    } else if (this.renderType === Game.RENDER_TYPE_HEADLESS && _globalExports.legacyCC.EmptyDevice) {
      this._gfxDevice = new _globalExports.legacyCC.EmptyDevice();

      this._gfxDevice.initialize(new _index3.DeviceInfo(_define.bindingMappingInfo));
    }

    if (!this._gfxDevice) {
      // todo fix here for wechat game
      debug.error('can not support canvas rendering in 3D');
      this.renderType = Game.RENDER_TYPE_CANVAS;
      return;
    }

    const swapchainInfo = new _index3.SwapchainInfo(this.canvas);
    const windowSize = _screen.screen.windowSize;
    swapchainInfo.width = windowSize.width;
    swapchainInfo.height = windowSize.height;
    this._swapchain = this._gfxDevice.createSwapchain(swapchainInfo);

    this.canvas.oncontextmenu = () => false;
  }

  _initEvents() {
    _systemInfo.systemInfo.on('show', this._onShow, this);

    _systemInfo.systemInfo.on('hide', this._onHide, this);
  }

  _onHide() {
    this.emit(Game.EVENT_HIDE);
    this.pause();
  }

  _onShow() {
    this.emit(Game.EVENT_SHOW);
    this.resume();
  }

  _setRenderPipelineNShowSplash() {
    // The test environment does not currently support the renderer
    if (_internal253Aconstants.TEST) {
      return Promise.resolve((() => {
        this._rendererInitialized = true;

        this._safeEmit(Game.EVENT_RENDERER_INITED);

        this._inited = true;

        this._setAnimFrame();

        this._runMainLoop();

        this._safeEmit(Game.EVENT_GAME_INITED);

        if (this.onStart) {
          this.onStart();
        }
      })());
    }

    return Promise.resolve(this._setupRenderPipeline()).then(() => Promise.resolve(this._showSplashScreen()).then(() => {
      this._inited = true;
      this._initTime = performance.now();

      this._runMainLoop();

      this._safeEmit(Game.EVENT_GAME_INITED);

      if (this.onStart) {
        this.onStart();
      }
    }));
  }

  _setupRenderPipeline() {
    const {
      renderPipeline
    } = this.config;

    if (!renderPipeline) {
      return this._setRenderPipeline();
    }

    return new Promise((resolve, reject) => {
      _globalExports.legacyCC.assetManager.loadAny(renderPipeline, (err, asset) => err || !(asset instanceof _index4.RenderPipeline) ? reject(err) : resolve(asset));
    }).then(asset => {
      this._setRenderPipeline(asset);
    }).catch(reason => {
      debug.warn(reason);
      debug.warn(`Failed load render pipeline: ${renderPipeline}, engine failed to initialize, will fallback to default pipeline`);

      this._setRenderPipeline();
    });
  }

  _showSplashScreen() {
    if (!_internal253Aconstants.EDITOR && !_internal253Aconstants.PREVIEW && _globalExports.legacyCC.internal.SplashScreen) {
      const splashScreen = _globalExports.legacyCC.internal.SplashScreen.instance;
      splashScreen.main(_globalExports.legacyCC.director.root);
      return new Promise(resolve => {
        splashScreen.setOnFinish(() => resolve());
        splashScreen.loadFinish = true;
      });
    }

    return null;
  }

  _setRenderPipeline(rppl) {
    if (!_globalExports.legacyCC.director.root.setRenderPipeline(rppl)) {
      this._setRenderPipeline();
    }

    this._rendererInitialized = true;

    this._safeEmit(Game.EVENT_RENDERER_INITED);
  }

  _safeEmit(event) {
    if (_internal253Aconstants.EDITOR) {
      try {
        this.emit(event);
      } catch (e) {
        debug.warn(e);
      }
    } else {
      this.emit(event);
    }
  }

}

exports.Game = Game;
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
_globalExports.legacyCC.Game = Game;
/**
 * @en
 * This is a Game instance.
 * @zh
 * 这是一个 Game 类的实例，包含游戏主体信息并负责驱动游戏的游戏对象。
 */

const game = _globalExports.legacyCC.game = new Game();
exports.game = game;