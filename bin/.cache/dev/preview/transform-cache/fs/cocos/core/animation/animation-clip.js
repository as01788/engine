System.register("q-bundled:///fs/cocos/core/animation/animation-clip.js", ["../data/decorators/index.js", "../assets/asset.js", "../platform/debug.js", "../algorithm/binary-search.js", "../utils/murmurhash2_gc.js", "../../3d/skeletal-animation/skeletal-animation-data-hub.js", "./types.js", "../global-exports.js", "../math/index.js", "../scene-graph/node.js", "../data/utils/asserts.js", "./legacy-clip-data.js", "./internal-symbols.js", "./tracks/track.js", "./define.js", "./tracks/untyped-track.js", "./tracks/object-track.js", "./exotic-animation/exotic-animation.js", "../utils/js.js"], function (_export, _context) {
  "use strict";

  var ccclass, serializable, Asset, errorID, warnID, binarySearchEpsilon, murmurhash2_32_gc, SkelAnimDataHub, AnimationWrapMode, WrapMode, WrapModeMask, legacyCC, Mat4, Quat, Vec3, Node, assertIsTrue, legacy, BAKE_SKELETON_CURVE_SYMBOL, trackBindingTag, TrackPath, createEvalSymbol, UntypedTrack, ObjectTrack, array, _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _class3, _temp, searchForRootBonePathSymbol, exoticAnimationTag, AnimationClip, AnimationClipEvaluation, BoneTransform, BoneGlobalTransform, motionTransformCache, RootMotionEvaluation, InvalidIndex, EventEvaluator;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function relativeTransform(out, from, to) {
    Mat4.invert(out, from);
    Mat4.multiply(out, to, out);
  }

  function createBoneTransformBinding(boneTransform, property) {
    switch (property) {
      default:
        return undefined;

      case 'position':
        return {
          setValue: function setValue(value) {
            Vec3.copy(boneTransform.position, value);
          }
        };

      case 'rotation':
        return {
          setValue: function setValue(value) {
            Quat.copy(boneTransform.rotation, value);
          }
        };

      case 'scale':
        return {
          setValue: function setValue(value) {
            Vec3.copy(boneTransform.scale, value);
          }
        };

      case 'eulerAngles':
        return {
          setValue: function setValue(value) {
            Vec3.copy(boneTransform.eulerAngles, value);
          }
        };
    }
  } // #region Events


  function wrapIterations(iterations) {
    if (iterations - (iterations | 0) === 0) {
      iterations -= 1;
    }

    return iterations | 0;
  }

  function getEventGroupIndexAtRatio(ratio, ratios) {
    var result = binarySearchEpsilon(ratios, ratio);
    return result;
  } // #endregion


  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      serializable = _dataDecoratorsIndexJs.serializable;
    }, function (_assetsAssetJs) {
      Asset = _assetsAssetJs.Asset;
    }, function (_platformDebugJs) {
      errorID = _platformDebugJs.errorID;
      warnID = _platformDebugJs.warnID;
    }, function (_algorithmBinarySearchJs) {
      binarySearchEpsilon = _algorithmBinarySearchJs.binarySearchEpsilon;
    }, function (_utilsMurmurhash2_gcJs) {
      murmurhash2_32_gc = _utilsMurmurhash2_gcJs.murmurhash2_32_gc;
    }, function (_dSkeletalAnimationSkeletalAnimationDataHubJs) {
      SkelAnimDataHub = _dSkeletalAnimationSkeletalAnimationDataHubJs.SkelAnimDataHub;
    }, function (_typesJs) {
      AnimationWrapMode = _typesJs.WrapMode;
      WrapMode = _typesJs.WrapMode;
      WrapModeMask = _typesJs.WrapModeMask;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_mathIndexJs) {
      Mat4 = _mathIndexJs.Mat4;
      Quat = _mathIndexJs.Quat;
      Vec3 = _mathIndexJs.Vec3;
    }, function (_sceneGraphNodeJs) {
      Node = _sceneGraphNodeJs.Node;
    }, function (_dataUtilsAssertsJs) {
      assertIsTrue = _dataUtilsAssertsJs.assertIsTrue;
    }, function (_legacyClipDataJs) {
      legacy = _legacyClipDataJs;
    }, function (_internalSymbolsJs) {
      BAKE_SKELETON_CURVE_SYMBOL = _internalSymbolsJs.BAKE_SKELETON_CURVE_SYMBOL;
    }, function (_tracksTrackJs) {
      trackBindingTag = _tracksTrackJs.trackBindingTag;
      TrackPath = _tracksTrackJs.TrackPath;
    }, function (_defineJs) {
      createEvalSymbol = _defineJs.createEvalSymbol;
    }, function (_tracksUntypedTrackJs) {
      UntypedTrack = _tracksUntypedTrackJs.UntypedTrack;
    }, function (_tracksObjectTrackJs) {
      ObjectTrack = _tracksObjectTrackJs.ObjectTrack;
    }, function (_exoticAnimationExoticAnimationJs) {}, function (_utilsJsJs) {
      array = _utilsJsJs.array;
    }],
    execute: function () {
      // #region Tracks
      // Export for test
      _export("searchForRootBonePathSymbol", searchForRootBonePathSymbol = Symbol('SearchForRootBonePath')); // #endregion


      _export("exoticAnimationTag", exoticAnimationTag = Symbol('ExoticAnimation'));
      /**
       * @zh 动画剪辑表示一段使用动画编辑器编辑的关键帧动画或是外部美术工具生产的骨骼动画。
       * 它的数据主要被分为几层：轨道、关键帧和曲线。
       * @en The animation clip represents a sequence of key frame animation created with the animation editor or skeletal animation other DCC tools.
       * The data is divided in different levels: tracks, key frames, curves.
       */


      _export("AnimationClip", AnimationClip = (_dec = ccclass('cc.AnimationClip'), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Asset) {
        _inheritsLoose(AnimationClip, _Asset);

        function AnimationClip() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Asset.call.apply(_Asset, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "sample", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "speed", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "wrapMode", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "enableTrsBlending", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_duration", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_hash", _descriptor6, _assertThisInitialized(_this));

          _this.frameRate = 0;

          _initializerDefineProperty(_this, "_tracks", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_exoticAnimation", _descriptor8, _assertThisInitialized(_this));

          _this._legacyData = undefined;
          _this._legacyDataDirty = false;

          _initializerDefineProperty(_this, "_events", _descriptor9, _assertThisInitialized(_this));

          _this._runtimeEvents = {
            ratios: [],
            eventGroups: []
          };
          return _this;
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
        AnimationClip.createWithSpriteFrames = function createWithSpriteFrames(spriteFrames, sample) {
          var clip = new AnimationClip();
          clip.sample = sample || clip.sample;
          clip.duration = spriteFrames.length / clip.sample;
          var step = 1 / clip.sample;
          var track = new ObjectTrack();
          track.path = new TrackPath().toComponent('cc.Sprite').toProperty('spriteFrame');
          var curve = track.channels()[0].curve;
          curve.assignSorted(spriteFrames.map(function (spriteFrame, index) {
            return [step * index, spriteFrame];
          }));
          clip.addTrack(track);
          return clip;
        }
        /**
         * @zh 动画帧率，单位为帧/秒。注意此属性仅用于编辑器动画编辑。
         * @en Animation frame rate: frames per second.
         * Note this property is only used for animation editing in Editor.
         */
        ;

        var _proto = AnimationClip.prototype;

        _proto.onLoaded = function onLoaded() {
          this.frameRate = this.sample;
          this.events = this._events;
        }
        /**
         * Counts the time range this animation spans.
         * @returns The time range.
         */
        ;

        _proto.range = function range() {
          var range = {
            min: Infinity,
            max: -Infinity
          };
          var tracks = this._tracks;
          var nTracks = tracks.length;

          for (var iTrack = 0; iTrack < nTracks; ++iTrack) {
            var track = tracks[iTrack];
            var trackRange = track.range();
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
        ;

        _proto.getTrack = function getTrack(index) {
          return this._tracks[index];
        }
        /**
         * Adds a track into this animation.
         * @param track The track.
         * @returns Index to the track.
         */
        ;

        _proto.addTrack = function addTrack(track) {
          var index = this._tracks.length;

          this._tracks.push(track);

          return index;
        }
        /**
         * Removes a track from this animation.
         * @param index Index to the track.
         */
        ;

        _proto.removeTrack = function removeTrack(index) {
          this._tracks.splice(index, 1);
        }
        /**
         * Removes all tracks from this animation.
         */
        ;

        _proto.clearTracks = function clearTracks() {
          this._tracks.length = 0;
        }
        /**
         * Creates an event evaluator for this animation.
         * @param targetNode Target node used to fire events.
         * @returns
         * @internal Do not use this in your code.
         */
        ;

        _proto.createEventEvaluator = function createEventEvaluator(targetNode) {
          return new EventEvaluator(targetNode, this._runtimeEvents.ratios, this._runtimeEvents.eventGroups, this.wrapMode);
        }
        /**
         * Creates an evaluator for this animation.
         * @param context The context.
         * @returns The evaluator.
         * @internal Do not use this in your code.
         */
        ;

        _proto.createEvaluator = function createEvaluator(context) {
          var _this2 = this;

          var target = context.target;

          var binder = function binder(binding) {
            var trackTarget = binding.createRuntimeBinding(target, _this2.enableTrsBlending ? context.pose : undefined, false); // TODO: warning

            return trackTarget !== null && trackTarget !== void 0 ? trackTarget : undefined;
          };

          return this._createEvalWithBinder(target, binder, context.rootMotion);
        };

        _proto.destroy = function destroy() {
          var _legacyCC$director$ro;

          if ((_legacyCC$director$ro = legacyCC.director.root) === null || _legacyCC$director$ro === void 0 ? void 0 : _legacyCC$director$ro.dataPoolManager) {
            legacyCC.director.root.dataPoolManager.releaseAnimationClip(this);
          }

          SkelAnimDataHub.destroy(this);
          return _Asset.prototype.destroy.call(this);
        };

        _proto[BAKE_SKELETON_CURVE_SYMBOL] = function (start, samples, frames) {
          var step = 1.0 / samples;

          var animatedJoints = this._collectAnimatedJoints();

          var nAnimatedJoints = animatedJoints.length;
          var jointsBakeInfo = {};

          for (var iAnimatedJoint = 0; iAnimatedJoint < nAnimatedJoints; ++iAnimatedJoint) {
            var joint = animatedJoints[iAnimatedJoint];
            jointsBakeInfo[joint] = {
              transforms: Array.from({
                length: frames
              }, function () {
                return new Mat4();
              })
            };
          }

          var skeletonFrames = animatedJoints.reduce(function (result, joint) {
            result[joint] = new BoneGlobalTransform();
            return result;
          }, {});

          for (var _joint in skeletonFrames) {
            var skeletonFrame = skeletonFrames[_joint];

            var parentJoint = _joint.lastIndexOf('/');

            if (parentJoint >= 0) {
              var parentJointName = _joint.substring(0, parentJoint);

              var parentJointFrame = skeletonFrames[parentJointName]; // Parent joint can be nil since some of joints' parents
              // are not in animation list. For example, joints under socket nodes.

              if (parentJointFrame) {
                skeletonFrame.parent = parentJointFrame;
              }
            }
          }

          var binder = function binder(binding) {
            var trsPath = binding.parseTrsPath();

            if (!trsPath) {
              return undefined;
            }

            var jointFrame = skeletonFrames[trsPath.node];

            if (!jointFrame) {
              return undefined;
            }

            return createBoneTransformBinding(jointFrame, trsPath.property);
          };

          var evaluator = this._createEvalWithBinder(undefined, binder, undefined);

          for (var iFrame = 0; iFrame < frames; ++iFrame) {
            var time = start + step * iFrame;
            evaluator.evaluate(time);

            for (var _iAnimatedJoint = 0; _iAnimatedJoint < nAnimatedJoints; ++_iAnimatedJoint) {
              var _joint2 = animatedJoints[_iAnimatedJoint];
              Mat4.copy(jointsBakeInfo[_joint2].transforms[iFrame], skeletonFrames[_joint2].globalTransform);
            }

            for (var _iAnimatedJoint2 = 0; _iAnimatedJoint2 < nAnimatedJoints; ++_iAnimatedJoint2) {
              var _joint3 = animatedJoints[_iAnimatedJoint2];

              skeletonFrames[_joint3].invalidate();
            }
          }

          return {
            samples: samples,
            frames: frames,
            joints: jointsBakeInfo
          };
        }
        /**
         * Convert all untyped tracks into typed ones and delete the original.
         * @param refine How to decide the type on specified path.
         * @internal DO NOT USE THIS IN YOUR CODE.
         */
        ;

        _proto.upgradeUntypedTracks = function upgradeUntypedTracks(refine) {
          var newTracks = [];
          var removals = [];
          var tracks = this._tracks;
          var nTracks = tracks.length;

          for (var iTrack = 0; iTrack < nTracks; ++iTrack) {
            var track = tracks[iTrack];

            if (!(track instanceof UntypedTrack)) {
              continue;
            }

            var newTrack = track.upgrade(refine);

            if (newTrack) {
              newTracks.push(newTrack);
              removals.push(track);
            }
          }

          var nRemovalTracks = removals.length;

          for (var iRemovalTrack = 0; iRemovalTrack < nRemovalTracks; ++iRemovalTrack) {
            array.remove(tracks, removals[iRemovalTrack]);
          }

          tracks.push.apply(tracks, newTracks);
        }
        /**
         * Export for test.
         */
        ;

        _proto[searchForRootBonePathSymbol] = function () {
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
        ;

        /**
         * @internal
         * @deprecated Since V3.3. Please reference to the track/channel/curve mechanism introduced in V3.3.
         */
        _proto.getPropertyCurves = function getPropertyCurves() {
          return this._getLegacyData().getPropertyCurves();
        }
        /**
         * @protected
         * @deprecated Since V3.3. Please reference to the track/channel/curve mechanism introduced in V3.3.
         */
        ;

        /**
         * @zh 提交事件数据的修改。
         * 当你修改了 `this.events` 时，必须调用 `this.updateEventDatas()` 使修改生效。
         * @en
         * Commit event data update.
         * You should call this function after you changed the `events` data to take effect.
         * @internal
         * @deprecated Since V3.3. Please Assign to `this.events`.
         */
        _proto.updateEventDatas = function updateEventDatas() {
          this.events = this._events;
        }
        /**
         * @zh 返回本动画是否包含事件数据。
         * @en Returns if this animation contains event data.
         * @protected
         */
        ;

        _proto.hasEvents = function hasEvents() {
          return this.events.length !== 0;
        }
        /**
         * Migrates legacy data into tracks.
         * @internal This method tend to be used as internal purpose or patch.
         * DO NOT use it in your code since it might be removed for the future at any time.
         * @deprecated Since V3.3. Please reference to the track/channel/curve mechanism introduced in V3.3.
         */
        ;

        _proto.syncLegacyData = function syncLegacyData() {
          if (this._legacyData) {
            this._fromLegacy(this._legacyData);

            this._legacyData = undefined;
          }
        } // #endregion
        ;

        _proto._createEvalWithBinder = function _createEvalWithBinder(target, binder, rootMotionOptions) {
          if (this._legacyDataDirty) {
            this._legacyDataDirty = false;
            this.syncLegacyData();
          }

          var rootMotionTrackExcludes = [];
          var rootMotionEvaluation;

          if (rootMotionOptions) {
            rootMotionEvaluation = this._createRootMotionEvaluation(target, rootMotionOptions, rootMotionTrackExcludes);
          }

          var trackEvalStatues = [];
          var exoticAnimationEvaluator;
          var tracks = this._tracks;
          var nTracks = tracks.length;

          for (var iTrack = 0; iTrack < nTracks; ++iTrack) {
            var track = tracks[iTrack];

            if (rootMotionTrackExcludes.includes(track)) {
              continue;
            }

            if (Array.from(track.channels()).every(function (_ref) {
              var curve = _ref.curve;
              return curve.keyFramesCount === 0;
            })) {
              continue;
            }

            var trackTarget = binder(track[trackBindingTag]);

            if (!trackTarget) {
              continue;
            }

            var trackEval = track[createEvalSymbol](trackTarget);
            trackEvalStatues.push({
              binding: trackTarget,
              trackEval: trackEval
            });
          }

          if (this._exoticAnimation) {
            exoticAnimationEvaluator = this._exoticAnimation.createEvaluator(binder);
          }

          var evaluation = new AnimationClipEvaluation(trackEvalStatues, exoticAnimationEvaluator, rootMotionEvaluation);
          return evaluation;
        };

        _proto._createRootMotionEvaluation = function _createRootMotionEvaluation(target, rootMotionOptions, rootMotionTrackExcludes) {
          if (!(target instanceof Node)) {
            errorID(3920);
            return undefined;
          }

          var rootBonePath = this._searchForRootBonePath();

          if (!rootBonePath) {
            warnID(3923);
            return undefined;
          }

          var rootBone = target.getChildByPath(rootBonePath);

          if (!rootBone) {
            warnID(3924);
            return undefined;
          } // const { } = rootMotionOptions;


          var boneTransform = new BoneTransform();
          var rootMotionsTrackEvaluations = [];
          var tracks = this._tracks;
          var nTracks = tracks.length;

          for (var iTrack = 0; iTrack < nTracks; ++iTrack) {
            var track = tracks[iTrack];
            var trackBinding = track[trackBindingTag];
            var trsPath = trackBinding.parseTrsPath();

            if (!trsPath) {
              continue;
            }

            var bonePath = trsPath.node;

            if (bonePath !== rootBonePath) {
              continue;
            }

            rootMotionTrackExcludes.push(track);
            var property = trsPath.property;
            var trackTarget = createBoneTransformBinding(boneTransform, property);

            if (!trackTarget) {
              continue;
            }

            var trackEval = track[createEvalSymbol](trackTarget);
            rootMotionsTrackEvaluations.push({
              binding: trackTarget,
              trackEval: trackEval
            });
          }

          var rootMotionEvaluation = new RootMotionEvaluation(rootBone, this._duration, boneTransform, rootMotionsTrackEvaluations);
          return rootMotionEvaluation;
        };

        _proto._searchForRootBonePath = function _searchForRootBonePath() {
          var paths = this._tracks.map(function (track) {
            var trsPath = track[trackBindingTag].parseTrsPath();

            if (trsPath) {
              var nodePath = trsPath.node;
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

          paths.sort(function (a, b) {
            return a.rank - b.rank;
          });
          var iNonEmptyPath = paths.findIndex(function (p) {
            return p.rank !== 0;
          });

          if (iNonEmptyPath < 0) {
            return '';
          }

          var nPaths = paths.length;
          var firstPath = paths[iNonEmptyPath];
          var highestPathsAreSame = true;

          for (var iPath = iNonEmptyPath + 1; iPath < nPaths; ++iPath) {
            var path = paths[iPath];

            if (path.rank !== firstPath.rank) {
              break;
            }

            if (path.path !== firstPath.path) {
              highestPathsAreSame = false;
              break;
            }
          }

          return highestPathsAreSame ? firstPath.path : '';
        };

        _proto._getLegacyData = function _getLegacyData() {
          if (!this._legacyData) {
            this._legacyData = this._toLegacy();
          }

          return this._legacyData;
        };

        _proto._toLegacy = function _toLegacy() {
          var keys = [];
          var legacyCurves = [];
          var commonTargets = [];
          var legacyClipData = new legacy.AnimationClipLegacyData(this._duration);
          legacyClipData.keys = keys;
          legacyClipData.curves = legacyCurves;
          legacyClipData.commonTargets = commonTargets;
          return legacyClipData;
        };

        _proto._fromLegacy = function _fromLegacy(legacyData) {
          var newTracks = legacyData.toTracks();
          var nNewTracks = newTracks.length;

          for (var iNewTrack = 0; iNewTrack < nNewTracks; ++iNewTrack) {
            this.addTrack(newTracks[iNewTrack]);
          }
        };

        _proto._collectAnimatedJoints = function _collectAnimatedJoints() {
          var joints = new Set();
          var tracks = this._tracks;
          var nTracks = tracks.length;

          for (var iTrack = 0; iTrack < nTracks; ++iTrack) {
            var track = tracks[iTrack];
            var trsPath = track[trackBindingTag].parseTrsPath();

            if (trsPath) {
              joints.add(trsPath.node);
            }
          }

          if (this._exoticAnimation) {
            var animatedJoints = this._exoticAnimation.collectAnimatedJoints();

            var nAnimatedJoints = animatedJoints.length;

            for (var iAnimatedJoint = 0; iAnimatedJoint < nAnimatedJoints; ++iAnimatedJoint) {
              joints.add(animatedJoints[iAnimatedJoint]);
            }
          }

          return Array.from(joints);
        };

        _createClass(AnimationClip, [{
          key: "duration",
          get:
          /**
           * @zh 动画的周期。
           * @en Animation duration.
           */
          function get() {
            return this._duration;
          },
          set: function set(value) {
            this._duration = value;
          }
          /**
           * Gets the count of tracks this animation owns.
           */

        }, {
          key: "tracksCount",
          get: function get() {
            return this._tracks.length;
          }
          /**
           * Gets an iterable to tracks.
           */

        }, {
          key: "tracks",
          get: function get() {
            return this._tracks;
          }
        }, {
          key: "hash",
          get: function get() {
            var _this$_exoticAnimatio, _this$_exoticAnimatio2;

            // hashes should already be computed offline, but if not, make one
            if (this._hash) {
              return this._hash;
            } // Only hash exotic animations(including skeletal animations imported from model file).
            // The behavior is consistent with how `.hash` implemented prior to 3.3.


            var hashString = "Exotic:" + ((_this$_exoticAnimatio = (_this$_exoticAnimatio2 = this._exoticAnimation) === null || _this$_exoticAnimatio2 === void 0 ? void 0 : _this$_exoticAnimatio2.toHashString()) !== null && _this$_exoticAnimatio !== void 0 ? _this$_exoticAnimatio : '');
            return this._hash = murmurhash2_32_gc(hashString, 666);
          }
          /**
           * @zh 动画包含的事件数据。
           * @en Associated event data.
           */

        }, {
          key: "events",
          get: function get() {
            return this._events;
          },
          set: function set(value) {
            var _this3 = this;

            this._events = value;
            var ratios = [];
            var eventGroups = [];
            var events = this.events.sort(function (a, b) {
              return a.frame - b.frame;
            });
            var nEvents = events.length;

            var _loop = function _loop(iEvent) {
              var eventData = events[iEvent];
              var ratio = eventData.frame / _this3._duration;
              var i = ratios.findIndex(function (r) {
                return r === ratio;
              });

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
            };

            for (var iEvent = 0; iEvent < nEvents; ++iEvent) {
              _loop(iEvent);
            }

            this._runtimeEvents = {
              ratios: ratios,
              eventGroups: eventGroups
            };
          }
        }, {
          key: exoticAnimationTag,
          get: function get() {
            return this._exoticAnimation;
          }
        }, {
          key: exoticAnimationTag,
          set: function set(value) {
            this._exoticAnimation = value;
          }
        }, {
          key: "keys",
          get: function get() {
            return this._getLegacyData().keys;
          }
        }, {
          key: "keys",
          set: function set(value) {
            this._legacyDataDirty = true;
            this._getLegacyData().keys = value;
          }
          /**
           * @zh 此动画包含的所有曲线。
           * @en Curves this animation contains.
           * @deprecated Since V3.3. Please reference to the track/channel/curve mechanism introduced in V3.3.
           */

        }, {
          key: "curves",
          get: function get() {
            this._legacyDataDirty = true;
            return this._getLegacyData().curves;
          }
        }, {
          key: "curves",
          set: function set(value) {
            this._getLegacyData().curves = value;
          }
          /**
           * @deprecated Since V3.3. Please reference to the track/channel/curve mechanism introduced in V3.3.
           */

        }, {
          key: "commonTargets",
          get: function get() {
            return this._getLegacyData().commonTargets;
          }
        }, {
          key: "commonTargets",
          set: function set(value) {
            this._legacyDataDirty = true;
            this._getLegacyData().commonTargets = value;
          }
          /**
           * 此动画的数据。
           * @deprecated Since V3.3. Please reference to the track/channel/curve mechanism introduced in V3.3.
           */

        }, {
          key: "data",
          get: function get() {
            return this._getLegacyData().data;
          }
        }, {
          key: "eventGroups",
          get: function get() {
            return this._runtimeEvents.eventGroups;
          }
        }]);

        return AnimationClip;
      }(Asset), _class3.WrapMode = AnimationWrapMode, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "sample", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 60;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "speed", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "wrapMode", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return AnimationWrapMode.Normal;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "enableTrsBlending", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_duration", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_hash", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_tracks", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_exoticAnimation", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "_events", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));

      legacyCC.AnimationClip = AnimationClip;

      AnimationClipEvaluation = /*#__PURE__*/function () {
        /**
         * @internal
         */
        function AnimationClipEvaluation(trackEvalStatuses, exoticAnimationEvaluator, rootMotionEvaluation) {
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


        var _proto2 = AnimationClipEvaluation.prototype;

        _proto2.evaluate = function evaluate(time) {
          var trackEvalStatuses = this._trackEvalStatues,
              exoticAnimationEvaluator = this._exoticAnimationEvaluator;
          var nTrackEvalStatuses = trackEvalStatuses.length;

          for (var iTrackEvalStatus = 0; iTrackEvalStatus < nTrackEvalStatuses; ++iTrackEvalStatus) {
            var _trackEvalStatuses$iT = trackEvalStatuses[iTrackEvalStatus],
                trackEval = _trackEvalStatuses$iT.trackEval,
                binding = _trackEvalStatuses$iT.binding;
            var value = trackEval.evaluate(time, binding);
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
        ;

        _proto2.evaluateRootMotion = function evaluateRootMotion(time, motionLength) {
          var rootMotionEvaluation = this._rootMotionEvaluation;

          if (rootMotionEvaluation) {
            rootMotionEvaluation.evaluate(time, motionLength);
          }
        };

        return AnimationClipEvaluation;
      }();

      BoneTransform = /*#__PURE__*/function () {
        function BoneTransform() {
          this.position = new Vec3();
          this.scale = new Vec3(1.0, 1.0, 1.0);
          this.rotation = new Quat();
          this.eulerAngles = new Vec3();
        }

        var _proto3 = BoneTransform.prototype;

        _proto3.getTransform = function getTransform(out) {
          Mat4.fromRTS(out, this.rotation, this.position, this.scale);
        };

        return BoneTransform;
      }();

      BoneGlobalTransform = /*#__PURE__*/function (_BoneTransform) {
        _inheritsLoose(BoneGlobalTransform, _BoneTransform);

        function BoneGlobalTransform() {
          var _this4;

          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          _this4 = _BoneTransform.call.apply(_BoneTransform, [this].concat(args)) || this;
          _this4.parent = null;
          _this4._dirty = true;
          _this4._transform = new Mat4();
          return _this4;
        }

        var _proto4 = BoneGlobalTransform.prototype;

        _proto4.invalidate = function invalidate() {
          this._dirty = true;
        };

        _createClass(BoneGlobalTransform, [{
          key: "globalTransform",
          get: function get() {
            var transform = this._transform;

            if (this._dirty) {
              this._dirty = false;
              Mat4.fromRTS(transform, this.rotation, this.position, this.scale);

              if (this.parent) {
                Mat4.multiply(transform, this.parent.globalTransform, transform);
              }
            }

            return this._transform;
          }
        }]);

        return BoneGlobalTransform;
      }(BoneTransform);

      motionTransformCache = new Mat4();

      RootMotionEvaluation = /*#__PURE__*/function () {
        function RootMotionEvaluation(_rootBone, _duration, _boneTransform, _trackEvalStatuses) {
          this._initialTransformCache = new Mat4();
          this._clipEndTransformCache = new Mat4();
          this._startTransformCache = new Mat4();
          this._endTransformCache = new Mat4();
          this._motionTransformCache = new Mat4();
          this._translationMotionCache = new Vec3();
          this._rotationMotionCache = new Quat();
          this._scaleMotionCache = new Vec3();
          this._rootBone = _rootBone;
          this._duration = _duration;
          this._boneTransform = _boneTransform;
          this._trackEvalStatuses = _trackEvalStatuses;
        }

        var _proto5 = RootMotionEvaluation.prototype;

        _proto5.evaluate = function evaluate(time, motionLength) {
          var motionTransform = this._calcMotionTransform(time, motionLength, this._motionTransformCache);

          var translationMotion = this._translationMotionCache,
              rotationMotion = this._rotationMotionCache,
              scaleMotion = this._scaleMotionCache,
              rootBone = this._rootBone;
          Mat4.toRTS(motionTransform, rotationMotion, translationMotion, scaleMotion);
          Vec3.add(translationMotion, translationMotion, rootBone.position);
          rootBone.setPosition(translationMotion);
          Quat.multiply(rotationMotion, rotationMotion, rootBone.rotation);
          rootBone.setRotation(rotationMotion);
          Vec3.multiply(scaleMotion, scaleMotion, rootBone.scale);
          rootBone.setScale(scaleMotion);
        };

        _proto5._calcMotionTransform = function _calcMotionTransform(time, motionLength, outTransform) {
          var duration = this._duration;
          var remainLength = duration - time;
          assertIsTrue(remainLength >= 0);

          var startTransform = this._evaluateAt(time, this._startTransformCache);

          if (motionLength < remainLength) {
            var endTransform = this._evaluateAt(time + motionLength, this._endTransformCache);

            relativeTransform(outTransform, startTransform, endTransform);
          } else {
            Mat4.identity(outTransform);

            var accumulateMotionTransform = function accumulateMotionTransform(from, to) {
              relativeTransform(motionTransformCache, from, to);
              Mat4.multiply(outTransform, outTransform, motionTransformCache);
            };

            var diff = motionLength - remainLength;
            var repeatCount = Math.floor(diff / duration);
            var lastRemainTime = diff - repeatCount * duration;

            var clipStartTransform = this._evaluateAt(0, this._initialTransformCache);

            var clipEndTransform = this._evaluateAt(duration, this._clipEndTransformCache);

            var _endTransform = this._evaluateAt(lastRemainTime, this._endTransformCache); // Start -> Clip End


            accumulateMotionTransform(startTransform, clipEndTransform); // Whole clip x Repeat Count

            relativeTransform(motionTransformCache, clipStartTransform, clipEndTransform);

            for (var i = 0; i < repeatCount; ++i) {
              Mat4.multiply(outTransform, outTransform, motionTransformCache);
            } // Clip Start -> End


            accumulateMotionTransform(clipStartTransform, _endTransform);
          }

          return outTransform;
        };

        _proto5._evaluateAt = function _evaluateAt(time, outTransform) {
          var trackEvalStatuses = this._trackEvalStatuses;
          var nTrackEvalStatuses = trackEvalStatuses.length;

          for (var iTrackEvalStatus = 0; iTrackEvalStatus < nTrackEvalStatuses; ++iTrackEvalStatus) {
            var _trackEvalStatuses$iT2 = trackEvalStatuses[iTrackEvalStatus],
                trackEval = _trackEvalStatuses$iT2.trackEval,
                binding = _trackEvalStatuses$iT2.binding;
            var value = trackEval.evaluate(time, binding);
            binding.setValue(value);
          }

          this._boneTransform.getTransform(outTransform);

          return outTransform;
        };

        return RootMotionEvaluation;
      }();

      InvalidIndex = -1;

      EventEvaluator = /*#__PURE__*/function () {
        function EventEvaluator(_targetNode, _ratios, _eventGroups, _wrapMode) {
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

        var _proto6 = EventEvaluator.prototype;

        _proto6.setWrapMode = function setWrapMode(wrapMode) {
          this._wrapMode = wrapMode;
        };

        _proto6.ignore = function ignore(ratio, direction) {
          this._ignoreIndex = InvalidIndex;
          this._sampled = false;
          var frameIndex = getEventGroupIndexAtRatio(ratio, this._ratios); // only ignore when time not on a frame index

          if (frameIndex < 0) {
            frameIndex = ~frameIndex - 1; // if direction is inverse, then increase index

            if (direction < 0) {
              frameIndex += 1;
            }

            this._ignoreIndex = frameIndex;
          }
        };

        _proto6.sample = function sample(ratio, direction, iterations) {
          var length = this._eventGroups.length;
          var eventIndex = getEventGroupIndexAtRatio(ratio, this._ratios);

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

          var wrapMode = this._wrapMode;
          var currentIterations = wrapIterations(iterations);
          var lastIterations = wrapIterations(this._lastIterations);
          var lastIndex = this._lastFrameIndex;
          var lastDirection = this._lastDirection;
          var iterationsChanged = lastIterations !== -1 && currentIterations !== lastIterations;

          if (lastIndex === eventIndex && iterationsChanged && length === 1) {
            this._doFire(0, false);
          } else if (lastIndex !== eventIndex || iterationsChanged) {
            direction = lastDirection;

            do {
              if (lastIndex !== eventIndex) {
                if (direction === -1 && lastIndex === 0 && eventIndex > 0) {
                  if ((wrapMode & WrapModeMask.PingPong) === WrapModeMask.PingPong) {
                    direction *= -1;
                  } else {
                    lastIndex = length;
                  }

                  lastIterations++;
                } else if (direction === 1 && lastIndex === length - 1 && eventIndex < length - 1) {
                  if ((wrapMode & WrapModeMask.PingPong) === WrapModeMask.PingPong) {
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
        };

        _proto6._doFire = function _doFire(eventIndex, delay) {
          if (delay) {
            legacyCC.director.getAnimationManager().pushDelayEvent(this._checkAndFire, this, [eventIndex]);
          } else {
            this._checkAndFire(eventIndex);
          }
        };

        _proto6._checkAndFire = function _checkAndFire(eventIndex) {
          if (!this._targetNode || !this._targetNode.isValid) {
            return;
          }

          var eventGroups = this._eventGroups;

          if (eventIndex < 0 || eventIndex >= eventGroups.length || this._ignoreIndex === eventIndex) {
            return;
          }

          var eventGroup = eventGroups[eventIndex];
          var components = this._targetNode.components;
          var nEvents = eventGroup.events.length;

          for (var iEvent = 0; iEvent < nEvents; ++iEvent) {
            var event = eventGroup.events[iEvent];
            var functionName = event.functionName;
            var nComponents = components.length;

            for (var iComponent = 0; iComponent < nComponents; ++iComponent) {
              var component = components[iComponent];
              var fx = component[functionName];

              if (typeof fx === 'function') {
                fx.apply(component, event.parameters);
              }
            }
          }
        };

        return EventEvaluator;
      }();
    }
  };
});