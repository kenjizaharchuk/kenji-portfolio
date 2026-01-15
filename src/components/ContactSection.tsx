import { Linkedin } from 'lucide-react';
import spotifyIcon from '@/assets/spotify-icon.png';
import contactPhoto from '@/assets/contact-photo.png';

// VSCO-style icon component
const VscoIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="2.5" fill="currentColor"/>
    {/* Radial lines */}
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
      <line
        key={angle}
        x1={12 + 6.5 * Math.cos((angle * Math.PI) / 180)}
        y1={12 + 6.5 * Math.sin((angle * Math.PI) / 180)}
        x2={12 + 9.5 * Math.cos((angle * Math.PI) / 180)}
        y2={12 + 9.5 * Math.sin((angle * Math.PI) / 180)}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    ))}
  </svg>
);

export function ContactSection() {
  return (
    <section 
      id="contact"
      className="relative py-20 px-6 min-h-[600px]"
    >
      {/* No overlay - stars show through naturally */}
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Staggered Layout Container */}
        <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-0">
          
          {/* Left Column - Photo (positioned higher) */}
          <div className="lg:w-[45%] lg:relative lg:z-20">
            <img 
              src={contactPhoto}
              alt="Sunset silhouette"
              className="w-full h-[400px] lg:h-[450px] object-cover"
            />
          </div>

          {/* Title - positioned in upper-left negative space on desktop */}
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white lg:absolute lg:top-0 lg:right-0 lg:w-[55%] lg:text-left lg:pl-8 order-first lg:order-none mb-8 lg:mb-0">
            Contact Me
          </h2>

          {/* Right Column - Contact Panel (bleeds off right and bottom) */}
          <div className="lg:absolute lg:right-0 lg:top-24 lg:bottom-0 lg:w-[55%] lg:-mr-6 lg:-mb-20">
            <div className="h-full bg-black/20 backdrop-blur-sm rounded-tl-2xl lg:rounded-tr-none lg:rounded-br-none rounded-bl-2xl lg:rounded-bl-none border-t border-l border-white/20 lg:border-r-0 lg:border-b-0 p-8 md:p-12 flex flex-col justify-center lg:pl-8 lg:pt-20">
              {/* Tagline */}
              <div className="mb-8">
                <p className="font-body text-xl md:text-2xl text-white/80 italic leading-relaxed">
                  I'm always interested in getting to know new people
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                <a 
                  href="mailto:kgzaharchuk@stanford.edu"
                  className="block font-body text-lg md:text-xl text-white hover:text-white/80 transition-colors"
                >
                  kgzaharchuk@stanford.edu
                </a>
                <a 
                  href="tel:650-878-7237"
                  className="block font-body text-lg md:text-xl text-white hover:text-white/80 transition-colors"
                >
                  650-878-7237
                </a>
              </div>

              {/* Location */}
              <div className="mb-8">
                <p className="font-body text-white/70 text-lg">
                  Stanford, California
                </p>
              </div>

              {/* Social Icons - in a small black rounded container */}
              <div className="inline-flex items-center gap-4 bg-black/60 rounded-lg px-4 py-3 w-fit">
                <a 
                  href="https://vsco.co/kenjizaharchuk/gallery"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white hover:scale-110 transition-all duration-200"
                  aria-label="VSCO"
                >
                  <VscoIcon className="w-6 h-6" />
                </a>
                <a 
                  href="https://open.spotify.com/user/kenjiz?si=1dcb2bcf6c374a9a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white hover:scale-110 transition-all duration-200"
                  aria-label="Spotify"
                >
                  <img 
                    src={spotifyIcon} 
                    alt="Spotify" 
                    className="w-9 h-9"
                    style={{ filter: 'brightness(0) invert(1)', opacity: 0.7 }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
                  />
                </a>
                <a 
                  href="https://www.linkedin.com/in/kenjizaharchuk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white hover:scale-110 transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
