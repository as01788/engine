System.register("q-bundled:///fs/cocos/core/renderer/core/pass-utils.js", ["../../gfx/index.js", "../../math/index.js"], function (_export, _context) {
  "use strict";

  var Type, Mat3, Mat4, Vec2, Vec3, Vec4, _type2reader, _type2writer, typeMask, bindingMask, countMask, offsetMask, genHandle, getTypeFromHandle, getBindingFromHandle, getCountFromHandle, getOffsetFromHandle, customizeType, type2reader, type2writer, defaultValues;

  /**
   * @en Gets the default values for the given type of uniform
   * @zh 根据指定的 Uniform 类型来获取默认值
   * @param type The type of the uniform
   */
  function getDefaultFromType(type) {
    switch (type) {
      case Type.BOOL:
      case Type.INT:
      case Type.UINT:
      case Type.FLOAT:
        return defaultValues[0];

      case Type.BOOL2:
      case Type.INT2:
      case Type.UINT2:
      case Type.FLOAT2:
        return defaultValues[1];

      case Type.BOOL4:
      case Type.INT4:
      case Type.UINT4:
      case Type.FLOAT4:
        return defaultValues[2];

      case Type.MAT4:
        return defaultValues[3];

      case Type.SAMPLER2D:
        return 'default-texture';

      case Type.SAMPLER_CUBE:
        return 'default-cube-texture';

      default:
    }

    return defaultValues[0];
  }
  /**
   * @en Combination of preprocess macros
   * @zh 预处理宏组合
   */


  /**
   * @en Override the preprocess macros
   * @zh 覆写预处理宏
   * @param target Target preprocess macros to be overridden
   * @param source Preprocess macros used for override
   */
  function overrideMacros(target, source) {
    var entries = Object.entries(source);
    var isDifferent = false;

    for (var i = 0; i < entries.length; i++) {
      if (target[entries[i][0]] !== entries[i][1]) {
        target[entries[i][0]] = entries[i][1];
        isDifferent = true;
      }
    }

    return isDifferent;
  }

  _export({
    getDefaultFromType: getDefaultFromType,
    overrideMacros: overrideMacros
  });

  return {
    setters: [function (_gfxIndexJs) {
      Type = _gfxIndexJs.Type;
    }, function (_mathIndexJs) {
      Mat3 = _mathIndexJs.Mat3;
      Mat4 = _mathIndexJs.Mat4;
      Vec2 = _mathIndexJs.Vec2;
      Vec3 = _mathIndexJs.Vec3;
      Vec4 = _mathIndexJs.Vec4;
    }],
    execute: function () {
      typeMask = 0xfc000000; //  6 bits => 64 types

      bindingMask = 0x03f00000; //  6 bits => 64 bindings

      countMask = 0x000ff000; //  8 bits => 256 vectors

      offsetMask = 0x00000fff; // 12 bits => 1024 vectors

      _export("genHandle", genHandle = function genHandle(binding, type, count, offset) {
        if (offset === void 0) {
          offset = 0;
        }

        return type << 26 & typeMask | binding << 20 & bindingMask | count << 12 & countMask | offset & offsetMask;
      });

      _export("getTypeFromHandle", getTypeFromHandle = function getTypeFromHandle(handle) {
        return (handle & typeMask) >>> 26;
      });

      _export("getBindingFromHandle", getBindingFromHandle = function getBindingFromHandle(handle) {
        return (handle & bindingMask) >>> 20;
      });

      _export("getCountFromHandle", getCountFromHandle = function getCountFromHandle(handle) {
        return (handle & countMask) >>> 12;
      });

      _export("getOffsetFromHandle", getOffsetFromHandle = function getOffsetFromHandle(handle) {
        return handle & offsetMask;
      });

      _export("customizeType", customizeType = function customizeType(handle, type) {
        return handle & ~typeMask | type << 26 & typeMask;
      });
      /**
       * @en Vector type uniforms
       * @zh 向量类型 uniform
       */


      _export("type2reader", type2reader = (_type2reader = {}, _type2reader[Type.UNKNOWN] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return console.warn('illegal uniform handle');
      }, _type2reader[Type.INT] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return a[idx];
      }, _type2reader[Type.INT2] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return Vec2.fromArray(v, a, idx);
      }, _type2reader[Type.INT3] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return Vec3.fromArray(v, a, idx);
      }, _type2reader[Type.INT4] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return Vec4.fromArray(v, a, idx);
      }, _type2reader[Type.FLOAT] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return a[idx];
      }, _type2reader[Type.FLOAT2] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return Vec2.fromArray(v, a, idx);
      }, _type2reader[Type.FLOAT3] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return Vec3.fromArray(v, a, idx);
      }, _type2reader[Type.FLOAT4] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return Vec4.fromArray(v, a, idx);
      }, _type2reader[Type.MAT3] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return Mat3.fromArray(v, a, idx);
      }, _type2reader[Type.MAT4] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return Mat4.fromArray(v, a, idx);
      }, _type2reader));

      _export("type2writer", type2writer = (_type2writer = {}, _type2writer[Type.UNKNOWN] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return console.warn('illegal uniform handle');
      }, _type2writer[Type.INT] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return a[idx] = v;
      }, _type2writer[Type.INT2] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return Vec2.toArray(a, v, idx);
      }, _type2writer[Type.INT3] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return Vec3.toArray(a, v, idx);
      }, _type2writer[Type.INT4] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return Vec4.toArray(a, v, idx);
      }, _type2writer[Type.FLOAT] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return a[idx] = v;
      }, _type2writer[Type.FLOAT2] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return Vec2.toArray(a, v, idx);
      }, _type2writer[Type.FLOAT3] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return Vec3.toArray(a, v, idx);
      }, _type2writer[Type.FLOAT4] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return Vec4.toArray(a, v, idx);
      }, _type2writer[Type.MAT3] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return Mat3.toArray(a, v, idx);
      }, _type2writer[Type.MAT4] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return Mat4.toArray(a, v, idx);
      }, _type2writer));

      defaultValues = [Object.freeze([0]), Object.freeze([0, 0]), Object.freeze([0, 0, 0, 0]), Object.freeze([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])];
    }
  };
});