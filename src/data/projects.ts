import planetMoney from '@/assets/planet-money.png';
import spotifyFeature from '@/assets/spotify-feature.png';
import geniusRedesign from '@/assets/genius-redesign.png';

export type Block =
  | { type: 'context'; content: string }
  | { type: 'gallery'; images: { src: string; alt: string }[] }
  | { type: 'pullQuote'; content: string; attribution?: string }
  | { type: 'embed'; label: string; src?: string }
  | { type: 'process'; content: string; image: string; imageAlt: string }
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
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Planet Money Bot was a conversational interface designed to make economic news feel personal and approachable. We started with a simple question — what if listeners could talk back to the show? Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
      {
        type: 'gallery',
        images: [
          { src: spotifyFeature, alt: 'Early concept exploration' },
          { src: geniusRedesign, alt: 'Mid-fidelity prototype screen' },
        ],
      },
      {
        type: 'pullQuote',
        content:
          'The best interfaces feel like a conversation you wanted to have anyway — not a form you have to fill out.',
        attribution: 'Design principle we returned to often',
      },
      {
        type: 'embed',
        label: 'Figma/CAD embed area',
      },
      {
        type: 'process',
        content:
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. We ran four rounds of usability testing with real listeners, iterating on tone, pacing, and the bot\'s sense of humor. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        image: geniusRedesign,
        imageAlt: 'Process sketch and iteration board',
      },
      {
        type: 'outcome',
        content:
          'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. The final product shipped to early-access listeners and outperformed the baseline retention metric by a meaningful margin. Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
      },
    ],
  },
];

export const getProjectBySlug = (slug: string) =>
  projectDetails.find((p) => p.slug === slug);
