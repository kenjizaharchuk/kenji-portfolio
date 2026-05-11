import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Minimize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getProjectBySlug, type Block } from '@/data/projects';
import { useMorph, rectFromDOMRect, type MorphRects } from '@/lib/morphContext';

interface ProjectDetailProps {
  slug: string;
  /** True when the user landed directly on /projects/:slug (no morph). */
  skipEnterAnimation?: boolean;
}

const transition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };
const CLOSE_FADE_MS = 160;

export function ProjectDetail({ slug, skipEnterAnimation = false }: ProjectDetailProps) {
  const navigate = useNavigate();
  const project = getProjectBySlug(slug);
  const morph = useMorph();

  const heroSlotRef = useRef<HTMLDivElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const titleTextRef = useRef<HTMLHeadingElement | null>(null);
  const tagsBlockRef = useRef<HTMLDivElement | null>(null);

  const [isClosing, setIsClosing] = useState(false);
  const isClosingRef = useRef(false);
  const sentinelOnStackRef = useRef(false);
  const closeRef = useRef<() => void>(() => {});

  // Measure the target rects after mount so the ghost can fly there.
  useLayoutEffect(() => {
    if (morph.phase !== 'opening') return;
    if (!heroSlotRef.current || !subtitleRef.current || !titleTextRef.current || !tagsBlockRef.current) return;
    const rects: MorphRects = {
      frame: { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight },
      image: rectFromDOMRect(heroSlotRef.current.getBoundingClientRect()),
      subtitle: rectFromDOMRect(subtitleRef.current.getBoundingClientRect()),
      titleText: rectFromDOMRect(titleTextRef.current.getBoundingClientRect()),
      tags: rectFromDOMRect(tagsBlockRef.current.getBoundingClientRect()),
    };
    morph.setDetailRects(rects);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [morph.phase]);

  const close = () => {
    if (isClosing) return;

    const cardEl = document.querySelector(
      `[data-card-slug="${slug}"]`
    ) as HTMLElement | null;
    const cardSubtitleEl = cardEl?.querySelector('[data-card-part="subtitle"]') as HTMLElement | null;
    const cardTitleEl = cardEl?.querySelector('[data-card-part="title"]') as HTMLElement | null;
    const tagsEl = cardEl?.querySelector('[data-card-part="tags"]') as HTMLElement | null;
    const heroEl = heroSlotRef.current;
    const subtitleEl = subtitleRef.current;
    const titleEl = titleTextRef.current;
    const detailTagsEl = tagsBlockRef.current;

    const canMorph =
      cardEl && cardSubtitleEl && cardTitleEl && tagsEl && heroEl && subtitleEl && titleEl && detailTagsEl && morph.phase !== 'idle';

    if (canMorph) {
      const frameRect = rectFromDOMRect(cardEl.getBoundingClientRect());
      const cardRects: MorphRects = {
        frame: frameRect,
        image: frameRect,
        subtitle: rectFromDOMRect(cardSubtitleEl.getBoundingClientRect()),
        titleText: rectFromDOMRect(cardTitleEl.getBoundingClientRect()),
        tags: rectFromDOMRect(tagsEl.getBoundingClientRect()),
      };
      const detailRects: MorphRects = {
        frame: { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight },
        image: rectFromDOMRect(heroEl.getBoundingClientRect()),
        subtitle: rectFromDOMRect(subtitleEl.getBoundingClientRect()),
        titleText: rectFromDOMRect(titleEl.getBoundingClientRect()),
        tags: rectFromDOMRect(detailTagsEl.getBoundingClientRect()),
      };

      // Start retract immediately AND fade content in parallel — no gap.
      setIsClosing(true);
      isClosingRef.current = true;
      morph.startClose(detailRects, cardRects);
      goBackToHome();
    } else {
      isClosingRef.current = true;
      morph.reset();
      goBackToHome();
    }
  };

  // Navigate back to the previous entry (or '/'), accounting for the sentinel
  // history entry we push on mount to intercept browser back gestures.
  const goBackToHome = () => {
    const steps = sentinelOnStackRef.current ? -2 : -1;
    sentinelOnStackRef.current = false;
    const idx = window.history.state?.idx ?? 0;
    if (idx >= Math.abs(steps)) {
      navigate(steps);
    } else {
      navigate('/');
    }
  };

  // Keep a ref to the latest close() so the popstate listener (registered once)
  // always calls the current closure.
  closeRef.current = close;

  // Intercept browser back / trackpad swipe-back so it triggers the same
  // close animation as the close button.
  useEffect(() => {
    // Only push a sentinel if there's a prior entry to fall back to. Preserve
    // React Router's history state (idx/usr/key) so RR keeps working.
    const idx = window.history.state?.idx ?? 0;
    if (idx > 0) {
      window.history.pushState(
        { ...window.history.state, morphSentinel: true },
        '',
        window.location.href
      );
      sentinelOnStackRef.current = true;
    }

    const onPop = () => {
      // Sentinel (if any) was just consumed by the browser.
      sentinelOnStackRef.current = false;
      if (isClosingRef.current) return; // our own navigate(-N); let it through
      closeRef.current();
    };
    window.addEventListener('popstate', onPop);

    return () => {
      window.removeEventListener('popstate', onPop);
      // Safety net: if we somehow unmount with morph still active and no
      // close in flight, reset so the carousel card isn't left hidden.
      if (!isClosingRef.current && morph.phase !== 'idle') {
        morph.reset();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClosing]);

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
      <div className="fixed inset-0 z-[60] bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-white/80 text-xl mb-4">Project not found</p>
          <button
            onClick={() => navigate('/')}
            className="font-display px-6 py-2 rounded-full border border-white/40 text-white/80 hover:bg-white/10 transition-colors"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  // The card-derived elements (hero, title, tags) are visible only when the morph is fully open
  // (or when there's no morph at all — direct URL visit).
  const morphedElementsVisible =
    skipEnterAnimation || morph.phase === 'open' || morph.phase === 'idle';
  const showMorphedElements = morphedElementsVisible && !isClosing;
  // Open direction: snap to opacity 1 the same frame phase flips to 'open'
  // (the MorphLayer lingers one paint to cover the handoff — no flash).
  // Close direction: fade out over CLOSE_FADE_MS so the elements gracefully
  // disappear before the ghost retracts.
  const morphedElementsTransition = isClosing
    ? `opacity ${CLOSE_FADE_MS}ms ease-out`
    : 'none';

  // Rest of the case-study content fades in after the morph completes; fades out at start of close.
  const restInitial = skipEnterAnimation ? false : { opacity: 0, y: 12 };
  const restAnimate =
    isClosing || !morphedElementsVisible ? { opacity: 0, y: 0 } : { opacity: 1, y: 0 };
  const restTransition = isClosing
    ? { duration: CLOSE_FADE_MS / 1000, ease: 'easeOut' as const }
    : { ...transition, delay: skipEnterAnimation ? 0 : 0.45 };

  // During `opening`, keep the page background transparent so the carousel stays
  // visible underneath the expanding frame ghost. After the morph completes (or
  // on direct URL visits), use the solid app background.
  const pageBgTransparent = !skipEnterAnimation && morph.phase === 'opening';

  return (
    <div
      data-detail-scroll
      className="fixed inset-0 z-[60] overflow-y-auto"
      style={{ backgroundColor: pageBgTransparent ? 'transparent' : 'hsl(var(--background))' }}
    >
      {/* Close button */}
      <motion.button
        onClick={close}
        aria-label="Close project"
        initial={restInitial}
        animate={restAnimate}
        transition={restTransition}
        className="fixed top-6 right-6 md:top-8 md:right-8 z-[70] p-3 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
      >
        <Minimize2 size={20} />
      </motion.button>

      <article className="max-w-5xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-24">
        {/* Hero slot — reserves layout space. Real image + border fade in once morph is open. */}
        <div
          ref={heroSlotRef}
          className="relative w-full aspect-[21/9]"
          style={{ borderRadius: '1.5rem' }}
        >
          <img
            src={project.heroImage}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              objectPosition: project.heroImagePosition || 'center',
              borderRadius: '1.5rem',
              opacity: showMorphedElements ? 1 : 0,
              transition: morphedElementsTransition,
            }}
          />
          {/* Independent hero border — fades in at end of opening, out at start of closing */}
          <div
            aria-hidden
            className="absolute inset-0 border border-white/15 pointer-events-none"
            style={{
              borderRadius: '1.5rem',
              opacity: showMorphedElements ? 1 : 0,
              transition: morphedElementsTransition,
            }}
          />
        </div>

        {/* Title block — opacity-toggled. Ghost handles the morph; this is the resting state. */}
        <div
          className="mt-8"
          style={{
            opacity: showMorphedElements ? 1 : 0,
            transition: morphedElementsTransition,
          }}
        >
          <p
            ref={subtitleRef}
            className="font-display text-white/60 text-sm md:text-base font-semibold tracking-wide uppercase mb-3"
          >
            {project.subtitle} · {project.category}
          </p>
          <h1
            ref={titleTextRef}
            className="font-display text-white text-4xl md:text-6xl font-bold leading-[1.05]"
          >
            {project.title}
          </h1>
        </div>

        {/* Tags — opacity-toggled. */}
        <div
          ref={tagsBlockRef}
          className="mt-5"
          style={{
            opacity: showMorphedElements ? 1 : 0,
            transition: morphedElementsTransition,
          }}
        >
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-display px-3 py-1 text-sm font-medium rounded-full border border-white/30 text-white/80 bg-white/10 backdrop-blur-sm whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Rest of the case-study content — does not participate in the morph */}
        <motion.div
          initial={restInitial}
          animate={restAnimate}
          transition={restTransition}
          className="space-y-16 md:space-y-24 mt-10 md:mt-14"
        >
          {project.blocks.map((block, i) => (
            <BlockRenderer key={i} block={block} />
          ))}
        </motion.div>
      </article>
    </div>
  );
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case 'context':
      return (
        <p className="font-display text-foreground/85 text-lg md:text-xl leading-relaxed">
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
        <blockquote className="border-l-4 border-primary pl-6 md:pl-8">
          <p className="font-display text-white/95 text-2xl md:text-4xl font-semibold leading-snug">
            "{block.content}"
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
        <div className="space-y-4">
          <p className="font-display text-foreground/90 text-lg md:text-2xl leading-relaxed font-semibold">
            {block.content}
          </p>
          {block.ctaUrl && (
            <a
              href={block.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-display text-base md:text-lg text-white/80 hover:text-white transition-colors underline underline-offset-4 decoration-white/30 hover:decoration-white/80"
            >
              {block.ctaLabel || 'Visit site'}
            </a>
          )}
        </div>
      );
    case 'processNarrative': {
      const gridCols = block.images.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1';
      return (
        <div className="space-y-6 md:space-y-8">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white/90 mb-4">
              {block.heading}
            </h2>
            <p className="font-display text-foreground/85 text-lg md:text-xl leading-relaxed">
              {block.content}
            </p>
          </div>
          {block.images.length > 0 && (
            <div className={`grid grid-cols-1 ${gridCols} gap-4 md:gap-6`}>
              {block.images.map((img, i) => {
                if (img.aspect === 'natural' && img.src) {
                  return (
                    <div
                      key={i}
                      className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02]"
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="block w-full h-auto"
                      />
                    </div>
                  );
                }
                const aspect =
                  img.aspect === '16/9'
                    ? 'aspect-[16/9]'
                    : img.aspect === '21/9'
                    ? 'aspect-[21/9]'
                    : img.aspect === '1/1'
                    ? 'aspect-square'
                    : img.aspect === '16/10'
                    ? 'aspect-[16/10]'
                    : img.aspect === '3/2'
                    ? 'aspect-[3/2]'
                    : 'aspect-[4/3]';
                const fitClass = img.fit === 'contain' ? 'object-contain' : 'object-cover';
                return img.src ? (
                  <div
                    key={i}
                    className={`relative ${aspect} rounded-2xl overflow-hidden border border-white/10 ${img.fit === 'contain' ? 'bg-white/[0.02]' : ''}`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className={`absolute inset-0 w-full h-full ${fitClass}`}
                    />
                  </div>
                ) : (
                  <div
                    key={i}
                    className={`relative ${aspect} rounded-2xl border border-dashed border-white/20 bg-white/[0.02] flex items-center justify-center`}
                  >
                    <span className="font-display text-white/40 text-sm md:text-base px-4 text-center">
                      {img.alt}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    }
    case 'featuredImage': {
      const maxW =
        block.width === 'sm'
          ? 'md:max-w-[50%]'
          : block.width === 'lg'
          ? 'md:max-w-[80%]'
          : block.width === 'full'
          ? ''
          : 'md:max-w-[65%]';
      const aspect =
        block.aspect === '16/9'
          ? 'aspect-[16/9]'
          : block.aspect === '21/9'
          ? 'aspect-[21/9]'
          : block.aspect === '4/3'
          ? 'aspect-[4/3]'
          : block.aspect === '1/1'
          ? 'aspect-square'
          : 'aspect-[16/10]';
      return (
        <div className={`mx-auto w-full ${maxW}`}>
          <div className={`relative ${aspect} rounded-2xl overflow-hidden border border-white/10`}>
            <img
              src={block.src}
              alt={block.alt}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      );
    }
    case 'figmaEmbed': {
      const wrapperRef = useFigmaScrollGuard();
      return (
        <div className="space-y-4">
          {block.heading && (
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white/90">
              {block.heading}
            </h2>
          )}
          {block.content && (
            <p className="font-display text-foreground/85 text-lg md:text-xl leading-relaxed">
              {block.content}
            </p>
          )}
          <div
            ref={wrapperRef}
            className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02]"
          >
            <iframe
              src={block.url}
              title={block.title || block.heading || 'Figma embed'}
              className="w-full h-full"
              allowFullScreen
              tabIndex={-1}
            />
          </div>
          {block.externalUrl && (
            <div className="flex justify-end pt-1">
              <a
                href={block.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-sm text-white/50 hover:text-white/90 transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/60"
              >
                {block.linkLabel || 'See the full Figma file'} ↗
              </a>
            </div>
          )}
        </div>
      );
    }
    case 'liveLink':
      return (
        <div className="mx-auto w-full md:max-w-[60%]">
          <a
            href={block.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl border border-white/15 bg-white/[0.03] px-8 py-10 md:px-12 md:py-14 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.06] hover:border-white/30 hover:shadow-2xl text-center"
          >
            <h3 className="font-display text-white/95 text-2xl md:text-4xl font-bold leading-tight mb-2">
              {block.label}
              <span className="inline-block ml-3 transition-transform group-hover:translate-x-1">↗</span>
            </h3>
            {block.description && (
              <p className="font-display text-white/55 text-sm md:text-base uppercase tracking-wider">
                {block.description}
              </p>
            )}
          </a>
        </div>
      );
    case 'featuredArticle':
      return (
        <div className="mx-auto w-full md:max-w-[60%]">
          <a
            href={block.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl bg-white overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl border border-transparent hover:border-black/10"
          >
            {block.thumbnail ? (
              <img
                src={block.thumbnail}
                alt={block.title}
                className="w-full h-auto object-contain"
              />
            ) : (
              <div className="p-6 md:p-8">
                <p className="font-display text-black/50 text-xs md:text-sm font-semibold tracking-wide uppercase mb-3">
                  Published in {block.source}
                </p>
                <h3 className="font-display text-black text-2xl md:text-3xl font-bold leading-tight mb-3">
                  {block.title}
                </h3>
                <p className="font-display text-black/70 text-base md:text-lg leading-relaxed mb-5">
                  {block.description}
                </p>
                <p className="font-display text-black/50 text-xs md:text-sm uppercase tracking-wide">
                  {block.date}
                </p>
              </div>
            )}
          </a>
        </div>
      );
  }
}

// TEMPORARY DIAGNOSTIC: log every event that might cause the scroll jump
// when interacting with the Figma iframe. No restoration — we want to see
// the raw trigger order. Remove once root cause is identified.
function useFigmaScrollGuard() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const scrollEl = wrapper.closest('[data-detail-scroll]') as HTMLElement | null;
    const iframe = wrapper.querySelector('iframe');
    const tag = '[FIGMA-DIAG]';
    const t0 = performance.now();
    const ts = () => `+${(performance.now() - t0).toFixed(1)}ms`;
    const active = () => {
      const a = document.activeElement;
      return a ? `${a.tagName}${(a as HTMLElement).id ? '#' + (a as HTMLElement).id : ''}` : 'null';
    };

    let lastScrollTop = scrollEl?.scrollTop ?? 0;
    let lastWindowY = window.scrollY;

    const onContainerScroll = () => {
      const cur = scrollEl?.scrollTop ?? 0;
      console.log(tag, ts(), 'CONTAINER scroll', { from: lastScrollTop, to: cur, delta: cur - lastScrollTop, active: active() });
      lastScrollTop = cur;
    };
    const onWindowScroll = () => {
      console.log(tag, ts(), 'WINDOW scroll', { from: lastWindowY, to: window.scrollY, delta: window.scrollY - lastWindowY, active: active() });
      lastWindowY = window.scrollY;
    };
    const log = (name: string) => (e: Event) => {
      const tgt = e.target as Element | null;
      console.log(tag, ts(), name, {
        target: tgt && tgt instanceof Element ? `${tgt.tagName}` : String(tgt),
        active: active(),
        containerTop: scrollEl?.scrollTop,
        windowY: window.scrollY,
      });
    };
    const onMessage = (e: MessageEvent) => {
      if (typeof e.origin === 'string' && /figma/i.test(e.origin)) {
        let preview: string = '';
        try { preview = typeof e.data === 'string' ? e.data.slice(0, 120) : JSON.stringify(e.data).slice(0, 120); } catch { preview = '[unserializable]'; }
        console.log(tag, ts(), 'postMessage from figma', { origin: e.origin, data: preview, containerTop: scrollEl?.scrollTop });
      }
    };

    scrollEl?.addEventListener('scroll', onContainerScroll, { passive: true });
    window.addEventListener('scroll', onWindowScroll, { passive: true });
    window.addEventListener('focus', log('window FOCUS'), true);
    window.addEventListener('blur', log('window BLUR'), true);
    window.addEventListener('focusin', log('window FOCUSIN'), true);
    window.addEventListener('focusout', log('window FOCUSOUT'), true);
    window.addEventListener('message', onMessage);
    wrapper.addEventListener('pointerdown', log('wrapper POINTERDOWN'), true);
    wrapper.addEventListener('mousedown', log('wrapper MOUSEDOWN'), true);
    iframe?.addEventListener('load', log('iframe LOAD'));

    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver((entries) => {
        for (const en of entries) {
          console.log(tag, ts(), 'RESIZE', { el: (en.target as Element).tagName, w: en.contentRect.width, h: en.contentRect.height, containerTop: scrollEl?.scrollTop });
        }
      });
      ro.observe(wrapper);
      if (iframe) ro.observe(iframe);
    }

    console.log(tag, ts(), 'INIT', { scrollEl: !!scrollEl, iframe: !!iframe, containerTop: scrollEl?.scrollTop });

    return () => {
      scrollEl?.removeEventListener('scroll', onContainerScroll);
      window.removeEventListener('scroll', onWindowScroll);
      window.removeEventListener('message', onMessage);
      ro?.disconnect();
    };
  }, []);
  return wrapperRef;
}
