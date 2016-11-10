import Shader from './shader'

var GL = {
  create: function(canvas) {
    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (!gl) throw new Error('Failed to get the rendering context for WebGL');
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    return gl;
  },

  Shader: Shader
}

export default GL;
