import { StarField } from '@/components/StarField';
import { Hero3D } from '@/components/Hero3D';
import { Projects3DSection } from '@/components/Projects3DSection';

const Index = () => {
  return (
    <main className="relative overflow-x-hidden">
      <StarField />
      <Hero3D />
      <Projects3DSection />
    </main>
  );
};

export default Index;
