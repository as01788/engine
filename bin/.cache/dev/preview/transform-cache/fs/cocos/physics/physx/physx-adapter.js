System.register("q-bundled:///fs/cocos/physics/physx/physx-adapter.js", ["./physx.asmjs.js", "../../../../virtual/internal%253Aconstants.js", "../../core/index.js", "../utils/util.js", "../../core/global-exports.js", "../../core/geometry/index.js", "../framework/index.js", "./physx-instance.js", "./physx-enum.js"], function (_export, _context) {
  "use strict";

  var PhysX, BYTEDANCE, DEBUG, EDITOR, TEST, Director, director, Game, game, Quat, Vec3, shrinkPositions, legacyCC, AABB, PhysicsSystem, PhysXInstance, PxHitFlag, PxPairFlag, PxQueryFlag, EFilterDataWord3, PX, globalThis, USE_BYTEDANCE, USE_EXTERNAL_PHYSX, _v3, _v4, _trans, _pxtrans;

  function InitPhysXLibs() {
    if (USE_BYTEDANCE) {
      if (!EDITOR && !TEST) console.info('[PHYSICS]:', "Use PhysX Libs in BYTEDANCE.");
      Object.assign(PX, globalThis.nativePhysX);
      Object.assign(_pxtrans, new PX.Transform(_v3, _v4));
      _pxtrans.setPosition = PX.Transform.prototype.setPosition.bind(_pxtrans);
      _pxtrans.setQuaternion = PX.Transform.prototype.setQuaternion.bind(_pxtrans);
      initConfigAndCacheObject(PX);
    } else {
      if (!EDITOR && !TEST) console.info('[PHYSICS]:', 'Use PhysX js or wasm Libs.');
      initPhysXWithJsModule();
    }
  }

  function initPhysXWithJsModule() {
    // If external PHYSX not given, then try to use internal PhysX libs.
    globalThis.PhysX = globalThis.PHYSX ? globalThis.PHYSX : PhysX;

    if (globalThis.PhysX != null) {
      globalThis.PhysX().then(function (Instance) {
        if (!EDITOR && !TEST) console.info('[PHYSICS]:', (USE_EXTERNAL_PHYSX ? 'External' : 'Internal') + " PhysX libs loaded.");
        initAdaptWrapper(Instance);
        initConfigAndCacheObject(Instance);
        Object.assign(PX, Instance);
      }, function (reason) {
        console.error('[PHYSICS]:', "PhysX load failed: " + reason);
      });
    } else {
      if (!EDITOR) console.error('[PHYSICS]:', 'Not Found PhysX js or wasm Libs.');
    }
  }

  function initConfigAndCacheObject(PX) {
    globalThis.PhysX = PX;
    PX.EPSILON = 1e-3;
    PX.MULTI_THREAD = false;
    PX.SUB_THREAD_COUNT = 1;
    PX.CACHE_MAT = {};
    PX.IMPL_PTR = {};
    PX.MESH_CONVEX = {};
    PX.MESH_STATIC = {};
    PX.TERRAIN_STATIC = {};
  }

  function initAdaptWrapper(obj) {
    obj.VECTOR_MAT = new obj.PxMaterialVector();
    obj.MeshScale = obj.PxMeshScale;
    obj.ShapeFlag = obj.PxShapeFlag;
    obj.ActorFlag = obj.PxActorFlag;
    obj.ForceMode = obj.PxForceMode;
    obj.CombineMode = obj.PxCombineMode;
    obj.BoxGeometry = obj.PxBoxGeometry;
    obj.QueryHitType = obj.PxQueryHitType;
    obj.RigidBodyFlag = obj.PxRigidBodyFlag;
    obj.PlaneGeometry = obj.PxPlaneGeometry;
    obj.SphereGeometry = obj.PxSphereGeometry;
    obj.CapsuleGeometry = obj.PxCapsuleGeometry;
    obj.ConvexMeshGeometry = obj.PxConvexMeshGeometry;
    obj.TriangleMeshGeometry = obj.PxTriangleMeshGeometry;
    obj.RigidDynamicLockFlag = obj.PxRigidDynamicLockFlag;

    obj.createRevoluteJoint = function (a, b, c, d) {
      return obj.PxRevoluteJointCreate(PX.physics, a, b, c, d);
    };

    obj.createDistanceJoint = function (a, b, c, d) {
      return obj.PxDistanceJointCreate(PX.physics, a, b, c, d);
    };
  }

  function addReference(shape, impl) {
    if (!impl) return;

    if (USE_BYTEDANCE) {
      PX.IMPL_PTR[shape.id] = shape;
      impl.setUserData(shape.id);
    } else {
      if (impl.$$) {
        PX.IMPL_PTR[impl.$$.ptr] = shape;
      }
    }
  }

  function removeReference(shape, impl) {
    if (!impl) return;

    if (USE_BYTEDANCE) {
      PX.IMPL_PTR[shape.id] = null;
      delete PX.IMPL_PTR[shape.id];
    } else {
      if (impl.$$) {
        PX.IMPL_PTR[impl.$$.ptr] = null;
        delete PX.IMPL_PTR[impl.$$.ptr];
      }
    }
  }

  function getWrapShape(pxShape) {
    if (USE_BYTEDANCE) {
      return PX.IMPL_PTR[pxShape];
    } else {
      return PX.IMPL_PTR[pxShape.$$.ptr];
    }
  }

  function getTempTransform(pos, quat) {
    if (USE_BYTEDANCE) {
      _pxtrans.setPosition(pos);

      _pxtrans.setQuaternion(quat);
    } else {
      Vec3.copy(_pxtrans.translation, pos);
      Quat.copy(_pxtrans.rotation, quat);
    }

    return _pxtrans;
  }

  function getJsTransform(pos, quat) {
    Vec3.copy(_trans.p, pos);
    Quat.copy(_trans.q, quat);
    return _trans;
  }

  function addActorToScene(scene, actor) {
    if (USE_BYTEDANCE) {
      scene.addActor(actor);
    } else {
      scene.addActor(actor, null);
    }
  }

  function setJointActors(joint, actor0, actor1) {
    if (USE_BYTEDANCE) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      actor1 ? joint.setActors(actor0, actor1) : joint.setActors(actor0);
    } else {
      joint.setActors(actor0, actor1);
    }
  }

  function setMassAndUpdateInertia(impl, mass) {
    if (USE_BYTEDANCE) {
      PX.RigidBodyExt.setMassAndUpdateInertia(impl, mass);
    } else {
      impl.setMassAndUpdateInertia(mass);
    }
  }

  function copyPhysXTransform(node, transform) {
    var wp = node.worldPosition;
    var wr = node.worldRotation;
    var dontUpdate = physXEqualsCocosVec3(transform, wp) && physXEqualsCocosQuat(transform, wr);
    if (dontUpdate) return;

    if (USE_BYTEDANCE) {
      node.setWorldPosition(transform.p);
      node.setWorldRotation(transform.q);
    } else {
      node.setWorldPosition(transform.translation);
      node.setWorldRotation(transform.rotation);
    }
  }

  function physXEqualsCocosVec3(trans, v3) {
    var pos = USE_BYTEDANCE ? trans.p : trans.translation;
    return Vec3.equals(pos, v3, PX.EPSILON);
  }

  function physXEqualsCocosQuat(trans, q) {
    var rot = USE_BYTEDANCE ? trans.q : trans.rotation;
    return Quat.equals(rot, q, PX.EPSILON);
  }

  function applyImpulse(isGlobal, impl, vec, rp) {
    if (isGlobal) {
      if (USE_BYTEDANCE) {
        PX.RigidBodyExt.applyImpulse(impl, vec, rp);
      } else {
        impl.applyImpulse(vec, rp);
      }
    } else if (USE_BYTEDANCE) {
      PX.RigidBodyExt.applyLocalImpulse(impl, vec, rp);
    } else {
      impl.applyLocalImpulse(vec, rp);
    }
  }

  function applyForce(isGlobal, impl, vec, rp) {
    if (isGlobal) {
      if (USE_BYTEDANCE) {
        PX.RigidBodyExt.applyForce(impl, vec, rp);
      } else {
        impl.applyForce(vec, rp);
      }
    } else if (USE_BYTEDANCE) {
      PX.RigidBodyExt.applyLocalForce(impl, vec, rp);
    } else {
      impl.applyLocalForce(vec, rp);
    }
  }

  function applyTorqueForce(impl, vec) {
    if (USE_BYTEDANCE) {
      impl.addTorque(vec, PX.ForceMode.eFORCE, true);
    } else {
      impl.addTorque(vec);
    }
  }

  function getShapeFlags(isTrigger) {
    if (USE_BYTEDANCE) {
      var _flag = (isTrigger ? PX.ShapeFlag.eTRIGGER_SHAPE : PX.ShapeFlag.eSIMULATION_SHAPE) | PX.ShapeFlag.eSCENE_QUERY_SHAPE;

      return _flag;
    }

    var flag = (isTrigger ? PX.PxShapeFlag.eTRIGGER_SHAPE.value : PX.PxShapeFlag.eSIMULATION_SHAPE.value) | PX.PxShapeFlag.eSCENE_QUERY_SHAPE.value;
    return new PX.PxShapeFlags(flag);
  }

  function getShapeWorldBounds(shape, actor, i, out) {
    if (i === void 0) {
      i = 1.01;
    }

    if (USE_BYTEDANCE) {
      var b3 = PX.RigidActorExt.getWorldBounds(shape, actor, i);
      AABB.fromPoints(out, b3.minimum, b3.maximum);
    } else {
      var _b = shape.getWorldBounds(actor, i);

      AABB.fromPoints(out, _b.minimum, _b.maximum);
    }
  }

  function getShapeMaterials(pxMtl) {
    if (USE_BYTEDANCE) {
      return [pxMtl];
    }

    if (PX.VECTOR_MAT.size() > 0) {
      PX.VECTOR_MAT.set(0, pxMtl);
    } else {
      PX.VECTOR_MAT.push_back(pxMtl);
    }

    return PX.VECTOR_MAT;
  }

  function setupCommonCookingParam(params, skipMeshClean, skipEdgedata) {
    if (skipMeshClean === void 0) {
      skipMeshClean = false;
    }

    if (skipEdgedata === void 0) {
      skipEdgedata = false;
    }

    if (!USE_BYTEDANCE) return;
    params.setSuppressTriangleMeshRemapTable(true);

    if (!skipMeshClean) {
      params.setMeshPreprocessParams(params.getMeshPreprocessParams() & ~PX.MeshPreprocessingFlag.eDISABLE_CLEAN_MESH);
    } else {
      params.setMeshPreprocessParams(params.getMeshPreprocessParams() | PX.MeshPreprocessingFlag.eDISABLE_CLEAN_MESH);
    }

    if (skipEdgedata) {
      params.setMeshPreprocessParams(params.getMeshPreprocessParams() & ~PX.MeshPreprocessingFlag.eDISABLE_ACTIVE_EDGES_PRECOMPUTE);
    } else {
      params.setMeshPreprocessParams(params.getMeshPreprocessParams() | PX.MeshPreprocessingFlag.eDISABLE_ACTIVE_EDGES_PRECOMPUTE);
    }
  }

  function createConvexMesh(_buffer, cooking, physics) {
    var vertices = shrinkPositions(_buffer);

    if (USE_BYTEDANCE) {
      var cdesc = new PX.ConvexMeshDesc();
      var verticesF32 = new Float32Array(vertices);
      cdesc.setPointsData(verticesF32);
      cdesc.setPointsCount(verticesF32.length / 3);
      cdesc.setPointsStride(3 * Float32Array.BYTES_PER_ELEMENT);
      cdesc.setConvexFlags(PX.ConvexFlag.eCOMPUTE_CONVEX);
      return cooking.createConvexMesh(cdesc);
    } else {
      var l = vertices.length;
      var vArr = new PX.PxVec3Vector();

      for (var i = 0; i < l; i += 3) {
        vArr.push_back({
          x: vertices[i],
          y: vertices[i + 1],
          z: vertices[i + 2]
        });
      }

      var r = cooking.createConvexMesh(vArr, physics);
      vArr["delete"]();
      return r;
    }
  } // eTIGHT_BOUNDS = (1<<0) convex
  // eDOUBLE_SIDED = (1<<1) trimesh


  function createMeshGeometryFlags(flags, isConvex) {
    if (USE_BYTEDANCE) {
      return flags;
    }

    return isConvex ? new PX.PxConvexMeshGeometryFlags(flags) : new PX.PxMeshGeometryFlags(flags);
  }

  function createTriangleMesh(vertices, indices, cooking, physics) {
    if (USE_BYTEDANCE) {
      var meshDesc = new PX.TriangleMeshDesc();
      meshDesc.setPointsData(vertices); // meshDesc.setPointsCount(vertices.length / 3);
      // meshDesc.setPointsStride(Float32Array.BYTES_PER_ELEMENT * 3);

      var indicesUI32 = new Uint32Array(indices);
      meshDesc.setTrianglesData(indicesUI32); // meshDesc.setTrianglesCount(indicesUI32.length / 3);
      // meshDesc.setTrianglesStride(Uint32Array.BYTES_PER_ELEMENT * 3);

      return cooking.createTriangleMesh(meshDesc);
    } else {
      var l = vertices.length;
      var l2 = indices.length;
      var vArr = new PX.PxVec3Vector();

      for (var i = 0; i < l; i += 3) {
        vArr.push_back({
          x: vertices[i],
          y: vertices[i + 1],
          z: vertices[i + 2]
        });
      }

      var iArr = new PX.PxU16Vector();

      for (var _i = 0; _i < l2; _i += 3) {
        iArr.push_back(indices[_i]);
        iArr.push_back(indices[_i + 1]);
        iArr.push_back(indices[_i + 2]);
      }

      var r = cooking.createTriMeshExt(vArr, iArr, physics);
      vArr["delete"]();
      iArr["delete"]();
      return r;
    }
  }

  function createBV33TriangleMesh(vertices, indices, cooking, physics, skipMeshCleanUp, skipEdgeData, cookingPerformance, meshSizePerfTradeoff, inserted) {
    if (skipMeshCleanUp === void 0) {
      skipMeshCleanUp = false;
    }

    if (skipEdgeData === void 0) {
      skipEdgeData = false;
    }

    if (cookingPerformance === void 0) {
      cookingPerformance = false;
    }

    if (meshSizePerfTradeoff === void 0) {
      meshSizePerfTradeoff = true;
    }

    if (inserted === void 0) {
      inserted = true;
    }

    if (!USE_BYTEDANCE) return;
    var meshDesc = new PX.TriangleMeshDesc();
    meshDesc.setPointsData(vertices);
    meshDesc.setTrianglesData(indices);
    var params = cooking.getParams();
    setupCommonCookingParam(params, skipMeshCleanUp, skipEdgeData);
    var midDesc = new PX.BVH33MidphaseDesc();
    if (cookingPerformance) midDesc.setMeshCookingHint(PX.MeshCookingHint.eCOOKING_PERFORMANCE);else midDesc.setMeshCookingHint(PX.MeshCookingHint.eSIM_PERFORMANCE);
    if (meshSizePerfTradeoff) midDesc.setMeshSizePerformanceTradeOff(0.0);else midDesc.setMeshSizePerformanceTradeOff(0.55);
    params.setMidphaseDesc(midDesc);
    cooking.setParams(params);
    console.info("[PHYSICS]: cook bvh33 status:" + cooking.validateTriangleMesh(meshDesc));
    return cooking.createTriangleMesh(meshDesc);
  }

  function createBV34TriangleMesh(vertices, indices, cooking, physics, skipMeshCleanUp, skipEdgeData, numTrisPerLeaf, inserted) {
    if (skipMeshCleanUp === void 0) {
      skipMeshCleanUp = false;
    }

    if (skipEdgeData === void 0) {
      skipEdgeData = false;
    }

    if (numTrisPerLeaf === void 0) {
      numTrisPerLeaf = true;
    }

    if (inserted === void 0) {
      inserted = true;
    }

    if (!USE_BYTEDANCE) return;
    var meshDesc = new PX.TriangleMeshDesc();
    meshDesc.setPointsData(vertices);
    meshDesc.setTrianglesData(indices);
    var params = cooking.getParams();
    setupCommonCookingParam(params, skipMeshCleanUp, skipEdgeData);
    var midDesc = new PX.BVH34MidphaseDesc();
    midDesc.setNumPrimsLeaf(numTrisPerLeaf);
    params.setMidphaseDesc(midDesc);
    cooking.setParams(params);
    console.info("[PHYSICS]: cook bvh34 status:" + cooking.validateTriangleMesh(meshDesc));
    return cooking.createTriangleMesh(meshDesc);
  }

  function createHeightField(terrain, heightScale, cooking, physics) {
    var sizeI = terrain.getVertexCountI();
    var sizeJ = terrain.getVertexCountJ();

    if (USE_BYTEDANCE) {
      var _samples = new PX.HeightFieldSamples(sizeI * sizeJ);

      for (var i = 0; i < sizeI; i++) {
        for (var j = 0; j < sizeJ; j++) {
          var s = terrain.getHeight(i, j) / heightScale;
          var index = j + i * sizeJ;

          _samples.setHeightAtIndex(index, s); // samples.setMaterialIndex0AtIndex(index, 0);
          // samples.setMaterialIndex1AtIndex(index, 0);

        }
      }

      var hfdesc = new PX.HeightFieldDesc();
      hfdesc.setNbRows(sizeJ);
      hfdesc.setNbColumns(sizeI);
      hfdesc.setSamples(_samples);
      return cooking.createHeightField(hfdesc);
    }

    var samples = new PX.PxHeightFieldSampleVector();

    for (var _i2 = 0; _i2 < sizeI; _i2++) {
      for (var _j = 0; _j < sizeJ; _j++) {
        var _s = new PX.PxHeightFieldSample();

        _s.height = terrain.getHeight(_i2, _j) / heightScale;
        samples.push_back(_s);
      }
    }

    return cooking.createHeightFieldExt(sizeI, sizeJ, samples, physics);
  }

  function createHeightFieldGeometry(hf, flags, hs, xs, zs) {
    if (USE_BYTEDANCE) {
      return new PX.HeightFieldGeometry(hf, hs, xs, zs);
    }

    return new PX.PxHeightFieldGeometry(hf, new PX.PxMeshGeometryFlags(flags), hs, xs, zs);
  }

  function simulateScene(scene, deltaTime) {
    if (USE_BYTEDANCE) {
      scene.simulate(deltaTime);
    } else {
      scene.simulate(deltaTime, true);
    }
  }

  function raycastAll(world, worldRay, options, pool, results) {
    var maxDistance = options.maxDistance;
    var flags = PxHitFlag.ePOSITION | PxHitFlag.eNORMAL;
    var word3 = EFilterDataWord3.QUERY_FILTER | (options.queryTrigger ? 0 : EFilterDataWord3.QUERY_CHECK_TRIGGER);
    var queryFlags = PxQueryFlag.eSTATIC | PxQueryFlag.eDYNAMIC | PxQueryFlag.ePREFILTER | PxQueryFlag.eNO_BLOCK;
    var queryfilterData = PhysXInstance.queryfilterData;
    var queryFilterCB = PhysXInstance.queryFilterCB;
    var mutipleResults = PhysXInstance.mutipleResults;
    var mutipleResultSize = PhysXInstance.mutipleResultSize;

    if (USE_BYTEDANCE) {
      queryfilterData.data.word3 = word3;
      queryfilterData.data.word0 = options.mask >>> 0;
      queryfilterData.flags = queryFlags;
      var r = PX.SceneQueryExt.raycastMultiple(world.scene, worldRay.o, worldRay.d, maxDistance, flags, mutipleResultSize, queryfilterData, queryFilterCB);

      if (r) {
        for (var i = 0; i < r.length; i++) {
          var block = r[i];
          var collider = getWrapShape(block.shapeData).collider;
          var result = pool.add();

          result._assign(block.position, block.distance, collider, block.normal);

          results.push(result);
        }

        return true;
      }
    } else {
      queryfilterData.setWords(options.mask >>> 0, 0);
      queryfilterData.setWords(word3, 3);
      queryfilterData.setFlags(queryFlags);
      var blocks = mutipleResults;

      var _r = world.scene.raycastMultiple(worldRay.o, worldRay.d, maxDistance, flags, blocks, blocks.size(), queryfilterData, queryFilterCB, null);

      if (_r > 0) {
        for (var _i3 = 0; _i3 < _r; _i3++) {
          var _block = blocks.get(_i3);

          var _collider = getWrapShape(_block.getShape()).collider;

          var _result = pool.add();

          _result._assign(_block.position, _block.distance, _collider, _block.normal);

          results.push(_result);
        }

        return true;
      }

      if (_r === -1) {
        // eslint-disable-next-line no-console
        console.error('not enough memory.');
      }
    }

    return false;
  }

  function raycastClosest(world, worldRay, options, result) {
    var maxDistance = options.maxDistance;
    var flags = PxHitFlag.ePOSITION | PxHitFlag.eNORMAL;
    var word3 = EFilterDataWord3.QUERY_FILTER | (options.queryTrigger ? 0 : EFilterDataWord3.QUERY_CHECK_TRIGGER) | EFilterDataWord3.QUERY_SINGLE_HIT;
    var queryFlags = PxQueryFlag.eSTATIC | PxQueryFlag.eDYNAMIC | PxQueryFlag.ePREFILTER;
    var queryfilterData = PhysXInstance.queryfilterData;
    var queryFilterCB = PhysXInstance.queryFilterCB;

    if (USE_BYTEDANCE) {
      queryfilterData.data.word3 = word3;
      queryfilterData.data.word0 = options.mask >>> 0;
      queryfilterData.flags = queryFlags;
      var block = PX.SceneQueryExt.raycastSingle(world.scene, worldRay.o, worldRay.d, maxDistance, flags, queryfilterData, queryFilterCB);

      if (block) {
        var collider = getWrapShape(block.shapeData).collider;

        result._assign(block.position, block.distance, collider, block.normal);

        return true;
      }
    } else {
      queryfilterData.setWords(options.mask >>> 0, 0);
      queryfilterData.setWords(word3, 3);
      queryfilterData.setFlags(queryFlags);
      var _block2 = PhysXInstance.singleResult;
      var r = world.scene.raycastSingle(worldRay.o, worldRay.d, options.maxDistance, flags, _block2, queryfilterData, queryFilterCB, null);

      if (r) {
        var _collider2 = getWrapShape(_block2.getShape()).collider;

        result._assign(_block2.position, _block2.distance, _collider2, _block2.normal);

        return true;
      }
    }

    return false;
  }

  function initializeWorld(world) {
    if (USE_BYTEDANCE) {
      // construct PhysX instance object only once
      if (!PhysXInstance.physics) {
        // const physics = PX.createPhysics();
        PhysXInstance.physics = PX.physics; // Bytedance have internal physics instance

        PhysXInstance.cooking = PX.createCooking(new PX.CookingParams());
        PhysXInstance.queryFilterCB = new PX.QueryFilterCallback();
        PhysXInstance.queryFilterCB.setPreFilter(world.callback.queryCallback.preFilterForByteDance);
        PhysXInstance.queryfilterData = {
          data: {
            word0: 0,
            word1: 0,
            word2: 0,
            word3: 1
          },
          flags: 0
        };
      }

      initConfigForByteDance();
      hackForMultiThread();
      var sceneDesc = PhysXInstance.physics.createSceneDesc();

      if (PX.MULTI_THREAD) {
        var mstc = sceneDesc.getMaxSubThreadCount();
        var count = PX.SUB_THREAD_COUNT > mstc ? mstc : PX.SUB_THREAD_COUNT;
        sceneDesc.setSubThreadCount(count);
        console.info('[PHYSICS][PhysX]:', "use muti-thread mode, sub thread count: " + count + ", max count: " + mstc);
      } else {
        console.info('[PHYSICS][PhysX]:', 'use single-thread mode');
      }

      sceneDesc.setFlag(PX.SceneFlag.eENABLE_PCM, true);
      sceneDesc.setFlag(PX.SceneFlag.eENABLE_CCD, true);
      var scene = PhysXInstance.physics.createScene(sceneDesc);
      scene.setNeedOnContact(true);
      scene.setNeedOnTrigger(true);
      world.scene = scene;
    } else {
      // construct PhysX instance object only once
      if (!PhysXInstance.foundation) {
        var version = PX.PX_PHYSICS_VERSION;
        var allocator = new PX.PxDefaultAllocator();
        var defaultErrorCallback = new PX.PxDefaultErrorCallback();
        var foundation = PhysXInstance.foundation = PX.PxCreateFoundation(version, allocator, defaultErrorCallback);

        if (DEBUG) {
          PhysXInstance.pvd = PX.PxCreatePvd(foundation);
        } else {
          PhysXInstance.pvd = null;
        }

        var scale = new PX.PxTolerancesScale();
        PhysXInstance.physics = PX.physics = PX.PxCreatePhysics(version, foundation, scale, false, PhysXInstance.pvd);
        PhysXInstance.cooking = PX.PxCreateCooking(version, foundation, new PX.PxCookingParams(scale));
        PX.PxInitExtensions(PhysXInstance.physics, PhysXInstance.pvd);
        PhysXInstance.singleResult = new PX.PxRaycastHit();
        PhysXInstance.mutipleResults = new PX.PxRaycastHitVector();
        PhysXInstance.mutipleResults.resize(PhysXInstance.mutipleResultSize, PhysXInstance.singleResult);
        PhysXInstance.queryfilterData = new PX.PxQueryFilterData();
        PhysXInstance.simulationCB = PX.PxSimulationEventCallback.implement(world.callback.eventCallback);
        PhysXInstance.queryFilterCB = PX.PxQueryFilterCallback.implement(world.callback.queryCallback);
      }

      var _sceneDesc = PX.getDefaultSceneDesc(PhysXInstance.physics.getTolerancesScale(), 0, PhysXInstance.simulationCB);

      world.scene = PhysXInstance.physics.createScene(_sceneDesc);
    }
  }
  /**
   * f32 x3 position.x,position.y,position.z,
   * f32 x3 normal.x,normal.y,normal.z,
   * f32 x3 impulse.x,impulse.y,impulse.z,
   * f32 separation,
   * totoal = 40
   * ui32 internalFaceIndex0,
   * ui32 internalFaceIndex1,
   * totoal = 48
   */


  function getContactPosition(pxContactOrOffset, out, buf) {
    if (USE_BYTEDANCE) {
      Vec3.fromArray(out, new Float32Array(buf, pxContactOrOffset, 3));
    } else {
      Vec3.copy(out, pxContactOrOffset.position);
    }
  }

  function getContactNormal(pxContactOrOffset, out, buf) {
    if (USE_BYTEDANCE) {
      Vec3.fromArray(out, new Float32Array(buf, pxContactOrOffset + 12, 3));
    } else {
      Vec3.copy(out, pxContactOrOffset.normal);
    }
  }

  function getContactDataOrByteOffset(index, offset) {
    if (USE_BYTEDANCE) {
      return index * 40 + offset;
    } else {
      var gc = PX.getGContacts();
      var data = gc.get(index + offset);
      gc["delete"]();
      return data;
    }
  }

  function gatherEvents(world) {
    if (USE_BYTEDANCE) {
      // contact
      var contactBuf = world.scene.getContactData();

      if (contactBuf && contactBuf.byteLength > 0) {
        var uint32view = new Uint32Array(contactBuf);
        var pairCount = uint32view[0];
        /**
         * struct ContactPair{
         *      u32 shapeUserData0;
         *      u32 shapeUserData1;
         *      u32 events;
         *      u32 contactCount;
         * };
         * Total byte length = 16
         */

        var contactPointBufferBegin = pairCount * 16 + 4;
        var contactPointByteOffset = contactPointBufferBegin;

        for (var i = 0; i < pairCount; i++) {
          var offset = i * 4 + 1;
          var shape0 = PX.IMPL_PTR[uint32view[offset]];
          var shape1 = PX.IMPL_PTR[uint32view[offset + 1]];
          var events = uint32view[offset + 2];
          var contactCount = uint32view[offset + 3];

          if (events & PxPairFlag.eNOTIFY_TOUCH_PERSISTS) {
            world.callback.onCollision('onCollisionStay', shape0, shape1, contactCount, contactBuf, contactPointByteOffset);
          } else if (events & PxPairFlag.eNOTIFY_TOUCH_FOUND) {
            world.callback.onCollision('onCollisionEnter', shape0, shape1, contactCount, contactBuf, contactPointByteOffset);
          } else if (events & PxPairFlag.eNOTIFY_TOUCH_LOST) {
            world.callback.onCollision('onCollisionExit', shape0, shape1, contactCount, contactBuf, contactPointByteOffset);
          }
          /**
           * struct ContactPairPoint{
           *      PxVec3 position;
           *      PxVec3 normal;
           *      PxVec3 impulse;
           *      float separation;
           * };
           * Total byte length = 40
           */


          contactPointByteOffset += 40 * contactCount;
        }
      } // trigger


      var triggerBuf = world.scene.getTriggerData();

      if (triggerBuf && triggerBuf.byteLength > 0) {
        /**
         * struct TriggerPair {
         *      u32 shapeUserData0;
         *      u32 shapeUserData1;
         *      u32 status;
         * };
         * Total byte length = 12
         */
        var _uint32view = new Uint32Array(triggerBuf);

        var _pairCount = _uint32view.length / 3;

        for (var _i4 = 0; _i4 < _pairCount; _i4++) {
          var begin = _i4 * 3;
          var _shape = PX.IMPL_PTR[_uint32view[begin]];
          var _shape2 = PX.IMPL_PTR[_uint32view[begin + 1]];
          var _events = _uint32view[begin + 2];

          if (_events & PxPairFlag.eNOTIFY_TOUCH_FOUND) {
            world.callback.onTrigger('onTriggerEnter', _shape, _shape2, true);
          } else if (_events & PxPairFlag.eNOTIFY_TOUCH_LOST) {
            world.callback.onTrigger('onTriggerExit', _shape, _shape2, false);
          }
        }
      }
    }
  }

  function syncNoneStaticToSceneIfWaking(actor, node) {
    if (USE_BYTEDANCE) {
      var transform = actor.getGlobalPoseIfWaking();
      if (!transform) return;
      copyPhysXTransform(node, transform);
    } else {
      if (actor.isSleeping()) return;
      copyPhysXTransform(node, actor.getGlobalPose());
    }
  }
  /**
   * Extension config for bytedance
   */


  function initConfigForByteDance() {
    if (game.config.physics && game.config.physics.physX) {
      var settings = game.config.physics.physX;
      PX.EPSILON = settings.epsilon;
      PX.MULTI_THREAD = settings.multiThread;
      PX.SUB_THREAD_COUNT = settings.subThreadCount;
    }
  } // hack for multi thread mode, should be refactor in future


  function hackForMultiThread() {
    if (USE_BYTEDANCE && PX.MULTI_THREAD) {
      // eslint-disable-next-line no-inner-declarations
      var lastUpdate = function lastUpdate(sys) {
        if (!sys._enable) return;

        if (sys._autoSimulation) {
          var yieldTime = performance.now() - sys._mutiThreadYield;

          sys.physicsWorld.syncPhysicsToScene();
          sys.physicsWorld.emitEvents();

          if (legacyCC.profiler && legacyCC.profiler._stats) {
            legacyCC.profiler._stats.physics.counter._time += yieldTime;
          }

          director.emit(Director.EVENT_AFTER_PHYSICS);
        }
      };

      PhysicsSystem.prototype.postUpdate = function postUpdate(deltaTime) {
        var sys = this;

        if (!sys._enable) {
          sys.physicsWorld.syncSceneToPhysics();
          return;
        }

        if (sys._autoSimulation) {
          director.emit(Director.EVENT_BEFORE_PHYSICS);
          sys._accumulator += deltaTime;
          sys._subStepCount = 1;
          sys.physicsWorld.syncSceneToPhysics();
          sys.physicsWorld.step(sys._fixedTimeStep);
          sys._accumulator -= sys._fixedTimeStep;
          sys._mutiThreadYield = performance.now();
        }
      };

      director.on(Director.EVENT_END_FRAME, function () {
        if (!director.isPaused()) {
          lastUpdate(PhysicsSystem.instance);
        }
      });
    }
  }

  _export({
    addReference: addReference,
    removeReference: removeReference,
    getWrapShape: getWrapShape,
    getTempTransform: getTempTransform,
    getJsTransform: getJsTransform,
    addActorToScene: addActorToScene,
    setJointActors: setJointActors,
    setMassAndUpdateInertia: setMassAndUpdateInertia,
    copyPhysXTransform: copyPhysXTransform,
    physXEqualsCocosVec3: physXEqualsCocosVec3,
    physXEqualsCocosQuat: physXEqualsCocosQuat,
    applyImpulse: applyImpulse,
    applyForce: applyForce,
    applyTorqueForce: applyTorqueForce,
    getShapeFlags: getShapeFlags,
    getShapeWorldBounds: getShapeWorldBounds,
    getShapeMaterials: getShapeMaterials,
    setupCommonCookingParam: setupCommonCookingParam,
    createConvexMesh: createConvexMesh,
    createMeshGeometryFlags: createMeshGeometryFlags,
    createTriangleMesh: createTriangleMesh,
    createBV33TriangleMesh: createBV33TriangleMesh,
    createBV34TriangleMesh: createBV34TriangleMesh,
    createHeightField: createHeightField,
    createHeightFieldGeometry: createHeightFieldGeometry,
    simulateScene: simulateScene,
    raycastAll: raycastAll,
    raycastClosest: raycastClosest,
    initializeWorld: initializeWorld,
    getContactPosition: getContactPosition,
    getContactNormal: getContactNormal,
    getContactDataOrByteOffset: getContactDataOrByteOffset,
    gatherEvents: gatherEvents,
    syncNoneStaticToSceneIfWaking: syncNoneStaticToSceneIfWaking
  });

  return {
    setters: [function (_physxAsmjsJs) {
      PhysX = _physxAsmjsJs.PhysX;
    }, function (_virtualInternal253AconstantsJs) {
      BYTEDANCE = _virtualInternal253AconstantsJs.BYTEDANCE;
      DEBUG = _virtualInternal253AconstantsJs.DEBUG;
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      TEST = _virtualInternal253AconstantsJs.TEST;
    }, function (_coreIndexJs) {
      Director = _coreIndexJs.Director;
      director = _coreIndexJs.director;
      Game = _coreIndexJs.Game;
      game = _coreIndexJs.game;
      Quat = _coreIndexJs.Quat;
      Vec3 = _coreIndexJs.Vec3;
    }, function (_utilsUtilJs) {
      shrinkPositions = _utilsUtilJs.shrinkPositions;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_coreGeometryIndexJs) {
      AABB = _coreGeometryIndexJs.AABB;
    }, function (_frameworkIndexJs) {
      PhysicsSystem = _frameworkIndexJs.PhysicsSystem;
    }, function (_physxInstanceJs) {
      PhysXInstance = _physxInstanceJs.PhysXInstance;
    }, function (_physxEnumJs) {
      PxHitFlag = _physxEnumJs.PxHitFlag;
      PxPairFlag = _physxEnumJs.PxPairFlag;
      PxQueryFlag = _physxEnumJs.PxQueryFlag;
      EFilterDataWord3 = _physxEnumJs.EFilterDataWord3;
    }],
    execute: function () {
      /*
       Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.
      
       https://www.cocos.com/
      
       Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated engine source code (the "Software"), a limited,
       worldwide, royalty-free, non-assignable, revocable and non-exclusive license
       to use Cocos Creator solely to develop games on your target platforms. You shall
       not use Cocos Creator software for developing other software or tools that's
       used for developing games. You are not granted to publish, distribute,
       sublicense, and/or sell copies of Cocos Creator.
      
       The software or tools in this License Agreement are licensed, not sold.
       Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.
      
       THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
       */

      /**
       * @packageDocumentation
       * @hidden
       */

      /* eslint-disable import/no-mutable-exports */

      /* eslint-disable no-console */

      /* eslint-disable @typescript-eslint/restrict-template-expressions */

      /* eslint-disable consistent-return */

      /* eslint-disable @typescript-eslint/no-unsafe-return */

      /* eslint-disable no-lonely-if */

      /* eslint-disable import/order */
      _export("PX", PX = {});

      globalThis = legacyCC._global; // Use bytedance native or js physics if nativePhysX is not null.

      USE_BYTEDANCE = BYTEDANCE && globalThis.nativePhysX;
      USE_EXTERNAL_PHYSX = !!globalThis.PHYSX; // Init physx libs when engine init.

      game.once(Game.EVENT_ENGINE_INITED, InitPhysXLibs);
      _v3 = {
        x: 0,
        y: 0,
        z: 0
      };
      _v4 = {
        x: 0,
        y: 0,
        z: 0,
        w: 1
      };

      _export("_trans", _trans = {
        translation: _v3,
        rotation: _v4,
        p: _v3,
        q: _v4
      });

      _export("_pxtrans", _pxtrans = _trans);
    }
  };
});