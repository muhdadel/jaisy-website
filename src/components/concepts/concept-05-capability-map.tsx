"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AppImage as Image } from "@/components/ui/app-image";
import { useMemo, useState } from "react";
import { Concept05MobileReel } from "@/components/concepts/concept-05-mobile-reel";
import {
  ProjectLightbox,
  useProjectViewer,
} from "@/components/concepts/project-lightbox";
import type { ConceptPageData } from "@/lib/concepts/load";
import type { ServiceSlug } from "@/lib/content/types";
import { accentClasses } from "@/lib/utils/accents";
import { cn } from "@/lib/utils/cn";
import { EASE_BRAND } from "@/lib/utils/motion";

/** Capability labels sit on one ring; the work floats inside it. */
const LABEL_RADIUS = 42;

/**
 * The work orbits the centre through the gaps between labels â€” 30Â° clear of
 * every capability name, so images and type never collide at any width.
 */
const FLOAT_SLOTS = [
  { angle: 0, radius: 34 },
  { angle: 60, radius: 28 },
  { angle: 180, radius: 34 },
  { angle: 240, radius: 28 },
];

/** Rounded so the server and client serialise byte-identical percentages. */
function polar(angleDeg: number, radius: number) {
  const angle = (angleDeg * Math.PI) / 180;
  const percent = (value: number) => `${Math.round(value * 100) / 100}%`;
  return {
    left: percent(50 + radius * Math.cos(angle)),
    top: percent(50 + radius * Math.sin(angle)),
  };
}

/**
 * The Capability Map: six capabilities orbit one promise on desktop.
 * On mobile, the reel is the production reading â€” one capability per screen.
 */
