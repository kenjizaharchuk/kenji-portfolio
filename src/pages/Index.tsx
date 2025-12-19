import { StarField } from '@/components/StarField';
import { Hero3D } from '@/components/Hero3D';
import { ProjectsSection } from '@/components/ProjectsSection';

const Index = () => {
  return (
    <main className="relative overflow-x-hidden">
      <StarField />
      <Hero3D />
      <ProjectsSection />
    </main>
  );
};

export default Index;
