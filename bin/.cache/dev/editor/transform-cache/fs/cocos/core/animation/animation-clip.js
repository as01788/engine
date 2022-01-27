"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimationClip = exports.exoticAnimationTag = exports.searchForRootBonePathSymbol = void 0;

var _index = require("../data/decorators/index.js");

var _asset = require("../assets/asset.js");

var _debug = require("../platform/debug.js");

var _binarySearch = require("../algorithm/binary-search.js");

var _murmurhash2_gc = require("../utils/murmurhash2_gc.js");

var _skeletalAnimationDataHub = require("../../3d/skeletal-animation/skeletal-animation-data-hub.js");

var _types = require("./types.js");

var _globalExports = require("../global-exports.js");

var _index2 = require("../math/index.js");

var _node = require("../scene-graph/node.js");

var _asserts = require("../data/utils/asserts.js");

var legacy = _interopRequireWildcard(require("./legacy-clip-data.js"));

var _internalSymbols = require("./internal-symbols.js");

var _track = require("./tracks/track.js");

var _define = require("./define.js");

var _untypedTrack = require("./tracks/untyped-track.js");

var _objectTrack = require("./tracks/object-track.js");

require("./exotic-animation/exotic-animation.js");

var _js = require("../utils/js.js");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _class3, _temp;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

// #region Tracks
// Export for test
const searchForRootBonePathSymbol = Symbol('SearchForRootBonePath'); // #endregion

exports.searchForRootBonePathSymbol = searchForRootBonePathSymbol;
const exoticAnimationTag = Symbol('ExoticAnimation');
/**
 * @zh 动画剪辑表示一段使用动画编辑器编辑的关键帧动画或是外部美术工具生产的骨骼动画。
 * 它的数据主要被分为几层：轨道、关键帧和曲线。
 * @en The animation clip represents a sequence of key frame animation created with the animation editor or skeletal animation other DCC tools.
 * The data is divided in different levels: tracks, key frames, curves.
 */

