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
    meta: {
      client: 'NPR',
      timeline: 'Summer to Fall 2023 (5 months)',
      outcome: 'Used by thousands of users before sunset in 2024',
      quickLinks: [
        {
          label: 'View Figma file',
          url: 'https://www.figma.com/design/90QF6KkETnDvmy85j9h2xL/Planet-Money-Design--Copy-?node-id=1262-6744&t=a7W8tnRNlraAX71g-1',
        },
        {
          label: 'Read the article',
          url: 'https://jskfellows.stanford.edu/can-we-build-an-ai-chatbot-for-journalism-79ffe39e053e',
        },
      ],
    },
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
    meta: {
      client: 'Spiber (via UltraSuperNew)',
      timeline: 'Summer 2024 (6 weeks)',
      outcome: 'Site went live at spiber.inc/en',
      quickLinks: [
        { label: 'Visit live site', url: 'https://spiber.inc/en' },
        {
          label: 'View pitch deck',
          url: 'https://www.figma.com/proto/NKAgY4tM2uA6gjMtBG9VVe/Spiber---For-Client--Copy-?node-id=1-196&t=eEYNp2ZyP6b2azcp-1',
        },
        {
          label: 'View Figma file',
          url: 'https://www.figma.com/design/NKAgY4tM2uA6gjMtBG9VVe/Spiber---For-Client--Copy-?node-id=827-4244&t=eEYNp2ZyP6b2azcp-1',
        },
      ],
    },
    blocks: [
      {
        type: 'context',
        content:
          "Spiber is a Japanese biotech company making Brewed Protein materials, a new class of sustainable fiber grown through microbial fermentation. They came to UltraSuperNew with a clear ambition: grow the company. Their existing site was dense and B2C-flavored, and it wasn't speaking to the audiences that would actually move the business forward. We spent six weeks with them in Summer 2024, three weeks on content strategy and structure and three weeks on wireframing, meeting with the client every week.",
      },
      {
        type: 'featuredImage',
        src: spiberFinalSite,
        alt: 'Live Spiber homepage at spiber.inc/en',
        aspect: '16/9',
        width: 'md',
      },
      {
        type: 'figmaEmbed',
        heading: 'Research and Proposals',
        content:
          "We began by interviewing the Spiber team to understand who they actually needed to reach and what those people needed from the site. From those conversations we mapped four audience types: investors, brands and designers and mills, academia, and future talent. Each came with distinct questions the site had to answer. In parallel we audited the existing site to find the gaps and friction points, and reviewed how peer biotech and materials companies presented themselves to similar audiences. Those inputs shaped six objectives for the project: brand alignment, user engagement, mobile responsiveness, content optimization, backend management, and HR requirements. From there we worked page by page. We proposed adding Protein Fiber as a top-level section so the core product had its own home, introduced an Impact and Sustainability section to give the company's stance a clear place to live, trimmed the homepage's featured projects down to three or four for focus, and added a clear Contact Us at the bottom of the homepage. The Innovation page grew from three sections to six (Hero, Research Areas, Research Highlights, Index Filters, Papers Grid, Join Us), and we moved the papers index from two columns to one so it could actually be read. Every move was tied back to an audience need, not a preference.",
        url: 'https://embed.figma.com/design/NKAgY4tM2uA6gjMtBG9VVe/Spiber---For-Client--Copy-?node-id=1-196&embed-host=share',
        externalUrl:
          'https://www.figma.com/proto/NKAgY4tM2uA6gjMtBG9VVe/Spiber---For-Client--Copy-?node-id=1-196&t=eEYNp2ZyP6b2azcp-1',
        linkLabel: 'Check out the full Figma file here.',
        interactiveHint: true,
        size: 'contained',
      },
      {
        type: 'processNarrative',
        heading: 'Sitemap',
        content:
          "Once the content strategy was aligned, we translated it into structure. The goal was a site a first-time visitor could navigate without a guide, with each audience finding their path within a click or two. We grouped content into clear hubs: Discover for the product story, Sustainability for impact and stance, About Us for the company and team, and Careers as a real destination rather than a footer link. Pages that had been doing too much got split. Pages that had been buried got pulled up.",
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
        content:
          'The final structure factored in mobile from the start, treating it as a primary surface rather than a downstream concern. Navigation hierarchy, section depth, and call-to-action placement were all checked against a small screen before being signed off.',
        url: 'https://embed.figma.com/design/NKAgY4tM2uA6gjMtBG9VVe/Spiber---For-Client--Copy-?node-id=827-4244&embed-host=share',
        externalUrl:
          'https://www.figma.com/design/NKAgY4tM2uA6gjMtBG9VVe/Spiber---For-Client--Copy-?node-id=827-4244&t=eEYNp2ZyP6b2azcp-1',
        linkLabel: 'See the full Figma file',
      },
      {
        type: 'processNarrative',
        heading: 'Wireframes',
        content:
          'With the structure approved, we wireframed the key page types across desktop and mobile to set reusable patterns: the top page, product detail pages for Brewed Protein, content hubs like Discover and Sustainability, and the contact and careers forms. Each layout was drawn for both breakpoints in parallel so the responsive behavior was a design decision rather than an afterthought.',
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
