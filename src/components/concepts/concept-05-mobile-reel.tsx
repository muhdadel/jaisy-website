"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ProjectLightbox } from "@/components/concepts/project-lightbox";
import { AppImage as Image } from "@/components/ui/app-image";
import { useLightbox } from "@/hooks/use-lightbox";
import type { ConceptPageData } from "@/lib/concepts/load";
import { accentClasses } from "@/lib/utils/accents";
import { cn } from "@/lib/utils/cn";

/**
 * CONCEPT 05 — mobile idea B: the Capability Reel.
 * Each capability is a full-screen chapter. You flip vertically, like a
 * physical reel — not a shrunk orbit, and not the swipe-to-rotate stage.
 */
export function Concept05MobileReelPage({ data }: { data: ConceptPageData }) {
  return (
    <div className="bg-ink-950">
      <div className="hidden border-b border-white/[0.07] px-8 py-6 lg:block">
        <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-fg-subtle">
          Concept 05 · mobile idea B
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold uppercase tracking-tight">
          Capability Reel
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-fg-muted">
          A new mobile reading of the map: one capability per screen, swipe up
          for the next. The live site and Concept 05 still use the cinematic
          stage. This page is only a test.
        </p>
      </div>

      <div className="lg:hidden">
        <Concept05MobileReel data={data} />
      </div>

      <div className="hidden flex-col items-center gap-6 px-8 py-12 lg:flex">
        <p className="text-sm text-fg-muted">
          Preview at phone width — or open this URL on your phone.
        </p>
        <div className="relative h-[min(52rem,calc(100dvh-18rem))] w-[24.375rem] overflow-hidden rounded-[2rem] border border-white/15 bg-ink-950 shadow-[0_0_80px_-24px_rgba(26,179,255,0.28)]">
          <Concept05MobileReel data={data} fillParent />
        </div>
      </div>
    </div>
  );
}

