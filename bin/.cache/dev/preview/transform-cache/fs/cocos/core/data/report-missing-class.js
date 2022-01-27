System.register("q-bundled:///fs/cocos/core/data/report-missing-class.js", ["../../../../virtual/internal%253Aconstants.js", "../platform/debug.js"], function (_export, _context) {
  "use strict";

  var EDITOR, errorID;

  function reportMissingClass(id) {
    if (EDITOR && EditorExtends.UuidUtils.isUuid(id)) {
      id = EditorExtends.UuidUtils.decompressUuid(id);
      errorID(5301, id);
    } else {
      errorID(5302, id);
    }
  }

  _export("reportMissingClass", reportMissingClass);

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_platformDebugJs) {
      errorID = _platformDebugJs.errorID;
    }],
    execute: function () {}
  };
});