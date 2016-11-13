/*!
 * webgl-polarr v0.1.0
 * (c) 2016 huihui <skyalpha@126.com>
 * Released under the MIT License.
 */
'use strict';

var useProgram = function (gl, vertexSource, fragmentSource) {

  gl.program = gl.createProgram();
  gl.attachShader(gl.program, compileSource(gl.VERTEX_SHADER, vertexSource));
  gl.attachShader(gl.program, compileSource(gl.FRAGMENT_SHADER, fragmentSource));
  gl.linkProgram(gl.program);

  if (!gl.getProgramParameter(gl.program, gl.LINK_STATUS)) {
    throw new Error('link error: ' + gl.getProgramInfoLog(gl.program));
  }

  gl.useProgram(gl.program);

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
};

var getVars = function (gl, vars) {
  var gl_vars = {};
  var attributes = vars.attributes || [];
  var uniforms = vars.uniforms || [];

  attributes.forEach(function (v) {
    gl_vars[v] = gl.getAttribLocation(gl.program, v);
  });
  uniforms.forEach(function (v) {
    gl_vars[v] = gl.getUniformLocation(gl.program, v);
  });

  return gl_vars;
};

var getMesh = function () {
  var coords = [0, 0, 1, 0, 0, 1, 1, 1];

  var vertices = [-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0];

  return {
    coords: coords,
    vertices: vertices,
    arrVtx: new Float32Array([-1, -1, 0, 0, 1, -1, 1, 0, -1, 1, 0, 1, 1, 1, 1, 1])
  };
};

var setBuffer = function (gl, attribute, data, size) {
  var buffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, mesh, gl.STATIC_DRAW);
  gl.vertexAttribPointer(attribute, size, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(attribute);

  return buffer;
};

function loadTexture(gl, unit, image, options) {
  options = options || {};

  var texture = gl.createTexture();
  var mag_filter = options.mag_filter || gl.LINEAR;
  var min_filter = options.min_filter || gl.LINEAR;
  var wrap_s = options.wrap_s || gl.REPEAT;
  var wrap_t = options.wrap_t || gl.REPEAT;

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, mag_filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, min_filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap_s);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap_t);

  if (min_filter != gl.NEAREST && min_filter != gl.LINEAR) {
    gl.generateMipmap(gl.TEXTURE_2D);
  }

  gl.activeTexture(unit);
  gl.bindTexture(gl.TEXTURE_2D, texture);

  return texture;
}

var GL = {
  create: function create(canvas) {
    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (!gl) throw new Error('Failed to get the rendering context for WebGL');
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    return gl;
  },

  useProgram: useProgram,
  getVars: getVars,
  getMesh: getMesh,
  setBuffer: setBuffer,
  loadTexture: loadTexture
};

module.exports = GL;
