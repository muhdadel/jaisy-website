"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { useId, useState } from "react";
import { useWorkFilter } from "@/components/sections/portfolio/work-filter-context";
import { BrandIcon } from "@/components/ui/brand-icon";
import { CornerBrackets } from "@/components/ui/corner-brackets";
import type { Service } from "@/lib/content/types";
import { accentClasses } from "@/lib/utils/accents";
import { cn } from "@/lib/utils/cn";
import { EASE_BRAND } from "@/lib/utils/motion";

export function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const { setFilter } = useWorkFilter();
  const accent = accentClasses[service.accent];

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-card surface-card p-7 transition-all duration-500 sm:p-8",
        "hover:-translate-y-1.5 hover:border-white/15",
        accent.glow,
      )}
    >
      <CornerBrackets hover size={22} />

      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 -top-28 h-52 bg-gradient-to-b to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          accent.gradient,
        )}
      />

      <div className="relative flex items-start justify-between gap-4">
        <span
          className={cn(
            "inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 transition-transform duration-500 group-hover:scale-110",
            accent.softBg,
            accent.text,
          )}
        >
          <BrandIcon iconKey={service.iconKey} className="h-5 w-5" />
        </span>
        <span className="font-[family-name:var(--font-display)] text-sm font-bold tabular-nums text-white/15 transition-colors duration-500 group-hover:text-white/30">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="relative mt-6 text-xl font-bold leading-tight tracking-tight sm:text-[1.375rem]">
        {service.title}
        <span
          aria-hidden
          className={cn(
            "mt-3 block h-px w-10 origin-left scale-x-100 transition-all duration-500 group-hover:w-20",
            accent.bg,
          )}
        />
      </h3>

      <p className="relative mt-4 text-sm leading-relaxed text-fg-muted">
        {service.summary}
      </p>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="details"
            id={panelId}
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0.2 : 0.45, ease: EASE_BRAND }}
            className="relative overflow-hidden"
          >
            <p className="pt-4 text-sm leading-relaxed text-fg-subtle">
              {service.intro}
            </p>
            <ul className="mt-4 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
              {service.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-center gap-2 text-[0.8125rem] text-fg-muted"
                >
                  <span
                    aria-hidden
                    className={cn("h-1 w-1 shrink-0 rounded-full", accent.bg)}
                  />
                  {bullet}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={panelId}
          className="inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-fg-subtle transition-colors duration-300 hover:text-fg"
        >
          {open ? (
            <Minus className="h-3.5 w-3.5" aria-hidden />
          ) : (
            <Plus className="h-3.5 w-3.5" aria-hidden />
          )}
          {open ? "Less" : "What's included"}
        </button>

        <a
          href="#work"
          onClick={() => setFilter(service.slug)}
          className={cn(
            "group/link inline-flex items-center gap-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-300",
            accent.text,
          )}
        >
          View related work
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            aria-hidden
          />
        </a>
      </div>
    </article>
  );
}
