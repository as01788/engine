"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SingleChannelTrack = exports.Channel = exports.Track = exports.TrackPath = exports.TrackBinding = exports.trackBindingTag = void 0;

var _index = require("../../data/decorators/index.js");

var _asserts = require("../../data/utils/asserts.js");

var _index2 = require("../../platform/index.js");

var _index3 = require("../../scene-graph/index.js");

var _js = require("../../utils/js.js");

var _define = require("../define.js");

var _targetPath = require("../target-path.js");

var _dec, _class, _class2, _descriptor, _temp, _dec2, _class4, _class5, _descriptor2, _descriptor3, _temp2, _dec3, _class7, _class8, _descriptor4, _temp3, _dec4, _class10, _class11, _descriptor5, _temp4, _dec5, _class13, _class14, _descriptor6, _temp5;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const normalizedFollowTag = Symbol('NormalizedFollow');
const parseTrsPathTag = Symbol('ConvertAsTrsPath');
const trackBindingTag = Symbol('TrackBinding');
exports.trackBindingTag = trackBindingTag;
let TrackPath = (_dec = (0, _index.ccclass)(`${_define.CLASS_NAME_PREFIX_ANIM}TrackPath`), _dec(_class = (_class2 = (_temp = class TrackPath {
  constructor() {
    _initializerDefineProperty(this, "_paths", _descriptor, this);
  }

  get length() {
    return this._paths.length;
  }

  toProperty(name) {
    this._paths.push(name);

    return this;
  }

  toElement(index) {
    this._paths.push(index);

    return this;
  }

  toHierarchy(nodePath) {
    this._paths.push(new _targetPath.HierarchyPath(nodePath));

    return this;
  }

  toComponent(constructor) {
    const path = new _targetPath.ComponentPath(typeof constructor === 'string' ? constructor : _js.js.getClassName(constructor));

    this._paths.push(path);

    return this;
  }
  /**
   * @internal Reserved for backward compatibility. DO NOT USE IT IN YOUR CODE.
   */


  toCustomized(resolver) {
    this._paths.push(resolver);

    return this;
  }

  append(...trackPaths) {
    const paths = this._paths.concat(...trackPaths.map(trackPath => trackPath._paths));

    this._paths = paths;
    return this;
  }

  isPropertyAt(index) {
    return typeof this._paths[index] === 'string';
  }

  parsePropertyAt(index) {
    return this._paths[index];
  }

  isElementAt(index) {
    return typeof this._paths[index] === 'number';
  }

  parseElementAt(index) {
    return this._paths[index];
  }

  isHierarchyAt(index) {
    return this._paths[index] instanceof _targetPath.HierarchyPath;
  }

  parseHierarchyAt(index) {
    (0, _asserts.assertIsTrue)(this.isHierarchyAt(index));
    return this._paths[index].path;
  }

  isComponentAt(index) {
    return this._paths[index] instanceof _targetPath.ComponentPath;
  }

  parseComponentAt(index) {
    (0, _asserts.assertIsTrue)(this.isComponentAt(index));
    return this._paths[index].component;
  }

  slice(beginIndex, endIndex) {
    const trackPath = new TrackPath();
    trackPath._paths = this._paths.slice(beginIndex, endIndex);
    return trackPath;
  }

  trace(object, beginIndex, endIndex) {
    var _beginIndex, _endIndex;

    (_beginIndex = beginIndex) !== null && _beginIndex !== void 0 ? _beginIndex : beginIndex = 0;
    (_endIndex = endIndex) !== null && _endIndex !== void 0 ? _endIndex : endIndex = this._paths.length;
    return this[normalizedFollowTag](object, beginIndex, endIndex);
  }

  [parseTrsPathTag]() {
    const {
      _paths: paths
    } = this;
    const nPaths = paths.length;
    let iPath = 0;
    let nodePath = '';

    for (; iPath < nPaths; ++iPath) {
      const path = paths[iPath];

      if (!(path instanceof _targetPath.HierarchyPath)) {
        break;
      } else if (!path.path) {
        continue;
      } else if (nodePath) {
        nodePath += `/${path.path}`;
      } else {
        nodePath = path.path;
      }
    }

    if (iPath === nPaths) {
      return null;
    }

    let prs;

    if (iPath !== nPaths - 1) {
      return null;
    }

    switch (paths[iPath]) {
      case 'position':
      case 'scale':
      case 'rotation':
      case 'eulerAngles':
        prs = paths[iPath];
        break;

      default:
        return null;
    }

    return {
      node: nodePath,
      property: prs
    };
  }

  [normalizedFollowTag](root, beginIndex, endIndex) {
    const {
      _paths: paths
    } = this;
    let result = root;

    for (let iPath = beginIndex; iPath < endIndex; ++iPath) {
      const path = paths[iPath];

      if ((0, _targetPath.isPropertyPath)(path)) {
        if (!(path in result)) {
          (0, _index2.warnID)(3929, path);
          return null;
        } else {
          result = result[path];
        }
      } else {
        result = path.get(result);
      }

      if (result === null) {
        break;
      }
    }

    return result;
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_paths", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class2)) || _class);
/**
 * Composite of track path and value proxy.
 * Not exposed to external. If there is any reason it should be exposed,
 * please redesign the public interfaces.
 */

exports.TrackPath = TrackPath;
let TrackBinding = (_dec2 = (0, _index.ccclass)(`${_define.CLASS_NAME_PREFIX_ANIM}TrackBinding`), _dec2(_class4 = (0, _index.uniquelyReferenced)(_class4 = (_class5 = (_temp2 = class TrackBinding {
  constructor() {
    _initializerDefineProperty(this, "path", _descriptor2, this);

    _initializerDefineProperty(this, "proxy", _descriptor3, this);
  }

  parseTrsPath() {
    if (this.proxy) {
      return null;
    } else {
      return this.path[parseTrsPathTag]();
    }
  }

  createRuntimeBinding(target, poseOutput, isConstant) {
    const {
      path,
      proxy
    } = this;
    const nPaths = path.length;
    const iLastPath = nPaths - 1;

    if (nPaths !== 0 && (path.isPropertyAt(iLastPath) || path.isElementAt(iLastPath)) && !proxy) {
      const lastPropertyKey = path.isPropertyAt(iLastPath) ? path.parsePropertyAt(iLastPath) : path.parseElementAt(iLastPath);
      const resultTarget = path[normalizedFollowTag](target, 0, nPaths - 1);

      if (resultTarget === null) {
        return null;
      }

      if (poseOutput && resultTarget instanceof _index3.Node && isTrsPropertyName(lastPropertyKey)) {
        const blendStateWriter = poseOutput.createPoseWriter(resultTarget, lastPropertyKey, isConstant);
        return blendStateWriter;
      }

      return {
        setValue: value => {
          resultTarget[lastPropertyKey] = value;
        },
        // eslint-disable-next-line arrow-body-style
        getValue: () => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return resultTarget[lastPropertyKey];
        }
      };
    } else if (!proxy) {
      (0, _index2.errorID)(3921);
      return null;
    } else {
      const resultTarget = path[normalizedFollowTag](target, 0, nPaths);

      if (resultTarget === null) {
        return null;
      }

      const runtimeProxy = proxy.forTarget(resultTarget);
      const binding = {
        setValue: value => {
          runtimeProxy.set(value);
        }
      };
      const proxyGet = runtimeProxy.get;

      if (proxyGet) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        binding.getValue = () => proxyGet.call(runtimeProxy);
      }

      return binding;
    }
  }

}, _temp2), (_descriptor2 = _applyDecoratedDescriptor(_class5.prototype, "path", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new TrackPath();
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "proxy", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class5)) || _class4) || _class4);
exports.TrackBinding = TrackBinding;

function isTrsPropertyName(name) {
  return name === 'position' || name === 'rotation' || name === 'scale' || name === 'eulerAngles';
}

/**
 * A track describes the path of animate a target.
 * It's the basic unit of animation clip.
 */
let Track = (_dec3 = (0, _index.ccclass)(`${_define.CLASS_NAME_PREFIX_ANIM}Track`), _dec3(_class7 = (_class8 = (_temp3 = class Track {
  constructor() {
    _initializerDefineProperty(this, "_binding", _descriptor4, this);
  }

  get path() {
    return this._binding.path;
  }

  set path(value) {
    this._binding.path = value;
  }

  get proxy() {
    return this._binding.proxy;
  }

  set proxy(value) {
    this._binding.proxy = value;
  }

  get [trackBindingTag]() {
    return this._binding;
  }

  channels() {
    return [];
  }

  range() {
    const range = {
      min: Infinity,
      max: -Infinity
    };

    for (const channel of this.channels()) {
      range.min = Math.min(range.min, channel.curve.rangeMin);
      range.max = Math.max(range.max, channel.curve.rangeMax);
    }

    return range;
  }

}, _temp3), (_descriptor4 = _applyDecoratedDescriptor(_class8.prototype, "_binding", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new TrackBinding();
  }
})), _class8)) || _class7);
exports.Track = Track;
let Channel = (_dec4 = (0, _index.ccclass)(`${_define.CLASS_NAME_PREFIX_ANIM}Channel`), _dec4(_class10 = (_class11 = (_temp4 = class Channel {
  constructor(curve) {
    this.name = '';

    _initializerDefineProperty(this, "_curve", _descriptor5, this);

    this._curve = curve;
  }
  /**
   * Not used for now.
   */


  get curve() {
    return this._curve;
  }

}, _temp4), (_descriptor5 = _applyDecoratedDescriptor(_class11.prototype, "_curve", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class11)) || _class10);
exports.Channel = Channel;
let SingleChannelTrack = (_dec5 = (0, _index.ccclass)(`${_define.CLASS_NAME_PREFIX_ANIM}SingleChannelTrack`), _dec5(_class13 = (_class14 = (_temp5 = class SingleChannelTrack extends Track {
  constructor() {
    super();

    _initializerDefineProperty(this, "_channel", _descriptor6, this);

    this._channel = new Channel(this.createCurve());
  }

  get channel() {
    return this._channel;
  }

  channels() {
    return [this._channel];
  }

  createCurve() {
    throw new Error(`Not impl`);
  }

  [_define.createEvalSymbol](_runtimeBinding) {
    const {
      curve
    } = this._channel;
    return new SingleChannelTrackEval(curve);
  }

}, _temp5), (_descriptor6 = _applyDecoratedDescriptor(_class14.prototype, "_channel", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class14)) || _class13);
exports.SingleChannelTrack = SingleChannelTrack;

class SingleChannelTrackEval {
  constructor(_curve) {
    this._curve = _curve;
  }

  evaluate(time) {
    return this._curve.evaluate(time);
  }

}