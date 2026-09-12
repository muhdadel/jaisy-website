"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  ProjectLightbox,
  useProjectViewer,
} from "@/components/concepts/project-lightbox";
import type { ConceptProject } from "@/lib/concepts";
import type { ConceptPageData } from "@/lib/concepts/load";
import { cn } from "@/lib/utils/cn";
import { EASE_BRAND } from "@/lib/utils/motion";

type Mode = "service" | "industry";

/**
 * CONCEPT 03 — Explore By.
 * One gallery, two ways in. The visitor decides whether they think in
 * capabilities or in sectors, and the chosen category becomes the headline.
 */
export function Concept03ExploreBy({ data }: { data: ConceptPageData }) {
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<Mode>("service");
  const [serviceKey, setServiceKey] = useState(data.services[0].slug as string);
  const [industryKey, setIndustryKey] = useState(data.industries[0].id);
  const [hovered, setHovered] = useState<string | null>(null);
  const [canHover, setCanHover] = useState(false);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const previewX = useSpring(pointerX, { stiffness: 320, damping: 34, mass: 0.5 });
  const previewY = useSpring(pointerY, { stiffness: 320, damping: 34, mass: 0.5 });

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanHover(query.matches);
    const onChange = (event: MediaQueryListEvent) => setCanHover(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const categories = useMemo(
    () =>
      mode === "service"
        ? data.services.map((service) => ({
            key: service.slug as string,
            label: service.title,
            meta: `${service.projectCount} projects`,
          }))
        : data.industries.map((industry) => ({
            key: industry.id,
            label: industry.name,
            meta: `${industry.projectCount} projects`,
          })),
    [mode, data.services, data.industries],
  );

  const activeKey = mode === "service" ? serviceKey : industryKey;
  const select = (key: string) =>
    mode === "service" ? setServiceKey(key) : setIndustryKey(key);

  const projectsFor = useMemo(() => {
    const map = new Map<string, ConceptProject[]>();
    for (const project of data.projects) {
      const key = mode === "service" ? project.serviceSlug : project.industryId;
      map.set(key, [...(map.get(key) ?? []), project]);
    }
    return map;
  }, [data.projects, mode]);

  const visible = projectsFor.get(activeKey) ?? [];
  const { open, viewerProps } = useProjectViewer(visible, `${mode}-${activeKey}`);

  const activeCategory = categories.find((item) => item.key === activeKey);
  const preview = hovered ? projectsFor.get(hovered)?.[0] : undefined;

  /** Supporting line: the other axis, derived from what is on screen. */
  const crossLabel =
    mode === "service"
      ? data.services.find((service) => service.slug === activeKey)
          ?.industryNames ?? []
      : data.industries.find((industry) => industry.id === activeKey)
          ?.serviceTitles ?? [];

  return (
    <section
      aria-labelledby="concept-3-heading"
      className="relative py-16 sm:py-20 lg:py-28"
      onMouseMove={(event) => {
        pointerX.set(event.clientX + 28);
        pointerY.set(event.clientY - 150);
      }}
    >
      <div className="container-page">
        <h1
          id="concept-3-heading"
          className="max-w-4xl text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[0.92]"
        >
          Explore What We Do.
        </h1>

        {/* Mode switch */}
        <div
          role="tablist"
          aria-label="Choose how to explore"
          className="mt-10 inline-flex rounded-full border border-white/10 bg-white/[0.02] p-1"
        >
          {(["service", "industry"] as Mode[]).map((option) => {
            const isActive = mode === option;
            return (
              <button
                key={option}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setMode(option);
                  setHovered(null);
                }}
                className={cn(
                  "relative rounded-full px-4 py-2.5 text-[0.7rem] font-bold uppercase tracking-[0.16em] transition-colors duration-200 sm:px-6 sm:text-[0.75rem]",
                  isActive ? "text-ink-950" : "text-fg-subtle hover:text-fg",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="concept-3-mode"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-brand"
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 420, damping: 36 }
                    }
                  />
                )}
                Explore by {option}
              </button>
            );
          })}
        </div>

        {/* Category list */}
        <div
          role="tablist"
          aria-label={`Choose a ${mode}`}
          className="-mx-5 mt-9 flex gap-x-7 gap-y-3 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-wrap lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((category) => {
            const isActive = category.key === activeKey;
            return (
              <button
                key={category.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => select(category.key)}
                onMouseEnter={() => setHovered(category.key)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(category.key)}
                onBlur={() => setHovered(null)}
                className={cn(
                  "shrink-0 whitespace-nowrap font-[family-name:var(--font-display)] text-base font-bold uppercase tracking-[0.05em] transition-colors duration-200 sm:text-lg",
                  isActive
                    ? "text-brand-pink"
                    : "text-white/30 hover:text-fg",
                )}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Selected category as the headline for its gallery */}
        <div className="mt-12 border-t border-white/[0.07] pt-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${mode}-${activeKey}`}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: reduce ? 0.12 : 0.28, ease: EASE_BRAND }}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="text-[clamp(2rem,6.5vw,4.5rem)] font-bold uppercase leading-[0.9]">
                  {activeCategory?.label}
                </h2>
                <p className="shrink-0 text-xs uppercase tracking-[0.18em] text-fg-subtle">
                  {activeCategory?.meta}
                </p>
              </div>

              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-fg-muted">
                <span className="text-fg-subtle">
                  {mode === "service" ? "Delivered for " : "Executed through "}
                </span>
                {crossLabel.join(" · ")}
              </p>

              <ul className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-3">
                {visible.map((project, index) => (
                  <li
                    key={project.id}
                    className={cn(
                      index === 0 && "col-span-2 lg:col-span-2 lg:row-span-2",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => open(index)}
                      className="group relative block h-full w-full overflow-hidden border border-white/[0.07] text-left"
                    >
                      <span
                        className={cn(
                          "relative block w-full",
                          index === 0
                            ? "aspect-[16/10] lg:h-full lg:aspect-auto lg:min-h-[26rem]"
                            : "aspect-[4/3]",
                        )}
                      >
                        <Image
                          src={project.imageUrl}
                          alt={project.alt}
                          fill
                          loading={index < 3 ? "eager" : "lazy"}
                          sizes={
                            index === 0
                              ? "(min-width: 1024px) 60vw, 100vw"
                              : "(min-width: 1024px) 30vw, 45vw"
                          }
                          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:scale-[1.04]"
                        />
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-transparent"
                        />
                      </span>
                      <span className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
                        <span className="block text-[0.55rem] font-bold uppercase tracking-[0.2em] text-brand-pink sm:text-[0.6rem]">
                          {mode === "service"
                            ? project.industryName
                            : project.serviceTitle}
                        </span>
                        <span
                          className={cn(
                            "mt-1.5 block font-[family-name:var(--font-display)] font-bold leading-tight text-fg",
                            index === 0
                              ? "text-lg sm:text-3xl"
                              : "text-sm sm:text-lg",
                          )}
                        >
                          {project.title}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Cursor-following preview — pointer devices only */}
      <AnimatePresence>
        {canHover && preview && hovered !== activeKey && (
          <motion.div
            key="concept-3-preview"
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-[60] hidden lg:block"
            style={{ x: previewX, y: previewY }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: reduce ? 0.1 : 0.18, ease: EASE_BRAND }}
          >
            <div className="relative h-64 w-48 overflow-hidden border border-white/12 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
              <Image
                src={preview.imageUrl}
                alt=""
                fill
                sizes="192px"
                className="object-cover"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ProjectLightbox {...viewerProps} />
    </section>
  );
}
