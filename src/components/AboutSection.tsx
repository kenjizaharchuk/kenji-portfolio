import { useState, useEffect } from 'react';
import kenjiPhoto from '@/assets/kenji-photo.png';

const BASE_WIDTH = 900;
const BASE_HEIGHT = 500;

export const AboutSection = () => {
  const [scaleFactor, setScaleFactor] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateScale = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      
      if (w < 640) {
        setIsMobile(true);
        setScaleFactor(1);
      } else {
        setIsMobile(false);
        const scale = Math.min((w * 0.85) / BASE_WIDTH, (h * 0.85) / BASE_HEIGHT);
        setScaleFactor(Math.max(0.4, scale));
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  if (isMobile) {
    return (
      <section id="about" className="min-h-screen flex items-center justify-center relative py-16 px-4" style={{ zIndex: 10 }}>
        <div className="w-full max-w-md border border-white/40 rounded-sm px-5 py-8">
          <div className="flex flex-col items-center gap-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-3 font-display">I'm Kenji</h2>
              <h3 className="text-xl text-foreground/90 mb-4 font-display font-semibold">Welcome to my website!</h3>
              <p className="text-foreground/80 text-base leading-relaxed font-display font-semibold">
                I'm a Mechanical Engineer (MS '26) with a background in Design (BS '25) specializing in Manufacturing and Product Realization at Stanford. Working at the intersection of engineering, aesthetics, and fabrication, I love thinking about <em className="font-bold"><strong>why</strong></em> we like the things we like.
              </p>
              <p className="text-foreground/80 text-base leading-relaxed mt-4 font-display font-semibold">
                I'm at my best when I'm working on something hands-on, being challenged, and balancing multiple projects that force me to think differently. Take a look around my website to see the projects I've built and the ideas I've brought to life.
              </p>
            </div>
            <div className="relative">
              <img 
                src={kenjiPhoto} 
                alt="Kenji"
                className="w-56 h-auto rounded-sm object-cover"
                style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.4), 0 0 30px rgba(255,255,255,0.1)' }}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="about"
      className="h-screen flex items-center justify-center relative"
      style={{ zIndex: 10 }}
    >
      <div
        style={{
          width: `${BASE_WIDTH}px`,
          transform: `scale(${scaleFactor})`,
          transformOrigin: 'center center',
        }}
      >
        <div 
          className="border border-white/40 rounded-sm"
          style={{ padding: '40px' }}
        >
          <div className="flex items-center" style={{ gap: '32px' }}>
            {/* Left - Text Content */}
            <div style={{ flex: '1 1 0%' }}>
              <h2 className="font-bold text-foreground font-display" style={{ fontSize: '40px', marginBottom: '14px' }}>
                I'm Kenji
              </h2>
              <h3 className="text-foreground/90 font-display font-semibold" style={{ fontSize: '22px', marginBottom: '20px' }}>
                Welcome to my website!
              </h3>
              <p className="text-foreground/80 font-display font-semibold" style={{ fontSize: '16px', lineHeight: '1.7' }}>
                I'm a Mechanical Engineer (MS '26) with a background in Design (BS '25) specializing in Manufacturing and Product Realization at Stanford. Working at the intersection of engineering, aesthetics, and fabrication, I love thinking about <em className="font-bold"><strong>why</strong></em> we like the things we like.
              </p>
              <p className="text-foreground/80 font-display font-semibold" style={{ fontSize: '16px', lineHeight: '1.7', marginTop: '14px' }}>
                I'm at my best when I'm working on something hands-on, being challenged, and balancing multiple projects that force me to think differently. Take a look around my website to see the projects I've built and the ideas I've brought to life.
              </p>
            </div>
            
            {/* Right - Photo */}
            <div className="shrink-0">
              <img 
                src={kenjiPhoto} 
                alt="Kenji"
                className="rounded-sm object-cover"
                style={{
                  width: '260px',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.4), 0 0 30px rgba(255,255,255,0.1)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
