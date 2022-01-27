System.register("q-bundled:///fs/cocos/core/animation/compression.js", ["../math/utils.js"], function (_export, _context) {
  "use strict";

  var approx;

  /**
   * Removes keys which are linear interpolations of surrounding keys.
   * @param keys Input keys.
   * @param values Input values.
   * @param maxDiff Max error.
   * @returns The new keys `keys` and new values `values`.
   */
  function removeLinearKeys(keys, values, maxDiff) {
    if (maxDiff === void 0) {
      maxDiff = 1e-3;
    }

    var nKeys = keys.length;

    if (nKeys < 3) {
      return {
        keys: keys.slice(),
        values: values.slice()
      };
    }

    var removeFlags = new Array(nKeys).fill(false); // We may choose to use different key selection policy?
    // http://nfrechette.github.io/2016/12/07/anim_compression_key_reduction/

    var iLastKey = nKeys - 1;

    for (var iKey = 1; iKey < iLastKey; ++iKey) {
      // Should we select previous non-removed key?
      var iPrevious = iKey - 1;
      var iNext = iKey + 1;
      var previousKey = keys[iPrevious],
          currentKey = keys[iKey],
          nextKey = keys[iNext];
      var previousValue = values[iPrevious],
          currentValue = values[iKey],
          nextValue = values[iNext];
      var alpha = (currentKey - previousKey) / (nextKey - previousKey);
      var expectedValue = (nextValue - previousValue) * alpha + previousValue;

      if (approx(expectedValue, currentValue, maxDiff)) {
        removeFlags[iKey] = true;
      }
    }

    return filterFromRemoveFlags(keys, values, removeFlags);
  }
  /**
   * Removes trivial frames.
   * @param keys Input keys.
   * @param values Input values.
   * @param maxDiff Max error.
   * @returns The new keys `keys` and new values `values`.
   */


  function removeTrivialKeys(keys, values, maxDiff) {
    if (maxDiff === void 0) {
      maxDiff = 1e-3;
    }

    var nKeys = keys.length;

    if (nKeys < 2) {
      return {
        keys: keys.slice(),
        values: values.slice()
      };
    }

    var removeFlags = new Array(nKeys).fill(false);

    for (var iKey = 1; iKey < nKeys; ++iKey) {
      // Should we select previous non-removed key?
      var iPrevious = iKey - 1;
      var previousValue = values[iPrevious],
          currentValue = values[iKey];

      if (approx(previousValue, currentValue, maxDiff)) {
        removeFlags[iKey] = true;
      }
    }

    return filterFromRemoveFlags(keys, values, removeFlags);
  }

  function filterFromRemoveFlags(keys, values, removeFlags) {
    var nKeys = keys.length;
    var nRemovals = removeFlags.reduce(function (n, removeFlag) {
      return removeFlag ? n + 1 : n;
    }, 0);

    if (!nRemovals) {
      return {
        keys: keys.slice(),
        values: values.slice()
      };
    }

    var nNewKeyframes = nKeys - nRemovals;
    var newKeys = new Array(nNewKeyframes).fill(0.0);
    var newValues = new Array(nNewKeyframes).fill(0.0);

    for (var iNewKeys = 0, iKey = 0; iKey < nKeys; ++iKey) {
      if (!removeFlags[iKey]) {
        newKeys[iNewKeys] = keys[iKey];
        newValues[iNewKeys] = values[iKey];
        ++iNewKeys;
      }
    }

    return {
      keys: newKeys,
      values: newValues
    };
  }

  _export({
    removeLinearKeys: removeLinearKeys,
    removeTrivialKeys: removeTrivialKeys
  });

  return {
    setters: [function (_mathUtilsJs) {
      approx = _mathUtilsJs.approx;
    }],
    execute: function () {}
  };
});