"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CC_QUAT_0 = exports.CC_V3_1 = exports.CC_V3_0 = exports.BulletCache = exports.CollisionEventObject = exports.TriggerEventObject = void 0;

var _index = require("../../core/index.js");

var _instantiated = require("./instantiated.js");

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
 * @hidden
 */
const TriggerEventObject = {
  type: 'onTriggerEnter',
  selfCollider: null,
  otherCollider: null,
  impl: null
};
exports.TriggerEventObject = TriggerEventObject;
const CollisionEventObject = {
  type: 'onCollisionEnter',
  selfCollider: null,
  otherCollider: null,
  contacts: [],
  impl: null
};
exports.CollisionEventObject = CollisionEventObject;

class BulletCache {
  constructor() {
    this.BT_TRANSFORM_0 = _instantiated.bt.Transform_new();
    this.BT_TRANSFORM_1 = _instantiated.bt.Transform_new();
    this.BT_V3_0 = _instantiated.bt.Vec3_new(0, 0, 0);
    this.BT_V3_1 = _instantiated.bt.Vec3_new(0, 0, 0);
    this.BT_V3_2 = _instantiated.bt.Vec3_new(0, 0, 0);
    this.BT_QUAT_0 = _instantiated.bt.Quat_new(0, 0, 0, 1);
  }

  static get instance() {
    if (BulletCache._instance == null) BulletCache._instance = new BulletCache();
    return BulletCache._instance;
  }

  static setWrapper(impl, type, wrap) {
    if (!this.ROOT[type]) this.ROOT[type] = {};
    this.ROOT[type][impl] = wrap;
  }

  static delWrapper(impl, type) {
    delete this.ROOT[type][impl];
  }

  static getWrapper(ptr, type) {
    return this.ROOT[type][ptr];
  }

  static isNotEmptyShape(ptr) {
    return ptr !== _instantiated.bt.EmptyShape_static();
  }

}

exports.BulletCache = BulletCache;
BulletCache._instance = void 0;
BulletCache.ROOT = {};
const CC_V3_0 = new _index.Vec3();
exports.CC_V3_0 = CC_V3_0;
const CC_V3_1 = new _index.Vec3();
exports.CC_V3_1 = CC_V3_1;
const CC_QUAT_0 = new _index.Quat();
exports.CC_QUAT_0 = CC_QUAT_0;
_instantiated.bt.CACHE = BulletCache;