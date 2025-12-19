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
    
    // Very sharp point core - astronomy photo style
    float core = 1.0 - smoothstep(0.0, 0.05, dist);
    
    // Tight glow around core
    float glow = exp(-dist * 16.0) * 0.2;
    
    // Sharp cross-shaped diffraction spikes for large stars only
    float spikes = 0.0;
    if (vIsLarge > 0.5) {
      // Very slow, organic twinkle - like real stars
      float twinkle = 0.94 + 0.06 * sin(time * 0.015 + vBrightness * 6.28);
      float twinkle2 = 0.96 + 0.04 * sin(time * 0.022 + vBrightness * 3.14);
      
      // Sharp 4-point cross diffraction spikes
      float spikeX = exp(-abs(uv.y) * 35.0) * exp(-abs(uv.x) * 8.0) * 0.6;
      float spikeY = exp(-abs(uv.x) * 35.0) * exp(-abs(uv.y) * 8.0) * 0.6;
      
      // Diagonal spikes (fainter)
      float spikeDiag1 = exp(-abs(uv.x - uv.y) * 28.0) * exp(-abs(uv.x + uv.y) * 12.0) * 0.25;
      float spikeDiag2 = exp(-abs(uv.x + uv.y) * 28.0) * exp(-abs(uv.x - uv.y) * 12.0) * 0.25;
      
      spikes = (spikeX + spikeY) * twinkle + (spikeDiag1 + spikeDiag2) * twinkle2;
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
    const count = 400; // Reduced count for cleaner look
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
      
      // Fewer but larger, sharper stars - real astronomy feel
      const isLargeStar = Math.random() > 0.92;
      sizes[i] = isLargeStar ? 4.5 + Math.random() * 3.0 : 1.8 + Math.random() * 1.4;
      brightnesses[i] = isLargeStar ? 0.95 + Math.random() * 0.05 : 0.55 + Math.random() * 0.35;
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
    const count = 28000;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const t = Math.random();
      
      // Wide diagonal band - bottom-left to top-right (clockwise rotation)
      const bandWidth = 35 + Math.random() * 25;
      const spread = (Math.random() - 0.5) * bandWidth;
      
      // Diagonal running from bottom-left to top-right
      const diagX = -120 + t * 240;
      const diagY = -70 + t * 140;
      
      // Spread perpendicular to diagonal (rotated clockwise)
      const angle = Math.PI * 0.25; // 45 degrees
      const perpX = spread * Math.cos(angle);
      const perpY = spread * -Math.sin(angle);
      
      positions[i3] = diagX + perpX + (Math.random() - 0.5) * 25;
      positions[i3 + 1] = diagY + perpY + (Math.random() - 0.5) * 18;
      positions[i3 + 2] = -150 - Math.random() * 60; // Very far behind all content
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.00015;
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
        size={0.08}
        color="#a8c0d8"
        transparent
        opacity={0.22}
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
    const count = 200; // Reduced for cleaner look
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
      ref.current.rotation.y = state.clock.elapsedTime * 0.0003;
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
        color="#b0c5d8"
        transparent
        opacity={0.18}
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