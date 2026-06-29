import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

// Fragment shader with domain warping, 2D noise, and liquid morphing
const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;

  varying vec2 vUv;

  // Simplex noise function
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
      + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // Domain warping function
  float domainWarp(vec2 p, float time) {
    vec2 q = vec2(0.0);
    q.x = snoise(p + vec2(0.0, time * 0.1));
    q.y = snoise(p + vec2(1.0, time * 0.1));

    vec2 r = vec2(0.0);
    r.x = snoise(p + 1.0 * q + vec2(1.7, 9.2) + time * 0.15);
    r.y = snoise(p + 1.0 * q + vec2(8.3, 2.8) + time * 0.126);

    float noise = snoise(p + 1.0 * r + time * 0.1);
    return noise;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= uResolution.x / uResolution.y;

    // Mouse interaction
    vec2 mouse = uMouse * 2.0 - 1.0;
    float mouseDist = length(p - mouse);
    float mouseInfluence = smoothstep(0.5, 0.0, mouseDist) * 0.3;

    // Create flowing noise with domain warping
    float noise1 = domainWarp(p * 1.5, uTime * 0.5);
    float noise2 = domainWarp(p * 2.0 + 100.0, uTime * 0.3);
    float noise3 = domainWarp(p * 0.8 - 50.0, uTime * 0.7);

    // Combine noise layers
    float finalNoise = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2;
    finalNoise += mouseInfluence;

    // Create cinematic color scheme (dark with flowing streaks)
    vec3 darkColor = vec3(0.05, 0.05, 0.05); // #0d0d0d
    vec3 accent1 = vec3(0.12, 0.08, 0.15);   // Deep purple
    vec3 accent2 = vec3(0.08, 0.12, 0.18);   // Deep blue
    vec3 accent3 = vec3(0.15, 0.10, 0.08);   // Warm accent

    // Mix colors based on noise
    vec3 color = mix(darkColor, accent1, smoothstep(-0.5, 0.5, finalNoise));
    color = mix(color, accent2, smoothstep(-0.3, 0.7, finalNoise * 1.2));
    color = mix(color, accent3, smoothstep(0.2, 1.0, finalNoise));

    // Add flowing streaks
    float streaks = sin(p.y * 10.0 + uTime * 0.3 + finalNoise * 5.0) * 0.5 + 0.5;
    color += vec3(0.02) * streaks * smoothstep(0.3, 0.8, finalNoise);

    // Add subtle highlights
    float highlights = smoothstep(0.6, 0.9, finalNoise);
    color += vec3(0.05, 0.05, 0.08) * highlights;

    // Vignette
    float vignette = 1.0 - smoothstep(0.5, 1.5, length(p));
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
  }
`

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

function ShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2() },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    []
  )

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      material.uniforms.uTime.value = state.clock.elapsedTime
      material.uniforms.uResolution.value.set(
        state.size.width * state.viewport.dpr,
        state.size.height * state.viewport.dpr
      )
    }
  })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = {
        x: event.clientX / window.innerWidth,
        y: 1.0 - event.clientY / window.innerHeight
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    const updateMouse = () => {
      if (meshRef.current) {
        const material = meshRef.current.material as THREE.ShaderMaterial
        material.uniforms.uMouse.value.set(
          mouseRef.current.x,
          mouseRef.current.y
        )
      }
      requestAnimationFrame(updateMouse)
    }

    updateMouse()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

export default function ShaderBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  )
}
