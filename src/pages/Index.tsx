import { useState } from 'react';
import { StarField } from '@/components/StarField';
import { Hero3D } from '@/components/Hero3D';
import { Projects3DSection } from '@/components/Projects3DSection';
import { Preloader } from '@/components/Preloader';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative overflow-x-hidden">
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <StarField />
      <Hero3D />
      <Projects3DSection />
    </main>
  );
};

export default Index;
