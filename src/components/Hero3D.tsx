import { useRef, useState, useCallback, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree, ThreeEvent } from '@react-three/fiber';
import { Text3D, Center, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

function Name3D() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  
  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [hasPlayedIntro, setHasPlayedIntro] = useState(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const introProgress = useRef(0);
  
  // Larger on desktop, responsive scaling
  const scale = Math.min(viewport.width / 14, 0.85);

  const handlePointerDown = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    (e.target as any)?.setPointerCapture?.(e.pointerId);
    setIsDragging(true);
    lastMouse.current = { x: e.clientX || 0, y: e.clientY || 0 };
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

    // One-time intro motion cue
    if (!hasPlayedIntro && introProgress.current < 1) {
      introProgress.current += delta * 0.4;
      if (introProgress.current >= 1) {
        introProgress.current = 1;
        setHasPlayedIntro(true);
      }
      
      // Smooth tilt and return
      const t = introProgress.current;
      const introEase = t < 0.5 
        ? 4 * t * t * t 
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
      
      if (t < 0.5) {
        currentRotation.current.y = introEase * 0.15;
        currentRotation.current.x = introEase * 0.08;
      } else {
        currentRotation.current.y = (1 - introEase) * 0.15 + introEase * 0;
        currentRotation.current.x = (1 - introEase) * 0.08 + introEase * 0;
      }
    } else if (isDragging) {
      // Direct rotation while dragging
      currentRotation.current.x = THREE.MathUtils.lerp(
        currentRotation.current.x,
        targetRotation.current.x,
        0.15
      );
      currentRotation.current.y = THREE.MathUtils.lerp(
        currentRotation.current.y,
        targetRotation.current.y,
        0.15
      );
    } else {
      // Apply inertia and slowly return to center
      targetRotation.current.x += velocity.x;
      targetRotation.current.y += velocity.y;
      
      // Velocity decay - faster for more damped feel
      setVelocity(v => ({
        x: v.x * 0.95,
        y: v.y * 0.95
      }));
      
      // Faster ease back to center - physically damped, not floaty
      targetRotation.current.x = THREE.MathUtils.lerp(targetRotation.current.x, 0, 0.025);
      targetRotation.current.y = THREE.MathUtils.lerp(targetRotation.current.y, 0, 0.025);
      
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
      
      // Even slower, subtler idle animation (40% slower)
      const idleX = Math.sin(state.clock.elapsedTime * 0.06) * 0.018;
      const idleY = Math.sin(state.clock.elapsedTime * 0.04) * 0.012;
      
      if (Math.abs(velocity.x) < 0.001 && Math.abs(velocity.y) < 0.001 && hasPlayedIntro) {
        currentRotation.current.x += idleX * 0.05;
        currentRotation.current.y += idleY * 0.05;
      }
    }

    groupRef.current.rotation.x = currentRotation.current.x;
    groupRef.current.rotation.y = currentRotation.current.y;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <group
        ref={groupRef}
        scale={scale}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <Center position={[0.2, 0, 0]}>
          <Text3D
            font="/fonts/helvetiker_bold.typeface.json"
            size={1}
            height={0.35}
            curveSegments={48}
            bevelEnabled
            bevelThickness={0.06}
            bevelSize={0.05}
            bevelOffset={0}
            bevelSegments={16}
          >
            KENJI ZAHARCHUK
            <meshStandardMaterial
              color="#f0f4f8"
              metalness={0.88}
              roughness={0.15}
              envMapIntensity={2.2}
            />
          </Text3D>
        </Center>
      </group>
    </Float>
  );
}

// 3D Chevron scroll indicator - positioned at bottom of viewport
function ScrollChevron() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  
  // Position at bottom of viewport
  const yPosition = -viewport.height / 2 + 0.8;
  
  useFrame((state) => {
    if (!groupRef.current) return;
    // Slow, subtle vertical bobbing motion
    groupRef.current.position.y = yPosition + Math.sin(state.clock.elapsedTime * 0.8) * 0.12;
  });

  // Create chevron shape
  const chevronShape = new THREE.Shape();
  const w = 0.35;
  const h = 0.18;
  const t = 0.05;
  
  chevronShape.moveTo(-w, h);
  chevronShape.lineTo(-w + t, h + t);
  chevronShape.lineTo(0, t);
  chevronShape.lineTo(w - t, h + t);
  chevronShape.lineTo(w, h);
  chevronShape.lineTo(0, -h);
  chevronShape.lineTo(-w, h);

  const extrudeSettings = {
    steps: 1,
    depth: 0.06,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.018,
    bevelSegments: 8,
  };

  return (
    <group ref={groupRef} position={[0, yPosition, 0]} rotation={[0.15, 0, 0]}>
      <mesh>
        <extrudeGeometry args={[chevronShape, extrudeSettings]} />
        <meshStandardMaterial
          color="#d0dce8"
          metalness={0.9}
          roughness={0.18}
          envMapIntensity={2.0}
        />
      </mesh>
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 8]} intensity={2.5} color="#ffffff" />
      <directionalLight position={[-8, -5, -8]} intensity={0.8} color="#90d5f0" />
      <pointLight position={[0, 5, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, 0, -5]} intensity={0.6} color="#7fd5e8" />
      <pointLight position={[5, -5, 8]} intensity={1.0} color="#ffffff" />
      <pointLight position={[0, 0, 15]} intensity={0.8} color="#f8fafc" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.5}
        penumbra={1}
        intensity={1.0}
        color="#f0f4f8"
      />
    </>
  );
}

export function Hero3D() {
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const cursorClass = isDragging 
    ? 'cursor-grabbing' 
    : isHovering 
      ? 'cursor-grab' 
      : 'cursor-default';

  return (
    <section className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        className={cursorClass}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        onPointerOver={() => setIsHovering(true)}
        onPointerOut={() => { setIsHovering(false); setIsDragging(false); }}
        onPointerDown={() => setIsDragging(true)}
        onPointerUp={() => setIsDragging(false)}
      >
        <Environment preset="city" />
        <Lights />
        <Suspense fallback={null}>
          <Name3D />
          <ScrollChevron />
        </Suspense>
      </Canvas>
    </section>
  );
}