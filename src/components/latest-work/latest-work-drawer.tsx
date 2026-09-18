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
 * CONCEPT 03 — a right-edge tab that opens a premium drawer on desktop
 * and a bottom sheet on small screens. The site stays visible behind it.
 */
export function LatestWorkDrawer({
  projects,
}: {
  projects: LatestWorkProject[];
}) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [selected, setSelected] = useState(0);
  const [viewer, setViewer] = useState<number | null>(null);
  const lead = projects[0];
  const current = projects[selected] ?? lead;

  useLockBodyScroll(open);

  const closeDrawer = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open || viewer !== null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDrawer();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, viewer, closeDrawer]);

  if (!lead || !current) return null;
  const accent = accentClasses[lead.serviceAccent];

  return (
    <>
      <AnimatePresence>
        {hidden && !open && (
          <motion.button
            type="button"
            aria-label="Show latest work"
            onClick={() => setHidden(false)}
            className="fixed bottom-14 right-4 z-[70] rounded-full border border-white/15 bg-ink-950/90 px-3 py-2 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-fg-subtle sm:right-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Latest work
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!hidden && !open && (
          <>
            <motion.div
              className="fixed right-0 top-1/2 z-[70] hidden -translate-y-1/2 lg:block"
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: reduce ? 0.15 : 0.35, ease: EASE_BRAND }}
            >
              <div className="flex overflow-hidden border border-r-0 border-white/12 bg-ink-950/90 backdrop-blur-xl">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="flex w-14 flex-col items-center gap-3 py-4"
                >
                  <span className="relative h-10 w-10 overflow-hidden border border-white/15">
                    <Image
                      src={lead.imageUrl}
                      alt=""
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </span>
                  <span
                    className={cn(
                      "origin-center rotate-180 text-[0.58rem] font-bold uppercase tracking-[0.22em]",
                      accent.text,
                    )}
                    style={{ writingMode: "vertical-rl" }}
                  >
                    Latest work
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-fg-subtle" />
                </button>
                <button
                  type="button"
                  aria-label="Hide latest work"
                  onClick={() => setHidden(true)}
                  className="flex w-8 items-start justify-center border-l border-white/10 pt-3 text-white/30 hover:text-fg"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>

            <motion.div
              className="fixed bottom-14 right-4 z-[70] flex items-stretch overflow-hidden border border-white/12 bg-ink-950/90 backdrop-blur-xl lg:hidden"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
            >
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="flex items-center gap-3 pr-3"
              >
                <span className="relative h-14 w-14 shrink-0">
                  <Image
                    src={lead.imageUrl}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </span>
                <span className="py-2 text-left">
                  <span
                    className={cn(
                      "block text-[0.55rem] font-bold uppercase tracking-[0.18em]",
                      accent.text,
                    )}
                  >
                    Latest work
                  </span>
                  <span className="mt-0.5 block max-w-[9rem] truncate text-[0.78rem] font-semibold">
                    {lead.title}
                  </span>
                </span>
              </button>
              <button
                type="button"
                aria-label="Hide latest work"
                onClick={() => setHidden(true)}
                className="flex w-9 items-center justify-center border-l border-white/10 text-white/30"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[110]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close latest work"
              className="absolute inset-0 bg-ink-950/55 backdrop-blur-[2px]"
              onClick={closeDrawer}
            />

            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-labelledby="lw-drawer-heading"
              className="absolute inset-x-0 bottom-0 flex max-h-[88svh] flex-col border-t border-white/10 bg-ink-950 lg:inset-y-0 lg:left-auto lg:right-0 lg:max-h-none lg:w-[min(32rem,92vw)] lg:border-l lg:border-t-0"
              initial={
                reduce
                  ? { opacity: 0 }
                  : { y: 40, x: 0 }
              }
              animate={{ y: 0, x: 0, opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { y: 30, opacity: 0 }}
              transition={{ duration: reduce ? 0.12 : 0.35, ease: EASE_BRAND }}
            >
              <div className="flex items-center justify-between gap-3 px-5 py-4">
                <div>
                  <p className="text-[0.58rem] font-bold uppercase tracking-[0.2em] text-fg-subtle">
                    Latest work
                  </p>
                  <h2
                    id="lw-drawer-heading"
                    className="font-[family-name:var(--font-display)] text-xl font-bold uppercase"
                  >
                    New on the floor
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15"
                  aria-label="Close panel"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="relative mx-5 aspect-[16/10] overflow-hidden border border-white/10">
                <Image
                  src={current.imageUrl}
                  alt={current.alt}
                  fill
                  sizes="512px"
                  className="object-cover"
                />
              </div>
              <div className="px-5 py-4">
                <p
                  className={cn(
                    "text-[0.62rem] font-bold uppercase tracking-[0.16em]",
                    accentClasses[current.serviceAccent].text,
                  )}
                >
                  {current.serviceTitle} · {current.industryName}
                </p>
                <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold uppercase leading-tight">
                  {current.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {current.caption}
                </p>
                <button
                  type="button"
                  onClick={() => setViewer(selected)}
                  className="mt-4 inline-flex h-11 items-center border border-white/15 px-4 text-[0.68rem] font-bold uppercase tracking-[0.16em]"
                >
                  Open still
                </button>
              </div>

              <ul className="min-h-0 flex-1 overflow-y-auto border-t border-white/10">
                {projects.map((project, index) => {
                  const isActive = index === selected;
                  const itemAccent = accentClasses[project.serviceAccent];
                  return (
                    <li key={project.id}>
                      <button
                        type="button"
                        onClick={() => setSelected(index)}
                        className={cn(
                          "flex w-full items-center gap-3 px-5 py-3 text-left",
                          isActive ? "bg-white/[0.05]" : "hover:bg-white/[0.03]",
                        )}
                      >
                        <span className="relative h-14 w-14 shrink-0 overflow-hidden border border-white/10">
                          <Image
                            src={project.imageUrl}
                            alt=""
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </span>
                        <span className="min-w-0">
                          <span
                            className={cn(
                              "block text-[0.55rem] font-bold uppercase tracking-[0.14em]",
                              itemAccent.text,
                            )}
                          >
                            {project.serviceTitle}
                          </span>
                          <span className="mt-0.5 block truncate font-semibold">
                            {project.title}
                          </span>
                          <span className="block text-[0.62rem] uppercase tracking-[0.12em] text-fg-subtle">
                            {project.industryName}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <LatestWorkViewer
        projects={projects}
        index={viewer}
        onClose={() => setViewer(null)}
        onPrevious={() =>
          setViewer((currentIndex) =>
            currentIndex === null
              ? currentIndex
              : (currentIndex - 1 + projects.length) % projects.length,
          )
        }
        onNext={() =>
          setViewer((currentIndex) =>
            currentIndex === null
              ? currentIndex
              : (currentIndex + 1) % projects.length,
          )
        }
      />
    </>
  );
}
