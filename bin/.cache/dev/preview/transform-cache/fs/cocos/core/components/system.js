System.register("q-bundled:///fs/cocos/core/components/system.js", ["../value-types/enum.js"], function (_export, _context) {
  "use strict";

  var Enum, System;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_valueTypesEnumJs) {
      Enum = _valueTypesEnumJs.Enum;
    }],
    execute: function () {
      /**
       * @en Base class for all functional system managed by [[Director]].
       * @zh 功能系统的基类，由 [[Director]] 管理。
       */
      _export("default", System = /*#__PURE__*/function () {
        function System() {
          this._id = '';
          this._priority = 0;
          this._executeInEditMode = false;
        }

        /**
         * @en Sorting between different systems.
         * @zh 不同系统间排序。
         * @param a System a
         * @param b System b
         */
        System.sortByPriority = function sortByPriority(a, b) {
          if (a._priority < b._priority) {
            return 1;
          } else if (a._priority > b.priority) {
            return -1;
          } else {
            return 0;
          }
        }
        /**
         * @en Init the system, will be invoked by [[Director]] when registered, should be implemented if needed.
         * @zh 系统初始化函数，会在注册时被 [[Director]] 调用，如果需要的话应该由子类实现
         */
        ;

        var _proto = System.prototype;

        _proto.init = function init() {}
        /**
         * @en Update function of the system, it will be invoked between all components update phase and late update phase.
         * @zh 系统的帧更新函数，它会在所有组件的 update 和 lateUpdate 之间被调用
         * @param dt Delta time after the last frame
         */
        ;

        _proto.update = function update(dt) {}
        /**
         * @en Post update function of the system, it will be invoked after all components late update phase and before the rendering process.
         * @zh 系统的帧后处理函数，它会在所有组件的 lateUpdate 之后以及渲染之前被调用
         * @param dt Delta time after the last frame
         */
        ;

        _proto.postUpdate = function postUpdate(dt) {};

        _createClass(System, [{
          key: "priority",
          get: function get() {
            return this._priority;
          },
          set: function set(value) {
            this._priority = value;
          }
        }, {
          key: "id",
          get: function get() {
            return this._id;
          },
          set: function set(id) {
            this._id = id;
          }
        }]);

        return System;
      }());

      System.Priority = Enum({
        LOW: 0,
        MEDIUM: 100,
        HIGH: 200,
        SCHEDULER: 1 << 31 >>> 0
      });
    }
  };
});