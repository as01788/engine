System.register("q-bundled:///fs/cocos/spine/vertex-effect-delegate.js", ["./lib/spine-core.js"], function (_export, _context) {
  "use strict";

  var spine, VertexEffectDelegate;
  return {
    setters: [function (_libSpineCoreJs) {
      spine = _libSpineCoreJs.default;
    }],
    execute: function () {
      /**
       * @packageDocumentation
       * @module spine
       */

      /**
       * @en
       * The delegate of spine vertex effect
       * @zh
       * Spine 顶点动画代理
       * @class VertexEffectDelegate
       */
      _export("VertexEffectDelegate", VertexEffectDelegate = /*#__PURE__*/function () {
        function VertexEffectDelegate() {
          this.name = 'sp.VertexEffectDelegate';
          this._vertexEffect = null;
          this._interpolation = null;
          this._effectType = void 0;
          this._vertexEffect = null;
          this._interpolation = null;
          this._effectType = 'none';
        }
        /**
         * @en Clears vertex effect.
         * @zh 清空顶点效果
         * @method clear
         */


        var _proto = VertexEffectDelegate.prototype;

        _proto.clear = function clear() {
          this._vertexEffect = null;
          this._interpolation = null;
          this._effectType = 'none';
        }
        /**
         * @en Inits delegate with jitter effect
         * @zh 设置顶点抖动效果
         * @method initJitter
         * @param {Number} jitterX
         * @param {Number} jitterY
         */
        ;

        _proto.initJitter = function initJitter(jitterX, jitterY) {
          this._effectType = 'jitter';
          this._vertexEffect = new spine.JitterEffect(jitterX, jitterY);
          return this._vertexEffect;
        }
        /**
         * @en Inits delegate with swirl effect
         * @zh 设置顶点漩涡效果
         * @method initSwirlWithPow
         * @param {Number} radius
         * @param {Number} power
         * @return {sp.spine.JitterEffect}
         */
        ;

        _proto.initSwirlWithPow = function initSwirlWithPow(radius, power) {
          this._interpolation = new spine.Pow(power);
          this._vertexEffect = new spine.SwirlEffect(radius, this._interpolation);
          return this._vertexEffect;
        }
        /**
         * @en Inits delegate with swirl effect
         * @zh 设置顶点漩涡效果
         * @method initSwirlWithPowOut
         * @param {Number} radius
         * @param {Number} power
         * @return {sp.spine.SwirlEffect}
         */
        ;

        _proto.initSwirlWithPowOut = function initSwirlWithPowOut(radius, power) {
          this._interpolation = new spine.PowOut(power);
          this._vertexEffect = new spine.SwirlEffect(radius, this._interpolation);
          return this._vertexEffect;
        }
        /**
         * @en Gets jitter vertex effect
         * @zh 获取顶点抖动效果
         * @method getJitterVertexEffect
         * @return {sp.spine.JitterEffect}
         */
        ;

        _proto.getJitterVertexEffect = function getJitterVertexEffect() {
          return this._vertexEffect;
        }
        /**
         * @en Gets swirl vertex effect
         * @zh 获取顶点漩涡效果
         * @method getSwirlVertexEffect
         * @return {sp.spine.SwirlEffect}
         */
        ;

        _proto.getSwirlVertexEffect = function getSwirlVertexEffect() {
          return this._vertexEffect;
        }
        /**
         * @en Gets vertex effect
         * @zh 获取顶点效果
         * @method getVertexEffect
         * @return {sp.spine.JitterEffect|sp.spine.SwirlEffect}
         */
        ;

        _proto.getVertexEffect = function getVertexEffect() {
          return this._vertexEffect;
        }
        /**
         * @en Gets effect type
         * @zh 获取效果类型
         * @method getEffectType
         * @return {String}
         */
        ;

        _proto.getEffectType = function getEffectType() {
          return this._effectType;
        };

        return VertexEffectDelegate;
      }());
    }
  };
});