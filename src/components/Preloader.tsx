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
const BEAT_DURATION = 0.24; // 240ms per beat
const RING_COUNT = 7;
const INITIAL_DELAY = 0.5; // Start blank for half a second

const generateOrganizedRings = (): CloudPoint[] => {
  const points: CloudPoint[] = [];
  
  // Define each ring: [radius %, number of letters]
  const ringConfig = [
    { radius: 10, count: 8 },   // Ring 1
    { radius: 18, count: 12 },  // Ring 2
    { radius: 28, count: 16 },  // Ring 3
    { radius: 40, count: 22 },  // Ring 4
    { radius: 55, count: 28 },  // Ring 5
    { radius: 72, count: 34 },  // Ring 6
    { radius: 92, count: 42 },  // Ring 7 - extends past edges
  ];
  
  // Get aspect ratio for ellipse scaling
  const aspectRatio = typeof window !== 'undefined' 
    ? window.innerWidth / window.innerHeight 
    : 1.5;
  
  // Cap aspect ratio to prevent over-stretching on ultrawide screens
  const cappedAspectRatio = Math.min(Math.max(aspectRatio, 0.7), 1.4);
  
  const scaleX = cappedAspectRatio > 1 ? cappedAspectRatio * 0.8 : 1;
  const scaleY = cappedAspectRatio < 1 ? (1 / cappedAspectRatio) * 0.8 : 1;
  
  ringConfig.forEach((config, ringIndex) => {
    const ring = ringIndex + 1;
    
    // Stagger each ring by half the angle between letters - fills gaps
    const angleOffset = (ringIndex % 2) * (Math.PI / config.count);
    
    for (let i = 0; i < config.count; i++) {
      const angle = angleOffset + (i / config.count) * Math.PI * 2;
      
      const x = 50 + Math.cos(angle) * config.radius * scaleX;
      const y = 50 + Math.sin(angle) * config.radius * scaleY;
      
      points.push({
        x,
        y,
        distance: config.radius,
        ring,
        id: `ring-${ring}-${i}`,
      });
    }
  });
  
  return points;
};

// Get the letter for a specific ring based on cascade delay
const getLetterForRing = (ring: number, currentIndex: number): string | null => {
  const letterIndex = currentIndex - ring;
  
  // Not yet visible (wave hasn't reached this ring)
  if (letterIndex < 0) return null;
  
  // Past the last letter - this ring should disappear (wave has passed)
  if (letterIndex >= LETTERS.length) return null;
  
  return LETTERS[letterIndex];
};

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerLetterRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(-1); // Start blank
  const [visibleRing, setVisibleRing] = useState(0);
  const [cloudPoints] = useState<CloudPoint[]>(generateOrganizedRings);

  useGSAP(
    () => {
      const timeline = gsap.timeline();

      // Total beats: letters + rings (so every ring shows K then disappears)
      const TOTAL_BEATS = LETTERS.length + RING_COUNT;

      // Continuous wave: letters appear, then disappear ring by ring
      for (let index = 0; index < TOTAL_BEATS; index++) {
        timeline.call(
          () => {
            setCurrentLetterIndex(index);
            setVisibleRing(Math.min(index, RING_COUNT));
          },
          [],
          INITIAL_DELAY + index * BEAT_DURATION
        );
      }

      const portalStart = INITIAL_DELAY + TOTAL_BEATS * BEAT_DURATION + 0.2;

      // Phase 3: Portal zoom + background fade SIMULTANEOUSLY
      timeline.to(
        centerLetterRef.current,
        {
          scale: 60,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.in',
          transformOrigin: 'center center',
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

  // Keep center letter on "K" during despawn for the portal zoom effect
  const currentLetter = currentLetterIndex >= 0 
    ? LETTERS[Math.min(currentLetterIndex, LETTERS.length - 1)] 
    : null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'hsl(240 10% 3.9%)' }}
    >
      {/* Cloud of letters */}
      <div ref={cloudRef} className="absolute inset-0">
        {cloudPoints.map((point) => {
          // Get the cascaded letter for this ring
          const ringLetter = getLetterForRing(point.ring, currentLetterIndex);
          const isVisible = ringLetter !== null && point.ring <= visibleRing;
          // Solid visibility when shown
          const baseOpacity = 1;

          return (
            <div
              key={point.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
                opacity: isVisible ? baseOpacity : 0,
              }}
            >
              <span className="font-sans font-bold text-xs md:text-sm lg:text-base text-white">
                {ringLetter}
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
        {currentLetter && (
          <span className="font-sans font-bold text-5xl md:text-6xl lg:text-7xl text-white">
            {currentLetter}
          </span>
        )}
      </div>
    </div>
  );
};