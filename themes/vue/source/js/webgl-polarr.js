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

function Shader(gl, vertexSource, fragmentSource) {

  this.program = gl.createProgram();
  gl.attachShader(this.program, compileSource(gl.VERTEX_SHADER, vertexSource));
  gl.attachShader(this.program, compileSource(gl.FRAGMENT_SHADER, fragmentSource));
  gl.linkProgram(this.program);

  if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
    throw new Error('link error: ' + gl.getProgramInfoLog(this.program));
  }

  // Compile and link errors are thrown as strings.
  function compileSource(type, source) {
    var shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error('compile error: ' + gl.getShaderInfoLog(shader));
    }

    return shader;
  }
}

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
