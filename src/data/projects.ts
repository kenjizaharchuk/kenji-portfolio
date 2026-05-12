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
import skynProject from '@/assets/skyn-project.png';
import skynFinalWebsite from '@/assets/skyn-final-website.png';
import skynArticleDesign from '@/assets/skyn-article-design.png';
import discordBooth from '@/assets/discord-booth.png';
import geniusFinalDesign from '@/assets/genius-final-design.png';
import geniusMoodboard from '@/assets/genius-moodboard.png';
import geniusBrandGuide from '@/assets/genius-brand-guide.png';
import geniusMusicalTimeline from '@/assets/genius-musical-timeline.png';

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
        width?: 'xs' | 'sm' | 'md' | 'lg' | 'full';
        bare?: boolean;
        externalLink?: { label: string; url: string };
      }[];
    }
  | {
      type: 'featuredImage';
      src: string;
      alt: string;
      aspect?: '16/10' | '16/9' | '21/9' | '4/3' | '1/1' | 'natural';
      width?: 'xs' | 'sm' | 'md' | 'lg' | 'full';
      bare?: boolean;
      tightSpacing?: boolean;
      externalLink?: { label: string; url: string };
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
      interactiveHintText?: string;
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
    title: 'Spiber Brewed Protein',
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
        externalLink: { label: 'Visit live site', url: 'https://spiber.inc/en' },
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
            externalLink: {
              label: 'See full slide deck',
              url: 'https://www.figma.com/proto/NKAgY4tM2uA6gjMtBG9VVe/Spiber---For-Client--Copy-?node-id=1-196&t=eEYNp2ZyP6b2azcp-1',
            },
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
          "The image shown is one view of the final sitemap, colored from the investor perspective with their priorities highlighted across the structure. We produced this same view for all four audiences, and each one lit up different parts of the site based on what that audience needed to find first. The structure itself was designed with mobile as a primary surface from the start, so navigation depth, hierarchy, and call-to-action placement were all checked at small screens before sign-off.",
        images: [
          {
            src: spiberSitemapInvestors,
            alt: 'Final sitemap with the investor path highlighted across the site',
            aspect: 'natural',
            width: 'lg',
            externalLink: {
              label: 'See full slide deck',
              url: 'https://www.figma.com/proto/NKAgY4tM2uA6gjMtBG9VVe/Spiber---For-Client--Copy-?node-id=1-196&t=eEYNp2ZyP6b2azcp-1',
            },
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
  {
    slug: 'skyn',
    title: 'SKYN',
    subtitle: 'Creative Intern',
    category: 'Digital Design · Work Experience',
    tags: ['Digital Design', 'Concept Development', 'Brand Consistency', 'Figma'],
    heroImage: skynProject,
    meta: {
      client: 'SKYN (via UltraSuperNew Inc.)',
      timeline: 'Summer 2024 · 4 weeks',
      quickLinks: [
        { label: 'Watch the campaign film', url: 'https://www.youtube.com/watch?v=DMfDWW10YDY' },
        {
          label: 'Summer Campaign Figma',
          url: 'https://www.figma.com/design/cGNUVCEtOq3poxQdkZBmqX/SKYN---Summer-Campaign-2024--Draft---Copy-?node-id=708-994',
        },
        {
          label: 'Articles Figma',
          url: 'https://www.figma.com/design/A1tnjx9O1Dr3S5bgzCaCCQ/SKYN-Articles?node-id=0-1',
        },
      ],
    },
    blocks: [
      {
        type: 'context',
        content:
          'SKYN is a condom brand whose ethos centers on "Softness," the idea that genuine connection comes from real communication and physical closeness. For Summer 2024\'s "Human Softness" campaign with UltraSuperNew, we asked whether two strangers could feel a perfect match without one actually existing. I worked on concept development, the campaign landing site, and editorial articles for SKYNBUN, SKYN\'s main editorial site.',
      },
      {
        type: 'featuredImage',
        src: skynFinalWebsite,
        alt: 'SKYN Human Softness campaign site',
        width: 'lg',
      },
      {
        type: 'processNarrative',
        heading: 'Campaign Concept',
        content:
          'The premise was a fake compatibility study. Two single volunteers each completed a series of tests with experts before being introduced and told they were nearly a 100% match. The twist: the experts were actors and the tests were rigged. By the end, both participants reported feeling a genuine connection anyway. The film argued that real attraction comes from the experience of communication and closeness, not from the algorithm telling you it should. I helped develop the experience flow, including the on-screen compatibility test sequence and the structure of the moments between the volunteers. I was also on set during filming, which was the most enjoyable part of the project.',
        images: [],
      },
      {
        type: 'figmaEmbed',
        heading: 'Summer Campaign Website',
        content:
          'The campaign site brought "Human Softness" into a digital experience: hero film, compatibility test flow, video modal, product strip, store finder. The Figma file shows the design exploration across desktop and mobile.',
        url: 'https://embed.figma.com/design/cGNUVCEtOq3poxQdkZBmqX/SKYN---Summer-Campaign-2024--Draft---Copy-?node-id=708-994&embed-host=share',
        externalUrl: 'https://www.figma.com/design/cGNUVCEtOq3poxQdkZBmqX/SKYN---Summer-Campaign-2024--Draft---Copy-?node-id=708-994',
        linkLabel: 'Open in Figma',
        interactiveHint: true,
        interactiveHintText: 'This embed is interactive. Click through to explore the Figma workspace.',
        size: 'contained',
      },
      {
        type: 'processNarrative',
        heading: 'Editorial Article Layouts',
        content:
          "Alongside the campaign site, I designed layouts for a series of editorial articles on SKYNBUN. Each article paired SKYN's brand voice with a different cultural angle: relationship science, lifestyle advice, creativity prompts, interviews. The challenge was building layouts that read playfully without losing the editorial restraint of the rest of the site. The articles are still live and have been viewed by thousands of readers.",
        images: [
          {
            src: skynArticleDesign,
            alt: 'SKYNBUN editorial article layouts across desktop and mobile',
            width: 'lg',
            externalLink: {
              label: 'Open in Figma',
              url: 'https://www.figma.com/design/A1tnjx9O1Dr3S5bgzCaCCQ/SKYN-Articles?node-id=0-1',
            },
          },
        ],
      },
      {
        type: 'outcome',
        content:
          '"Human Softness" launched across SKYN\'s Japanese social and digital channels in August 2024, anchored by a five-minute campaign film. The editorial articles I designed are still live on SKYNBUN today. The campaign landing site is no longer up, though SKYN\'s Valentine 2024 site at skynbun.jp/valentine2024 is still live as a visual reference for the era.',
        ctaUrl: 'https://www.youtube.com/watch?v=DMfDWW10YDY',
        ctaLabel: 'Watch the campaign film',
      },
    ],
  },
  {
    slug: 'genius-lyrics',
    title: 'Genius Lyrics Redesign',
    subtitle: 'Creative Brand Expansion',
    category: 'Digital Design',
    tags: ['Figma', 'UI/UX Design', 'Opportunity Mapping', 'Visual Systems'],
    heroImage: geniusRedesign,
    
    meta: {
      client: 'Personal project, Stanford Design 170 (Visual Frontiers)',
      timeline: 'Spring 2023, 6 weeks',
      quickLinks: [
        {
          label: 'Full Figma file',
          url: 'https://www.figma.com/design/3WJtXJMWNyr79vRnFzarpC/Kenji-Zaharchuk-ME-125?node-id=718-5',
        },
        { label: 'Current Genius site', url: 'https://genius.com/' },
      ],
    },
    blocks: [
      {
        type: 'context',
        content:
          "Genius is a music annotation site where users break down the meaning behind lyrics. I've used it for years and think its core idea, decoding the meaning behind the music, is one of the most genuinely interesting propositions in music tech. The site itself doesn't always reflect that. For a 6-week project in Stanford's Design 170 (Visual Frontiers), I redesigned Genius to better surface what makes it valuable: search, discussion, and the depth of community knowledge behind every song.",
      },
      {
        type: 'featuredImage',
        src: geniusFinalDesign,
        alt: 'Genius Lyrics Redesign final design',
        aspect: 'natural',
        bare: true,
        width: 'xs',
        tightSpacing: true,
      },
      {
        type: 'processNarrative',
        heading: 'Mood and Direction',
        content:
          "I started with a moodboard pulling references around Genius's existing yellow identity, then pushed toward deeper oranges, gradients, and natural textures. The goal was to keep what's distinct about the brand while making it feel less flat and more atmospheric.",
        images: [
          {
            src: geniusMoodboard,
            alt: 'Genius moodboard with logo treatments and color references',
            aspect: 'natural',
            width: 'lg',
            externalLink: {
              label: 'View in Figma',
              url: 'https://www.figma.com/design/3WJtXJMWNyr79vRnFzarpC/Kenji-Zaharchuk-ME-125?node-id=0-1&t=YBsnZz6rJLaZgv3A-1',
            },
          },
        ],
      },
      {
        type: 'processNarrative',
        heading: 'Brand Profile and Style Guide',
        content:
          "Before touching the interface, I worked out the brand foundations. Core values: sharing knowledge, community, promoting emerging artists. Voice: professional but inviting, thought-provoking, fun. I built a type system around Genius's existing Programme typeface, with a clean heading hierarchy and a refined color scheme that kept Genius yellow without the muddiness of the current site.",
        images: [
          {
            src: geniusBrandGuide,
            alt: 'Genius brand profile and style guide',
            aspect: 'natural',
            width: 'lg',
            externalLink: {
              label: 'View in Figma',
              url: 'https://www.figma.com/design/3WJtXJMWNyr79vRnFzarpC/Kenji-Zaharchuk-ME-125?node-id=44-492&t=YBsnZz6rJLaZgv3A-1',
            },
          },
        ],
      },
      {
        type: 'processNarrative',
        heading: 'A New Feature: Musical Timeline',
        content:
          "Among the new features I proposed, the Musical Timeline stood out. The idea: a yearly visual recap that pairs the music you listened to most with images from your life that year. If art is the way we decorate space, music is the way we decorate time. The timeline shows your genre breakdown across years, your top song each year, and a collage of memories alongside it. It fits Genius's core ethos. The music you loved at a given moment tells you something about who you were.",
        images: [
          {
            src: geniusMusicalTimeline,
            alt: 'Musical Timeline feature proposal showing genre breakdown over years with personal photo collages',
            aspect: 'natural',
            width: 'lg',
            externalLink: {
              label: 'View in Figma',
              url: 'https://www.figma.com/design/3WJtXJMWNyr79vRnFzarpC/Kenji-Zaharchuk-ME-125?node-id=563-3313&t=YBsnZz6rJLaZgv3A-1',
            },
          },
        ],
      },
      {
        type: 'figmaEmbed',
        heading: 'Final Product',
        content:
          'A fully interactive prototype of the redesigned Genius. Click through to explore search, discovery, and the Musical Timeline feature.',
        url: 'https://embed.figma.com/proto/3WJtXJMWNyr79vRnFzarpC/Kenji-Zaharchuk-ME-125?node-id=720-3152&p=f&scaling=scale-down&content-scaling=fixed&page-id=718%3A5&starting-point-node-id=720%3A3152&show-proto-sidebar=0&embed-host=share',
        externalUrl: 'https://www.figma.com/design/3WJtXJMWNyr79vRnFzarpC/Kenji-Zaharchuk-ME-125?node-id=718-5',
        linkLabel: 'Open in Figma',
        interactiveHint: true,
        interactiveHintText: 'This embed is interactive. Click through to explore the prototype.',
        size: 'contained',
      },
      {
        type: 'outcome',
        content:
          'I learned a lot through this project. The fundamentals the class was built around (type, color, layout, brand systems), and a quieter lesson about what makes people love a product. Rarely the logo or the palette. Usually the feel of the thing in use. Genius has the foundation for that, and the redesign was an attempt to bring more of it to the surface.',
      },
    ],
  },
  {
    slug: 'spotify',
    title: 'New Spotify Feature',
    subtitle: 'Product Feature Concept',
    category: 'Digital Design',
    tags: ['Figma', 'UI/UX Design', 'Design System Consistency'],
    heroImage: spotifyFeature,
    blocks: [],
  },
  {
    slug: 'discord',
    title: 'Discord Tokyo Game Show Booth',
    subtitle: 'Creative Intern',
    category: 'Digital Design · Work Experience',
    tags: ['Experience Design', 'Concept Development', 'Client Presentation'],
    heroImage: discordBooth,
    blocks: [],
  },
];

export const getProjectBySlug = (slug: string) =>
  projectDetails.find((p) => p.slug === slug);
