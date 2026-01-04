import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Mousewheel, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import randomSculpture from '@/assets/random-sculpture.jpeg';
import silverPendant from '@/assets/silver-pendant.jpeg';

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
    title: 'Random Sculpture',
    subtitle: 'Sculpture',
    gradient: 'from-amber-600 to-orange-800',
    image: randomSculpture,
  },
  {
    id: 5,
    title: 'Silver Pendant',
    subtitle: 'Jewelry Design',
    gradient: 'from-cyan-600 to-blue-800',
    image: silverPendant,
  },
];

export function ProjectsCarousel() {
  return (
    <section id="things" className="relative min-h-screen pt-12 pb-16 md:pt-16 md:pb-20 flex flex-col items-center justify-center">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-stroke-glow animate-float">
          Things I've Made
        </h2>
      </div>

      {/* Carousel Container */}
      <div className="w-full">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          initialSlide={2}
          speed={700}
          coverflowEffect={{
            rotate: 25,
            stretch: -50,
            depth: -150,
            modifier: 1.2,
            slideShadows: false,
          }}
          freeMode={{
            enabled: true,
            sticky: true,
            momentumRatio: 0.5,
            momentumBounce: false,
          }}
          loop={true}
          slideToClickedSlide={true}
          mousewheel={{
            forceToAxis: true,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Mousewheel, FreeMode]}
          className="projects-carousel w-full max-w-7xl"
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id} className="swiper-slide-custom">
              <div
                className={`relative w-[340px] md:w-[600px] h-[220px] md:h-[380px] rounded-3xl overflow-hidden group cursor-pointer ${!project.image ? `bg-gradient-to-br ${project.gradient}` : ''}`}
              >
                {/* Background Image */}
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Content */}
                <div className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-end">
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
