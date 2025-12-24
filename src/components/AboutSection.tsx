import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import patagoniaPhoto from '@/assets/patagonia-photo.jpg';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const card = cardRef.current;
    const section = sectionRef.current;
    
    if (!card || !section) return;
    
    // Initial state: extremely small
    gsap.set(card, { scale: 0.01 });
    
    // Create timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=200%", // Double the scroll distance for slower growth
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      }
    });
    
    // Scale animation takes first 70% of scroll distance
    tl.to(card, {
      scale: 1,
      duration: 0.7,
      ease: "power2.out",
    });
    
    // Hold at full scale for remaining 30% (momentum buffer)
    tl.to(card, {
      scale: 1,
      duration: 0.3,
    });
    
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="h-screen flex items-center justify-center relative"
      style={{ zIndex: 10 }}
    >
      {/* About Card - always opacity 1, only scale changes */}
      <div 
        ref={cardRef}
        className="w-[85vw] max-w-5xl border border-white/40 rounded-sm px-8 md:px-12 py-12"
        style={{
          boxShadow: '0 0 30px rgba(255,255,255,0.15), 0 0 60px rgba(255,255,255,0.1), inset 0 0 30px rgba(255,255,255,0.05)',
          transformOrigin: 'center center',
        }}
      >
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left - Text Content */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              I'm Kenji
            </h2>
            <h3 className="text-xl md:text-2xl text-foreground/80 mb-6">
              Welcome to my website!
            </h3>
            <p className="text-foreground/60 text-base md:text-lg leading-relaxed">
              I'm a creative developer passionate about building immersive digital experiences. 
              With a background in design and technology, I love exploring the intersection of 
              art and code to create memorable, interactive projects.
            </p>
            <p className="text-foreground/60 text-base md:text-lg leading-relaxed mt-4">
              When I'm not coding, you'll find me exploring mountains, experimenting with 
              new creative tools, or working on personal projects that push the boundaries 
              of what's possible on the web.
            </p>
          </div>
          
          {/* Right - Photo */}
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="relative">
              <img 
                src={patagoniaPhoto} 
                alt="Kenji in Patagonia mountains"
                className="w-64 md:w-80 h-auto rounded-2xl object-cover"
                style={{
                  boxShadow: '0 20px 50px rgba(0,0,0,0.4), 0 0 30px rgba(255,255,255,0.1)',
                }}
              />
              {/* Subtle glow behind photo */}
              <div 
                className="absolute -inset-2 rounded-2xl -z-10"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
