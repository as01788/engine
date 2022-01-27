"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _js = require("../utils/js.js");

class WeakCache {
  constructor(map) {
    this._weakMap = {};
    if (typeof window.WeakRef === 'undefined') throw new Error('this platform does not support WeakRef!');

    if (map) {
      for (const key in map) {
        this._weakMap[key] = new WeakRef(map[key]);
      }
    }
  }

  add(key, val) {
    this._weakMap[key] = new WeakRef(val);
    return val;
  }

  has(key) {
    return key in this._weakMap && !!this._weakMap[key].deref();
  }

  get(key) {
    return this._weakMap[key] && this._weakMap[key].deref();
  }

  remove(key) {
    const out = this._weakMap[key];
    delete this._weakMap[key];
    return out && out.deref();
  }

  clear() {
    this._weakMap = _js.js.createMap(true);
  }

  forEach(func) {
    for (const key in this._weakMap) {
      const val = this.get(key);

      if (val) {
        func(val, key);
      }
    }
  }

  find(predicate) {
    for (const key in this._weakMap) {
      const val = this.get(key);

      if (val && predicate(val, key)) {
        return this._weakMap[key].deref();
      }
    }

    return null;
  }

  get count() {
    return Object.values(this._weakMap).filter(weakRef => weakRef.deref()).length;
  }

  destroy() {
    this._weakMap = {};
  }

}

exports.default = WeakCache;