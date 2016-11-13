import useProgram from './shader'
import getVars from './location'
import getMesh from './mesh'
import setBuffer from './buffer'
import loadTexture from './texture'

var GL = {
  create: function(canvas) {
    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (!gl) throw new Error('Failed to get the rendering context for WebGL');
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    return gl;
  },

  useProgram,
  getVars,
  getMesh,
  setBuffer,
  loadTexture
}

export default GL;
