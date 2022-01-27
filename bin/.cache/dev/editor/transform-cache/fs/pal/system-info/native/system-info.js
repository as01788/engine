"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.systemInfo = void 0;

var _index = require("../../../cocos/core/event/index.js");

var _predefine = _interopRequireDefault(require("../../../predefine.js"));

var _index2 = require("../enum-type/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const networkTypeMap = {
  0: _index2.NetworkType.NONE,
  1: _index2.NetworkType.LAN,
  2: _index2.NetworkType.WWAN
};
const platformMap = {
  0: _index2.Platform.WIN32,
  // 1 is Linux platform in native engine
  2: _index2.Platform.MACOS,
  3: _index2.Platform.ANDROID,
  // 4 is IPHONE
  4: _index2.Platform.IOS,
  // 5 is IPAD
  5: _index2.Platform.IOS,
  6: _index2.Platform.OHOS
};

class SystemInfo extends _index.EventTarget {
  // TODO: need to wrap the function __isObjectValid()
  get networkType() {
    return networkTypeMap[jsb.device.getNetworkType()];
  }

  constructor() {
    super();
    this.isNative = void 0;
    this.isBrowser = void 0;
    this.isMobile = void 0;
    this.isLittleEndian = void 0;
    this.platform = void 0;
    this.language = void 0;
    this.nativeLanguage = void 0;
    this.os = void 0;
    this.osVersion = void 0;
    this.osMainVersion = void 0;
    this.browserType = void 0;
    this.browserVersion = void 0;
    this._featureMap = void 0;
    this.isNative = true;
    this.isBrowser = false; // @ts-expect-error __getPlatform()

    this.platform = platformMap[__getPlatform()];
    this.isMobile = this.platform === _index2.Platform.ANDROID || this.platform === _index2.Platform.IOS || this.platform === _index2.Platform.OHOS; // init isLittleEndian

    this.isLittleEndian = (() => {
      const buffer = new ArrayBuffer(2);
      new DataView(buffer).setInt16(0, 256, true); // Int16Array uses the platform's endianness.

      return new Int16Array(buffer)[0] === 256;
    })(); // init languageCode and language
    // @ts-expect-error __getCurrentLanguageCode() defined in JSB


    const currLanguage = __getCurrentLanguageCode();

    this.nativeLanguage = currLanguage ? currLanguage.toLowerCase() : _index2.Language.UNKNOWN; // @ts-expect-error __getCurrentLanguage() defined in JSB

    this.language = __getCurrentLanguage(); // @ts-expect-error __getOS() defined in JSB

    this.os = __getOS(); // @ts-expect-error __getOSVersion() defined in JSB

    this.osVersion = __getOSVersion();
    this.osMainVersion = parseInt(this.osVersion); // init browserType and browserVersion

    this.browserType = _index2.BrowserType.UNKNOWN;
    this.browserVersion = '';
    this._featureMap = {
      [_index2.Feature.WEBP]: true,
      [_index2.Feature.IMAGE_BITMAP]: false,
      [_index2.Feature.WEB_VIEW]: this.isMobile,
      [_index2.Feature.VIDEO_PLAYER]: this.isMobile,
      [_index2.Feature.SAFE_AREA]: this.isMobile,
      [_index2.Feature.INPUT_TOUCH]: this.isMobile,
      [_index2.Feature.EVENT_KEYBOARD]: !this.isMobile,
      [_index2.Feature.EVENT_MOUSE]: !this.isMobile,
      [_index2.Feature.EVENT_TOUCH]: true,
      [_index2.Feature.EVENT_ACCELEROMETER]: this.isMobile
    };

    this._registerEvent();
  }

  _registerEvent() {
    jsb.onPause = () => {
      this.emit('hide');

      _predefine.default.internal.SplashScreen.instance.pauseRendering();
    };

    jsb.onResume = () => {
      this.emit('show');

      _predefine.default.internal.SplashScreen.instance.resumeRendering();
    };

    jsb.onClose = () => {
      this.emit('close');
    };
  }

  hasFeature(feature) {
    return this._featureMap[feature];
  }

  getBatteryLevel() {
    return jsb.device.getBatteryLevel();
  }

  triggerGC() {
    jsb.garbageCollect();
  }

  openURL(url) {
    jsb.openURL(url);
  }

  now() {
    if (Date.now) {
      return Date.now();
    }

    return +new Date();
  }

  restartJSVM() {
    // @ts-expect-error __restartVM() is defined in JSB
    __restartVM();
  }

  close() {
    // @ts-expect-error __close() is defined in JSB
    __close();
  }

}

const systemInfo = new SystemInfo();
exports.systemInfo = systemInfo;