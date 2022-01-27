System.register("q-bundled:///fs/cocos/physics/physx/physx-instance.js", ["./physx.null.js"], function (_export, _context) {
  "use strict";

  var PhysXInstance;
  return {
    setters: [function (_physxNullJs) {}],
    execute: function () {
      /**
       * Base class for storage static instance object
       */
      _export("PhysXInstance", PhysXInstance = function PhysXInstance() {});

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
    }
  };
});