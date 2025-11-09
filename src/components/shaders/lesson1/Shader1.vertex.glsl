// vertex.glsl
varying vec2 vUv;            // pass UV coordinates to fragment shader

void main() {
 vUv = uv;              // `uv` is a built‑in attribute (0‑1 range)
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}