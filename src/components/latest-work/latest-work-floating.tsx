"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { LatestWorkViewer } from "@/components/latest-work/latest-work-viewer";
import { AppImage as Image } from "@/components/ui/app-image";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import type { LatestWorkProject } from "@/lib/latest-work";
import { accentClasses } from "@/lib/utils/accents";
import { cn } from "@/lib/utils/cn";
import { EASE_BRAND } from "@/lib/utils/motion";

/**
 * CONCEPT 01 — a compact corner card that expands into a full-bleed
 * three-project stage. Mobile uses the same card, docked above the tagline.
 */
export function LatestWorkFloating({
  projects,
}: {
  projects: LatestWorkProject[];
}) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [viewer, setViewer] = useState<number | null>(null);
  const lead = projects[0];
  const accent = accentClasses[lead?.serviceAccent ?? "pink"];

  useLockBodyScroll(open && viewer === null);

  const closeStage = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open || viewer !== null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeStage();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, viewer, closeStage]);

  if (!lead) return null;

  return (
    <>
      <AnimatePresence>
        {hidden && !open && (
          <motion.button
            type="button"
            aria-label="Show latest work"
            onClick={() => setHidden(false)}
            className="fixed bottom-14 right-4 z-[70] rounded-full border border-white/15 bg-ink-950/90 px-3 py-2 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-fg-subtle backdrop-blur-xl sm:right-6"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
          >
            Latest work
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!hidden && !open && (
          <motion.div
            layoutId={reduce ? undefined : "lw-float-shell"}
            className="fixed bottom-14 right-4 z-[70] w-[min(18.5rem,calc(100vw-2rem))] overflow-hidden border border-white/12 bg-ink-950/90 shadow-[0_20px_60px_-28px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:right-6"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: reduce ? 0.15 : 0.4, ease: EASE_BRAND }}
          >
            <div className="flex items-start justify-between gap-2 px-3 pt-3">
              <p
                className={cn(
                  "text-[0.58rem] font-bold uppercase tracking-[0.2em]",
                  accent.text,
                )}
              >
                Latest work
              </p>
              <button
                type="button"
                aria-label="Hide latest work"
                onClick={() => setHidden(true)}
                className="flex h-7 w-7 items-center justify-center text-white/40 hover:text-fg"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="group w-full p-3 pt-2 text-left"
            >
              <span className="relative block aspect-[16/10] overflow-hidden border border-white/10">
                <Image
                  src={lead.imageUrl}
                  alt={lead.alt}
                  fill
                  sizes="300px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </span>
              <span className="mt-3 flex items-end justify-between gap-3">
                <span>
                  <span className="block font-[family-name:var(--font-display)] text-[1.05rem] font-bold uppercase leading-tight">
                    {lead.title}
                  </span>
                  <span className="mt-1 block text-[0.62rem] uppercase tracking-[0.14em] text-fg-subtle">
                    {lead.serviceTitle}
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-fg-subtle" />
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            layoutId={reduce ? undefined : "lw-float-shell"}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lw-float-heading"
            className="fixed inset-0 z-[110] flex flex-col bg-ink-950"
            transition={{ duration: reduce ? 0.15 : 0.45, ease: EASE_BRAND }}
          >
            <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
              <div>
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-fg-subtle">
                  Latest work
                </p>
                <h2
                  id="lw-float-heading"
                  className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold uppercase tracking-tight sm:text-3xl"
                >
                  Three new pieces
                </h2>
              </div>
              <button
                type="button"
                onClick={closeStage}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15"
                aria-label="Close gallery"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-24 sm:px-8">
              <div className="mx-auto grid max-w-6xl gap-3 md:grid-cols-12 md:grid-rows-2 md:gap-4">
                {projects.map((project, index) => {
                  const itemAccent = accentClasses[project.serviceAccent];
                  const featured = index === 0;
                  return (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => setViewer(index)}
                      className={cn(
                        "group relative overflow-hidden border border-white/10 text-left",
                        featured
                          ? "aspect-[4/5] md:col-span-7 md:row-span-2 md:aspect-auto md:min-h-[28rem]"
                          : "aspect-[16/10] md:col-span-5 md:aspect-auto",
                      )}
                    >
                      <Image
                        src={project.imageUrl}
                        alt={project.alt}
                        fill
                        sizes={featured ? "70vw" : "40vw"}
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent"
                      />
                      <span className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                        <span
                          className={cn(
                            "block text-[0.62rem] font-bold uppercase tracking-[0.16em]",
                            itemAccent.text,
                          )}
                        >
                          {project.serviceTitle} · {project.industryName}
                        </span>
                        <span className="mt-1 block font-[family-name:var(--font-display)] text-[clamp(1.2rem,3vw,2rem)] font-bold uppercase leading-[0.95]">
                          {project.title}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LatestWorkViewer
        projects={projects}
        index={viewer}
        onClose={() => setViewer(null)}
        onPrevious={() =>
          setViewer((current) =>
            current === null
              ? current
              : (current - 1 + projects.length) % projects.length,
          )
        }
        onNext={() =>
          setViewer((current) =>
            current === null ? current : (current + 1) % projects.length,
          )
        }
      />
    </>
  );
}
