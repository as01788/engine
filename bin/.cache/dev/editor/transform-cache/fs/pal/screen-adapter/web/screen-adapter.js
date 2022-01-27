"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.screenAdapter = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _systemInfo = require("pal/system-info");

var _debug = require("../../../cocos/core/platform/debug.js");

var _eventTarget = require("../../../cocos/core/event/event-target.js");

var _index = require("../../../cocos/core/math/index.js");

var _index2 = require("../enum-type/index.js");

var _predefine = _interopRequireDefault(require("../../../predefine.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const EVENT_TIMEOUT = _internal253Aconstants.EDITOR ? 5 : 200;
const orientationMap = {
  auto: _index2.Orientation.AUTO,
  landscape: _index2.Orientation.LANDSCAPE,
  portrait: _index2.Orientation.PORTRAIT
};
/**
 * On Web platform, the game window may points to different type of window.
 */

var WindowType;

(function (WindowType) {
  WindowType[WindowType["Unknown"] = 0] = "Unknown";
  WindowType[WindowType["SubFrame"] = 1] = "SubFrame";
  WindowType[WindowType["BrowserWindow"] = 2] = "BrowserWindow";
  WindowType[WindowType["Fullscreen"] = 3] = "Fullscreen";
})(WindowType || (WindowType = {}));

class ScreenAdapter extends _eventTarget.EventTarget {
  get supportFullScreen() {
    return this._supportFullScreen;
  }

  get isFullScreen() {
    if (!this._supportFullScreen) {
      return false;
    }

    return !!document[this._fn.fullscreenElement];
  }

  get devicePixelRatio() {
    return window.devicePixelRatio || 1;
  }

  get windowSize() {
    const result = this._windowSizeInCssPixels;
    const dpr = this.devicePixelRatio;
    result.width *= dpr;
    result.height *= dpr;
    return result;
  }

  set windowSize(size) {
    if (this._windowType !== WindowType.SubFrame) {
      (0, _debug.warnID)(9202);
      return;
    }

    this._resizeFrame(this._convertToSizeInCssPixels(size));
  }

  get resolution() {
    const windowSize = this.windowSize;
    const resolutionScale = this.resolutionScale;
    return new _index.Size(windowSize.width * resolutionScale, windowSize.height * resolutionScale);
  }

  get resolutionScale() {
    return this._resolutionScale;
  }

  set resolutionScale(v) {
    var _this$_cbToUpdateFram;

    if (v === this._resolutionScale) {
      return;
    }

    this._resolutionScale = v;
    (_this$_cbToUpdateFram = this._cbToUpdateFrameBuffer) === null || _this$_cbToUpdateFram === void 0 ? void 0 : _this$_cbToUpdateFram.call(this);
  }

  get orientation() {
    return this._orientation;
  }

  set orientation(value) {
    if (this._orientation === value) {
      return;
    }

    this._orientation = value;

    this._updateFrameState();
  }

  get safeAreaEdge() {
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    };
  }

  get isProportionalToFrame() {
    return this._isProportionalToFrame;
  }

  set isProportionalToFrame(v) {
    if (this._isProportionalToFrame === v) {
      return;
    }

    this._isProportionalToFrame = v;

    this._updateContainer();
  }

  get _windowSizeInCssPixels() {
    if (_internal253Aconstants.TEST) {
      return new _index.Size(window.innerWidth, window.innerHeight);
    }

    if (this.isProportionalToFrame) {
      if (!this._gameContainer) {
        (0, _debug.warnID)(9201);
        return new _index.Size(0, 0);
      }

      return new _index.Size(this._gameContainer.clientWidth, this._gameContainer.clientHeight);
    }

    let fullscreenTarget;
    let width;
    let height;

    switch (this._windowType) {
      case WindowType.SubFrame:
        if (!this._gameFrame) {
          (0, _debug.warnID)(9201);
          return new _index.Size(0, 0);
        }

        return new _index.Size(this._gameFrame.clientWidth, this._gameFrame.clientHeight);

      case WindowType.Fullscreen:
        fullscreenTarget = this._getFullscreenTarget();
        width = this.isFrameRotated ? fullscreenTarget.clientHeight : fullscreenTarget.clientWidth;
        height = this.isFrameRotated ? fullscreenTarget.clientWidth : fullscreenTarget.clientHeight;
        return new _index.Size(width, height);

      case WindowType.BrowserWindow:
        width = this.isFrameRotated ? window.innerHeight : window.innerWidth;
        height = this.isFrameRotated ? window.innerWidth : window.innerHeight;
        return new _index.Size(width, height);

      case WindowType.Unknown:
      default:
        return new _index.Size(0, 0);
    }
  }

  get _windowType() {
    if (this.isFullScreen) {
      return WindowType.Fullscreen;
    }

    if (!this._gameFrame) {
      (0, _debug.warnID)(9201);
      return WindowType.Unknown;
    }

    if (this._exactFitScreen) {
      // Note: It doesn't work well to determine whether the frame exact fits the screen.
      // Need to specify the attribute from Editor.
      return WindowType.BrowserWindow;
    }

    return WindowType.SubFrame;
  }

  constructor() {
    super(); // TODO: need to access frame from 'pal/launcher' module

    this.isFrameRotated = false;
    this.handleResizeEvent = true;
    this._gameFrame = void 0;
    this._gameContainer = void 0;
    this._gameCanvas = void 0;
    this._isProportionalToFrame = false;
    this._cachedFrameStyle = {
      width: '0px',
      height: '0px'
    };
    this._cachedContainerStyle = {
      width: '0px',
      height: '0px'
    };
    this._cbToUpdateFrameBuffer = void 0;
    this._supportFullScreen = false;
    this._touchEventName = void 0;
    this._onFullscreenChange = void 0;
    this._onFullscreenError = void 0;
    this._orientationChangeTimeoutId = -1;
    this._cachedFrameSize = new _index.Size(0, 0);
    this._exactFitScreen = false;
    this._fn = {};
    this._fnGroup = [['requestFullscreen', 'exitFullscreen', 'fullscreenchange', 'fullscreenEnabled', 'fullscreenElement', 'fullscreenerror'], ['requestFullScreen', 'exitFullScreen', 'fullScreenchange', 'fullScreenEnabled', 'fullScreenElement', 'fullscreenerror'], ['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitIsFullScreen', 'webkitCurrentFullScreenElement', 'webkitfullscreenerror'], ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozfullscreenchange', 'mozFullScreen', 'mozFullScreenElement', 'mozfullscreenerror'], ['msRequestFullscreen', 'msExitFullscreen', 'MSFullscreenChange', 'msFullscreenEnabled', 'msFullscreenElement', 'msfullscreenerror']];
    this._resolutionScale = 1;
    this._orientation = _index2.Orientation.AUTO;
    this._gameFrame = document.getElementById('GameDiv');
    this._gameContainer = document.getElementById('Cocos3dGameContainer');
    this._gameCanvas = document.getElementById('GameCanvas'); // Compability with old preview or build template in Editor.

    if (!_internal253Aconstants.TEST && !_internal253Aconstants.EDITOR) {
      if (!this._gameFrame) {
        var _this$_gameCanvas, _this$_gameCanvas$par;

        this._gameFrame = document.createElement('div');

        this._gameFrame.setAttribute('id', 'GameDiv');

        (_this$_gameCanvas = this._gameCanvas) === null || _this$_gameCanvas === void 0 ? void 0 : (_this$_gameCanvas$par = _this$_gameCanvas.parentNode) === null || _this$_gameCanvas$par === void 0 ? void 0 : _this$_gameCanvas$par.insertBefore(this._gameFrame, this._gameCanvas);

        this._gameFrame.appendChild(this._gameCanvas);
      }

      if (!this._gameContainer) {
        var _this$_gameCanvas2, _this$_gameCanvas2$pa;

        this._gameContainer = document.createElement('div');

        this._gameContainer.setAttribute('id', 'Cocos3dGameContainer');

        (_this$_gameCanvas2 = this._gameCanvas) === null || _this$_gameCanvas2 === void 0 ? void 0 : (_this$_gameCanvas2$pa = _this$_gameCanvas2.parentNode) === null || _this$_gameCanvas2$pa === void 0 ? void 0 : _this$_gameCanvas2$pa.insertBefore(this._gameContainer, this._gameCanvas);

        this._gameContainer.appendChild(this._gameCanvas);
      }
    }

    let fnList;
    const fnGroup = this._fnGroup;

    for (let i = 0; i < fnGroup.length; i++) {
      fnList = fnGroup[i]; // detect event support

      if (typeof document[fnList[1]] !== 'undefined') {
        for (let i = 0; i < fnList.length; i++) {
          this._fn[fnGroup[0][i]] = fnList[i];
        }

        break;
      }
    }

    this._supportFullScreen = this._fn.requestFullscreen !== undefined;
    this._touchEventName = 'ontouchstart' in window ? 'touchend' : 'mousedown';

    this._registerEvent();
  }

  init(options, cbToRebuildFrameBuffer) {
    this._cbToUpdateFrameBuffer = cbToRebuildFrameBuffer;
    this.orientation = orientationMap[options.configOrientation];
    this._exactFitScreen = options.exactFitScreen;

    this._resizeFrame();
  }

  requestFullScreen() {
    return new Promise((resolve, reject) => {
      if (this.isFullScreen) {
        resolve();
        return;
      }

      this._cachedFrameSize = this.windowSize;

      this._doRequestFullScreen().then(() => {
        resolve();
      }).catch(() => {
        const fullscreenTarget = this._getFullscreenTarget();

        if (!fullscreenTarget) {
          reject(new Error('Cannot access fullscreen target'));
          return;
        }

        fullscreenTarget.addEventListener(this._touchEventName, () => {
          this._doRequestFullScreen().then(() => {
            resolve();
          }).catch(reject);
        }, {
          once: true,
          capture: true
        });
      });
    });
  }

  exitFullScreen() {
    return new Promise((resolve, reject) => {
      const requestPromise = document[this._fn.exitFullscreen]();

      if (window.Promise && requestPromise instanceof Promise) {
        requestPromise.then(() => {
          this.windowSize = this._cachedFrameSize;
          resolve();
        }).catch(reject);
        return;
      }

      this.windowSize = this._cachedFrameSize;
      resolve();
    });
  }

  _registerEvent() {
    document.addEventListener(this._fn.fullscreenerror, () => {
      var _this$_onFullscreenEr;

      (_this$_onFullscreenEr = this._onFullscreenError) === null || _this$_onFullscreenEr === void 0 ? void 0 : _this$_onFullscreenEr.call(this);
    });
    window.addEventListener('resize', () => {
      if (!this.handleResizeEvent) {
        return;
      }

      this._resizeFrame();
    });

    if (typeof window.matchMedia === 'function') {
      const updateDPRChangeListener = () => {
        var _window$matchMedia, _window$matchMedia$ad;

        const dpr = window.devicePixelRatio; // NOTE: some browsers especially on iPhone doesn't support MediaQueryList

        (_window$matchMedia = window.matchMedia(`(resolution: ${dpr}dppx)`)) === null || _window$matchMedia === void 0 ? void 0 : (_window$matchMedia$ad = _window$matchMedia.addEventListener) === null || _window$matchMedia$ad === void 0 ? void 0 : _window$matchMedia$ad.call(_window$matchMedia, 'change', () => {
          this.emit('window-resize');
          updateDPRChangeListener();
        }, {
          once: true
        });
      };

      updateDPRChangeListener();
    }

    window.addEventListener('orientationchange', () => {
      if (this._orientationChangeTimeoutId !== -1) {
        clearTimeout(this._orientationChangeTimeoutId);
      }

      this._orientationChangeTimeoutId = setTimeout(() => {
        if (!this.handleResizeEvent) {
          return;
        }

        this._updateFrameState();

        this._resizeFrame();

        this.emit('orientation-change');
        this._orientationChangeTimeoutId = -1;
      }, EVENT_TIMEOUT);
    });
    document.addEventListener(this._fn.fullscreenchange, () => {
      var _this$_onFullscreenCh;

      (_this$_onFullscreenCh = this._onFullscreenChange) === null || _this$_onFullscreenCh === void 0 ? void 0 : _this$_onFullscreenCh.call(this);
      this.emit('fullscreen-change');
    });
  }

  _convertToSizeInCssPixels(size) {
    const clonedSize = size.clone();
    const dpr = this.devicePixelRatio;
    clonedSize.width /= dpr;
    clonedSize.height /= dpr;
    return clonedSize;
  }
  /**
   * The frame size may be from screen size or an external editor options by setting screen.windowSize.
   * @param sizeInCssPixels you need to specify this size when the windowType is SubFrame.
   */


  _resizeFrame(sizeInCssPixels) {
    if (!this._gameFrame) {
      return;
    } // Center align the canvas


    this._gameFrame.style.display = 'flex';
    this._gameFrame.style['justify-content'] = 'center';
    this._gameFrame.style['align-items'] = 'center';

    if (this._windowType === WindowType.SubFrame) {
      if (!sizeInCssPixels) {
        this._updateContainer();

        return;
      }

      this._gameFrame.style.width = `${sizeInCssPixels.width}px`;
      this._gameFrame.style.height = `${sizeInCssPixels.height}px`;
    } else {
      const winWidth = window.innerWidth;
      const winHeight = window.innerHeight;

      if (this.isFrameRotated) {
        this._gameFrame.style['-webkit-transform'] = 'rotate(90deg)';
        this._gameFrame.style.transform = 'rotate(90deg)';
        this._gameFrame.style['-webkit-transform-origin'] = '0px 0px 0px';
        this._gameFrame.style.transformOrigin = '0px 0px 0px';
        this._gameFrame.style.margin = `0 0 0 ${winWidth}px`;
        this._gameFrame.style.width = `${winHeight}px`;
        this._gameFrame.style.height = `${winWidth}px`;
      } else {
        this._gameFrame.style['-webkit-transform'] = 'rotate(0deg)';
        this._gameFrame.style.transform = 'rotate(0deg)'; // TODO
        // this._gameFrame.style['-webkit-transform-origin'] = '0px 0px 0px';
        // this._gameFrame.style.transformOrigin = '0px 0px 0px';

        this._gameFrame.style.margin = '0px auto';
        this._gameFrame.style.width = `${winWidth}px`;
        this._gameFrame.style.height = `${winHeight}px`;
      }
    }

    this._updateContainer();
  }

  _getFullscreenTarget() {
    const windowType = this._windowType;

    if (windowType === WindowType.Fullscreen) {
      return document[this._fn.fullscreenElement];
    }

    if (windowType === WindowType.SubFrame) {
      return this._gameFrame;
    } // On web mobile, the transform of game frame doesn't work when it's on fullscreen.
    // So we need to make the body fullscreen.


    return document.body;
  }

  _doRequestFullScreen() {
    return new Promise((resolve, reject) => {
      if (!this._supportFullScreen) {
        reject(new Error('fullscreen is not supported'));
        return;
      }

      const fullscreenTarget = this._getFullscreenTarget();

      if (!fullscreenTarget) {
        reject(new Error('Cannot access fullscreen target'));
        return;
      }

      this._onFullscreenChange = undefined;
      this._onFullscreenError = undefined;

      const requestPromise = fullscreenTarget[this._fn.requestFullscreen]();

      if (window.Promise && requestPromise instanceof Promise) {
        requestPromise.then(resolve).catch(reject);
      } else {
        this._onFullscreenChange = resolve;
        this._onFullscreenError = reject;
      }
    });
  }

  _updateFrameState() {
    const orientation = this.orientation;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isBrowserLandscape = width > height;
    this.isFrameRotated = _systemInfo.systemInfo.isMobile && (isBrowserLandscape && orientation === _index2.Orientation.PORTRAIT || !isBrowserLandscape && orientation === _index2.Orientation.LANDSCAPE);
  }

  _updateContainer() {
    if (!this._gameContainer) {
      (0, _debug.warnID)(9201);
      return;
    }

    if (this.isProportionalToFrame) {
      if (!this._gameFrame) {
        (0, _debug.warnID)(9201);
        return;
      } // TODO: access designedResolution from Launcher module.


      const designedResolution = _predefine.default.view.getDesignResolutionSize();

      const frame = this._gameFrame;
      const frameW = frame.clientWidth;
      const frameH = frame.clientHeight;
      const designW = designedResolution.width;
      const designH = designedResolution.height;
      const scaleX = frameW / designW;
      const scaleY = frameH / designH;
      const containerStyle = this._gameContainer.style;
      let containerW;
      let containerH;

      if (scaleX < scaleY) {
        containerW = frameW;
        containerH = designH * scaleX;
      } else {
        containerW = designW * scaleY;
        containerH = frameH;
      } // Set window size on game container


      containerStyle.width = `${containerW}px`;
      containerStyle.height = `${containerH}px`;
    } else {
      const containerStyle = this._gameContainer.style; // game container exact fit game frame.

      containerStyle.width = '100%';
      containerStyle.height = '100%';
    } // Cache Test


    if (this._gameFrame && (this._cachedFrameStyle.width !== this._gameFrame.style.width || this._cachedFrameStyle.height !== this._gameFrame.style.height || this._cachedContainerStyle.width !== this._gameContainer.style.width || this._cachedContainerStyle.height !== this._gameContainer.style.height)) {
      this.emit('window-resize'); // Update Cache

      this._cachedFrameStyle.width = this._gameFrame.style.width;
      this._cachedFrameStyle.height = this._gameFrame.style.height;
      this._cachedContainerStyle.width = this._gameContainer.style.width;
      this._cachedContainerStyle.height = this._gameContainer.style.height;
    }
  }

}

const screenAdapter = new ScreenAdapter();
exports.screenAdapter = screenAdapter;