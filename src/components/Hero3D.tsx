import { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text3D, Center, Float } from '@react-three/drei';
import * as THREE from 'three';

function Name3D() {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { viewport } = useThree();
  
  const scale = Math.min(viewport.width / 12, 1);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle idle animation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.02;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={0.3}
    >
      <group
        ref={groupRef}
        scale={scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <Center>
          <Text3D
            font="/fonts/helvetiker_bold.typeface.json"
            size={1}
            height={0.3}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            KENJI
            <meshStandardMaterial
              color={hovered ? "#4fd1c5" : "#e2e8f0"}
              metalness={0.3}
              roughness={0.4}
              emissive={hovered ? "#4fd1c5" : "#4fd1c5"}
              emissiveIntensity={hovered ? 0.4 : 0.15}
            />
          </Text3D>
        </Center>
        <Center position={[0, -1.4, 0]}>
          <Text3D
            font="/fonts/helvetiker_bold.typeface.json"
            size={1}
            height={0.3}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            ZAHARCHUK
            <meshStandardMaterial
              color={hovered ? "#4fd1c5" : "#e2e8f0"}
              metalness={0.3}
              roughness={0.4}
              emissive={hovered ? "#4fd1c5" : "#4fd1c5"}
              emissiveIntensity={hovered ? 0.4 : 0.15}
            />
          </Text3D>
        </Center>
      </group>
    </Float>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#4fd1c5" />
      <pointLight position={[0, 0, 10]} intensity={0.5} color="#4fd1c5" />
    </>
  );
}

export function Hero3D() {
  return (
    <section className="h-screen w-full relative flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        className="cursor-grab active:cursor-grabbing"
        dpr={[1, 2]}
      >
        <Lights />
        <Name3D />
      </Canvas>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-float">
        <span className="text-muted-foreground text-sm tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent" />
      </div>
    </section>
  );
}
