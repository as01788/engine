"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  spine: true,
  VertexEffectDelegate: true,
  ATTACHMENT_TYPE: true,
  AnimationEventType: true
};
exports.AnimationEventType = exports.ATTACHMENT_TYPE = exports.VertexEffectDelegate = exports.spine = void 0;

var _index = require("../core/index.js");

var _globalExports = require("../core/global-exports.js");

var _skeleton = require("./skeleton.js");

Object.keys(_skeleton).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _skeleton[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _skeleton[key];
    }
  });
});

var _skeletonData = require("./skeleton-data.js");

Object.keys(_skeletonData).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _skeletonData[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _skeletonData[key];
    }
  });
});

var _index2 = require("./assembler/index.js");

Object.keys(_index2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index2[key];
    }
  });
});

/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

/**
 * @packageDocumentation
 * @module spine
 */

/**
 * @en
 * The global main namespace of Spine, all classes, functions,
 * properties and constants of Spine are defined in this namespace
 * @zh
 * Spine 的全局的命名空间，
 * 与 Spine 相关的所有的类，函数，属性，常量都在这个命名空间中定义。
 * @module sp
 * @main sp
 */

/*
 * Reference:
 * http://esotericsoftware.com/spine-runtime-terminology
 * http://esotericsoftware.com/files/runtime-diagram.png
 * http://en.esotericsoftware.com/spine-using-runtimes
 */
const spine = window.spine;
exports.spine = spine;
const VertexEffectDelegate = spine.VertexEffectDelegate;
/**
 * @en
 * The global time scale of Spine.
 * @zh
 * Spine 全局时间缩放率。
 * @example
 * sp.timeScale = 0.8;
 */
// The attachment type of spine. It contains three type: REGION(0), BOUNDING_BOX(1), MESH(2) and SKINNED_MESH.

exports.VertexEffectDelegate = VertexEffectDelegate;
let ATTACHMENT_TYPE;
exports.ATTACHMENT_TYPE = ATTACHMENT_TYPE;

(function (ATTACHMENT_TYPE) {
  ATTACHMENT_TYPE[ATTACHMENT_TYPE["REGION"] = 0] = "REGION";
  ATTACHMENT_TYPE[ATTACHMENT_TYPE["BOUNDING_BOX"] = 1] = "BOUNDING_BOX";
  ATTACHMENT_TYPE[ATTACHMENT_TYPE["MESH"] = 2] = "MESH";
  ATTACHMENT_TYPE[ATTACHMENT_TYPE["SKINNED_MESH"] = 3] = "SKINNED_MESH";
})(ATTACHMENT_TYPE || (exports.ATTACHMENT_TYPE = ATTACHMENT_TYPE = {}));

(0, _index.ccenum)(ATTACHMENT_TYPE);
/**
 * @en The event type of spine skeleton animation.
 * @zh 骨骼动画事件类型。
 * @enum AnimationEventType
 */

let AnimationEventType;
exports.AnimationEventType = AnimationEventType;

(function (AnimationEventType) {
  AnimationEventType[AnimationEventType["START"] = 0] = "START";
  AnimationEventType[AnimationEventType["INTERRUPT"] = 1] = "INTERRUPT";
  AnimationEventType[AnimationEventType["END"] = 2] = "END";
  AnimationEventType[AnimationEventType["DISPOSE"] = 3] = "DISPOSE";
  AnimationEventType[AnimationEventType["COMPLETE"] = 4] = "COMPLETE";
  AnimationEventType[AnimationEventType["EVENT"] = 5] = "EVENT";
})(AnimationEventType || (exports.AnimationEventType = AnimationEventType = {}));

(0, _index.ccenum)(AnimationEventType);
_globalExports.legacyCC.internal.SpineAnimationEventType = AnimationEventType;