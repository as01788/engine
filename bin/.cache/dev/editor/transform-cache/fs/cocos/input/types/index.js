"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  SystemEventType: true
};
Object.defineProperty(exports, "SystemEventType", {
  enumerable: true,
  get: function () {
    return _eventEnum.SystemEventType;
  }
});

var _index = require("./event/index.js");

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});

var _acceleration = require("./acceleration.js");

Object.keys(_acceleration).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _acceleration[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _acceleration[key];
    }
  });
});

var _eventEnum = require("./event-enum.js");

var _keyCode = require("./key-code.js");

Object.keys(_keyCode).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _keyCode[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _keyCode[key];
    }
  });
});

var _touch = require("./touch.js");

Object.keys(_touch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _touch[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _touch[key];
    }
  });
});