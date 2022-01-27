"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GCObject = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _index = require("./decorators/index.js");

var _garbageCollection = require("./garbage-collection.js");

var _object = require("./object.js");

var _dec, _class;

let GCObject = (_dec = (0, _index.ccclass)('cc.GCObject'), _dec(_class = class GCObject extends _object.CCObject {
  constructor(...arg) {
    super(...arg);
    return _garbageCollection.garbageCollectionManager.registerGCObject(this);
  }

  equals(gcObject) {
    if (!gcObject) {
      return false;
    }

    if (_internal253Aconstants.EDITOR) {
      return gcObject._finalizationToken === this._finalizationToken;
    } else {
      return gcObject === this;
    }
  }

  destroy() {
    _garbageCollection.garbageCollectionManager.unregisterGCObject(this);

    return super.destroy();
  }

}) || _class);
exports.GCObject = GCObject;