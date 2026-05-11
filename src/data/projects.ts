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
import spiberInitialSitemap from '@/assets/spiber-initial-sitemap.png';
import spiberWireframe1 from '@/assets/spiber-wireframe-1.png';
import spiberWireframe2 from '@/assets/spiber-wireframe-2.png';
import spiberFinalSite from '@/assets/spiber-final-site.png';

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
      images: {
        src?: string;
        alt: string;
        aspect?: '4/3' | '16/9' | '1/1' | '21/9' | '16/10' | '3/2' | 'natural';
        fit?: 'cover' | 'contain';
      }[];
    }
  | {
      type: 'featuredImage';
      src: string;
      alt: string;
      aspect?: '16/10' | '16/9' | '21/9' | '4/3' | '1/1';
      width?: 'sm' | 'md' | 'lg' | 'full';
    }
  | {
      type: 'figmaEmbed';
      url: string;
      heading?: string;
      title?: string;
      content?: string;
      externalUrl?: string;
      linkLabel?: string;
      interactiveHint?: boolean;
      size?: 'default' | 'contained';
    }
  | {
      type: 'liveLink';
      url: string;
      label: string;
      description?: string;
    }
  | {
      type: 'featuredArticle';
      source: string;
      title: string;
      description: string;
      date: string;
      url: string;
      thumbnail?: string;
    }
  | { type: 'outcome'; content: string; ctaUrl?: string; ctaLabel?: string };

export interface ProjectMeta {
  client?: string;
  timeline?: string;
  outcome?: string;
  quickLinks?: { label: string; url: string }[];
}

export interface ProjectDetail {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  heroImage: string;
  heroImagePosition?: string;
  meta?: ProjectMeta;
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
        url: 'https://embed.figma.com/design/90QF6KkETnDvmy85j9h2xL/Planet-Money-Design--Copy-?node-id=1262-6744&embed-host=share',
        externalUrl:
          'https://www.figma.com/design/90QF6KkETnDvmy85j9h2xL/Planet-Money-Design--Copy-?node-id=1262-6744&embed-host=share',
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
        url: 'https://jskfellows.stanford.edu/can-we-build-an-ai-chatbot-for-journalism-79ffe39e053e',
        thumbnail: pmbArticleThumb,
      },
    ],
  },
  {
    slug: 'spiber',
    title: 'Spiber',
    subtitle: 'Creative Intern',
    category: 'Digital Design · Work Experience',
    tags: ['Information Architecture', 'Wireframing', 'Sitemap Design', 'Figma'],
    heroImage: spiberProject,
    blocks: [
      {
        type: 'context',
        content:
          "Spiber is a Japanese biotech company creating Brewed Protein materials. As an intern at UltraSuperNew, I worked alongside my mentor on a B2B-focused website refresh over six weeks: three weeks on content strategy and structure, three weeks on wireframing, with weekly client check-ins throughout. The goal was to translate disorganized information into a clear, navigable site for business audiences including investors, sustainability-focused brands, and potential hires.",
      },
      {
        type: 'figmaEmbed',
        heading: 'Research and Proposals',
        content:
          'Work started with audience research and page-by-page content proposals. We mapped what each audience type needed to find on the site, then proposed structural and content changes for key pages, presenting to the client weekly.',
        url: 'https://embed.figma.com/design/NKAgY4tM2uA6gjMtBG9VVe/Spiber---For-Client--Copy-?node-id=1-196&embed-host=share',
        externalUrl:
          'https://www.figma.com/proto/NKAgY4tM2uA6gjMtBG9VVe/Spiber---For-Client--Copy-?node-id=1-196&t=eEYNp2ZyP6b2azcp-1',
        linkLabel: 'See the full deck',
        interactiveHint: true,
        size: 'contained',
      },
      {
        type: 'processNarrative',
        heading: 'Sitemap',
        content:
          'With content strategy aligned, we mapped the full site structure. Early exploration identified gaps in the existing architecture. The final sitemap reorganized content into clearer hubs for Discover, Sustainability, About Us, and Careers.',
        images: [
          {
            src: spiberInitialSitemap,
            alt: 'Initial sitemap exploration for Spiber',
            aspect: 'natural',
          },
        ],
      },
      {
        type: 'figmaEmbed',
        heading: 'Final Sitemap',
        content: 'Iterated structure with mobile considerations baked in.',
        url: 'https://embed.figma.com/design/NKAgY4tM2uA6gjMtBG9VVe/Spiber---For-Client--Copy-?node-id=827-4244&embed-host=share',
        externalUrl:
          'https://www.figma.com/design/NKAgY4tM2uA6gjMtBG9VVe/Spiber---For-Client--Copy-?node-id=827-4244&t=eEYNp2ZyP6b2azcp-1',
        linkLabel: 'See the full Figma file',
      },
      {
        type: 'processNarrative',
        heading: 'Wireframes',
        content:
          'With structure approved, we wireframed key pages across desktop and mobile, establishing layout patterns for the top page, product detail pages, content hubs, and forms.',
        images: [
          {
            src: spiberWireframe1,
            alt: 'Spiber wireframes: top page and protein fiber detail',
            aspect: 'natural',
          },
          {
            src: spiberWireframe2,
            alt: 'Spiber wireframes: Discover hub and content pages',
            aspect: 'natural',
          },
        ],
      },
      {
        type: 'outcome',
        content: "The site went live on Spiber's domain.",
        ctaUrl: 'https://spiber.inc/en',
        ctaLabel: 'Visit spiber.inc/en ↗',
      },
    ],
  },
];

export const getProjectBySlug = (slug: string) =>
  projectDetails.find((p) => p.slug === slug);
