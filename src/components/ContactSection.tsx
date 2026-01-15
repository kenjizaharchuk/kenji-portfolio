import { Linkedin, Mail, Phone, MapPin } from 'lucide-react';
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
      className="relative py-24 px-6 min-h-[550px] overflow-visible"
    >
      {/* Main layout - 50/50 split */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-12 max-w-6xl mx-auto">
        
        {/* Left Column - Photo (positioned higher, 50% width) */}
        <div className="lg:w-1/2 lg:relative lg:z-20">
          <img 
            src={contactPhoto}
            alt="Sunset silhouette"
            className="w-full h-[320px] lg:h-[400px] object-cover"
          />
        </div>

        {/* Right Column - Title + Panel Container (50% width, bleeds off right) */}
        <div className="lg:w-1/2 lg:relative">
          {/* Title - centered above panel, moved up 24px */}
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white text-center mb-6 lg:mb-0 lg:absolute lg:-top-6 lg:left-0 lg:right-0 lg:pr-[calc(100vw-100%)]">
            Contact Me!
          </h2>

          {/* Contact Panel - bleeds off right AND bottom edges */}
          <div className="lg:absolute lg:top-16 lg:left-0 lg:right-[calc(-50vw+50%)] lg:min-h-[400px]">
            <div className="bg-black/10 rounded-tl-2xl border-t border-l border-white/10 p-8 md:p-10 lg:pl-10 lg:pr-20 lg:py-12 lg:pb-24 lg:h-full">
              {/* Tagline - Cormorant Garamond to match About section */}
              <div className="mb-10">
                <p className="font-display text-lg md:text-xl text-white/80 italic leading-relaxed">
                  I'm always interested in getting to know new people.
                </p>
              </div>

              {/* Contact Info with icons - Cormorant Garamond to match About section */}
              <div className="space-y-5 mb-10">
                <a 
                  href="mailto:kgzaharchuk@stanford.edu"
                  className="flex items-center gap-3 font-display text-base md:text-lg text-white hover:text-white/80 transition-colors"
                >
                  <Mail className="w-5 h-5 text-white/70" />
                  kgzaharchuk@stanford.edu
                </a>
                <a 
                  href="tel:650-878-7237"
                  className="flex items-center gap-3 font-display text-base md:text-lg text-white hover:text-white/80 transition-colors"
                >
                  <Phone className="w-5 h-5 text-white/70" />
                  650-878-7237
                </a>
                <div className="flex items-center gap-3 font-display text-base md:text-lg text-white">
                  <MapPin className="w-5 h-5 text-white/70" />
                  Stanford, California
                </div>
              </div>

              {/* Social Icons - no background, floating directly */}
              <div className="flex items-center gap-5">
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
