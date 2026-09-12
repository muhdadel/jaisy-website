"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { AppImage as Image } from "@/components/ui/app-image";
import { useEffect, useRef } from "react";
import { ArtworkTile } from "@/components/ui/artwork-tile";
import { CornerBrackets } from "@/components/ui/corner-brackets";
import { useLightbox } from "@/hooks/use-lightbox";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import { usePortfolioFilter } from "@/hooks/use-portfolio-filter";
import type { PortfolioItem, ServiceSlug } from "@/lib/content/types";
import { accentFor } from "@/lib/utils/accents";
import { cn } from "@/lib/utils/cn";
import { EASE_BRAND } from "@/lib/utils/motion";

export interface CategoryOption {
  slug: ServiceSlug;
  title: string;
}

interface PortfolioGalleryProps {
  items: PortfolioItem[];
  categories: CategoryOption[];
}

export function PortfolioGallery({ items, categories }: PortfolioGalleryProps) {
  const reduce = useReducedMotion();
  const { filter, select, filtered, counts } = usePortfolioFilter(items);
  const lightbox = useLightbox(filtered.length);
  const closeRef = useRef<HTMLButtonElement>(null);

  useLockBodyScroll(lightbox.isOpen);

  // Keep the lightbox honest if the filter changes while it is open.
  useEffect(() => {
    if (lightbox.isOpen) lightbox.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    if (lightbox.isOpen) closeRef.current?.focus();
  }, [lightbox.isOpen]);

  const active = lightbox.index !== null ? filtered[lightbox.index] : undefined;

  const chips: { key: "all" | ServiceSlug; label: string }[] = [
    { key: "all", label: "All Work" },
    ...categories.map((category) => ({
      key: category.slug,
      label: category.title,
    })),
  ];

  const categoryLabel = (slug: ServiceSlug) =>
    categories.find((category) => category.slug === slug)?.title ?? "Project";

  return (
    <>
      <div
        role="tablist"
        aria-label="Filter work by service"
        className="mt-10 flex flex-wrap gap-2"
      >
        {chips.map((chip) => {
          const isActive = filter === chip.key;
          const count = counts.get(chip.key) ?? 0;
          return (
            <button
              key={chip.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              disabled={count === 0}
              onClick={() => select(chip.key)}
              className={cn(
                "group relative inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.78rem] font-medium transition-all duration-300",
                "disabled:cursor-not-allowed disabled:opacity-35",
                isActive
                  ? "border-transparent text-ink-950"
                  : "border-white/12 bg-white/[0.03] text-fg-subtle hover:border-white/25 hover:text-fg",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="portfolio-chip"
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-brand"
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 380, damping: 34 }
                  }
                />
              )}
              {chip.label}
              <span
                className={cn(
                  "text-[0.65rem] tabular-nums",
                  isActive ? "text-ink-950/60" : "text-fg-subtle/60",
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-card surface-card p-10 text-center">
          <p className="text-sm text-fg-subtle">
            No projects published in this category yet.
          </p>
        </div>
      ) : (
        <motion.ul
          layout={!reduce}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((item, index) => {
              const accent = accentFor(item.id);
              return (
                <motion.li
                  key={item.id}
                  layout={!reduce}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
                  transition={{ duration: reduce ? 0.2 : 0.4, ease: EASE_BRAND }}
                >
                  <button
                    type="button"
                    onClick={() => lightbox.open(index)}
                    className="group relative block w-full overflow-hidden rounded-card border border-white/[0.07] text-left transition-all duration-500 hover:-translate-y-1 hover:border-white/20"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.caption}
                          fill
                          loading="lazy"
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
                          <ArtworkTile
                            title={item.title}
                            seed={item.id}
                            accent={accent}
                          />
                        </div>
                      )}

                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95"
                      />
                      <CornerBrackets hover size={18} />

                      <span
                        aria-hidden
                        className="absolute right-4 top-4 inline-flex h-9 w-9 translate-y-2 items-center justify-center rounded-full border border-white/20 bg-ink-950/70 text-fg opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                      >
                        <Maximize2 className="h-3.5 w-3.5" />
                      </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-brand-pink">
                        {categoryLabel(item.category)}
                      </p>
                      <h3 className="mt-1.5 text-lg font-bold leading-tight tracking-tight text-fg">
                        {item.title}
                      </h3>
                    </div>
                  </button>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      )}

      <AnimatePresence>
        {active && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink-950/92 p-4 backdrop-blur-xl sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={lightbox.close}
          >
            <motion.figure
              className="relative w-full max-w-5xl"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              transition={{ duration: reduce ? 0.2 : 0.4, ease: EASE_BRAND }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-card border border-white/10 bg-ink-900">
                {active.imageUrl ? (
                  <Image
                    src={active.imageUrl}
                    alt={active.caption}
                    fill
                    sizes="(min-width: 1024px) 960px, 100vw"
                    className="object-contain"
                  />
                ) : (
                  <ArtworkTile
                    title={active.title}
                    seed={active.id}
                    accent={accentFor(active.id)}
                  />
                )}
              </div>

              <figcaption className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-brand-pink">
                    {categoryLabel(active.category)}
                  </p>
                  <h3 className="mt-1.5 text-2xl font-bold tracking-tight">
                    {active.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg-muted">
                    {active.caption}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <span className="mr-1 text-xs tabular-nums text-fg-subtle">
                    {(lightbox.index ?? 0) + 1} / {filtered.length}
                  </span>
                  <button
                    type="button"
                    onClick={lightbox.previous}
                    aria-label="Previous project"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-fg transition-colors duration-300 hover:border-brand-pink/60"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={lightbox.next}
                    aria-label="Next project"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-fg transition-colors duration-300 hover:border-brand-pink/60"
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </figcaption>

              <button
                ref={closeRef}
                type="button"
                onClick={lightbox.close}
                aria-label="Close project view"
                className="absolute -top-3 right-0 inline-flex h-10 w-10 -translate-y-full items-center justify-center rounded-full border border-white/15 bg-ink-900 text-fg transition-colors duration-300 hover:border-brand-pink/60 sm:-top-4"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
