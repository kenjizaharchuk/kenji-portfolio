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

// SVG wave path - single path for both fill and stroke
const wavePath = "M0,60 C180,100 360,20 540,50 C720,80 900,30 1080,55 C1260,80 1380,45 1440,60";

export const MediumsSection = () => {
  return (
    <section className="relative">
      {/* SVG Wave Divider - mauve fill with gold stroke */}
      <div className="relative w-full overflow-hidden">
        <svg 
          className="block w-full h-[80px] md:h-[120px]" 
          viewBox="0 0 1440 120" 
          preserveAspectRatio="none"
        >
          {/* Mauve fill - creates the wave shape */}
          <path 
            d={`${wavePath} L1440,120 L0,120 Z`}
            fill="hsl(0 12% 60%)"
          />
          {/* Gold stroke - traces the exact same wave edge */}
          <path 
            d={wavePath}
            fill="none" 
            stroke="hsl(43 56% 50%)"
            strokeWidth="5"
          />
        </svg>
      </div>

      {/* Main Section - Full bleed mauve background */}
      <div className="mediums-section-content pb-16 md:pb-24">
        {/* Content Container - constrained width, consistent padding */}
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          
          {/* Heading - LEFT aligned with first tile */}
          <h2 className="font-acumin text-3xl md:text-4xl font-light italic text-white text-left mb-10 md:mb-14">
            Explore My Mediums
          </h2>

          {/* Tiles Grid - 2:3 aspect ratio, consistent gaps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-14">
            {mediums.map((medium) => (
              <Link 
                key={medium.path} 
                to={medium.path} 
                className="group flex flex-col items-center md:items-stretch"
              >
                {/* Tile Container - 2:3 ratio, shape via border-radius */}
                <div 
                  className={`
                    relative overflow-hidden aspect-[2/3] w-full max-w-[280px] md:max-w-none
                    ${medium.shape === 'arch' ? 'medium-card-arch' : 'medium-card-rect'}
                  `}
                >
                  {/* Gradient placeholder */}
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
                
                {/* Label - consistent baseline */}
                <span className="mt-4 text-white text-lg font-medium tracking-wide text-center">
                  {medium.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave - subtle gold edge */}
      <div className="relative w-full overflow-hidden bg-background">
        <svg 
          className="block w-full h-[40px] md:h-[60px]" 
          viewBox="0 0 1440 60" 
          preserveAspectRatio="none"
        >
          {/* Mauve fill for bottom edge */}
          <path 
            d="M0,0 L1440,0 L1440,20 C1200,35 720,40 0,25 Z"
            fill="hsl(0 12% 60%)"
          />
          {/* Gold stroke on bottom edge */}
          <path 
            d="M0,25 C720,40 1200,35 1440,20"
            fill="none" 
            stroke="hsl(43 56% 50%)"
            strokeWidth="5"
          />
        </svg>
      </div>
    </section>
  );
};
