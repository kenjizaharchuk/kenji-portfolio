import { useState, useEffect } from 'react';

interface NavItem {
  label: string;
  sectionId: string;
}

const navItems: NavItem[] = [
  { label: 'Landing Page', sectionId: 'landing' },
  { label: 'About Me', sectionId: 'about' },
  { label: 'Explore Mediums', sectionId: 'mediums' },
  { label: 'Things I\'ve Made', sectionId: 'things' },
  { label: 'Contact', sectionId: 'contact' },
];

export function HeroSidebar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const landingSection = document.getElementById('landing');
    if (!landingSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Visible when landing section is at least 10% in view
        setIsVisible(entry.intersectionRatio > 0.1);
      },
      { threshold: [0, 0.1, 0.5, 1] }
    );

    observer.observe(landingSection);
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Calculate wave-like widths based on distance from hovered item
  const getLineWidth = (index: number): number => {
    const baseWidth = 40;
    const maxWidth = 120;
    const amplitude = maxWidth - baseWidth;

    if (!isHovered || hoveredIndex === null) {
      return baseWidth;
    }

    // Distance from hovered item (0 to 4 for 5 items)
    const distance = Math.abs(index - hoveredIndex);
    
    // Use cosine for smooth wave falloff - peak at hovered, falloff at distance
    const waveFactor = Math.cos((distance / 2) * Math.PI * 0.5);
    const width = baseWidth + amplitude * Math.max(0, waveFactor);
    
    return width;
  };

  return (
    <nav
      className={`
        fixed left-6 top-1/2 -translate-y-1/2 z-50
        flex flex-col gap-4
        transition-opacity duration-500
        ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredIndex(null);
      }}
    >
      {navItems.map((item, index) => (
        <button
          key={item.sectionId}
          onClick={() => scrollToSection(item.sectionId)}
          onMouseEnter={() => setHoveredIndex(index)}
          className="group flex items-center gap-3 cursor-pointer bg-transparent border-none p-0"
        >
          {/* The line */}
          <div
            className="h-[2px] bg-white/40 transition-all duration-300 ease-out group-hover:bg-white/80"
            style={{ width: `${getLineWidth(index)}px` }}
          />
          
          {/* The label - only shows when this item is hovered */}
          <span
            className={`
              font-body text-sm text-white/80 whitespace-nowrap
              transition-all duration-300 ease-out
              ${hoveredIndex === index && isHovered
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-2 pointer-events-none'}
            `}
          >
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
}
