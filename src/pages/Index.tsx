import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { StarField } from '@/components/StarField';
import { HeroSidebar } from '@/components/HeroSidebar';
import { AboutSection } from '@/components/AboutSection';
import { ProjectsCarousel } from '@/components/ProjectsCarousel';
import { ContactSection } from '@/components/ContactSection';
import { Preloader } from '@/components/Preloader';
import { ProjectDetail } from '@/components/ProjectDetail';


const Index = () => {
  const { slug } = useParams();
  const firstRenderHadSlugRef = useRef<boolean>(!!slug);
  const skipEnterAnimation = firstRenderHadSlugRef.current;

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
    if (slug) return; // ProjectDetail manages its own scroll lock
    document.body.style.overflow = showPreloader ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showPreloader, slug]);

  return (
    <main className="relative overflow-x-hidden">
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <StarField />
      <HeroSidebar isPreloaderActive={showPreloader} forceHidden={!!slug} />
      <AboutSection />
      <ProjectsCarousel />
      
      <ContactSection />

      <AnimatePresence>
        {slug && (
          <ProjectDetail
            key={slug}
            slug={slug}
            skipEnterAnimation={skipEnterAnimation}
          />
        )}
      </AnimatePresence>
    </main>
  );
};

export default Index;