export function Concept05CapabilityMap({
  data,
  headingAs: Heading = "h2",
  headingId = "work-heading",
  sectionId = "work",
}: {
  data: ConceptPageData;
  headingAs?: "h1" | "h2";
  headingId?: string;
  /** Homepage section id (`work`). Legacy #services / #industries still resolve. */
  sectionId?: string;
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<ServiceSlug>(data.services[0].slug);

  const service = data.services.find((item) => item.slug === active)!;
  const accent = accentClasses[service.accent];

  const projects = useMemo(
    () => data.projects.filter((project) => project.serviceSlug === active),
    [data.projects, active],
  );
  const { open, viewerProps } = useProjectViewer(projects, active);

  const connected = new Set(service.industryNames);
  const floating = projects.slice(0, FLOAT_SLOTS.length);

  return (
    <section
      id={sectionId}
      aria-labelledby={headingId}
      className="relative scroll-mt-24 overflow-x-clip py-0 lg:py-24"
    >
      {sectionId === "work" && (
        <>
          <span id="services" className="absolute top-0" />
          <span id="industries" className="absolute top-0" />
        </>
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-texture opacity-[0.15]"
      />

      <div className="container-page relative">
        <header className="max-w-2xl">
          <p className="eyebrow hidden lg:inline-flex">
            <span aria-hidden className="h-px w-8 bg-brand-pink" />
            Capability map
          </p>
          <Heading
            id={headingId}
            className="mt-5 text-[clamp(2rem,5.5vw,3.4rem)] font-bold leading-[0.95] max-lg:sr-only"
          >
            One partner, six capabilities, ten sectors.
          </Heading>
        </header>

        {/* ---------- Desktop: the orbit ---------- */}
        <div className="relative mx-auto mt-12 hidden aspect-square w-full max-w-[56rem] lg:block">
          <div
            aria-hidden
            className="absolute inset-[8%] rounded-full border border-white/[0.07]"
          />
          <div
            aria-hidden
            className="absolute inset-[20%] rounded-full border border-dashed border-white/[0.05]"
          />

          {/* Floating work for the selected capability */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0.12 : 0.26, ease: EASE_BRAND }}
            >
              {floating.map((project, index) => (
                <motion.button
                  key={project.id}
                  type="button"
                  onClick={() => open(index)}
                  className="group absolute w-[8rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-white/10 text-left xl:w-[9.5rem]"
                  style={polar(
                    FLOAT_SLOTS[index].angle,
                    FLOAT_SLOTS[index].radius,
                  )}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: reduce ? 0.12 : 0.28,
                    delay: reduce ? 0 : index * 0.05,
                    ease: EASE_BRAND,
                  }}
                >
                  <span className="relative block aspect-[4/5] w-full">
                    <Image
                      src={project.imageUrl}
                      alt={project.alt}
                      fill
                      loading="lazy"
                      sizes="152px"
                      className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/20 to-transparent"
                    />
                  </span>
                  <span className="absolute inset-x-0 bottom-0 p-2.5">
                    <span className="block text-[0.62rem] font-semibold leading-tight text-fg">
                      {project.title}
                    </span>
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Centre â€” the promise, then what is selected */}
          <div className="pointer-events-none absolute inset-[30%] flex flex-col items-center justify-center text-center">
            <p className="font-[family-name:var(--font-display)] text-[clamp(1.4rem,2.6vw,2.1rem)] font-bold uppercase leading-[0.95]">
              360Â° Brand
              <br />
              Execution
            </p>
            <span aria-hidden className="mt-4 h-px w-10 bg-white/15" />
            <p
              aria-live="polite"
              className={cn(
                "mt-4 text-[0.68rem] font-bold uppercase tracking-[0.2em]",
                accent.text,
              )}
            >
              {service.title}
            </p>
            <p className="mt-1.5 text-[0.65rem] uppercase tracking-[0.18em] text-fg-subtle">
              {service.projectCount} projects
            </p>
          </div>

          {/* Capability ring */}
          <div role="tablist" aria-label="Choose a capability">
            {data.services.map((item, index) => {
              const isActive = item.slug === active;
              const itemAccent = accentClasses[item.accent];
              return (
                <button
                  key={item.slug}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onMouseEnter={() => setActive(item.slug)}
                  onFocus={() => setActive(item.slug)}
                  onClick={() => setActive(item.slug)}
                  className="absolute w-[10.5rem] -translate-x-1/2 -translate-y-1/2 text-center xl:w-[11.5rem]"
                  style={polar(-90 + index * 60, LABEL_RADIUS)}
                >
                  <span
                    className={cn(
                      "mx-auto mb-2 block h-2 w-2 rounded-full transition-colors duration-200",
                      isActive ? itemAccent.bg : "bg-white/20",
                    )}
                  />
                  <span
                    className={cn(
                      "block font-[family-name:var(--font-display)] text-[0.95rem] font-bold uppercase leading-tight tracking-[0.04em] transition-colors duration-200 xl:text-[1.05rem]",
                      isActive ? "text-fg" : "text-white/35 hover:text-fg",
                    )}
                  >
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ---------- Desktop: sectors + project strip ---------- */}
        <div className="mt-10 hidden lg:block">
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-fg-subtle">
            Sectors connected to {service.title}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {data.industries.map((industry) => {
              const isConnected = connected.has(industry.name);
              return (
                <li key={industry.id}>
                  <span
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.72rem] font-semibold transition-colors duration-200",
                      isConnected
                        ? cn(accent.border, accent.text, "bg-white/[0.03]")
                        : "border-white/[0.07] text-white/25",
                    )}
                  >
                    {industry.name}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-10">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-[0.04em]">
                {service.title}
              </h2>
              <p className="text-[0.65rem] uppercase tracking-[0.18em] text-fg-subtle">
                {service.projectCount} projects
              </p>
            </div>
            <div
              className="mt-4 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              role="group"
              aria-label={`${service.title} projects`}
            >
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => open(index)}
                  className="group relative w-[16rem] shrink-0 overflow-hidden border border-white/[0.07] text-left"
                >
                  <span className="relative block aspect-[4/3] w-full">
                    <Image
                      src={project.imageUrl}
                      alt={project.alt}
                      fill
                      loading="lazy"
                      sizes="256px"
                      className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-transparent"
                    />
                  </span>
                  <span className="absolute inset-x-0 bottom-0 p-3">
                    <span className="block text-sm font-semibold leading-tight text-fg">
                      {project.title}
                    </span>
                    <span className="mt-1 block text-[0.6rem] uppercase tracking-[0.16em] text-fg-subtle">
                      {project.industryName}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="-mx-5 lg:hidden sm:-mx-8">
          <Concept05MobileReel data={data} />
        </div>
      </div>

      <ProjectLightbox {...viewerProps} />
    </section>
  );
}
