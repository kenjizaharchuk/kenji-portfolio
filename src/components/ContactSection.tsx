import { Linkedin, Aperture } from 'lucide-react';
import spotifyIcon from '@/assets/spotify-icon.png';
import contactPhoto from '@/assets/contact-photo.png';

export function ContactSection() {
  return (
    <section 
      id="contact"
      className="relative py-20 px-6"
    >
      {/* Semi-transparent overlay to dim stars */}
      <div className="absolute inset-0 bg-black/80" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="font-display text-5xl md:text-6xl font-bold text-white text-center mb-16">
          Contact Me
        </h2>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          {/* Left Column - Photo */}
          <div className="lg:w-[40%] flex-shrink-0">
            <img 
              src={contactPhoto}
              alt="Sunset silhouette"
              className="w-full h-full min-h-[400px] lg:min-h-[500px] object-cover rounded-lg"
            />
          </div>

          {/* Right Column - Contact Box */}
          <div className="lg:w-[60%] flex-grow">
            <div className="h-full bg-[#1b1d20]/80 rounded-2xl border-t border-white/30 p-8 md:p-12 flex flex-col justify-between">
              {/* Tagline */}
              <div className="mb-8">
                <p className="font-body text-xl md:text-2xl text-white/80 italic leading-relaxed">
                  "I'm always interested in getting to know new people"
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-6 mb-8">
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

              {/* Social Icons */}
              <div className="flex justify-end gap-5">
                <a 
                  href="https://vsco.co/kenjizaharchuk/gallery"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white hover:scale-110 transition-all duration-200"
                  aria-label="VSCO"
                >
                  <Aperture className="w-6 h-6" />
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
                    className="w-7 h-7"
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
