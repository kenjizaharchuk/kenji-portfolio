import { useState } from 'react';
import { StarField } from '@/components/StarField';
import { Hero3D } from '@/components/Hero3D';
import { Carousel3D } from '@/components/Carousel3D';
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
      <Carousel3D />
    </main>
  );
};

export default Index;
