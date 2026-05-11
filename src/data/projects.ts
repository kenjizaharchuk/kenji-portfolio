import planetMoney from '@/assets/planet-money.png';
import spotifyFeature from '@/assets/spotify-feature.png';
import geniusRedesign from '@/assets/genius-redesign.png';
import spiberProject from '@/assets/spiber-project.png';
import pmbEarlySketches1 from '@/assets/pmb-early-sketches-1.png';
import pmbEarlySketches2 from '@/assets/pmb-early-sketches-2.png';
import pmbMidFidelity1 from '@/assets/pmb-mid-fidelity-1.png';
import pmbMidFidelity2 from '@/assets/pmb-mid-fidelity-2.png';
import pmbFinalScreens from '@/assets/pmb-final-screens.jpg';
import pmbArticleThumb from '@/assets/pmb-article-thumb.png';
import pmbLaptopHero from '@/assets/pmb-laptop-hero.png';

export type Block =
  | { type: 'context'; content: string }
  | { type: 'gallery'; images: { src: string; alt: string }[] }
  | { type: 'pullQuote'; content: string; attribution?: string }
  | { type: 'embed'; label: string; src?: string }
  | { type: 'process'; content: string; image: string; imageAlt: string }
  | {
      type: 'processNarrative';
      heading: string;
      content: string;
      images: { src?: string; alt: string; aspect?: '4/3' | '16/9' | '1/1' | '21/9' }[];
    }
  | {
      type: 'featuredImage';
      src: string;
      alt: string;
      aspect?: '16/10' | '16/9' | '21/9' | '4/3' | '1/1';
      width?: 'sm' | 'md' | 'lg' | 'full';
    }
  | { type: 'figmaEmbed'; url: string; heading?: string; title?: string }
  | {
      type: 'featuredArticle';
      source: string;
      title: string;
      description: string;
      date: string;
      url: string;
      thumbnail?: string;
    }
  | { type: 'outcome'; content: string };

export interface ProjectDetail {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  heroImage: string;
  heroImagePosition?: string;
  blocks: Block[];
}

const FIGMA_PLACEHOLDER_URL =
  'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FFP7lqd1V00LUaT5zvdklkkkk%2FFigma-Basics';

export const projectDetails: ProjectDetail[] = [
  {
    slug: 'planet-money-bot',
    title: 'Planet Money Bot',
    subtitle: 'Lead Designer',
    category: 'Digital Design · Work Experience',
    tags: ['User Research', 'Brand Development', 'UI/UX', 'A/B Testing', 'Figma'],
    heroImage: planetMoney,
    blocks: [
      {
        type: 'context',
        content:
          "Planet Money Bot is a conversational chatbot that lets users explore economics through NPR's Planet Money archive. In partnership with NPR, I led the UX and interface design from raw prototype to launch, focusing on usability, transparency, and play. Goal: build a website to boost engagement with the extensive Planet Money podcast archives.",
      },
      {
        type: 'featuredImage',
        src: pmbLaptopHero,
        alt: 'Planet Money Bot landing page on a laptop',
        aspect: '16/10',
        width: 'sm',
      },
      {
        type: 'processNarrative',
        heading: 'Early Experiments & Wireframes',
        content:
          'Early wireframes explored interface flows: preloading sources before LLM answers, expanding transcripts in Spotify-like formats. These mapped user intent and clarified feature hierarchy.',
        images: [
          { src: pmbEarlySketches1, alt: 'Early wireframe sketch 1', aspect: '16/9' },
          { src: pmbEarlySketches2, alt: 'Early wireframe sketch 2', aspect: '16/9' },
        ],
      },
      {
        type: 'processNarrative',
        heading: 'Mid-Fidelity Iterations & UX Decisions',
        content:
          'Mid-fidelity iterations tested answer states, feedback flows, accessibility, and error handling. A/B testing with FullStory on hundreds of users informed each round of refinement.',
        images: [
          { src: pmbMidFidelity1, alt: 'Mid-fidelity Figma screen 1', aspect: '4/3' },
          { src: pmbMidFidelity2, alt: 'Mid-fidelity Figma screen 2', aspect: '4/3' },
        ],
      },
      {
        type: 'figmaEmbed',
        heading: 'Interactive prototype',
        url: 'https://embed.figma.com/design/90QF6KkETnDvmy85j9h2xL/Planet-Money-Design--Copy-?node-id=1051-2710&embed-host=share',
      },
      {
        type: 'processNarrative',
        heading: 'Final UI & Visual Language',
        content:
          "The final system used soft greens and retro typography to reflect Planet Money's tone. Engagement scaled from hundreds to thousands of users.",
        images: [],
      },
      {
        type: 'featuredImage',
        src: pmbFinalScreens,
        alt: 'Final Planet Money Bot screens across phone and laptop',
        aspect: '21/9',
        width: 'lg',
      },
      {
        type: 'outcome',
        content:
          'Planet Money Bot is no longer live. The founder chose to sunset the project in early 2024.',
      },
      {
        type: 'featuredArticle',
        source: 'JSK Fellows',
        title: 'Can We Build An AI Chatbot For Journalism?',
        description:
          "Early Lessons In Accuracy, Sourcing, and Delight From A (Draft) Chatbot Based on NPR's Planet Money Archives",
        date: 'Apr 17, 2023',
        url: '#',
        thumbnail: pmbArticleThumb,
      },
    ],
  },
  {
    slug: 'spiber',
    title: 'Spiber Brewed Protein',
    subtitle: 'Creative Intern',
    category: 'Digital Design · Work Experience',
    tags: ['Wireframing', 'Interface Design', 'Figma'],
    heroImage: spiberProject,
    blocks: [
      {
        type: 'context',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placeholder context paragraph for the Spiber case study. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
      {
        type: 'processNarrative',
        heading: 'Early Exploration',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placeholder narrative for the early phase. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        images: [
          { alt: 'Spiber early exploration 1', aspect: '4/3' },
          { alt: 'Spiber early exploration 2', aspect: '4/3' },
        ],
      },
      {
        type: 'figmaEmbed',
        heading: 'Interactive prototype',
        url: FIGMA_PLACEHOLDER_URL,
      },
      {
        type: 'processNarrative',
        heading: 'Final Direction',
        content:
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Placeholder narrative for the final phase.',
        images: [
          { alt: 'Spiber final direction 1', aspect: '4/3' },
          { alt: 'Spiber final direction 2', aspect: '4/3' },
        ],
      },
      {
        type: 'outcome',
        content:
          'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Placeholder outcome line.',
      },
      {
        type: 'featuredArticle',
        source: 'Publication Placeholder',
        title: 'Placeholder Article Title',
        description: 'Placeholder description line for the featured article card.',
        date: 'Jan 1, 2024',
        url: '#',
      },
    ],
  },
];

export const getProjectBySlug = (slug: string) =>
  projectDetails.find((p) => p.slug === slug);
