"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ProjectLightbox } from "@/components/concepts/project-lightbox";
import { AppImage as Image } from "@/components/ui/app-image";
import { useLightbox } from "@/hooks/use-lightbox";
import type { ConceptPageData } from "@/lib/concepts/load";
import type { ServiceSlug } from "@/lib/content/types";
import { accentClasses } from "@/lib/utils/accents";
import { cn } from "@/lib/utils/cn";

/**
 * Small-screen Capability Map tests: one thing at a time, fat tap targets,
 * no nested vertical snap fighting the page scroll.
 */

function useServiceLightbox(data: ConceptPageData, slug: ServiceSlug) {
  const projects = useMemo(
    () => data.projects.filter((project) => project.serviceSlug === slug),
    [data.projects, slug],
  );
  const lightbox = useLightbox(projects.length);
  return { projects, lightbox };
}

/** 5d — one full-width card, swipe sideways. Vertical page scroll stays free. */
export function Concept05MobileCards({ data }: { data: ConceptPageData }) {
  const [index, setIndex] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);

  const active = data.services[index] ?? data.services[0];
  const { projects, lightbox } = useServiceLightbox(data, active.slug);
  const accent = accentClasses[active.accent];

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
        const next = Number((visible.target as HTMLElement).dataset.cardIndex);
        if (!Number.isNaN(next)) setIndex(next);
      },
      { root, threshold: 0.6 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [data.services.length]);

  const jumpTo = (next: number) => {
    const scroller = scrollerRef.current;
    const slide = slideRefs.current[next];
    if (!scroller || !slide) return;
    scroller.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col bg-ink-950">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <p className="font-[family-name:var(--font-display)] text-[0.68rem] font-bold uppercase tracking-[0.18em] text-fg-subtle">
          Swipe a card
        </p>
        <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-fg-subtle">
          <span className={accent.text}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-white/25">
            {" "}
            / {String(data.services.length).padStart(2, "0")}
          </span>
        </p>
      </div>

      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {data.services.map((service, serviceIndex) => {
          const serviceProjects = data.projects.filter(
            (project) => project.serviceSlug === service.slug,
          );
          const lead = serviceProjects[0];
          const serviceAccent = accentClasses[service.accent];

          return (
            <article
              key={service.slug}
              ref={(node) => {
                slideRefs.current[serviceIndex] = node;
              }}
              data-card-index={serviceIndex}
              className="flex w-full shrink-0 snap-start flex-col px-4 pb-5"
            >
              <div className="relative aspect-[4/5] max-h-[min(52svh,26rem)] overflow-hidden border border-white/10">
                {lead && (
                  <Image
                    src={lead.imageUrl}
                    alt={lead.alt}
                    fill
                    priority={serviceIndex === 0}
                    sizes="100vw"
                    className="object-cover"
                  />
                )}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent"
                />
                <p
                  className={cn(
                    "absolute left-3 top-3 font-[family-name:var(--font-display)] text-sm font-bold tabular-nums tracking-[0.18em]",
                    serviceAccent.text,
                  )}
                >
                  {String(serviceIndex + 1).padStart(2, "0")}
                </p>
              </div>

              <h3 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.55rem,7.5vw,2.15rem)] font-bold uppercase leading-[0.95]">
                {service.title}
              </h3>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-fg-muted">
                {service.summary}
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {service.industryNames.map((name) => (
                  <li
                    key={name}
                    className="border border-white/12 px-2.5 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-fg-subtle"
                  >
                    {name}
                  </li>
                ))}
              </ul>

              <div className="mt-4 grid grid-cols-2 gap-2">
                {serviceProjects.slice(0, 2).map((project, projectIndex) => (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => {
                      if (service.slug !== active.slug) return;
                      lightbox.open(projectIndex);
                    }}
                    className="relative min-h-20 overflow-hidden border border-white/10 text-left"
                  >
                    <span className="relative block aspect-[4/3] w-full">
                      <Image
                        src={project.imageUrl}
                        alt={project.alt}
                        fill
                        loading="lazy"
                        sizes="50vw"
                        className="object-cover"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-transparent to-transparent"
                      />
                    </span>
                    <span className="absolute inset-x-0 bottom-0 p-2 text-[0.72rem] font-semibold leading-tight text-fg">
                      {project.title}
                    </span>
                  </button>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-2 px-4 pb-5">
        {data.services.map((item, itemIndex) => (
          <button
            key={item.slug}
            type="button"
            aria-label={item.title}
            aria-current={itemIndex === index}
            onClick={() => jumpTo(itemIndex)}
            className={cn(
              "h-2.5 min-w-2.5 rounded-full transition-all duration-200",
              itemIndex === index
                ? cn("w-6", accent.bg)
                : "bg-white/25",
            )}
          />
        ))}
      </div>

      <ProjectLightbox
        projects={projects}
        index={lightbox.index}
        onClose={lightbox.close}
        onPrevious={lightbox.previous}
        onNext={lightbox.next}
      />
    </div>
  );
}

/** 5e — fat rows you can read at 320px. Tap one line to open its work. */
export function Concept05MobileList({ data }: { data: ConceptPageData }) {
  const [openSlug, setOpenSlug] = useState<ServiceSlug | null>(
    data.services[0]?.slug ?? null,
  );
  const active = data.services.find((item) => item.slug === openSlug);
  const { projects, lightbox } = useServiceLightbox(
    data,
    active?.slug ?? data.services[0].slug,
  );

  return (
    <div className="bg-ink-950 px-4 py-5">
      <p className="font-[family-name:var(--font-display)] text-[0.68rem] font-bold uppercase tracking-[0.18em] text-fg-subtle">
        360° · tap a line
      </p>
      <h3 className="mt-2 font-[family-name:var(--font-display)] text-[1.7rem] font-bold uppercase leading-[0.95]">
        Six capabilities
      </h3>

      <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
        {data.services.map((service, index) => {
          const isOpen = service.slug === openSlug;
          const accent = accentClasses[service.accent];
          const serviceProjects = data.projects.filter(
            (project) => project.serviceSlug === service.slug,
          );
          const lead = serviceProjects[0];

          return (
            <li key={service.slug}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() =>
                  setOpenSlug(isOpen ? null : service.slug)
                }
                className="flex min-h-14 w-full items-center gap-3 py-3 text-left"
              >
                <span
                  className={cn(
                    "w-8 shrink-0 font-[family-name:var(--font-display)] text-sm font-bold tabular-nums",
                    isOpen ? accent.text : "text-white/35",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "min-w-0 flex-1 font-[family-name:var(--font-display)] text-[1.05rem] font-bold uppercase leading-tight",
                    isOpen ? "text-fg" : "text-fg-muted",
                  )}
                >
                  {service.title}
                </span>
                <span className="shrink-0 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-white/30">
                  {service.projectCount}
                </span>
              </button>

              {isOpen && (
                <div className="pb-4">
                  {lead && (
                    <div className="relative aspect-[16/10] overflow-hidden border border-white/10">
                      <Image
                        src={lead.imageUrl}
                        alt={lead.alt}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-fg-muted">
                    {service.summary}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {service.industryNames.map((name) => (
                      <li
                        key={name}
                        className="border border-white/12 px-2.5 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-fg-subtle"
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {serviceProjects.map((project, projectIndex) => (
                      <button
                        key={project.id}
                        type="button"
                        onClick={() => lightbox.open(projectIndex)}
                        className="relative overflow-hidden border border-white/10 text-left"
                      >
                        <span className="relative block aspect-[4/3] w-full">
                          <Image
                            src={project.imageUrl}
                            alt={project.alt}
                            fill
                            loading="lazy"
                            sizes="50vw"
                            className="object-cover"
                          />
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-transparent to-transparent"
                          />
                        </span>
                        <span className="absolute inset-x-0 bottom-0 p-2 text-[0.72rem] font-semibold leading-tight text-fg">
                          {project.title}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <ProjectLightbox
        projects={projects}
        index={lightbox.index}
        onClose={lightbox.close}
        onPrevious={lightbox.previous}
        onNext={lightbox.next}
      />
    </div>
  );
}

/** 5f — one hero, six fat keys in the thumb zone. Nothing is smaller than a thumb. */
export function Concept05MobileDock({ data }: { data: ConceptPageData }) {
  const [slug, setSlug] = useState<ServiceSlug>(data.services[0].slug);
  const service = data.services.find((item) => item.slug === slug)!;
  const { projects, lightbox } = useServiceLightbox(data, slug);
  const accent = accentClasses[service.accent];
  const lead = projects[0];

  return (
    <div className="flex flex-col bg-ink-950">
      <div className="relative aspect-[4/5] max-h-[min(48svh,24rem)]">
        {lead && (
          <Image
            src={lead.imageUrl}
            alt={lead.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-ink-950/15"
        />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p
            className={cn(
              "font-[family-name:var(--font-display)] text-[0.68rem] font-bold uppercase tracking-[0.18em]",
              accent.text,
            )}
          >
            {String(data.services.findIndex((item) => item.slug === slug) + 1).padStart(2, "0")}{" "}
            / {String(data.services.length).padStart(2, "0")}
          </p>
          <h3 className="mt-2 max-w-[16rem] font-[family-name:var(--font-display)] text-[clamp(1.6rem,8vw,2.2rem)] font-bold uppercase leading-[0.92]">
            {service.title}
          </h3>
          <p className="mt-2 max-w-sm text-[0.9rem] leading-relaxed text-fg-muted">
            {service.summary}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-px bg-white/10">
        {data.services.map((item, index) => {
          const isActive = item.slug === slug;
          const itemAccent = accentClasses[item.accent];
          return (
            <button
              key={item.slug}
              type="button"
              onClick={() => setSlug(item.slug)}
              className={cn(
                "flex min-h-[3.5rem] items-center gap-2.5 bg-ink-950 px-3 py-2.5 text-left",
                isActive && "bg-white/[0.06]",
              )}
            >
              <span
                className={cn(
                  "font-[family-name:var(--font-display)] text-sm font-bold tabular-nums",
                  isActive ? itemAccent.text : "text-white/30",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "min-w-0 font-[family-name:var(--font-display)] text-[0.82rem] font-bold uppercase leading-[1.05]",
                  isActive ? "text-fg" : "text-fg-subtle",
                )}
              >
                {item.title}
              </span>
            </button>
          );
        })}
      </div>

      <div className="px-4 py-4">
        <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-fg-subtle">
          {service.projectCount} projects · tap a still
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {projects.slice(0, 4).map((project, projectIndex) => (
            <button
              key={project.id}
              type="button"
              onClick={() => lightbox.open(projectIndex)}
              className="relative min-h-16 overflow-hidden border border-white/10 text-left"
            >
              <span className="relative block aspect-[4/3] w-full">
                <Image
                  src={project.imageUrl}
                  alt={project.alt}
                  fill
                  loading="lazy"
                  sizes="50vw"
                  className="object-cover"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-transparent to-transparent"
                />
              </span>
              <span className="absolute inset-x-0 bottom-0 p-2 text-[0.72rem] font-semibold leading-tight text-fg">
                {project.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      <ProjectLightbox
        projects={projects}
        index={lightbox.index}
        onClose={lightbox.close}
        onPrevious={lightbox.previous}
        onNext={lightbox.next}
      />
    </div>
  );
}
