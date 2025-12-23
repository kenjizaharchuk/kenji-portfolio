import { useState } from 'react';
import { StarField } from '@/components/StarField';
import { Hero3D } from '@/components/Hero3D';
import { ProjectsCarousel } from '@/components/ProjectsCarousel';
import { Preloader } from '@/components/Preloader';

const Index = () => {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <main className="relative overflow-x-hidden">
      {showPreloader && (
        <Preloader onComplete={() => setShowPreloader(false)} />
      )}
      <StarField />
      <Hero3D />
      <ProjectsCarousel />
    </main>
  );
};

export default Index;
