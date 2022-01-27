System.register("q-bundled:///fs/cocos/physics/bullet/instantiate.js", ["../../core/index.js", "../framework/physics-selector.js", "./bullet-rigid-body.js", "./bullet-world.js", "./shapes/bullet-box-shape.js", "./shapes/bullet-sphere-shape.js", "./shapes/bullet-capsule-shape.js", "./shapes/bullet-trimesh-shape.js", "./shapes/bullet-cylinder-shape.js", "./shapes/bullet-cone-shape.js", "./shapes/bullet-terrain-shape.js", "./shapes/bullet-simplex-shape.js", "./shapes/bullet-plane-shape.js", "./constraints/bullet-p2p-constraint.js", "./constraints/bullet-hinge-constraint.js"], function (_export, _context) {
  "use strict";

  var Game, game, selector, BulletRigidBody, BulletWorld, BulletBoxShape, BulletSphereShape, BulletCapsuleShape, BulletTrimeshShape, BulletCylinderShape, BulletConeShape, BulletTerrainShape, BulletSimplexShape, BulletPlaneShape, BulletP2PConstraint, BulletHingeConstraint;
  return {
    setters: [function (_coreIndexJs) {
      Game = _coreIndexJs.Game;
      game = _coreIndexJs.game;
    }, function (_frameworkPhysicsSelectorJs) {
      selector = _frameworkPhysicsSelectorJs.selector;
    }, function (_bulletRigidBodyJs) {
      BulletRigidBody = _bulletRigidBodyJs.BulletRigidBody;
    }, function (_bulletWorldJs) {
      BulletWorld = _bulletWorldJs.BulletWorld;
    }, function (_shapesBulletBoxShapeJs) {
      BulletBoxShape = _shapesBulletBoxShapeJs.BulletBoxShape;
    }, function (_shapesBulletSphereShapeJs) {
      BulletSphereShape = _shapesBulletSphereShapeJs.BulletSphereShape;
    }, function (_shapesBulletCapsuleShapeJs) {
      BulletCapsuleShape = _shapesBulletCapsuleShapeJs.BulletCapsuleShape;
    }, function (_shapesBulletTrimeshShapeJs) {
      BulletTrimeshShape = _shapesBulletTrimeshShapeJs.BulletTrimeshShape;
    }, function (_shapesBulletCylinderShapeJs) {
      BulletCylinderShape = _shapesBulletCylinderShapeJs.BulletCylinderShape;
    }, function (_shapesBulletConeShapeJs) {
      BulletConeShape = _shapesBulletConeShapeJs.BulletConeShape;
    }, function (_shapesBulletTerrainShapeJs) {
      BulletTerrainShape = _shapesBulletTerrainShapeJs.BulletTerrainShape;
    }, function (_shapesBulletSimplexShapeJs) {
      BulletSimplexShape = _shapesBulletSimplexShapeJs.BulletSimplexShape;
    }, function (_shapesBulletPlaneShapeJs) {
      BulletPlaneShape = _shapesBulletPlaneShapeJs.BulletPlaneShape;
    }, function (_constraintsBulletP2pConstraintJs) {
      BulletP2PConstraint = _constraintsBulletP2pConstraintJs.BulletP2PConstraint;
    }, function (_constraintsBulletHingeConstraintJs) {
      BulletHingeConstraint = _constraintsBulletHingeConstraintJs.BulletHingeConstraint;
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
      game.once(Game.EVENT_ENGINE_INITED, function () {
        selector.register('bullet', {
          PhysicsWorld: BulletWorld,
          RigidBody: BulletRigidBody,
          BoxShape: BulletBoxShape,
          SphereShape: BulletSphereShape,
          CapsuleShape: BulletCapsuleShape,
          TrimeshShape: BulletTrimeshShape,
          CylinderShape: BulletCylinderShape,
          ConeShape: BulletConeShape,
          TerrainShape: BulletTerrainShape,
          SimplexShape: BulletSimplexShape,
          PlaneShape: BulletPlaneShape,
          PointToPointConstraint: BulletP2PConstraint,
          HingeConstraint: BulletHingeConstraint
        });
      });
    }
  };
});