uniform vec2 uMouse;

void main() {
  vec2 pos = vUv - 0.5;
  float dist = length(pos - uMouse * 0.5 + 0.25);
  vec3 color = mix(vec3(0.2,0.4,0.8), vec3(1.0,0.6,0.2), smoothstep(0.2,0.0,dist));
  gl_FragColor = vec4(color,1.0);
}