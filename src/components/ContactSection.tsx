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
      className="relative py-24 px-6 min-h-[550px]"
    >
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Staggered Layout Container */}
        <div className="relative flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-16">
          
          {/* Left Column - Photo (positioned higher) */}
          <div className="lg:w-[40%] lg:relative lg:z-20">
            <img 
              src={contactPhoto}
              alt="Sunset silhouette"
              className="w-full h-[320px] lg:h-[380px] object-cover"
            />
          </div>

          {/* Title - positioned centered above the panel */}
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white lg:absolute lg:top-0 lg:right-0 lg:w-[60%] lg:text-center lg:-mr-6 order-first lg:order-none mb-6 lg:mb-0">
            Contact Me!
          </h2>

          {/* Right Column - Contact Panel (bleeds off right edge) */}
          <div className="lg:absolute lg:right-0 lg:top-20 lg:w-[55%] lg:-mr-6">
            <div className="bg-black/10 backdrop-blur-sm rounded-l-2xl border-t border-l border-white/15 p-8 md:p-10 lg:pl-10 lg:pr-16 lg:py-12">
              {/* Tagline */}
              <div className="mb-10">
                <p className="font-body text-lg md:text-xl text-white/80 italic leading-relaxed">
                  I'm always interested in getting to know new people.
                </p>
              </div>

              {/* Contact Info with icons */}
              <div className="space-y-5 mb-10">
                <a 
                  href="mailto:kgzaharchuk@stanford.edu"
                  className="flex items-center gap-3 font-body text-base md:text-lg text-white hover:text-white/80 transition-colors"
                >
                  <Mail className="w-5 h-5 text-white/70" />
                  kgzaharchuk@stanford.edu
                </a>
                <a 
                  href="tel:650-878-7237"
                  className="flex items-center gap-3 font-body text-base md:text-lg text-white hover:text-white/80 transition-colors"
                >
                  <Phone className="w-5 h-5 text-white/70" />
                  650-878-7237
                </a>
                <div className="flex items-center gap-3 font-body text-base md:text-lg text-white">
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
