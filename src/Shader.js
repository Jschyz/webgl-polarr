export default function(gl, vertexSource, fragmentSource) {

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
}
