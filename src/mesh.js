export default function() {
  var coords = [
    0, 0,
    1, 0,
    0, 1,
    1, 1
  ];

  var vertices = [
    -1, -1, 0,
    1, -1, 0,
    -1, 1, 0,
    1, 1, 0
  ];

  return {
    coords,
    vertices,
    arrVtx: new Float32Array([
      -1, -1, 0, 0,
      1, -1,  1, 0,
      -1, 1,  0, 1,
      1, 1,   1, 1
    ])
  }
}
