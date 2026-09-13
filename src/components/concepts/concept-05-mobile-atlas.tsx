"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  ProjectLightbox,
  useProjectViewer,
} from "@/components/concepts/project-lightbox";
import { AppImage as Image } from "@/components/ui/app-image";
import type { ConceptPageData } from "@/lib/concepts/load";
import type { ServiceSlug } from "@/lib/content/types";
import { accentClasses } from "@/lib/utils/accents";
import { cn } from "@/lib/utils/cn";
import { EASE_BRAND } from "@/lib/utils/motion";

/**
 * CONCEPT 05 — mobile idea C: the Pocket Atlas.
 * All six capabilities sit on one folded map. Tap a territory to unfold
 * its dossier. Not a swipe stage, not a vertical reel.
 */
export function Concept05MobileAtlasPage({ data }: { data: ConceptPageData }) {
  return (
    <div className="bg-ink-950">
      <div className="hidden border-b border-white/[0.07] px-8 py-6 lg:block">
        <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-fg-subtle">
          Concept 05 · mobile idea C
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold uppercase tracking-tight">
          Pocket Atlas
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-fg-muted">
          A map you can hold: six territories on one screen, tap one to unfold
          its work. The live site, Concept 05, and the reel are unchanged.
          This page is only a test.
        </p>
      </div>

      <div className="lg:hidden">
        <Concept05MobileAtlas data={data} />
      </div>

      <div className="hidden flex-col items-center gap-6 px-8 py-12 lg:flex">
        <p className="text-sm text-fg-muted">
          Preview at phone width — or open this URL on your phone.
        </p>
        <div className="relative h-[min(52rem,calc(100dvh-18rem))] w-[24.375rem] overflow-hidden rounded-[2rem] border border-white/15 bg-ink-950 shadow-[0_0_80px_-24px_rgba(254,47,148,0.22)]">
          <Concept05MobileAtlas data={data} fillParent />
        </div>
      </div>
    </div>
  );
}

export function Concept05MobileAtlas({
  data,
  fillParent = false,
}: {
  data: ConceptPageData;
  fillParent?: boolean;
}) {
  const reduce = useReducedMotion();
  const [openSlug, setOpenSlug] = useState<ServiceSlug | null>(null);

  const service = data.services.find((item) => item.slug === openSlug);
  const projects = useMemo(
    () =>
      data.projects.filter((project) => project.serviceSlug === openSlug),
    [data.projects, openSlug],
  );
  const { open, viewerProps } = useProjectViewer(projects, openSlug ?? "");

  return (
    <section
      aria-labelledby="concept-5c-heading"
      className={cn(
        "relative flex flex-col bg-ink-950",
        fillParent ? "h-full" : "h-[calc(100svh-5rem)]",
      )}
    >
      <div className="flex items-center justify-between gap-3 px-5 py-3">
        <div>
          <p className="font-[family-name:var(--font-display)] text-[0.68rem] font-bold uppercase tracking-[0.2em] text-fg-subtle">
            Jaisy Atlas
          </p>
          <h2
            id="concept-5c-heading"
            className="mt-1 font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-tight"
          >
            {service ? service.title : "360° Brand Execution"}
          </h2>
        </div>
        {service ? (
          <button
            type="button"
            onClick={() => setOpenSlug(null)}
            className="shrink-0 border border-white/15 px-3 py-1.5 text-[0.58rem] font-bold uppercase tracking-[0.16em] text-fg-subtle"
          >
            Fold map
          </button>
        ) : (
          <p className="text-[0.58rem] font-bold uppercase tracking-[0.16em] text-white/30">
            Pick a territory
          </p>
        )}
      </div>

      <div className="relative min-h-0 flex-1">
        <AnimatePresence mode="wait" initial={false}>
          {service ? (
            <motion.div
              key={service.slug}
              className="absolute inset-0 flex flex-col"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: reduce ? 0.12 : 0.28, ease: EASE_BRAND }}
            >
              <TerritoryLegend
                data={data}
                active={service.slug}
                onSelect={setOpenSlug}
              />
              <TerritoryDossier
                service={service}
                projects={projects}
                onOpenProject={open}
              />
            </motion.div>
          ) : (
            <motion.div
              key="folded"
              className="absolute inset-0"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.99 }}
              transition={{ duration: reduce ? 0.12 : 0.24, ease: EASE_BRAND }}
            >
              <FoldedAtlas data={data} onSelect={setOpenSlug} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ProjectLightbox {...viewerProps} />
    </section>
  );
}

