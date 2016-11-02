/*!
 * webgl-polarr v0.1.0
 * (c) 2016 huihui <skyalpha@126.com>
 * Released under the MIT License.
 */
'use strict';

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

module.exports = GL;
