"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArmatureSystem = void 0;

var _director = require("../core/director.js");

var _index = require("../core/components/index.js");

var _globalExports = require("../core/global-exports.js");

class ArmatureSystem extends _index.System {
  /**
   * @en
   * The ID flag of the system.
   * @zh
   * 此系统的 ID 标记。
   */
  constructor() {
    super();
    this._armatures = new Set();
  }
  /**
   * @en
   * Gets the instance of the ArmatureSystem system.
   * @zh
   * 获取 Dragonbones Armature系统的单例。
   */


  static getInstance() {
    if (!ArmatureSystem._instance) {
      ArmatureSystem._instance = new ArmatureSystem();

      _director.director.registerSystem(ArmatureSystem.ID, ArmatureSystem._instance, _index.System.Priority.HIGH);
    }

    return ArmatureSystem._instance;
  }

  add(armature) {
    if (!armature) return;

    if (!this._armatures.has(armature)) {
      this._armatures.add(armature);
    }
  }

  remove(armature) {
    if (!armature) return;

    if (this._armatures.has(armature)) {
      this._armatures.delete(armature);
    }
  }

  postUpdate(dt) {
    if (!this._armatures) {
      return;
    }

    this._armatures.forEach(armature => {
      armature.updateAnimation(dt);
    });
  }

}

exports.ArmatureSystem = ArmatureSystem;
ArmatureSystem.ID = 'ARMATURE';
ArmatureSystem._instance = void 0;
_globalExports.legacyCC.internal.ArmatureSystem = ArmatureSystem;