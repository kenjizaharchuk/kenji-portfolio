import { useState, useMemo, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { EffectCoverflow, Mousewheel, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';


import randomSculpture from '@/assets/random-sculpture.jpeg';
import silverPendant from '@/assets/silver-pendant.jpeg';
import discordBooth from '@/assets/discord-booth.png';
import spotifyFeature from '@/assets/spotify-feature.png';
import woodenClock from '@/assets/wooden-clock.jpg';
import upHouse from '@/assets/up-house.jpeg';
import geniusRedesign from '@/assets/genius-redesign.png';
import spiberProject from '@/assets/spiber-project.png';
import skynProject from '@/assets/skyn-project.png';
import planetMoney from '@/assets/planet-money.png';
import objectsOfHome from '@/assets/objects-of-home.jpg';
import photogramImages from '@/assets/photogram-images.jpg';
import artSculpture from '@/assets/art-sculpture.jpg';
import frenchFryWhistle from '@/assets/french-fry-whistle.jpg';
import mapleLeafPunch from '@/assets/maple-leaf-punch.jpg';
import northStarPendant from '@/assets/north-star-pendant.png';
import airanLab from '@/assets/airan-lab.png';

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
  imagePosition?: string;
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
    title: 'Mountain Sculpture',
    subtitle: 'Sculpture',
    image: randomSculpture,
    tags: ['Paper Mache', 'Plaster', 'Hand Sculpting'],
    categories: ['Art'],
  },
  {
    id: 3,
    title: 'North Star Pendant',
    subtitle: 'Silversmithing',
    image: northStarPendant,
    imagePosition: '40% 15%',
    tags: ['CAD', 'Form 4 SLA Printing', 'Investment Casting', 'Sterling Silver'],
    categories: ['Physical Design'],
  },
  {
    id: 4,
    title: 'Up House',
    subtitle: 'Model Fabrication',
    image: upHouse,
    tags: ['CAD', '3D Printing', 'Laser Cutting'],
    categories: ['Physical Design'],
  },
  {
    id: 5,
    title: 'Wooden Clock',
    subtitle: 'Functional Art',
    image: woodenClock,
    tags: ['Wood Working', 'Sculptural Aesthetics', 'Hardware Integration'],
    categories: ['Physical Design', 'Art'],
  },
  {
    id: 6,
    title: 'Discord Tokyo Game Show Booth',
    subtitle: 'Creative Intern · UltraSuperNew Inc.',
    image: discordBooth,
    tags: ['Experience Design', 'Concept Development', 'Client Presentation'],
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
    title: 'Genius Lyrics Redesign',
    subtitle: 'Creative Brand Expansion',
    image: geniusRedesign,
    imagePosition: 'center 78%',
    tags: ['Figma', 'UI/UX Design', 'Opportunity Mapping', 'Visual Systems'],
    categories: ['Digital Design'],
  },
  {
    id: 9,
    title: 'Spiber Brewed Protein',
    subtitle: 'Creative Intern · UltraSuperNew Inc.',
    image: spiberProject,
    tags: ['Wireframing', 'Interface Design', 'Figma'],
    categories: ['Digital Design', 'Work Experience'],
  },
  {
    id: 10,
    title: 'SKYN',
    subtitle: 'Creative Intern · UltraSuperNew Inc.',
    image: skynProject,
    tags: ['Digital Design', 'Concept Development', 'Brand Consistency', 'Figma'],
    categories: ['Digital Design', 'Work Experience'],
  },
  {
    id: 11,
    title: 'Planet Money Bot',
    subtitle: 'Lead Designer',
    image: planetMoney,
    tags: ['User Research', 'Brand Development', 'UI/UX', 'A/B Testing', 'Figma'],
    categories: ['Digital Design', 'Work Experience'],
  },
  {
    id: 12,
    title: 'Objects of Home',
    subtitle: 'Personal Exploration',
    image: objectsOfHome,
    tags: ['DSLR Photography', 'Canon T4i'],
    categories: ['Art'],
  },
  {
    id: 13,
    title: 'Photogram Images',
    subtitle: 'Darkroom Photography',
    image: photogramImages,
    tags: ['Analog Technique', 'Material Exploration', 'Form and Shadow'],
    categories: ['Art'],
  },
  {
    id: 14,
    title: 'Metal Forrest Sculpture',
    subtitle: 'Multimaterial Fabrication',
    image: artSculpture,
    tags: ['MIG Welding', 'Plasma Cutting', 'Sand Casting', 'Ceramics'],
    categories: ['Art'],
  },
  {
    id: 15,
    title: 'French Fry Whistle',
    subtitle: 'Advanced Machining',
    image: frenchFryWhistle,
    imagePosition: 'center 30%',
    tags: ['CNC', 'CAD', 'CAM'],
    categories: ['Physical Design'],
  },
  {
    id: 16,
    title: 'Maple Leaf Paper Punch',
    subtitle: 'Advanced Machining',
    image: mapleLeafPunch,
    imagePosition: 'center 30%',
    tags: ['CNC', 'CAD', 'CAM', 'Mechanical Assembly'],
    categories: ['Physical Design'],
  },
  {
    id: 17,
    title: 'Airan Lab',
    subtitle: 'Product & Mechanical Research',
    image: airanLab,
    tags: ['Rapid Prototyping', 'CAD', '3D Printing', 'Design Iteration'],
    categories: ['Physical Design', 'Work Experience'],
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
    <section id="things" className="relative min-h-screen pt-48 pb-16 md:pb-20 flex flex-col items-center justify-center">
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
              releaseOnEdges: true,
              sensitivity: 0.6,
            }}
            modules={[EffectCoverflow, Mousewheel, FreeMode]}
            className="projects-carousel w-full max-w-7xl"
          >
            {filteredProjects.map((project) => (
              <SwiperSlide key={project.id} className="swiper-slide-custom">
                <div
                  className={`relative w-[340px] md:w-[600px] h-[260px] md:h-[420px] rounded-3xl overflow-hidden border border-white/15 group cursor-pointer ${!project.image ? `bg-gradient-to-br ${project.gradient}` : ''}`}
                >
                  {/* Background Image */}
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ objectPosition: project.imagePosition || 'center' }}
                    />
                  )}

                  {/* Gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Content */}
                  <div className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-end">
                    <p className="font-display text-white/70 text-base font-semibold tracking-wide uppercase mb-2">
                      {project.subtitle}
                    </p>
                    <h3 className="font-display text-white text-2xl md:text-3xl font-bold mb-3">
                      {project.title}
                    </h3>
                    
                    {/* Tag Pills */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-display px-3 py-1 text-sm font-medium rounded-full border border-white/30 text-white/80 bg-white/10 backdrop-blur-sm"
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
    </section>
  );
}
