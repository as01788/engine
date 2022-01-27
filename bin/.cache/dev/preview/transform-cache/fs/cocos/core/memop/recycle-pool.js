System.register("q-bundled:///fs/cocos/core/memop/recycle-pool.js", ["./scalable-container.js"], function (_export, _context) {
  "use strict";

  var ScalableContainer, RecyclePool;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_scalableContainerJs) {
      ScalableContainer = _scalableContainerJs.ScalableContainer;
    }],
    execute: function () {
      /**
       * @packageDocumentation
       * @module memop
       */

      /**
       * @en Recyclable object pool. It's designed to be entirely reused each time.
       * There is no put and get method, each time you get the [[data]], you can use all elements as new.
       * You shouldn't simultaneously use the same RecyclePool in more than two overlapped logic.
       * Its size can be automatically incremented or manually resized.
       * @zh 循环对象池。这种池子被设计为每次使用都完整复用。
       * 它没有回收和提取的函数，通过获取 [[data]] 可以获取池子中所有元素，全部都应该被当做新对象来使用。
       * 开发者不应该在相互交叉的不同逻辑中同时使用同一个循环对象池。
       * 池子尺寸可以在池子满时自动扩充，也可以手动调整。
       * @see [[Pool]]
       */
      _export("RecyclePool", RecyclePool = /*#__PURE__*/function (_ScalableContainer) {
        _inheritsLoose(RecyclePool, _ScalableContainer);

        /**
         * @en Constructor with the allocator of elements and initial pool size, all elements will be pre-allocated.
         * @zh 使用元素的构造器和初始大小的构造函数，所有元素都会被预创建。
         * @param fn The allocator of elements in pool, it's invoked directly without `new`
         * @param size Initial pool size
         * @param dtor The finalizer of element, it's invoked when this container is destroyed or shrunk
         */
        function RecyclePool(fn, size, dtor) {
          var _this;

          _this = _ScalableContainer.call(this) || this;
          _this._fn = void 0;
          _this._dtor = null;
          _this._count = 0;
          _this._data = void 0;
          _this._initSize = 0;
          _this._fn = fn;
          _this._dtor = dtor || null;
          _this._data = new Array(size);
          _this._initSize = size;

          for (var i = 0; i < size; ++i) {
            _this._data[i] = fn();
          }

          return _this;
        }
        /**
         * @en The length of the object pool.
         * @zh 对象池大小。
         */


        var _proto = RecyclePool.prototype;

        /**
         * @en Resets the object pool. Only changes the length to 0
         * @zh 清空对象池。目前仅仅会设置尺寸为 0
         */
        _proto.reset = function reset() {
          this._count = 0;
        }
        /**
         * @en Resize the object poo, and fills with new created elements.
         * @zh 设置对象池大小，并填充新的元素。
         * @param size The new size of the pool
         */
        ;

        _proto.resize = function resize(size) {
          if (size > this._data.length) {
            for (var i = this._data.length; i < size; ++i) {
              this._data[i] = this._fn();
            }
          }
        }
        /**
         * @en Expand the object pool, the size will be increment to current size times two, and fills with new created elements.
         * @zh 扩充对象池容量，会自动扩充尺寸到两倍，并填充新的元素。
         * @param idx
         */
        ;

        _proto.add = function add() {
          if (this._count >= this._data.length) {
            this.resize(this._data.length << 1);
          }

          return this._data[this._count++];
        };

        _proto.destroy = function destroy() {
          if (this._dtor) {
            for (var i = 0; i < this._data.length; i++) {
              this._dtor(this._data[i]);
            }
          }

          this._data.length = 0;
          this._count = 0;

          _ScalableContainer.prototype.destroy.call(this);
        };

        _proto.tryShrink = function tryShrink() {
          if (this._data.length >> 2 > this._count) {
            var length = Math.max(this._initSize, this._data.length >> 1);

            if (this._dtor) {
              for (var i = length; i < this._data.length; i++) {
                this._dtor(this._data[i]);
              }
            }

            this._data.length = length;
          }
        }
        /**
         * @en Remove an element of the object pool. This will also decrease size of the pool
         * @zh 移除对象池中的一个元素，同时会减小池子尺寸。
         * @param idx The index of the element to be removed
         */
        ;

        _proto.removeAt = function removeAt(idx) {
          if (idx >= this._count) {
            return;
          }

          var last = this._count - 1;
          var tmp = this._data[idx];
          this._data[idx] = this._data[last];
          this._data[last] = tmp;
          this._count -= 1;
        };

        _createClass(RecyclePool, [{
          key: "length",
          get: function get() {
            return this._count;
          }
          /**
           * @en The underlying array of all pool elements.
           * @zh 实际对象池数组。
           */

        }, {
          key: "data",
          get: function get() {
            return this._data;
          }
        }]);

        return RecyclePool;
      }(ScalableContainer));
    }
  };
});