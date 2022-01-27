System.register("q-bundled:///fs/cocos/core/asset-manager/depend-maps.js", [], function (_export, _context) {
  "use strict";

  var dependMap, nativeDependMap, onLoadedInvokedMap;
  return {
    setters: [],
    execute: function () {
      _export("dependMap", dependMap = new WeakMap());

      _export("nativeDependMap", nativeDependMap = new WeakSet());

      _export("onLoadedInvokedMap", onLoadedInvokedMap = new WeakSet());
    }
  };
});