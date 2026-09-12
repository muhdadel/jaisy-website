"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AppImage as Image } from "@/components/ui/app-image";
import { useMemo, useState } from "react";
import {
  ProjectLightbox,
  useProjectViewer,
} from "@/components/concepts/project-lightbox";
import type { ConceptPageData } from "@/lib/concepts/load";
import type { ServiceSlug } from "@/lib/content/types";
import { cn } from "@/lib/utils/cn";
import { EASE_BRAND } from "@/lib/utils/motion";

type ServiceFilter = ServiceSlug | "all";
type IndustryFilter = string | "all";

/**
 * CONCEPT 02 — Visual Wall.
 * The portfolio is the page. Capabilities and sectors sit on top of it as two
 * layers of filters, so the work is never pushed below a services block.
 */
export function Concept02VisualWall({ data }: { data: ConceptPageData }) {
  const reduce = useReducedMotion();
  const [service, setService] = useState<ServiceFilter>("all");
  const [industry, setIndustry] = useState<IndustryFilter>("all");

  const byService = useMemo(
    () =>
      service === "all"
        ? data.projects
        : data.projects.filter((project) => project.serviceSlug === service),
    [data.projects, service],
  );

  const visible = useMemo(
    () =>
      industry === "all"
        ? byService
        : byService.filter((project) => project.industryId === industry),
    [byService, industry],
  );

  const { open, viewerProps } = useProjectViewer(
    visible,
    `${service}-${industry}`,
  );

  const industryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const project of byService) {
      counts.set(project.industryId, (counts.get(project.industryId) ?? 0) + 1);
    }
    return counts;
  }, [byService]);

  const selectService = (next: ServiceFilter) => {
    setService(next);
    setIndustry("all");
  };

  const serviceFilters: { key: ServiceFilter; label: string; count: number }[] =
    [
      { key: "all", label: "All", count: data.projects.length },
      ...data.services.map((item) => ({
        key: item.slug as ServiceFilter,
        label: item.title,
        count: item.projectCount,
      })),
    ];

  return (
    <section
      aria-labelledby="concept-2-heading"
      className="relative py-16 sm:py-20 lg:py-24"
    >
      <div className="container-page">
        <header className="flex flex-col gap-6 border-b border-white/[0.07] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">
              <span aria-hidden className="h-px w-8 bg-brand-pink" />
              {data.copy.portfolio.eyebrow}
            </p>
            <h1
              id="concept-2-heading"
              className="mt-5 text-[clamp(2.6rem,9vw,6.5rem)] font-bold uppercase leading-[0.88]"
            >
              The Work
            </h1>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-fg-muted">
            {data.copy.portfolio.intro}
          </p>
        </header>

        {/* Primary layer — capability */}
        <div
          role="tablist"
          aria-label="Filter work by service"
          className="-mx-5 mt-8 flex gap-x-6 gap-y-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-wrap lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {serviceFilters.map((filter) => {
            const isActive = service === filter.key;
            return (
              <button
                key={filter.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => selectService(filter.key)}
                className={cn(
                  "group relative shrink-0 whitespace-nowrap pb-2 text-left font-[family-name:var(--font-display)] text-[0.95rem] font-bold uppercase tracking-[0.06em] transition-colors duration-200 sm:text-lg",
                  isActive ? "text-fg" : "text-white/35 hover:text-fg",
                )}
              >
                {filter.label}
                <span className="ml-1.5 align-super text-[0.6rem] tabular-nums text-fg-subtle">
                  {filter.count}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="concept-2-underline"
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-brand-pink"
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 420, damping: 36 }
                    }
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Secondary layer — sector */}
        <div
          role="tablist"
          aria-label="Filter work by industry"
          className="-mx-5 mt-5 flex items-center gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-wrap lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <span className="mr-1 hidden shrink-0 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-fg-subtle lg:inline">
            {data.copy.industries.heading}
          </span>
          <button
            type="button"
            role="tab"
            aria-selected={industry === "all"}
            onClick={() => setIndustry("all")}
            className={cn(
              "shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[0.72rem] font-semibold transition-colors duration-200",
              industry === "all"
                ? "border-brand-blue/60 bg-brand-blue/10 text-brand-blue"
                : "border-white/10 bg-white/[0.02] text-fg-subtle hover:border-white/25 hover:text-fg",
            )}
          >
            All industries
          </button>
          {data.industries.map((item) => {
            const count = industryCounts.get(item.id) ?? 0;
            const isActive = industry === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                disabled={count === 0}
                onClick={() => setIndustry(item.id)}
                className={cn(
                  "shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[0.72rem] font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-30",
                  isActive
                    ? "border-brand-blue/60 bg-brand-blue/10 text-brand-blue"
                    : "border-white/10 bg-white/[0.02] text-fg-subtle hover:border-white/25 hover:text-fg",
                )}
              >
                {item.name}
                <span className="ml-1.5 text-[0.6rem] tabular-nums opacity-60">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="mt-6 text-xs text-fg-subtle">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>
      </div>

      {/* The wall — editorial masonry, full width on large screens */}
      <div className="mt-6 px-1.5 sm:px-4 lg:px-6">
        {/* Keyed on the filter pair: the wall cross-fades, the tiles stay still. */}
        <motion.div
          key={`${service}-${industry}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0.12 : 0.24, ease: EASE_BRAND }}
          className="columns-1 gap-1.5 sm:columns-2 sm:gap-3 lg:columns-3 xl:columns-4"
        >
          {visible.map((project, index) => (
            <div
              key={project.id}
              className="mb-1.5 break-inside-avoid sm:mb-3"
            >
              <button
                type="button"
                onClick={() => open(index)}
                className="group relative block w-full overflow-hidden text-left"
              >
                <span
                  className={cn(
                    "relative block w-full",
                    // Deterministic rhythm keeps the wall editorial, not gridded.
                    index % 5 === 0
                      ? "aspect-[4/5]"
                      : index % 5 === 3
                        ? "aspect-[3/4]"
                        : "aspect-[4/3]",
                  )}
                >
                  <Image
                    src={project.imageUrl}
                    alt={project.alt}
                    fill
                    loading={index < 4 ? "eager" : "lazy"}
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:scale-[1.04]"
                  />
                </span>

                {/* Always legible on touch, revealed on hover for pointers. */}
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-transparent transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100"
                />
                <span className="absolute inset-x-0 bottom-0 p-3 transition-all duration-300 sm:p-5 md:translate-y-1.5 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  <span className="block text-[0.55rem] font-bold uppercase tracking-[0.2em] text-brand-pink sm:text-[0.6rem]">
                    {project.serviceTitle}
                  </span>
                  <span className="mt-1.5 block font-[family-name:var(--font-display)] text-sm font-bold leading-tight text-fg sm:text-xl">
                    {project.title}
                  </span>
                  <span className="mt-1 block text-[0.68rem] text-fg-muted sm:text-xs">
                    {project.industryName}
                  </span>
                </span>
              </button>
            </div>
          ))}
        </motion.div>
      </div>

      <ProjectLightbox {...viewerProps} />
    </section>
  );
}
