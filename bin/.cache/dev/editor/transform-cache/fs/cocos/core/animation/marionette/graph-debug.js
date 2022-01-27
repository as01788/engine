"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pushWeight = pushWeight;
exports.getWeightsStats = getWeightsStats;
exports.clearWeightsStats = clearWeightsStats;
exports.graphDebugGroupEnd = exports.graphDebugGroup = exports.graphDebug = exports.GRAPH_DEBUG_ENABLED = void 0;

var _debug = require("../../platform/debug.js");

const GRAPH_DEBUG_ENABLED = false;
exports.GRAPH_DEBUG_ENABLED = GRAPH_DEBUG_ENABLED;
const graphDebug = GRAPH_DEBUG_ENABLED ? _debug.debug : EMPTY;
exports.graphDebug = graphDebug;
const graphDebugGroup = GRAPH_DEBUG_ENABLED ? console.group : EMPTY;
exports.graphDebugGroup = graphDebugGroup;
const graphDebugGroupEnd = GRAPH_DEBUG_ENABLED ? console.groupEnd : EMPTY;
exports.graphDebugGroupEnd = graphDebugGroupEnd;

function EMPTY(...args) {}

const weightsStats = [];

function pushWeight(name, weight) {
  weightsStats.push([name, weight]);
}

function getWeightsStats() {
  return `[${weightsStats.map(([name, weight]) => `[${name}: ${weight}]`).join('  ')}]`;
}

function clearWeightsStats() {
  weightsStats.length = 0;
}