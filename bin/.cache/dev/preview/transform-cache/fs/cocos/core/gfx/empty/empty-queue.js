System.register("q-bundled:///fs/cocos/core/gfx/empty/empty-queue.js", ["../base/queue.js"], function (_export, _context) {
  "use strict";

  var Queue, EmptyQueue;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_baseQueueJs) {
      Queue = _baseQueueJs.Queue;
    }],
    execute: function () {
      _export("EmptyQueue", EmptyQueue = /*#__PURE__*/function (_Queue) {
        _inheritsLoose(EmptyQueue, _Queue);

        function EmptyQueue() {
          return _Queue.apply(this, arguments) || this;
        }

        var _proto = EmptyQueue.prototype;

        _proto.initialize = function initialize(info) {
          this._type = info.type;
        };

        _proto.destroy = function destroy() {};

        _proto.submit = function submit(cmdBuffs) {};

        return EmptyQueue;
      }(Queue));
    }
  };
});