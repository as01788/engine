"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UntypedTrack = void 0;

var _index = require("../../data/decorators/index.js");

var _index2 = require("../../curves/index.js");

var _index3 = require("../../math/index.js");

var _index4 = require("../../platform/index.js");

var _define = require("../define.js");

var _colorTrack = require("./color-track.js");

var _sizeTrack = require("./size-track.js");

var _track = require("./track.js");

var _vectorTrack = require("./vector-track.js");

var _dec, _class, _class2, _descriptor, _temp, _dec2, _class4, _class5, _descriptor2, _temp2;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let UntypedTrackChannel = (_dec = (0, _index.ccclass)(`${_define.CLASS_NAME_PREFIX_ANIM}UntypedTrackChannel`), _dec(_class = (_class2 = (_temp = class UntypedTrackChannel extends _track.Channel {
  constructor() {
    super(new _index2.RealCurve());

    _initializerDefineProperty(this, "property", _descriptor, this);
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "property", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
})), _class2)) || _class);
let UntypedTrack = (_dec2 = (0, _index.ccclass)(`${_define.CLASS_NAME_PREFIX_ANIM}UntypedTrack`), _dec2(_class4 = (_class5 = (_temp2 = class UntypedTrack extends _track.Track {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_channels", _descriptor2, this);
  }

  channels() {
    return this._channels;
  }

  [_define.createEvalSymbol](runtimeBinding) {
    if (!runtimeBinding.getValue) {
      throw new Error((0, _index4.getError)(3930));
    }

    const trySearchCurve = property => {
      var _this$_channels$find;

      return (_this$_channels$find = this._channels.find(channel => channel.property === property)) === null || _this$_channels$find === void 0 ? void 0 : _this$_channels$find.curve;
    };

    const value = runtimeBinding.getValue();

    switch (true) {
      default:
        throw new Error((0, _index4.getError)(3931));

      case value instanceof _index3.Vec2:
        return new _vectorTrack.Vec2TrackEval(trySearchCurve('x'), trySearchCurve('y'));

      case value instanceof _index3.Vec3:
        return new _vectorTrack.Vec3TrackEval(trySearchCurve('x'), trySearchCurve('y'), trySearchCurve('z'));

      case value instanceof _index3.Vec4:
        return new _vectorTrack.Vec4TrackEval(trySearchCurve('x'), trySearchCurve('y'), trySearchCurve('z'), trySearchCurve('w'));

      case value instanceof _index3.Color:
        // TODO: what if x, y, z, w?
        return new _colorTrack.ColorTrackEval(trySearchCurve('r'), trySearchCurve('g'), trySearchCurve('b'), trySearchCurve('a'));

      case value instanceof _index3.Size:
        return new _sizeTrack.SizeTrackEval(trySearchCurve('width'), trySearchCurve('height'));
    }
  }

  addChannel(property) {
    const channel = new UntypedTrackChannel();
    channel.property = property;

    this._channels.push(channel);

    return channel;
  }

  upgrade(refine) {
    const trySearchChannel = (property, outChannel) => {
      const untypedChannel = this.channels().find(channel => channel.property === property);

      if (untypedChannel) {
        outChannel.name = untypedChannel.name;
        outChannel.curve.assignSorted(Array.from(untypedChannel.curve.times()), Array.from(untypedChannel.curve.values()));
      }
    };

    const kind = refine(this.path, this.proxy);

    switch (kind) {
      default:
        break;

      case 'vec2':
      case 'vec3':
      case 'vec4':
        {
          const track = new _vectorTrack.VectorTrack();
          track.path = this.path;
          track.proxy = this.proxy;
          track.componentsCount = kind === 'vec2' ? 2 : kind === 'vec3' ? 3 : 4;
          const [x, y, z, w] = track.channels();

          switch (kind) {
            case 'vec4':
              trySearchChannel('w', w);
            // fall through

            case 'vec3':
              trySearchChannel('z', z);
            // fall through

            default:
            case 'vec2':
              trySearchChannel('x', x);
              trySearchChannel('y', y);
          }

          return track;
        }

      case 'color':
        {
          const track = new _colorTrack.ColorTrack();
          const [r, g, b, a] = track.channels();
          trySearchChannel('r', r);
          trySearchChannel('g', g);
          trySearchChannel('b', b);
          trySearchChannel('a', a); // TODO: we need float-int conversion if xyzw

          trySearchChannel('x', r);
          trySearchChannel('y', g);
          trySearchChannel('z', b);
          trySearchChannel('w', a);
          return track;
        }

      case 'size':
        break;
    }

    return null;
  }

}, _temp2), (_descriptor2 = _applyDecoratedDescriptor(_class5.prototype, "_channels", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class5)) || _class4);
exports.UntypedTrack = UntypedTrack;