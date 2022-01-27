System.register("q-bundled:///fs/pal/system-info/native/system-info.js", ["../../../cocos/core/event/index.js", "../../../predefine.js", "../enum-type/index.js"], function (_export, _context) {
  "use strict";

  var EventTarget, legacyCC, BrowserType, NetworkType, Platform, Language, Feature, networkTypeMap, platformMap, SystemInfo, systemInfo;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_cocosCoreEventIndexJs) {
      EventTarget = _cocosCoreEventIndexJs.EventTarget;
    }, function (_predefineJs) {
      legacyCC = _predefineJs.default;
    }, function (_enumTypeIndexJs) {
      BrowserType = _enumTypeIndexJs.BrowserType;
      NetworkType = _enumTypeIndexJs.NetworkType;
      Platform = _enumTypeIndexJs.Platform;
      Language = _enumTypeIndexJs.Language;
      Feature = _enumTypeIndexJs.Feature;
    }],
    execute: function () {
      networkTypeMap = {
        0: NetworkType.NONE,
        1: NetworkType.LAN,
        2: NetworkType.WWAN
      };
      platformMap = {
        0: Platform.WIN32,
        // 1 is Linux platform in native engine
        2: Platform.MACOS,
        3: Platform.ANDROID,
        // 4 is IPHONE
        4: Platform.IOS,
        // 5 is IPAD
        5: Platform.IOS,
        6: Platform.OHOS
      };

      SystemInfo = /*#__PURE__*/function (_EventTarget) {
        _inheritsLoose(SystemInfo, _EventTarget);

        function SystemInfo() {
          var _this$_featureMap;

          var _this;

          _this = _EventTarget.call(this) || this;
          _this.isNative = void 0;
          _this.isBrowser = void 0;
          _this.isMobile = void 0;
          _this.isLittleEndian = void 0;
          _this.platform = void 0;
          _this.language = void 0;
          _this.nativeLanguage = void 0;
          _this.os = void 0;
          _this.osVersion = void 0;
          _this.osMainVersion = void 0;
          _this.browserType = void 0;
          _this.browserVersion = void 0;
          _this._featureMap = void 0;
          _this.isNative = true;
          _this.isBrowser = false; // @ts-expect-error __getPlatform()

          _this.platform = platformMap[__getPlatform()];
          _this.isMobile = _this.platform === Platform.ANDROID || _this.platform === Platform.IOS || _this.platform === Platform.OHOS; // init isLittleEndian

          _this.isLittleEndian = function () {
            var buffer = new ArrayBuffer(2);
            new DataView(buffer).setInt16(0, 256, true); // Int16Array uses the platform's endianness.

            return new Int16Array(buffer)[0] === 256;
          }(); // init languageCode and language
          // @ts-expect-error __getCurrentLanguageCode() defined in JSB


          var currLanguage = __getCurrentLanguageCode();

          _this.nativeLanguage = currLanguage ? currLanguage.toLowerCase() : Language.UNKNOWN; // @ts-expect-error __getCurrentLanguage() defined in JSB

          _this.language = __getCurrentLanguage(); // @ts-expect-error __getOS() defined in JSB

          _this.os = __getOS(); // @ts-expect-error __getOSVersion() defined in JSB

          _this.osVersion = __getOSVersion();
          _this.osMainVersion = parseInt(_this.osVersion); // init browserType and browserVersion

          _this.browserType = BrowserType.UNKNOWN;
          _this.browserVersion = '';
          _this._featureMap = (_this$_featureMap = {}, _this$_featureMap[Feature.WEBP] = true, _this$_featureMap[Feature.IMAGE_BITMAP] = false, _this$_featureMap[Feature.WEB_VIEW] = _this.isMobile, _this$_featureMap[Feature.VIDEO_PLAYER] = _this.isMobile, _this$_featureMap[Feature.SAFE_AREA] = _this.isMobile, _this$_featureMap[Feature.INPUT_TOUCH] = _this.isMobile, _this$_featureMap[Feature.EVENT_KEYBOARD] = !_this.isMobile, _this$_featureMap[Feature.EVENT_MOUSE] = !_this.isMobile, _this$_featureMap[Feature.EVENT_TOUCH] = true, _this$_featureMap[Feature.EVENT_ACCELEROMETER] = _this.isMobile, _this$_featureMap);

          _this._registerEvent();

          return _this;
        }

        var _proto = SystemInfo.prototype;

        _proto._registerEvent = function _registerEvent() {
          var _this2 = this;

          jsb.onPause = function () {
            _this2.emit('hide');

            legacyCC.internal.SplashScreen.instance.pauseRendering();
          };

          jsb.onResume = function () {
            _this2.emit('show');

            legacyCC.internal.SplashScreen.instance.resumeRendering();
          };

          jsb.onClose = function () {
            _this2.emit('close');
          };
        };

        _proto.hasFeature = function hasFeature(feature) {
          return this._featureMap[feature];
        };

        _proto.getBatteryLevel = function getBatteryLevel() {
          return jsb.device.getBatteryLevel();
        };

        _proto.triggerGC = function triggerGC() {
          jsb.garbageCollect();
        };

        _proto.openURL = function openURL(url) {
          jsb.openURL(url);
        };

        _proto.now = function now() {
          if (Date.now) {
            return Date.now();
          }

          return +new Date();
        };

        _proto.restartJSVM = function restartJSVM() {
          // @ts-expect-error __restartVM() is defined in JSB
          __restartVM();
        };

        _proto.close = function close() {
          // @ts-expect-error __close() is defined in JSB
          __close();
        };

        _createClass(SystemInfo, [{
          key: "networkType",
          get: // TODO: need to wrap the function __isObjectValid()
          function get() {
            return networkTypeMap[jsb.device.getNetworkType()];
          }
        }]);

        return SystemInfo;
      }(EventTarget);

      _export("systemInfo", systemInfo = new SystemInfo());
    }
  };
});