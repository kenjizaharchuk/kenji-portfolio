import { ProjectCard } from './ProjectCard';

const projects = [
  {
    title: "Neural Interface Dashboard",
    description: "A real-time visualization platform for neural network training metrics with interactive 3D graphs and adaptive learning rate displays.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
  },
  {
    title: "Quantum Computing Simulator",
    description: "Browser-based quantum circuit designer and simulator supporting up to 20 qubits with visual state vector representation.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80",
  },
  {
    title: "Autonomous Fleet Manager",
    description: "Real-time monitoring and control system for autonomous vehicle fleets with predictive maintenance and route optimization.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80",
  },
  {
    title: "Climate Data Visualization",
    description: "Interactive globe visualization of climate change data spanning 150 years, featuring temporal scrubbing and regional analysis.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
  },
  {
    title: "Biometric Authentication SDK",
    description: "Multi-modal biometric authentication library supporting facial recognition, fingerprint, and behavioral analysis.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
  },
  {
    title: "Distributed Ledger Platform",
    description: "Enterprise blockchain solution with smart contract deployment, real-time transaction monitoring, and consensus visualization.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=80",
  },
];

export function ProjectsSection() {
  return (
    <section className="relative min-h-screen py-32 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="mb-24 space-y-4">
          <p className="font-mono text-sm tracking-widest uppercase bg-gradient-to-r from-[#707a84] via-[#c0c8d0] to-[#707a84] bg-clip-text text-transparent">
            Selected Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#a0aab4] via-[#e8ecf0] to-[#a0aab4] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(180,190,200,0.15)]">
            Projects
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-[#606a74]/60 via-[#909aa4]/40 to-transparent" />
        </div>
        
        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              image={project.image}
              index={index}
            />
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-32 text-center">
        <p className="text-muted-foreground text-sm">
          © 2024 Kenji Zaharchuk. All rights reserved.
        </p>
      </footer>
    </section>
  );
}