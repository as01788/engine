"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkeletonSystem = void 0;

var _director = require("../core/director.js");

var _index = require("../core/components/index.js");

class SkeletonSystem extends _index.System {
  /**
   * @en
   * The ID flag of the system.
   * @zh
   * 此系统的 ID 标记。
   */
  constructor() {
    super();
    this._skeletons = new Set();
  }
  /**
   * @en
   * Gets the instance of the Spine Skeleton system.
   * @zh
   * 获取 Spine 骨骼系统的单例。
   */


  static getInstance() {
    if (!SkeletonSystem._instance) {
      SkeletonSystem._instance = new SkeletonSystem();

      _director.director.registerSystem(SkeletonSystem.ID, SkeletonSystem._instance, _index.System.Priority.HIGH);
    }

    return SkeletonSystem._instance;
  }

  add(skeleton) {
    if (!skeleton) return;

    if (!this._skeletons.has(skeleton)) {
      this._skeletons.add(skeleton);
    }
  }

  remove(skeleton) {
    if (!skeleton) return;

    if (this._skeletons.has(skeleton)) {
      this._skeletons.delete(skeleton);
    }
  }

  postUpdate(dt) {
    if (!this._skeletons) {
      return;
    }

    this._skeletons.forEach(skeleton => {
      skeleton.updateAnimation(dt);
    });
  }

}

exports.SkeletonSystem = SkeletonSystem;
SkeletonSystem.ID = 'SKELETON';
SkeletonSystem._instance = void 0;