exports.exoticAnimationTag = exoticAnimationTag;
let AnimationClip = (_dec = (0, _index.ccclass)('cc.AnimationClip'), _dec(_class = (_class2 = (_temp = _class3 = class AnimationClip extends _asset.Asset {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "sample", _descriptor, this);

    _initializerDefineProperty(this, "speed", _descriptor2, this);

    _initializerDefineProperty(this, "wrapMode", _descriptor3, this);

    _initializerDefineProperty(this, "enableTrsBlending", _descriptor4, this);

    _initializerDefineProperty(this, "_duration", _descriptor5, this);

    _initializerDefineProperty(this, "_hash", _descriptor6, this);

    this.frameRate = 0;

    _initializerDefineProperty(this, "_tracks", _descriptor7, this);

    _initializerDefineProperty(this, "_exoticAnimation", _descriptor8, this);

    this._legacyData = undefined;
    this._legacyDataDirty = false;

    _initializerDefineProperty(this, "_events", _descriptor9, this);

    this._runtimeEvents = {
      ratios: [],
      eventGroups: []
    };
  }

  /**
   * @en Crate clip with a set of sprite frames
   * @zh 使用一组序列帧图片来创建动画剪辑
   * @example
   * ```
   * import { AnimationClip } from 'cc';
   * const clip = AnimationClip.createWithSpriteFrames(spriteFrames, 10);
   * ```
   */
  static createWithSpriteFrames(spriteFrames, sample) {
    const clip = new AnimationClip();
    clip.sample = sample || clip.sample;
    clip.duration = spriteFrames.length / clip.sample;
    const step = 1 / clip.sample;
    const track = new _objectTrack.ObjectTrack();
    track.path = new _track.TrackPath().toComponent('cc.Sprite').toProperty('spriteFrame');
    const curve = track.channels()[0].curve;
    curve.assignSorted(spriteFrames.map((spriteFrame, index) => [step * index, spriteFrame]));
    clip.addTrack(track);
    return clip;
  }
  /**
   * @zh 动画帧率，单位为帧/秒。注意此属性仅用于编辑器动画编辑。
   * @en Animation frame rate: frames per second.
   * Note this property is only used for animation editing in Editor.
   */


  /**
   * @zh 动画的周期。
   * @en Animation duration.
   */
  get duration() {
    return this._duration;
  }

  set duration(value) {
    this._duration = value;
  }
  /**
   * Gets the count of tracks this animation owns.
   */


  get tracksCount() {
    return this._tracks.length;
  }
  /**
   * Gets an iterable to tracks.
   */


  get tracks() {
    return this._tracks;
  }

  get hash() {
    var _this$_exoticAnimatio, _this$_exoticAnimatio2;

    // hashes should already be computed offline, but if not, make one
    if (this._hash) {
      return this._hash;
    } // Only hash exotic animations(including skeletal animations imported from model file).
    // The behavior is consistent with how `.hash` implemented prior to 3.3.


    const hashString = `Exotic:${(_this$_exoticAnimatio = (_this$_exoticAnimatio2 = this._exoticAnimation) === null || _this$_exoticAnimatio2 === void 0 ? void 0 : _this$_exoticAnimatio2.toHashString()) !== null && _this$_exoticAnimatio !== void 0 ? _this$_exoticAnimatio : ''}`;
    return this._hash = (0, _murmurhash2_gc.murmurhash2_32_gc)(hashString, 666);
  }
  /**
   * @zh 动画包含的事件数据。
   * @en Associated event data.
   */


  get events() {
    return this._events;
  }

  set events(value) {
    this._events = value;
    const ratios = [];
    const eventGroups = [];
    const events = this.events.sort((a, b) => a.frame - b.frame);
    const nEvents = events.length;

    for (let iEvent = 0; iEvent < nEvents; ++iEvent) {
      const eventData = events[iEvent];
      const ratio = eventData.frame / this._duration;
      let i = ratios.findIndex(r => r === ratio);

      if (i < 0) {
        i = ratios.length;
        ratios.push(ratio);
        eventGroups.push({
          events: []
        });
      }

      eventGroups[i].events.push({
        functionName: eventData.func,
        parameters: eventData.params
      });
    }

    this._runtimeEvents = {
      ratios,
      eventGroups
    };
  }

  get [exoticAnimationTag]() {
    return this._exoticAnimation;
  }

  set [exoticAnimationTag](value) {
    this._exoticAnimation = value;
  }

  onLoaded() {
    this.frameRate = this.sample;
    this.events = this._events;
  }
  /**
   * Counts the time range this animation spans.
   * @returns The time range.
   */


  range() {
    const range = {
      min: Infinity,
      max: -Infinity
    };
    const {
      _tracks: tracks
    } = this;
    const nTracks = tracks.length;

    for (let iTrack = 0; iTrack < nTracks; ++iTrack) {
      const track = tracks[iTrack];
      const trackRange = track.range();
      range.min = Math.min(range.min, trackRange.min);
      range.max = Math.max(range.max, trackRange.max);
    }

    return range;
  }
  /**
   * Gets the specified track.
   * @param index Index to the track.
   * @returns The track.
   */


  getTrack(index) {
    return this._tracks[index];
  }
  /**
   * Adds a track into this animation.
   * @param track The track.
   * @returns Index to the track.
   */


  addTrack(track) {
    const index = this._tracks.length;

    this._tracks.push(track);

    return index;
  }
  /**
   * Removes a track from this animation.
   * @param index Index to the track.
   */


  removeTrack(index) {
    this._tracks.splice(index, 1);
  }
  /**
   * Removes all tracks from this animation.
   */


  clearTracks() {
    this._tracks.length = 0;
  }
  /**
   * Creates an event evaluator for this animation.
   * @param targetNode Target node used to fire events.
   * @returns
   * @internal Do not use this in your code.
   */


  createEventEvaluator(targetNode) {
    return new EventEvaluator(targetNode, this._runtimeEvents.ratios, this._runtimeEvents.eventGroups, this.wrapMode);
  }
  /**
   * Creates an evaluator for this animation.
   * @param context The context.
   * @returns The evaluator.
   * @internal Do not use this in your code.
   */


  createEvaluator(context) {
    const {
      target
    } = context;

    const binder = binding => {
      const trackTarget = binding.createRuntimeBinding(target, this.enableTrsBlending ? context.pose : undefined, false); // TODO: warning

      return trackTarget !== null && trackTarget !== void 0 ? trackTarget : undefined;
    };

    return this._createEvalWithBinder(target, binder, context.rootMotion);
  }

  destroy() {
    var _legacyCC$director$ro;

    if ((_legacyCC$director$ro = _globalExports.legacyCC.director.root) === null || _legacyCC$director$ro === void 0 ? void 0 : _legacyCC$director$ro.dataPoolManager) {
      _globalExports.legacyCC.director.root.dataPoolManager.releaseAnimationClip(this);
    }

    _skeletalAnimationDataHub.SkelAnimDataHub.destroy(this);

    return super.destroy();
  }

  [_internalSymbols.BAKE_SKELETON_CURVE_SYMBOL](start, samples, frames) {
    const step = 1.0 / samples;

    const animatedJoints = this._collectAnimatedJoints();

    const nAnimatedJoints = animatedJoints.length;
    const jointsBakeInfo = {};

    for (let iAnimatedJoint = 0; iAnimatedJoint < nAnimatedJoints; ++iAnimatedJoint) {
      const joint = animatedJoints[iAnimatedJoint];
      jointsBakeInfo[joint] = {
        transforms: Array.from({
          length: frames
        }, () => new _index2.Mat4())
      };
    }

    const skeletonFrames = animatedJoints.reduce((result, joint) => {
      result[joint] = new BoneGlobalTransform();
      return result;
    }, {});

    for (const joint in skeletonFrames) {
      const skeletonFrame = skeletonFrames[joint];
      const parentJoint = joint.lastIndexOf('/');

      if (parentJoint >= 0) {
        const parentJointName = joint.substring(0, parentJoint);
        const parentJointFrame = skeletonFrames[parentJointName]; // Parent joint can be nil since some of joints' parents
        // are not in animation list. For example, joints under socket nodes.

        if (parentJointFrame) {
          skeletonFrame.parent = parentJointFrame;
        }
      }
    }

    const binder = binding => {
      const trsPath = binding.parseTrsPath();

      if (!trsPath) {
        return undefined;
      }

      const jointFrame = skeletonFrames[trsPath.node];

      if (!jointFrame) {
        return undefined;
      }

      return createBoneTransformBinding(jointFrame, trsPath.property);
    };

    const evaluator = this._createEvalWithBinder(undefined, binder, undefined);

    for (let iFrame = 0; iFrame < frames; ++iFrame) {
      const time = start + step * iFrame;
      evaluator.evaluate(time);

      for (let iAnimatedJoint = 0; iAnimatedJoint < nAnimatedJoints; ++iAnimatedJoint) {
        const joint = animatedJoints[iAnimatedJoint];

        _index2.Mat4.copy(jointsBakeInfo[joint].transforms[iFrame], skeletonFrames[joint].globalTransform);
      }

      for (let iAnimatedJoint = 0; iAnimatedJoint < nAnimatedJoints; ++iAnimatedJoint) {
        const joint = animatedJoints[iAnimatedJoint];
        skeletonFrames[joint].invalidate();
      }
    }

    return {
      samples,
      frames,
      joints: jointsBakeInfo
    };
  }
  /**
   * Convert all untyped tracks into typed ones and delete the original.
   * @param refine How to decide the type on specified path.
   * @internal DO NOT USE THIS IN YOUR CODE.
   */


  upgradeUntypedTracks(refine) {
    const newTracks = [];
    const removals = [];
    const {
      _tracks: tracks
    } = this;
    const nTracks = tracks.length;

    for (let iTrack = 0; iTrack < nTracks; ++iTrack) {
      const track = tracks[iTrack];

      if (!(track instanceof _untypedTrack.UntypedTrack)) {
        continue;
      }

      const newTrack = track.upgrade(refine);

      if (newTrack) {
        newTracks.push(newTrack);
        removals.push(track);
      }
    }

    const nRemovalTracks = removals.length;

    for (let iRemovalTrack = 0; iRemovalTrack < nRemovalTracks; ++iRemovalTrack) {
      _js.array.remove(tracks, removals[iRemovalTrack]);
    }

    tracks.push(...newTracks);
  }
  /**
   * Export for test.
   */


  [searchForRootBonePathSymbol]() {
    return this._searchForRootBonePath();
  } // #region Legacy area
  // The following are significantly refactored and deprecated since 3.3.
  // We deprecates the direct exposure of keys, values, events.
  // Instead, we use track to organize them together.

  /**
   * @zh 曲线可引用的所有时间轴。
   * @en Frame keys referenced by curves.
   * @deprecated Since V3.3. Please reference to the track/channel/curve mechanism introduced in V3.3.
   */


  get keys() {
    return this._getLegacyData().keys;
  }

  set keys(value) {
    this._legacyDataDirty = true;
    this._getLegacyData().keys = value;
  }
  /**
   * @zh 此动画包含的所有曲线。
   * @en Curves this animation contains.
   * @deprecated Since V3.3. Please reference to the track/channel/curve mechanism introduced in V3.3.
   */


  get curves() {
    this._legacyDataDirty = true;
    return this._getLegacyData().curves;
  }

  set curves(value) {
    this._getLegacyData().curves = value;
  }
  /**
   * @deprecated Since V3.3. Please reference to the track/channel/curve mechanism introduced in V3.3.
   */


  get commonTargets() {
    return this._getLegacyData().commonTargets;
  }

  set commonTargets(value) {
    this._legacyDataDirty = true;
    this._getLegacyData().commonTargets = value;
  }
  /**
   * 此动画的数据。
   * @deprecated Since V3.3. Please reference to the track/channel/curve mechanism introduced in V3.3.
   */


  get data() {
    return this._getLegacyData().data;
  }
  /**
   * @internal
   * @deprecated Since V3.3. Please reference to the track/channel/curve mechanism introduced in V3.3.
   */


  getPropertyCurves() {
    return this._getLegacyData().getPropertyCurves();
  }
  /**
   * @protected
   * @deprecated Since V3.3. Please reference to the track/channel/curve mechanism introduced in V3.3.
   */


  get eventGroups() {
    return this._runtimeEvents.eventGroups;
  }
  /**
   * @zh 提交事件数据的修改。
   * 当你修改了 `this.events` 时，必须调用 `this.updateEventDatas()` 使修改生效。
   * @en
   * Commit event data update.
   * You should call this function after you changed the `events` data to take effect.
   * @internal
   * @deprecated Since V3.3. Please Assign to `this.events`.
   */


  updateEventDatas() {
    this.events = this._events;
  }
  /**
   * @zh 返回本动画是否包含事件数据。
   * @en Returns if this animation contains event data.
   * @protected
   */


  hasEvents() {
    return this.events.length !== 0;
  }
  /**
   * Migrates legacy data into tracks.
   * @internal This method tend to be used as internal purpose or patch.
   * DO NOT use it in your code since it might be removed for the future at any time.
   * @deprecated Since V3.3. Please reference to the track/channel/curve mechanism introduced in V3.3.
   */


  syncLegacyData() {
    if (this._legacyData) {
      this._fromLegacy(this._legacyData);

      this._legacyData = undefined;
    }
  } // #endregion


  _createEvalWithBinder(target, binder, rootMotionOptions) {
    if (this._legacyDataDirty) {
      this._legacyDataDirty = false;
      this.syncLegacyData();
    }

    const rootMotionTrackExcludes = [];
    let rootMotionEvaluation;

    if (rootMotionOptions) {
      rootMotionEvaluation = this._createRootMotionEvaluation(target, rootMotionOptions, rootMotionTrackExcludes);
    }

    const trackEvalStatues = [];
    let exoticAnimationEvaluator;
    const {
      _tracks: tracks
    } = this;
    const nTracks = tracks.length;

    for (let iTrack = 0; iTrack < nTracks; ++iTrack) {
      const track = tracks[iTrack];

      if (rootMotionTrackExcludes.includes(track)) {
        continue;
      }

      if (Array.from(track.channels()).every(({
        curve
      }) => curve.keyFramesCount === 0)) {
        continue;
      }

      const trackTarget = binder(track[_track.trackBindingTag]);

      if (!trackTarget) {
        continue;
      }

      const trackEval = track[_define.createEvalSymbol](trackTarget);

      trackEvalStatues.push({
        binding: trackTarget,
        trackEval
      });
    }

    if (this._exoticAnimation) {
      exoticAnimationEvaluator = this._exoticAnimation.createEvaluator(binder);
    }

    const evaluation = new AnimationClipEvaluation(trackEvalStatues, exoticAnimationEvaluator, rootMotionEvaluation);
    return evaluation;
  }

  _createRootMotionEvaluation(target, rootMotionOptions, rootMotionTrackExcludes) {
    if (!(target instanceof _node.Node)) {
      (0, _debug.errorID)(3920);
      return undefined;
    }

    const rootBonePath = this._searchForRootBonePath();

    if (!rootBonePath) {
      (0, _debug.warnID)(3923);
      return undefined;
    }

    const rootBone = target.getChildByPath(rootBonePath);

    if (!rootBone) {
      (0, _debug.warnID)(3924);
      return undefined;
    } // const { } = rootMotionOptions;


    const boneTransform = new BoneTransform();
    const rootMotionsTrackEvaluations = [];
    const {
      _tracks: tracks
    } = this;
    const nTracks = tracks.length;

    for (let iTrack = 0; iTrack < nTracks; ++iTrack) {
      const track = tracks[iTrack];
      const {
        [_track.trackBindingTag]: trackBinding
      } = track;
      const trsPath = trackBinding.parseTrsPath();

      if (!trsPath) {
        continue;
      }

      const bonePath = trsPath.node;

      if (bonePath !== rootBonePath) {
        continue;
      }

      rootMotionTrackExcludes.push(track);
      const property = trsPath.property;
      const trackTarget = createBoneTransformBinding(boneTransform, property);

      if (!trackTarget) {
        continue;
      }

      const trackEval = track[_define.createEvalSymbol](trackTarget);

      rootMotionsTrackEvaluations.push({
        binding: trackTarget,
        trackEval
      });
    }

    const rootMotionEvaluation = new RootMotionEvaluation(rootBone, this._duration, boneTransform, rootMotionsTrackEvaluations);
    return rootMotionEvaluation;
  }

  _searchForRootBonePath() {
    const paths = this._tracks.map(track => {
      const trsPath = track[_track.trackBindingTag].parseTrsPath();

      if (trsPath) {
        const nodePath = trsPath.node;
        return {
          path: nodePath,
          rank: nodePath.split('/').length
        };
      } else {
        return {
          path: '',
          rank: 0
        };
      }
    });

    paths.sort((a, b) => a.rank - b.rank);
    const iNonEmptyPath = paths.findIndex(p => p.rank !== 0);

    if (iNonEmptyPath < 0) {
      return '';
    }

    const nPaths = paths.length;
    const firstPath = paths[iNonEmptyPath];
    let highestPathsAreSame = true;

    for (let iPath = iNonEmptyPath + 1; iPath < nPaths; ++iPath) {
      const path = paths[iPath];

      if (path.rank !== firstPath.rank) {
        break;
      }

      if (path.path !== firstPath.path) {
        highestPathsAreSame = false;
        break;
      }
    }

    return highestPathsAreSame ? firstPath.path : '';
  }

  _getLegacyData() {
    if (!this._legacyData) {
      this._legacyData = this._toLegacy();
    }

    return this._legacyData;
  }

  _toLegacy() {
    const keys = [];
    const legacyCurves = [];
    const commonTargets = [];
    const legacyClipData = new legacy.AnimationClipLegacyData(this._duration);
    legacyClipData.keys = keys;
    legacyClipData.curves = legacyCurves;
    legacyClipData.commonTargets = commonTargets;
    return legacyClipData;
  }

  _fromLegacy(legacyData) {
    const newTracks = legacyData.toTracks();
    const nNewTracks = newTracks.length;

    for (let iNewTrack = 0; iNewTrack < nNewTracks; ++iNewTrack) {
      this.addTrack(newTracks[iNewTrack]);
    }
  }

  _collectAnimatedJoints() {
    const joints = new Set();
    const {
      _tracks: tracks
    } = this;
    const nTracks = tracks.length;

    for (let iTrack = 0; iTrack < nTracks; ++iTrack) {
      const track = tracks[iTrack];

      const trsPath = track[_track.trackBindingTag].parseTrsPath();

      if (trsPath) {
        joints.add(trsPath.node);
      }
    }

    if (this._exoticAnimation) {
      const animatedJoints = this._exoticAnimation.collectAnimatedJoints();

      const nAnimatedJoints = animatedJoints.length;

      for (let iAnimatedJoint = 0; iAnimatedJoint < nAnimatedJoints; ++iAnimatedJoint) {
        joints.add(animatedJoints[iAnimatedJoint]);
      }
    }

    return Array.from(joints);
  }

}, _class3.WrapMode = _types.WrapMode, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "sample", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 60;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "speed", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "wrapMode", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _types.WrapMode.Normal;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "enableTrsBlending", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_duration", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_hash", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_tracks", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_exoticAnimation", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "_events", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class2)) || _class);
exports.AnimationClip = AnimationClip;
_globalExports.legacyCC.AnimationClip = AnimationClip;

