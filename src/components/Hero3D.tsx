import { useRef, useState, useCallback, Suspense } from 'react';
import { Canvas, useFrame, useThree, ThreeEvent } from '@react-three/fiber';
import { Text3D, Center, Environment } from '@react-three/drei';
import * as THREE from 'three';

function Name3D() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  
  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const lastMouse = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  
  const scale = Math.min(viewport.width / 18, 0.7);

  const handlePointerDown = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    (e.target as any)?.setPointerCapture?.(e.pointerId);
    setIsDragging(true);
    lastMouse.current = { x: (e as any).clientX || 0, y: (e as any).clientY || 0 };
    setVelocity({ x: 0, y: 0 });
  }, []);

  const handlePointerMove = useCallback((e: ThreeEvent<PointerEvent>) => {
    if (!isDragging) return;
    
    const clientX = e.clientX || 0;
    const clientY = e.clientY || 0;
    const deltaX = clientX - lastMouse.current.x;
    const deltaY = clientY - lastMouse.current.y;
    
    targetRotation.current.y += deltaX * 0.008;
    targetRotation.current.x += deltaY * 0.008;
    
    setVelocity({ x: deltaX * 0.008, y: deltaY * 0.008 });
    lastMouse.current = { x: clientX, y: clientY };
  }, [isDragging]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (isDragging) {
      // Direct rotation while dragging
      currentRotation.current.x = THREE.MathUtils.lerp(
        currentRotation.current.x,
        targetRotation.current.x,
        0.2  // Slower drag response
      );
      currentRotation.current.y = THREE.MathUtils.lerp(
        currentRotation.current.y,
        targetRotation.current.y,
        0.2
      );
    } else {
      // Apply inertia and slowly return to center
      targetRotation.current.x += velocity.x;
      targetRotation.current.y += velocity.y;
      
      // Slower velocity decay (30-40% slower)
      setVelocity(v => ({
        x: v.x * 0.97,
        y: v.y * 0.97
      }));
      
      // Much slower ease back to original position (30-40% slower)
      targetRotation.current.x = THREE.MathUtils.lerp(targetRotation.current.x, 0, 0.012);
      targetRotation.current.y = THREE.MathUtils.lerp(targetRotation.current.y, 0, 0.012);
      
      currentRotation.current.x = THREE.MathUtils.lerp(
        currentRotation.current.x,
        targetRotation.current.x,
        0.05  // Slower easing
      );
      currentRotation.current.y = THREE.MathUtils.lerp(
        currentRotation.current.y,
        targetRotation.current.y,
        0.05
      );
      
      // Slower, subtler idle animation (30-40% slower)
      const idleX = Math.sin(state.clock.elapsedTime * 0.1) * 0.025;
      const idleY = Math.sin(state.clock.elapsedTime * 0.07) * 0.015;
      
      if (Math.abs(velocity.x) < 0.001 && Math.abs(velocity.y) < 0.001) {
        currentRotation.current.x += idleX * 0.08;
        currentRotation.current.y += idleY * 0.08;
      }
    }

    groupRef.current.rotation.x = currentRotation.current.x;
    groupRef.current.rotation.y = currentRotation.current.y;
    
    // Slower floating motion (30-40% slower)
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.04;
  });

  return (
    <group
      ref={groupRef}
      scale={scale}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <Center>
        <Text3D
          font="/fonts/helvetiker_bold.typeface.json"
          size={1}
          height={0.3}
          curveSegments={32}
          bevelEnabled
          bevelThickness={0.04}
          bevelSize={0.035}
          bevelOffset={0}
          bevelSegments={12}
        >
          KENJI ZAHARCHUK
          <meshStandardMaterial
            color="#e0e8ef"
            metalness={0.92}
            roughness={0.12}
            envMapIntensity={1.8}
          />
        </Text3D>
      </Center>
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 8]} intensity={2.2} color="#ffffff" />
      <directionalLight position={[-8, -5, -8]} intensity={0.6} color="#80c5e8" />
      <pointLight position={[0, 5, 10]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-10, 0, -5]} intensity={0.5} color="#6fd1e5" />
      <pointLight position={[5, -5, 8]} intensity={0.8} color="#ffffff" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.5}
        penumbra={1}
        intensity={0.8}
        color="#f0f4f8"
      />
    </>
  );
}

export function Hero3D() {
  return (
    <section className="h-screen w-full relative flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        className="cursor-grab active:cursor-grabbing"
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Environment preset="city" />
        <Lights />
        <Suspense fallback={null}>
          <Name3D />
        </Suspense>
      </Canvas>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-float">
        <span className="text-muted-foreground text-sm tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent" />
      </div>
    </section>
  );
}
