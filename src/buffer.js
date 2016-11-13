export default function(gl, attribute, data, size) {
  var buffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, mesh, gl.STATIC_DRAW);
  gl.vertexAttribPointer(attribute, size, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(attribute);

  return buffer
}