class AnimationClipEvaluation {
  /**
   * @internal
   */
  constructor(trackEvalStatuses, exoticAnimationEvaluator, rootMotionEvaluation) {
    this._exoticAnimationEvaluator = void 0;
    this._trackEvalStatues = [];
    this._rootMotionEvaluation = undefined;
    this._trackEvalStatues = trackEvalStatuses;
    this._exoticAnimationEvaluator = exoticAnimationEvaluator;
    this._rootMotionEvaluation = rootMotionEvaluation;
  }
  /**
   * Evaluates this animation.
   * @param time The time.
   */


  evaluate(time) {
    const {
      _trackEvalStatues: trackEvalStatuses,
      _exoticAnimationEvaluator: exoticAnimationEvaluator
    } = this;
    const nTrackEvalStatuses = trackEvalStatuses.length;

    for (let iTrackEvalStatus = 0; iTrackEvalStatus < nTrackEvalStatuses; ++iTrackEvalStatus) {
      const {
        trackEval,
        binding
      } = trackEvalStatuses[iTrackEvalStatus];
      const value = trackEval.evaluate(time, binding);
      binding.setValue(value);
    }

    if (exoticAnimationEvaluator) {
      exoticAnimationEvaluator.evaluate(time);
    }
  }
  /**
   * Gets the root bone motion.
   * @param startTime Start time.
   * @param endTime End time.
   */


