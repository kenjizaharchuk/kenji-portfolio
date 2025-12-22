import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const TARGET_TEXT = "KENJI ZAHARCHUK";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [displayText, setDisplayText] = useState("");
  const [isExiting, setIsExiting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    let currentIndex = 0;
    let scrambleInterval: ReturnType<typeof setInterval>;

    const scrambleAndReveal = () => {
      if (currentIndex > TARGET_TEXT.length) {
        clearInterval(scrambleInterval);
        
        // Hold for 1 second, then exit
        setTimeout(() => {
          setIsExiting(true);
          
          // Animate out
          gsap.to(containerRef.current, {
            opacity: 0,
            scale: 1.1,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
              onComplete();
            }
          });
        }, 1000);
        return;
      }

      // Build the display string
      const lockedPart = TARGET_TEXT.slice(0, currentIndex);
      const scramblePart = currentIndex < TARGET_TEXT.length 
        ? CHARS[Math.floor(Math.random() * CHARS.length)]
        : "";
      
      setDisplayText(lockedPart + scramblePart);
    };

    // Start with a brief delay
    setTimeout(() => {
      scrambleInterval = setInterval(() => {
        // Random cycles before locking in next character
        const cycleCount = Math.floor(Math.random() * 3) + 2;
        let cycles = 0;
        
        const cycleInterval = setInterval(() => {
          const lockedPart = TARGET_TEXT.slice(0, currentIndex);
          const currentChar = TARGET_TEXT[currentIndex];
          
          if (currentChar === " ") {
            // Space - just lock it in immediately
            setDisplayText(lockedPart + " ");
            clearInterval(cycleInterval);
            currentIndex++;
            return;
          }
          
          const scrambleChar = CHARS[Math.floor(Math.random() * CHARS.length)];
          setDisplayText(lockedPart + scrambleChar);
          
          cycles++;
          if (cycles >= cycleCount) {
            clearInterval(cycleInterval);
            setDisplayText(lockedPart + currentChar);
            currentIndex++;
          }
        }, 50);
        
      }, 120);

      // Also run initial scramble
      scrambleAndReveal();
    }, 500);

    return () => {
      clearInterval(scrambleInterval);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-all ${
        isExiting ? 'pointer-events-none' : ''
      }`}
    >
      <h1 className="font-mono text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-wider">
        {displayText}
        <span className="animate-pulse">|</span>
      </h1>
    </div>
  );
};
