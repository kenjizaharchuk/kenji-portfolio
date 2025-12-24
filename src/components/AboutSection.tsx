import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import patagoniaPhoto from '@/assets/patagonia-photo.jpg';

// Glowing rectangular frame component
const GlowingFrame = ({ opacity }: { opacity: number }) => {
  const frameRef = useRef<THREE.Group>(null);
  
  // Frame dimensions (aspect ratio roughly 16:9 to match content)
  const width = 8;
  const height = 4.5;
  
  // Create the rectangle outline points as Float32Array for BufferAttribute
  const points = new Float32Array([
    -width / 2, height / 2, 0,
    width / 2, height / 2, 0,
    width / 2, -height / 2, 0,
    -width / 2, -height / 2, 0,
    -width / 2, height / 2, 0, // Close the rectangle
  ]);
  
  return (
    <group ref={frameRef}>
      <primitive object={new THREE.Line(
        new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(points, 3)),
        new THREE.LineBasicMaterial({ color: '#ffffff', transparent: true, opacity: opacity * 0.8 })
      )} />
      {/* Inner glow line (slightly smaller, more transparent) */}
      <primitive object={new THREE.Line(
        new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(points.map((v, i) => i % 3 === 2 ? v : v * 0.98), 3)),
        new THREE.LineBasicMaterial({ color: '#ffffff', transparent: true, opacity: opacity * 0.3 })
      )} />
    </group>
  );
};

// Camera controller that responds to scroll
const CameraController = ({ scrollProgress }: { scrollProgress: number }) => {
  const { camera } = useThree();
  const targetZ = useRef(15);
  
  useFrame(() => {
    // Map scroll progress to camera Z position (15 -> 3)
    const startZ = 15;
    const endZ = 3.5;
    targetZ.current = startZ - (startZ - endZ) * scrollProgress;
    
    // Smooth easing toward target
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ.current, 0.08);
  });
  
  return null;
};

// Main 3D scene
const Scene = ({ scrollProgress }: { scrollProgress: number }) => {
  // Calculate opacity based on scroll progress (fade in as we approach)
  const frameOpacity = Math.min(1, scrollProgress * 1.5);
  
  return (
    <>
      <ambientLight intensity={0.3} />
      <CameraController scrollProgress={scrollProgress} />
      <GlowingFrame opacity={frameOpacity} />
    </>
  );
};

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far into the section we've scrolled
      // 0 = section just entering viewport from bottom
      // 1 = section fully in view (top of section at top of viewport)
      const progress = Math.max(0, Math.min(1, 
        1 - (rect.top / windowHeight)
      ));
      
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Calculate content opacity and scale based on scroll progress
  const contentOpacity = Math.max(0, (scrollProgress - 0.3) / 0.7);
  const contentScale = 0.8 + (0.2 * Math.min(1, scrollProgress / 0.8));
  
  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center"
      style={{ zIndex: 10 }}
    >
      {/* 3D Canvas for the glowing frame */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 15], fov: 50 }}
          style={{ background: 'transparent' }}
          gl={{ alpha: true }}
        >
          <Scene scrollProgress={scrollProgress} />
        </Canvas>
      </div>
      
      {/* CSS Glow effect overlay for the frame */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: contentOpacity }}
      >
        <div 
          className="w-[85vw] max-w-5xl aspect-video border border-white/40 rounded-sm"
          style={{
            boxShadow: '0 0 30px rgba(255,255,255,0.15), 0 0 60px rgba(255,255,255,0.1), inset 0 0 30px rgba(255,255,255,0.05)',
          }}
        />
      </div>
      
      {/* HTML Content Overlay */}
      <div 
        className="relative z-10 w-[85vw] max-w-5xl mx-auto px-8 md:px-12 py-12 transition-all duration-300"
        style={{ 
          opacity: contentOpacity,
          transform: `scale(${contentScale})`,
        }}
      >
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left - Text Content */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              I'm Kenji
            </h2>
            <h3 className="text-xl md:text-2xl text-foreground/80 mb-6">
              Welcome to my website!
            </h3>
            <p className="text-foreground/60 text-base md:text-lg leading-relaxed">
              I'm a creative developer passionate about building immersive digital experiences. 
              With a background in design and technology, I love exploring the intersection of 
              art and code to create memorable, interactive projects.
            </p>
            <p className="text-foreground/60 text-base md:text-lg leading-relaxed mt-4">
              When I'm not coding, you'll find me exploring mountains, experimenting with 
              new creative tools, or working on personal projects that push the boundaries 
              of what's possible on the web.
            </p>
          </div>
          
          {/* Right - Photo */}
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="relative">
              <img 
                src={patagoniaPhoto} 
                alt="Kenji in Patagonia mountains"
                className="w-64 md:w-80 h-auto rounded-2xl object-cover"
                style={{
                  boxShadow: '0 20px 50px rgba(0,0,0,0.4), 0 0 30px rgba(255,255,255,0.1)',
                }}
              />
              {/* Subtle glow behind photo */}
              <div 
                className="absolute -inset-2 rounded-2xl -z-10"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
