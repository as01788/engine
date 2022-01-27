System.register("q-bundled:///fs/cocos/core/gfx/base/queue.js", ["./define.js"], function (_export, _context) {
  "use strict";

  var GFXObject, ObjectType, QueueType, Queue;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_defineJs) {
      GFXObject = _defineJs.GFXObject;
      ObjectType = _defineJs.ObjectType;
      QueueType = _defineJs.QueueType;
    }],
    execute: function () {
      /**
       * @en GFX Queue.
       * @zh GFX 队列。
       */
      _export("Queue", Queue = /*#__PURE__*/function (_GFXObject) {
        _inheritsLoose(Queue, _GFXObject);

        function Queue() {
          var _this;

          _this = _GFXObject.call(this, ObjectType.QUEUE) || this;
          _this._type = QueueType.GRAPHICS;
          return _this;
        }

        _createClass(Queue, [{
          key: "type",
          get:
          /**
           * @en Get current type.
           * @zh 队列类型。
           */
          function get() {
            return this._type;
          }
        }]);

        return Queue;
      }(GFXObject));
    }
  };
});