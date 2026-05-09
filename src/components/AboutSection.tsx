import kenjiPhoto from '@/assets/kenji-photo.png';

export const AboutSection = () => {
  return (
    <section 
      id="about"
      className="py-24 md:py-32 flex items-center justify-center relative"
      style={{ zIndex: 10 }}
    >
      <div 
        className="w-[80vw] max-w-4xl border border-white/40 rounded-sm px-7 md:px-10 py-10 ml-0 md:ml-8 lg:ml-16"
      >
        <div className="flex flex-col md:flex-row items-center gap-5 md:gap-8">
          {/* Left - Text Content */}
          <div className="flex-[3] text-center md:text-left md:pr-6">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 font-display">
              I'm Kenji
            </h2>
            <h3 className="text-xl md:text-2xl text-foreground/90 mb-6 font-display font-semibold">
Welcome to my website!
            </h3>
            <p className="text-foreground/80 text-base md:text-lg leading-relaxed font-display font-semibold">
              I'm Kenji, a design-trained mechanical engineer finishing my M.S. at Stanford, with a background in product design, manufacturing, and hands-on making.
            </p>
            <p className="text-foreground/80 text-base md:text-lg leading-relaxed mt-4 font-display font-semibold">
              I'm at my best when I'm working between ideas and execution: building hands-on, taking on challenges, and balancing projects that force me to think differently. I'm interested in how things move from idea to reality, why people connect with the things they do, and how we can build things people genuinely care about.
            </p>
          </div>
          
          {/* Right - Photo */}
          <div className="flex-[2] flex justify-center md:justify-end">
            <div className="relative">
              <img 
                src={kenjiPhoto} 
                alt="Kenji"
                className="w-60 md:w-72 h-auto rounded-sm object-cover"
                style={{
                  boxShadow: '0 20px 50px rgba(0,0,0,0.4), 0 0 30px rgba(255,255,255,0.1)',
                }}
              />
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
