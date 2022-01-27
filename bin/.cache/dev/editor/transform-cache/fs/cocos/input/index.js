"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  input: true,
  Input: true
};
Object.defineProperty(exports, "input", {
  enumerable: true,
  get: function () {
    return _input.input;
  }
});
Object.defineProperty(exports, "Input", {
  enumerable: true,
  get: function () {
    return _input.Input;
  }
});

require("./deprecated.js");

var _input = require("./input.js");

var _systemEvent = require("./system-event.js");

Object.keys(_systemEvent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _systemEvent[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _systemEvent[key];
    }
  });
});