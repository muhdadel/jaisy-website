"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { AppImage as Image } from "@/components/ui/app-image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLightbox } from "@/hooks/use-lightbox";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import type { ConceptProject } from "@/lib/concepts";
import { accentClasses } from "@/lib/utils/accents";
import { cn } from "@/lib/utils/cn";
import { EASE_BRAND } from "@/lib/utils/motion";

/**
 * Viewer state for the Capability Map lightbox. `resetKey` should change
 * whenever the visible collection changes so an open viewer never points
 * at a stale index.
 */
export function useProjectViewer(projects: ConceptProject[], resetKey = "") {
  const lightbox = useLightbox(projects.length);
  const { isOpen, close } = lightbox;

  useEffect(() => {
    if (isOpen) close();
    // Intentionally keyed on the collection identity only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  return {
    open: lightbox.open,
    isOpen,
    viewerProps: {
      projects,
      index: lightbox.index,
      onClose: lightbox.close,
      onPrevious: lightbox.previous,
      onNext: lightbox.next,
    },
  };
}

interface ProjectLightboxProps {
  projects: ConceptProject[];
  index: number | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

/**
 * Full-screen project view: one large image plus the project name, service,
 * sector and description. Paging stays inside the overlay — nothing navigates
 * away from the page.
 */
export function ProjectLightbox({
  projects,
  index,
  onClose,
  onPrevious,
  onNext,
}: ProjectLightboxProps) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const [direction, setDirection] = useState(1);
  const previousIndex = useRef(index);

  const project = index === null ? undefined : projects[index];
  const isOpen = Boolean(project);

  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (previousIndex.current !== null && index !== null) {
      const forward =
        index === (previousIndex.current + 1) % projects.length ||
        index > previousIndex.current;
      setDirection(forward ? 1 : -1);
    }
    previousIndex.current = index;
  }, [index, projects.length]);

  // Remember the trigger so focus returns to the grid after closing.
  useEffect(() => {
    if (isOpen) {
      restoreRef.current = document.activeElement as HTMLElement | null;
      closeRef.current?.focus();
    } else {
      restoreRef.current?.focus?.();
    }
  }, [isOpen]);

  // Keep Tab inside the overlay while it is open.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        "button, [href], [tabindex]:not([tabindex='-1'])",
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const accent = useMemo(
    () => accentClasses[project?.serviceAccent ?? "pink"],
    [project?.serviceAccent],
  );

  const slide = reduce ? 0 : 40;

  return (
    <AnimatePresence>
      {project && index !== null && (
        <motion.div
          key="concept-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} — ${project.serviceTitle}`}
          className="fixed inset-0 z-[120] bg-ink-950/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.12 : 0.2, ease: "linear" }}
          onClick={onClose}
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            const start = touchStartX.current;
            const end = event.changedTouches[0]?.clientX;
            touchStartX.current = null;
            if (start === null || end === undefined) return;
            if (Math.abs(end - start) < 56) return;
            if (end < start) onNext();
            else onPrevious();
          }}
        >
          <div
            ref={panelRef}
            className="flex h-full w-full flex-col lg:grid lg:grid-cols-[1fr_25rem] lg:gap-0"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Image stage — sized to the image on phones, full height on desktop */}
            <div className="relative flex h-[46vh] shrink-0 items-center justify-center overflow-hidden px-4 pb-4 pt-16 sm:h-[52vh] sm:px-8 lg:h-auto lg:min-h-0 lg:flex-1 lg:p-12">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={project.id}
                  className="relative h-full w-full"
                  initial={{ opacity: 0, x: direction * slide }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -slide }}
                  transition={{ duration: reduce ? 0.12 : 0.28, ease: EASE_BRAND }}
                >
                  <Image
                    src={project.imageUrl}
                    alt={project.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 66vw, 100vw"
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Desktop edge paging */}
              <button
                type="button"
                onClick={onPrevious}
                aria-label="Previous project"
                className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-ink-950/60 text-fg transition-colors duration-200 hover:border-brand-pink/70 hover:text-brand-pink lg:flex"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={onNext}
                aria-label="Next project"
                className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-ink-950/60 text-fg transition-colors duration-200 hover:border-brand-pink/70 hover:text-brand-pink lg:flex"
              >
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </div>

            {/* Meta panel */}
            <aside className="flex min-h-0 flex-1 flex-col justify-between overflow-y-auto border-t border-white/[0.07] bg-ink-900/70 px-5 py-6 sm:px-8 lg:flex-none lg:justify-between lg:overflow-visible lg:border-l lg:border-t-0 lg:px-10 lg:py-14">
              <div>
                <p
                  className={cn(
                    "text-[0.62rem] font-bold uppercase tracking-[0.24em]",
                    accent.text,
                  )}
                >
                  {project.serviceTitle}
                </p>
                <h2 className="mt-3 text-[clamp(1.6rem,4.4vw,2.6rem)] font-bold leading-[1.05]">
                  {project.title}
                </h2>
                <p className="mt-4 max-w-prose text-sm leading-relaxed text-fg-muted">
                  {project.caption}
                </p>

                <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/[0.07] pt-5 text-sm lg:grid-cols-1">
                  <div>
                    <dt className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-fg-subtle">
                      Industry
                    </dt>
                    <dd className="mt-1.5 font-semibold text-fg">
                      {project.industryName}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-fg-subtle">
                      Service
                    </dt>
                    <dd className="mt-1.5 font-semibold text-fg">
                      {project.serviceTitle}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-7 flex items-center justify-between gap-4 lg:mt-10">
                <span className="text-xs tabular-nums text-fg-subtle">
                  {String(index + 1).padStart(2, "0")} / {projects.length}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onPrevious}
                    aria-label="Previous project"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] text-fg transition-colors duration-200 hover:border-brand-pink/70 hover:text-brand-pink"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={onNext}
                    aria-label="Next project"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] text-fg transition-colors duration-200 hover:border-brand-pink/70 hover:text-brand-pink"
                  >
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </div>
            </aside>

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close project view"
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-ink-950/70 text-fg transition-colors duration-200 hover:border-brand-pink/70 hover:text-brand-pink sm:right-6 sm:top-6"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
