# Set Maple Leaf Paper Punch as initial carousel slide

## Goal
Keep the current carousel card order, but make the Maple Leaf Paper Punch card the first/initial centered slide when the page loads (currently Wooden Clock is centered first).

## Changes

### Update default active project
In `src/components/ProjectsCarousel.tsx`, change the initial `currentProjectId` state from `projects[2].id` to the ID of the Maple Leaf Paper Punch project. Use a lookup so the initial slide stays correct even if the array order changes later:

```ts
const initialProjectId = projects.find(p => p.title === 'Maple Leaf Paper Punch')?.id ?? projects[2].id;
const [currentProjectId, setCurrentProjectId] = useState<number>(initialProjectId);
```

## Files to edit
- `src/components/ProjectsCarousel.tsx`
