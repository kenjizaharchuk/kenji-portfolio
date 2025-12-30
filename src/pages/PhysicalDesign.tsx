import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PhysicalDesign = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Content */}
      <div className="container mx-auto px-6 pt-32 pb-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-stroke-glow">
          Physical Design
        </h1>
        
        <p className="text-muted-foreground text-lg max-w-2xl mb-12">
          Explore my work in physical design, including product design, industrial design, 
          and tangible creations that bridge the digital and physical worlds.
        </p>

        {/* Placeholder grid for future projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div 
              key={i}
              className="aspect-square rounded-xl bg-secondary/50 border border-border flex items-center justify-center"
            >
              <span className="text-muted-foreground">Project {i}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default PhysicalDesign;
