import { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';

export type MorphPhase = 'idle' | 'opening' | 'open' | 'closing';

export interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface MorphRects {
  frame: Rect;
  image: Rect;
  title: Rect;
  tags: Rect;
}

export interface MorphPayload {
  slug: string;
  image: string;
  imagePosition?: string;
  title: string;
  cardSubtitle: string;
  detailSubtitle: string;
  tags: string[];
}

interface MorphState {
  slug: string | null;
  image: string | null;
  imagePosition: string | null;
  title: string | null;
  cardSubtitle: string | null;
  detailSubtitle: string | null;
  tags: string[] | null;
  cardRects: MorphRects | null;
  detailRects: MorphRects | null;
  phase: MorphPhase;
}

const initialState: MorphState = {
  slug: null,
  image: null,
  imagePosition: null,
  title: null,
  cardSubtitle: null,
  detailSubtitle: null,
  tags: null,
  cardRects: null,
  detailRects: null,
  phase: 'idle',
};

type Action =
  | { type: 'startOpen'; payload: MorphPayload; cardRects: MorphRects }
  | { type: 'setDetailRects'; rects: MorphRects }
  | { type: 'setOpen' }
  | { type: 'startClose'; detailRects: MorphRects; cardRects: MorphRects }
  | { type: 'reset' };

function reducer(state: MorphState, action: Action): MorphState {
  switch (action.type) {
    case 'startOpen':
      return {
        slug: action.payload.slug,
        image: action.payload.image,
        imagePosition: action.payload.imagePosition || 'center',
        title: action.payload.title,
        cardSubtitle: action.payload.cardSubtitle,
        detailSubtitle: action.payload.detailSubtitle,
        tags: action.payload.tags,
        cardRects: action.cardRects,
        detailRects: null,
        phase: 'opening',
      };
    case 'setDetailRects':
      return { ...state, detailRects: action.rects };
    case 'setOpen':
      return { ...state, phase: 'open' };
    case 'startClose':
      return {
        ...state,
        detailRects: action.detailRects,
        cardRects: action.cardRects,
        phase: 'closing',
      };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

interface MorphContextValue extends MorphState {
  startOpen: (payload: MorphPayload, cardRects: MorphRects) => void;
  setDetailRects: (rects: MorphRects) => void;
  setOpen: () => void;
  startClose: (detailRects: MorphRects, cardRects: MorphRects) => void;
  reset: () => void;
}

const MorphContext = createContext<MorphContextValue | null>(null);

export function MorphProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const startOpen = useCallback(
    (payload: MorphPayload, cardRects: MorphRects) =>
      dispatch({ type: 'startOpen', payload, cardRects }),
    []
  );
  const setDetailRects = useCallback(
    (rects: MorphRects) => dispatch({ type: 'setDetailRects', rects }),
    []
  );
  const setOpen = useCallback(() => dispatch({ type: 'setOpen' }), []);
  const startClose = useCallback(
    (detailRects: MorphRects, cardRects: MorphRects) =>
      dispatch({ type: 'startClose', detailRects, cardRects }),
    []
  );
  const reset = useCallback(() => dispatch({ type: 'reset' }), []);

  return (
    <MorphContext.Provider
      value={{ ...state, startOpen, setDetailRects, setOpen, startClose, reset }}
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
