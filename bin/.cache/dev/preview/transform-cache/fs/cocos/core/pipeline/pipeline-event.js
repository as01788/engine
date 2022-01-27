System.register("q-bundled:///fs/cocos/core/pipeline/pipeline-event.js", ["../event/event-target.js"], function (_export, _context) {
  "use strict";

  var EventTarget, PipelineEventType, PipelineEventProcessor;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  _export("PipelineEventType", void 0);

  return {
    setters: [function (_eventEventTargetJs) {
      EventTarget = _eventEventTargetJs.EventTarget;
    }],
    execute: function () {
      (function (PipelineEventType) {
        PipelineEventType["RENDER_FRAME_BEGIN"] = "render-frame-begin";
        PipelineEventType["RENDER_FRAME_END"] = "render-frame-end";
        PipelineEventType["RENDER_CAMERA_BEGIN"] = "render-camera-begin";
        PipelineEventType["RENDER_CAMERA_END"] = "render-camera-end";
        PipelineEventType["ATTACHMENT_SCALE_CAHNGED"] = "attachment-scale-changed";
      })(PipelineEventType || _export("PipelineEventType", PipelineEventType = {}));

      _export("PipelineEventProcessor", PipelineEventProcessor = /*#__PURE__*/function (_EventTarget) {
        _inheritsLoose(PipelineEventProcessor, _EventTarget);

        function PipelineEventProcessor() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _EventTarget.call.apply(_EventTarget, [this].concat(args)) || this;
          _this.eventTargetOn = _EventTarget.prototype.on;
          _this.eventTargetOnce = _EventTarget.prototype.once;
          return _this;
        }

        var _proto = PipelineEventProcessor.prototype;

        _proto.on = function on(type, callback, target, once) {
          return this.eventTargetOn(type, callback, target, once);
        };

        _proto.once = function once(type, callback, target) {
          return this.eventTargetOnce(type, callback, target);
        };

        return PipelineEventProcessor;
      }(EventTarget));
    }
  };
});