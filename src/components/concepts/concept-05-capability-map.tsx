"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AppImage as Image } from "@/components/ui/app-image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Concept05MobileAtlas } from "@/components/concepts/concept-05-mobile-atlas";
import {
  Concept05MobileCards,
  Concept05MobileDock,
  Concept05MobileList,
} from "@/components/concepts/concept-05-mobile-compact";
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
 * The work orbits the centre through the gaps between labels — 30° clear of
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
 * CONCEPT 05 — The Capability Map.
 * Six capabilities orbit one promise. Choosing a capability lights up the
 * sectors it has served and floats its work into the composition.
 */
export function Concept05CapabilityMap({
  data,
  headingAs: Heading = "h1",
  headingId = "concept-5-heading",
  sectionId,
  mobileVariant = "stage",
}: {
  data: ConceptPageData;
  headingAs?: "h1" | "h2";
  headingId?: string;
  /** Homepage section id (`work`). Legacy #services / #industries still resolve. */
  sectionId?: string;
  /** Live and Concept 05 use the cinematic stage. Preview routes swap mobile only. */
  mobileVariant?: "stage" | "reel" | "atlas" | "cards" | "list" | "dock";
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
      className={cn(
        "relative scroll-mt-24 overflow-x-clip",
        mobileVariant === "stage" ? "py-16 sm:py-20 lg:py-24" : "py-0 lg:py-24",
      )}
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

          {/* Centre — the promise, then what is selected */}
          <div className="pointer-events-none absolute inset-[30%] flex flex-col items-center justify-center text-center">
            <p className="font-[family-name:var(--font-display)] text-[clamp(1.4rem,2.6vw,2.1rem)] font-bold uppercase leading-[0.95]">
              360° Brand
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

        {mobileVariant === "stage" ? (
          <MobileCapabilityMap
            data={data}
            active={active}
            onSelect={setActive}
            onOpenProject={open}
          />
        ) : (
          <div className="-mx-5 lg:hidden sm:-mx-8">
            {mobileVariant === "reel" && <Concept05MobileReel data={data} />}
            {mobileVariant === "atlas" && <Concept05MobileAtlas data={data} />}
            {mobileVariant === "cards" && <Concept05MobileCards data={data} />}
            {mobileVariant === "list" && <Concept05MobileList data={data} />}
            {mobileVariant === "dock" && <Concept05MobileDock data={data} />}
          </div>
        )}
      </div>

      <ProjectLightbox {...viewerProps} />
    </section>
  );
}

const MOBILE_FLOATS = [
  { className: "left-[4%] bottom-[22%] w-[28%] rotate-[-8deg]" },
  { className: "right-[5%] bottom-[26%] w-[30%] rotate-[7deg]" },
  { className: "left-[36%] bottom-[8%] w-[26%] rotate-[-2deg]" },
];

/**
 * Portrait-native Capability Map: a cinematic stage you rotate by swipe,
 * floating work cards, then a connected-sector spine. Same ecosystem idea
 * as the desktop orbit — built for thumbs, not shrunk from a circle.
 */
