import { useState, useEffect, useRef } from 'react';

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
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const checkWidth = () => setIsCompact(window.innerWidth < 1100);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  useEffect(() => {
    const aboutSection = document.getElementById('about');
    const contactSection = document.getElementById('contact');

    if (!aboutSection || !contactSection) return;

    let inAbout = false;
    let inContact = false;
    let overlapsCarousel = false;

    const updateVisibility = () => {
      setIsVisible((inAbout || inContact) && !overlapsCarousel);
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

    aboutObserver.observe(aboutSection);
    contactObserver.observe(contactSection);

    // Real bounding-box overlap check between the sidebar nav and the
    // visible carousel/cards area (`.projects-carousel`).
    let rafId: number | null = null;
    const checkOverlap = () => {
      rafId = null;
      const nav = navRef.current;
      const carousel = document.querySelector('.projects-carousel') as HTMLElement | null;
      if (!nav || !carousel) {
        if (overlapsCarousel) {
          overlapsCarousel = false;
          updateVisibility();
        }
        return;
      }
      const a = nav.getBoundingClientRect();
      const b = carousel.getBoundingClientRect();
      const overlap =
        a.left < b.right &&
        a.right > b.left &&
        a.top < b.bottom &&
        a.bottom > b.top;
      if (overlap !== overlapsCarousel) {
        overlapsCarousel = overlap;
        updateVisibility();
      }
    };

    const schedule = () => {
      if (rafId === null) rafId = requestAnimationFrame(checkOverlap);
    };

    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      aboutObserver.disconnect();
      contactObserver.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (rafId !== null) cancelAnimationFrame(rafId);
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
      ref={navRef}
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
