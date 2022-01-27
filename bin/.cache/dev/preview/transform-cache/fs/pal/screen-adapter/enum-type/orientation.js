System.register("q-bundled:///fs/pal/screen-adapter/enum-type/orientation.js", [], function (_export, _context) {
  "use strict";

  var _PORTRAIT, _PORTRAIT_UPSIDE_DOWN, _LEFT, _RIGHT, _LANDSCAPE, _AUTO, Orientation;

  _export("Orientation", void 0);

  return {
    setters: [],
    execute: function () {
      _PORTRAIT = 1;
      _PORTRAIT_UPSIDE_DOWN = _PORTRAIT << 1;
      _LEFT = _PORTRAIT << 2;
      _RIGHT = _PORTRAIT << 3;
      _LANDSCAPE = _LEFT | _RIGHT;
      _AUTO = _PORTRAIT | _LANDSCAPE;

      (function (Orientation) {
        Orientation[Orientation["PORTRAIT"] = _PORTRAIT] = "PORTRAIT";
        Orientation[Orientation["PORTRAIT_UPSIDE_DOWN"] = _PORTRAIT_UPSIDE_DOWN] = "PORTRAIT_UPSIDE_DOWN";
        Orientation[Orientation["LANDSCAPE_LEFT"] = _LEFT] = "LANDSCAPE_LEFT";
        Orientation[Orientation["LANDSCAPE_RIGHT"] = _RIGHT] = "LANDSCAPE_RIGHT";
        Orientation[Orientation["LANDSCAPE"] = _LANDSCAPE] = "LANDSCAPE";
        Orientation[Orientation["AUTO"] = _AUTO] = "AUTO";
      })(Orientation || _export("Orientation", Orientation = {}));
    }
  };
});