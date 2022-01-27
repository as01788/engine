"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _orientation = require("./orientation.js");

Object.keys(_orientation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _orientation[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _orientation[key];
    }
  });
});

var _screenEvent = require("./screen-event.js");

Object.keys(_screenEvent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _screenEvent[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _screenEvent[key];
    }
  });
});