import { Link } from 'react-router-dom';

const mediums = [
  {
    title: 'Physical Design',
    path: '/physical-design',
    shape: 'rect' as const,
    gradient: 'from-amber-700 via-orange-600 to-yellow-500',
  },
  {
    title: 'Digital Design',
    path: '/digital-design',
    shape: 'arch' as const,
    gradient: 'from-blue-700 via-cyan-600 to-teal-500',
  },
  {
    title: 'Art',
    path: '/art',
    shape: 'rect' as const,
    gradient: 'from-purple-700 via-pink-600 to-rose-500',
  },
];

export const MediumsSection = () => {
  return (
    <section className="relative my-16 md:my-24">
      {/* Main Section - Single cohesive mauve panel with gold edge */}
      <div className="mediums-section py-20 md:py-28 px-6">
        <div className="container mx-auto">
          {/* Title - Centered */}
          <h2 className="text-3xl md:text-4xl font-light italic text-white text-center mb-12 md:mb-16">
            Explore My Mediums
          </h2>

          {/* Cards Grid - Equal height, centered */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
            {mediums.map((medium) => (
              <Link
                key={medium.path}
                to={medium.path}
                className="group flex flex-col items-center"
              >
                {/* Card Container - Same dimensions for all, shape via CSS */}
                <div
                  className={`
                    relative overflow-hidden w-64 h-64 md:w-72 md:h-72
                    ${medium.shape === 'arch' ? 'medium-card-arch' : 'medium-card-rect'}
                  `}
                >
                  {/* Placeholder gradient as image substitute */}
                  <div
                    className={`
                      absolute inset-0 bg-gradient-to-br ${medium.gradient}
                      transition-all duration-1000 ease-out
                      grayscale group-hover:grayscale-0
                      scale-100 group-hover:scale-110
                    `}
                  />
                  
                  {/* Subtle overlay for depth */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-1000" />
                </div>

                {/* Label */}
                <span className="mt-5 text-white text-lg font-medium tracking-wide">
                  {medium.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
