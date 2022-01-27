"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.constget = constget;

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

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
 * 在调试模式下，将属性的 Get 访问器标记为不可变的。
 * 属性必须为 Javascript 原生类型或继承自 ValueType。
 * 非调试模式下，此装饰器没有任何效果。
 */
function constget(target, propertyKey) {
  if (!_internal253Aconstants.DEBUG) {
    return;
  }

  const propertyDescriptor = Object.getOwnPropertyDescriptor(target, propertyKey);

  if (propertyDescriptor && propertyDescriptor.get) {
    const rawGet = propertyDescriptor.get;

    function constGet() {
      const value = rawGet.call(this);
      return value ? Object.freeze(value.clone()) : value;
    }

    propertyDescriptor.get = constGet;
  }

  return propertyDescriptor;
}