function MobileCapabilityMap({
  data,
  active,
  onSelect,
  onOpenProject,
}: {
  data: ConceptPageData;
  active: ServiceSlug;
  onSelect: (slug: ServiceSlug) => void;
  onOpenProject: (index: number) => void;
}) {
  const reduce = useReducedMotion();
  const slugs = data.services.map((item) => item.slug);
  const index = slugs.indexOf(active);
  const service = data.services[index];
  const accent = accentClasses[service.accent];
  const projects = data.projects.filter(
    (project) => project.serviceSlug === active,
  );
  const lead = projects[0];
  const floats = projects.slice(1, 1 + MOBILE_FLOATS.length);
  const connected = new Set(service.industryNames);

  const railRef = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const skipRailAlign = useRef(true);

  const go = (dir: 1 | -1) => {
    onSelect(slugs[(index + dir + slugs.length) % slugs.length]);
  };

  // Keep the selected name centered in the rail only — never scroll the page.
  useEffect(() => {
    const rail = railRef.current;
    const node = rail?.querySelector<HTMLElement>(`[data-slug="${active}"]`);
    if (!rail || !node) return;
    if (skipRailAlign.current) {
      skipRailAlign.current = false;
      return;
    }
    const left = node.offsetLeft - (rail.clientWidth - node.clientWidth) / 2;
    rail.scrollTo({
      left: Math.max(0, left),
      behavior: reduce ? "auto" : "smooth",
    });
  }, [active, reduce]);

  return (
    <div className="mt-4 lg:hidden">
      {/* Cinematic stage — full-bleed, swipe to rotate the map */}
      <div
        className="relative -mx-5 overflow-hidden border-y border-white/[0.07] sm:-mx-8"
        onTouchStart={(event) => {
          const point = event.touches[0];
          touch.current = { x: point.clientX, y: point.clientY };
        }}
        onTouchEnd={(event) => {
          const start = touch.current;
          touch.current = null;
          const end = event.changedTouches[0];
          if (!start || !end) return;
          const dx = end.clientX - start.x;
          const dy = end.clientY - start.y;
          if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy)) return;
          go(dx < 0 ? 1 : -1);
        }}
      >
        <div className="relative h-[min(78vh,38rem)] w-full">
          <AnimatePresence mode="wait" initial={false}>
            {lead && (
              <motion.div
                key={lead.id}
                className="absolute inset-0"
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                transition={{ duration: reduce ? 0.12 : 0.32, ease: EASE_BRAND }}
              >
                <Image
                  src={lead.imageUrl}
                  alt={lead.alt}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-ink-950/25"
          />

          {/* Map rings — the ecosystem, sized for a portrait stage */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[38%] h-[min(92vw,28rem)] w-[min(92vw,28rem)] -translate-x-1/2 -translate-y-1/2"
          >
            <span className="absolute inset-0 rounded-full border border-white/15" />
            <span className="absolute inset-[14%] rounded-full border border-dashed border-white/10" />
            <span className="absolute inset-[30%] rounded-full border border-white/[0.06]" />
            {data.services.map((item, orbitIndex) => {
              const isActive = item.slug === active;
              const itemAccent = accentClasses[item.accent];
              return (
                <span
                  key={item.slug}
                  className={cn(
                    "absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-200",
                    isActive ? itemAccent.bg : "bg-white/35",
                  )}
                  style={polar(-90 + orbitIndex * 60, 50)}
                />
              );
            })}
          </div>

          {/* Centre lockup */}
          <div className="pointer-events-none absolute inset-x-0 top-[22%] px-6 text-center">
            <p className="font-[family-name:var(--font-display)] text-[clamp(1.7rem,8vw,2.4rem)] font-bold uppercase leading-[0.9] text-fg">
              360° Brand
              <br />
              Execution
            </p>
            <span aria-hidden className="mx-auto mt-4 block h-px w-10 bg-white/25" />
            <p
              aria-live="polite"
              className={cn(
                "mt-4 text-[0.7rem] font-bold uppercase tracking-[0.22em]",
                accent.text,
              )}
            >
              {service.title}
            </p>
            <p className="mt-1.5 text-[0.62rem] uppercase tracking-[0.18em] text-fg-subtle">
              {String(index + 1).padStart(2, "0")} / 06 · {service.projectCount}{" "}
              projects
            </p>
          </div>

          {/* Floating work — tap opens the lightbox */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0.12 : 0.22 }}
            >
              {floats.map((project, floatIndex) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => onOpenProject(floatIndex + 1)}
                  className={cn(
                    "absolute overflow-hidden border border-white/20 bg-ink-950 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)]",
                    MOBILE_FLOATS[floatIndex].className,
                  )}
                >
                  <span className="relative block aspect-[4/5] w-full">
                    <Image
                      src={project.imageUrl}
                      alt={project.alt}
                      fill
                      loading="lazy"
                      sizes="30vw"
                      className="object-cover"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-transparent to-transparent"
                    />
                  </span>
                </button>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Rotate controls */}
          <div className="absolute inset-x-0 bottom-3 flex items-center justify-between px-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous capability"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-ink-950/60 text-fg"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </button>
            <div
              role="tablist"
              aria-label="Choose a capability"
              className="flex items-center gap-2"
            >
              {data.services.map((item) => (
                <button
                  key={item.slug}
                  type="button"
                  role="tab"
                  aria-label={item.title}
                  aria-selected={item.slug === active}
                  onClick={() => onSelect(item.slug)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-200",
                    item.slug === active
                      ? cn("w-6", accent.bg)
                      : "w-2 bg-white/30",
                  )}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next capability"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-ink-950/60 text-fg"
            >
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <p className="mt-3 text-center text-[0.6rem] font-bold uppercase tracking-[0.2em] text-fg-subtle">
        Swipe to rotate the map
      </p>

      {/* Named capability rail */}
      <div
        ref={railRef}
        role="tablist"
        aria-label="Capabilities"
        className="-mx-5 mt-6 flex gap-6 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-8 sm:px-8"
      >
        {data.services.map((item, itemIndex) => {
          const isActive = item.slug === active;
          return (
            <button
              key={item.slug}
              type="button"
              role="tab"
              data-slug={item.slug}
              aria-selected={isActive}
              onClick={() => onSelect(item.slug)}
              className={cn(
                "shrink-0 text-left font-[family-name:var(--font-display)] transition-colors duration-200",
                isActive ? "text-fg" : "text-white/30",
              )}
            >
              <span
                className={cn(
                  "block text-[0.6rem] font-bold tabular-nums tracking-[0.2em]",
                  isActive ? accent.text : "text-white/25",
                )}
              >
                {String(itemIndex + 1).padStart(2, "0")}
              </span>
              <span className="mt-1 block max-w-[10.5rem] text-[1.05rem] font-bold uppercase leading-[1.05]">
                {item.title}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: reduce ? 0.12 : 0.26, ease: EASE_BRAND }}
        >
          <p className="mt-6 max-w-md text-sm leading-relaxed text-fg-muted">
            {service.summary}
          </p>

          {/* Connected sectors as a map spine, not a chip dump */}
          <div className="mt-8">
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-fg-subtle">
              Connected sectors
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4">
              {data.industries.map((industry) => {
                const isConnected = connected.has(industry.name);
                return (
                  <li key={industry.id} className="flex items-center gap-2.5 py-2">
                    <span
                      className={cn(
                        "relative z-10 h-2 w-2 shrink-0 rounded-full",
                        isConnected ? accent.bg : "bg-white/15",
                      )}
                    />
                    <span
                      className={cn(
                        "text-[0.8rem] font-semibold leading-tight",
                        isConnected ? "text-fg" : "text-white/28",
                      )}
                    >
                      {industry.name}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Full-width work — the portfolio stays the hero */}
          <div className="mt-10">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.6rem,7vw,2.2rem)] font-bold uppercase leading-[0.95]">
                {service.title}
              </h2>
              <p className="shrink-0 text-[0.62rem] uppercase tracking-[0.18em] text-fg-subtle">
                Tap to open
              </p>
            </div>
            <ul className="mt-5 space-y-3">
              {projects.map((project, projectIndex) => (
                <li key={project.id}>
                  <button
                    type="button"
                    onClick={() => onOpenProject(projectIndex)}
                    className="group relative block w-full overflow-hidden border border-white/[0.08] text-left"
                  >
                    <span className="relative block aspect-[16/11] w-full">
                      <Image
                        src={project.imageUrl}
                        alt={project.alt}
                        fill
                        loading="lazy"
                        sizes="100vw"
                        className="object-cover"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/35 to-transparent"
                      />
                    </span>
                    <span className="absolute inset-x-0 bottom-0 p-4">
                      <span className="block text-[0.58rem] font-bold uppercase tracking-[0.2em] text-fg-muted">
                        {project.industryName}
                      </span>
                      <span className="mt-1.5 block font-[family-name:var(--font-display)] text-xl font-bold leading-tight text-fg">
                        {project.title}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