  evaluateRootMotion(time, motionLength) {
    const {
      _rootMotionEvaluation: rootMotionEvaluation
    } = this;

    if (rootMotionEvaluation) {
      rootMotionEvaluation.evaluate(time, motionLength);
    }
  }

}

class BoneTransform {
  constructor() {
    this.position = new _index2.Vec3();
    this.scale = new _index2.Vec3(1.0, 1.0, 1.0);
    this.rotation = new _index2.Quat();
    this.eulerAngles = new _index2.Vec3();
  }

  getTransform(out) {
    _index2.Mat4.fromRTS(out, this.rotation, this.position, this.scale);
  }

}

class BoneGlobalTransform extends BoneTransform {
  constructor(...args) {
    super(...args);
    this.parent = null;
    this._dirty = true;
    this._transform = new _index2.Mat4();
  }

  get globalTransform() {
    const transform = this._transform;

    if (this._dirty) {
      this._dirty = false;

      _index2.Mat4.fromRTS(transform, this.rotation, this.position, this.scale);

      if (this.parent) {
        _index2.Mat4.multiply(transform, this.parent.globalTransform, transform);
      }
    }

    return this._transform;
  }

  invalidate() {
    this._dirty = true;
  }

}

const motionTransformCache = new _index2.Mat4();

