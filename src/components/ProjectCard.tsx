import { useEffect, useRef, useState, useMemo } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  index: number;
}

export function ProjectCard({ title, description, image, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Generate controlled random variations for each card
  const variations = useMemo(() => {
    // Seeded pseudo-random based on index for consistency
    const seed = index * 137.5;
    const random = (offset: number) => {
      const x = Math.sin(seed + offset) * 10000;
      return x - Math.floor(x);
    };
    
    // Alternate sides with offset from edge
    const isLeft = index % 2 === 0;
    const translateX = isLeft 
      ? -150 - random(1) * 100 
      : 150 + random(2) * 100;
    
    // Varied vertical offset
    const translateY = (random(3) - 0.5) * 60;
    
    // Subtle rotation (-8 to 8 degrees)
    const rotate = (random(4) - 0.5) * 16;
    
    // Staggered delay based on position
    const delay = 200 + index * 150;
    
    // Animation duration with slight variation
    const duration = 1200 + random(5) * 400;
    
    return { translateX, translateY, rotate, delay, duration, isLeft };
  }, [index]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const initialStyle: React.CSSProperties = {
    transform: `translate(${variations.translateX}px, ${variations.translateY}px) rotate(${variations.rotate}deg)`,
    opacity: 0,
  };

  const visibleStyle: React.CSSProperties = {
    transform: 'translate(0px, 0px) rotate(0deg)',
    opacity: 1,
    transition: `all ${variations.duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
    transitionDelay: `${variations.delay}ms`,
  };

  return (
    <div
      ref={cardRef}
      style={isVisible ? visibleStyle : initialStyle}
    >
      <div className="group relative bg-card rounded-lg overflow-hidden card-glow transition-all duration-700">
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
