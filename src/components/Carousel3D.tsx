import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { gsap } from 'gsap';
import * as THREE from 'three';

// Project data - placeholder for now
const projects = [
  { id: 1, title: "Neural Interface", subtitle: "Dashboard", color: "#3b82f6" },
  { id: 2, title: "Quantum Sim", subtitle: "Computing", color: "#10b981" },
  { id: 3, title: "Fleet Manager", subtitle: "Autonomous", color: "#f59e0b" },
  { id: 4, title: "Climate Viz", subtitle: "Data", color: "#ef4444" },
  { id: 5, title: "Biometric SDK", subtitle: "Security", color: "#8b5cf6" },
];

// Configuration
const RADIUS = 4;
const ARC_ANGLE = Math.PI * 0.5; // 90° arc - tighter for better visibility
const CARD_WIDTH = 2.4;
const CARD_HEIGHT = 1.6;

interface CarouselCardProps {
  project: typeof projects[0];
  index: number;
  activeIndex: number;
  totalCards: number;
  onClick: () => void;
}

function CarouselCard({ project, index, activeIndex, totalCards, onClick }: CarouselCardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const isActive = index === activeIndex;
  
  // Calculate position on the arc
  const angleStep = ARC_ANGLE / (totalCards - 1);
  const baseAngle = -ARC_ANGLE / 2 + index * angleStep;
  
  // Position using cylindrical coordinates
  const x = Math.sin(baseAngle) * RADIUS;
  const z = Math.cos(baseAngle) * RADIUS - RADIUS; // Offset so center card is at z=0
  
  // Rotate card to face slightly toward center
  const rotationY = -baseAngle * 0.7;

  // Smooth opacity transition
  useFrame(() => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      const targetOpacity = isActive ? 1 : 0.4;
      material.opacity += (targetOpacity - material.opacity) * 0.1;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[x, 0, z]}
      rotation={[0, rotationY, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <planeGeometry args={[CARD_WIDTH, CARD_HEIGHT]} />
      <meshStandardMaterial
        color={project.color}
        transparent
        opacity={isActive ? 1 : 0.4}
        side={THREE.DoubleSide}
      />
      {/* Card border/frame */}
      <lineSegments position={[0, 0, 0.001]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(CARD_WIDTH, CARD_HEIGHT)]} />
        <lineBasicMaterial color="#ffffff" opacity={0.3} transparent />
      </lineSegments>
      {/* Project title */}
      <Text
        position={[0, 0.2, 0.01]}
        fontSize={0.18}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {project.title}
      </Text>
      <Text
        position={[0, -0.15, 0.01]}
        fontSize={0.12}
        color="#aaaaaa"
        anchorX="center"
        anchorY="middle"
      >
        {project.subtitle}
      </Text>
    </mesh>
  );
}

function CarouselScene() {
  const groupRef = useRef<THREE.Group>(null);
  const [activeIndex, setActiveIndex] = useState(Math.floor(projects.length / 2));
  
  const angleStep = ARC_ANGLE / (projects.length - 1);

  const rotateToCard = (targetIndex: number) => {
    if (!groupRef.current || targetIndex === activeIndex) return;
    
    setActiveIndex(targetIndex);
    
    // Calculate target rotation - we rotate the group so target card is at center
    const targetAngle = (targetIndex - Math.floor(projects.length / 2)) * angleStep;
    
    gsap.to(groupRef.current.rotation, {
      y: targetAngle,
      duration: 1.2,
      ease: 'power3.out',
    });
  };

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      {/* Rotating group containing all cards */}
      <group ref={groupRef} position={[0, 0, 0]}>
        {projects.map((project, index) => (
          <CarouselCard
            key={project.id}
            project={project}
            index={index}
            activeIndex={activeIndex}
            totalCards={projects.length}
            onClick={() => rotateToCard(index)}
          />
        ))}
      </group>
    </>
  );
}

export function Carousel3D() {
  return (
    <section className="relative h-screen w-full">
      {/* Section header overlay */}
      <div className="absolute top-16 left-0 right-0 z-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="font-mono text-sm tracking-widest uppercase bg-gradient-to-r from-muted-foreground via-foreground/80 to-muted-foreground bg-clip-text text-transparent">
            Selected Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-muted-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
            Projects
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-border via-muted-foreground/40 to-transparent" />
        </div>
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ 
          position: [0, 0, 5], 
          fov: 50,
        }}
        style={{ background: 'transparent' }}
      >
        <CarouselScene />
      </Canvas>

      {/* Navigation hint */}
      <div className="absolute bottom-16 left-0 right-0 z-10 text-center">
        <p className="text-muted-foreground text-sm font-mono">
          Click cards to navigate
        </p>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-muted-foreground text-sm">
          © 2024 Kenji Zaharchuk. All rights reserved.
        </p>
      </footer>
    </section>
  );
}
