import { forwardRef } from 'react';

interface ProjectCubeProps {
  title: string;
  description: string;
  index: number;
}

export const ProjectCube = forwardRef<HTMLDivElement, ProjectCubeProps>(
  ({ title, description, index }, ref) => {
    // Cube dimensions
    const cubeDepth = 40; // thickness of the cube

    return (
      <div
        ref={ref}
        className="project-cube will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          position: 'relative',
        }}
      >
        {/* Front face - main content */}
        <a
          href="#"
          className="cube-face cube-front block relative overflow-hidden"
          style={{
            transform: `translateZ(${cubeDepth / 2}px)`,
            backfaceVisibility: 'hidden',
          }}
        >
          <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-end">
            <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-2">
              Project {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 leading-tight">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
          
          {/* Metallic edge highlight */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, hsl(220 20% 35% / 0.3) 0%, transparent 50%)',
            }}
          />
          
          {/* Bottom edge */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, hsl(220 20% 40% / 0.5) 50%, transparent 100%)',
            }}
          />
        </a>

        {/* Right side face */}
        <div
          className="cube-face cube-right absolute top-0 h-full"
          style={{
            width: `${cubeDepth}px`,
            right: `-${cubeDepth / 2}px`,
            transform: `rotateY(90deg)`,
            transformOrigin: 'left center',
            backfaceVisibility: 'hidden',
          }}
        />

        {/* Top face */}
        <div
          className="cube-face cube-top absolute left-0 w-full"
          style={{
            height: `${cubeDepth}px`,
            top: `-${cubeDepth / 2}px`,
            transform: `rotateX(90deg)`,
            transformOrigin: 'center bottom',
            backfaceVisibility: 'hidden',
          }}
        />
      </div>
    );
  }
);

ProjectCube.displayName = 'ProjectCube';
