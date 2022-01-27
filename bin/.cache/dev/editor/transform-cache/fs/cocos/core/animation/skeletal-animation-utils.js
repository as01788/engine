"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWorldMatrix = getWorldMatrix;
exports.getTransform = getTransform;
exports.deleteTransform = deleteTransform;

var _index = require("../math/index.js");

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
const stack = [];
const pool = new Map();

function getWorldMatrix(transform, stamp) {
  let i = 0;
  let res = _index.Mat4.IDENTITY;

  while (transform) {
    if (transform.stamp === stamp || transform.stamp + 1 === stamp && !transform.node.hasChangedFlags) {
      res = transform.world;
      transform.stamp = stamp;
      break;
    }

    transform.stamp = stamp;
    stack[i++] = transform;
    transform = transform.parent;
  }

  while (i > 0) {
    transform = stack[--i];
    stack[i] = null;
    const node = transform.node;

    _index.Mat4.fromRTS(transform.local, node.rotation, node.position, node.scale);

    res = _index.Mat4.multiply(transform.world, res, transform.local);
  }

  return res;
}

function getTransform(node, root) {
  let joint = null;
  let i = 0;

  while (node !== root) {
    const id = node.uuid;

    if (pool.has(id)) {
      joint = pool.get(id);
      break;
    } else {
      // TODO: object reuse
      joint = {
        node,
        local: new _index.Mat4(),
        world: new _index.Mat4(),
        stamp: -1,
        parent: null
      };
      pool.set(id, joint);
    }

    stack[i++] = joint;
    node = node.parent;
    joint = null;
  }

  let child;

  while (i > 0) {
    child = stack[--i];
    stack[i] = null;
    child.parent = joint;
    joint = child;
  }

  return joint;
}

function deleteTransform(node) {
  let transform = pool.get(node.uuid) || null;

  while (transform) {
    pool.delete(transform.node.uuid);
    transform = transform.parent;
  }
}