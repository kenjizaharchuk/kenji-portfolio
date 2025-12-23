import { useState } from 'react';
import { StarField } from '@/components/StarField';
import { Hero3D } from '@/components/Hero3D';
import { Projects3DSection } from '@/components/Projects3DSection';
import { Preloader } from '@/components/Preloader';

const Index = () => {
  const [showPreloader, setShowPreloader] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    setTimeout(() => setContentVisible(true), 50);
  };

  return (
    <main className="relative overflow-x-hidden">
      {showPreloader && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}
      <div 
        className={`transition-opacity duration-700 ease-out ${
          contentVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <StarField />
        <Hero3D />
        <Projects3DSection />
      </div>
    </main>
  );
};

export default Index;
