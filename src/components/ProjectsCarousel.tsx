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
    <section className="relative min-h-screen py-20">
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
            rotate: 25,
            stretch: 50,
            depth: -150,
            modifier: 1.2,
            slideShadows: false,
          }}
          loop={true}
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
                className={`relative w-[340px] md:w-[600px] h-[220px] md:h-[380px] rounded-3xl bg-gradient-to-br ${project.gradient} p-6 md:p-8 flex flex-col justify-end overflow-hidden group cursor-pointer`}
              >
                {/* Content */}
                <div className="relative z-10">
                  <p className="text-white/70 text-sm tracking-wide uppercase mb-2">
                    {project.subtitle}
                  </p>
                  <h3 className="text-white text-xl md:text-2xl font-bold">
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

    </section>
  );
}
