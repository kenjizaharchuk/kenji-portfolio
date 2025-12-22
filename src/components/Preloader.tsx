import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

interface GridPoint {
  x: number;
  y: number;
  ring: number;
  id: string;
}

const LETTERS = ['K', 'E', 'N', 'J', 'I', 'Z', 'A', 'H', 'A', 'R', 'C', 'H', 'U', 'K'];
const COLS = 9;
const ROWS = 7;
const BEAT_DURATION = 0.18; // 180ms per letter

const generateGrid = (): GridPoint[] => {
  const points: GridPoint[] = [];
  const centerX = Math.floor(COLS / 2);
  const centerY = Math.floor(ROWS / 2);

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const ring = Math.max(Math.abs(x - centerX), Math.abs(y - centerY));
      points.push({
        x: (x / (COLS - 1)) * 100,
        y: (y / (ROWS - 1)) * 100,
        ring,
        id: `${x}-${y}`,
      });
    }
  }
  return points;
};

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerLetterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [visibleRing, setVisibleRing] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [gridPoints] = useState<GridPoint[]>(generateGrid);

  const maxRing = Math.max(...gridPoints.map((p) => p.ring));

  useGSAP(
    () => {
      const timeline = gsap.timeline();

      // Phase 1: Letter cycling with radial expansion
      LETTERS.forEach((_, index) => {
        timeline.call(
          () => {
            setCurrentLetterIndex(index);
            // Expand visible ring progressively
            const ringProgress = Math.floor((index / (LETTERS.length - 1)) * maxRing);
            setVisibleRing(ringProgress);
          },
          [],
          index * BEAT_DURATION
        );
      });

      // Phase 2: The Drop - portal effect
      timeline.call(
        () => {
          setIsExiting(true);
        },
        [],
        LETTERS.length * BEAT_DURATION + 0.3
      );

      timeline.to(
        gridRef.current,
        {
          opacity: 0,
          duration: 0.1,
          ease: 'power2.out',
        },
        LETTERS.length * BEAT_DURATION + 0.3
      );

      timeline.to(
        centerLetterRef.current,
        {
          scale: 50,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.in',
        },
        LETTERS.length * BEAT_DURATION + 0.35
      );

      timeline.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
          onComplete: onComplete,
        },
        LETTERS.length * BEAT_DURATION + 0.8
      );
    },
    { scope: containerRef }
  );

  const currentLetter = LETTERS[currentLetterIndex];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'hsl(240 10% 3.9%)' }} // Match background
    >
      {/* Grid of letters */}
      <div ref={gridRef} className="absolute inset-0">
        {gridPoints.map((point) => {
          const isVisible = point.ring <= visibleRing && !isExiting;
          const isCenter = point.ring === 0;

          if (isCenter) return null; // Center letter handled separately

          return (
            <div
              key={point.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-100"
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
                opacity: isVisible ? 0.6 - point.ring * 0.12 : 0,
              }}
            >
              <span
                className="font-sans font-bold text-2xl md:text-4xl lg:text-5xl"
                style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, #a0a0a0 50%, #707070 100%)',
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
          className="font-sans font-bold text-6xl md:text-8xl lg:text-9xl"
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #d0d0d0 30%, #a0a0a0 60%, #808080 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 60px rgba(255,255,255,0.3)',
          }}
        >
          {currentLetter}
        </span>
      </div>
    </div>
  );
};