class RootMotionEvaluation {
  constructor(_rootBone, _duration, _boneTransform, _trackEvalStatuses) {
    this._initialTransformCache = new _index2.Mat4();
    this._clipEndTransformCache = new _index2.Mat4();
    this._startTransformCache = new _index2.Mat4();
    this._endTransformCache = new _index2.Mat4();
    this._motionTransformCache = new _index2.Mat4();
    this._translationMotionCache = new _index2.Vec3();
    this._rotationMotionCache = new _index2.Quat();
    this._scaleMotionCache = new _index2.Vec3();
    this._rootBone = _rootBone;
    this._duration = _duration;
    this._boneTransform = _boneTransform;
    this._trackEvalStatuses = _trackEvalStatuses;
  }

  evaluate(time, motionLength) {
    const motionTransform = this._calcMotionTransform(time, motionLength, this._motionTransformCache);

    const {
      _translationMotionCache: translationMotion,
      _rotationMotionCache: rotationMotion,
      _scaleMotionCache: scaleMotion,
      _rootBone: rootBone
    } = this;

    _index2.Mat4.toRTS(motionTransform, rotationMotion, translationMotion, scaleMotion);

    _index2.Vec3.add(translationMotion, translationMotion, rootBone.position);

    rootBone.setPosition(translationMotion);

    _index2.Quat.multiply(rotationMotion, rotationMotion, rootBone.rotation);

    rootBone.setRotation(rotationMotion);

    _index2.Vec3.multiply(scaleMotion, scaleMotion, rootBone.scale);

    rootBone.setScale(scaleMotion);
  }

