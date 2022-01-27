System.register("q-bundled:///fs/cocos/core/animation/marionette/graph-debug.js", ["../../platform/debug.js"], function (_export, _context) {
  "use strict";

  var debug, GRAPH_DEBUG_ENABLED, graphDebug, graphDebugGroup, graphDebugGroupEnd, weightsStats;

  function EMPTY() {}

  function pushWeight(name, weight) {
    weightsStats.push([name, weight]);
  }

  function getWeightsStats() {
    return "[" + weightsStats.map(function (_ref) {
      var name = _ref[0],
          weight = _ref[1];
      return "[" + name + ": " + weight + "]";
    }).join('  ') + "]";
  }

  function clearWeightsStats() {
    weightsStats.length = 0;
  }

  _export({
    pushWeight: pushWeight,
    getWeightsStats: getWeightsStats,
    clearWeightsStats: clearWeightsStats
  });

  return {
    setters: [function (_platformDebugJs) {
      debug = _platformDebugJs.debug;
    }],
    execute: function () {
      _export("GRAPH_DEBUG_ENABLED", GRAPH_DEBUG_ENABLED = false);

      _export("graphDebug", graphDebug = GRAPH_DEBUG_ENABLED ? debug : EMPTY);

      _export("graphDebugGroup", graphDebugGroup = GRAPH_DEBUG_ENABLED ? console.group : EMPTY);

      _export("graphDebugGroupEnd", graphDebugGroupEnd = GRAPH_DEBUG_ENABLED ? console.groupEnd : EMPTY);

      weightsStats = [];
    }
  };
});