"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.move = move;

var _asserts = require("../data/utils/asserts.js");

/**
 * Moves an array element to new location.
 * @param array The array.
 * @param index Index to the array element to move.
 * @param newIndex New array index it should have.
 */
function move(array, index, newIndex) {
  (0, _asserts.assertsArrayIndex)(array, index);
  (0, _asserts.assertsArrayIndex)(array, newIndex);

  if (index === newIndex) {
    return array;
  }

  const element = array[index];

  if (index < newIndex) {
    // Shift right
    for (let iElement = index + 1; iElement <= newIndex; ++iElement) {
      array[iElement - 1] = array[iElement];
    }
  } else {
    // Shift left
    for (let iElement = index; iElement !== newIndex; --iElement) {
      array[iElement] = array[iElement - 1];
    }
  }

  array[newIndex] = element;
  return array;
}