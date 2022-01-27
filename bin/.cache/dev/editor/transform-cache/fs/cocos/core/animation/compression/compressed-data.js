"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompressedDataEvaluator = exports.CompressedData = void 0;

var _keysSharedCurves = require("../../curves/keys-shared-curves.js");

var _index = require("../../data/decorators/index.js");

var _index2 = require("../../math/index.js");

var _define = require("../define.js");

var _track = require("../tracks/track.js");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let CompressedData = (_dec = (0, _index.ccclass)(`${_define.CLASS_NAME_PREFIX_ANIM}CompressedData`), _dec(_class = (_class2 = (_temp = class CompressedData {
  constructor() {
    _initializerDefineProperty(this, "_curves", _descriptor, this);

    _initializerDefineProperty(this, "_tracks", _descriptor2, this);

    _initializerDefineProperty(this, "_quatCurves", _descriptor3, this);

    _initializerDefineProperty(this, "_quatTracks", _descriptor4, this);
  }

  compressRealTrack(track) {
    const curve = track.channel.curve;

    const mayBeCompressed = _keysSharedCurves.KeySharedRealCurves.allowedForCurve(curve);

    if (!mayBeCompressed) {
      return false;
    }

    this._tracks.push({
      type: CompressedDataTrackType.FLOAT,
      binding: track[_track.trackBindingTag],
      components: [this._addRealCurve(curve)]
    });

    return true;
  }

  compressVectorTrack(vectorTrack) {
    const nComponents = vectorTrack.componentsCount;
    const channels = vectorTrack.channels();
    const mayBeCompressed = channels.every(({
      curve
    }) => _keysSharedCurves.KeySharedRealCurves.allowedForCurve(curve));

    if (!mayBeCompressed) {
      return false;
    }

    const components = new Array(nComponents);

    for (let i = 0; i < nComponents; ++i) {
      const channel = channels[i];
      components[i] = this._addRealCurve(channel.curve);
    }

    this._tracks.push({
      type: nComponents === 2 ? CompressedDataTrackType.VEC2 : nComponents === 3 ? CompressedDataTrackType.VEC3 : CompressedDataTrackType.VEC4,
      binding: vectorTrack[_track.trackBindingTag],
      components
    });

    return true;
  }

  compressQuatTrack(track) {
    const curve = track.channel.curve;

    const mayBeCompressed = _keysSharedCurves.KeySharedQuatCurves.allowedForCurve(curve);

    if (!mayBeCompressed) {
      return false;
    }

    this._quatTracks.push({
      binding: track[_track.trackBindingTag],
      pointer: this._addQuatCurve(curve)
    });

    return true;
  }

  createEval(binder) {
    const compressedDataEvalStatus = {
      keySharedCurvesEvalStatuses: [],
      trackEvalStatuses: [],
      keysSharedQuatCurvesEvalStatues: [],
      quatTrackEvalStatuses: []
    };
    const {
      keySharedCurvesEvalStatuses,
      trackEvalStatuses,
      keysSharedQuatCurvesEvalStatues,
      quatTrackEvalStatuses
    } = compressedDataEvalStatus;

    for (const curves of this._curves) {
      keySharedCurvesEvalStatuses.push({
        curves,
        result: new Array(curves.curveCount).fill(0.0)
      });
    }

    for (const track of this._tracks) {
      const trackTarget = binder(track.binding);

      if (!trackTarget) {
        continue;
      }

      let immediate;

      switch (track.type) {
        default:
        case CompressedDataTrackType.FLOAT:
          break;

        case CompressedDataTrackType.VEC2:
          immediate = new _index2.Vec2();
          break;

        case CompressedDataTrackType.VEC3:
          immediate = new _index2.Vec3();
          break;

        case CompressedDataTrackType.VEC4:
          immediate = new _index2.Vec4();
          break;
      }

      trackEvalStatuses.push({
        type: track.type,
        target: trackTarget,
        curves: track.components,
        immediate
      });
    }

    for (const curves of this._quatCurves) {
      keysSharedQuatCurvesEvalStatues.push({
        curves,
        result: Array.from({
          length: curves.curveCount
        }, () => new _index2.Quat())
      });
    }

    for (const track of this._quatTracks) {
      const trackTarget = binder(track.binding);

      if (!trackTarget) {
        continue;
      }

      quatTrackEvalStatuses.push({
        target: trackTarget,
        curve: track.pointer
      });
    }

    return new CompressedDataEvaluator(compressedDataEvalStatus);
  }

  collectAnimatedJoints() {
    const joints = [];

    for (const track of this._tracks) {
      const trsPath = track.binding.parseTrsPath();

      if (trsPath) {
        joints.push(trsPath.node);
      }
    }

    return joints;
  }

  _addRealCurve(curve) {
    const times = Array.from(curve.times());

    let iKeySharedCurves = this._curves.findIndex(shared => shared.matchCurve(curve));

    if (iKeySharedCurves < 0) {
      iKeySharedCurves = this._curves.length;
      const keySharedCurves = new _keysSharedCurves.KeySharedRealCurves(times);

      this._curves.push(keySharedCurves);
    }

    const iCurve = this._curves[iKeySharedCurves].curveCount;

    this._curves[iKeySharedCurves].addCurve(curve);

    return {
      shared: iKeySharedCurves,
      component: iCurve
    };
  }

  _addQuatCurve(curve) {
    const times = Array.from(curve.times());

    let iKeySharedCurves = this._quatCurves.findIndex(shared => shared.matchCurve(curve));

    if (iKeySharedCurves < 0) {
      iKeySharedCurves = this._quatCurves.length;
      const keySharedCurves = new _keysSharedCurves.KeySharedQuatCurves(times);

      this._quatCurves.push(keySharedCurves);
    }

    const iCurve = this._quatCurves[iKeySharedCurves].curveCount;

    this._quatCurves[iKeySharedCurves].addCurve(curve);

    return {
      shared: iKeySharedCurves,
      curve: iCurve
    };
  }

  validate() {
    return this._tracks.length > 0;
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_curves", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_tracks", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_quatCurves", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_quatTracks", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class2)) || _class);
exports.CompressedData = CompressedData;

class CompressedDataEvaluator {
  constructor(compressedDataEvalStatus) {
    this._compressedDataEvalStatus = void 0;
    this._compressedDataEvalStatus = compressedDataEvalStatus;
  }

  evaluate(time) {
    const {
      keySharedCurvesEvalStatuses,
      trackEvalStatuses: compressedTrackEvalStatuses,
      keysSharedQuatCurvesEvalStatues,
      quatTrackEvalStatuses
    } = this._compressedDataEvalStatus;

    const getPreEvaluated = pointer => keySharedCurvesEvalStatuses[pointer.shared].result[pointer.component];

    for (const {
      curves,
      result
    } of keySharedCurvesEvalStatuses) {
      curves.evaluate(time, result);
    }

    for (const {
      type,
      target,
      immediate,
      curves
    } of compressedTrackEvalStatuses) {
      let value = immediate;

      switch (type) {
        default:
          break;

        case CompressedDataTrackType.FLOAT:
          value = getPreEvaluated(curves[0]);
          break;

        case CompressedDataTrackType.VEC2:
          _index2.Vec2.set(value, getPreEvaluated(curves[0]), getPreEvaluated(curves[1]));

          break;

        case CompressedDataTrackType.VEC3:
          _index2.Vec3.set(value, getPreEvaluated(curves[0]), getPreEvaluated(curves[1]), getPreEvaluated(curves[2]));

          break;

        case CompressedDataTrackType.VEC4:
          _index2.Vec4.set(value, getPreEvaluated(curves[0]), getPreEvaluated(curves[1]), getPreEvaluated(curves[2]), getPreEvaluated(curves[4]));

          break;
      }

      target.setValue(value);
    }

    for (const {
      curves,
      result
    } of keysSharedQuatCurvesEvalStatues) {
      curves.evaluate(time, result);
    }

    for (const {
      target,
      curve
    } of quatTrackEvalStatuses) {
      target.setValue(keysSharedQuatCurvesEvalStatues[curve.shared].result[curve.curve]);
    }
  }

}

exports.CompressedDataEvaluator = CompressedDataEvaluator;
var CompressedDataTrackType;

(function (CompressedDataTrackType) {
  CompressedDataTrackType[CompressedDataTrackType["FLOAT"] = 0] = "FLOAT";
  CompressedDataTrackType[CompressedDataTrackType["VEC2"] = 1] = "VEC2";
  CompressedDataTrackType[CompressedDataTrackType["VEC3"] = 2] = "VEC3";
  CompressedDataTrackType[CompressedDataTrackType["VEC4"] = 3] = "VEC4";
})(CompressedDataTrackType || (CompressedDataTrackType = {}));