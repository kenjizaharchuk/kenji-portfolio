import { useState, useMemo, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { EffectCoverflow, Pagination, Mousewheel, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import randomSculpture from '@/assets/random-sculpture.jpeg';
import silverPendant from '@/assets/silver-pendant.jpeg';
import discordBooth from '@/assets/discord-booth.png';
import spotifyFeature from '@/assets/spotify-feature.png';

// Filter categories
const FILTER_CATEGORIES = [
  'Physical Design',
  'Digital Design',
  'Art',
  'Work Experience'
] as const;

type FilterCategory = typeof FILTER_CATEGORIES[number];

interface Project {
  id: number;
  title: string;
  subtitle: string;
  gradient?: string;
  image?: string;
  tags: string[];
  categories: FilterCategory[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Hand Pendant',
    subtitle: 'Silversmithing',
    image: silverPendant,
    tags: ['CAD', 'Form 4 SLA Printing', 'Investment Casting', 'Sterling Silver', 'LiDAR 3D Scanning', 'Blender'],
    categories: ['Physical Design'],
  },
  {
    id: 2,
    title: 'Random Sculpture',
    subtitle: 'Sculpture',
    image: randomSculpture,
    tags: ['Plaster', 'Hand Sculpting'],
    categories: ['Physical Design', 'Art'],
  },
  {
    id: 3,
    title: 'North Star Pendant',
    subtitle: 'Silversmithing',
    gradient: 'from-slate-400 to-zinc-600',
    tags: ['CAD', 'Form 4 SLA Printing', 'Investment Casting', 'Sterling Silver'],
    categories: ['Physical Design'],
  },
  {
    id: 4,
    title: 'Up House',
    subtitle: 'Model Fabrication',
    gradient: 'from-sky-500 to-blue-700',
    tags: ['3D Printing', 'Laser Cutting', 'Scale Modeling'],
    categories: ['Physical Design'],
  },
  {
    id: 5,
    title: 'Wooden Clock',
    subtitle: 'Functional Art',
    gradient: 'from-amber-600 to-orange-800',
    tags: ['Laser Cutting', 'Mechanical Design', 'Woodworking'],
    categories: ['Physical Design'],
  },
  {
    id: 6,
    title: 'Discord Booth -- Tokyo Game Show 2024',
    subtitle: 'Creative Intern, UltraSuperNew Inc.',
    image: discordBooth,
    tags: ['Experience Design', 'Concept Development', 'Client Presentation', 'Vendor Coordination'],
    categories: ['Physical Design', 'Digital Design', 'Work Experience'],
  },
  {
    id: 7,
    title: 'New Spotify Feature',
    subtitle: 'Product Feature Concept',
    image: spotifyFeature,
    tags: ['Figma', 'UI/UX Design', 'Design System Consistency'],
    categories: ['Digital Design'],
  },
  {
    id: 8,
    title: 'Project 08',
    subtitle: 'Coming Soon',
    gradient: 'from-fuchsia-600 to-purple-800',
    tags: ['Placeholder'],
    categories: ['Art'],
  },
  {
    id: 9,
    title: 'Project 09',
    subtitle: 'Coming Soon',
    gradient: 'from-lime-600 to-green-800',
    tags: ['Placeholder'],
    categories: ['Work Experience'],
  },
  {
    id: 10,
    title: 'Project 10',
    subtitle: 'Coming Soon',
    gradient: 'from-red-600 to-rose-800',
    tags: ['Placeholder'],
    categories: ['Physical Design', 'Art'],
  },
  {
    id: 11,
    title: 'Project 11',
    subtitle: 'Coming Soon',
    gradient: 'from-sky-600 to-indigo-800',
    tags: ['Placeholder'],
    categories: ['Digital Design'],
  },
  {
    id: 12,
    title: 'Project 12',
    subtitle: 'Coming Soon',
    gradient: 'from-orange-600 to-amber-800',
    tags: ['Placeholder'],
    categories: ['Art'],
  },
  {
    id: 13,
    title: 'Project 13',
    subtitle: 'Coming Soon',
    gradient: 'from-teal-600 to-cyan-800',
    tags: ['Placeholder'],
    categories: ['Work Experience'],
  },
  {
    id: 14,
    title: 'Project 14',
    subtitle: 'Coming Soon',
    gradient: 'from-pink-600 to-fuchsia-800',
    tags: ['Placeholder'],
    categories: ['Physical Design'],
  },
  {
    id: 15,
    title: 'Project 15',
    subtitle: 'Coming Soon',
    gradient: 'from-indigo-600 to-violet-800',
    tags: ['Placeholder'],
    categories: ['Digital Design', 'Work Experience'],
  },
  {
    id: 16,
    title: 'Project 16',
    subtitle: 'Coming Soon',
    gradient: 'from-green-600 to-emerald-800',
    tags: ['Placeholder'],
    categories: ['Art'],
  },
  {
    id: 17,
    title: 'Project 17',
    subtitle: 'Coming Soon',
    gradient: 'from-purple-600 to-indigo-800',
    tags: ['Placeholder'],
    categories: ['Physical Design', 'Art'],
  },
  {
    id: 18,
    title: 'Project 18',
    subtitle: 'Coming Soon',
    gradient: 'from-blue-600 to-sky-800',
    tags: ['Placeholder'],
    categories: ['Digital Design'],
  },
  {
    id: 19,
    title: 'Project 19',
    subtitle: 'Coming Soon',
    gradient: 'from-yellow-600 to-orange-800',
    tags: ['Placeholder'],
    categories: ['Work Experience'],
  },
  {
    id: 20,
    title: 'Project 20',
    subtitle: 'Coming Soon',
    gradient: 'from-slate-600 to-gray-800',
    tags: ['Placeholder'],
    categories: ['Physical Design', 'Digital Design'],
  },
];

export function ProjectsCarousel() {
  const [activeFilters, setActiveFilters] = useState<FilterCategory[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState<number>(projects[2].id);
  const swiperRef = useRef<SwiperType | null>(null);
  const isInitialMount = useRef(true);
  const currentProjectIdRef = useRef<number>(projects[2].id);
  const isFilterTransitioning = useRef(false);

  // Keep ref in sync with state
  useEffect(() => {
    currentProjectIdRef.current = currentProjectId;
  }, [currentProjectId]);

  // Filter projects based on active filters (OR logic)
  const filteredProjects = useMemo(() => {
    if (activeFilters.length === 0) return projects;
    return projects.filter(project =>
      project.categories.some(cat => activeFilters.includes(cat))
    );
  }, [activeFilters]);

  // Handle sticky current card behavior when filters change
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (!swiperRef.current || filteredProjects.length === 0) return;

    const currentId = currentProjectIdRef.current;
    const currentIndexInFiltered = filteredProjects.findIndex(p => p.id === currentId);

    isFilterTransitioning.current = true;

    if (currentIndexInFiltered !== -1) {
      // Current card still valid - slide to its new position instantly
      swiperRef.current.slideTo(currentIndexInFiltered, 0);
      setTimeout(() => {
        isFilterTransitioning.current = false;
      }, 50);
    } else {
      // Current card filtered out - find nearest valid project
      const currentOriginalIndex = projects.findIndex(p => p.id === currentId);
      
      let nearestProject = filteredProjects[0];
      let minDistance = Infinity;
      
      for (const project of filteredProjects) {
        const projectOriginalIndex = projects.findIndex(p => p.id === project.id);
        const distance = Math.abs(projectOriginalIndex - currentOriginalIndex);
        if (distance < minDistance) {
          minDistance = distance;
          nearestProject = project;
        }
      }

      const targetIndex = filteredProjects.findIndex(p => p.id === nearestProject.id);
      currentProjectIdRef.current = nearestProject.id;
      setCurrentProjectId(nearestProject.id);
      swiperRef.current.slideTo(targetIndex, 300);
      
      setTimeout(() => {
        isFilterTransitioning.current = false;
      }, 350);
    }
  }, [activeFilters, filteredProjects]);

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
    if (isFilterTransitioning.current) return;
    
    const realIndex = swiper.realIndex;
    if (filteredProjects[realIndex]) {
      setCurrentProjectId(filteredProjects[realIndex].id);
    }
  };

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
        {filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-white/70 text-lg mb-4">No projects match these filters</p>
            <button
              onClick={() => setActiveFilters([])}
              className="px-6 py-2 rounded-full border border-white/40 text-white/80 hover:bg-white/10 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <Swiper
            key={filteredProjects.length >= 3 ? 'loop' : 'no-loop'}
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            onSlideChange={handleSlideChange}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            initialSlide={filteredProjects.findIndex(p => p.id === currentProjectId) || 0}
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
            }}
            pagination={{
              clickable: true,
            }}
            modules={[EffectCoverflow, Pagination, Mousewheel, FreeMode]}
            className="projects-carousel w-full max-w-7xl"
          >
            {filteredProjects.map((project) => (
              <SwiperSlide key={project.id} className="swiper-slide-custom">
                <div
                  className={`relative w-[340px] md:w-[600px] h-[260px] md:h-[420px] rounded-3xl overflow-hidden group cursor-pointer ${!project.image ? `bg-gradient-to-br ${project.gradient}` : ''}`}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Content */}
                  <div className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-end">
                    <p className="text-white/70 text-sm tracking-wide uppercase mb-2">
                      {project.subtitle}
                    </p>
                    <h3 className="text-white text-xl md:text-2xl font-bold mb-3">
                      {project.title}
                    </h3>
                    
                    {/* Tag Pills */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs rounded-full border border-white/30 text-white/80 bg-white/10 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap justify-center gap-3 mt-10 px-4">
        {FILTER_CATEGORIES.map((filter) => (
          <button
            key={filter}
            onClick={() => toggleFilter(filter)}
            className={`
              px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-300
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
    </section>
  );
}
