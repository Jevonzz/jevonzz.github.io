import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// 3D simplex noise by Ian McEwan / Ashima Arts (MIT).
const noise = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`

// Liquid blob: a dense sphere whose surface is pushed around by layered noise.
// Normals are rebuilt from neighbouring points so the lighting follows the waves.
const blobVertex = /* glsl */ `
uniform float uTime;
uniform vec3 uPointer;
uniform float uHover;
varying vec3 vNormal;
varying vec3 vView;
varying float vDisp;
${noise}
float displace(vec3 p){
  vec3 d = normalize(p);
  // Domain warp gives the slow, folding motion of liquid metal.
  vec3 q = d * 0.85 + vec3(0.0, uTime * 0.16, uTime * 0.09);
  q += 0.35 * vec3(snoise(q + 3.1), snoise(q + 7.4), snoise(q + 11.7));
  float n = snoise(q);
  float n2 = snoise(d * 1.8 - vec3(uTime * 0.12)) * 0.18;
  float pull = pow(max(dot(d, uPointer), 0.0), 5.0) * (0.16 + uHover * 0.2);
  return (n + n2) * 0.26 + pull;
}
vec3 surface(vec3 p){ return p + normalize(p) * displace(p); }
void main(){
  vec3 n = normalize(position);
  vec3 a = abs(n.y) > 0.99 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
  vec3 t = normalize(cross(n, a));
  vec3 b = cross(n, t);
  float e = 0.012;
  vec3 p0 = surface(position);
  vec3 p1 = surface(position + t * e);
  vec3 p2 = surface(position + b * e);
  vec3 nn = normalize(cross(p1 - p0, p2 - p0));
  vDisp = displace(position);
  vNormal = normalize(normalMatrix * nn);
  vec4 mv = modelViewMatrix * vec4(p0, 1.0);
  vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`

const blobFragment = /* glsl */ `
uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform vec3 uBase;
uniform float uDark;
varying vec3 vNormal;
varying vec3 vView;
varying float vDisp;
void main(){
  vec3 N = normalize(vNormal);
  vec3 V = normalize(vView);
  float ndv = max(dot(N, V), 0.0);
  float fres = pow(1.0 - ndv, 2.2);

  // Thin-film style colour shift, kept to the brand palette.
  float k = ndv * 1.6 + vDisp * 2.2 + N.y * 0.4 + uTime * 0.04;
  vec3 w = 0.5 + 0.5 * cos(6.28318 * (k + vec3(0.0, 0.33, 0.67)));
  vec3 film = (uColorA * w.x + uColorB * w.y + uColorC * w.z) / max(w.x + w.y + w.z, 0.001);

  // Fake studio reflections: a soft top light and a bright horizon band.
  vec3 R = reflect(-V, N);
  float env = smoothstep(0.35, 1.0, R.y) * 0.85 + exp(-pow((R.y + 0.05) * 5.0, 2.0)) * 0.45;

  vec3 L1 = normalize(vec3(-0.6, 0.8, 0.7));
  vec3 L2 = normalize(vec3(0.8, -0.3, 0.5));
  float spec = pow(max(dot(N, normalize(L1 + V)), 0.0), 90.0) * 1.2
             + pow(max(dot(N, normalize(L2 + V)), 0.0), 40.0) * 0.35;

  vec3 col = mix(uBase, film, 0.35 + fres * 0.65);
  col += film * env * (0.55 + 0.25 * uDark);
  col += vec3(1.0) * (spec + env * 0.18);
  col += film * fres * 0.6 * uDark;
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}
`

// Soft dust that drifts around the blob for depth.
const dustVertex = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
attribute float aSeed;
varying float vAlpha;
void main(){
  vec3 p = position;
  float a = uTime * (0.04 + aSeed * 0.06);
  p.xz = mat2(cos(a), -sin(a), sin(a), cos(a)) * p.xz;
  p.y += sin(uTime * 0.5 + aSeed * 6.28) * 0.08;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = (1.0 + aSeed * 2.5) * uPixelRatio * (6.0 / -mv.z);
  vAlpha = 0.25 + 0.75 * aSeed;
}
`

const dustFragment = /* glsl */ `
uniform vec3 uColor;
uniform float uOpacity;
varying float vAlpha;
void main(){
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  gl_FragColor = vec4(uColor, smoothstep(0.5, 0.0, d) * vAlpha * uOpacity);
}
`

const palettes = {
  dark: { a: '#8b70ff', b: '#22d3ee', c: '#f472b6', base: '#0d0b1f', dust: '#a5b4fc' },
  light: { a: '#6d4dff', b: '#06b6d4', c: '#ec4899', base: '#e9e5ff', dust: '#6d4dff' },
}

function Blob({ dark, calm, small }) {
  const mesh = useRef()
  const pointer = useRef(new THREE.Vector2())
  const hover = useRef(0)
  const p = dark ? palettes.dark : palettes.light

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector3(0, 0, 1) },
      uHover: { value: 0 },
      uColorA: { value: new THREE.Color() },
      uColorB: { value: new THREE.Color() },
      uColorC: { value: new THREE.Color() },
      uBase: { value: new THREE.Color() },
      uDark: { value: 1 },
    }),
    []
  )
  uniforms.uColorA.value.set(p.a)
  uniforms.uColorB.value.set(p.b)
  uniforms.uColorC.value.set(p.c)
  uniforms.uBase.value.set(p.base)
  uniforms.uDark.value = dark ? 1 : 0

  useFrame((state, delta) => {
    // Reduced motion keeps a slow morph but drops the spin and bobbing.
    const dt = Math.min(delta, 0.05) * (calm ? 0.35 : 1)
    uniforms.uTime.value += dt
    pointer.current.lerp(state.pointer, 0.06)
    const target = Math.min(Math.hypot(state.pointer.x, state.pointer.y), 1) > 0 ? 1 : 0
    hover.current += (target - hover.current) * 0.04
    uniforms.uHover.value = hover.current
    // Pointer direction in the blob's local space, so the bulge tracks the cursor while it spins.
    const dir = new THREE.Vector3(pointer.current.x, pointer.current.y, 0.8).normalize()
    uniforms.uPointer.value.copy(dir.applyQuaternion(mesh.current.quaternion.clone().invert()))
    if (calm) return
    mesh.current.rotation.y += dt * 0.12
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, -pointer.current.y * 0.35, 0.05)
    mesh.current.position.y = Math.sin(uniforms.uTime.value * 0.6) * 0.06
  })

  return (
    <mesh ref={mesh} scale={1.45}>
      <icosahedronGeometry args={[1, small ? 40 : 72]} />
      <shaderMaterial vertexShader={blobVertex} fragmentShader={blobFragment} uniforms={uniforms} />
    </mesh>
  )
}

