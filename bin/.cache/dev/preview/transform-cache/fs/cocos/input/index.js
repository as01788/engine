System.register("q-bundled:///fs/cocos/input/index.js", ["./deprecated.js", "./input.js", "./system-event.js"], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_deprecatedJs) {}, function (_inputJs) {
      _export({
        input: _inputJs.input,
        Input: _inputJs.Input
      });
    }, function (_systemEventJs) {
      var _exportObj = {};

      for (var _key in _systemEventJs) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _systemEventJs[_key];
      }

      _export(_exportObj);
    }],
    execute: function () {}
  };
});