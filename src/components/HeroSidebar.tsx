import { useState, useEffect } from 'react';

interface NavItem {
  label: string;
  sectionId: string;
}

const navItems: NavItem[] = [
  { label: 'About Me', sectionId: 'about' },
  { label: 'Things I\'ve Made', sectionId: 'things' },
  { label: 'Contact', sectionId: 'contact' },
];

interface HeroSidebarProps {
  isPreloaderActive?: boolean;
}

export function HeroSidebar({ isPreloaderActive = false }: HeroSidebarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsCompact(window.innerWidth < 1100);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  useEffect(() => {
    const aboutSection = document.getElementById('about');
    const contactSection = document.getElementById('contact');
    const projectsSection =
      document.getElementById('things-content') || document.getElementById('things');

    if (!aboutSection || !contactSection) return;

    let inAbout = false;
    let inContact = false;
    let inProjects = false;

    const updateVisibility = () => {
      setIsVisible(inContact || (inAbout && !inProjects));
    };

    const aboutObserver = new IntersectionObserver(
      ([entry]) => {
        inAbout = entry.isIntersecting;
        updateVisibility();
      },
      { threshold: 0 }
    );

    const contactObserver = new IntersectionObserver(
      ([entry]) => {
        inContact = entry.isIntersecting;
        updateVisibility();
      },
      { threshold: 0 }
    );

    // Stricter Projects rule: hide as soon as Projects becomes meaningfully
    // visible, and stay hidden through the entire Projects view.
    const projectsObserver = projectsSection
      ? new IntersectionObserver(
          ([entry]) => {
            inProjects =
              entry.isIntersecting && entry.intersectionRatio > 0.05;
            updateVisibility();
          },
          {
            threshold: [0, 0.05, 0.25, 0.5, 0.75, 1],
            rootMargin: '-10% 0px -10% 0px',
          }
        )
      : null;

    aboutObserver.observe(aboutSection);
    contactObserver.observe(contactSection);
    if (projectsObserver && projectsSection) projectsObserver.observe(projectsSection);

    return () => {
      aboutObserver.disconnect();
      contactObserver.disconnect();
      projectsObserver?.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'things') {
      const target = document.getElementById('things-content') || document.getElementById('things');
      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (!element) return;
    element.scrollIntoView({ behavior: 'smooth' });
  };

  const getLineWidth = (index: number): number => {
    const baseWidth = isCompact ? 20 : 30;
    const maxWidth = isCompact ? 60 : 100;
    const amplitude = maxWidth - baseWidth;

    if (!isHovered || hoveredIndex === null) {
      return baseWidth;
    }

    const distance = Math.abs(index - hoveredIndex);
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
          <div
            className="h-[3px] bg-white/40 transition-all duration-300 ease-out group-hover:bg-white/80"
            style={{ width: `${getLineWidth(index)}px` }}
          />
          
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
