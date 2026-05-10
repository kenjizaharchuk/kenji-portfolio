import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { useMorph } from '@/lib/morphContext';

const TRANSITION = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };

export function MorphGhost() {
  const { phase, sourceRect, targetRect, image, imagePosition, setOpen, reset } = useMorph();

  // Safety: if opening stalls without target after a while, do nothing (waits for target).
  useEffect(() => {
    // no-op; animation onComplete drives transitions.
  }, [phase]);

  if (phase === 'idle' || !sourceRect || !image) return null;

  // While 'opening' but target not yet measured, render static at source so card stays covered.
  const animateTo =
    phase === 'opening'
      ? targetRect ?? sourceRect
      : phase === 'closing'
      ? targetRect ?? sourceRect
      : sourceRect;

  const initial =
    phase === 'closing'
      ? sourceRect
      : sourceRect;

  const handleComplete = () => {
    if (phase === 'opening' && targetRect) {
      setOpen();
    } else if (phase === 'closing') {
      reset();
    }
  };

  return createPortal(
    <motion.div
      initial={{
        top: initial.top,
        left: initial.left,
        width: initial.width,
        height: initial.height,
      }}
      animate={{
        top: animateTo.top,
        left: animateTo.left,
        width: animateTo.width,
        height: animateTo.height,
      }}
      transition={TRANSITION}
      onAnimationComplete={handleComplete}
      style={{
        position: 'fixed',
        zIndex: 65,
        borderRadius: '1.5rem',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
      className="border border-white/15"
    >
      <img
        src={image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: imagePosition || 'center' }}
      />
    </motion.div>,
    document.body
  );
}
