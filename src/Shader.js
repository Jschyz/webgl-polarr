function Shader(gl, vertexSource, fragmentSource) {

  this.program = gl.createProgram();
  gl.attachShader(this.program, compileSource(gl.VERTEX_SHADER, vertexSource));
  gl.attachShader(this.program, compileSource(gl.FRAGMENT_SHADER, vertexSource));
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

export default Shader;
