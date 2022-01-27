"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.systemInfo = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _minigame = require("pal/minigame");

var _index = require("../../../cocos/core/event/index.js");

var _index2 = require("../enum-type/index.js");

// NOTE: register minigame platform here
let currentPlatform;

if (_internal253Aconstants.WECHAT) {
  currentPlatform = _index2.Platform.WECHAT_GAME;
} else if (_internal253Aconstants.BAIDU) {
  currentPlatform = _index2.Platform.BAIDU_MINI_GAME;
} else if (_internal253Aconstants.XIAOMI) {
  currentPlatform = _index2.Platform.XIAOMI_QUICK_GAME;
} else if (_internal253Aconstants.ALIPAY) {
  currentPlatform = _index2.Platform.ALIPAY_MINI_GAME;
} else if (_internal253Aconstants.BYTEDANCE) {
  currentPlatform = _index2.Platform.BYTEDANCE_MINI_GAME;
} else if (_internal253Aconstants.OPPO) {
  currentPlatform = _index2.Platform.OPPO_MINI_GAME;
} else if (_internal253Aconstants.VIVO) {
  currentPlatform = _index2.Platform.VIVO_MINI_GAME;
} else if (_internal253Aconstants.HUAWEI) {
  currentPlatform = _index2.Platform.HUAWEI_QUICK_GAME;
} else if (_internal253Aconstants.COCOSPLAY) {
  currentPlatform = _index2.Platform.COCOSPLAY;
} else if (_internal253Aconstants.LINKSURE) {
  currentPlatform = _index2.Platform.LINKSURE_MINI_GAME;
} else if (_internal253Aconstants.QTT) {
  currentPlatform = _index2.Platform.QTT_MINI_GAME;
}

class SystemInfo extends _index.EventTarget {
  constructor() {
    super();
    this.networkType = void 0;
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

    const minigameSysInfo = _minigame.minigame.getSystemInfoSync();

    this.networkType = _index2.NetworkType.LAN; // TODO

    this.isNative = false;
    this.isBrowser = false; // init isLittleEndian

    this.isLittleEndian = (() => {
      const buffer = new ArrayBuffer(2);
      new DataView(buffer).setInt16(0, 256, true); // Int16Array uses the platform's endianness.

      return new Int16Array(buffer)[0] === 256;
    })(); // init languageCode and language


    this.nativeLanguage = minigameSysInfo.language;
    this.language = minigameSysInfo.language.substr(0, 2); // init os, osVersion and osMainVersion

    const minigamePlatform = minigameSysInfo.platform.toLocaleLowerCase();

    if (minigamePlatform === 'android') {
      this.os = _index2.OS.ANDROID;
    } else if (minigamePlatform === 'ios') {
      this.os = _index2.OS.IOS;
    } else if (minigamePlatform === 'windows') {
      this.os = _index2.OS.WINDOWS;
    } else {
      this.os = _index2.OS.UNKNOWN;
    }

    let minigameSystem = minigameSysInfo.system.toLowerCase(); // Adaptation to Android P

    if (minigameSystem === 'android p') {
      minigameSystem = 'android p 9.0';
    }

    const version = /[\d.]+/.exec(minigameSystem);
    this.osVersion = version ? version[0] : minigameSystem;
    this.osMainVersion = parseInt(this.osVersion); // init isMobile and platform

    this.platform = currentPlatform;
    this.isMobile = this.os !== _index2.OS.WINDOWS; // init browserType and browserVersion

    this.browserType = _index2.BrowserType.UNKNOWN;
    this.browserVersion = ''; // init capability

    const _tmpCanvas1 = document.createElement('canvas'); // TODO: remove this


    let supportWebp;

    try {
      supportWebp = _internal253Aconstants.TEST ? false : _tmpCanvas1.toDataURL('image/webp').startsWith('data:image/webp');
    } catch (e) {
      supportWebp = false;
    }

    const isPCWechat = _internal253Aconstants.WECHAT && this.os === _index2.OS.WINDOWS && !_minigame.minigame.isDevTool;
    this._featureMap = {
      [_index2.Feature.WEBP]: supportWebp,
      [_index2.Feature.IMAGE_BITMAP]: false,
      [_index2.Feature.WEB_VIEW]: false,
      [_index2.Feature.VIDEO_PLAYER]: _internal253Aconstants.WECHAT || _internal253Aconstants.OPPO,
      [_index2.Feature.SAFE_AREA]: _internal253Aconstants.WECHAT || _internal253Aconstants.BYTEDANCE,
      [_index2.Feature.INPUT_TOUCH]: !isPCWechat,
      [_index2.Feature.EVENT_KEYBOARD]: isPCWechat,
      [_index2.Feature.EVENT_MOUSE]: isPCWechat,
      [_index2.Feature.EVENT_TOUCH]: true,
      [_index2.Feature.EVENT_ACCELEROMETER]: !isPCWechat
    };

    this._registerEvent();
  }

  _registerEvent() {
    _minigame.minigame.onHide(() => {
      this.emit('hide');
    });

    _minigame.minigame.onShow(() => {
      this.emit('show');
    });
  }

  hasFeature(feature) {
    return this._featureMap[feature];
  }

  getBatteryLevel() {
    return _minigame.minigame.getBatteryInfoSync().level / 100;
  }

  triggerGC() {
    _minigame.minigame.triggerGC();
  }

  openURL(url) {
    if (_internal253Aconstants.DEBUG) {
      console.warn('openURL is not supported');
    }
  }

  now() {
    if (Date.now) {
      return Date.now();
    }

    return +new Date();
  }

  restartJSVM() {
    if (_internal253Aconstants.DEBUG) {
      console.warn('restartJSVM is not supported.');
    }
  }

  close() {// TODO: minigame.exitMiniProgram() not implemented.
  }

}

const systemInfo = new SystemInfo();
exports.systemInfo = systemInfo;