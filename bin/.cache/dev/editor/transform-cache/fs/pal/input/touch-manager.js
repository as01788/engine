"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.touchManager = void 0;

var _macro = require("../../cocos/core/platform/macro.js");

var _index = require("../../cocos/input/types/index.js");

var _vec = require("../../cocos/core/math/vec2.js");

const tempVec2 = new _vec.Vec2();

class TouchManager {
  /**
   * A map from touch ID to available touch index in _touches array.
   */
  constructor() {
    this._touchMap = {};
    this._touches = void 0;
    this._maxTouches = 8;
    this._touches = new Array(this._maxTouches);
  }
  /**
   * The original touch object can't be modified, so we need to return the cloned touch object.
   * @param touch
   * @returns
   */


  _cloneTouch(touch) {
    const touchID = touch.getID();
    touch.getStartLocation(tempVec2);
    const clonedTouch = new _index.Touch(tempVec2.x, tempVec2.y, touchID);
    touch.getLocation(tempVec2);
    clonedTouch.setPoint(tempVec2.x, tempVec2.y);
    touch.getPreviousLocation(tempVec2);
    clonedTouch.setPrevPoint(tempVec2);
    return clonedTouch;
  }
  /**
   * Create the touch object at the touch start event callback.
   * we have some policy to create the touch object:
   * - If the number of touches doesn't exceed the max count, we create a touch object.
   * - If the number of touches exceeds the max count, we discard the timeout touch to create a new one.
   * - If the number of touches exceeds the max count and there is no timeout touch, we can't create any touch object.
   * @param touchID
   * @param x
   * @param y
   * @returns
   */


  _createTouch(touchID, x, y) {
    if (touchID in this._touchMap) {
      console.log('Cannot create the same touch object.');
      return undefined;
    }

    const availableTouchIndex = this._getAvailableTouchIndex(touchID);

    if (availableTouchIndex === -1) {
      console.log('The touches is more than MAX_TOUCHES.'); // TODO: logID 2300

      return undefined;
    }

    const touch = new _index.Touch(x, y, touchID);
    this._touches[availableTouchIndex] = touch;
    this._touchMap[touchID] = availableTouchIndex;

    this._updateTouch(touch, x, y);

    return this._cloneTouch(touch);
  }
  /**
   * Release the touch object at the touch end or touch cancel event callback.
   * @param touchID
   * @returns
   */


  releaseTouch(touchID) {
    if (!(touchID in this._touchMap)) {
      return;
    }

    const availableTouchIndex = this._touchMap[touchID];
    this._touches[availableTouchIndex] = undefined;
    delete this._touchMap[touchID];
  }
  /**
   * Get touch object by touch ID.
   * @param touchID
   * @returns
   */


  getTouch(touchID, x, y) {
    const availableTouchIndex = this._touchMap[touchID];
    let touch = this._touches[availableTouchIndex];

    if (!touch) {
      touch = this._createTouch(touchID, x, y);
    } else {
      this._updateTouch(touch, x, y);
    }

    return touch ? this._cloneTouch(touch) : undefined;
  }
  /**
   * Get all the current touches objects.
   * @returns
   */


  getAllTouches() {
    const touches = [];

    this._touches.forEach(touch => {
      if (touch) {
        const clonedTouch = this._cloneTouch(touch);

        touches.push(clonedTouch);
      }
    });

    return touches;
  }
  /**
   * Update the location and previous location of current touch ID.
   * @param touchID
   * @param x The current location X
   * @param y The current location Y
   */


  _updateTouch(touch, x, y) {
    touch.getLocation(tempVec2);
    touch.setPrevPoint(tempVec2);
    touch.setPoint(x, y);
  }

  _getAvailableTouchIndex(touchID) {
    const availableTouchIndex = this._touchMap[touchID];

    if (typeof availableTouchIndex !== 'undefined') {
      return availableTouchIndex;
    }

    for (let i = 0; i < this._maxTouches; i++) {
      if (!this._touches[i]) {
        return i;
      }
    } // Handle when exceed the max number of touches


    const now = performance.now();
    const TOUCH_TIMEOUT = _macro.macro.TOUCH_TIMEOUT;

    for (let i = 0; i < this._maxTouches; i++) {
      const touch = this._touches[i];

      if (now - touch.lastModified > TOUCH_TIMEOUT) {
        console.log(`The touches is more than MAX_TOUCHES, release touch id ${touch.getID()}.`); // TODO: need to handle touch cancel event when exceed the max number of touches ?

        this.releaseTouch(touch.getID());
        return i;
      }
    }

    return -1;
  }

}

const touchManager = new TouchManager();
exports.touchManager = touchManager;