  _calcMotionTransform(time, motionLength, outTransform) {
    const {
      _duration: duration
    } = this;
    const remainLength = duration - time;
    (0, _asserts.assertIsTrue)(remainLength >= 0);

    const startTransform = this._evaluateAt(time, this._startTransformCache);

    if (motionLength < remainLength) {
      const endTransform = this._evaluateAt(time + motionLength, this._endTransformCache);

      relativeTransform(outTransform, startTransform, endTransform);
    } else {
      _index2.Mat4.identity(outTransform);

      const accumulateMotionTransform = (from, to) => {
        relativeTransform(motionTransformCache, from, to);

        _index2.Mat4.multiply(outTransform, outTransform, motionTransformCache);
      };

      const diff = motionLength - remainLength;
      const repeatCount = Math.floor(diff / duration);
      const lastRemainTime = diff - repeatCount * duration;

      const clipStartTransform = this._evaluateAt(0, this._initialTransformCache);

      const clipEndTransform = this._evaluateAt(duration, this._clipEndTransformCache);

      const endTransform = this._evaluateAt(lastRemainTime, this._endTransformCache); // Start -> Clip End


      accumulateMotionTransform(startTransform, clipEndTransform); // Whole clip x Repeat Count

      relativeTransform(motionTransformCache, clipStartTransform, clipEndTransform);

      for (let i = 0; i < repeatCount; ++i) {
        _index2.Mat4.multiply(outTransform, outTransform, motionTransformCache);
      } // Clip Start -> End


      accumulateMotionTransform(clipStartTransform, endTransform);
    }

    return outTransform;
  }

