import { Globe, Linkedin } from 'lucide-react';
import spotifyIcon from '@/assets/spotify-icon.png';

export function ContactSection() {
  return (
    <section 
      id="contact"
      className="relative py-20 px-6"
    >
      <div className="max-w-5xl mx-auto px-4 md:px-10">
        {/* Desktop: grid for visual centering, Mobile: flex column */}
        <div className="hidden md:grid grid-cols-3 items-center">
          {/* Phone - right-aligned toward center */}
          <a 
            href="tel:650-878-7237"
            className="font-body text-lg text-white/90 hover:text-white transition-colors justify-self-end mr-[20%]"
          >
            650-878-7237
          </a>

          {/* Icons - truly centered */}
          <div className="flex items-center justify-center gap-6">
            <a 
              href="/"
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Portfolio"
            >
              <Globe className="w-6 h-6" />
            </a>
            <a 
              href="https://open.spotify.com/user/kenjiz?si=1dcb2bcf6c374a9a"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Spotify"
            >
              <img 
                src={spotifyIcon} 
                alt="Spotify" 
                className="w-[29px] h-[29px]"
                style={{ filter: 'brightness(0) invert(1)', opacity: 0.7 }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
              />
            </a>
            <a 
              href="https://www.linkedin.com/in/kenjizaharchuk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>

          {/* Email - left-aligned toward center */}
          <a 
            href="mailto:kgzaharchuk@stanford.edu"
            className="font-body text-lg text-white/90 hover:text-white transition-colors justify-self-start ml-[10%]"
          >
            kgzaharchuk@stanford.edu
          </a>
        </div>

        {/* Mobile layout - stacked */}
        <div className="flex md:hidden flex-col items-center gap-8">
          <a 
            href="tel:650-878-7237"
            className="font-body text-lg text-white/90 hover:text-white transition-colors"
          >
            650-878-7237
          </a>

          <div className="flex items-center gap-6">
            <a 
              href="/"
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Portfolio"
            >
              <Globe className="w-6 h-6" />
            </a>
            <a 
              href="https://open.spotify.com/user/kenjiz?si=1dcb2bcf6c374a9a"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Spotify"
            >
              <img 
                src={spotifyIcon} 
                alt="Spotify" 
                className="w-[29px] h-[29px]"
                style={{ filter: 'brightness(0) invert(1)', opacity: 0.7 }}
              />
            </a>
            <a 
              href="https://www.linkedin.com/in/kenjizaharchuk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>

          <a 
            href="mailto:kgzaharchuk@stanford.edu"
            className="font-body text-lg text-white/90 hover:text-white transition-colors"
          >
            kgzaharchuk@stanford.edu
          </a>
        </div>
      </div>
    </section>
  );
}
