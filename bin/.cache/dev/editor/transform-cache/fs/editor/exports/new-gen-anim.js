"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  blend1D: true,
  blendSimpleDirectional: true,
  validateSimpleDirectionalSamples: true,
  SimpleDirectionalIssueSameDirection: true
};
Object.defineProperty(exports, "blend1D", {
  enumerable: true,
  get: function () {
    return _blend1d.blend1D;
  }
});
Object.defineProperty(exports, "blendSimpleDirectional", {
  enumerable: true,
  get: function () {
    return _blend2d.blendSimpleDirectional;
  }
});
Object.defineProperty(exports, "validateSimpleDirectionalSamples", {
  enumerable: true,
  get: function () {
    return _blend2d.validateSimpleDirectionalSamples;
  }
});
Object.defineProperty(exports, "SimpleDirectionalIssueSameDirection", {
  enumerable: true,
  get: function () {
    return _blend2d.SimpleDirectionalIssueSameDirection;
  }
});

var _blend1d = require("../../cocos/core/animation/marionette/blend-1d.js");

var _blend2d = require("../../cocos/core/animation/marionette/blend-2d.js");

var _assetCreation = require("../../cocos/core/animation/marionette/asset-creation.js");

Object.keys(_assetCreation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _assetCreation[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _assetCreation[key];
    }
  });
});