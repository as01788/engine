System.register("q-bundled:///fs/cocos/core/curves/solve-cubic.js", [], function (_export, _context) {
  "use strict";

  var EQN_EPS;

  // cSpell:words Cardano's irreducibilis

  /**
   * Solve Cubic Equation using Cardano's formula.
   * The equation is formed from coeff0 + coeff1 * x + coeff2 * x^2 + coeff3 * x^3 = 0.
   * Modified from https://github.com/erich666/GraphicsGems/blob/master/gems/Roots3And4.c .
   */
  function solveCubic(coeff0, coeff1, coeff2, coeff3, solutions) {
    // normal form: x^3 + Ax^2 + Bx + C = 0
    var a = coeff2 / coeff3;
    var b = coeff1 / coeff3;
    var c = coeff0 / coeff3; // substitute x = y - A/3 to eliminate quadric term:
    // x^3 +px + q = 0

    var sqrA = a * a;
    var p = 1.0 / 3.0 * (-1.0 / 3 * sqrA + b);
    var q = 1.0 / 2.0 * (2.0 / 27.0 * a * sqrA - 1.0 / 3 * a * b + c); // use Cardano's formula

    var cubicP = p * p * p;
    var d = q * q + cubicP;
    var nSolutions = 0;

    if (isZero(d)) {
      if (isZero(q)) {
        // one triple solution
        solutions[0] = 0;
        return 1;
      } else {
        // one single and one double solution
        var u = Math.cbrt(-q);
        solutions[0] = 2 * u;
        solutions[1] = -u;
        return 2;
      }
    } else if (d < 0) {
      // Casus irreducibilis: three real solutions
      var phi = 1.0 / 3 * Math.acos(-q / Math.sqrt(-cubicP));
      var t = 2 * Math.sqrt(-p);
      solutions[0] = t * Math.cos(phi);
      solutions[1] = -t * Math.cos(phi + Math.PI / 3);
      solutions[2] = -t * Math.cos(phi - Math.PI / 3);
      nSolutions = 3;
    } else {
      // one real solution
      var sqrtD = Math.sqrt(d);

      var _u = Math.cbrt(sqrtD - q);

      var v = -Math.cbrt(sqrtD + q);
      solutions[0] = _u + v;
      nSolutions = 1;
    }

    var sub = 1.0 / 3 * a;

    for (var i = 0; i < nSolutions; ++i) {
      solutions[i] -= sub;
    }

    return nSolutions;
  }

  function isZero(x) {
    return x > -EQN_EPS && x < EQN_EPS;
  }

  _export("solveCubic", solveCubic);

  return {
    setters: [],
    execute: function () {
      EQN_EPS = 1e-9;
    }
  };
});