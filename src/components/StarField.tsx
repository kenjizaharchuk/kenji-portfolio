import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Sharp star shader with lens flare sparkle for larger stars
const starVertexShader = `
  attribute float size;
  attribute float brightness;
  attribute float isLarge;
  varying float vBrightness;
  varying float vSize;
  varying float vIsLarge;
  
  void main() {
    vBrightness = brightness;
    vSize = size;
    vIsLarge = isLarge;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (400.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const starFragmentShader = `
  uniform float time;
  varying float vBrightness;
  varying float vSize;
  varying float vIsLarge;
  
  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float dist = length(uv);
    
    // Sharp point core
    float core = 1.0 - smoothstep(0.0, 0.08, dist);
    
    // Subtle glow around core
    float glow = exp(-dist * 12.0) * 0.25;
    
    // Lens flare / diffraction spikes for large stars only
    float spikes = 0.0;
    if (vIsLarge > 0.5) {
      // Very slow twinkle only on large stars
      float twinkle = 0.9 + 0.1 * sin(time * 0.2 + vBrightness * 6.28);
      
      // 4-point star diffraction pattern - sharper
      float angle1 = abs(uv.x) + abs(uv.y);
      float angle2 = abs(uv.x - uv.y) + abs(uv.x + uv.y);
      float spike1 = exp(-angle1 * 18.0) * 0.7;
      float spike2 = exp(-angle2 * 22.0) * 0.4;
      spikes = (spike1 + spike2) * twinkle;
    }
    
    float alpha = (core + glow + spikes) * vBrightness;
    
    // Crisp white for stars
    vec3 color = vec3(0.98, 0.99, 1.0);
    
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(color, alpha);
  }
`;

function Stars() {
  const ref = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const [geometry, uniforms] = useMemo(() => {
    const count = 600;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const brightnesses = new Float32Array(count);
    const isLarge = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 45 + Math.random() * 55;
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Most stars small and sharp, few are larger with flares
      const isLargeStar = Math.random() > 0.94;
      sizes[i] = isLargeStar ? 2.0 + Math.random() * 1.5 : 0.5 + Math.random() * 0.5;
      brightnesses[i] = isLargeStar ? 0.95 + Math.random() * 0.05 : 0.6 + Math.random() * 0.3;
      isLarge[i] = isLargeStar ? 1.0 : 0.0;
    }
    
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('brightness', new THREE.BufferAttribute(brightnesses, 1));
    geo.setAttribute('isLarge', new THREE.BufferAttribute(isLarge, 1));
    
    const unis = {
      time: { value: 0 }
    };
    
    return [geo, unis];
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.0015;
      ref.current.rotation.x = state.clock.elapsedTime * 0.0005;
    }
  });

  return (
    <points ref={ref} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={starVertexShader}
        fragmentShader={starFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function MilkyWay() {
  const ref = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const count = 18000;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const t = Math.random();
      
      // Wider diagonal band from bottom-left to top-right
      const bandWidth = 18 + Math.random() * 12;
      const spread = (Math.random() - 0.5) * bandWidth;
      
      // Position along diagonal
      const x = -80 + t * 160 + (Math.random() - 0.5) * 30;
      const y = -40 + t * 80 + spread;
      const z = -120 - Math.random() * 40; // Very far behind
      
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.0003;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#8aa8c8"
        transparent
        opacity={0.12}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function DistantStars() {
  const ref = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const count = 300;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 95 + Math.random() * 25;
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.0004;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#b0c5d8"
        transparent
        opacity={0.2}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export function StarField() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/10" />
      <Canvas
        camera={{ position: [0, 0, 20], fov: 75 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true }}
      >
        <MilkyWay />
        <DistantStars />
        <Stars />
      </Canvas>
    </div>
  );
}