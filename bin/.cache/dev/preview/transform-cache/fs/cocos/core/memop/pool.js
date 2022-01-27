System.register("q-bundled:///fs/cocos/core/memop/pool.js", ["../platform/debug.js", "./scalable-container.js"], function (_export, _context) {
  "use strict";

  var warnID, ScalableContainer, Pool;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_platformDebugJs) {
      warnID = _platformDebugJs.warnID;
    }, function (_scalableContainerJs) {
      ScalableContainer = _scalableContainerJs.ScalableContainer;
    }],
    execute: function () {
      /**
       * @en Typed object pool.
       * It's a traditional design, you can get elements out of the pool or recycle elements by putting back into the pool.
       * @zh 支持类型的对象池。这是一个传统设计的对象池，你可以从对象池中取出对象或是放回不再需要对象来复用。
       * @see [[RecyclePool]]
       */
      _export("Pool", Pool = /*#__PURE__*/function (_ScalableContainer) {
        _inheritsLoose(Pool, _ScalableContainer);

        /**
         * @en Constructor with the allocator of elements and initial pool size
         * @zh 使用元素的构造器和初始大小的构造函数
         * @param ctor The allocator of elements in pool, it's invoked directly without `new`
         * @param elementsPerBatch Initial pool size, this size will also be the incremental size when the pool is overloaded
         * @param dtor The finalizer of element, it's invoked when this container is destroyed or shrunk
         */
        function Pool(ctor, elementsPerBatch, dtor) {
          var _this;

          _this = _ScalableContainer.call(this) || this;
          _this._ctor = void 0;
          _this._elementsPerBatch = void 0;
          _this._nextAvail = void 0;
          _this._freepool = [];
          _this._dtor = void 0;
          _this._ctor = ctor;
          _this._dtor = dtor || null;
          _this._elementsPerBatch = Math.max(elementsPerBatch, 1);
          _this._nextAvail = _this._elementsPerBatch - 1;

          for (var i = 0; i < _this._elementsPerBatch; ++i) {
            _this._freepool.push(ctor());
          }

          return _this;
        }
        /**
         * @en Take an object out of the object pool.
         * @zh 从对象池中取出一个对象。
         * @return An object ready for use. This function always return an object.
         */


        var _proto = Pool.prototype;

        _proto.alloc = function alloc() {
          if (this._nextAvail < 0) {
            this._freepool.length = this._elementsPerBatch;

            for (var i = 0; i < this._elementsPerBatch; i++) {
              this._freepool[i] = this._ctor();
            }

            this._nextAvail = this._elementsPerBatch - 1;
          }

          return this._freepool[this._nextAvail--];
        }
        /**
         * @en Put an object back into the object pool.
         * @zh 将一个对象放回对象池中。
         * @param obj The object to be put back into the pool
         */
        ;

        _proto.free = function free(obj) {
          this._freepool[++this._nextAvail] = obj;
        }
        /**
         * @en Put multiple objects back into the object pool.
         * @zh 将一组对象放回对象池中。
         * @param objs An array of objects to be put back into the pool
         */
        ;

        _proto.freeArray = function freeArray(objs) {
          this._freepool.length = this._nextAvail + 1;
          Array.prototype.push.apply(this._freepool, objs);
          this._nextAvail += objs.length;
        };

        _proto.tryShrink = function tryShrink() {
          if (this._nextAvail >> 1 > this._elementsPerBatch) {
            if (this._dtor) {
              for (var i = this._nextAvail >> 1; i <= this._nextAvail; i++) {
                this._dtor(this._freepool[i]);
              }
            }

            this._freepool.length = this._nextAvail >> 1;
            this._nextAvail = this._freepool.length - 1;
          }
        }
        /**
         * @en Destroy all elements and clear the pool.
         * @zh 释放对象池中所有资源并清空缓存池。
         */
        ;

        _proto.destroy = function destroy() {
          var dtor = arguments.length > 0 ? arguments[0] : null;

          if (dtor) {
            warnID(14100);
          }

          var readDtor = dtor || this._dtor;

          if (readDtor) {
            for (var i = 0; i <= this._nextAvail; i++) {
              readDtor(this._freepool[i]);
            }
          }

          this._freepool.length = 0;
          this._nextAvail = -1;

          _ScalableContainer.prototype.destroy.call(this);
        };

        return Pool;
      }(ScalableContainer));
    }
  };
});