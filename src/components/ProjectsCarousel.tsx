import { useState, useMemo, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { EffectCoverflow, Mousewheel, FreeMode, Keyboard } from 'swiper/modules';

// @ts-ignore
import 'swiper/css';
// @ts-ignore
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
import rizzleAi from '@/assets/rizzle-ai.png';
import notesFromFarm from '@/assets/notes-from-farm.jpg';
import timeCapsule from '@/assets/time-capsule.jpg';
import sensoryPuzzle from '@/assets/sensory-puzzle.jpg';

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
  link?: string;
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
    id: 5,
    title: 'Wooden Clock',
    subtitle: 'Functional Art',
    image: woodenClock,
    tags: ['Wood Working', 'Sculptural Aesthetics', 'Hardware Integration'],
    categories: ['Physical Design', 'Art'],
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
    link: 'https://news.stanford.edu/stories/2025/11/ultrasound-technique-aging-injured-brains-neurodegeneration-treatment-research',
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
    id: 3,
    title: 'North Star Pendant',
    subtitle: 'Silversmithing',
    image: northStarPendant,
    imagePosition: '40% 15%',
    tags: ['CAD', 'Form 4 SLA Printing', 'Investment Casting', 'Sterling Silver'],
    categories: ['Physical Design'],
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
    id: 21,
    title: 'Rizzle AI',
    subtitle: 'AI Media',
    image: rizzleAi,
    tags: ['AI Systems', 'Product Strategy'],
    categories: ['Work Experience'],
    link: 'https://rizzle.com',
  },
  {
    id: 6,
    title: 'Discord Tokyo Game Show Booth',
    subtitle: 'Creative Intern · UltraSuperNew Inc.',
    image: discordBooth,
    tags: ['Experience Design', 'Concept Development', 'Client Presentation'],
    categories: ['Digital Design', 'Work Experience'],
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
    id: 2,
    title: 'Mountain Sculpture',
    subtitle: 'Sculpture',
    image: randomSculpture,
    tags: ['Paper Mache', 'Plaster', 'Hand Sculpting'],
    categories: ['Art'],
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
    id: 18,
    title: 'Notes From the Farm',
    subtitle: 'Book of Student Stories',
    image: notesFromFarm,
    tags: ['Brand Design', 'Marketing Campaign', 'End to End Production'],
    categories: ['Physical Design'],
    link: 'https://news.stanford.edu/stories/2025/05/notes-from-farm-book-advice-tips-incoming-students',
  },
  {
    id: 19,
    title: 'Time Capsule',
    subtitle: 'Metal Working Exploration',
    image: timeCapsule,
    tags: ['Waterjet Cutting', 'TIG Welding', 'Aluminum Casting'],
    categories: ['Physical Design'],
  },
  {
    id: 20,
    title: 'Sensory Puzzle',
    subtitle: 'An Inclusive Approach to Play',
    image: sensoryPuzzle,
    tags: ['Accessible Design', 'Rapid Prototyping'],
    categories: ['Physical Design'],
    link: 'https://www.youtube.com/watch?v=OM2aNGwdu0M',
  },
];

export function ProjectsCarousel() {
  const [activeFilters, setActiveFilters] = useState<FilterCategory[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState<number>(projects[2].id);
  const swiperRef = useRef<SwiperType | null>(null);

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
    <section id="things" className="relative min-h-screen pt-48 pb-16 md:pb-20 flex-col flex items-center justify-center py-[96px]">
      <div id="things-content" className="w-full flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-9 mt-8">
...
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
