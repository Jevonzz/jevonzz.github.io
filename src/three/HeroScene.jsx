import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
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

const vertexShader = /* glsl */ `
uniform float uTime;
uniform vec2 uPointer;
uniform float uPixelRatio;
attribute float aSeed;
varying float vMix;
varying float vAlpha;
${noise}
void main(){
  vec3 dir = normalize(position);
  float n = snoise(dir * 1.4 + vec3(uTime * 0.18));
  float n2 = snoise(dir * 3.2 - vec3(uTime * 0.12));
  // Bulge toward the pointer so the shape feels alive under the cursor.
  float pull = max(dot(dir, normalize(vec3(uPointer, 0.9))), 0.0);
  float r = 1.0 + n * 0.28 + n2 * 0.08 + pow(pull, 6.0) * 0.25;
  vec3 pos = dir * r * 1.55;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = (1.6 + aSeed * 2.2) * uPixelRatio * (6.0 / -mv.z);
  vMix = clamp(n * 0.5 + 0.5 + dir.y * 0.25, 0.0, 1.0);
  vAlpha = 0.35 + 0.65 * smoothstep(-0.2, 0.9, n2 + pull);
}
`

const fragmentShader = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uOpacity;
varying float vMix;
varying float vAlpha;
void main(){
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float glow = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(mix(uColorA, uColorB, vMix), glow * vAlpha * uOpacity);
}
`

function fibonacciSphere(count) {
  const positions = new Float32Array(count * 3)
  const seeds = new Float32Array(count)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const radius = Math.sqrt(1 - y * y)
    const theta = golden * i
    positions.set([Math.cos(theta) * radius, y, Math.sin(theta) * radius], i * 3)
    seeds[i] = Math.random()
  }
  return { positions, seeds }
}

function Blob({ dark, animate }) {
  const points = useRef()
  const pointer = useRef(new THREE.Vector2())
  const { gl } = useThree()
  const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 9000 : 16000
  const { positions, seeds } = useMemo(() => fibonacciSphere(count), [count])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2() },
      uPixelRatio: { value: gl.getPixelRatio() },
      uColorA: { value: new THREE.Color() },
      uColorB: { value: new THREE.Color() },
      uOpacity: { value: 1 },
    }),
    [gl]
  )

  // Colours follow the site theme: brighter glow on dark, deeper tones on light.
  uniforms.uColorA.value.set(dark ? '#7c5cff' : '#5b3df5')
  uniforms.uColorB.value.set(dark ? '#22d3ee' : '#0891b2')
  uniforms.uOpacity.value = dark ? 0.95 : 0.8

  useFrame((state, delta) => {
    if (!animate) return
    uniforms.uTime.value += delta
    pointer.current.lerp(state.pointer, 0.05)
    uniforms.uPointer.value.copy(pointer.current)
    points.current.rotation.y += delta * 0.08
    points.current.rotation.x = pointer.current.y * 0.25
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={dark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  )
}

export default function HeroScene({ dark, reducedMotion, paused }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      frameloop={reducedMotion || paused ? 'demand' : 'always'}
      aria-hidden="true"
    >
      <Blob dark={dark} animate={!reducedMotion} />
    </Canvas>
  )
}
