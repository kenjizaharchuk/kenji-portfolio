import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectCube } from './ProjectCube';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Neural Interface Dashboard",
    description: "A real-time visualization platform for neural network training metrics with interactive 3D graphs and adaptive learning rate displays.",
  },
  {
    title: "Quantum Computing Simulator",
    description: "Browser-based quantum circuit designer and simulator supporting up to 20 qubits with visual state vector representation.",
  },
  {
    title: "Autonomous Fleet Manager",
    description: "Real-time monitoring and control system for autonomous vehicle fleets with predictive maintenance and route optimization.",
  },
  {
    title: "Climate Data Visualization",
    description: "Interactive globe visualization of climate change data spanning 150 years, featuring temporal scrubbing and regional analysis.",
  },
  {
    title: "Biometric Authentication SDK",
    description: "Multi-modal biometric authentication library supporting facial recognition, fingerprint, and behavioral analysis.",
  },
  {
    title: "Distributed Ledger Platform",
    description: "Enterprise blockchain solution with smart contract deployment, real-time transaction monitoring, and consensus visualization.",
  },
];

export function Projects3DSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cubeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cubes = cubeRefs.current.filter(Boolean) as HTMLDivElement[];
    
    cubes.forEach((cube, index) => {
      // Initial far-away state
      const startZ = -1000 - (index * 150); // Stagger depth
      const startScale = 0.15;
      const startRotateX = 15 + Math.random() * 10;
      const startRotateY = -20 + Math.random() * 40;
      const startX = -50 + Math.random() * 100;
      const startY = 30 + Math.random() * 40;

      // Set initial state
      gsap.set(cube, {
        z: startZ,
        scale: startScale,
        rotateX: startRotateX,
        rotateY: startRotateY,
        x: startX,
        y: startY,
        opacity: 0,
      });

      // Create scroll-triggered animation for each cube
      gsap.to(cube, {
        z: 0,
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        x: 0,
        y: 0,
        opacity: 1,
        ease: 'none', // Linear for scrub
        scrollTrigger: {
          trigger: cube,
          start: `top+=${index * 100} bottom+=200`, // Stagger start points
          end: `top+=${index * 100} center-=100`,
          scrub: 1.5, // Smooth scrub
          // markers: true, // Uncomment for debugging
        },
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[200vh] py-32 px-4 sm:px-6"
    >
      {/* Scene container with perspective */}
      <div 
        className="projects-scene max-w-4xl mx-auto"
        style={{
          perspective: '1400px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* Section header */}
        <div className="mb-32 space-y-4" style={{ transformStyle: 'preserve-3d' }}>
          <p className="font-mono text-sm tracking-widest uppercase bg-gradient-to-r from-muted-foreground via-foreground/80 to-muted-foreground bg-clip-text text-transparent">
            Selected Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-muted-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
            Projects
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-border via-muted-foreground/40 to-transparent" />
        </div>

        {/* Projects container with preserve-3d */}
        <div 
          className="projects-container space-y-24 md:space-y-32"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {projects.map((project, index) => (
            <ProjectCube
              key={project.title}
              ref={(el) => { cubeRefs.current[index] = el; }}
              title={project.title}
              description={project.description}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-48 text-center">
        <p className="text-muted-foreground text-sm">
          © 2024 Kenji Zaharchuk. All rights reserved.
        </p>
      </footer>
    </section>
  );
}
