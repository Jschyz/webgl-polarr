/*!
 * webgl-polarr v0.1.0
 * (c) 2016 huihui <skyalpha@126.com>
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.GL = factory());
}(this, (function () { 'use strict';

var Shader = {};

var GL = {
  create: function create(canvas) {
    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (!gl) throw new Error('Failed to get the rendering context for WebGL');
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    return gl;
  },

  Shader: Shader
};

return GL;

})));
