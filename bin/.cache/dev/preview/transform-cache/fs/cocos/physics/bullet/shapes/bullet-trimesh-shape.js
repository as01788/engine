System.register("q-bundled:///fs/cocos/physics/bullet/shapes/bullet-trimesh-shape.js", ["./bullet-shape.js", "../../../core/index.js", "../bullet-utils.js", "../bullet-cache.js", "../instantiated.js"], function (_export, _context) {
  "use strict";

  var BulletShape, warnID, cocos2BulletVec3, cocos2BulletTriMesh, BulletCache, bt, BulletTrimeshShape;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_bulletShapeJs) {
      BulletShape = _bulletShapeJs.BulletShape;
    }, function (_coreIndexJs) {
      warnID = _coreIndexJs.warnID;
    }, function (_bulletUtilsJs) {
      cocos2BulletVec3 = _bulletUtilsJs.cocos2BulletVec3;
      cocos2BulletTriMesh = _bulletUtilsJs.cocos2BulletTriMesh;
    }, function (_bulletCacheJs) {
      BulletCache = _bulletCacheJs.BulletCache;
    }, function (_instantiatedJs) {
      bt = _instantiatedJs.bt;
    }],
    execute: function () {
      _export("BulletTrimeshShape", BulletTrimeshShape = /*#__PURE__*/function (_BulletShape) {
        _inheritsLoose(BulletTrimeshShape, _BulletShape);

        function BulletTrimeshShape() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _BulletShape.call.apply(_BulletShape, [this].concat(args)) || this;
          _this.refBtTriangleMesh = 0;
          return _this;
        }

        var _proto = BulletTrimeshShape.prototype;

        _proto.setMesh = function setMesh(v) {
          if (!this._isInitialized) return;

          if (this._impl && BulletCache.isNotEmptyShape(this._impl)) {
            // TODO: change the mesh after initialization
            warnID(9620);
          } else {
            var mesh = v;

            if (mesh && mesh.renderingSubMeshes.length > 0) {
              var btTriangleMesh = this._getBtTriangleMesh(mesh);

              if (this.collider.convex) {
                this._impl = bt.ConvexTriangleMeshShape_new(btTriangleMesh);
              } else {
                this._impl = bt.BvhTriangleMeshShape_new(btTriangleMesh, true, true);
              }

              var bt_v3 = BulletCache.instance.BT_V3_0;
              cocos2BulletVec3(bt_v3, this._collider.node.worldScale);
              bt.CollisionShape_setMargin(this._impl, 0.01);
              bt.CollisionShape_setLocalScaling(this._impl, bt_v3);
              this.setCompound(this._compound);
              this.updateByReAdd();
              this.setWrapper();
            } else {
              this._impl = bt.EmptyShape_static();
            }
          }
        };

        _proto.onComponentSet = function onComponentSet() {
          this.setMesh(this.collider.mesh);
        };

        _proto.onDestroy = function onDestroy() {
          if (this.refBtTriangleMesh) {
            bt.TriangleMesh_del(this.refBtTriangleMesh);
          }

          _BulletShape.prototype.onDestroy.call(this);
        };

        _proto.updateScale = function updateScale() {
          _BulletShape.prototype.updateScale.call(this);

          var bt_v3 = BulletCache.instance.BT_V3_0;
          cocos2BulletVec3(bt_v3, this._collider.node.worldScale);
          bt.CollisionShape_setLocalScaling(this._impl, bt_v3);
          this.updateCompoundTransform();
        };

        _proto._getBtTriangleMesh = function _getBtTriangleMesh(mesh) {
          this.refBtTriangleMesh = bt.TriangleMesh_new();
          cocos2BulletTriMesh(this.refBtTriangleMesh, mesh);
          return this.refBtTriangleMesh;
        };

        _createClass(BulletTrimeshShape, [{
          key: "collider",
          get: function get() {
            return this._collider;
          }
        }]);

        return BulletTrimeshShape;
      }(BulletShape));
    }
  };
});