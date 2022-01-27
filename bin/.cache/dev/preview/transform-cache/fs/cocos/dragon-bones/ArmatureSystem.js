System.register("q-bundled:///fs/cocos/dragon-bones/ArmatureSystem.js", ["../core/director.js", "../core/components/index.js", "../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var director, System, legacyCC, ArmatureSystem;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_coreDirectorJs) {
      director = _coreDirectorJs.director;
    }, function (_coreComponentsIndexJs) {
      System = _coreComponentsIndexJs.System;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      _export("ArmatureSystem", ArmatureSystem = /*#__PURE__*/function (_System) {
        _inheritsLoose(ArmatureSystem, _System);

        /**
         * @en
         * The ID flag of the system.
         * @zh
         * 此系统的 ID 标记。
         */
        function ArmatureSystem() {
          var _this;

          _this = _System.call(this) || this;
          _this._armatures = new Set();
          return _this;
        }
        /**
         * @en
         * Gets the instance of the ArmatureSystem system.
         * @zh
         * 获取 Dragonbones Armature系统的单例。
         */


        ArmatureSystem.getInstance = function getInstance() {
          if (!ArmatureSystem._instance) {
            ArmatureSystem._instance = new ArmatureSystem();
            director.registerSystem(ArmatureSystem.ID, ArmatureSystem._instance, System.Priority.HIGH);
          }

          return ArmatureSystem._instance;
        };

        var _proto = ArmatureSystem.prototype;

        _proto.add = function add(armature) {
          if (!armature) return;

          if (!this._armatures.has(armature)) {
            this._armatures.add(armature);
          }
        };

        _proto.remove = function remove(armature) {
          if (!armature) return;

          if (this._armatures.has(armature)) {
            this._armatures["delete"](armature);
          }
        };

        _proto.postUpdate = function postUpdate(dt) {
          if (!this._armatures) {
            return;
          }

          this._armatures.forEach(function (armature) {
            armature.updateAnimation(dt);
          });
        };

        return ArmatureSystem;
      }(System));

      ArmatureSystem.ID = 'ARMATURE';
      ArmatureSystem._instance = void 0;
      legacyCC.internal.ArmatureSystem = ArmatureSystem;
    }
  };
});