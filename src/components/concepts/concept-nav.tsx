"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

/** TEMPORARY — switcher for the combined-section concepts. */
const CONCEPTS = [
  { href: "/concept-1", number: "01", label: "Capabilities → Work" },
  { href: "/concept-2", number: "02", label: "Visual Wall" },
  { href: "/concept-3", number: "03", label: "Explore By" },
  { href: "/concept-4", number: "04", label: "Project Archive" },
  { href: "/concept-5", number: "05", label: "Capability Map" },
  { href: "/concept-5b", number: "05b", label: "Map · Reel" },
  { href: "/concept-5c", number: "05c", label: "Map · Atlas" },
  { href: "/concept-5d", number: "05d", label: "Map · Cards" },
  { href: "/concept-5e", number: "05e", label: "Map · List" },
  { href: "/concept-5f", number: "05f", label: "Map · Dock" },
  { href: "/concept-6", number: "06", label: "Original" },
];

export function ConceptNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Concept switcher"
      className="sticky top-[4.5rem] z-40 border-y border-white/[0.07] bg-ink-950/85 backdrop-blur-xl"
    >
      <div className="container-page flex items-center gap-4 py-3">
        <span className="hidden shrink-0 text-[0.6rem] font-bold uppercase tracking-[0.22em] text-fg-subtle lg:inline">
          Concept review
        </span>
        <ul className="-mx-1 flex flex-1 items-center gap-1 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CONCEPTS.map((concept) => {
            const isActive = pathname === concept.href;
            return (
              <li key={concept.href}>
                <Link
                  href={concept.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-3.5 py-2 text-[0.72rem] font-semibold transition-colors duration-200",
                    isActive
                      ? "border-transparent bg-gradient-brand text-ink-950"
                      : "border-white/10 bg-white/[0.03] text-fg-subtle hover:border-white/25 hover:text-fg",
                  )}
                >
                  <span className="tabular-nums opacity-60">
                    {concept.number}
                  </span>
                  {concept.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          href="/"
          className="hidden shrink-0 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-fg-subtle transition-colors duration-200 hover:text-fg sm:inline"
        >
          Live site
        </Link>
      </div>
    </nav>
  );
}
