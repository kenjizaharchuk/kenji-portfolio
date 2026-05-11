import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useMorph, type Rect } from '@/lib/morphContext';

const DURATION = 1.0;
const EASE = [0.65, 0, 0.35, 1] as const;
const TRANSITION = { duration: DURATION, ease: EASE };

function inverseXY(other: Rect, base: Rect) {
  return {
    x: other.left - base.left,
    y: other.top - base.top,
    scaleX: other.width / base.width,
    scaleY: other.height / base.height,
  };
}

function inverseUniform(other: Rect, base: Rect) {
  return {
    x: other.left - base.left,
    y: other.top - base.top,
    scale: other.width / base.width,
  };
}

export function MorphLayer() {
  const morph = useMorph();
  const { phase, cardRects, detailRects, image, imagePosition, title, cardSubtitle, detailSubtitle, tags, setOpen, reset } = morph;

  const [linger, setLinger] = useState(false);
  useEffect(() => {
    if (phase === 'open') {
      setLinger(true);
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setLinger(false));
      });
      return () => cancelAnimationFrame(id);
    }
    setLinger(false);
  }, [phase]);

  if (phase === 'idle') return null;
  if (phase === 'open' && !linger) return null;
  if (!cardRects || !detailRects) return null;

  // Treat the linger frame (phase==='open') as "at end state."
  const openingOrOpen = phase === 'opening' || phase === 'open';

  // Frame & image
  const frameStart = inverseXY(cardRects.frame, detailRects.frame);
  const frameEnd = { x: 0, y: 0, scaleX: 1, scaleY: 1 };
  const initialFrame = openingOrOpen ? frameStart : frameEnd;
  const animateFrame = openingOrOpen ? frameEnd : frameStart;

  const imageRectStart = cardRects.image;
  const imageRectEnd = detailRects.image;
  const initialImageRect = openingOrOpen ? imageRectStart : imageRectEnd;
  const animateImageRect = openingOrOpen ? imageRectEnd : imageRectStart;

  const radiusCard = '1.5rem';
  const radiusViewport = '0rem';
  const initialRadius = openingOrOpen ? radiusCard : radiusViewport;
  const animateRadius = openingOrOpen ? radiusViewport : radiusCard;

  const initialOverlay = openingOrOpen ? 1 : 0;
  const animateOverlay = openingOrOpen ? 0 : 1;

  // Helper to build FLIP transform+opacity for a dual-rendered variant.
  // variant='card': lives at cardRect, identity at card-end, transform-to-detail at detail-end.
  // variant='detail': lives at detailRect, identity at detail-end, transform-to-card at card-end.
  function flipPair(cardRect: Rect, detailRect: Rect) {
    const cardAtCard = { x: 0, y: 0, scale: 1 };
    const cardAtDetail = inverseUniform(detailRect, cardRect);
    const detailAtDetail = { x: 0, y: 0, scale: 1 };
    const detailAtCard = inverseUniform(cardRect, detailRect);
    return {
      cardInitial: openingOrOpen ? cardAtCard : cardAtDetail,
      cardAnimate: openingOrOpen ? cardAtDetail : cardAtCard,
      detailInitial: openingOrOpen ? detailAtCard : detailAtDetail,
      detailAnimate: openingOrOpen ? detailAtDetail : detailAtCard,
    };
  }

  // Compress the style crossfade into a short window so each variant appears
  // to physically travel along the full path; the swap happens when both
  // variants are at near-identical screen size.
  const swapStart = openingOrOpen ? 0.65 : 0.2;
  const swapEnd = openingOrOpen ? 0.8 : 0.35;
  const cardOpacityKeyframes = openingOrOpen ? [1, 1, 0] : [0, 0, 1];
  const detailOpacityKeyframes = openingOrOpen ? [0, 0, 1] : [1, 1, 0];
  const opacityTransition = {
    duration: DURATION,
    ease: 'linear' as const,
    times: [0, swapStart, swapEnd],
  };
  const transitionWithSwap = {
    ...TRANSITION,
    opacity: opacityTransition,
  };
  const cardInitialOpacity = cardOpacityKeyframes[0];
  const detailInitialOpacity = detailOpacityKeyframes[0];

  const sub = flipPair(cardRects.subtitle, detailRects.subtitle);
  const titlePair = flipPair(cardRects.titleText, detailRects.titleText);
  const tagsPair = flipPair(cardRects.tags, detailRects.tags);

  const onFrameComplete = () => {
    if (phase === 'opening') setOpen();
    else if (phase === 'closing') reset();
  };

  const tagChipClass =
    'font-display px-3 py-1 text-sm font-medium rounded-full border border-white/30 text-white/80 bg-white/10 backdrop-blur-sm whitespace-nowrap';

  return createPortal(
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 65, opacity: phase === 'open' ? 0 : 1 }}>
      {/* Frame */}
      <motion.div
        className="bg-background border border-white/15"
        style={{
          position: 'absolute',
          top: detailRects.frame.top,
          left: detailRects.frame.left,
          width: detailRects.frame.width,
          height: detailRects.frame.height,
          transformOrigin: 'top left',
        }}
        initial={{ ...initialFrame, borderRadius: initialRadius }}
        animate={{ ...animateFrame, borderRadius: animateRadius }}
        transition={TRANSITION}
        onAnimationComplete={onFrameComplete}
      />

      {/* Image */}
      <motion.div
        style={{
          position: 'absolute',
          transformOrigin: 'top left',
          borderRadius: '1.5rem',
          overflow: 'hidden',
        }}
        initial={{
          top: initialImageRect.top,
          left: initialImageRect.left,
          width: initialImageRect.width,
          height: initialImageRect.height,
        }}
        animate={{
          top: animateImageRect.top,
          left: animateImageRect.left,
          width: animateImageRect.width,
          height: animateImageRect.height,
        }}
        transition={TRANSITION}
      >
        {image && (
          <img
            src={image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: imagePosition || 'center' }}
          />
        )}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none"
          initial={{ opacity: initialOverlay }}
          animate={{ opacity: animateOverlay }}
          transition={TRANSITION}
        />
      </motion.div>

      {/* Subtitle — card variant */}
      <motion.p
        className="font-display text-white/70 text-base font-semibold tracking-wide uppercase"
        style={{
          position: 'absolute',
          top: cardRects.subtitle.top,
          left: cardRects.subtitle.left,
          width: cardRects.subtitle.width,
          transformOrigin: 'top left',
          margin: 0,
        }}
        initial={{ ...sub.cardInitial, opacity: cardInitialOpacity }}
        animate={{ ...sub.cardAnimate, opacity: cardOpacityKeyframes }}
        transition={transitionWithSwap}
      >
        {cardSubtitle}
      </motion.p>

      {/* Subtitle — detail variant */}
      <motion.p
        className="font-display text-white/60 text-sm md:text-base font-semibold tracking-wide uppercase"
        style={{
          position: 'absolute',
          top: detailRects.subtitle.top,
          left: detailRects.subtitle.left,
          width: detailRects.subtitle.width,
          transformOrigin: 'top left',
          margin: 0,
        }}
        initial={{ ...sub.detailInitial, opacity: detailInitialOpacity }}
        animate={{ ...sub.detailAnimate, opacity: detailOpacityKeyframes }}
        transition={transitionWithSwap}
      >
        {detailSubtitle}
      </motion.p>

      {/* Title — card variant */}
      <motion.h1
        className="font-display text-white text-2xl md:text-3xl font-bold"
        style={{
          position: 'absolute',
          top: cardRects.titleText.top,
          left: cardRects.titleText.left,
          width: cardRects.titleText.width,
          transformOrigin: 'top left',
          margin: 0,
        }}
        initial={{ ...titlePair.cardInitial, opacity: cardInitialOpacity }}
        animate={{ ...titlePair.cardAnimate, opacity: cardOpacityKeyframes }}
        transition={transitionWithSwap}
      >
        {title}
      </motion.h1>

      {/* Title — detail variant */}
      <motion.h1
        className="font-display text-white text-4xl md:text-6xl font-bold leading-[1.05]"
        style={{
          position: 'absolute',
          top: detailRects.titleText.top,
          left: detailRects.titleText.left,
          width: detailRects.titleText.width,
          transformOrigin: 'top left',
          margin: 0,
        }}
        initial={{ ...titlePair.detailInitial, opacity: detailInitialOpacity }}
        animate={{ ...titlePair.detailAnimate, opacity: detailOpacityKeyframes }}
        transition={transitionWithSwap}
      >
        {title}
      </motion.h1>

      {/* Tags — card variant (wraps at card width) */}
      <motion.div
        style={{
          position: 'absolute',
          top: cardRects.tags.top,
          left: cardRects.tags.left,
          width: cardRects.tags.width,
          transformOrigin: 'top left',
        }}
        initial={{ ...tagsPair.cardInitial, opacity: cardInitialOpacity }}
        animate={{ ...tagsPair.cardAnimate, opacity: cardOpacityKeyframes }}
        transition={transitionWithSwap}
      >
        <div className="flex flex-wrap gap-2">
          {tags?.map((tag) => (
            <span key={tag} className={tagChipClass}>{tag}</span>
          ))}
        </div>
      </motion.div>

      {/* Tags — detail variant (wraps at detail width) */}
      <motion.div
        style={{
          position: 'absolute',
          top: detailRects.tags.top,
          left: detailRects.tags.left,
          width: detailRects.tags.width,
          transformOrigin: 'top left',
        }}
        initial={{ ...tagsPair.detailInitial, opacity: tagsPair.detailInitialOpacity }}
        animate={{ ...tagsPair.detailAnimate, opacity: tagsPair.detailAnimateOpacity }}
        transition={TRANSITION}
      >
        <div className="flex flex-wrap gap-2">
          {tags?.map((tag) => (
            <span key={tag} className={tagChipClass}>{tag}</span>
          ))}
        </div>
      </motion.div>
    </div>,
    document.body
  );
}
