"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _accelerometerInput = require("./accelerometer-input.js");

Object.keys(_accelerometerInput).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _accelerometerInput[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _accelerometerInput[key];
    }
  });
});

var _gamepadInput = require("./gamepad-input.js");

Object.keys(_gamepadInput).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _gamepadInput[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _gamepadInput[key];
    }
  });
});

var _keyboardInput = require("./keyboard-input.js");

Object.keys(_keyboardInput).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _keyboardInput[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _keyboardInput[key];
    }
  });
});

var _mouseInput = require("./mouse-input.js");

Object.keys(_mouseInput).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _mouseInput[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mouseInput[key];
    }
  });
});

var _touchInput = require("./touch-input.js");

Object.keys(_touchInput).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _touchInput[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _touchInput[key];
    }
  });
});