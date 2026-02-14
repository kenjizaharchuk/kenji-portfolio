import kenjiPhoto from '@/assets/kenji-photo.png';

export const AboutSection = () => {
  return (
    <section 
      id="about"
      className="h-screen flex items-center justify-center relative"
      style={{ zIndex: 10 }}
    >
      <div 
        className="w-[80vw] max-w-4xl border border-white/40 rounded-sm px-7 md:px-10 py-10 ml-8 lg:ml-16"
      >
        <div className="flex flex-col md:flex-row items-center gap-7 md:gap-10">
          {/* Left - Text Content */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 font-display">
              I'm Kenji
            </h2>
            <h3 className="text-xl md:text-2xl text-foreground/80 mb-6 font-display">
              Welcome to my website!
            </h3>
            <p className="text-foreground/60 text-base md:text-lg leading-relaxed font-display">
              I'm a creative developer passionate about building immersive digital experiences. 
              With a background in design and technology, I love exploring the intersection of 
              art and code to create memorable, interactive projects.
            </p>
            <p className="text-foreground/60 text-base md:text-lg leading-relaxed mt-4 font-display">
              When I'm not coding, you'll find me exploring mountains, experimenting with 
              new creative tools, or working on personal projects that push the boundaries 
              of what's possible on the web.
            </p>
          </div>
          
          {/* Right - Photo */}
          <div className="flex-1 flex justify-center md:justify-end">
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
