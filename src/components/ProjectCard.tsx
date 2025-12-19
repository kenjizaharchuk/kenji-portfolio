import { useEffect, useRef, useState, useMemo } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  index: number;
}

export function ProjectCard({ title, description, image, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  
  // Generate controlled random variations for each card
  const variations = useMemo(() => {
    const seed = index * 137.5;
    const random = (offset: number) => {
      const x = Math.sin(seed + offset) * 10000;
      return x - Math.floor(x);
    };
    
    // Slight initial rotation for variety
    const rotateX = (random(1) - 0.5) * 10;
    const rotateY = (random(2) - 0.5) * 8;
    
    // Staggered timing based on index
    const staggerDelay = index * 0.15;
    
    return { rotateX, rotateY, staggerDelay };
  }, [index]);

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress: starts when card enters viewport, completes when fully visible
      // Slow reveal - takes more scroll distance
      const startPoint = windowHeight * 1.1;
      const endPoint = windowHeight * 0.25;
      
      const cardCenter = rect.top + rect.height / 2;
      
      // Stagger effect - each card starts animation slightly later
      const staggerOffset = variations.staggerDelay * windowHeight * 0.15;
      const adjustedCardCenter = cardCenter + staggerOffset;
      
      let rawProgress = (startPoint - adjustedCardCenter) / (startPoint - endPoint);
      rawProgress = Math.max(0, Math.min(1, rawProgress));
      
      setProgress(rawProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [variations.staggerDelay]);

  // Smooth easing function for cinematic feel
  const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
  const easedProgress = easeOutQuart(progress);

  // Depth-based reveal: start from far away (small), come toward viewer (full size)
  const startScale = 0.3;
  const currentScale = startScale + (1 - startScale) * easedProgress;
  
  // Z-translation for depth effect (CSS perspective will handle visual depth)
  const startZ = -200;
  const currentZ = startZ * (1 - easedProgress);
  
  // Rotation eases to neutral
  const currentRotateX = variations.rotateX * (1 - easedProgress);
  const currentRotateY = variations.rotateY * (1 - easedProgress);

  // Floating animation at rest (only when fully revealed)
  const floatAmount = easedProgress > 0.95 ? 'translateY(var(--float-y, 0px))' : '';

  const style: React.CSSProperties = {
    transform: `perspective(1000px) translateZ(${currentZ}px) scale(${currentScale}) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) ${floatAmount}`,
    opacity: easedProgress,
    transition: 'none',
  };

  return (
    <div
      ref={cardRef}
      style={style}
      className="will-change-transform card-float"
    >
      <div className="group relative bg-gradient-to-br from-card via-card to-secondary/20 rounded-2xl overflow-hidden card-3d transition-shadow duration-700">
        {/* Metallic edge highlight */}
        <div className="absolute inset-0 rounded-2xl border border-[#4a5a6a]/30 pointer-events-none" />
        <div className="absolute inset-[1px] rounded-2xl border border-[#8090a0]/10 pointer-events-none" />
        
        {/* Image */}
        <div className="aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-80" />
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-3 relative z-10">
          <h3 className="text-xl font-semibold bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent group-hover:from-primary group-hover:to-foreground transition-all duration-500">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
          
          {/* Hover line */}
          <div className="h-px w-0 bg-gradient-to-r from-primary via-primary to-transparent group-hover:w-full transition-all duration-700 ease-out" />
        </div>
        
        {/* Depth/thickness illusion - bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2a3a4a] via-[#3a4a5a] to-[#2a3a4a] rounded-b-2xl" />
        
        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#506070]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
    </div>
  );
}