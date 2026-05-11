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
import spiberFinalSite from '@/assets/spiber-final-site.png';
import spiberAudienceInsights from '@/assets/spiber-audience-insights.png';
import spiberProposalTopPage from '@/assets/spiber-proposal-top-page.png';
import spiberProposalInnovation from '@/assets/spiber-proposal-innovation.png';
import spiberSitemapInvestors from '@/assets/spiber-sitemap-investors.png';

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
        width?: 'sm' | 'md' | 'lg' | 'full';
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
        type: 'processNarrative',
        heading: 'Audience Insights',
        content:
          "We started by mapping who the site actually needed to reach. Four audiences came out of our interviews with the Spiber team and our audit of the existing site: investors looking for traction and credibility, brands and designers and mills evaluating the material, academia tracking the science, and future talent weighing the company. Each one walked in with different questions, and the site had to answer them on the first or second screen. Every structural decision that followed traces back to this map.",
        images: [
          {
            src: spiberAudienceInsights,
            alt: 'Insights slide: what each audience expects to see on the Spiber website',
            aspect: 'natural',
            width: 'lg',
          },
        ],
      },
      {
        type: 'processNarrative',
        heading: 'Page-level Proposals',
        content:
          "Every page on the existing site got the same treatment: a side-by-side of what was there, what we proposed, and why. The rationale was always tied back to one of the four audiences and one of the six project objectives, so changes were arguments rather than preferences. The homepage is one example. We pulled Protein Fiber up to a top-level section so the core product had its own home, added Impact and Sustainability so the company's stance had somewhere to live, trimmed the featured projects down so a first-time visitor could actually see what Spiber makes, and dropped a clear Contact Us at the bottom. The Innovation page is another. It grew from three sections to six and the papers index moved from two columns to one so it could actually be read.",
        images: [
          {
            src: spiberProposalTopPage,
            alt: 'Top Page proposal: current versus proposed homepage structure with rationale',
            aspect: 'natural',
            width: 'lg',
          },
          {
            src: spiberProposalInnovation,
            alt: 'Innovation Page proposal: current versus proposed structure with rationale',
            aspect: 'natural',
            width: 'lg',
          },
        ],
      },
      {
        type: 'processNarrative',
        heading: 'Final Sitemap',
        content:
          "The final structure doubles as a map of how each audience moves through the site. Investors land on traction and contact, brands and designers head into Protein Fiber and Discover, academia goes to Innovation, future talent goes to Careers. Mobile was treated as a primary surface from the start, so navigation depth, section hierarchy, and call-to-action placement were all checked at small screens before sign-off.",
        images: [
          {
            src: spiberSitemapInvestors,
            alt: 'Final sitemap with the investor path highlighted across the site',
            aspect: 'natural',
            width: 'lg',
          },
        ],
      },
      {
        type: 'figmaEmbed',
        heading: 'Final Wireframes',
        content:
          'With the structure approved, we wireframed the key page types across desktop and mobile in parallel, so responsive behavior was a design decision rather than an afterthought.',
        url: 'https://embed.figma.com/design/NKAgY4tM2uA6gjMtBG9VVe/Spiber---For-Client--Copy-?node-id=827-4244&embed-host=share',
        externalUrl:
          'https://www.figma.com/design/NKAgY4tM2uA6gjMtBG9VVe/Spiber---For-Client--Copy-?node-id=827-4244&t=eEYNp2ZyP6b2azcp-1',
        linkLabel: 'See the full Figma file',
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
