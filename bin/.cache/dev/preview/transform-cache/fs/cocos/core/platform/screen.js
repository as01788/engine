System.register("q-bundled:///fs/cocos/core/platform/screen.js", ["pal/screen-adapter", "../global-exports.js", "./debug.js"], function (_export, _context) {
  "use strict";

  var screenAdapter, legacyCC, warnID, Screen, screen;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_palScreenAdapter) {
      screenAdapter = _palScreenAdapter.screenAdapter;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_debugJs) {
      warnID = _debugJs.warnID;
    }],
    execute: function () {
      /**
       * @en The screen API provides an easy way to do some screen managing stuff.
       * @zh screen 单例对象提供简单的方法来做屏幕管理相关的工作。
       */
      Screen = /*#__PURE__*/function () {
        function Screen() {}

        var _proto = Screen.prototype;

        _proto._init = function _init(options) {
          screenAdapter.init(options, function () {
            var _director$root;

            var director = legacyCC.director;

            if (!((_director$root = director.root) === null || _director$root === void 0 ? void 0 : _director$root.pipeline)) {
              warnID(1220);
              return;
            }

            director.root.pipeline.pipelineSceneData.shadingScale = screenAdapter.resolutionScale;
          });
        }
        /**
         * @en Get and set the size of current window in physical pixels.
         * NOTE:
         * - Setting window size is only supported on Web platform for now.
         * - On Web platform, if the ContainerStrategy is PROPORTIONAL_TO_FRAME, we set windowSize on game frame,
         *    and get windowSize from the game container after adaptation.
         * @zh 获取和设置当前窗口的物理像素尺寸。
         * 注意
         * - 设置窗口尺寸目前只在 Web 平台上支持。
         * - Web 平台上，如果 ContainerStrategy 为 PROPORTIONAL_TO_FRAME, 则设置 windowSize 作用于 game frame, 而从适配之后 game container 尺寸获取 windowSize.
         */
        ;

        /**
         * @en Return true if it's in full screen state now.
         * @zh 当前是否处在全屏状态下
         * @returns {boolean}
         */
        _proto.fullScreen = function fullScreen() {
          return screenAdapter.isFullScreen;
        }
        /**
         * @en Request to enter full screen mode with the given element.
         * Many browsers forbid to enter full screen mode without an user intended interaction.
         * If failed to request fullscreen, another attempt will be made to request fullscreen the next time a user interaction occurs.
         * @zh 尝试使当前节点进入全屏模式，很多浏览器不允许程序触发这样的行为，必须在一个用户交互回调中才会生效。
         * 如果进入全屏失败，会在下一次用户发生交互时，再次尝试进入全屏。
         * @param element The element to request full screen state
         * @param onFullScreenChange callback function when full screen state changed
         * @param onFullScreenError callback function when full screen error
         * @return {Promise|undefined}
         * @deprecated since v3.3, please use `screen.requestFullScreen(): Promise<void>` instead.
         */
        ;

        _proto.requestFullScreen = function requestFullScreen(element, onFullScreenChange, onFullScreenError) {
          if (arguments.length > 0) {
            warnID(1400, 'screen.requestFullScreen(element, onFullScreenChange?, onFullScreenError?)', 'screen.requestFullScreen(): Promise');
          }

          return screenAdapter.requestFullScreen().then(function () {
            // @ts-expect-error no parameter passed
            onFullScreenChange === null || onFullScreenChange === void 0 ? void 0 : onFullScreenChange();
          })["catch"](function (err) {
            console.error(err); // @ts-expect-error no parameter passed

            onFullScreenError === null || onFullScreenError === void 0 ? void 0 : onFullScreenError();
          });
        }
        /**
         * @en Exit the full mode.
         * @zh 退出全屏模式
         * @return {Promise}
         */
        ;

        _proto.exitFullScreen = function exitFullScreen() {
          return screenAdapter.exitFullScreen();
        }
        /**
         * @en Automatically request full screen during the next touch/click event
         * @zh 自动监听触摸、鼠标事件并在下一次事件触发时尝试进入全屏模式
         * @param element The element to request full screen state
         * @param onFullScreenChange callback function when full screen state changed
         *
         * @deprecated since v3.3, please use screen.requestFullScreen() instead.
         */
        ;

        _proto.autoFullScreen = function autoFullScreen(element, onFullScreenChange) {
          var _this$requestFullScre;

          (_this$requestFullScre = this.requestFullScreen(element, onFullScreenChange)) === null || _this$requestFullScre === void 0 ? void 0 : _this$requestFullScre["catch"](function (e) {});
        }
        /**
         * @param element
         * @deprecated since v3.3
         */
        ;

        _proto.disableAutoFullScreen = function disableAutoFullScreen(element) {// DO NOTHING
        } // TODO: to support registering fullscreen change
        // TODO: to support screen resize
        ;

        _createClass(Screen, [{
          key: "windowSize",
          get: function get() {
            return screenAdapter.windowSize;
          },
          set: function set(size) {
            screenAdapter.windowSize = size;
          }
          /**
           * @en Get the current resolution of game.
           * This is a readonly property.
           * @zh 获取当前游戏的分辨率。
           * 这是一个只读属性。
           *
           * @readonly
           */

        }, {
          key: "resolution",
          get: function get() {
            return screenAdapter.resolution;
          } // /**
          //  * @en Get and set the resolution scale of screen, which will affect the quality of the rendering.
          //  * Note: if this value is set too high, the rendering performance of GPU will be reduced, this value is 1 by default.
          //  * @zh 获取和设置屏幕的分辨率缩放比，这将会影响最终渲染的质量。
          //  * 注意：如果这个值设置的太高，会降低 GPU 的渲染性能，该值默认为 1。
          //  */
          // public get resolutionScale () {
          //     return screenAdapter.resolutionScale;
          // }
          // public set resolutionScale (v: number) {
          //     screenAdapter.resolutionScale = v;
          // }

          /**
           * @en Whether it supports full screen？
           * @zh 是否支持全屏？
           * @returns {Boolean}
           */

        }, {
          key: "supportsFullScreen",
          get: function get() {
            return screenAdapter.supportFullScreen;
          }
        }]);

        return Screen;
      }();

      _export("screen", screen = new Screen());

      legacyCC.screen = screen;
    }
  };
});