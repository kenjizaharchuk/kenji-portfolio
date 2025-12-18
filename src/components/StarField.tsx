import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Custom shader for twinkling stars
const starVertexShader = `
  attribute float size;
  attribute float twinkleSpeed;
  attribute float twinkleOffset;
  varying float vTwinkleSpeed;
  varying float vTwinkleOffset;
  varying float vSize;
  
  void main() {
    vTwinkleSpeed = twinkleSpeed;
    vTwinkleOffset = twinkleOffset;
    vSize = size;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const starFragmentShader = `
  uniform float time;
  varying float vTwinkleSpeed;
  varying float vTwinkleOffset;
  varying float vSize;
  
  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    
    float twinkle = 0.5 + 0.5 * sin(time * vTwinkleSpeed + vTwinkleOffset);
    float brightness = mix(0.4, 1.0, twinkle);
    
    float alpha = smoothstep(0.5, 0.0, dist) * brightness;
    vec3 color = mix(vec3(0.7, 0.85, 0.95), vec3(1.0), twinkle * 0.3);
    
    gl_FragColor = vec4(color, alpha * 0.9);
  }
`;

function Stars() {
  const ref = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const [geometry, uniforms] = useMemo(() => {
    const count = 6000;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const twinkleSpeeds = new Float32Array(count);
    const twinkleOffsets = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Distribute stars in a sphere around the viewer
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 30 + Math.random() * 70;
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      sizes[i] = 0.3 + Math.random() * 1.5;
      twinkleSpeeds[i] = 0.3 + Math.random() * 2;
      twinkleOffsets[i] = Math.random() * Math.PI * 2;
    }
    
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('twinkleSpeed', new THREE.BufferAttribute(twinkleSpeeds, 1));
    geo.setAttribute('twinkleOffset', new THREE.BufferAttribute(twinkleOffsets, 1));
    
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
      ref.current.rotation.y = state.clock.elapsedTime * 0.003;
      ref.current.rotation.x = state.clock.elapsedTime * 0.001;
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
    const count = 8000;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const radius = 25 + Math.random() * 40;
      const spread = (Math.random() - 0.5) * 6;
      
      positions[i3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 15;
      positions[i3 + 1] = spread + (Math.random() - 0.5) * 2;
      positions[i3 + 2] = Math.sin(angle) * radius * 0.25 - 60;
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.001;
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
        color="#5a7a90"
        transparent
        opacity={0.15}
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
    const count = 3000;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 80 + Math.random() * 40;
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.001;
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
        color="#8aa5b5"
        transparent
        opacity={0.3}
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
        <Stars />
        <DistantStars />
        <MilkyWay />
      </Canvas>
    </div>
  );
}
