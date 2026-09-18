"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { AppImage as Image } from "@/components/ui/app-image";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import type { LatestWorkProject } from "@/lib/latest-work";
import { accentClasses } from "@/lib/utils/accents";
import { cn } from "@/lib/utils/cn";
import { EASE_BRAND } from "@/lib/utils/motion";

/**
 * Shared project stage for Latest Work overlays. Each featured piece has
 * one photograph — the frame is designed around that, not a fake gallery.
 */
export function LatestWorkViewer({
  projects,
  index,
  onClose,
  onPrevious,
  onNext,
}: {
  projects: LatestWorkProject[];
  index: number | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const project = index === null ? undefined : projects[index];
  const isOpen = Boolean(project);

  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        onNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPrevious();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, onNext, onPrevious]);

  const accent = accentClasses[project?.serviceAccent ?? "pink"];

  return (
    <AnimatePresence>
      {project && index !== null && (
        <motion.div
          key="latest-work-viewer"
          role="dialog"
          aria-modal="true"
          aria-labelledby="latest-work-viewer-title"
          className="fixed inset-0 z-[120] flex flex-col bg-ink-950/96 backdrop-blur-xl"
          initial={reduce ? { opacity: 0 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.12 : 0.28, ease: EASE_BRAND }}
        >
          <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-fg-subtle">
              Latest work
              <span className="text-white/30">
                {" "}
                · {String(index + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </span>
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-fg-subtle hover:text-fg"
              aria-label="Close project"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="relative min-h-0 flex-1 px-5 pb-6 sm:px-8">
            <div className="relative mx-auto h-full max-w-5xl overflow-hidden border border-white/10">
              <Image
                src={project.imageUrl}
                alt={project.alt}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                <p
                  className={cn(
                    "text-[0.62rem] font-bold uppercase tracking-[0.18em]",
                    accent.text,
                  )}
                >
                  {project.serviceTitle} · {project.industryName}
                </p>
                <h2
                  id="latest-work-viewer-title"
                  className="mt-2 max-w-xl font-[family-name:var(--font-display)] text-[clamp(1.8rem,5vw,3rem)] font-bold uppercase leading-[0.92]"
                >
                  {project.title}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-fg-muted sm:text-base">
                  {project.caption}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 px-5 py-4 sm:px-8">
            <button
              type="button"
              onClick={onPrevious}
              className="inline-flex h-11 items-center gap-2 border border-white/15 px-4 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-fg-subtle hover:text-fg"
            >
              <ArrowLeft className="h-4 w-4" />
              Prev
            </button>
            <button
              type="button"
              onClick={onNext}
              className="inline-flex h-11 items-center gap-2 border border-white/15 px-4 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-fg-subtle hover:text-fg"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
