System.register("q-bundled:///fs/cocos/core/algorithm/move.js", ["../data/utils/asserts.js"], function (_export, _context) {
  "use strict";

  var assertsArrayIndex;

  /**
   * Moves an array element to new location.
   * @param array The array.
   * @param index Index to the array element to move.
   * @param newIndex New array index it should have.
   */
  function move(array, index, newIndex) {
    assertsArrayIndex(array, index);
    assertsArrayIndex(array, newIndex);

    if (index === newIndex) {
      return array;
    }

    var element = array[index];

    if (index < newIndex) {
      // Shift right
      for (var iElement = index + 1; iElement <= newIndex; ++iElement) {
        array[iElement - 1] = array[iElement];
      }
    } else {
      // Shift left
      for (var _iElement = index; _iElement !== newIndex; --_iElement) {
        array[_iElement] = array[_iElement - 1];
      }
    }

    array[newIndex] = element;
    return array;
  }

  _export("move", move);

  return {
    setters: [function (_dataUtilsAssertsJs) {
      assertsArrayIndex = _dataUtilsAssertsJs.assertsArrayIndex;
    }],
    execute: function () {}
  };
});