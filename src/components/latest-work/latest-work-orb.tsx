"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { LatestWorkViewer } from "@/components/latest-work/latest-work-viewer";
import { AppImage as Image } from "@/components/ui/app-image";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import type { LatestWorkProject } from "@/lib/latest-work";
import { accentClasses } from "@/lib/utils/accents";
import { cn } from "@/lib/utils/cn";
import { EASE_BRAND } from "@/lib/utils/motion";

/**
 * CONCEPT 02 — a capability-map orb that opens a circular / swipeable
 * three-project composition. Right-docked above the tagline bar.
 */
export function LatestWorkOrb({
  projects,
}: {
  projects: LatestWorkProject[];
}) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState(0);
  const [viewer, setViewer] = useState<number | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const lead = projects[0];

  useLockBodyScroll(open && viewer === null);

  const closeStage = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open || viewer !== null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeStage();
      } else if (event.key === "ArrowRight") {
        setActive((current) => (current + 1) % projects.length);
      } else if (event.key === "ArrowLeft") {
        setActive(
          (current) => (current - 1 + projects.length) % projects.length,
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, viewer, closeStage, projects.length]);

  const current = projects[active] ?? lead;
  if (!lead || !current) return null;
  const accent = accentClasses[current.serviceAccent];

  return (
    <>
      <AnimatePresence>
        {hidden && !open && (
          <motion.button
            type="button"
            aria-label="Show latest work"
            onClick={() => setHidden(false)}
            className="fixed bottom-14 right-4 z-[70] rounded-full border border-white/15 bg-ink-950/90 px-3 py-2 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-fg-subtle backdrop-blur-xl sm:right-6"
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
          <motion.div
            className="fixed bottom-14 right-4 z-[70] sm:right-6"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: reduce ? 0.15 : 0.35, ease: EASE_BRAND }}
          >
            <button
              type="button"
              aria-label={`Open latest work: ${lead.title}`}
              onClick={() => setOpen(true)}
              className="relative block h-[3.45rem] w-[3.45rem] lg:h-[5.75rem] lg:w-[5.75rem]"
            >
              <span
                aria-hidden
                className="absolute -inset-[0.3rem] rounded-full border border-brand-blue/40 lg:-inset-2"
              />
              <span
                aria-hidden
                className="absolute -inset-[0.6rem] rounded-full border border-dashed border-brand-pink/30 lg:-inset-4"
              />
              <span className="relative block h-full w-full overflow-hidden rounded-full border border-white/20">
                <Image
                  src={lead.imageUrl}
                  alt={lead.alt}
                  fill
                  sizes="92px"
                  className="object-cover"
                />
              </span>
              <span className="absolute -right-0.5 -top-0.5 flex h-[1.05rem] w-[1.05rem] items-center justify-center rounded-full bg-brand-pink text-ink-950 lg:-right-1 lg:-top-1 lg:h-7 lg:w-7">
                <ArrowUpRight className="h-[0.525rem] w-[0.525rem] lg:h-3.5 lg:w-3.5" />
              </span>
            </button>
            <p className="mt-2 text-center text-[0.58rem] font-bold uppercase tracking-[0.18em] text-fg-subtle">
              Latest work
            </p>
            <button
              type="button"
              aria-label="Hide latest work"
              onClick={() => setHidden(true)}
              className="mx-auto mt-1 block text-[0.55rem] uppercase tracking-[0.14em] text-white/30 hover:text-fg-subtle"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lw-orb-heading"
            className="fixed inset-0 z-[110] bg-ink-950"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between px-5 py-4 sm:px-8">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-fg-subtle">
                Latest work · orbit
              </p>
              <button
                type="button"
                onClick={closeStage}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15"
                aria-label="Close gallery"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Desktop: circular composition */}
            <div className="relative mx-auto hidden h-[min(70vh,36rem)] w-full max-w-[40rem] lg:block">
              <div
                aria-hidden
                className="absolute inset-[8%] rounded-full border border-white/12"
              />
              <div
                aria-hidden
                className="absolute inset-[18%] rounded-full border border-dashed border-white/10"
              />
              {projects.map((project, index) => {
                const isActive = index === active;
                const angle = -90 + index * 120;
                const radius = isActive ? 0 : 38;
                const rad = (angle * Math.PI) / 180;
                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() =>
                      isActive ? setViewer(index) : setActive(index)
                    }
                    className="absolute overflow-hidden rounded-full border border-white/20"
                    style={{
                      width: isActive ? "42%" : "22%",
                      aspectRatio: "1",
                      left: `${50 + radius * Math.cos(rad)}%`,
                      top: `${50 + radius * Math.sin(rad)}%`,
                      transform: "translate(-50%, -50%)",
                      zIndex: isActive ? 2 : 1,
                      transition: reduce
                        ? "none"
                        : "left 0.4s cubic-bezier(0.22,1,0.36,1), top 0.4s cubic-bezier(0.22,1,0.36,1), width 0.4s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    <Image
                      src={project.imageUrl}
                      alt={project.alt}
                      fill
                      sizes="40vw"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>

            <div className="hidden px-8 pb-8 text-center lg:block">
              <p className={cn("text-[0.62rem] font-bold uppercase tracking-[0.18em]", accent.text)}>
                {current.serviceTitle} · {current.industryName}
              </p>
              <h2
                id="lw-orb-heading"
                className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold uppercase"
              >
                {current.title}
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm text-fg-muted">
                {current.caption}
              </p>
              <p className="mt-4 text-[0.58rem] uppercase tracking-[0.16em] text-white/30">
                Select a circle · click the centre to open
              </p>
            </div>

            {/* Mobile: swipeable full slides */}
            <div
              ref={scrollerRef}
              className="flex h-[calc(100svh-7rem)] snap-x snap-mandatory overflow-x-auto lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              onScroll={(event) => {
                const node = event.currentTarget;
                const next = Math.round(node.scrollLeft / node.clientWidth);
                if (next !== active) setActive(next);
              }}
            >
              {projects.map((project, index) => {
                const itemAccent = accentClasses[project.serviceAccent];
                return (
                  <article
                    key={project.id}
                    className="relative h-full w-full shrink-0 snap-start"
                  >
                    <Image
                      src={project.imageUrl}
                      alt={project.alt}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <p
                        className={cn(
                          "text-[0.62rem] font-bold uppercase tracking-[0.16em]",
                          itemAccent.text,
                        )}
                      >
                        {project.serviceTitle} · {project.industryName}
                      </p>
                      <h2 className="mt-2 font-[family-name:var(--font-display)] text-[1.8rem] font-bold uppercase leading-[0.92]">
                        {project.title}
                      </h2>
                      <button
                        type="button"
                        onClick={() => setViewer(index)}
                        className="mt-4 inline-flex h-11 items-center border border-white/20 px-4 text-[0.68rem] font-bold uppercase tracking-[0.16em]"
                      >
                        Open still
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
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
