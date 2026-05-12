import { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { EffectCoverflow, Mousewheel, FreeMode, Keyboard } from 'swiper/modules';
import { useMorph, rectFromDOMRect, type MorphRects } from '@/lib/morphContext';
import { getProjectBySlug } from '@/data/projects';

// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/effect-coverflow';


import { projects, FILTER_CATEGORIES, type FilterCategory } from '@/data/carouselProjects';

export function ProjectsCarousel() {
  const [activeFilters, setActiveFilters] = useState<FilterCategory[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState<number>(projects[2].id);
  const swiperRef = useRef<SwiperType | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();
  const { slug: activeSlug } = useParams();
  const morph = useMorph();

  // Block browser swipe-back/forward when horizontal-dominant wheel events occur over the carousel section.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) e.preventDefault();
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  // Filter projects based on active filters (OR logic)
  const filteredProjects = useMemo(() => {
    if (activeFilters.length === 0) return projects;
    return projects.filter(project =>
      project.categories.some(cat => activeFilters.includes(cat))
    );
  }, [activeFilters]);

  // Compute initialSlide: find current project in filtered list, or nearest
  const initialSlide = useMemo(() => {
    if (filteredProjects.length === 0) return 0;
    const idx = filteredProjects.findIndex(p => p.id === currentProjectId);
    if (idx !== -1) return idx;

    // Find nearest project by original order
    const currentOriginalIndex = projects.findIndex(p => p.id === currentProjectId);
    let nearestIdx = 0;
    let minDistance = Infinity;
    filteredProjects.forEach((project, i) => {
      const dist = Math.abs(projects.findIndex(p => p.id === project.id) - currentOriginalIndex);
      if (dist < minDistance) { minDistance = dist; nearestIdx = i; }
    });
    return nearestIdx;
  }, [filteredProjects, currentProjectId]);

  // Unique key to force remount on filter change
  const swiperKey = [...activeFilters].sort().join(',') || 'all';

  // Toggle filter on/off
  const toggleFilter = (filter: FilterCategory) => {
    setActiveFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  // Handle slide change
  const handleSlideChange = (swiper: SwiperType) => {
    const realIndex = swiper.realIndex;
    if (filteredProjects[realIndex]) {
      setCurrentProjectId(filteredProjects[realIndex].id);
    }
  };

  return (
    <section ref={sectionRef} id="things" className="relative min-h-screen pt-48 pb-16 md:pb-20 flex-col flex items-center justify-center py-[96px]">
      <div id="things-content" className="w-full flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-9 mt-8">
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white/90">
            Things I've Made
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="w-full">
          {filteredProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="font-display text-white/70 text-xl mb-4">No projects match these filters</p>
              <button
                onClick={() => setActiveFilters([])}
                className="font-display px-6 py-2 rounded-full border border-white/40 text-white/80 hover:bg-white/10 transition-colors"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <Swiper
              key={swiperKey}
              onSwiper={(swiper) => { swiperRef.current = swiper; }}
              onSlideChange={handleSlideChange}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              initialSlide={initialSlide}
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
              loop={filteredProjects.length >= 3}
              slideToClickedSlide={true}
              mousewheel={{
                forceToAxis: true,
                releaseOnEdges: true,
                sensitivity: 0.6,
              }}
              keyboard={{ enabled: true }}
              modules={[EffectCoverflow, Mousewheel, FreeMode, Keyboard]}
              className="projects-carousel w-full max-w-7xl"
            >
              {filteredProjects.map((project) => {
                const isActive = project.id === currentProjectId;
                const hasSlug = !!project.slug;
                const showHover = !isActive || !!project.link || hasSlug;
                const hoverOverlayClass = showHover ? 'group-hover:bg-black/20' : '';
                const cursorClass = isActive && !project.link && !hasSlug ? 'cursor-default' : 'cursor-pointer';
                const cardClass = `relative w-[340px] md:w-[600px] h-[260px] md:h-[420px] border border-white/15 group ${cursorClass} ${!project.image ? `bg-gradient-to-br ${project.gradient}` : ''}`;

                const isHidden =
                  hasSlug && morph.slug === project.slug && morph.phase !== 'idle';

                const cardInner = (
                  <div
                    data-card-slug={project.slug}
                    className={cardClass}
                    style={{
                      borderRadius: '1.5rem',
                      overflow: 'hidden',
                      opacity: isHidden ? 0 : 1,
                    }}
                  >
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ objectPosition: project.imagePosition || 'center' }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-end">
                      <div data-card-part="text">
                        <p data-card-part="subtitle" className="font-display text-white/70 text-base font-semibold tracking-wide uppercase mb-2">
                          {project.subtitle}
                        </p>
                        <h3 data-card-part="title" className="font-display text-white text-2xl md:text-3xl font-bold">
                          {project.title}
                        </h3>
                      </div>
                      <div data-card-part="tags" className="flex flex-wrap gap-2 mt-3">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-display px-3 py-1 text-sm font-medium rounded-full border border-white/30 text-white/80 bg-white/10 backdrop-blur-sm whitespace-nowrap"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className={`absolute inset-0 bg-black/0 ${hoverOverlayClass} transition-colors duration-300`} />
                  </div>
                );

                return (
                  <SwiperSlide key={project.id} className="swiper-slide-custom">
                    {hasSlug ? (
                      <div
                        className="block"
                        onClick={(e) => {
                          if (!isActive) return;
                          e.preventDefault();
                          const root = e.currentTarget as HTMLElement;
                          const cardEl = root.querySelector(
                            `[data-card-slug="${project.slug}"]`
                          ) as HTMLElement | null;
                          const subtitleEl = cardEl?.querySelector(
                            '[data-card-part="subtitle"]'
                          ) as HTMLElement | null;
                          const titleEl = cardEl?.querySelector(
                            '[data-card-part="title"]'
                          ) as HTMLElement | null;
                          const tagsEl = cardEl?.querySelector(
                            '[data-card-part="tags"]'
                          ) as HTMLElement | null;
                          const detail = getProjectBySlug(project.slug!);
                          if (cardEl && subtitleEl && titleEl && tagsEl && detail) {
                            const frameRect = rectFromDOMRect(cardEl.getBoundingClientRect());
                            const cardRects: MorphRects = {
                              frame: frameRect,
                              image: frameRect,
                              subtitle: rectFromDOMRect(subtitleEl.getBoundingClientRect()),
                              titleText: rectFromDOMRect(titleEl.getBoundingClientRect()),
                              tags: rectFromDOMRect(tagsEl.getBoundingClientRect()),
                            };
                            morph.startOpen(
                              {
                                slug: project.slug!,
                                image: detail.heroImage,
                                imagePosition: detail.heroImagePosition,
                                title: detail.title,
                                cardSubtitle: project.subtitle,
                                detailSubtitle: `${detail.subtitle} · ${detail.category}`,
                                tags: detail.tags,
                              },
                              cardRects
                            );
                          }
                          navigate(`/projects/${project.slug}`);
                        }}
                      >
                        {cardInner}
                      </div>
                    ) : project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                        onClick={(e) => {
                          if (!isActive) e.preventDefault();
                        }}
                      >
                        {cardInner}
                      </a>
                    ) : (
                      cardInner
                    )}
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap justify-center gap-3 mt-8 px-4">
          {FILTER_CATEGORIES.map((filter) => (
            <button
              key={filter}
              onClick={() => toggleFilter(filter)}
              className={`
                font-display px-5 py-2.5 rounded-full border text-base font-semibold transition-all duration-300
                ${activeFilters.includes(filter)
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-white/80 border-white/40 hover:border-white/70 hover:text-white'
                }
              `}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
