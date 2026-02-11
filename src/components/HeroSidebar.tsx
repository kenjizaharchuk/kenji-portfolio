import { useState, useEffect } from 'react';

interface NavItem {
  label: string;
  sectionId: string;
}

const navItems: NavItem[] = [
  { label: 'Landing Page', sectionId: 'landing' },
  { label: 'About Me', sectionId: 'about' },
  { label: 'Things I\'ve Made', sectionId: 'things' },
  { label: 'Contact', sectionId: 'contact' },
];

interface HeroSidebarProps {
  isPreloaderActive?: boolean;
}

export function HeroSidebar({ isPreloaderActive = false }: HeroSidebarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isCompact, setIsCompact] = useState(false);

  // Responsive compact mode for smaller screens
  useEffect(() => {
    const checkWidth = () => setIsCompact(window.innerWidth < 1100);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  useEffect(() => {
    const landingSection = document.getElementById('landing');
    const aboutSection = document.getElementById('about');
    const thingsSection = document.getElementById('things');
    const contactSection = document.getElementById('contact');
    
    if (!landingSection || !aboutSection || !thingsSection) return;

    let isInLanding = false;
    let isInAbout = false;
    let isInThings = false;
    let isInContact = false;

    const updateVisibility = () => {
      // Show sidebar when Things section is NOT the dominant view
      // This ensures smooth transitions without conflicting states
      setIsVisible(!isInThings);
    };

    const landingObserver = new IntersectionObserver(
      ([entry]) => {
        isInLanding = entry.intersectionRatio > 0.1;
        updateVisibility();
      },
      { threshold: [0, 0.1, 0.5, 1] }
    );

    const aboutObserver = new IntersectionObserver(
      ([entry]) => {
        isInAbout = entry.intersectionRatio > 0.1;
        updateVisibility();
      },
      { threshold: [0, 0.1, 0.5, 1] }
    );

    const thingsObserver = new IntersectionObserver(
      ([entry]) => {
        isInThings = entry.intersectionRatio > 0.05;
        updateVisibility();
      },
      { threshold: [0, 0.05, 0.1] }
    );

    const contactObserver = new IntersectionObserver(
      ([entry]) => {
        isInContact = entry.intersectionRatio > 0.1;
        updateVisibility();
      },
      { threshold: [0, 0.1, 0.5, 1] }
    );

    landingObserver.observe(landingSection);
    aboutObserver.observe(aboutSection);
    thingsObserver.observe(thingsSection);
    if (contactSection) contactObserver.observe(contactSection);

    return () => {
      landingObserver.disconnect();
      aboutObserver.disconnect();
      thingsObserver.disconnect();
      contactObserver.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;
    
    // Special case for About - scroll past the GSAP zoom animation to the readable state
    if (sectionId === 'about') {
      const targetY = element.offsetTop + (window.innerHeight * 2.5);
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    } else {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculate wave-like widths based on distance from hovered item
  const getLineWidth = (index: number): number => {
    const baseWidth = isCompact ? 20 : 30;
    const maxWidth = isCompact ? 60 : 100;
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
        fixed left-6 md:left-10 lg:left-14 top-1/2 -translate-y-1/2 z-50
        hidden md:flex flex-col gap-3
        transition-opacity duration-500
        ${isVisible && !isPreloaderActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
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
            className="h-[3px] bg-white/40 transition-all duration-300 ease-out group-hover:bg-white/80"
            style={{ width: `${getLineWidth(index)}px` }}
          />
          
          {/* The label - only shows when this item is hovered (hidden in compact mode) */}
          {!isCompact && (
            <span
              className={`
                font-display text-lg font-semibold text-white/80 whitespace-nowrap
                transition-all duration-300 ease-out
                ${hoveredIndex === index && isHovered
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-2 pointer-events-none'}
              `}
            >
              {item.label}
            </span>
          )}
        </button>
      ))}
    </nav>
  );
}