  _evaluateAt(time, outTransform) {
    const {
      _trackEvalStatuses: trackEvalStatuses
    } = this;
    const nTrackEvalStatuses = trackEvalStatuses.length;

    for (let iTrackEvalStatus = 0; iTrackEvalStatus < nTrackEvalStatuses; ++iTrackEvalStatus) {
      const {
        trackEval,
        binding
      } = trackEvalStatuses[iTrackEvalStatus];
      const value = trackEval.evaluate(time, binding);
      binding.setValue(value);
    }

    this._boneTransform.getTransform(outTransform);

    return outTransform;
  }

}

function relativeTransform(out, from, to) {
  _index2.Mat4.invert(out, from);

  _index2.Mat4.multiply(out, to, out);
}

function createBoneTransformBinding(boneTransform, property) {
  switch (property) {
    default:
      return undefined;

    case 'position':
      return {
        setValue(value) {
          _index2.Vec3.copy(boneTransform.position, value);
        }

      };

    case 'rotation':
      return {
        setValue(value) {
          _index2.Quat.copy(boneTransform.rotation, value);
        }

      };

    case 'scale':
      return {
        setValue(value) {
          _index2.Vec3.copy(boneTransform.scale, value);
        }

      };

    case 'eulerAngles':
      return {
        setValue(value) {
          _index2.Vec3.copy(boneTransform.eulerAngles, value);
        }

      };
  }
} // #region Events


const InvalidIndex = -1;

class EventEvaluator {
  constructor(_targetNode, _ratios, _eventGroups, _wrapMode) {
    this._lastFrameIndex = -1;
    this._lastIterations = 0.0;
    this._lastDirection = 0;
    this._ignoreIndex = InvalidIndex;
    this._sampled = false;
    this._targetNode = _targetNode;
    this._ratios = _ratios;
    this._eventGroups = _eventGroups;
    this._wrapMode = _wrapMode;
  }

  setWrapMode(wrapMode) {
    this._wrapMode = wrapMode;
  }