function Concept05MobileReel({
  data,
  fillParent = false,
}: {
  data: ConceptPageData;
  fillParent?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewSlug, setViewSlug] = useState(data.services[0]?.slug ?? "");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const pendingOpen = useRef<number | null>(null);

  const active = data.services[activeIndex] ?? data.services[0];
  const accent = accentClasses[active.accent];
  const total = data.services.length;

  const viewProjects = useMemo(
    () => data.projects.filter((project) => project.serviceSlug === viewSlug),
    [data.projects, viewSlug],
  );
  const lightbox = useLightbox(viewProjects.length);

  useEffect(() => {
    if (pendingOpen.current === null) return;
    const index = pendingOpen.current;
    pendingOpen.current = null;
    lightbox.open(index);
  }, [viewSlug, lightbox.open]);

  useEffect(() => {
    const root = scrollerRef.current;
    const nodes = slideRefs.current.filter((node): node is HTMLElement =>
      Boolean(node),
    );
    if (!root || nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const next = Number(
          (visible.target as HTMLElement).dataset.reelIndex,
        );
        if (!Number.isNaN(next)) setActiveIndex(next);
      },
      { root, threshold: 0.55 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [data.services.length]);

  const jumpTo = (index: number) => {
    const scroller = scrollerRef.current;
    const slide = slideRefs.current[index];
    if (!scroller || !slide) return;
    scroller.scrollTo({ top: slide.offsetTop, behavior: "smooth" });
  };

  const openProject = (slug: string, index: number) => {
    if (slug === viewSlug) {
      lightbox.open(index);
      return;
    }
    pendingOpen.current = index;
    setViewSlug(slug);
  };

  return (
    <section
      aria-labelledby="concept-5b-heading"
      className={cn(
        "relative flex flex-col bg-ink-950",
        fillParent ? "h-full" : "h-[calc(100svh-9.75rem)]",
      )}
    >
      <h2 id="concept-5b-heading" className="sr-only">
        Capability Map — mobile reel
      </h2>

      <div className="flex items-center justify-between gap-3 px-5 py-3">
        <p className="font-[family-name:var(--font-display)] text-[0.68rem] font-bold uppercase tracking-[0.2em] text-fg-subtle">
          360° Brand Execution
        </p>
        <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-fg-subtle">
          <span className={accent.text}>
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span className="text-white/25">
            {" "}
            / {String(total).padStart(2, "0")}
          </span>
        </p>
      </div>

      <div
        aria-hidden
        className="mx-5 h-px bg-white/[0.08]"
      >
        <div
          className={cn("h-px transition-all duration-300", accent.bg)}
          style={{ width: `${((activeIndex + 1) / total) * 100}%` }}
        />
      </div>

      <div className="relative min-h-0 flex-1">
        <div
          role="tablist"
          aria-label="Jump to a capability"
          className="absolute right-3 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-2"
        >
          {data.services.map((item, index) => {
            const isActive = index === activeIndex;
            const itemAccent = accentClasses[item.accent];
            return (
              <button
                key={item.slug}
                type="button"
                role="tab"
                aria-label={item.title}
                aria-selected={isActive}
                onClick={() => jumpTo(index)}
                className={cn(
                  "rounded-full transition-all duration-200",
                  isActive
                    ? cn("h-6 w-1.5", itemAccent.bg)
                    : "h-1.5 w-1.5 bg-white/30",
                )}
              />
            );
          })}
        </div>

        <div
          ref={scrollerRef}
          className="h-full snap-y snap-mandatory overflow-y-auto overscroll-y-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {data.services.map((service, index) => {
            const serviceProjects = data.projects.filter(
              (project) => project.serviceSlug === service.slug,
            );
            const lead = serviceProjects[0];
            const serviceAccent = accentClasses[service.accent];
            const next = data.services[index + 1];

            return (
              <article
                key={service.slug}
                ref={(node) => {
                  slideRefs.current[index] = node;
                }}
                data-reel-index={index}
                className="flex h-full snap-start flex-col overflow-hidden"
              >
                <div className="relative min-h-0 flex-1">
                  {lead && (
                    <Image
                      src={lead.imageUrl}
                      alt={lead.alt}
                      fill
                      priority={index === 0}
                      sizes="100vw"
                      className="object-cover"
                    />
                  )}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-ink-950/20"
                  />

                  <div className="absolute inset-x-0 bottom-0 p-5 pr-10">
                    <p
                      className={cn(
                        "font-[family-name:var(--font-display)] text-[0.7rem] font-bold tabular-nums tracking-[0.22em]",
                        serviceAccent.text,
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 max-w-[16rem] font-[family-name:var(--font-display)] text-[clamp(1.8rem,8vw,2.6rem)] font-bold uppercase leading-[0.92]">
                      {service.title}
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-fg-muted">
                      {service.summary}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {service.industryNames.map((name) => (
                        <li
                          key={name}
                          className="border border-white/12 px-2 py-1 text-[0.58rem] font-bold uppercase tracking-[0.14em] text-fg-subtle"
                        >
                          {name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="shrink-0 border-t border-white/[0.07] bg-ink-950 px-5 py-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-[0.58rem] font-bold uppercase tracking-[0.2em] text-fg-subtle">
                      {service.projectCount} projects
                    </p>
                    <p className="text-[0.58rem] uppercase tracking-[0.16em] text-white/25">
                      {next ? `Next · ${next.title}` : "End of reel"}
                    </p>
                  </div>
                  <div
                    className="-mx-5 mt-3 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    role="group"
                    aria-label={`${service.title} projects`}
                  >
                    {serviceProjects.map((project, projectIndex) => (
                      <button
                        key={project.id}
                        type="button"
                        onClick={() => openProject(service.slug, projectIndex)}
                        className="relative w-[38vw] max-w-[9.5rem] shrink-0 overflow-hidden border border-white/10 text-left"
                      >
                        <span className="relative block aspect-[4/5] w-full">
                          <Image
                            src={project.imageUrl}
                            alt={project.alt}
                            fill
                            loading="lazy"
                            sizes="38vw"
                            className="object-cover"
                          />
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-transparent to-transparent"
                          />
                        </span>
                        <span className="absolute inset-x-0 bottom-0 p-2">
                          <span className="block text-[0.68rem] font-semibold leading-tight text-fg">
                            {project.title}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <ProjectLightbox
        projects={viewProjects}
        index={lightbox.index}
        onClose={lightbox.close}
        onPrevious={lightbox.previous}
        onNext={lightbox.next}
      />
    </section>
  );
}
