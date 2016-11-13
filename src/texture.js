export default function loadTexture(gl, unit, image, options) {
  options = options || {}

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
