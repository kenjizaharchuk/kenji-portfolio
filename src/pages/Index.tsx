import { useState, useEffect } from 'react';
import { StarField } from '@/components/StarField';
import { Hero3D } from '@/components/Hero3D';
import { AboutSection } from '@/components/AboutSection';
import { ProjectsCarousel } from '@/components/ProjectsCarousel';
import { Preloader } from '@/components/Preloader';

const Index = () => {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    document.body.style.overflow = showPreloader ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showPreloader]);

  return (
    <main className="relative overflow-x-hidden">
      {showPreloader && (
        <Preloader onComplete={() => setShowPreloader(false)} />
      )}
      <StarField />
      <Hero3D />
      <AboutSection />
      <ProjectsCarousel />
    </main>
  );
};

export default Index;
