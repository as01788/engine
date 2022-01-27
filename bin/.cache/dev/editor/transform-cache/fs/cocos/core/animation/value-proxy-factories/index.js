"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  MorphWeightValueProxy: true,
  MorphWeightsValueProxy: true,
  MorphWeightsAllValueProxy: true
};
Object.defineProperty(exports, "MorphWeightValueProxy", {
  enumerable: true,
  get: function () {
    return _morphWeights.MorphWeightValueProxy;
  }
});
Object.defineProperty(exports, "MorphWeightsValueProxy", {
  enumerable: true,
  get: function () {
    return _morphWeights.MorphWeightsValueProxy;
  }
});
Object.defineProperty(exports, "MorphWeightsAllValueProxy", {
  enumerable: true,
  get: function () {
    return _morphWeights.MorphWeightsAllValueProxy;
  }
});

var _uniform = require("./uniform.js");

Object.keys(_uniform).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _uniform[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _uniform[key];
    }
  });
});

var _morphWeights = require("./morph-weights.js");