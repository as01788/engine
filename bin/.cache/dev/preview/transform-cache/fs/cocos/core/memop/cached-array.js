System.register("q-bundled:///fs/cocos/core/memop/cached-array.js", ["./scalable-container.js"], function (_export, _context) {
  "use strict";

  var ScalableContainer, CachedArray;

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
       * @en
       * Cached array is a data structure for objects cache, it's designed for persistent data.
       * Its content array length will keep grow.
       * @zh
       * 适用于对象缓存的数组类型封装，一般用于不易被移除的常驻数据。
       * 它的内部数组长度会持续增长，不会减少。
       */
      _export("CachedArray", CachedArray = /*#__PURE__*/function (_ScalableContainer) {
        _inheritsLoose(CachedArray, _ScalableContainer);

        /**
         * @en
         * The array which stores actual content
         * @zh
         * 实际存储数据内容的数组
         */

        /**
         * @en
         * The actual count of data object
         * @zh
         * 实际数据内容数量
         */

        /**
         * @param length Initial length
         * @param compareFn Comparison function for sorting
         */
        function CachedArray(length, compareFn) {
          var _this;

          _this = _ScalableContainer.call(this) || this;
          _this.array = void 0;
          _this.length = 0;
          _this._compareFn = void 0;
          _this._initSize = 0;
          _this.array = new Array(length);
          _this._initSize = length;
          _this.length = 0;

          if (compareFn !== undefined) {
            _this._compareFn = compareFn;
          } else {
            _this._compareFn = function (a, b) {
              return a - b;
            };
          }

          return _this;
        }
        /**
         * @en
         * Push an element to the end of the array
         * @zh
         * 向数组末尾添加一个元素
         * @param item The item to be added
         */


        var _proto = CachedArray.prototype;

        _proto.push = function push(item) {
          this.array[this.length++] = item;
        }
        /**
         * @en
         * Pop the last element in the array. The [[length]] will reduce, but the internal array will keep its size.
         * @zh
         * 弹出数组最后一个元素，CachedArray 的 [[length]] 会减少，但是内部数组的实际长度不变
         * @return The last element.
         */
        ;

        _proto.pop = function pop() {
          return this.array[--this.length];
        }
        /**
         * @en
         * Get the element at the specified index of the array
         * @zh
         * 得到数组中指定位置的元素
         * @param idx The index of the requested element
         * @return The element at given index
         */
        ;

        _proto.get = function get(idx) {
          return this.array[idx];
        }
        /**
         * @en
         * Clear the cache. The [[length]] will be set to 0, but the internal array will keep its size.
         * @zh
         * 清空数组所有元素。[[length]] 会被设为 0，但内部数组的实际长度不变
         */
        ;

        _proto.clear = function clear() {
          this.length = 0;
        }
        /**
         * @en
         * Clear the cache. The [[length]] will be set to 0, and clear the internal array.
         * @zh
         * 清空数组所有元素。[[length]] 会被设为 0，并且清空内部数组
         */
        ;

        _proto.destroy = function destroy() {
          this.length = 0;
          this.array.length = 0;

          _ScalableContainer.prototype.destroy.call(this);
        };

        _proto.tryShrink = function tryShrink() {
          if (this.array.length >> 2 > this.length) {
            this.array.length = Math.max(this._initSize, this.array.length >> 1);
          }
        }
        /**
         * @en
         * Sort the existing elements in cache
         * @zh
         * 排序所有现有元素
         */
        ;

        _proto.sort = function sort() {
          this.array.length = this.length;
          this.array.sort(this._compareFn);
        }
        /**
         * @en
         * Add all elements of a given array to the end of the current array
         * @zh
         * 添加一个指定数组中的所有元素到当前数组末尾
         * @param array The given array to be appended
         */
        ;

        _proto.concat = function concat(array) {
          for (var i = 0; i < array.length; ++i) {
            this.array[this.length++] = array[i];
          }
        }
        /**
         * @en Delete the element at the specified location and move the last element to that location.
         * @zh 删除指定位置的元素并将最后一个元素移动至该位置。
         * @param idx The index of the element to be deleted
         */
        ;

        _proto.fastRemove = function fastRemove(idx) {
          if (idx >= this.length || idx < 0) {
            return;
          }

          var last = --this.length;
          this.array[idx] = this.array[last];
        }
        /**
         * @en Returns the first index at which a given element can be found in the array.
         * @zh 返回在数组中可以找到一个给定元素的第一个索引。
         * @param val The element
         */
        ;

        _proto.indexOf = function indexOf(val) {
          for (var i = 0, len = this.length; i < len; ++i) {
            if (this.array[i] === val) {
              return i;
            }
          }

          return -1;
        };

        return CachedArray;
      }(ScalableContainer));
    }
  };
});