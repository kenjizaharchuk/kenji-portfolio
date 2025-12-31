import { useState, useEffect } from 'react';
import { StarField } from '@/components/StarField';
import { Hero3D } from '@/components/Hero3D';
import { HeroSidebar } from '@/components/HeroSidebar';
import { AboutSection } from '@/components/AboutSection';
import { MediumsSection } from '@/components/MediumsSection';
import { ProjectsCarousel } from '@/components/ProjectsCarousel';
import { ContactSection } from '@/components/ContactSection';
import { Preloader } from '@/components/Preloader';

const Index = () => {
  // Only show preloader on first visit this session
  const [showPreloader, setShowPreloader] = useState(() => {
    const hasSeenPreloader = sessionStorage.getItem('preloaderShown');
    return !hasSeenPreloader;
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
      <HeroSidebar />
      <Hero3D />
      <AboutSection />
      <MediumsSection />
      <ProjectsCarousel />
      <ContactSection />
    </main>
  );
};

export default Index;
