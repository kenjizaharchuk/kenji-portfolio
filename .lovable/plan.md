

## More Aggressive Text Column Narrowing

**File:** `src/components/AboutSection.tsx`

The `max-w-md` cap (448px) is still too wide to notice a real difference. This time we'll make a much more visible change:

1. **Text column width:** Change `max-w-md` (448px) to `max-w-sm` (384px) -- a ~14% further reduction that will be clearly visible.
2. **Keep gap as-is** at `gap-6 md:gap-8` -- the narrower text column alone will create noticeably more space between the two columns.

Nothing else changes.

