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
import mapleLeafPunch from '@/assets/maple-leaf-punch.jpg';
import northStarPendant from '@/assets/north-star-pendant.png';
import airanLab from '@/assets/airan-lab.png';
import rizzleAi from '@/assets/rizzle-ai.png';
import notesFromFarm from '@/assets/notes-from-farm.jpg';
import timeCapsule from '@/assets/time-capsule.jpg';
import sensoryPuzzle from '@/assets/sensory-puzzle.jpg';
import stoneLanternMold from '@/assets/stone-lantern-mold.JPG.asset.json';

export const FILTER_CATEGORIES = [
  'Physical Design',
  'Digital Design',
  'Art',
  'Work Experience',
] as const;

export type FilterCategory = typeof FILTER_CATEGORIES[number];

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  gradient?: string;
  image?: string;
  imagePosition?: string;
  tags: string[];
  categories: FilterCategory[];
  link?: string;
  slug?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Hand Pendant',
    subtitle: 'Silversmithing',
    image: silverPendant,
    tags: ['CAD', 'Form 4 SLA Printing', 'Investment Casting', 'Sterling Silver', 'LiDAR 3D Scanning', 'Blender'],
    categories: ['Physical Design'],
  },
  {
    id: 22,
    title: 'Stone Lantern Mold',
    subtitle: 'Additive Manufacturing for Repeatable Casting',
    image: stoneLanternMold.url,
    imagePosition: 'center 30%',
    tags: ['TPU 3D Printing', 'Mold Design', 'Hydrostatic Simulation', 'Design for Manufacturing', 'Fusion 360'],
    categories: ['Physical Design'],
    link: 'https://docs.google.com/presentation/d/1g2llmE0ZVSJEn_Gelu62Pbc-JVPjGG4jQrhqtQxfGEY/edit?usp=sharing',
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
    tags: ['Mechanical Design', 'Fusion 360', '3D Printing', 'Prototyping', 'Hardware'],
    categories: ['Physical Design', 'Work Experience'],
    slug: 'airan-lab',
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
    slug: 'planet-money-bot',
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
    tags: ['Experience Design', 'Concept Development', 'Client Presentation', 'Midjourney', 'Adobe Illustrator'],
    categories: ['Digital Design', 'Work Experience'],
    slug: 'discord',
  },
  {
    id: 7,
    title: 'New Spotify Feature',
    subtitle: 'Product Feature Concept',
    image: spotifyFeature,
    tags: ['Figma', 'UI/UX Design', 'Design System Consistency'],
    categories: ['Digital Design'],
    slug: 'spotify',
  },
  {
    id: 8,
    title: 'Genius Lyrics Redesign',
    subtitle: 'Creative Brand Expansion',
    image: geniusRedesign,
    imagePosition: 'center 78%',
    tags: ['Figma', 'UI/UX Design', 'Opportunity Mapping', 'Visual Systems'],
    categories: ['Digital Design'],
    slug: 'genius-lyrics',
  },
  {
    id: 9,
    title: 'Spiber Brewed Protein',
    subtitle: 'Creative Intern · UltraSuperNew Inc.',
    image: spiberProject,
    tags: ['Information Architecture', 'Wireframing', 'Sitemap Design', 'Figma'],
    categories: ['Digital Design', 'Work Experience'],
    slug: 'spiber',
  },
  {
    id: 10,
    title: 'SKYN',
    subtitle: 'Creative Intern · UltraSuperNew Inc.',
    image: skynProject,
    tags: ['Digital Design', 'Concept Development', 'Brand Consistency', 'Figma'],
    categories: ['Digital Design', 'Work Experience'],
    slug: 'skyn',
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

export const getCarouselProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
