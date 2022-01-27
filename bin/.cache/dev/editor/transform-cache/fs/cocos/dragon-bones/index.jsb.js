"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  ExtensionType: true,
  EventType: true,
  AnimationFadeOutMode: true,
  Slot: true,
  Matrix: true,
  BaseObject: true,
  BoundingBoxData: true,
  PolygonBoundingBoxData: true,
  Transform: true,
  Animation: true,
  TextureData: true,
  CCTextureData: true,
  BaseFactory: true,
  CCFactory: true,
  WorldClock: true,
  TextureAtlasData: true,
  CCArmatureDisplay: true,
  AnimationState: true,
  BoneData: true,
  EllipseBoundingBoxData: true,
  ArmatureData: true,
  CCTextureAtlasData: true,
  TransformObject: true,
  CCSlot: true,
  Armature: true,
  Bone: true,
  RectangleBoundingBoxData: true,
  ArmatureCacheMgr: true,
  SkinData: true,
  EventObject: true,
  SlotData: true,
  DragonBonesData: true,
  AnimationData: true,
  CCArmatureCacheDisplay: true
};
exports.CCArmatureCacheDisplay = exports.AnimationData = exports.DragonBonesData = exports.SlotData = exports.EventObject = exports.SkinData = exports.ArmatureCacheMgr = exports.RectangleBoundingBoxData = exports.Bone = exports.Armature = exports.CCSlot = exports.TransformObject = exports.CCTextureAtlasData = exports.ArmatureData = exports.EllipseBoundingBoxData = exports.BoneData = exports.AnimationState = exports.CCArmatureDisplay = exports.TextureAtlasData = exports.WorldClock = exports.CCFactory = exports.BaseFactory = exports.CCTextureData = exports.TextureData = exports.Animation = exports.Transform = exports.PolygonBoundingBoxData = exports.BoundingBoxData = exports.BaseObject = exports.Matrix = exports.Slot = exports.AnimationFadeOutMode = exports.EventType = exports.ExtensionType = void 0;

var _DragonBonesAsset = require("./DragonBonesAsset.js");

Object.keys(_DragonBonesAsset).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _DragonBonesAsset[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _DragonBonesAsset[key];
    }
  });
});

var _DragonBonesAtlasAsset = require("./DragonBonesAtlasAsset.js");

Object.keys(_DragonBonesAtlasAsset).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _DragonBonesAtlasAsset[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _DragonBonesAtlasAsset[key];
    }
  });
});

var _ArmatureDisplay = require("./ArmatureDisplay.js");

Object.keys(_ArmatureDisplay).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _ArmatureDisplay[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ArmatureDisplay[key];
    }
  });
});

var _AttachUtil = require("./AttachUtil.js");

Object.keys(_AttachUtil).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _AttachUtil[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AttachUtil[key];
    }
  });
});

var _index = require("./assembler/index.js");

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});
let ExtensionType;
exports.ExtensionType = ExtensionType;

(function (ExtensionType) {
  ExtensionType[ExtensionType["FFD"] = 0] = "FFD";
  ExtensionType[ExtensionType["AdjustColor"] = 10] = "AdjustColor";
  ExtensionType[ExtensionType["BevelFilter"] = 11] = "BevelFilter";
  ExtensionType[ExtensionType["BlurFilter"] = 12] = "BlurFilter";
  ExtensionType[ExtensionType["DropShadowFilter"] = 13] = "DropShadowFilter";
  ExtensionType[ExtensionType["GlowFilter"] = 14] = "GlowFilter";
  ExtensionType[ExtensionType["GradientBevelFilter"] = 15] = "GradientBevelFilter";
  ExtensionType[ExtensionType["GradientGlowFilter"] = 16] = "GradientGlowFilter";
})(ExtensionType || (exports.ExtensionType = ExtensionType = {}));

let EventType;
exports.EventType = EventType;

(function (EventType) {
  EventType[EventType["Frame"] = 0] = "Frame";
  EventType[EventType["Sound"] = 1] = "Sound";
})(EventType || (exports.EventType = EventType = {}));

