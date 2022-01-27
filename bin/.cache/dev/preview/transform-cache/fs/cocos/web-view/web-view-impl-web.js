System.register("q-bundled:///fs/cocos/web-view/web-view-impl-web.js", ["pal/screen-adapter", "./web-view-enums.js", "../core/platform/index.js", "./web-view-impl.js", "../core/index.js", "../core/math/index.js", "../core/utils/misc.js"], function (_export, _context) {
  "use strict";

  var screenAdapter, EventType, error, warn, WebViewImpl, game, mat4, contains, _mat4_temp, WebViewImplWeb;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_palScreenAdapter) {
      screenAdapter = _palScreenAdapter.screenAdapter;
    }, function (_webViewEnumsJs) {
      EventType = _webViewEnumsJs.EventType;
    }, function (_corePlatformIndexJs) {
      error = _corePlatformIndexJs.error;
      warn = _corePlatformIndexJs.warn;
    }, function (_webViewImplJs) {
      WebViewImpl = _webViewImplJs.WebViewImpl;
    }, function (_coreIndexJs) {
      game = _coreIndexJs.game;
    }, function (_coreMathIndexJs) {
      mat4 = _coreMathIndexJs.mat4;
    }, function (_coreUtilsMiscJs) {
      contains = _coreUtilsMiscJs.contains;
    }],
    execute: function () {
      _mat4_temp = mat4();

      _export("WebViewImplWeb", WebViewImplWeb = /*#__PURE__*/function (_WebViewImpl) {
        _inheritsLoose(WebViewImplWeb, _WebViewImpl);

        function WebViewImplWeb(component) {
          return _WebViewImpl.call(this, component) || this;
        }

        var _proto = WebViewImplWeb.prototype;

        _proto._bindDomEvent = function _bindDomEvent() {
          var _this = this;

          if (!this.webview) {
            return;
          }

          var onLoaded = function onLoaded(e) {
            _this._forceUpdate = true;

            _this.dispatchEvent(EventType.LOADED);

            var iframe = e.target;
            var body = iframe.contentDocument && iframe.contentDocument.body;

            if (body && body.innerHTML.includes('404')) {
              _this.dispatchEvent(EventType.ERROR, body.innerHTML);
            }
          };

          this.webview.addEventListener('load', onLoaded);
        };

        _proto.loadURL = function loadURL(url) {
          if (this.webview) {
            this.webview.src = url; // emit loading event

            this.dispatchEvent(EventType.LOADING);
          }
        };

        _proto.createWebView = function createWebView() {
          var wrapper = document.createElement('div');
          this._wrapper = wrapper;
          wrapper.id = 'webview-wrapper';
          wrapper.style['-webkit-overflow'] = 'auto';
          wrapper.style['-webkit-overflow-scrolling'] = 'touch';
          wrapper.style.position = 'absolute';
          wrapper.style.bottom = '0px';
          wrapper.style.left = '0px';
          wrapper.style.transformOrigin = '0px 100% 0px';
          wrapper.style['-webkit-transform-origin'] = '0px 100% 0px';
          game.container.appendChild(wrapper);
          var webview = document.createElement('iframe');
          this._webview = webview;
          webview.id = 'webview';
          webview.style.border = 'none';
          webview.style.width = '100%';
          webview.style.height = '100%';
          wrapper.appendChild(webview);

          this._bindDomEvent();
        };

        _proto.removeWebView = function removeWebView() {
          var wrapper = this._wrapper;

          if (contains(game.container, wrapper)) {
            game.container.removeChild(wrapper);
          }

          this.reset();
        };

        _proto.enable = function enable() {
          if (this._wrapper) {
            this._wrapper.style.visibility = 'visible';
          }
        };

        _proto.disable = function disable() {
          if (this._wrapper) {
            this._wrapper.style.visibility = 'hidden';
          }
        };

        _proto.evaluateJS = function evaluateJS(str) {
          if (this.webview) {
            var win = this.webview.contentWindow;

            if (win) {
              try {
                win.eval(str);
              } catch (e) {
                this.dispatchEvent(EventType.ERROR, e);
                error(e);
              }
            }
          }
        };

        _proto.setOnJSCallback = function setOnJSCallback(callback) {
          warn('The platform does not support');
        };

        _proto.setJavascriptInterfaceScheme = function setJavascriptInterfaceScheme(scheme) {
          warn('The platform does not support');
        };

        _proto.syncMatrix = function syncMatrix() {
          if (!this._wrapper || !this._uiTrans || !this._component || this._wrapper.style.visibility === 'hidden') return;
          var camera = this.UICamera;

          if (!camera) {
            return;
          }

          this._component.node.getWorldMatrix(_mat4_temp);

          camera.update(true);
          camera.worldMatrixToScreen(_mat4_temp, _mat4_temp, game.canvas.width, game.canvas.height);
          var _this$_uiTrans$conten = this._uiTrans.contentSize,
              width = _this$_uiTrans$conten.width,
              height = _this$_uiTrans$conten.height;

          if (!this._forceUpdate && this._m00 === _mat4_temp.m00 && this._m01 === _mat4_temp.m01 && this._m04 === _mat4_temp.m04 && this._m05 === _mat4_temp.m05 && this._m12 === _mat4_temp.m12 && this._m13 === _mat4_temp.m13 && this._w === width && this._h === height) {
            return;
          } // update matrix cache


          this._m00 = _mat4_temp.m00;
          this._m01 = _mat4_temp.m01;
          this._m04 = _mat4_temp.m04;
          this._m05 = _mat4_temp.m05;
          this._m12 = _mat4_temp.m12;
          this._m13 = _mat4_temp.m13;
          this._w = width;
          this._h = height; // TODO: implement webView in PAL

          var dpr = screenAdapter.devicePixelRatio;
          var scaleX = 1 / dpr;
          var scaleY = 1 / dpr;
          var container = game.container;
          var sx = _mat4_temp.m00 * scaleX;
          var b = _mat4_temp.m01;
          var c = _mat4_temp.m04;
          var sy = _mat4_temp.m05 * scaleY;
          this._wrapper.style.width = width + "px";
          this._wrapper.style.height = height + "px";
          var w = this._w * scaleX;
          var h = this._h * scaleY;
          var appx = w * _mat4_temp.m00 * this._uiTrans.anchorX;
          var appy = h * _mat4_temp.m05 * this._uiTrans.anchorY;
          var offsetX = container && container.style.paddingLeft ? parseInt(container.style.paddingLeft) : 0;
          var offsetY = container && container.style.paddingBottom ? parseInt(container.style.paddingBottom) : 0;
          var tx = _mat4_temp.m12 * scaleX - appx + offsetX;
          var ty = _mat4_temp.m13 * scaleY - appy + offsetY;
          var matrix = "matrix(" + sx + "," + -b + "," + -c + "," + sy + "," + tx + "," + -ty + ")";
          this._wrapper.style.transform = matrix;
          this._wrapper.style['-webkit-transform'] = matrix;
          this._forceUpdate = false;
        };

        return WebViewImplWeb;
      }(WebViewImpl));
    }
  };
});