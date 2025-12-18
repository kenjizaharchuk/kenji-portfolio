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
    
    // Alternate sides with offset from edge
    const isLeft = index % 2 === 0;
    const translateX = isLeft 
      ? -180 - random(1) * 80 
      : 180 + random(2) * 80;
    
    // Varied vertical offset
    const translateY = (random(3) - 0.5) * 50;
    
    // Subtle rotation (-6 to 6 degrees)
    const rotate = (random(4) - 0.5) * 12;
    
    // Slight scale variation
    const scaleStart = 0.85 + random(5) * 0.1;
    
    return { translateX, translateY, rotate, scaleStart, isLeft };
  }, [index]);

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress: 0 when card bottom enters viewport, 1 when card top reaches center
      const startPoint = windowHeight; // Card bottom at viewport bottom
      const endPoint = windowHeight * 0.3; // Card top at 30% from top
      
      const cardCenter = rect.top + rect.height / 2;
      
      // Calculate raw progress
      let rawProgress = (startPoint - cardCenter) / (startPoint - endPoint);
      rawProgress = Math.max(0, Math.min(1, rawProgress));
      
      setProgress(rawProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth easing function for premium feel
  const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
  const easedProgress = easeOutQuart(progress);

  // Calculate current transform values based on scroll progress
  const currentTranslateX = variations.translateX * (1 - easedProgress);
  const currentTranslateY = variations.translateY * (1 - easedProgress);
  const currentRotate = variations.rotate * (1 - easedProgress);
  const currentScale = variations.scaleStart + (1 - variations.scaleStart) * easedProgress;

  const style: React.CSSProperties = {
    transform: `translate(${currentTranslateX}px, ${currentTranslateY}px) rotate(${currentRotate}deg) scale(${currentScale})`,
    opacity: easedProgress,
    transition: 'none', // No transition - purely scroll-driven
  };

  return (
    <div
      ref={cardRef}
      style={style}
      className="will-change-transform"
    >
      <div className="group relative bg-card rounded-lg overflow-hidden card-glow transition-shadow duration-700">
        {/* Image */}
        <div className="aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-70" />
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-3">
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-500">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
          
          {/* Hover line */}
          <div className="h-px w-0 bg-primary group-hover:w-full transition-all duration-700 ease-out" />
        </div>
        
        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
    </div>
  );
}