function FoldedAtlas({
  data,
  onSelect,
}: {
  data: ConceptPageData;
  onSelect: (slug: ServiceSlug) => void;
}) {
  return (
    <div className="grid h-full grid-cols-2 grid-rows-3 gap-px bg-white/[0.07]">
      {data.services.map((item, index) => {
        const lead = data.projects.find(
          (project) => project.serviceSlug === item.slug,
        );
        const accent = accentClasses[item.accent];

        return (
          <button
            key={item.slug}
            type="button"
            onClick={() => onSelect(item.slug)}
            className="group relative overflow-hidden bg-ink-900 text-left"
          >
            {lead && (
              <Image
                src={lead.imageUrl}
                alt={lead.alt}
                fill
                priority={index < 2}
                sizes="50vw"
                className="object-cover transition-transform duration-500 group-active:scale-105"
              />
            )}
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-ink-950/10"
            />
            <span className="absolute inset-x-0 bottom-0 p-3">
              <span
                className={cn(
                  "block font-[family-name:var(--font-display)] text-[0.62rem] font-bold tabular-nums tracking-[0.2em]",
                  accent.text,
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mt-1 block font-[family-name:var(--font-display)] text-[0.92rem] font-bold uppercase leading-[0.95]">
                {item.title}
              </span>
              <span className="mt-1.5 block text-[0.58rem] uppercase tracking-[0.14em] text-fg-subtle">
                {item.projectCount} projects
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function TerritoryLegend({
  data,
  active,
  onSelect,
}: {
  data: ConceptPageData;
  active: ServiceSlug;
  onSelect: (slug: ServiceSlug) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Atlas territories"
      className="flex shrink-0 gap-1 overflow-x-auto px-5 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {data.services.map((item, index) => {
        const isActive = item.slug === active;
        const accent = accentClasses[item.accent];
        return (
          <button
            key={item.slug}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={item.title}
            onClick={() => onSelect(item.slug)}
            className={cn(
              "flex h-9 min-w-9 items-center justify-center border px-2.5 text-[0.62rem] font-bold tabular-nums tracking-[0.14em] transition-colors duration-200",
              isActive
                ? cn(accent.bg, "border-transparent text-ink-950")
                : "border-white/12 text-fg-subtle",
            )}
          >
            {String(index + 1).padStart(2, "0")}
          </button>
        );
      })}
    </div>
  );
}

function TerritoryDossier({
  service,
  projects,
  onOpenProject,
}: {
  service: ConceptPageData["services"][number];
  projects: ConceptPageData["projects"];
  onOpenProject: (index: number) => void;
}) {
  const accent = accentClasses[service.accent];
  const lead = projects[0];

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="relative min-h-0 flex-1">
        {lead && (
          <Image
            src={lead.imageUrl}
            alt={lead.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p
            className={cn(
              "text-[0.62rem] font-bold uppercase tracking-[0.18em]",
              accent.text,
            )}
          >
            Territory dossier
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-fg-muted">
            {service.summary}
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
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
        <p className="text-[0.58rem] font-bold uppercase tracking-[0.2em] text-fg-subtle">
          {service.projectCount} projects in this territory
        </p>
        <div
          className="-mx-5 mt-3 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="group"
          aria-label={`${service.title} projects`}
        >
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              onClick={() => onOpenProject(index)}
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
    </div>
  );
}