function Dust({ dark, calm, count }) {
  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const seeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const r = 2.1 + Math.random() * 1.6
      const th = Math.random() * Math.PI * 2
      const ph = Math.acos(2 * Math.random() - 1)
      positions.set([r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph) * 0.6, r * Math.sin(ph) * Math.sin(th)], i * 3)
      seeds[i] = Math.random()
    }
    return { positions, seeds }
  }, [count])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.75) },
      uColor: { value: new THREE.Color() },
      uOpacity: { value: 1 },
    }),
    []
  )
  uniforms.uColor.value.set(dark ? palettes.dark.dust : palettes.light.dust)
  uniforms.uOpacity.value = dark ? 0.7 : 0.45

  useFrame((_, delta) => {
    uniforms.uTime.value += Math.min(delta, 0.05) * (calm ? 0.35 : 1)
  })

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={dustVertex}
        fragmentShader={dustFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={dark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  )
}

export default function HeroScene({ dark, reducedMotion, paused, eventSource }) {
  const small = typeof window !== 'undefined' && window.innerWidth < 768
  return (
    <Canvas
      // Track the pointer across the whole hero, not just over the canvas.
      eventSource={eventSource}
      eventPrefix="client"
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={paused ? 'never' : 'always'}
      aria-hidden="true"
    >
      <Blob dark={dark} calm={reducedMotion} small={small} />
      <Dust dark={dark} calm={reducedMotion} count={small ? 250 : 600} />
    </Canvas>
  )
}
