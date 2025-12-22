import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

interface CloudPoint {
  x: number;
  y: number;
  distance: number;
  ring: number; // 1-5 based on distance
  id: string;
}

const LETTERS = ['K', 'E', 'N', 'J', 'I', 'Z', 'A', 'H', 'A', 'R', 'C', 'H', 'U', 'K'];
const BEAT_DURATION = 0.16; // Slightly faster for smoother feel
const RING_COUNT = 5;

const generateCloud = (): CloudPoint[] => {
  const points: CloudPoint[] = [];
  const count = 85; // Dense swarm of letters
  
  for (let i = 0; i < count; i++) {
    // Radial distribution - denser in center, sparser at edges
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.pow(Math.random(), 0.55) * 45; // Power curve for organic density
    
    // Add organic jitter
    const jitterX = (Math.random() - 0.5) * 6;
    const jitterY = (Math.random() - 0.5) * 6;
    
    const x = 50 + Math.cos(angle) * radius + jitterX;
    const y = 50 + Math.sin(angle) * radius + jitterY;
    
    // Calculate ring (1-5) based on distance from center
    const distance = Math.sqrt(Math.pow(x - 50, 2) + Math.pow(y - 50, 2));
    const ring = Math.min(RING_COUNT, Math.max(1, Math.ceil(distance / (45 / RING_COUNT))));
    
    points.push({
      x,
      y,
      distance,
      ring,
      id: `cloud-${i}`,
    });
  }
  return points;
};

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerLetterRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [visibleRing, setVisibleRing] = useState(0);
  const [cloudPoints] = useState<CloudPoint[]>(generateCloud);

  useGSAP(
    () => {
      const timeline = gsap.timeline();

      // Phase 1: Letter cycling with radial expansion
      LETTERS.forEach((_, index) => {
        timeline.call(
          () => {
            setCurrentLetterIndex(index);
            // Expand visible ring progressively (1 to 5)
            const ringProgress = Math.ceil(((index + 1) / LETTERS.length) * RING_COUNT);
            setVisibleRing(ringProgress);
          },
          [],
          index * BEAT_DURATION
        );
      });

      const implosionStart = LETTERS.length * BEAT_DURATION + 0.2;

      // Phase 2: Implosion - fade rings from outside to inside
      for (let ring = RING_COUNT; ring >= 1; ring--) {
        timeline.to(
          `.ring-${ring}`,
          {
            opacity: 0,
            scale: 0.8,
            duration: 0.12,
            ease: 'power2.out',
          },
          implosionStart + (RING_COUNT - ring) * 0.06
        );
      }

      const portalStart = implosionStart + RING_COUNT * 0.06 + 0.1;

      // Phase 3: Portal zoom + background fade SIMULTANEOUSLY
      timeline.to(
        centerLetterRef.current,
        {
          scale: 60,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.in',
        },
        portalStart
      );

      timeline.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.7,
          ease: 'power2.in',
          onComplete: onComplete,
        },
        portalStart // Same timestamp - happens together!
      );
    },
    { scope: containerRef }
  );

  const currentLetter = LETTERS[currentLetterIndex];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'hsl(240 10% 3.9%)' }}
    >
      {/* Cloud of letters */}
      <div ref={cloudRef} className="absolute inset-0">
        {cloudPoints.map((point) => {
          const isVisible = point.ring <= visibleRing;
          // Opacity fades toward edges
          const baseOpacity = Math.max(0.15, 0.5 - point.distance * 0.008);

          return (
            <div
              key={point.id}
              className={`ring-${point.ring} absolute transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150`}
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
                opacity: isVisible ? baseOpacity : 0,
              }}
            >
              <span
                className="font-sans font-bold text-xs md:text-sm lg:text-base"
                style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, #a0a0a0 50%, #606060 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {currentLetter}
              </span>
            </div>
          );
        })}
      </div>

      {/* Center letter - the focus */}
      <div
        ref={centerLetterRef}
        className="relative z-10 flex items-center justify-center"
      >
        <span
          className="font-sans font-bold text-3xl md:text-5xl lg:text-6xl"
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #d0d0d0 30%, #a0a0a0 60%, #707070 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 40px rgba(255,255,255,0.25)',
          }}
        >
          {currentLetter}
        </span>
      </div>
    </div>
  );
};