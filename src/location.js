export default function(gl, vars) {
  var gl_vars = {};
  var attributes = vars.attributes || [];
  var uniforms = vars.uniforms || [];

  attributes.forEach((v) => {
    gl_vars[v] = gl.getAttribLocation(gl.program, v);
  })
  uniforms.forEach((v) => {
    gl_vars[v] = gl.getUniformLocation(gl.program, v);
  })

  return gl_vars
}
