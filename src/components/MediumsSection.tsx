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

// Generate a true mathematical sine wave path
// y(x) = mid + amp * sin(2π * x / W)
// Peak at 1/4 width, trough at 3/4 width
const generateSineWavePath = (width: number, mid: number, amp: number, segments = 100): string => {
  let path = `M0,${mid}`;
  for (let i = 1; i <= segments; i++) {
    const x = (i / segments) * width;
    // Standard sine: sin(2π * x / W) starts at 0, peaks at W/4, returns to 0 at W/2, troughs at 3W/4
    const y = mid + amp * Math.sin((2 * Math.PI * x) / width);
    path += ` L${x.toFixed(2)},${y.toFixed(2)}`;
  }
  return path;
};

const WAVE_WIDTH = 1440;
const WAVE_MID = 60;
const WAVE_AMP = 35;
const sineWavePath = generateSineWavePath(WAVE_WIDTH, WAVE_MID, WAVE_AMP);

export const MediumsSection = () => {
  return (
    <section id="mediums" className="relative">
      {/* Top Wave Divider - mathematical sine wave with gold stroke */}
      <div className="relative w-full overflow-hidden leading-none">
        <svg 
          className="block w-full h-[80px] md:h-[100px]" 
          viewBox={`0 0 ${WAVE_WIDTH} 120`}
          preserveAspectRatio="none"
        >
          {/* Mauve fill - creates the wave shape */}
          <path 
            d={`${sineWavePath} L${WAVE_WIDTH},120 L0,120 Z`}
            fill="hsl(0 12% 60%)"
          />
          {/* Gold stroke - traces the wave edge with smooth caps */}
          <path 
            d={sineWavePath}
            fill="none" 
            stroke="#C9A035"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Main Section - Full bleed mauve background, tighter padding */}
      <div className="bg-[hsl(0_12%_60%)] pt-6 pb-10 md:pt-10 md:pb-14">
        {/* Content Container - constrained width, consistent padding */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          
          {/* Heading - LEFT aligned, bold, uses heading font */}
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white text-left mb-8">
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
                    relative overflow-hidden aspect-square w-full transition-colors duration-1000
                    ${medium.shape === 'arch' 
                      ? 'rounded-t-[999px] rounded-b-none bg-[hsl(0_0%_70%)] group-hover:bg-[#C9A035]' 
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

      {/* Bottom Wave Divider - same sine wave, vertically flipped */}
      <div className="relative w-full overflow-hidden leading-none bg-background">
        <svg 
          className="block w-full h-[80px] md:h-[100px] transform rotate-180" 
          viewBox={`0 0 ${WAVE_WIDTH} 120`}
          preserveAspectRatio="none"
        >
          {/* Mauve fill */}
          <path 
            d={`${sineWavePath} L${WAVE_WIDTH},120 L0,120 Z`}
            fill="hsl(0 12% 60%)"
          />
          {/* Gold stroke with smooth caps */}
          <path 
            d={sineWavePath}
            fill="none" 
            stroke="#C9A035"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
};
