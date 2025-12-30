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
    <section className="relative">
      {/* Top Wave Divider */}
      <div className="absolute top-0 left-0 right-0 -translate-y-full pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120V80C240 20 480 0 720 20C960 40 1200 80 1440 60V120H0Z"
            className="fill-mediums-bg"
          />
          <path
            d="M0 80C240 20 480 0 720 20C960 40 1200 80 1440 60"
            className="stroke-mediums-gold"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </div>

      {/* Main Section Content */}
      <div className="bg-mediums-bg py-24 md:py-32">
        <div className="container mx-auto px-6">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-light italic text-white mb-16 md:mb-20">
            Explore My Mediums
          </h2>

          {/* Cards Grid */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {mediums.map((medium) => (
              <Link
                key={medium.path}
                to={medium.path}
                className="group flex flex-col items-center"
              >
                {/* Card Container with overflow hidden */}
                <div
                  className={`
                    relative overflow-hidden
                    w-64 md:w-56 lg:w-64
                    ${medium.shape === 'arch' ? 'medium-card-arch h-80 md:h-72 lg:h-80' : 'medium-card-rect h-72 md:h-64 lg:h-72'}
                  `}
                >
                  {/* Placeholder gradient as image substitute */}
                  <div
                    className={`
                      absolute inset-0 bg-gradient-to-br ${medium.gradient}
                      transition-all duration-1000 ease-out
                      grayscale group-hover:grayscale-0
                      scale-100 group-hover:scale-125
                    `}
                  />
                  
                  {/* Subtle overlay for depth */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-1000" />
                </div>

                {/* Label */}
                <span className="mt-4 text-white text-lg font-medium tracking-wide">
                  {medium.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Lip Divider */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-full pointer-events-none z-10">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0V40C360 60 720 50 1080 40C1260 35 1380 30 1440 25V0H0Z"
            className="fill-mediums-bg"
          />
          <path
            d="M0 40C360 60 720 50 1080 40C1260 35 1380 30 1440 25"
            className="stroke-mediums-gold"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </div>
    </section>
  );
};
