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
        0.3
      );
      currentRotation.current.y = THREE.MathUtils.lerp(
        currentRotation.current.y,
        targetRotation.current.y,
        0.3
      );
    } else {
      // Apply inertia and slowly return to center
      targetRotation.current.x += velocity.x;
      targetRotation.current.y += velocity.y;
      
      // Decay velocity
      setVelocity(v => ({
        x: v.x * 0.95,
        y: v.y * 0.95
      }));
      
      // Slowly ease back to original position
      targetRotation.current.x = THREE.MathUtils.lerp(targetRotation.current.x, 0, 0.02);
      targetRotation.current.y = THREE.MathUtils.lerp(targetRotation.current.y, 0, 0.02);
      
      currentRotation.current.x = THREE.MathUtils.lerp(
        currentRotation.current.x,
        targetRotation.current.x,
        0.08
      );
      currentRotation.current.y = THREE.MathUtils.lerp(
        currentRotation.current.y,
        targetRotation.current.y,
        0.08
      );
      
      // Subtle idle animation when not interacting
      const idleX = Math.sin(state.clock.elapsedTime * 0.15) * 0.03;
      const idleY = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
      
      if (Math.abs(velocity.x) < 0.001 && Math.abs(velocity.y) < 0.001) {
        currentRotation.current.x += idleX * 0.1;
        currentRotation.current.y += idleY * 0.1;
      }
    }

    groupRef.current.rotation.x = currentRotation.current.x;
    groupRef.current.rotation.y = currentRotation.current.y;
    
    // Subtle floating motion
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
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
          height={0.25}
          curveSegments={24}
          bevelEnabled
          bevelThickness={0.015}
          bevelSize={0.015}
          bevelOffset={0}
          bevelSegments={8}
        >
          KENJI ZAHARCHUK
          <meshStandardMaterial
            color="#c0c8d0"
            metalness={0.95}
            roughness={0.15}
            envMapIntensity={1.2}
          />
        </Text3D>
      </Center>
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[10, 10, 8]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-8, -5, -8]} intensity={0.4} color="#60a5c8" />
      <pointLight position={[0, 5, 10]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-10, 0, -5]} intensity={0.3} color="#4fd1c5" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.5}
        penumbra={1}
        intensity={0.5}
        color="#e0e8f0"
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
