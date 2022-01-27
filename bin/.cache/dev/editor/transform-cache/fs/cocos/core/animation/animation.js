"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  UniformProxyFactory: true,
  MorphWeightValueProxy: true,
  MorphWeightsValueProxy: true,
  MorphWeightsAllValueProxy: true,
  Track: true,
  TrackPath: true,
  RealTrack: true,
  VectorTrack: true,
  QuatTrack: true,
  ColorTrack: true,
  SizeTrack: true,
  ObjectTrack: true
};
Object.defineProperty(exports, "UniformProxyFactory", {
  enumerable: true,
  get: function () {
    return _uniform.UniformProxyFactory;
  }
});
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
Object.defineProperty(exports, "Track", {
  enumerable: true,
  get: function () {
    return _track.Track;
  }
});
Object.defineProperty(exports, "TrackPath", {
  enumerable: true,
  get: function () {
    return _track.TrackPath;
  }
});
Object.defineProperty(exports, "RealTrack", {
  enumerable: true,
  get: function () {
    return _realTrack.RealTrack;
  }
});
Object.defineProperty(exports, "VectorTrack", {
  enumerable: true,
  get: function () {
    return _vectorTrack.VectorTrack;
  }
});
Object.defineProperty(exports, "QuatTrack", {
  enumerable: true,
  get: function () {
    return _quatTrack.QuatTrack;
  }
});
Object.defineProperty(exports, "ColorTrack", {
  enumerable: true,
  get: function () {
    return _colorTrack.ColorTrack;
  }
});
Object.defineProperty(exports, "SizeTrack", {
  enumerable: true,
  get: function () {
    return _sizeTrack.SizeTrack;
  }
});
Object.defineProperty(exports, "ObjectTrack", {
  enumerable: true,
  get: function () {
    return _objectTrack.ObjectTrack;
  }
});

var _targetPath = require("./target-path.js");

Object.keys(_targetPath).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _targetPath[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _targetPath[key];
    }
  });
});

var _valueProxy = require("./value-proxy.js");

Object.keys(_valueProxy).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _valueProxy[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _valueProxy[key];
    }
  });
});

var _uniform = require("./value-proxy-factories/uniform.js");

var _morphWeights = require("./value-proxy-factories/morph-weights.js");

var _cubicSplineValue = require("./cubic-spline-value.js");

Object.keys(_cubicSplineValue).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _cubicSplineValue[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _cubicSplineValue[key];
    }
  });
});

var _track = require("./tracks/track.js");

var _realTrack = require("./tracks/real-track.js");

var _vectorTrack = require("./tracks/vector-track.js");

var _quatTrack = require("./tracks/quat-track.js");

var _colorTrack = require("./tracks/color-track.js");

var _sizeTrack = require("./tracks/size-track.js");

var _objectTrack = require("./tracks/object-track.js");

var _runtimeExports = require("./marionette/runtime-exports.js");

Object.keys(_runtimeExports).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _runtimeExports[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _runtimeExports[key];
    }
  });
});