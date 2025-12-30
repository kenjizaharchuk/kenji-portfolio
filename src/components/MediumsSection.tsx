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
    <section className="relative mt-32 md:mt-48 mb-32 md:mb-48">
      {/* Top Wave Divider - Black dips into pink */}
      <div className="absolute top-0 left-0 right-0 -translate-y-full pointer-events-none">
        <svg
          viewBox="0 0 1440 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          {/* Black fill area that dips down into the pink */}
          <path
            d="M0 0V180C200 200 500 180 800 140C1100 100 1300 70 1440 90V0H0Z"
            className="fill-background-dark"
          />
          {/* Gold stroke following the wave edge */}
          <path
            d="M0 180C200 200 500 180 800 140C1100 100 1300 70 1440 90"
            className="stroke-mediums-gold"
            strokeWidth="5"
            fill="none"
          />
        </svg>
      </div>

      {/* Main Section Content */}
      <div className="bg-mediums-bg py-32 md:py-40">
        <div className="container mx-auto px-6">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-light italic text-white mb-20 md:mb-24">
            Explore My Mediums
          </h2>

          {/* Cards Grid - Bottom aligned */}
          <div className="flex flex-col md:flex-row items-end justify-center gap-12 md:gap-16 lg:gap-24">
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
                    ${medium.shape === 'arch' 
                      ? 'medium-card-arch w-72 h-96 md:w-80 md:h-[28rem]' 
                      : 'medium-card-rect w-72 h-72 md:w-80 md:h-80'
                    }
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
                <span className="mt-6 text-white text-xl font-medium tracking-wide">
                  {medium.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Lip Divider - Nearly flat */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-full pointer-events-none z-10">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0H1440V45C1200 50 720 55 0 48V0Z"
            className="fill-mediums-bg"
          />
          <path
            d="M0 48C720 55 1200 50 1440 45"
            className="stroke-mediums-gold"
            strokeWidth="5"
            fill="none"
          />
        </svg>
      </div>
    </section>
  );
};
