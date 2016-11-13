---
title: 色温
type: guide
order: 2
---

## 让照片变得更暖或更冷。

色温是指光线在不同的能量下，人眼所感受到的颜色变化，以开尔文（K）为色温计算单位，简单说就是光线的颜色，K值越大色温越高颜色就越偏冷。白平衡，就是指相机把白色还原为白色，以纠正画面色偏的过程。在数码摄影时代，白平衡正是基于色温实现的，当相机机内设置的色温值与外界色温一致时，相机就能正确的表现白色。现在很多的数码相机和RAW处理软件都提供一些固定的色温预设，例如阴天、晴天、钨丝灯等。你也可以通过设置开尔文（K）的值来调整机内色温值。外部色温一定时，机内色温值越高，画面就越偏暖。因为机内色温值越高，给机器的信息就是外界颜色越偏冷，为了正确表现白色，就会增加暖色来实现平衡。摄影师们通常会通过设置不同的色温值来实现自己的表达目的。


{% raw %}
<canvas width="400" height="400"></canvas>
<script id="vertex" type="x/shader">
attribute vec4 a_Vertex;
attribute vec4 a_TexCoord;
varying vec4 coord;

void main() {
  coord = a_TexCoord;
  gl_Position = a_Vertex;
}
</script>
<script id="fragment" type="x/shader">
precision highp float;
varying vec4 coord;
uniform sampler2D texture;
uniform vec4 color;

// Globals
vec3 refWhite, refWhiteRGB;
vec3 adaptTo, adaptFrom;

vec3 D65 = vec3(0.968774, 1.0, 1.121774);
vec3 CCT4K = vec3(1.009802, 1.0, 0.644496);
vec3 CCT20K = vec3(0.995451, 1.0, 1.886109);

// Color Conversions
mat3 matRGBtoXYZ = mat3(
  0.4124564390896922, 0.21267285140562253, 0.0193338955823293,
  0.357576077643909, 0.715152155287818, 0.11919202588130297,
  0.18043748326639894, 0.07217499330655958, 0.9503040785363679
);
mat3 matXYZtoRGB = mat3(
  3.2404541621141045, -0.9692660305051868, 0.055643430959114726,
  -1.5371385127977166, 1.8760108454466942, -0.2040259135167538,
  -0.498531409556016, 0.041556017530349834, 1.0572251882231791
);
mat3 matAdapt = mat3(
  0.8951, -0.7502, 0.0389,
  0.2664, 1.7135, -0.0685,
  -0.1614, 0.0367, 1.0296
);
mat3 matAdaptInv = mat3(
  0.9869929054667123, 0.43230526972339456, -0.008528664575177328,
  -0.14705425642099013, 0.5183602715367776, 0.04004282165408487,
  0.15996265166373125, 0.0492912282128556, 0.9684866957875502
);

vec3 RGBtoXYZ(vec3 rgb){
  vec3 xyz, XYZ;

  xyz = matRGBtoXYZ * rgb;

  // adaption
  XYZ = matAdapt * xyz;
  XYZ *= adaptTo / adaptFrom;
  xyz = matAdaptInv * XYZ;

  return xyz;
}

vec3 XYZtoRGB(vec3 xyz){
  vec3 rgb, RGB;

  // adaption
  RGB = matAdapt * xyz;
  rgb *= adaptFrom/adaptTo;
  xyz = matAdaptInv * RGB;

  rgb = matXYZtoRGB * xyz;

  return rgb;
}

/*=== Luminance and Saturation Functions ===============================*/

float Lum(vec3 c){
  return 0.299*c.r + 0.587*c.g + 0.114*c.b;
}

/*=== Color Temperature ===============================*/

vec3 Temperature(vec3 base, float temperature, float tint) {
  vec3 to, from;

  float luminance = Lum(base);

  if (temperature < 0.0) {
    to = CCT20K;
    from = D65;
  } else {
    to = CCT4K;
    from = D65;
  }

  // mask by luminance
  float temp = abs(temperature) * (1.0 - pow(luminance, 2.72));

  // from
  refWhiteRGB = from;
  // to
  refWhite = vec3(mix(from.x, to.x, temp), mix(1.0, 0.9, tint), mix(from.z, to.z, temp));

  adaptTo = matAdapt * refWhite;
  adaptFrom = matAdapt * refWhiteRGB;
  vec3 xyz = RGBtoXYZ(base);
  vec3 rgb = XYZtoRGB(xyz);
  // brightness compensation
  return rgb * (1.0 + (temp + tint) / 10.0);
}

void main() {
  vec4 colorMap = texture2D(texture, coord.xy);
  vec3 result = colorMap.rgb;

  result = Temperature(result, 1.0, 0.0);
  result = mix(colorMap.rgb, result, colorMap.a);

  gl_FragColor = vec4(result, colorMap.a);
}
</script>
<script>
var $ = function(selector) { return document.querySelector(selector) }
var gl = GL.create($('canvas'))
GL.useProgram(gl, $('#vertex').text, $('#fragment').text)
var gl_vars = GL.getVars(gl, {attributes: ['a_Vertex', 'a_TexCoord'], uniforms: ['texture', 'color']})
var mesh = GL.getMesh()
var arrVtx = mesh.arrVtx

var size = arrVtx.BYTES_PER_ELEMENT;
var vBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
// 向缓冲区对象中写入数据
gl.bufferData(gl.ARRAY_BUFFER, arrVtx, gl.STATIC_DRAW);
// 将缓冲区对象分配给a_Position
gl.vertexAttribPointer(gl_vars['a_Vertex'], 2, gl.FLOAT, false, size * 4, 0);
// 链接a_Position变量与分配给它的缓冲区对象
gl.enableVertexAttribArray(gl_vars['a_Vertex']);
gl.vertexAttribPointer(gl_vars['a_TexCoord'], 2, gl.FLOAT, false, size * 4, size * 2);
gl.enableVertexAttribArray(gl_vars['a_TexCoord']);


// GL.setBuffer(gl, gl_vars['a_Vertex'], new Float32Array(mesh.vertices), 3)
// GL.setBuffer(gl, gl_vars['a_TexCoord'], new Float32Array(mesh.coords), 2)
// gl.uniform2f(gl_vars['color'], -0.4859375, 0.0)
//
// end_color: {
//     r: 200,
//     g: 185,
//     b: 0
// },
// start_color: {
//     r: 45,
//     g: 100,
//     b: 255
// },

var img = new Image()
img.onload = function() {
  GL.loadTexture(gl, gl.TEXTURE0, img)
  gl.uniform1i(gl_vars['texture'], 0);

  gl.clearColor(1.0, 1.0, 1.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}
img.src = '/images/miao256x128.png'
</script>
{% endraw %}
