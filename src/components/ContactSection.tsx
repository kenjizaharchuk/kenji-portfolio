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
      className="relative pt-24 pb-0 px-6 overflow-hidden"
    >
      {/* Two-column layout: 40% image / 60% panel area */}
      <div 
        className="relative max-w-7xl mx-auto"
        style={{
          display: 'grid',
          gridTemplateColumns: '40% 60%',
          columnGap: 'clamp(32px, 4vw, 64px)',
        }}
      >
        {/* Left Column - Image (offset upward relative to panel) */}
        <div 
          className="flex justify-end items-start"
          style={{ marginTop: '-24px' }} /* Vertical stagger: image starts above panel */
        >
          <div 
            className="overflow-hidden rounded-sm shrink-0"
            style={{
              width: 'clamp(260px, 28vw, 380px)',
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

        {/* Right Column - Heading + Panel */}
        <div 
          className="flex flex-col"
          style={{ marginRight: 'clamp(-60px, -4vw, -20px)' }} /* Bleed right */
        >
          {/* Title - centered over the panel */}
          <h2 
            className="font-display text-5xl md:text-6xl font-bold text-white text-center mb-6"
            style={{ marginLeft: 'clamp(-40px, -2vw, -16px)' }} /* Shift left slightly to center over panel visually */
          >
            Contact Me!
          </h2>

          {/* Contact Panel */}
          <div 
            className="bg-black/20 rounded-tl-2xl rounded-bl-lg border-t border-l border-white/30 flex-1"
            style={{
              padding: 'clamp(28px, 3.5vw, 48px)',
              paddingRight: 'clamp(40px, 6vw, 100px)',
              paddingBottom: 'clamp(32px, 3vw, 44px)',
            }}
          >
            {/* Tagline - larger font, natural wrapping */}
            <div className="mb-8">
              <p 
                className="font-display font-medium text-white/80 italic leading-relaxed whitespace-normal"
                style={{
                  fontSize: 'clamp(1.35rem, 2vw, 1.85rem)', /* +6-8px larger */
                }}
              >
                I'm always interested in getting to know new people.
              </p>
            </div>

            {/* Contact Info - responsive sizing */}
            <div 
              className="space-y-4 mb-8 pl-4"
              style={{
                fontSize: 'clamp(1rem, 1.3vw, 1.3rem)',
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
          #contact > div:first-of-type {
            display: flex !important;
            flex-direction: column !important;
            gap: 24px !important;
            padding: 0 16px !important;
          }
          #contact > div:first-of-type > div:first-child {
            justify-content: center !important;
            margin-top: 0 !important;
          }
          #contact > div:first-of-type > div:first-child > div {
            width: min(320px, 90vw) !important;
          }
          #contact > div:first-of-type > div:last-child {
            margin-right: 0 !important;
          }
          #contact > div:first-of-type > div:last-child h2 {
            margin-left: 0 !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
}
