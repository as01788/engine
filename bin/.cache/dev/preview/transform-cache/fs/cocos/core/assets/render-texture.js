System.register("q-bundled:///fs/cocos/core/assets/render-texture.js", ["../data/decorators/index.js", "../../../../virtual/internal%253Aconstants.js", "../math/utils.js", "../gfx/index.js", "../global-exports.js", "./texture-base.js", "../gfx/base/define.js"], function (_export, _context) {
  "use strict";

  var ccclass, EDITOR, TEST, clamp, ColorAttachment, DepthStencilAttachment, AccessType, RenderPassInfo, Format, legacyCC, TextureBase, BufferTextureCopy, _dec, _class, _temp, _colorAttachment, _depthStencilAttachment, passInfo, _windowInfo, RenderTexture;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      TEST = _virtualInternal253AconstantsJs.TEST;
    }, function (_mathUtilsJs) {
      clamp = _mathUtilsJs.clamp;
    }, function (_gfxIndexJs) {
      ColorAttachment = _gfxIndexJs.ColorAttachment;
      DepthStencilAttachment = _gfxIndexJs.DepthStencilAttachment;
      AccessType = _gfxIndexJs.AccessType;
      RenderPassInfo = _gfxIndexJs.RenderPassInfo;
      Format = _gfxIndexJs.Format;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_textureBaseJs) {
      TextureBase = _textureBaseJs.TextureBase;
    }, function (_gfxBaseDefineJs) {
      BufferTextureCopy = _gfxBaseDefineJs.BufferTextureCopy;
    }],
    execute: function () {
      _colorAttachment = new ColorAttachment();
      _colorAttachment.format = Format.RGBA8;
      _colorAttachment.beginAccesses = [AccessType.FRAGMENT_SHADER_READ_TEXTURE];
      _colorAttachment.endAccesses = [AccessType.FRAGMENT_SHADER_READ_TEXTURE];
      _depthStencilAttachment = new DepthStencilAttachment();
      _depthStencilAttachment.format = Format.DEPTH_STENCIL;
      passInfo = new RenderPassInfo([_colorAttachment], _depthStencilAttachment);
      _windowInfo = {
        width: 1,
        height: 1,
        renderPassInfo: passInfo
      };
      /**
       * @en Render texture is a render target for [[Camera]] or [[Canvas]] component,
       * the render pipeline will use its [[RenderWindow]] as the target of the rendering process.
       * @zh 渲染贴图是 [[Camera]] 或 [[Canvas]] 组件的渲染目标对象，渲染管线会使用它的 [[RenderWindow]] 作为渲染的目标窗口。
       */

      _export("RenderTexture", RenderTexture = (_dec = ccclass('cc.RenderTexture'), _dec(_class = (_temp = /*#__PURE__*/function (_TextureBase) {
        _inheritsLoose(RenderTexture, _TextureBase);

        function RenderTexture() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _TextureBase.call.apply(_TextureBase, [this].concat(args)) || this;
          _this._window = null;
          return _this;
        }

        var _proto = RenderTexture.prototype;

        _proto.initialize = function initialize(info) {
          this._name = info.name || '';
          this._width = info.width;
          this._height = info.height;

          this._initWindow(info);
        };

        _proto.reset = function reset(info) {
          // to be consistent with other assets
          this.initialize(info);
        };

        _proto.destroy = function destroy() {
          if (this._window) {
            var root = legacyCC.director.root;
            root === null || root === void 0 ? void 0 : root.destroyWindow(this._window);
            this._window = null;
          }

          return _TextureBase.prototype.destroy.call(this);
        }
        /**
         * @en Resize the render texture
         * @zh 修改渲染贴图的尺寸
         * @param width The pixel width, the range is from 1 to 2048
         * @param height The pixel height, the range is from 1 to 2048
         */
        ;

        _proto.resize = function resize(width, height) {
          this._width = Math.floor(clamp(width, 1, 2048));
          this._height = Math.floor(clamp(height, 1, 2048));

          if (this._window) {
            this._window.resize(this._width, this._height);
          }

          this.emit('resize', this._window);
        };

        _proto._serialize = function _serialize(ctxForExporting) {
          if (EDITOR || TEST) {
            return {
              base: _TextureBase.prototype._serialize.call(this, ctxForExporting),
              w: this._width,
              h: this._height,
              n: this._name
            };
          }

          return {};
        };

        _proto._deserialize = function _deserialize(serializedData, handle) {
          var data = serializedData;
          this._width = data.w;
          this._height = data.h;
          this._name = data.n;

          _TextureBase.prototype._deserialize.call(this, data.base, handle);
        } // To be compatible with material property interface

        /**
         * @en Gets the related [[Texture]] resource, it's also the color attachment for the render window
         * @zh 获取渲染贴图的 GFX 资源，同时也是渲染窗口所指向的颜色缓冲贴图资源
         */
        ;

        _proto.getGFXTexture = function getGFXTexture() {
          return this._window && this._window.framebuffer.colorTextures[0];
        };

        _proto.onLoaded = function onLoaded() {
          this._initWindow();
        };

        _proto._initWindow = function _initWindow(info) {
          var root = legacyCC.director.root;
          _windowInfo.title = this._name;
          _windowInfo.width = this._width;
          _windowInfo.height = this._height;
          _windowInfo.renderPassInfo = info && info.passInfo ? info.passInfo : passInfo;

          if (this._window) {
            this._window.destroy();

            this._window.initialize(root.device, _windowInfo);
          } else {
            this._window = root.createWindow(_windowInfo);
          }
        };

        _proto.initDefault = function initDefault(uuid) {
          _TextureBase.prototype.initDefault.call(this, uuid);

          this._width = this._height = 1;

          this._initWindow();
        };

        _proto.validate = function validate() {
          return this.width >= 1 && this.width <= 2048 && this.height >= 1 && this.height <= 2048;
        }
        /**
         * @en Read pixel buffer from render texture
         * @param x The location on x axis
         * @param y The location on y axis
         * @param width The pixel width
         * @param height The pixel height
         * @zh 从 render texture 读取像素数据
         * @param x 起始位置X轴坐标
         * @param y 起始位置Y轴坐标
         * @param width 像素宽度
         * @param height 像素高度
         */
        ;

        _proto.readPixels = function readPixels(x, y, width, height) {
          if (x === void 0) {
            x = 0;
          }

          if (y === void 0) {
            y = 0;
          }

          width = width || this.width;
          height = width || this.height;
          var gfxTexture = this.getGFXTexture();

          if (!gfxTexture) {
            return null;
          }

          var gfxDevice = this._getGFXDevice();

          var bufferViews = [];
          var regions = [];
          var region0 = new BufferTextureCopy();
          region0.texOffset.x = x;
          region0.texOffset.y = y;
          region0.texExtent.width = width;
          region0.texExtent.height = height;
          regions.push(region0);
          var buffer = new Uint8Array(width * height * 4);
          bufferViews.push(buffer);
          gfxDevice === null || gfxDevice === void 0 ? void 0 : gfxDevice.copyTextureToBuffers(gfxTexture, bufferViews, regions);
          return buffer;
        };

        _createClass(RenderTexture, [{
          key: "window",
          get:
          /**
           * @en The render window for the render pipeline, it's created internally and cannot be modified.
           * @zh 渲染管线所使用的渲染窗口，内部逻辑创建，无法被修改。
           */
          function get() {
            return this._window;
          }
        }]);

        return RenderTexture;
      }(TextureBase), _temp)) || _class));

      legacyCC.RenderTexture = RenderTexture;
    }
  };
});