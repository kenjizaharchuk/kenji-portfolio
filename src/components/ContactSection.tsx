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
      className="relative pt-32 pb-0 px-6 overflow-hidden"
    >
      {/* Title - centered above everything */}
      <h2 className="font-display text-5xl md:text-6xl font-bold text-white text-center mb-8">
        Contact Me!
      </h2>

      {/* CSS Grid Layout - prevents overlap, scales properly */}
      <div 
        className="relative grid gap-6 lg:gap-0 max-w-7xl mx-auto"
        style={{
          gridTemplateColumns: 'minmax(280px, 1fr) minmax(340px, 1.2fr)',
          columnGap: 'clamp(24px, 5vw, 80px)',
        }}
      >
        {/* Left Column - Photo */}
        <div className="flex justify-end items-start pl-16 lg:pl-24">
          <div 
            className="w-full overflow-hidden rounded-sm"
            style={{
              maxWidth: 'clamp(280px, 30vw, 420px)',
              aspectRatio: '4 / 3',
            }}
          >
            <img 
              src={contactPhoto}
              alt="Sunset silhouette"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Column - Panel (bleeds right with negative margin) */}
        <div 
          className="justify-self-end w-full"
          style={{
            marginRight: 'clamp(-40px, -3vw, -12px)',
          }}
        >
          <div 
            className="bg-black/20 rounded-tl-2xl border-t border-l border-white/40 h-full"
            style={{
              padding: 'clamp(24px, 3vw, 40px)',
              paddingRight: 'clamp(32px, 5vw, 80px)',
              paddingBottom: 'clamp(28px, 3vw, 36px)',
            }}
          >
            {/* Tagline - responsive font, natural wrapping */}
            <div className="mb-8">
              <p 
                className="font-display font-medium text-white/80 italic leading-relaxed"
                style={{
                  fontSize: 'clamp(1.25rem, 1.8vw, 1.75rem)',
                }}
              >
                I'm always interested in getting to know new people.
              </p>
            </div>

            {/* Contact Info - responsive sizing */}
            <div 
              className="space-y-4 mb-8 pl-4"
              style={{
                fontSize: 'clamp(1rem, 1.2vw, 1.25rem)',
              }}
            >
              <a 
                href="mailto:kgzaharchuk@stanford.edu"
                className="flex items-center gap-3 font-display font-medium text-white hover:text-white/80 transition-colors"
              >
                <Mail className="w-5 h-5 text-white/70 shrink-0" />
                kgzaharchuk@stanford.edu
              </a>
              <a 
                href="tel:650-878-7237"
                className="flex items-center gap-3 font-display font-medium text-white hover:text-white/80 transition-colors"
              >
                <Phone className="w-5 h-5 text-white/70 shrink-0" />
                650-878-7237
              </a>
              <div className="flex items-center gap-3 font-display font-medium text-white">
                <MapPin className="w-5 h-5 text-white/70 shrink-0" />
                Stanford, California
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-5">
              <a 
                href="https://www.linkedin.com/in/kenjizaharchuk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white hover:scale-110 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="https://vsco.co/kenjizaharchuk/gallery"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white hover:scale-110 transition-all duration-200 ml-2"
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
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout Override - stacked cleanly */}
      <style>{`
        @media (max-width: 900px) {
          #contact > div:last-of-type:not(style) {
            display: flex !important;
            flex-direction: column !important;
            gap: 24px !important;
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          #contact > div:last-of-type > div:first-child {
            justify-content: center !important;
            padding-left: 0 !important;
          }
          #contact > div:last-of-type > div:last-child {
            margin-right: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
