System.register("q-bundled:///fs/cocos/physics/bullet/shapes/bullet-terrain-shape.js", ["./bullet-shape.js", "../../../core/index.js", "../bullet-utils.js", "../bullet-cache.js", "../instantiated.js"], function (_export, _context) {
  "use strict";

  var BulletShape, Vec3, warn, cocos2BulletVec3, CC_V3_0, BulletCache, bt, BulletTerrainShape;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_bulletShapeJs) {
      BulletShape = _bulletShapeJs.BulletShape;
    }, function (_coreIndexJs) {
      Vec3 = _coreIndexJs.Vec3;
      warn = _coreIndexJs.warn;
    }, function (_bulletUtilsJs) {
      cocos2BulletVec3 = _bulletUtilsJs.cocos2BulletVec3;
    }, function (_bulletCacheJs) {
      CC_V3_0 = _bulletCacheJs.CC_V3_0;
      BulletCache = _bulletCacheJs.BulletCache;
    }, function (_instantiatedJs) {
      bt = _instantiatedJs.bt;
    }],
    execute: function () {
      _export("BulletTerrainShape", BulletTerrainShape = /*#__PURE__*/function (_BulletShape) {
        _inheritsLoose(BulletTerrainShape, _BulletShape);

        function BulletTerrainShape() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _BulletShape.call.apply(_BulletShape, [this].concat(args)) || this;
          _this._bufPtr = 0;
          _this._tileSize = 0;
          _this._localOffset = new Vec3();
          return _this;
        }

        var _proto = BulletTerrainShape.prototype;

        _proto.setTerrain = function setTerrain(v) {
          if (!this._isInitialized) return;

          if (this._impl && BulletCache.isNotEmptyShape(this._impl)) {
            // TODO: change the terrain asset after initialization
            warn('[Physics][Bullet]: change the terrain asset after initialization is not support.');
          } else {
            var terrain = v;

            if (terrain) {
              this._tileSize = terrain.tileSize;
              var sizeI = terrain.getVertexCountI();
              var sizeJ = terrain.getVertexCountJ();
              this._bufPtr = bt._malloc(4 * sizeI * sizeJ);
              var offset = 0;
              var min = Number.MAX_SAFE_INTEGER;
              var max = Number.MIN_SAFE_INTEGER;

              for (var j = 0; j < sizeJ; j++) {
                for (var i = 0; i < sizeI; i++) {
                  var _v = terrain.getHeight(i, j);

                  bt._write_f32(this._bufPtr + offset, _v);

                  if (min > _v) min = _v;
                  if (_v > max) max = _v;
                  offset += 4;
                }
              }

              max += 0.01;
              min -= 0.01;

              this._localOffset.set((sizeI - 1) / 2 * this._tileSize, (max + min) / 2, (sizeJ - 1) / 2 * this._tileSize);

              this._impl = bt.TerrainShape_new(sizeI, sizeJ, this._bufPtr, 1, min, max);
              var bt_v3 = BulletCache.instance.BT_V3_0;
              bt.Vec3_set(bt_v3, this._tileSize, 1, this._tileSize);
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
          this.setTerrain(this.collider.terrain);
        };

        _proto.onDestroy = function onDestroy() {
          if (this._bufPtr) bt._free(this._bufPtr);

          _BulletShape.prototype.onDestroy.call(this);
        };

        _proto.setCenter = function setCenter(v) {
          Vec3.copy(CC_V3_0, v);
          CC_V3_0.add(this._localOffset); // CC_V3_0.multiply(this._collider.node.worldScale);

          cocos2BulletVec3(bt.Transform_getOrigin(this.transform), CC_V3_0);
          this.updateCompoundTransform();
        };

        _createClass(BulletTerrainShape, [{
          key: "collider",
          get: function get() {
            return this._collider;
          }
        }]);

        return BulletTerrainShape;
      }(BulletShape));
    }
  };
});