import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Minimize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getProjectBySlug, type Block } from '@/data/projects';

interface ProjectDetailProps {
  slug: string;
  /** True when the user landed directly on /projects/:slug (no morph). */
  skipEnterAnimation?: boolean;
}

const transition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };

export function ProjectDetail({ slug, skipEnterAnimation = false }: ProjectDetailProps) {
  const navigate = useNavigate();
  const project = getProjectBySlug(slug);

  const close = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lock background scroll while detail is open.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  if (!project) {
    return (
      <motion.div
        className="fixed inset-0 z-[60] bg-background flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="text-center">
          <p className="font-display text-white/80 text-xl mb-4">Project not found</p>
          <button
            onClick={() => navigate('/')}
            className="font-display px-6 py-2 rounded-full border border-white/40 text-white/80 hover:bg-white/10 transition-colors"
          >
            Back to home
          </button>
        </div>
      </motion.div>
    );
  }

  const contentInitial = skipEnterAnimation ? false : { opacity: 0, y: 12 };
  const contentAnimate = { opacity: 1, y: 0 };
  const contentExit = { opacity: 0, transition: { duration: 0.18 } };

  return (
    <motion.div
      layoutId={`card-${project.slug}`}
      transition={transition}
      className="fixed inset-0 z-[60] bg-background overflow-y-auto"
      style={{ borderRadius: '1.5rem' }}
    >
      {/* Close button */}
      <motion.button
        onClick={close}
        aria-label="Close project"
        initial={contentInitial}
        animate={contentAnimate}
        exit={contentExit}
        transition={{ ...transition, delay: skipEnterAnimation ? 0 : 0.35 }}
        className="fixed top-6 right-6 md:top-8 md:right-8 z-[70] p-3 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
      >
        <Minimize2 size={20} />
      </motion.button>

      <article className="max-w-5xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-24">
        {/* Hero */}
        <div className="mb-10 md:mb-14">
          <motion.div
            layoutId={`card-image-${project.slug}`}
            transition={transition}
            className="relative w-full aspect-[21/9] overflow-hidden border border-white/15"
            style={{ borderRadius: '1.5rem' }}
          >
            <img
              src={project.heroImage}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: project.heroImagePosition || 'center' }}
            />
          </motion.div>

          <div className="mt-8">
            <motion.p
              initial={contentInitial}
              animate={contentAnimate}
              exit={contentExit}
              transition={{ ...transition, delay: skipEnterAnimation ? 0 : 0.3 }}
              className="font-display text-white/60 text-sm md:text-base font-semibold tracking-wide uppercase mb-3"
            >
              {project.subtitle} · {project.category}
            </motion.p>
            <motion.h1
              layoutId={`card-title-${project.slug}`}
              transition={transition}
              className="font-display text-white text-4xl md:text-6xl font-bold mb-5"
            >
              {project.title}
            </motion.h1>
            <motion.div
              layoutId={`card-tags-${project.slug}`}
              transition={transition}
              className="flex flex-wrap gap-2"
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-display px-3 py-1 text-sm font-medium rounded-full border border-white/30 text-white/80 bg-white/10 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Blocks */}
        <motion.div
          initial={contentInitial}
          animate={contentAnimate}
          exit={contentExit}
          transition={{ ...transition, delay: skipEnterAnimation ? 0 : 0.4 }}
          className="space-y-16 md:space-y-24"
        >
          {project.blocks.map((block, i) => (
            <BlockRenderer key={i} block={block} />
          ))}
        </motion.div>
      </article>
    </motion.div>
  );
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case 'context':
      return (
        <p className="font-display text-foreground/85 text-lg md:text-xl leading-relaxed max-w-3xl">
          {block.content}
        </p>
      );
    case 'gallery':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {block.images.map((img, i) => (
            <div
              key={i}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10"
            >
              <img src={img.src} alt={img.alt} className="absolute inset-0 w-full h-full object-cover" />
            </div>
          ))}
        </div>
      );
    case 'pullQuote':
      return (
        <blockquote className="border-l-4 border-primary pl-6 md:pl-8 max-w-3xl">
          <p className="font-display text-white/95 text-2xl md:text-4xl font-semibold leading-snug">
            “{block.content}”
          </p>
          {block.attribution && (
            <footer className="font-display text-white/50 text-sm md:text-base mt-4 uppercase tracking-wide">
              {block.attribution}
            </footer>
          )}
        </blockquote>
      );
    case 'embed':
      return (
        <div className="w-full h-[360px] md:h-[480px] rounded-2xl border border-dashed border-white/25 bg-white/[0.02] flex items-center justify-center">
          <span className="font-display text-white/50 text-base md:text-lg">{block.label}</span>
        </div>
      );
    case 'process':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <p className="font-display text-foreground/85 text-base md:text-lg leading-relaxed">
            {block.content}
          </p>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
            <img
              src={block.image}
              alt={block.imageAlt}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      );
    case 'outcome':
      return (
        <p className="font-display text-foreground/90 text-lg md:text-2xl leading-relaxed font-semibold max-w-3xl">
          {block.content}
        </p>
      );
  }
}