  ignore(ratio, direction) {
    this._ignoreIndex = InvalidIndex;
    this._sampled = false;
    let frameIndex = getEventGroupIndexAtRatio(ratio, this._ratios); // only ignore when time not on a frame index

    if (frameIndex < 0) {
      frameIndex = ~frameIndex - 1; // if direction is inverse, then increase index

      if (direction < 0) {
        frameIndex += 1;
      }

      this._ignoreIndex = frameIndex;
    }
  }

  sample(ratio, direction, iterations) {
    const length = this._eventGroups.length;
    let eventIndex = getEventGroupIndexAtRatio(ratio, this._ratios);

    if (eventIndex < 0) {
      eventIndex = ~eventIndex - 1; // If direction is inverse, increase index.

      if (direction < 0) {
        eventIndex += 1;
      }
    }

    if (this._ignoreIndex !== eventIndex) {
      this._ignoreIndex = InvalidIndex;
    }

    if (!this._sampled) {
      this._sampled = true;

      this._doFire(eventIndex, false);

      this._lastFrameIndex = eventIndex;
      this._lastIterations = iterations;
      this._lastDirection = direction;
      return;
    }

    const wrapMode = this._wrapMode;
    const currentIterations = wrapIterations(iterations);
    let lastIterations = wrapIterations(this._lastIterations);
    let lastIndex = this._lastFrameIndex;
    const lastDirection = this._lastDirection;
    const iterationsChanged = lastIterations !== -1 && currentIterations !== lastIterations;

    if (lastIndex === eventIndex && iterationsChanged && length === 1) {
      this._doFire(0, false);
    } else if (lastIndex !== eventIndex || iterationsChanged) {
      direction = lastDirection;

      do {
        if (lastIndex !== eventIndex) {
          if (direction === -1 && lastIndex === 0 && eventIndex > 0) {
            if ((wrapMode & _types.WrapModeMask.PingPong) === _types.WrapModeMask.PingPong) {
              direction *= -1;
            } else {
              lastIndex = length;
            }

            lastIterations++;
          } else if (direction === 1 && lastIndex === length - 1 && eventIndex < length - 1) {
            if ((wrapMode & _types.WrapModeMask.PingPong) === _types.WrapModeMask.PingPong) {
              direction *= -1;
            } else {
              lastIndex = -1;
            }

            lastIterations++;
          }

          if (lastIndex === eventIndex) {
            break;
          }

          if (lastIterations > currentIterations) {
            break;
          }
        }

        lastIndex += direction;

        this._doFire(lastIndex, true);
      } while (lastIndex !== eventIndex && lastIndex > -1 && lastIndex < length);
    }

    this._lastFrameIndex = eventIndex;
    this._lastIterations = iterations;
    this._lastDirection = direction;
  }

  _doFire(eventIndex, delay) {
    if (delay) {
      _globalExports.legacyCC.director.getAnimationManager().pushDelayEvent(this._checkAndFire, this, [eventIndex]);
    } else {
      this._checkAndFire(eventIndex);
    }
  }

  _checkAndFire(eventIndex) {
    if (!this._targetNode || !this._targetNode.isValid) {
      return;
    }

    const {
      _eventGroups: eventGroups
    } = this;

    if (eventIndex < 0 || eventIndex >= eventGroups.length || this._ignoreIndex === eventIndex) {
      return;
    }

    const eventGroup = eventGroups[eventIndex];
    const components = this._targetNode.components;
    const nEvents = eventGroup.events.length;

    for (let iEvent = 0; iEvent < nEvents; ++iEvent) {
      const event = eventGroup.events[iEvent];
      const {
        functionName
      } = event;
      const nComponents = components.length;

      for (let iComponent = 0; iComponent < nComponents; ++iComponent) {
        const component = components[iComponent];
        const fx = component[functionName];

        if (typeof fx === 'function') {
          fx.apply(component, event.parameters);
        }
      }
    }
  }

}

function wrapIterations(iterations) {
  if (iterations - (iterations | 0) === 0) {
    iterations -= 1;
  }

  return iterations | 0;
}

function getEventGroupIndexAtRatio(ratio, ratios) {
  const result = (0, _binarySearch.binarySearchEpsilon)(ratios, ratio);
  return result;
} // #endregion