let AnimationFadeOutMode;
exports.AnimationFadeOutMode = AnimationFadeOutMode;

(function (AnimationFadeOutMode) {
  AnimationFadeOutMode[AnimationFadeOutMode["None"] = 0] = "None";
  AnimationFadeOutMode[AnimationFadeOutMode["SameLayer"] = 1] = "SameLayer";
  AnimationFadeOutMode[AnimationFadeOutMode["SameGroup"] = 2] = "SameGroup";
  AnimationFadeOutMode[AnimationFadeOutMode["SameLayerAndGroup"] = 3] = "SameLayerAndGroup";
  AnimationFadeOutMode[AnimationFadeOutMode["All"] = 4] = "All";
})(AnimationFadeOutMode || (exports.AnimationFadeOutMode = AnimationFadeOutMode = {}));

const dragonBones = window.dragonBones;
const Slot = dragonBones.Slot;
exports.Slot = Slot;
const Matrix = dragonBones.Matrix;
exports.Matrix = Matrix;
const BaseObject = dragonBones.BaseObject;
exports.BaseObject = BaseObject;
const BoundingBoxData = dragonBones.BoundingBoxData;
exports.BoundingBoxData = BoundingBoxData;
const PolygonBoundingBoxData = dragonBones.PolygonBoundingBoxData;
exports.PolygonBoundingBoxData = PolygonBoundingBoxData;
const Transform = dragonBones.Transform;
exports.Transform = Transform;
const Animation = dragonBones.Animation;
exports.Animation = Animation;
const TextureData = dragonBones.TextureData;
exports.TextureData = TextureData;
const CCTextureData = dragonBones.CCTextureData;
exports.CCTextureData = CCTextureData;
const BaseFactory = dragonBones.BaseFactory;
exports.BaseFactory = BaseFactory;
const CCFactory = dragonBones.CCFactory;
exports.CCFactory = CCFactory;
const WorldClock = dragonBones.WorldClock;
exports.WorldClock = WorldClock;
const TextureAtlasData = dragonBones.TextureAtlasData;
exports.TextureAtlasData = TextureAtlasData;
const CCArmatureDisplay = dragonBones.CCArmatureDisplay;
exports.CCArmatureDisplay = CCArmatureDisplay;
const AnimationState = dragonBones.AnimationState;
exports.AnimationState = AnimationState;
const BoneData = dragonBones.BoneData;
exports.BoneData = BoneData;
const EllipseBoundingBoxData = dragonBones.EllipseBoundingBoxData;
exports.EllipseBoundingBoxData = EllipseBoundingBoxData;
const ArmatureData = dragonBones.ArmatureData;
exports.ArmatureData = ArmatureData;
const CCTextureAtlasData = dragonBones.CCTextureAtlasData;
exports.CCTextureAtlasData = CCTextureAtlasData;
const TransformObject = dragonBones.TransformObject;
exports.TransformObject = TransformObject;
const CCSlot = dragonBones.CCSlot;
exports.CCSlot = CCSlot;
const Armature = dragonBones.Armature;
exports.Armature = Armature;
const Bone = dragonBones.Bone;
exports.Bone = Bone;
const RectangleBoundingBoxData = dragonBones.RectangleBoundingBoxData;
exports.RectangleBoundingBoxData = RectangleBoundingBoxData;
const ArmatureCacheMgr = dragonBones.ArmatureCacheMgr;
exports.ArmatureCacheMgr = ArmatureCacheMgr;
const SkinData = dragonBones.SkinData;
exports.SkinData = SkinData;
const EventObject = dragonBones.EventObject;
exports.EventObject = EventObject;
const SlotData = dragonBones.SlotData;
exports.SlotData = SlotData;
const DragonBonesData = dragonBones.DragonBonesData;
exports.DragonBonesData = DragonBonesData;
const AnimationData = dragonBones.AnimationData;
exports.AnimationData = AnimationData;
const CCArmatureCacheDisplay = dragonBones.CCArmatureCacheDisplay;
exports.CCArmatureCacheDisplay = CCArmatureCacheDisplay;