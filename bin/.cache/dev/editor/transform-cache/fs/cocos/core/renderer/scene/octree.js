"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Octree = void 0;

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

var _vec = require("../../math/vec3.js");

var _nativeScene = require("./native-scene.js");

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
class Octree {
  /**
   * @en enable octree
   * @zh 是否开启八叉树加速剔除
   */
  set enabled(val) {
    this._enabled = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.enabled = val;
    }
  }

  get enabled() {
    return this._enabled;
  }
  /**
   * @en min pos of scene bounding box
   * @zh 场景包围盒最小值
   */


  get minPos() {
    return this._minPos;
  }

  set minPos(val) {
    this._minPos = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.minPos = val;
    }
  }
  /**
   * @en max pos of scene bounding box
   * @zh 场景包围盒最大值
   */


  get maxPos() {
    return this._maxPos;
  }

  set maxPos(val) {
    this._maxPos = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.maxPos = val;
    }
  }
  /**
   * @en depth of octree
   * @zh 八叉树深度
   */


  get depth() {
    return this._depth;
  }

  set depth(val) {
    this._depth = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.depth = val;
    }
  }

  get native() {
    return this._nativeObj;
  }

  constructor() {
    this._enabled = false;
    this._minPos = new _vec.Vec3(0, 0, 0);
    this._maxPos = new _vec.Vec3(0, 0, 0);
    this._depth = 0;

    if (_internal253Aconstants.JSB) {
      this._nativeObj = new _nativeScene.NativeOctree();
    }
  }

  initialize(octreeInfo) {
    this._enabled = octreeInfo.enabled;
    this._minPos = octreeInfo.minPos;
    this._maxPos = octreeInfo.maxPos;
    this._depth = octreeInfo.depth;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.enabled = this._enabled;
      this._nativeObj.minPos = this._minPos;
      this._nativeObj.maxPos = this._maxPos;
      this._nativeObj.depth = this._depth;
    }
  }

  _destroy() {
    if (_internal253Aconstants.JSB) {
      this._nativeObj = null;
    }
  }

  destroy() {
    this._destroy();
  }

}

exports.Octree = Octree;