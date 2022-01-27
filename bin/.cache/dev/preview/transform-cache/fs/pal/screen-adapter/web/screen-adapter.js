System.register("q-bundled:///fs/pal/screen-adapter/web/screen-adapter.js", ["../../../../virtual/internal%253Aconstants.js", "pal/system-info", "../../../cocos/core/platform/debug.js", "../../../cocos/core/event/event-target.js", "../../../cocos/core/math/index.js", "../enum-type/index.js", "../../../predefine.js"], function (_export, _context) {
  "use strict";

  var EDITOR, TEST, systemInfo, warnID, EventTarget, Size, Orientation, legacyCC, EVENT_TIMEOUT, orientationMap, WindowType, ScreenAdapter, screenAdapter;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      TEST = _virtualInternal253AconstantsJs.TEST;
    }, function (_palSystemInfo) {
      systemInfo = _palSystemInfo.systemInfo;
    }, function (_cocosCorePlatformDebugJs) {
      warnID = _cocosCorePlatformDebugJs.warnID;
    }, function (_cocosCoreEventEventTargetJs) {
      EventTarget = _cocosCoreEventEventTargetJs.EventTarget;
    }, function (_cocosCoreMathIndexJs) {
      Size = _cocosCoreMathIndexJs.Size;
    }, function (_enumTypeIndexJs) {
      Orientation = _enumTypeIndexJs.Orientation;
    }, function (_predefineJs) {
      legacyCC = _predefineJs.default;
    }],
    execute: function () {
      EVENT_TIMEOUT = EDITOR ? 5 : 200;
      orientationMap = {
        auto: Orientation.AUTO,
        landscape: Orientation.LANDSCAPE,
        portrait: Orientation.PORTRAIT
      };
      /**
       * On Web platform, the game window may points to different type of window.
       */

      (function (WindowType) {
        WindowType[WindowType["Unknown"] = 0] = "Unknown";
        WindowType[WindowType["SubFrame"] = 1] = "SubFrame";
        WindowType[WindowType["BrowserWindow"] = 2] = "BrowserWindow";
        WindowType[WindowType["Fullscreen"] = 3] = "Fullscreen";
      })(WindowType || (WindowType = {}));

      ScreenAdapter = /*#__PURE__*/function (_EventTarget) {
        _inheritsLoose(ScreenAdapter, _EventTarget);

        function ScreenAdapter() {
          var _this;

          _this = _EventTarget.call(this) || this; // TODO: need to access frame from 'pal/launcher' module

          _this.isFrameRotated = false;
          _this.handleResizeEvent = true;
          _this._gameFrame = void 0;
          _this._gameContainer = void 0;
          _this._gameCanvas = void 0;
          _this._isProportionalToFrame = false;
          _this._cachedFrameStyle = {
            width: '0px',
            height: '0px'
          };
          _this._cachedContainerStyle = {
            width: '0px',
            height: '0px'
          };
          _this._cbToUpdateFrameBuffer = void 0;
          _this._supportFullScreen = false;
          _this._touchEventName = void 0;
          _this._onFullscreenChange = void 0;
          _this._onFullscreenError = void 0;
          _this._orientationChangeTimeoutId = -1;
          _this._cachedFrameSize = new Size(0, 0);
          _this._exactFitScreen = false;
          _this._fn = {};
          _this._fnGroup = [['requestFullscreen', 'exitFullscreen', 'fullscreenchange', 'fullscreenEnabled', 'fullscreenElement', 'fullscreenerror'], ['requestFullScreen', 'exitFullScreen', 'fullScreenchange', 'fullScreenEnabled', 'fullScreenElement', 'fullscreenerror'], ['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitIsFullScreen', 'webkitCurrentFullScreenElement', 'webkitfullscreenerror'], ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozfullscreenchange', 'mozFullScreen', 'mozFullScreenElement', 'mozfullscreenerror'], ['msRequestFullscreen', 'msExitFullscreen', 'MSFullscreenChange', 'msFullscreenEnabled', 'msFullscreenElement', 'msfullscreenerror']];
          _this._resolutionScale = 1;
          _this._orientation = Orientation.AUTO;
          _this._gameFrame = document.getElementById('GameDiv');
          _this._gameContainer = document.getElementById('Cocos3dGameContainer');
          _this._gameCanvas = document.getElementById('GameCanvas'); // Compability with old preview or build template in Editor.

          if (!TEST && !EDITOR) {
            if (!_this._gameFrame) {
              var _this$_gameCanvas, _this$_gameCanvas$par;

              _this._gameFrame = document.createElement('div');

              _this._gameFrame.setAttribute('id', 'GameDiv');

              (_this$_gameCanvas = _this._gameCanvas) === null || _this$_gameCanvas === void 0 ? void 0 : (_this$_gameCanvas$par = _this$_gameCanvas.parentNode) === null || _this$_gameCanvas$par === void 0 ? void 0 : _this$_gameCanvas$par.insertBefore(_this._gameFrame, _this._gameCanvas);

              _this._gameFrame.appendChild(_this._gameCanvas);
            }

            if (!_this._gameContainer) {
              var _this$_gameCanvas2, _this$_gameCanvas2$pa;

              _this._gameContainer = document.createElement('div');

              _this._gameContainer.setAttribute('id', 'Cocos3dGameContainer');

              (_this$_gameCanvas2 = _this._gameCanvas) === null || _this$_gameCanvas2 === void 0 ? void 0 : (_this$_gameCanvas2$pa = _this$_gameCanvas2.parentNode) === null || _this$_gameCanvas2$pa === void 0 ? void 0 : _this$_gameCanvas2$pa.insertBefore(_this._gameContainer, _this._gameCanvas);

              _this._gameContainer.appendChild(_this._gameCanvas);
            }
          }

          var fnList;
          var fnGroup = _this._fnGroup;

          for (var i = 0; i < fnGroup.length; i++) {
            fnList = fnGroup[i]; // detect event support

            if (typeof document[fnList[1]] !== 'undefined') {
              for (var _i = 0; _i < fnList.length; _i++) {
                _this._fn[fnGroup[0][_i]] = fnList[_i];
              }

              break;
            }
          }

          _this._supportFullScreen = _this._fn.requestFullscreen !== undefined;
          _this._touchEventName = 'ontouchstart' in window ? 'touchend' : 'mousedown';

          _this._registerEvent();

          return _this;
        }

        var _proto = ScreenAdapter.prototype;

        _proto.init = function init(options, cbToRebuildFrameBuffer) {
          this._cbToUpdateFrameBuffer = cbToRebuildFrameBuffer;
          this.orientation = orientationMap[options.configOrientation];
          this._exactFitScreen = options.exactFitScreen;

          this._resizeFrame();
        };

        _proto.requestFullScreen = function requestFullScreen() {
          var _this2 = this;

          return new Promise(function (resolve, reject) {
            if (_this2.isFullScreen) {
              resolve();
              return;
            }

            _this2._cachedFrameSize = _this2.windowSize;

            _this2._doRequestFullScreen().then(function () {
              resolve();
            })["catch"](function () {
              var fullscreenTarget = _this2._getFullscreenTarget();

              if (!fullscreenTarget) {
                reject(new Error('Cannot access fullscreen target'));
                return;
              }

              fullscreenTarget.addEventListener(_this2._touchEventName, function () {
                _this2._doRequestFullScreen().then(function () {
                  resolve();
                })["catch"](reject);
              }, {
                once: true,
                capture: true
              });
            });
          });
        };

        _proto.exitFullScreen = function exitFullScreen() {
          var _this3 = this;

          return new Promise(function (resolve, reject) {
            var requestPromise = document[_this3._fn.exitFullscreen]();

            if (window.Promise && requestPromise instanceof Promise) {
              requestPromise.then(function () {
                _this3.windowSize = _this3._cachedFrameSize;
                resolve();
              })["catch"](reject);
              return;
            }

            _this3.windowSize = _this3._cachedFrameSize;
            resolve();
          });
        };

        _proto._registerEvent = function _registerEvent() {
          var _this4 = this;

          document.addEventListener(this._fn.fullscreenerror, function () {
            var _this4$_onFullscreenE;

            (_this4$_onFullscreenE = _this4._onFullscreenError) === null || _this4$_onFullscreenE === void 0 ? void 0 : _this4$_onFullscreenE.call(_this4);
          });
          window.addEventListener('resize', function () {
            if (!_this4.handleResizeEvent) {
              return;
            }

            _this4._resizeFrame();
          });

          if (typeof window.matchMedia === 'function') {
            var updateDPRChangeListener = function updateDPRChangeListener() {
              var _window$matchMedia, _window$matchMedia$ad;

              var dpr = window.devicePixelRatio; // NOTE: some browsers especially on iPhone doesn't support MediaQueryList

              (_window$matchMedia = window.matchMedia("(resolution: " + dpr + "dppx)")) === null || _window$matchMedia === void 0 ? void 0 : (_window$matchMedia$ad = _window$matchMedia.addEventListener) === null || _window$matchMedia$ad === void 0 ? void 0 : _window$matchMedia$ad.call(_window$matchMedia, 'change', function () {
                _this4.emit('window-resize');

                updateDPRChangeListener();
              }, {
                once: true
              });
            };

            updateDPRChangeListener();
          }

          window.addEventListener('orientationchange', function () {
            if (_this4._orientationChangeTimeoutId !== -1) {
              clearTimeout(_this4._orientationChangeTimeoutId);
            }

            _this4._orientationChangeTimeoutId = setTimeout(function () {
              if (!_this4.handleResizeEvent) {
                return;
              }

              _this4._updateFrameState();

              _this4._resizeFrame();

              _this4.emit('orientation-change');

              _this4._orientationChangeTimeoutId = -1;
            }, EVENT_TIMEOUT);
          });
          document.addEventListener(this._fn.fullscreenchange, function () {
            var _this4$_onFullscreenC;

            (_this4$_onFullscreenC = _this4._onFullscreenChange) === null || _this4$_onFullscreenC === void 0 ? void 0 : _this4$_onFullscreenC.call(_this4);

            _this4.emit('fullscreen-change');
          });
        };

        _proto._convertToSizeInCssPixels = function _convertToSizeInCssPixels(size) {
          var clonedSize = size.clone();
          var dpr = this.devicePixelRatio;
          clonedSize.width /= dpr;
          clonedSize.height /= dpr;
          return clonedSize;
        }
        /**
         * The frame size may be from screen size or an external editor options by setting screen.windowSize.
         * @param sizeInCssPixels you need to specify this size when the windowType is SubFrame.
         */
        ;

        _proto._resizeFrame = function _resizeFrame(sizeInCssPixels) {
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

            this._gameFrame.style.width = sizeInCssPixels.width + "px";
            this._gameFrame.style.height = sizeInCssPixels.height + "px";
          } else {
            var winWidth = window.innerWidth;
            var winHeight = window.innerHeight;

            if (this.isFrameRotated) {
              this._gameFrame.style['-webkit-transform'] = 'rotate(90deg)';
              this._gameFrame.style.transform = 'rotate(90deg)';
              this._gameFrame.style['-webkit-transform-origin'] = '0px 0px 0px';
              this._gameFrame.style.transformOrigin = '0px 0px 0px';
              this._gameFrame.style.margin = "0 0 0 " + winWidth + "px";
              this._gameFrame.style.width = winHeight + "px";
              this._gameFrame.style.height = winWidth + "px";
            } else {
              this._gameFrame.style['-webkit-transform'] = 'rotate(0deg)';
              this._gameFrame.style.transform = 'rotate(0deg)'; // TODO
              // this._gameFrame.style['-webkit-transform-origin'] = '0px 0px 0px';
              // this._gameFrame.style.transformOrigin = '0px 0px 0px';

              this._gameFrame.style.margin = '0px auto';
              this._gameFrame.style.width = winWidth + "px";
              this._gameFrame.style.height = winHeight + "px";
            }
          }

          this._updateContainer();
        };

        _proto._getFullscreenTarget = function _getFullscreenTarget() {
          var windowType = this._windowType;

          if (windowType === WindowType.Fullscreen) {
            return document[this._fn.fullscreenElement];
          }

          if (windowType === WindowType.SubFrame) {
            return this._gameFrame;
          } // On web mobile, the transform of game frame doesn't work when it's on fullscreen.
          // So we need to make the body fullscreen.


          return document.body;
        };

        _proto._doRequestFullScreen = function _doRequestFullScreen() {
          var _this5 = this;

          return new Promise(function (resolve, reject) {
            if (!_this5._supportFullScreen) {
              reject(new Error('fullscreen is not supported'));
              return;
            }

            var fullscreenTarget = _this5._getFullscreenTarget();

            if (!fullscreenTarget) {
              reject(new Error('Cannot access fullscreen target'));
              return;
            }

            _this5._onFullscreenChange = undefined;
            _this5._onFullscreenError = undefined;

            var requestPromise = fullscreenTarget[_this5._fn.requestFullscreen]();

            if (window.Promise && requestPromise instanceof Promise) {
              requestPromise.then(resolve)["catch"](reject);
            } else {
              _this5._onFullscreenChange = resolve;
              _this5._onFullscreenError = reject;
            }
          });
        };

        _proto._updateFrameState = function _updateFrameState() {
          var orientation = this.orientation;
          var width = window.innerWidth;
          var height = window.innerHeight;
          var isBrowserLandscape = width > height;
          this.isFrameRotated = systemInfo.isMobile && (isBrowserLandscape && orientation === Orientation.PORTRAIT || !isBrowserLandscape && orientation === Orientation.LANDSCAPE);
        };

        _proto._updateContainer = function _updateContainer() {
          if (!this._gameContainer) {
            warnID(9201);
            return;
          }

          if (this.isProportionalToFrame) {
            if (!this._gameFrame) {
              warnID(9201);
              return;
            } // TODO: access designedResolution from Launcher module.


            var designedResolution = legacyCC.view.getDesignResolutionSize();
            var frame = this._gameFrame;
            var frameW = frame.clientWidth;
            var frameH = frame.clientHeight;
            var designW = designedResolution.width;
            var designH = designedResolution.height;
            var scaleX = frameW / designW;
            var scaleY = frameH / designH;
            var containerStyle = this._gameContainer.style;
            var containerW;
            var containerH;

            if (scaleX < scaleY) {
              containerW = frameW;
              containerH = designH * scaleX;
            } else {
              containerW = designW * scaleY;
              containerH = frameH;
            } // Set window size on game container


            containerStyle.width = containerW + "px";
            containerStyle.height = containerH + "px";
          } else {
            var _containerStyle = this._gameContainer.style; // game container exact fit game frame.

            _containerStyle.width = '100%';
            _containerStyle.height = '100%';
          } // Cache Test


          if (this._gameFrame && (this._cachedFrameStyle.width !== this._gameFrame.style.width || this._cachedFrameStyle.height !== this._gameFrame.style.height || this._cachedContainerStyle.width !== this._gameContainer.style.width || this._cachedContainerStyle.height !== this._gameContainer.style.height)) {
            this.emit('window-resize'); // Update Cache

            this._cachedFrameStyle.width = this._gameFrame.style.width;
            this._cachedFrameStyle.height = this._gameFrame.style.height;
            this._cachedContainerStyle.width = this._gameContainer.style.width;
            this._cachedContainerStyle.height = this._gameContainer.style.height;
          }
        };

        _createClass(ScreenAdapter, [{
          key: "supportFullScreen",
          get: function get() {
            return this._supportFullScreen;
          }
        }, {
          key: "isFullScreen",
          get: function get() {
            if (!this._supportFullScreen) {
              return false;
            }

            return !!document[this._fn.fullscreenElement];
          }
        }, {
          key: "devicePixelRatio",
          get: function get() {
            return window.devicePixelRatio || 1;
          }
        }, {
          key: "windowSize",
          get: function get() {
            var result = this._windowSizeInCssPixels;
            var dpr = this.devicePixelRatio;
            result.width *= dpr;
            result.height *= dpr;
            return result;
          },
          set: function set(size) {
            if (this._windowType !== WindowType.SubFrame) {
              warnID(9202);
              return;
            }

            this._resizeFrame(this._convertToSizeInCssPixels(size));
          }
        }, {
          key: "resolution",
          get: function get() {
            var windowSize = this.windowSize;
            var resolutionScale = this.resolutionScale;
            return new Size(windowSize.width * resolutionScale, windowSize.height * resolutionScale);
          }
        }, {
          key: "resolutionScale",
          get: function get() {
            return this._resolutionScale;
          },
          set: function set(v) {
            var _this$_cbToUpdateFram;

            if (v === this._resolutionScale) {
              return;
            }

            this._resolutionScale = v;
            (_this$_cbToUpdateFram = this._cbToUpdateFrameBuffer) === null || _this$_cbToUpdateFram === void 0 ? void 0 : _this$_cbToUpdateFram.call(this);
          }
        }, {
          key: "orientation",
          get: function get() {
            return this._orientation;
          },
          set: function set(value) {
            if (this._orientation === value) {
              return;
            }

            this._orientation = value;

            this._updateFrameState();
          }
        }, {
          key: "safeAreaEdge",
          get: function get() {
            return {
              top: 0,
              bottom: 0,
              left: 0,
              right: 0
            };
          }
        }, {
          key: "isProportionalToFrame",
          get: function get() {
            return this._isProportionalToFrame;
          },
          set: function set(v) {
            if (this._isProportionalToFrame === v) {
              return;
            }

            this._isProportionalToFrame = v;

            this._updateContainer();
          }
        }, {
          key: "_windowSizeInCssPixels",
          get: function get() {
            if (TEST) {
              return new Size(window.innerWidth, window.innerHeight);
            }

            if (this.isProportionalToFrame) {
              if (!this._gameContainer) {
                warnID(9201);
                return new Size(0, 0);
              }

              return new Size(this._gameContainer.clientWidth, this._gameContainer.clientHeight);
            }

            var fullscreenTarget;
            var width;
            var height;

            switch (this._windowType) {
              case WindowType.SubFrame:
                if (!this._gameFrame) {
                  warnID(9201);
                  return new Size(0, 0);
                }

                return new Size(this._gameFrame.clientWidth, this._gameFrame.clientHeight);

              case WindowType.Fullscreen:
                fullscreenTarget = this._getFullscreenTarget();
                width = this.isFrameRotated ? fullscreenTarget.clientHeight : fullscreenTarget.clientWidth;
                height = this.isFrameRotated ? fullscreenTarget.clientWidth : fullscreenTarget.clientHeight;
                return new Size(width, height);

              case WindowType.BrowserWindow:
                width = this.isFrameRotated ? window.innerHeight : window.innerWidth;
                height = this.isFrameRotated ? window.innerWidth : window.innerHeight;
                return new Size(width, height);

              case WindowType.Unknown:
              default:
                return new Size(0, 0);
            }
          }
        }, {
          key: "_windowType",
          get: function get() {
            if (this.isFullScreen) {
              return WindowType.Fullscreen;
            }

            if (!this._gameFrame) {
              warnID(9201);
              return WindowType.Unknown;
            }

            if (this._exactFitScreen) {
              // Note: It doesn't work well to determine whether the frame exact fits the screen.
              // Need to specify the attribute from Editor.
              return WindowType.BrowserWindow;
            }

            return WindowType.SubFrame;
          }
        }]);

        return ScreenAdapter;
      }(EventTarget);

      _export("screenAdapter", screenAdapter = new ScreenAdapter());
    }
  };
});