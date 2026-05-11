import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { useMorph, type Rect, type MorphRects, type MorphPhase } from '@/lib/morphContext';

const DURATION = 0.9;
const EASE = [0.22, 1, 0.36, 1] as const;
const TRANSITION = { duration: DURATION, ease: EASE };

/** Non-uniform inverse (used for frame and image). */
function inverseXY(other: Rect, base: Rect) {
  return {
    x: other.left - base.left,
    y: other.top - base.top,
    scaleX: other.width / base.width,
    scaleY: other.height / base.height,
  };
}

/** Uniform inverse (used for text/tags — single scale, no distortion). */
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

  if (phase === 'idle' || phase === 'open') return null;
  if (!cardRects || !detailRects) return null;

  const opening = phase === 'opening';

  // Each element is rendered at its DETAIL rect (large/final layout).
  // We animate transforms between (card-relative inverse) and identity.
  // Opening: initial = inverse(card vs detail), animate = identity
  // Closing: initial = identity,                animate = inverse(card vs detail)

  const frameStart = inverseXY(cardRects.frame, detailRects.frame);
  const frameEnd = { x: 0, y: 0, scaleX: 1, scaleY: 1 };
  const imageStart = inverseXY(cardRects.image, detailRects.image);
  const imageEnd = { x: 0, y: 0, scaleX: 1, scaleY: 1 };
  const titleStart = inverseUniform(cardRects.title, detailRects.title);
  const titleEnd = { x: 0, y: 0, scale: 1 };
  const tagsStart = inverseUniform(cardRects.tags, detailRects.tags);
  const tagsEnd = { x: 0, y: 0, scale: 1 };

  const initialFrame = opening ? frameStart : frameEnd;
  const animateFrame = opening ? frameEnd : frameStart;
  const initialImage = opening ? imageStart : imageEnd;
  const animateImage = opening ? imageEnd : imageStart;
  const initialTitle = opening ? titleStart : titleEnd;
  const animateTitle = opening ? titleEnd : titleStart;
  const initialTags = opening ? tagsStart : tagsEnd;
  const animateTags = opening ? tagsEnd : tagsStart;

  // Border radius on the Frame: card-end has 1.5rem, viewport-end has 0.
  const radiusCard = '1.5rem';
  const radiusViewport = '0rem';
  const initialRadius = opening ? radiusCard : radiusViewport;
  const animateRadius = opening ? radiusViewport : radiusCard;

  // Gradient overlay on the Image: present at card-end (for text contrast), absent at hero-end.
  const initialOverlay = opening ? 1 : 0;
  const animateOverlay = opening ? 0 : 1;

  // Subtitle crossfade: card-variant visible at card-end; detail-variant visible at hero-end.
  const initialCardSub = opening ? 1 : 0;
  const animateCardSub = opening ? 0 : 1;
  const initialDetailSub = opening ? 0 : 1;
  const animateDetailSub = opening ? 1 : 0;

  const onFrameComplete = () => {
    if (phase === 'opening') setOpen();
    else if (phase === 'closing') reset();
  };

  return createPortal(
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 65 }}>
      {/* Frame — dark backdrop that grows from card → viewport */}
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

      {/* Image — single continuous element, scales+travels card → hero */}
      <motion.div
        style={{
          position: 'absolute',
          top: detailRects.image.top,
          left: detailRects.image.left,
          width: detailRects.image.width,
          height: detailRects.image.height,
          transformOrigin: 'top left',
          borderRadius: '1.5rem',
          overflow: 'hidden',
        }}
        initial={initialImage}
        animate={animateImage}
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
        {/* Gradient overlay — fades out as we morph toward the hero */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none"
          initial={{ opacity: initialOverlay }}
          animate={{ opacity: animateOverlay }}
          transition={TRANSITION}
        />
      </motion.div>

      {/* Title block — rendered at detail layout, uniform-scaled to card at the card-end.
          Subtitle crossfades (different strings); title is one continuous <h1> (same string). */}
      <motion.div
        style={{
          position: 'absolute',
          top: detailRects.title.top,
          left: detailRects.title.left,
          width: detailRects.title.width,
          transformOrigin: 'top left',
        }}
        initial={initialTitle}
        animate={animateTitle}
        transition={TRANSITION}
      >
        {/* Subtitle slot — two stacked variants, opacity-crossfade */}
        <div className="relative mb-3">
          {/* invisible sizer keeps line height correct */}
          <p className="font-display text-sm md:text-base font-semibold tracking-wide uppercase invisible">
            {detailSubtitle}
          </p>
          <motion.p
            className="font-display text-white/60 text-sm md:text-base font-semibold tracking-wide uppercase absolute inset-0"
            initial={{ opacity: initialCardSub }}
            animate={{ opacity: animateCardSub }}
            transition={TRANSITION}
          >
            {cardSubtitle}
          </motion.p>
          <motion.p
            className="font-display text-white/60 text-sm md:text-base font-semibold tracking-wide uppercase absolute inset-0"
            initial={{ opacity: initialDetailSub }}
            animate={{ opacity: animateDetailSub }}
            transition={TRANSITION}
          >
            {detailSubtitle}
          </motion.p>
        </div>
        <h1 className="font-display text-white text-4xl md:text-6xl font-bold leading-[1.05]">
          {title}
        </h1>
      </motion.div>

      {/* Tags — rendered at detail flex-wrap layout (constant width), uniform-scaled. No reflow. */}
      <motion.div
        style={{
          position: 'absolute',
          top: detailRects.tags.top,
          left: detailRects.tags.left,
          width: detailRects.tags.width,
          transformOrigin: 'top left',
        }}
        initial={initialTags}
        animate={animateTags}
        transition={TRANSITION}
      >
        <div className="flex flex-wrap gap-2">
          {tags?.map((tag) => (
            <span
              key={tag}
              className="font-display px-3 py-1 text-sm font-medium rounded-full border border-white/30 text-white/80 bg-white/10 backdrop-blur-sm whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>,
    document.body
  );
}
