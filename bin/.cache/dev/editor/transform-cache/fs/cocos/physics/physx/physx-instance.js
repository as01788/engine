"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhysXInstance = void 0;

require("./physx.null.js");

/**
 * Base class for storage static instance object
 */
class PhysXInstance {}

exports.PhysXInstance = PhysXInstance;
PhysXInstance.foundation = void 0;
PhysXInstance.physics = void 0;
PhysXInstance.cooking = void 0;
PhysXInstance.pvd = void 0;
PhysXInstance.queryfilterData = void 0;
PhysXInstance.singleResult = void 0;
PhysXInstance.mutipleResults = void 0;
PhysXInstance.simulationCB = void 0;
PhysXInstance.queryFilterCB = void 0;
PhysXInstance.mutipleResultSize = 12;