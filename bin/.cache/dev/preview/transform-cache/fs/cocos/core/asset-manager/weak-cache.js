System.register("q-bundled:///fs/cocos/core/asset-manager/weak-cache.js", ["../utils/js.js"], function (_export, _context) {
  "use strict";

  var js, WeakCache;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_utilsJsJs) {
      js = _utilsJsJs.js;
    }],
    execute: function () {
      _export("default", WeakCache = /*#__PURE__*/function () {
        function WeakCache(map) {
          this._weakMap = {};
          if (typeof window.WeakRef === 'undefined') throw new Error('this platform does not support WeakRef!');

          if (map) {
            for (var _key in map) {
              this._weakMap[_key] = new WeakRef(map[_key]);
            }
          }
        }

        var _proto = WeakCache.prototype;

        _proto.add = function add(key, val) {
          this._weakMap[key] = new WeakRef(val);
          return val;
        };

        _proto.has = function has(key) {
          return key in this._weakMap && !!this._weakMap[key].deref();
        };

        _proto.get = function get(key) {
          return this._weakMap[key] && this._weakMap[key].deref();
        };

        _proto.remove = function remove(key) {
          var out = this._weakMap[key];
          delete this._weakMap[key];
          return out && out.deref();
        };

        _proto.clear = function clear() {
          this._weakMap = js.createMap(true);
        };

        _proto.forEach = function forEach(func) {
          for (var _key2 in this._weakMap) {
            var _val = this.get(_key2);

            if (_val) {
              func(_val, _key2);
            }
          }
        };

        _proto.find = function find(predicate) {
          for (var _key3 in this._weakMap) {
            var _val2 = this.get(_key3);

            if (_val2 && predicate(_val2, _key3)) {
              return this._weakMap[_key3].deref();
            }
          }

          return null;
        };

        _proto.destroy = function destroy() {
          this._weakMap = {};
        };

        _createClass(WeakCache, [{
          key: "count",
          get: function get() {
            return Object.values(this._weakMap).filter(function (weakRef) {
              return weakRef.deref();
            }).length;
          }
        }]);

        return WeakCache;
      }());
    }
  };
});