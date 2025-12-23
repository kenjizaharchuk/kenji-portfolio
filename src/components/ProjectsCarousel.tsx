import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const projects = [
  {
    id: 1,
    title: 'Project Alpha',
    subtitle: 'Brand Identity & Web Design',
    gradient: 'from-violet-600 to-indigo-800',
  },
  {
    id: 2,
    title: 'Project Beta',
    subtitle: 'Mobile App Development',
    gradient: 'from-rose-600 to-pink-800',
  },
  {
    id: 3,
    title: 'Project Gamma',
    subtitle: 'E-commerce Platform',
    gradient: 'from-emerald-600 to-teal-800',
  },
  {
    id: 4,
    title: 'Project Delta',
    subtitle: '3D Experience Design',
    gradient: 'from-amber-600 to-orange-800',
  },
  {
    id: 5,
    title: 'Project Epsilon',
    subtitle: 'Creative Direction',
    gradient: 'from-cyan-600 to-blue-800',
  },
];

export function ProjectsCarousel() {
  return (
    <section className="relative min-h-screen bg-background py-20">
      {/* Section Header */}
      <div className="absolute top-8 left-8 z-10">
        <p className="text-muted-foreground text-sm tracking-widest uppercase mb-2">
          Selected Work
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">
          Projects
        </h2>
      </div>

      {/* Carousel Container */}
      <div className="flex items-center justify-center min-h-screen pt-20">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          initialSlide={2}
          coverflowEffect={{
            rotate: 35,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="projects-carousel w-full max-w-7xl"
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id} className="swiper-slide-custom">
              <div
                className={`relative w-[320px] md:w-[450px] h-[400px] md:h-[500px] rounded-2xl bg-gradient-to-br ${project.gradient} p-8 flex flex-col justify-end overflow-hidden group cursor-pointer`}
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                {/* Content */}
                <div className="relative z-10">
                  <p className="text-white/70 text-sm tracking-wide uppercase mb-2">
                    {project.subtitle}
                  </p>
                  <h3 className="text-white text-2xl md:text-3xl font-bold">
                    {project.title}
                  </h3>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Navigation hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground text-sm">
        Drag or use arrows to navigate
      </div>
    </section>
  );
}
