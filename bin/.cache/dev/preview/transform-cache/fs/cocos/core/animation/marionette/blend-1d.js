System.register("q-bundled:///fs/cocos/core/animation/marionette/blend-1d.js", [], function (_export, _context) {
  "use strict";

  function blend1D(weights, thresholds, value) {
    weights.fill(0.0);

    if (thresholds.length === 0) {// Do nothing
    } else if (value <= thresholds[0]) {
      weights[0] = 1;
    } else if (value >= thresholds[thresholds.length - 1]) {
      weights[weights.length - 1] = 1;
    } else {
      var iUpper = 0;

      for (var iThresholds = 1; iThresholds < thresholds.length; ++iThresholds) {
        if (thresholds[iThresholds] > value) {
          iUpper = iThresholds;
          break;
        }
      }

      var lower = thresholds[iUpper - 1];
      var upper = thresholds[iUpper];
      var dVal = upper - lower;
      weights[iUpper - 1] = (upper - value) / dVal;
      weights[iUpper] = (value - lower) / dVal;
    }
  }

  _export("blend1D", blend1D);

  return {
    setters: [],
    execute: function () {}
  };
});