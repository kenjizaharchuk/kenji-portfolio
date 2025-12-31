import { Link } from 'react-router-dom';
import physicalDesignImg from '@/assets/physical-design.jpg';
import digitalDesignImg from '@/assets/digital-design.png';
import artImg from '@/assets/art-sculpture.jpg';

const mediums = [
  {
    title: 'Physical Design',
    path: '/physical-design',
    shape: 'rect' as const,
    image: physicalDesignImg,
  },
  {
    title: 'Digital Design',
    path: '/digital-design',
    shape: 'arch' as const,
    image: digitalDesignImg,
  },
  {
    title: 'Art',
    path: '/art',
    shape: 'rect' as const,
    image: artImg,
  },
];

// Smooth Bézier wave path - single curve for consistent top/bottom dividers
const wavePath = "M0,80 C360,120 720,40 1080,80 C1260,100 1380,60 1440,70";

export const MediumsSection = () => {
  return (
    <section className="relative">
      {/* Top Wave Divider - mauve fill with gold stroke */}
      <div className="relative w-full overflow-hidden leading-none">
        <svg 
          className="block w-full h-[100px] md:h-[120px]" 
          viewBox="0 0 1440 120" 
          preserveAspectRatio="none"
        >
          {/* Mauve fill - creates the wave shape */}
          <path 
            d={`${wavePath} L1440,120 L0,120 Z`}
            fill="hsl(0 12% 60%)"
          />
          {/* Gold stroke - traces the wave edge */}
          <path 
            d={wavePath}
            fill="none" 
            stroke="#C9A035"
            strokeWidth="5"
          />
        </svg>
      </div>

      {/* Main Section - Full bleed mauve background */}
      <div className="bg-[hsl(0_12%_60%)] py-16 md:py-24">
        {/* Content Container - constrained width, consistent padding */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          
          {/* Heading - LEFT aligned, bold, not italic */}
          <h2 className="font-acumin text-3xl md:text-4xl font-bold text-white text-left mb-12">
            Explore My Mediums
          </h2>

          {/* Tiles Grid - 1:1 square aspect ratio, responsive gaps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-[clamp(32px,6vw,96px)]">
            {mediums.map((medium) => (
              <Link 
                key={medium.path} 
                to={medium.path} 
                className="group flex flex-col"
              >
                {/* Tile Container - square ratio, shape via border-radius */}
                <div 
                  className={`
                    relative overflow-hidden aspect-square w-full
                    ${medium.shape === 'arch' 
                      ? 'rounded-t-[999px] rounded-b-none' 
                      : 'rounded-[48px]'}
                  `}
                >
                  {/* Image - full bleed with object-cover framing */}
                  <img 
                    src={medium.image}
                    alt={medium.title}
                    className="
                      absolute inset-0 w-full h-full object-cover object-center
                      transition-all duration-1000 ease-out
                      grayscale group-hover:grayscale-0
                      scale-100 group-hover:scale-110
                    "
                  />
                  
                  {/* Subtle overlay for depth */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-1000" />
                </div>
                
                {/* Label - consistent spacing below tile */}
                <span className="mt-6 text-white text-lg font-medium tracking-wide text-center">
                  {medium.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave Divider - same wave, vertically flipped */}
      <div className="relative w-full overflow-hidden leading-none bg-background">
        <svg 
          className="block w-full h-[100px] md:h-[120px] transform rotate-180" 
          viewBox="0 0 1440 120" 
          preserveAspectRatio="none"
        >
          {/* Mauve fill */}
          <path 
            d={`${wavePath} L1440,120 L0,120 Z`}
            fill="hsl(0 12% 60%)"
          />
          {/* Gold stroke */}
          <path 
            d={wavePath}
            fill="none" 
            stroke="#C9A035"
            strokeWidth="5"
          />
        </svg>
      </div>
    </section>
  );
};
