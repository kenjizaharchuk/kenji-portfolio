import { useState, useEffect } from 'react';
import { StarField } from '@/components/StarField';
import { Hero3D } from '@/components/Hero3D';
import { HeroSidebar } from '@/components/HeroSidebar';
import { AboutSection } from '@/components/AboutSection';
import { ProjectsCarousel } from '@/components/ProjectsCarousel';
import { ContactSection } from '@/components/ContactSection';
import { Preloader } from '@/components/Preloader';

const Index = () => {
  // Show preloader on first visit OR hard refresh
  const [showPreloader, setShowPreloader] = useState(() => {
    const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    const isHardRefresh = navEntries.length > 0 && navEntries[0].type === 'reload';
    const hasSeenPreloader = sessionStorage.getItem('preloaderShown');
    return !hasSeenPreloader || isHardRefresh;
  });

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('preloaderShown', 'true');
    setShowPreloader(false);
  };

  useEffect(() => {
    document.body.style.overflow = showPreloader ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showPreloader]);

  return (
    <main className="relative overflow-x-hidden">
      {showPreloader && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}
      <StarField />
      <HeroSidebar isPreloaderActive={showPreloader} />
      <Hero3D />
      <AboutSection />
      <ProjectsCarousel />
      <ContactSection />
    </main>
  );
};

export default Index;
