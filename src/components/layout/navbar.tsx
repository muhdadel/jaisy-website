"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Logo } from "@/components/layout/logo";
import { ButtonLink } from "@/components/ui/button";
import { useActiveSection } from "@/hooks/use-active-section";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import { useScrolled } from "@/hooks/use-scrolled";
import type { NavItem } from "@/lib/content/types";
import { cn } from "@/lib/utils/cn";
import { EASE_BRAND } from "@/lib/utils/motion";

interface NavbarProps {
  items: NavItem[];
  ctaLabel: string;
  ctaHref?: string;
}

export function Navbar({ items, ctaLabel, ctaHref = "#contact" }: NavbarProps) {
  const reduce = useReducedMotion();
  const scrolled = useScrolled(48);
  const [menuOpen, setMenuOpen] = useState(false);

  const sectionIds = useMemo(() => items.map((item) => item.sectionId), [items]);
  const active = useActiveSection(sectionIds);

  useLockBodyScroll(menuOpen);

  const close = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, close]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled
            ? "border-b border-white/10 bg-ink-950/80 backdrop-blur-xl shadow-[0_10px_40px_-24px_rgba(0,0,0,0.9)]"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "container-page flex items-center justify-between transition-all duration-500",
            scrolled ? "h-16" : "h-20 lg:h-24",
          )}
        >
          <Logo
            withTagline={false}
            markClassName={cn(
              "w-auto transition-all duration-500",
              scrolled ? "h-7" : "h-8 lg:h-9",
            )}
          />

          <ul className="hidden items-center gap-1 lg:flex">
            {items.map((item) => {
              const isActive = active === item.sectionId;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "group relative inline-flex items-center rounded-full px-4 py-2 text-[0.8125rem] font-medium transition-colors duration-300",
                      isActive ? "text-fg" : "text-fg-subtle hover:text-fg",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-4 bottom-1 h-px origin-left bg-brand-pink transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ButtonLink
              href={ctaHref}
              size="sm"
              className="hidden sm:inline-flex"
            >
              {ctaLabel}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </ButtonLink>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-fg transition-colors duration-300 hover:border-brand-pink/60 hover:bg-white/[0.08] lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[60] flex flex-col bg-ink-950/97 backdrop-blur-2xl lg:hidden"
            initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: reduce ? 0.2 : 0.55, ease: EASE_BRAND }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-pink/25 blur-[100px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand-blue/20 blur-[100px]"
            />

            <div className="container-page flex h-20 items-center justify-between">
              <Logo withTagline={false} href={null} />
              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                autoFocus
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-fg transition-colors duration-300 hover:border-brand-pink/60"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <nav
              aria-label="Mobile"
              className="container-page relative flex flex-1 flex-col justify-center"
            >
              <ul className="flex flex-col gap-1">
                {items.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: reduce ? 0 : 0.12 + index * 0.06,
                      duration: 0.5,
                      ease: EASE_BRAND,
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={close}
                      className="group flex items-baseline justify-between border-b border-white/[0.07] py-4"
                    >
                      <span className="font-[family-name:var(--font-display)] text-[2rem] font-bold leading-none tracking-tight text-fg transition-colors duration-300 group-hover:text-brand-pink">
                        {item.label}
                      </span>
                      <span className="text-[0.65rem] font-semibold tracking-[0.2em] text-fg-subtle">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-10">
                <ButtonLink
                  href={ctaHref}
                  size="lg"
                  className="w-full"
                  onClick={close}
                >
                  {ctaLabel}
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </ButtonLink>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
