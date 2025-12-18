import { useEffect, useRef, useState } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  index: number;
}

export function ProjectCard({ title, description, image, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const isEven = index % 2 === 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`
        opacity-0 transform
        ${isVisible ? (isEven ? 'animate-slide-in-left' : 'animate-slide-in-right') : ''}
        ${isEven ? 'translate-x-[-60px]' : 'translate-x-[60px]'}
      `}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="group relative bg-card rounded-lg overflow-hidden card-glow transition-all duration-500">
        {/* Image */}
        <div className="aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-3">
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
          
          {/* Hover line */}
          <div className="h-px w-0 bg-primary group-hover:w-full transition-all duration-500" />
        </div>
        
        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  );
}
