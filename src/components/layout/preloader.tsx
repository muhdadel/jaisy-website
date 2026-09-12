"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSiteReady } from "@/components/layout/site-ready-provider";
import { cn } from "@/lib/utils/cn";
import { EASE_BRAND } from "@/lib/utils/motion";

const SESSION_KEY = "jaisy:preloaded";
// Long enough that at least one full jump reads once the client has booted.
const MIN_DURATION_MS = 1600;
const MAX_DURATION_MS = 2600;

/**
 * The lockup, taken apart. `logo-white-letters.png` is the wordmark with its
 * three coloured accents erased, so each accent is re-drawn as a live element
 * that can be animated on its own. The percentages are the measured bounding
 * boxes of the original shapes inside the 3882 x 1544 artwork, so everything
 * lands pixel-perfect on top of the letters.
 */
const ACCENTS = {
  /** Dot of the "j". */
  blue: {
    left: "16.152%",
    top: "0%",
    width: "6.749%",
    height: "14.896%",
    color: "#1ab3ff",
    radius: "0px",
  },
  /** Dot of the "i". */
  yellow: {
    left: "52.910%",
    top: "8.679%",
    width: "7.238%",
    height: "17.940%",
    color: "#ffdd07",
    radius: "999px",
  },
  /** The leading full stop. */
  pink: {
    left: "0%",
    top: "64.508%",
    width: "5.951%",
    height: "16.062%",
    color: "#fe2f94",
    radius: "0px",
  },
} as const;

type AccentKey = keyof typeof ACCENTS;

function Accent({
  accent,
  className,
}: {
  accent: AccentKey;
  className?: string;
}) {
  const a = ACCENTS[accent];
  return (
    <span
      aria-hidden
      className={cn("absolute block", className)}
      style={{
        left: a.left,
        top: a.top,
        width: a.width,
        height: a.height,
        backgroundColor: a.color,
        borderRadius: a.radius,
        transformOrigin: "50% 100%",
      }}
    />
  );
}

/**
 * The dot of the "j" leaves its slot, springs into the air and lands with a
 * proper squash-and-stretch, then a smaller second hop. Everything else in the
 * lockup stays perfectly still, so the eye goes straight to it.
 *
 * The jump is a CSS keyframe (`dot-jump` in globals.css), not a JS animation,
 * so it is already running on the first painted frame rather than waiting for
 * React to hydrate.
 */
function JumpingLockup() {
  return (
    <div className="relative aspect-[1941/772] w-[17rem] max-w-[72vw] select-none sm:w-[21rem]">
      <Image
        src="/brand/logo-white-letters.png"
        alt="Jaisy"
        width={3882}
        height={1544}
        priority
        className="h-full w-full object-contain"
      />
      <Accent accent="pink" />
      <Accent accent="yellow" />
      <Accent accent="blue" className="animate-dot-jump" />
    </div>
  );
}

export function Preloader() {
  const reduce = useReducedMotion();
  const { markReady } = useSiteReady();
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const finished = useRef(false);

  useEffect(() => {
    const finish = () => {
      if (finished.current) return;
      finished.current = true;
      setProgress(100);
      window.setTimeout(() => {
        setVisible(false);
        markReady();
      }, 260);
    };

    // Repeat visits within the same session skip straight through.
    let repeatVisit = false;
    try {
      repeatVisit = window.sessionStorage.getItem(SESSION_KEY) === "1";
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // sessionStorage can be unavailable (private mode / blocked cookies).
    }

    if (repeatVisit || reduce) {
      const quick = window.setTimeout(finish, repeatVisit ? 160 : 420);
      return () => window.clearTimeout(quick);
    }

    const start = performance.now();

    // Real asset progress where the browser exposes it, eased toward 100%.
    const tick = window.setInterval(() => {
      const elapsed = performance.now() - start;
      const timeShare = Math.min(1, elapsed / MAX_DURATION_MS);
      const assets = document.images.length;
      const loaded = assets
        ? Array.from(document.images).filter((img) => img.complete).length /
          assets
        : 1;
      const target = Math.min(0.985, Math.max(timeShare * 0.85, loaded * 0.9));
      setProgress((current) => Math.max(current, Math.round(target * 100)));
    }, 90);

    const settle = () => {
      const elapsed = performance.now() - start;
      const wait = Math.max(0, MIN_DURATION_MS - elapsed);
      window.setTimeout(finish, wait);
    };

    if (document.readyState === "complete") {
      settle();
    } else {
      window.addEventListener("load", settle, { once: true });
    }

    // Hard cap — never block the site indefinitely.
    const cap = window.setTimeout(finish, MAX_DURATION_MS);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(cap);
      window.removeEventListener("load", settle);
    };
  }, [markReady, reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-950"
          initial={{ opacity: 1 }}
          exit={
            reduce
              ? { opacity: 0, transition: { duration: 0.3 } }
              : {
                  opacity: 0,
                  scale: 1.06,
                  clipPath: "inset(0% 0% 100% 0%)",
                  transition: { duration: 0.8, ease: EASE_BRAND },
                }
          }
          aria-hidden={!visible}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05] noise-overlay"
            aria-hidden
          />

          <div className="relative flex flex-col items-center gap-10 px-6">
            <JumpingLockup />

            <div className="flex flex-col items-center gap-3">
              <div className="h-[3px] w-56 max-w-[70vw] overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-brand"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>

              <p className="flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-fg-subtle">
                <span>Loading</span>
                <span className="tabular-nums text-fg">{progress}%</span>
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
