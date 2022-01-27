"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _event = require("./event.js");

Object.keys(_event).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _event[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _event[key];
    }
  });
});

var _eventAcceleration = require("./event-acceleration.js");

Object.keys(_eventAcceleration).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _eventAcceleration[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _eventAcceleration[key];
    }
  });
});

var _eventKeyboard = require("./event-keyboard.js");

Object.keys(_eventKeyboard).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _eventKeyboard[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _eventKeyboard[key];
    }
  });
});

var _eventMouse = require("./event-mouse.js");

Object.keys(_eventMouse).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _eventMouse[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _eventMouse[key];
    }
  });
});

var _eventTouch = require("./event-touch.js");

Object.keys(_eventTouch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _eventTouch[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _eventTouch[key];
    }
  });
});