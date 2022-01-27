System.register("q-bundled:///fs/pal/screen-adapter/minigame/screen-adapter.js", ["../../../../virtual/internal%253Aconstants.js", "pal/minigame", "pal/system-info", "../../../cocos/core/platform/debug.js", "../../../cocos/core/event/event-target.js", "../../../cocos/core/math/index.js", "../../system-info/enum-type/index.js", "../enum-type/index.js"], function (_export, _context) {
  "use strict";

  var ALIPAY, COCOSPLAY, VIVO, minigame, systemInfo, warnID, EventTarget, Size, OS, Orientation, rotateLandscape, fs, screenOrientation, _fs, deviceOrientation, ScreenAdapter, screenAdapter;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      ALIPAY = _virtualInternal253AconstantsJs.ALIPAY;
      COCOSPLAY = _virtualInternal253AconstantsJs.COCOSPLAY;
      VIVO = _virtualInternal253AconstantsJs.VIVO;
    }, function (_palMinigame) {
      minigame = _palMinigame.minigame;
    }, function (_palSystemInfo) {
      systemInfo = _palSystemInfo.systemInfo;
    }, function (_cocosCorePlatformDebugJs) {
      warnID = _cocosCorePlatformDebugJs.warnID;
    }, function (_cocosCoreEventEventTargetJs) {
      EventTarget = _cocosCoreEventEventTargetJs.EventTarget;
    }, function (_cocosCoreMathIndexJs) {
      Size = _cocosCoreMathIndexJs.Size;
    }, function (_systemInfoEnumTypeIndexJs) {
      OS = _systemInfoEnumTypeIndexJs.OS;
    }, function (_enumTypeIndexJs) {
      Orientation = _enumTypeIndexJs.Orientation;
    }],
    execute: function () {
      // HACK: In some platform like CocosPlay or Alipay iOS end
      // the windowSize need to rotate when init screenAdapter if it's landscape
      rotateLandscape = false;

      try {
        if (ALIPAY) {
          if (systemInfo.os === OS.IOS && !minigame.isDevTool) {
            // @ts-expect-error TODO: use pal/fs
            fs = my.getFileSystemManager();
            screenOrientation = JSON.parse(fs.readFileSync({
              filePath: 'game.json',
              encoding: 'utf8'
            }).data).screenOrientation;
            rotateLandscape = screenOrientation === 'landscape';
          }
        } else if (COCOSPLAY) {
          // @ts-expect-error TODO: use pal/fs
          _fs = ral.getFileSystemManager();
          deviceOrientation = JSON.parse(_fs.readFileSync('game.config.json', 'utf8')).deviceOrientation;
          rotateLandscape = deviceOrientation === 'landscape';
        }
      } catch (e) {
        console.error(e);
      }

      ScreenAdapter = /*#__PURE__*/function (_EventTarget) {
        _inheritsLoose(ScreenAdapter, _EventTarget);

        function ScreenAdapter() {
          var _this;

          _this = _EventTarget.call(this) || this; // TODO: onResize or onOrientationChange is not supported well

          _this.isFrameRotated = false;
          _this.handleResizeEvent = true;
          _this._cbToUpdateFrameBuffer = void 0;
          _this._resolutionScale = 1;
          _this._isProportionalToFrame = false;
          return _this;
        }

        var _proto = ScreenAdapter.prototype;

        _proto.init = function init(options, cbToRebuildFrameBuffer) {
          this._cbToUpdateFrameBuffer = cbToRebuildFrameBuffer;

          this._cbToUpdateFrameBuffer();
        };

        _proto.requestFullScreen = function requestFullScreen() {
          return Promise.reject(new Error('request fullscreen is not supported on this platform.'));
        };

        _proto.exitFullScreen = function exitFullScreen() {
          return Promise.reject(new Error('exit fullscreen is not supported on this platform.'));
        };

        _createClass(ScreenAdapter, [{
          key: "supportFullScreen",
          get: function get() {
            return false;
          }
        }, {
          key: "isFullScreen",
          get: function get() {
            return false;
          }
        }, {
          key: "devicePixelRatio",
          get: function get() {
            var sysInfo = minigame.getSystemInfoSync();
            return sysInfo.pixelRatio;
          }
        }, {
          key: "windowSize",
          get: function get() {
            var sysInfo = minigame.getSystemInfoSync(); // NOTE: screen size info on these platforms is in physical pixel.
            // No need to multiply with DPR.

            var dpr = ALIPAY && systemInfo.os === OS.ANDROID || VIVO ? 1 : this.devicePixelRatio;
            var screenWidth = sysInfo.screenWidth;
            var screenHeight = sysInfo.screenHeight;

            if ((COCOSPLAY || ALIPAY) && rotateLandscape && screenWidth < screenHeight) {
              var temp = screenWidth;
              screenWidth = screenHeight;
              screenHeight = temp;
            }

            return new Size(screenWidth * dpr, screenHeight * dpr);
          },
          set: function set(size) {
            warnID(1221);
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
          set: function set(value) {
            var _this$_cbToUpdateFram;

            if (value === this._resolutionScale) {
              return;
            }

            this._resolutionScale = value;
            (_this$_cbToUpdateFram = this._cbToUpdateFrameBuffer) === null || _this$_cbToUpdateFram === void 0 ? void 0 : _this$_cbToUpdateFram.call(this);
          }
        }, {
          key: "orientation",
          get: function get() {
            return minigame.orientation;
          },
          set: function set(value) {
            console.warn('Setting orientation is not supported yet.');
          }
        }, {
          key: "safeAreaEdge",
          get: function get() {
            var minigameSafeArea = minigame.getSafeArea();
            var windowSize = this.windowSize; // NOTE: safe area info on vivo platform is in physical pixel.
            // No need to multiply with DPR.

            var dpr = VIVO ? 1 : this.devicePixelRatio;
            var topEdge = minigameSafeArea.top * dpr;
            var bottomEdge = windowSize.height - minigameSafeArea.bottom * dpr;
            var leftEdge = minigameSafeArea.left * dpr;
            var rightEdge = windowSize.width - minigameSafeArea.right * dpr;
            var orientation = this.orientation; // Make it symmetrical.

            if (orientation === Orientation.PORTRAIT) {
              if (topEdge < bottomEdge) {
                topEdge = bottomEdge;
              } else {
                bottomEdge = topEdge;
              }
            } else if (leftEdge < rightEdge) {
              leftEdge = rightEdge;
            } else {
              rightEdge = leftEdge;
            }

            return {
              top: topEdge,
              bottom: bottomEdge,
              left: leftEdge,
              right: rightEdge
            };
          }
        }, {
          key: "isProportionalToFrame",
          get: function get() {
            return this._isProportionalToFrame;
          },
          set: function set(v) {}
        }]);

        return ScreenAdapter;
      }(EventTarget);

      _export("screenAdapter", screenAdapter = new ScreenAdapter());
    }
  };
});