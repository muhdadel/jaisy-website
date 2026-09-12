"use client";

import { motion } from "framer-motion";
import { AppImage as Image } from "@/components/ui/app-image";
import { type CSSProperties, type ReactNode, useMemo } from "react";
import {
  ProjectLightbox,
  useProjectViewer,
} from "@/components/concepts/project-lightbox";
import type { ConceptProject } from "@/lib/concepts";
import type { ConceptPageData } from "@/lib/concepts/load";
import { accentClasses } from "@/lib/utils/accents";
import { cn } from "@/lib/utils/cn";
import { EASE_SOFT, VIEWPORT_ONCE } from "@/lib/utils/motion";

/**
 * Opacity-only entrance: safe under reduced motion without branching on it,
 * which keeps the server and client markup identical.
 */
function Reveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.4, ease: EASE_SOFT }}
    >
      {children}
    </motion.div>
  );
}

/**
 * CONCEPT 04 — The Project Archive.
 * An editorial archive: the work moves past first, then the archive explains
 * itself — capabilities, then sectors — with each index row carrying its own
 * strip of projects.
 */
export function Concept04Archive({ data }: { data: ConceptPageData }) {
  const { open, viewerProps } = useProjectViewer(data.projects);

  const openById = (id: string) => {
    const index = data.projects.findIndex((project) => project.id === id);
    if (index >= 0) open(index);
  };

  // Two reels, no project repeated between them.
  const half = Math.ceil(data.projects.length / 2);
  const reels = useMemo(
    () => [data.projects.slice(0, half), data.projects.slice(half)],
    [data.projects, half],
  );

  return (
    <section
      aria-labelledby="concept-4-heading"
      className="relative overflow-x-clip pb-20 pt-16 sm:pt-20 lg:pb-28 lg:pt-24"
    >
      <div className="container-page">
        <div className="flex items-baseline justify-between gap-6 border-b border-white/[0.07] pb-4">
          <p className="eyebrow">Archive</p>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-fg-subtle">
            {String(data.projects.length).padStart(3, "0")} entries
          </p>
        </div>
        <h1
          id="concept-4-heading"
          className="mt-8 text-[clamp(2.6rem,11vw,9rem)] font-bold uppercase leading-[0.86]"
        >
          We build
          <br />
          <span className="text-fg-subtle">experiences.</span>
        </h1>
      </div>

      {/* The reels */}
      <div className="mt-12 space-y-2 sm:space-y-3 lg:mt-16">
        {reels.map((reel, reelIndex) => (
          <Reel
            key={reelIndex}
            projects={reel}
            reverse={reelIndex === 1}
            onOpen={openById}
          />
        ))}
      </div>

      {/* Capabilities index */}
      <div className="container-page mt-20 lg:mt-28">
        <Reveal>
          <div className="flex items-baseline justify-between gap-6 border-b border-white/[0.07] pb-4">
            <h2 className="text-[clamp(1.6rem,4vw,2.6rem)] font-bold uppercase leading-none">
              {data.copy.services.heading}
            </h2>
            <p className="hidden text-[0.65rem] font-bold uppercase tracking-[0.2em] text-fg-subtle sm:block">
              Filed by capability
            </p>
          </div>
        </Reveal>

        <ul>
          {data.services.map((service, index) => {
            const accent = accentClasses[service.accent];
            const projects = data.projects.filter(
              (project) => project.serviceSlug === service.slug,
            );
            return (
              <li
                key={service.slug}
                className="border-b border-white/[0.07] py-8 lg:py-10"
              >
                <Reveal>
                  <div className="grid gap-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-10">
                    <div>
                      <p
                        className={cn(
                          "font-[family-name:var(--font-display)] text-[0.7rem] font-bold tabular-nums",
                          accent.text,
                        )}
                      >
                        {String(index + 1).padStart(2, "0")} /{" "}
                        {String(projects.length).padStart(2, "0")}
                      </p>
                      <h3 className="mt-3 text-[clamp(1.5rem,3.4vw,2.3rem)] font-bold leading-[1.02]">
                        {service.title}
                      </h3>
                      <p className="mt-3 max-w-sm text-sm leading-relaxed text-fg-muted">
                        {service.summary}
                      </p>
                      <p className="mt-4 text-[0.62rem] font-bold uppercase leading-relaxed tracking-[0.18em] text-fg-subtle">
                        {service.industryNames.join(" · ")}
                      </p>
                    </div>

                    <div
                      className="-mx-5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-2 sm:gap-3 lg:mx-0 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                      role="group"
                      aria-label={`${service.title} projects`}
                    >
                      {projects.map((project) => (
                        <button
                          key={project.id}
                          type="button"
                          onClick={() => openById(project.id)}
                          className="group relative w-[70vw] shrink-0 snap-start overflow-hidden text-left sm:w-[18rem] lg:w-[15rem]"
                        >
                          <span className="relative block aspect-[4/5] w-full">
                            <Image
                              src={project.imageUrl}
                              alt={project.alt}
                              fill
                              loading="lazy"
                              sizes="(min-width: 640px) 288px, 70vw"
                              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:scale-[1.04]"
                            />
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-transparent"
                            />
                          </span>
                          <span className="absolute inset-x-0 bottom-0 p-4">
                            <span className="block font-[family-name:var(--font-display)] text-base font-bold leading-tight text-fg">
                              {project.title}
                            </span>
                            <span className="mt-1 block text-[0.65rem] uppercase tracking-[0.16em] text-fg-subtle">
                              {project.industryName}
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Sector index */}
      <div className="container-page mt-20 lg:mt-28">
        <Reveal>
          <div className="flex items-baseline justify-between gap-6 border-b border-white/[0.07] pb-4">
            <h2 className="text-[clamp(1.6rem,4vw,2.6rem)] font-bold uppercase leading-none">
              {data.copy.industries.heading}
            </h2>
            <p className="hidden text-[0.65rem] font-bold uppercase tracking-[0.2em] text-fg-subtle sm:block">
              Cross-referenced by sector
            </p>
          </div>
        </Reveal>

        <ul className="mt-2">
          {data.industries.map((industry, index) => (
            <li key={industry.id}>
              <Reveal>
                <div className="flex items-center gap-4 border-b border-white/[0.07] py-5 sm:gap-8">
                  <span className="w-8 shrink-0 font-[family-name:var(--font-display)] text-[0.7rem] font-bold tabular-nums text-white/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-[family-name:var(--font-display)] text-lg font-bold leading-tight sm:text-2xl">
                      {industry.name}
                    </span>
                    <span className="mt-1 block truncate text-[0.65rem] uppercase tracking-[0.16em] text-fg-subtle">
                      {industry.serviceTitles.join(" · ")}
                    </span>
                  </span>
                  <span className="hidden shrink-0 text-xs tabular-nums text-fg-subtle sm:block">
                    {String(industry.projectCount).padStart(2, "0")}
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <ProjectLightbox {...viewerProps} />
    </section>
  );
}

/**
 * Auto-panning strip of archive entries. The pan is a CSS animation behind
 * `motion-safe`, so under reduced-motion the same markup becomes a plain
 * horizontal scroller instead of re-rendering a different tree.
 */
function Reel({
  projects,
  reverse,
  onOpen,
}: {
  projects: ConceptProject[];
  reverse: boolean;
  onOpen: (id: string) => void;
}) {
  const tiles = projects.map((project) => (
    <button
      key={project.id}
      type="button"
      onClick={() => onOpen(project.id)}
      className="group relative h-[34vh] w-[68vw] shrink-0 overflow-hidden text-left sm:h-[38vh] sm:w-[28rem] lg:h-[42vh]"
    >
      <Image
        src={project.imageUrl}
        alt={project.alt}
        fill
        loading="lazy"
        sizes="(min-width: 640px) 448px, 68vw"
        className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:scale-[1.04]"
      />
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/10 to-transparent"
      />
      <span className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <span className="block text-[0.55rem] font-bold uppercase tracking-[0.2em] text-brand-pink">
          {project.serviceTitle}
        </span>
        <span className="mt-1.5 block font-[family-name:var(--font-display)] text-lg font-bold leading-tight text-fg sm:text-2xl">
          {project.title}
        </span>
      </span>
    </button>
  ));

  return (
    <div className="group/reel relative overflow-hidden motion-reduce:overflow-x-auto motion-reduce:[scrollbar-width:none] motion-reduce:[&::-webkit-scrollbar]:hidden">
      <div
        className={cn(
          "flex w-max gap-2 sm:gap-3",
          reverse
            ? "motion-safe:animate-[marquee-reverse_var(--marquee-duration)_linear_infinite]"
            : "motion-safe:animate-[marquee_var(--marquee-duration)_linear_infinite]",
          "group-hover/reel:[animation-play-state:paused]",
        )}
        style={{ "--marquee-duration": "72s" } as CSSProperties}
      >
        {tiles}
        {/* Duplicate track keeps the loop seamless at the -50% keyframe. */}
        {projects.map((project) => (
          <span
            key={`${project.id}-loop`}
            aria-hidden
            className="pointer-events-none relative block h-[34vh] w-[68vw] shrink-0 overflow-hidden sm:h-[38vh] sm:w-[28rem] lg:h-[42vh]"
          >
            <Image
              src={project.imageUrl}
              alt=""
              fill
              loading="lazy"
              sizes="(min-width: 640px) 448px, 68vw"
              className="object-cover"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/10 to-transparent" />
          </span>
        ))}
      </div>
    </div>
  );
}
