"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { AppImage as Image } from "@/components/ui/app-image";
import { useMemo, useState } from "react";
import {
  ProjectLightbox,
  useProjectViewer,
} from "@/components/concepts/project-lightbox";
import type { ConceptPageData } from "@/lib/concepts/load";
import type { ServiceSlug } from "@/lib/content/types";
import { accentClasses } from "@/lib/utils/accents";
import { cn } from "@/lib/utils/cn";
import { EASE_BRAND } from "@/lib/utils/motion";

/**
 * CONCEPT 01 — Capabilities → Work.
 * A service list drives a single gallery stage: choosing a capability swaps the
 * work on the right and re-states the sectors that capability has served.
 */
export function Concept01Capabilities({ data }: { data: ConceptPageData }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<ServiceSlug>(data.services[0].slug);

  const service = data.services.find((item) => item.slug === active)!;
  const projects = useMemo(
    () => data.projects.filter((project) => project.serviceSlug === active),
    [data.projects, active],
  );

  const { open, viewerProps } = useProjectViewer(projects, active);
  const accent = accentClasses[service.accent];
  const [lead, ...rest] = projects;

  return (
    <section
      aria-labelledby="concept-1-heading"
      className="relative overflow-x-clip py-16 sm:py-20 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-texture opacity-[0.18] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]"
      />

      <div className="container-page relative">
        <header className="max-w-3xl">
          <p className="eyebrow">
            <span aria-hidden className="h-px w-8 bg-brand-pink" />
            {data.copy.services.eyebrow}
          </p>
          <h1
            id="concept-1-heading"
            className="mt-5 text-[clamp(2.4rem,7vw,5rem)] font-bold leading-[0.92]"
          >
            Capabilities,
            <br />
            <span className="text-fg-subtle">and the work behind them.</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-fg-muted sm:text-lg">
            {data.copy.services.intro}
          </p>
        </header>

        {/* Mobile / tablet service selector — tap, scroll, no hover needed. */}
        <div className="mt-10 lg:hidden">
          <div
            role="tablist"
            aria-label="Choose a service"
            aria-orientation="horizontal"
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {data.services.map((item, index) => {
              const isActive = item.slug === active;
              return (
                <button
                  key={item.slug}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(item.slug)}
                  className={cn(
                    "shrink-0 whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors duration-200",
                    isActive
                      ? "border-transparent bg-gradient-brand text-ink-950"
                      : "border-white/10 bg-white/[0.03] text-fg-subtle",
                  )}
                >
                  <span className="mr-2 tabular-nums opacity-60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.title}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,23rem)_minmax(0,1fr)] lg:gap-14">
          {/* Desktop service list */}
          <div
            role="tablist"
            aria-label="Choose a service"
            aria-orientation="vertical"
            className="hidden lg:sticky lg:top-40 lg:block lg:self-start"
          >
            {data.services.map((item, index) => {
              const isActive = item.slug === active;
              const itemAccent = accentClasses[item.accent];
              return (
                <button
                  key={item.slug}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(item.slug)}
                  className="group block w-full border-t border-white/[0.07] py-5 text-left last:border-b"
                >
                  <span className="flex items-baseline gap-4">
                    <span
                      className={cn(
                        "font-[family-name:var(--font-display)] text-[0.7rem] font-bold tabular-nums transition-colors duration-200",
                        isActive ? itemAccent.text : "text-white/25",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "font-[family-name:var(--font-display)] text-[1.6rem] font-bold leading-tight tracking-tight transition-colors duration-200",
                        isActive
                          ? "text-fg"
                          : "text-fg-subtle group-hover:text-fg",
                      )}
                    >
                      {item.title}
                    </span>
                  </span>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.span
                        className="block overflow-hidden pl-9"
                        initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: reduce ? 0.12 : 0.24, ease: EASE_BRAND }}
                      >
                        <span className="block pt-2.5 text-sm leading-relaxed text-fg-muted">
                          {item.summary}
                        </span>
                        <span className="mt-3 block text-[0.6rem] font-bold uppercase tracking-[0.2em] text-fg-subtle">
                          {item.projectCount} projects
                        </span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

          {/* Gallery stage */}
          <div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: reduce ? 0.12 : 0.26, ease: EASE_BRAND }}
              >
                {lead && (
                  <button
                    type="button"
                    onClick={() => open(0)}
                    className="group relative block w-full overflow-hidden border border-white/[0.07] text-left"
                  >
                    <span className="relative block aspect-[4/3] w-full sm:aspect-[16/10]">
                      <Image
                        src={lead.imageUrl}
                        alt={lead.alt}
                        fill
                        sizes="(min-width: 1024px) 60vw, 100vw"
                        className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                        priority
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent"
                      />
                    </span>
                    <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
                      <span className="block">
                        <span
                          className={cn(
                            "block text-[0.6rem] font-bold uppercase tracking-[0.22em]",
                            accent.text,
                          )}
                        >
                          {lead.industryName}
                        </span>
                        <span className="mt-2 block font-[family-name:var(--font-display)] text-[clamp(1.3rem,3vw,2.1rem)] font-bold leading-tight text-fg">
                          {lead.title}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-ink-950/60 text-fg transition-colors duration-200 group-hover:border-brand-pink/70 group-hover:text-brand-pink sm:inline-flex"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </span>
                  </button>
                )}

                {rest.length > 0 && (
                  <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {rest.map((project, index) => (
                      <li key={project.id}>
                        <button
                          type="button"
                          onClick={() => open(index + 1)}
                          className="group relative block w-full overflow-hidden border border-white/[0.07] text-left"
                        >
                          <span className="relative block aspect-square w-full">
                            <Image
                              src={project.imageUrl}
                              alt={project.alt}
                              fill
                              loading="lazy"
                              sizes="(min-width: 1024px) 20vw, 45vw"
                              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                            />
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-transparent"
                            />
                          </span>
                          <span className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                            <span className="block text-[0.55rem] font-bold uppercase tracking-[0.2em] text-fg-muted">
                              {project.industryName}
                            </span>
                            <span className="mt-1 block text-sm font-semibold leading-tight text-fg">
                              {project.title}
                            </span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Sectors this capability has actually served. */}
                <div className="mt-7 border-t border-white/[0.07] pt-6">
                  <h3 className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-fg-subtle">
                    Industries we serve
                  </h3>
                  <p className="mt-2.5 text-sm font-medium leading-relaxed text-fg">
                    {service.industryNames.map((name, index) => (
                      <span key={name}>
                        {index > 0 && (
                          <span aria-hidden className="mx-2 text-white/25">
                            ·
                          </span>
                        )}
                        {name}
                      </span>
                    ))}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <ProjectLightbox {...viewerProps} />
    </section>
  );
}
