System.register("q-bundled:///fs/pal/screen-adapter/native/screen-adapter.js", ["../../../cocos/core/event/event-target.js", "../../../cocos/core/math/index.js", "../enum-type/index.js"], function (_export, _context) {
  "use strict";

  var EventTarget, Size, Orientation, orientationMap, ScreenAdapter, screenAdapter;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_cocosCoreEventEventTargetJs) {
      EventTarget = _cocosCoreEventEventTargetJs.EventTarget;
    }, function (_cocosCoreMathIndexJs) {
      Size = _cocosCoreMathIndexJs.Size;
    }, function (_enumTypeIndexJs) {
      Orientation = _enumTypeIndexJs.Orientation;
    }],
    execute: function () {
      // these value is defined in the native layer
      orientationMap = {
        0: Orientation.PORTRAIT,
        '-90': Orientation.LANDSCAPE_LEFT,
        90: Orientation.LANDSCAPE_RIGHT,
        180: Orientation.PORTRAIT_UPSIDE_DOWN
      };

      ScreenAdapter = /*#__PURE__*/function (_EventTarget) {
        _inheritsLoose(ScreenAdapter, _EventTarget);

        function ScreenAdapter() {
          var _this;

          _this = _EventTarget.call(this) || this;
          _this.isFrameRotated = false;
          _this.handleResizeEvent = true;
          _this._cbToUpdateFrameBuffer = void 0;
          _this._resolutionScale = 1;
          _this._isProportionalToFrame = false;

          _this._registerEvent();

          return _this;
        }

        var _proto = ScreenAdapter.prototype;

        _proto.init = function init(options, cbToRebuildFrameBuffer) {
          this._cbToUpdateFrameBuffer = cbToRebuildFrameBuffer;

          this._cbToUpdateFrameBuffer();
        };

        _proto.requestFullScreen = function requestFullScreen() {
          return Promise.reject(new Error('request fullscreen has not been supported yet on this platform.'));
        };

        _proto.exitFullScreen = function exitFullScreen() {
          return Promise.reject(new Error('exit fullscreen has not been supported yet on this platform.'));
        };

        _proto._registerEvent = function _registerEvent() {
          var _this2 = this;

          jsb.onResize = function (size) {
            if (size.width === 0 || size.height === 0) return;
            size.width /= _this2.devicePixelRatio;
            size.height /= _this2.devicePixelRatio; // TODO: remove this function calling

            window.resize(size.width, size.height);

            _this2.emit('window-resize');
          };

          jsb.onOrientationChanged = function (event) {
            _this2.emit('orientation-change');
          };
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
            return jsb.device.getDevicePixelRatio() || 1;
          }
        }, {
          key: "windowSize",
          get: function get() {
            var dpr = this.devicePixelRatio; // NOTE: fix precision issue on Metal render end.

            var roundWidth = Math.round(window.innerWidth);
            var roundHeight = Math.round(window.innerHeight);
            return new Size(roundWidth * dpr, roundHeight * dpr);
          },
          set: function set(size) {
            console.warn('Setting window size is not supported yet.');
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
            return orientationMap[jsb.device.getDeviceOrientation()];
          },
          set: function set(value) {
            console.warn('Setting orientation is not supported yet.');
          }
        }, {
          key: "safeAreaEdge",
          get: function get() {
            var nativeSafeArea = jsb.device.getSafeAreaEdge();
            var dpr = this.devicePixelRatio;
            var topEdge = nativeSafeArea.x * dpr;
            var bottomEdge = nativeSafeArea.z * dpr;
            var leftEdge = nativeSafeArea.y * dpr;
            var rightEdge = nativeSafeArea.w * dpr;
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