System.register("q-bundled:///fs/pal/system-info/minigame/system-info.js", ["../../../../virtual/internal%253Aconstants.js", "pal/minigame", "../../../cocos/core/event/index.js", "../enum-type/index.js"], function (_export, _context) {
  "use strict";

  var ALIPAY, BAIDU, BYTEDANCE, COCOSPLAY, HUAWEI, LINKSURE, OPPO, QTT, VIVO, WECHAT, XIAOMI, DEBUG, TEST, minigame, EventTarget, BrowserType, NetworkType, OS, Platform, Feature, currentPlatform, SystemInfo, systemInfo;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      ALIPAY = _virtualInternal253AconstantsJs.ALIPAY;
      BAIDU = _virtualInternal253AconstantsJs.BAIDU;
      BYTEDANCE = _virtualInternal253AconstantsJs.BYTEDANCE;
      COCOSPLAY = _virtualInternal253AconstantsJs.COCOSPLAY;
      HUAWEI = _virtualInternal253AconstantsJs.HUAWEI;
      LINKSURE = _virtualInternal253AconstantsJs.LINKSURE;
      OPPO = _virtualInternal253AconstantsJs.OPPO;
      QTT = _virtualInternal253AconstantsJs.QTT;
      VIVO = _virtualInternal253AconstantsJs.VIVO;
      WECHAT = _virtualInternal253AconstantsJs.WECHAT;
      XIAOMI = _virtualInternal253AconstantsJs.XIAOMI;
      DEBUG = _virtualInternal253AconstantsJs.DEBUG;
      TEST = _virtualInternal253AconstantsJs.TEST;
    }, function (_palMinigame) {
      minigame = _palMinigame.minigame;
    }, function (_cocosCoreEventIndexJs) {
      EventTarget = _cocosCoreEventIndexJs.EventTarget;
    }, function (_enumTypeIndexJs) {
      BrowserType = _enumTypeIndexJs.BrowserType;
      NetworkType = _enumTypeIndexJs.NetworkType;
      OS = _enumTypeIndexJs.OS;
      Platform = _enumTypeIndexJs.Platform;
      Feature = _enumTypeIndexJs.Feature;
    }],
    execute: function () {
      if (WECHAT) {
        currentPlatform = Platform.WECHAT_GAME;
      } else if (BAIDU) {
        currentPlatform = Platform.BAIDU_MINI_GAME;
      } else if (XIAOMI) {
        currentPlatform = Platform.XIAOMI_QUICK_GAME;
      } else if (ALIPAY) {
        currentPlatform = Platform.ALIPAY_MINI_GAME;
      } else if (BYTEDANCE) {
        currentPlatform = Platform.BYTEDANCE_MINI_GAME;
      } else if (OPPO) {
        currentPlatform = Platform.OPPO_MINI_GAME;
      } else if (VIVO) {
        currentPlatform = Platform.VIVO_MINI_GAME;
      } else if (HUAWEI) {
        currentPlatform = Platform.HUAWEI_QUICK_GAME;
      } else if (COCOSPLAY) {
        currentPlatform = Platform.COCOSPLAY;
      } else if (LINKSURE) {
        currentPlatform = Platform.LINKSURE_MINI_GAME;
      } else if (QTT) {
        currentPlatform = Platform.QTT_MINI_GAME;
      }

      SystemInfo = /*#__PURE__*/function (_EventTarget) {
        _inheritsLoose(SystemInfo, _EventTarget);

        function SystemInfo() {
          var _this$_featureMap;

          var _this;

          _this = _EventTarget.call(this) || this;
          _this.networkType = void 0;
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
          var minigameSysInfo = minigame.getSystemInfoSync();
          _this.networkType = NetworkType.LAN; // TODO

          _this.isNative = false;
          _this.isBrowser = false; // init isLittleEndian

          _this.isLittleEndian = function () {
            var buffer = new ArrayBuffer(2);
            new DataView(buffer).setInt16(0, 256, true); // Int16Array uses the platform's endianness.

            return new Int16Array(buffer)[0] === 256;
          }(); // init languageCode and language


          _this.nativeLanguage = minigameSysInfo.language;
          _this.language = minigameSysInfo.language.substr(0, 2); // init os, osVersion and osMainVersion

          var minigamePlatform = minigameSysInfo.platform.toLocaleLowerCase();

          if (minigamePlatform === 'android') {
            _this.os = OS.ANDROID;
          } else if (minigamePlatform === 'ios') {
            _this.os = OS.IOS;
          } else if (minigamePlatform === 'windows') {
            _this.os = OS.WINDOWS;
          } else {
            _this.os = OS.UNKNOWN;
          }

          var minigameSystem = minigameSysInfo.system.toLowerCase(); // Adaptation to Android P

          if (minigameSystem === 'android p') {
            minigameSystem = 'android p 9.0';
          }

          var version = /[\d.]+/.exec(minigameSystem);
          _this.osVersion = version ? version[0] : minigameSystem;
          _this.osMainVersion = parseInt(_this.osVersion); // init isMobile and platform

          _this.platform = currentPlatform;
          _this.isMobile = _this.os !== OS.WINDOWS; // init browserType and browserVersion

          _this.browserType = BrowserType.UNKNOWN;
          _this.browserVersion = ''; // init capability

          var _tmpCanvas1 = document.createElement('canvas'); // TODO: remove this


          var supportWebp;

          try {
            supportWebp = TEST ? false : _tmpCanvas1.toDataURL('image/webp').startsWith('data:image/webp');
          } catch (e) {
            supportWebp = false;
          }

          var isPCWechat = WECHAT && _this.os === OS.WINDOWS && !minigame.isDevTool;
          _this._featureMap = (_this$_featureMap = {}, _this$_featureMap[Feature.WEBP] = supportWebp, _this$_featureMap[Feature.IMAGE_BITMAP] = false, _this$_featureMap[Feature.WEB_VIEW] = false, _this$_featureMap[Feature.VIDEO_PLAYER] = WECHAT || OPPO, _this$_featureMap[Feature.SAFE_AREA] = WECHAT || BYTEDANCE, _this$_featureMap[Feature.INPUT_TOUCH] = !isPCWechat, _this$_featureMap[Feature.EVENT_KEYBOARD] = isPCWechat, _this$_featureMap[Feature.EVENT_MOUSE] = isPCWechat, _this$_featureMap[Feature.EVENT_TOUCH] = true, _this$_featureMap[Feature.EVENT_ACCELEROMETER] = !isPCWechat, _this$_featureMap);

          _this._registerEvent();

          return _this;
        }

        var _proto = SystemInfo.prototype;

        _proto._registerEvent = function _registerEvent() {
          var _this2 = this;

          minigame.onHide(function () {
            _this2.emit('hide');
          });
          minigame.onShow(function () {
            _this2.emit('show');
          });
        };

        _proto.hasFeature = function hasFeature(feature) {
          return this._featureMap[feature];
        };

        _proto.getBatteryLevel = function getBatteryLevel() {
          return minigame.getBatteryInfoSync().level / 100;
        };

        _proto.triggerGC = function triggerGC() {
          minigame.triggerGC();
        };

        _proto.openURL = function openURL(url) {
          if (DEBUG) {
            console.warn('openURL is not supported');
          }
        };

        _proto.now = function now() {
          if (Date.now) {
            return Date.now();
          }

          return +new Date();
        };

        _proto.restartJSVM = function restartJSVM() {
          if (DEBUG) {
            console.warn('restartJSVM is not supported.');
          }
        };

        _proto.close = function close() {// TODO: minigame.exitMiniProgram() not implemented.
        };

        return SystemInfo;
      }(EventTarget);

      _export("systemInfo", systemInfo = new SystemInfo());
    }
  };
});