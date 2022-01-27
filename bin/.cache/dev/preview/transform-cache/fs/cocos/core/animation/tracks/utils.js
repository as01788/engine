System.register("q-bundled:///fs/cocos/core/animation/tracks/utils.js", [], function (_export, _context) {
  "use strict";

  function maskIfEmpty(curve) {
    return curve.keyFramesCount === 0 ? undefined : curve;
  }

  _export("maskIfEmpty", maskIfEmpty);

  return {
    setters: [],
    execute: function () {}
  };
});