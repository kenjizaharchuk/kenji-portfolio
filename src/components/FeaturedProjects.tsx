import { useNavigate } from 'react-router-dom';
import { useMorph, rectFromDOMRect, type MorphRects } from '@/lib/morphContext';
import { getProjectBySlug } from '@/data/projects';
import { projects as carouselProjects, type Project } from '@/data/carouselProjects';

const FEATURED_SLUGS = [
  'spiber',
  'airan-lab',
  'skyn',
  'planet-money-bot',
  'discord',
  'genius-lyrics',
] as const;

const featured: Project[] = FEATURED_SLUGS
  .map((slug) => carouselProjects.find((p) => p.slug === slug))
  .filter((p): p is Project => !!p);

export function FeaturedProjects() {
  const navigate = useNavigate();
  const morph = useMorph();

  return (
    <section
      id="featured"
      className="relative w-full pt-24 pb-8 md:pt-32 md:pb-12 px-4 sm:px-6"
    >
      <div className="w-[80vw] max-w-4xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white/90">
            Featured Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-9">
          {featured.map((project) => {
            const isHidden =
              !!project.slug &&
              morph.slug === project.slug &&
              morph.phase !== 'idle';
            const category = project.categories[0];

            const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
              e.preventDefault();
              const cardEl = e.currentTarget.querySelector(
                `[data-card-slug="${project.slug}"]`
              ) as HTMLElement | null;
              const subtitleEl = cardEl?.querySelector(
                '[data-card-part="subtitle"]'
              ) as HTMLElement | null;
              const titleEl = cardEl?.querySelector(
                '[data-card-part="title"]'
              ) as HTMLElement | null;
              const tagsEl = cardEl?.querySelector(
                '[data-card-part="tags"]'
              ) as HTMLElement | null;
              const detail = getProjectBySlug(project.slug!);
              if (cardEl && subtitleEl && titleEl && tagsEl && detail) {
                const frameRect = rectFromDOMRect(cardEl.getBoundingClientRect());
                const cardRects: MorphRects = {
                  frame: frameRect,
                  image: frameRect,
                  subtitle: rectFromDOMRect(subtitleEl.getBoundingClientRect()),
                  titleText: rectFromDOMRect(titleEl.getBoundingClientRect()),
                  tags: rectFromDOMRect(tagsEl.getBoundingClientRect()),
                };
                morph.startOpen(
                  {
                    slug: project.slug!,
                    image: detail.heroImage,
                    imagePosition: detail.heroImagePosition,
                    title: detail.title,
                    cardSubtitle: project.subtitle,
                    detailSubtitle: `${detail.subtitle} · ${detail.category}`,
                    tags: detail.tags,
                  },
                  cardRects
                );
              }
              navigate(`/projects/${project.slug}`);
            };

            return (
              <div
                key={project.id}
                onClick={handleClick}
                className="group cursor-pointer block"
              >
                <div
                  data-card-slug={project.slug}
                  className="relative aspect-[4/3] w-full border border-white/15 overflow-hidden transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-[1.015] group-hover:border-white/35 group-hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)]"
                  style={{
                    borderRadius: '1.25rem',
                    opacity: isHidden ? 0 : 1,
                  }}
                >
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      style={{ objectPosition: project.imagePosition || 'center' }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                  <div className="relative z-10 h-full p-3 md:p-4 flex flex-col justify-end">
                    <p
                      data-card-part="subtitle"
                      className="font-display text-white/70 text-[10px] md:text-[11px] font-semibold tracking-wider uppercase mb-1.5"
                    >
                      {category}
                    </p>
                    <h3
                      data-card-part="title"
                      className="font-display text-white text-base md:text-lg font-bold leading-tight"
                    >
                      {project.title}
                    </h3>
                    {/* Hidden tag anchor for morph rect parity with carousel cards */}
                    <div
                      data-card-part="tags"
                      aria-hidden="true"
                      className="mt-2 h-0 w-full overflow-hidden opacity-0 pointer-events-none"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
