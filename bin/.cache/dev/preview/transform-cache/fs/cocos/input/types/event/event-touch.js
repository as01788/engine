System.register("q-bundled:///fs/cocos/input/types/event/event-touch.js", ["./event.js", "../../../core/math/vec2.js"], function (_export, _context) {
  "use strict";

  var Event, Vec2, _vec2, EventTouch;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_eventJs) {
      Event = _eventJs.Event;
    }, function (_coreMathVec2Js) {
      Vec2 = _coreMathVec2Js.Vec2;
    }],
    execute: function () {
      _vec2 = new Vec2();
      /**
       * @en
       * The touch event.
       *
       * @zh
       * 触摸事件。
       */

      _export("EventTouch", EventTouch = /*#__PURE__*/function (_Event) {
        _inheritsLoose(EventTouch, _Event);

        /**
         * @en The maximum touch point numbers simultaneously
         * @zh 同时存在的最大触点数量。
         */

        /**
         * @en The current touch object
         * @zh 当前触点对象
         */

        /**
         * @en Indicate whether the touch event is simulated or real
         * @zh 表示触摸事件是真实触点触发的还是模拟的
         */

        /**
         * @en Set whether to prevent events from being swallowed by nodes, which is false by default.
         * If set to true, the event is allowed to be dispatched to nodes at the bottom layer.
         * NOTE: Setting to true will reduce the efficiency of event dispatching.
         *
         * @zh 设置是否阻止事件被节点吞噬, 默认为 false 。
         * 如果设置为 true，则事件允许派发给渲染在下一层级的节点。
         * 注意：设置为 true 会降低事件派发的效率。
         *
         * @experimental May be optimized in the future.
         */
        // deprecated since v3.3

        /**
         * @param touches - An array of current touches
         * @param bubbles - Indicate whether the event bubbles up through the hierarchy or not.
         * @param eventType - The type of the event
         */
        function EventTouch(changedTouches, bubbles, eventType, touches) {
          var _this;

          if (touches === void 0) {
            touches = [];
          }

          _this = _Event.call(this, eventType, bubbles) || this;
          _this.touch = null;
          _this.simulate = false;
          _this.preventSwallow = false;
          _this._eventCode = void 0;
          _this._touches = void 0;
          _this._allTouches = void 0;
          _this._eventCode = eventType;
          _this._touches = changedTouches || [];
          _this._allTouches = touches;
          return _this;
        }
        /**
         * @en Returns event type code.
         * @zh 获取触摸事件类型。
         *
         * @deprecated since v3.3, please use EventTouch.prototype.type instead.
         */


        var _proto = EventTouch.prototype;

        _proto.getEventCode = function getEventCode() {
          return this._eventCode;
        }
        /**
         * @en Returns touches of event.
         * @zh 获取有变动的触摸点的列表。
         * 注意：第一根手指按下不动，接着按第二根手指，这时候触点信息就只有变动的这根手指（第二根手指）的信息。
         * 如果需要获取全部手指的信息，请使用 `getAllTouches`。
         */
        ;

        _proto.getTouches = function getTouches() {
          return this._touches;
        }
        /**
         * @en Returns touches of event.
         * @zh 获取所有触摸点的列表。
         * 注意：如果手指行为是 touch end，这个时候列表是没有该手指信息的。如需知道该手指信息，可通过 `getTouches` 获取识别。
         */
        ;

        _proto.getAllTouches = function getAllTouches() {
          return this._allTouches;
        }
        /**
         * @en Sets touch location.
         * @zh 设置当前触点位置
         * @param x - The current touch location on the x axis
         * @param y - The current touch location on the y axis
         */
        ;

        _proto.setLocation = function setLocation(x, y) {
          if (this.touch) {
            this.touch.setTouchInfo(this.touch.getID(), x, y);
          }
        }
        /**
         * @en Returns the current touch location.
         * @zh 获取触点位置。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        ;

        _proto.getLocation = function getLocation(out) {
          return this.touch ? this.touch.getLocation(out) : new Vec2();
        }
        /**
         * @en Returns the current touch location in UI coordinates.
         * @zh 获取 UI 坐标系下的触点位置。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        ;

        _proto.getUILocation = function getUILocation(out) {
          return this.touch ? this.touch.getUILocation(out) : new Vec2();
        }
        /**
         * @en Returns the current touch location in game screen coordinates.
         * @zh 获取当前触点在游戏窗口中的位置。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        ;

        _proto.getLocationInView = function getLocationInView(out) {
          return this.touch ? this.touch.getLocationInView(out) : new Vec2();
        }
        /**
         * @en Returns the previous touch location.
         * @zh 获取触点在上一次事件时的位置对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        ;

        _proto.getPreviousLocation = function getPreviousLocation(out) {
          return this.touch ? this.touch.getPreviousLocation(out) : new Vec2();
        }
        /**
         * @en Returns the start touch location.
         * @zh 获取触点落下时的位置对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        ;

        _proto.getStartLocation = function getStartLocation(out) {
          return this.touch ? this.touch.getStartLocation(out) : new Vec2();
        }
        /**
         * @en Returns the start touch location in UI coordinates.
         * @zh 获取触点落下时的 UI 世界下位置对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        ;

        _proto.getUIStartLocation = function getUIStartLocation(out) {
          return this.touch ? this.touch.getUIStartLocation(out) : new Vec2();
        }
        /**
         * @en Returns the id of the current touch point.
         * @zh 获取触点的标识 ID，可以用来在多点触摸中跟踪触点。
         */
        ;

        _proto.getID = function getID() {
          return this.touch ? this.touch.getID() : null;
        }
        /**
         * @en Returns the delta distance from the previous location to current location.
         * @zh 获取触点距离上一次事件移动的距离对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        ;

        _proto.getDelta = function getDelta(out) {
          return this.touch ? this.touch.getDelta(out) : new Vec2();
        }
        /**
         * @en Returns the delta distance from the previous location to current location.
         * @zh 获取触点距离上一次事件 UI 世界下移动的距离对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
        */
        ;

        _proto.getUIDelta = function getUIDelta(out) {
          return this.touch ? this.touch.getUIDelta(out) : new Vec2();
        }
        /**
         * @en Returns the X axis delta distance from the previous location to current location.
         * @zh 获取触点距离上一次事件移动的 x 轴距离。
         */
        ;

        _proto.getDeltaX = function getDeltaX() {
          return this.touch ? this.touch.getDelta(_vec2).x : 0;
        }
        /**
         * @en Returns the Y axis delta distance from the previous location to current location.
         * @zh 获取触点距离上一次事件移动的 y 轴距离。
         */
        ;

        _proto.getDeltaY = function getDeltaY() {
          return this.touch ? this.touch.getDelta(_vec2).y : 0;
        }
        /**
         * @en Returns location X axis data.
         * @zh 获取当前触点 X 轴位置。
         */
        ;

        _proto.getLocationX = function getLocationX() {
          return this.touch ? this.touch.getLocationX() : 0;
        }
        /**
         * @en Returns location Y axis data.
         * @zh 获取当前触点 Y 轴位置。
         */
        ;

        _proto.getLocationY = function getLocationY() {
          return this.touch ? this.touch.getLocationY() : 0;
        };

        return EventTouch;
      }(Event)); // @ts-expect-error TODO


      EventTouch.MAX_TOUCHES = 5;
      Event.EventTouch = EventTouch;
    }
  };
});