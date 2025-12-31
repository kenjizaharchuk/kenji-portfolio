import { Globe, Music, Linkedin } from 'lucide-react';

export function ContactSection() {
  return (
    <section 
      id="contact"
      className="relative py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Desktop: flex row, justified between */}
        {/* Mobile: flex column, centered */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Phone */}
          <a 
            href="tel:650-878-7237"
            className="font-body text-lg text-white/90 hover:text-white transition-colors"
          >
            650-878-7237
          </a>

          {/* Icons */}
          <div className="flex items-center gap-6">
            <a 
              href="/"
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Portfolio"
            >
              <Globe className="w-6 h-6" />
            </a>
            <a 
              href="https://spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Spotify"
            >
              <Music className="w-6 h-6" />
            </a>
            <a 
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>

          {/* Email */}
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
