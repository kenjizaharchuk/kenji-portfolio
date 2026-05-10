import { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';

export type MorphPhase = 'idle' | 'opening' | 'open' | 'closing';

export interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface MorphState {
  slug: string | null;
  sourceRect: Rect | null;
  targetRect: Rect | null;
  image: string | null;
  imagePosition: string | null;
  phase: MorphPhase;
}

const initialState: MorphState = {
  slug: null,
  sourceRect: null,
  targetRect: null,
  image: null,
  imagePosition: null,
  phase: 'idle',
};

type Action =
  | { type: 'startOpen'; slug: string; sourceRect: Rect; image: string; imagePosition?: string }
  | { type: 'setTargetRect'; rect: Rect }
  | { type: 'setOpen' }
  | { type: 'startClose'; sourceRect: Rect; targetRect: Rect }
  | { type: 'reset' };

function reducer(state: MorphState, action: Action): MorphState {
  switch (action.type) {
    case 'startOpen':
      return {
        slug: action.slug,
        sourceRect: action.sourceRect,
        targetRect: null,
        image: action.image,
        imagePosition: action.imagePosition || 'center',
        phase: 'opening',
      };
    case 'setTargetRect':
      return { ...state, targetRect: action.rect };
    case 'setOpen':
      return { ...state, phase: 'open' };
    case 'startClose':
      return {
        ...state,
        sourceRect: action.sourceRect,
        targetRect: action.targetRect,
        phase: 'closing',
      };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

interface MorphContextValue extends MorphState {
  startOpen: (slug: string, sourceRect: Rect, image: string, imagePosition?: string) => void;
  setTargetRect: (rect: Rect) => void;
  setOpen: () => void;
  startClose: (sourceRect: Rect, targetRect: Rect) => void;
  reset: () => void;
}

const MorphContext = createContext<MorphContextValue | null>(null);

export function MorphProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const startOpen = useCallback(
    (slug: string, sourceRect: Rect, image: string, imagePosition?: string) =>
      dispatch({ type: 'startOpen', slug, sourceRect, image, imagePosition }),
    []
  );
  const setTargetRect = useCallback(
    (rect: Rect) => dispatch({ type: 'setTargetRect', rect }),
    []
  );
  const setOpen = useCallback(() => dispatch({ type: 'setOpen' }), []);
  const startClose = useCallback(
    (sourceRect: Rect, targetRect: Rect) =>
      dispatch({ type: 'startClose', sourceRect, targetRect }),
    []
  );
  const reset = useCallback(() => dispatch({ type: 'reset' }), []);

  return (
    <MorphContext.Provider
      value={{ ...state, startOpen, setTargetRect, setOpen, startClose, reset }}
    >
      {children}
    </MorphContext.Provider>
  );
}

export function useMorph() {
  const ctx = useContext(MorphContext);
  if (!ctx) throw new Error('useMorph must be used within MorphProvider');
  return ctx;
}

export function rectFromDOMRect(r: DOMRect): Rect {
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}
