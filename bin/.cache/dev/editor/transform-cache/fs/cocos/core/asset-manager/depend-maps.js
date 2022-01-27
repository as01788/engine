"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onLoadedInvokedMap = exports.nativeDependMap = exports.dependMap = void 0;
const dependMap = new WeakMap();
exports.dependMap = dependMap;
const nativeDependMap = new WeakSet();
exports.nativeDependMap = nativeDependMap;
const onLoadedInvokedMap = new WeakSet();
exports.onLoadedInvokedMap = onLoadedInvokedMap;