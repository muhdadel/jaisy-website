"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

const CONCEPTS = [
  { href: "/latest-work-1", number: "01", label: "Floating" },
  { href: "/latest-work-2", number: "02", label: "Orb" },
  { href: "/latest-work-3", number: "03", label: "Drawer" },
];

/** Temporary switcher — remove once a Latest Work direction is chosen. */
export function LatestWorkNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Latest Work concepts"
      className="pointer-events-none fixed inset-x-0 top-[4.75rem] z-[55] flex justify-center px-3 sm:top-[5.25rem]"
    >
      <ul className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/12 bg-ink-950/80 p-1 backdrop-blur-xl">
        {CONCEPTS.map((concept) => {
          const isActive =
            pathname === concept.href || pathname === `${concept.href}/`;
          return (
            <li key={concept.href}>
              <Link
                href={concept.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] transition-colors duration-200",
                  isActive
                    ? "bg-gradient-brand text-ink-950"
                    : "text-fg-subtle hover:text-fg",
                )}
              >
                <span className="tabular-nums opacity-70">{concept.number}</span>
                {concept.label}
              </Link>
            </li>
          );
        })}
        <li>
          <Link
            href="/"
            className="inline-flex rounded-full px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white/40 hover:text-fg"
          >
            Live
          </Link>
        </li>
      </ul>
    </nav>
  );
}
