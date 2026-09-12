"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import { useSiteReady } from "@/components/layout/site-ready-provider";
import { ButtonLink } from "@/components/ui/button";
import type { HeroContent } from "@/lib/content/types";
import { EASE_BRAND } from "@/lib/utils/motion";

/** How quickly the canvas forgets — lower leaves longer silk streaks. */
const FADE = 0.022;
const COUNT = 700;
const INFLUENCE = 280;

interface Particle {
  x: number;
  y: number;
  life: number;
  max: number;
}

/** A smooth, slowly turning angle field — no noise library needed. */
function angleAt(x: number, y: number, t: number) {
  return (
    Math.sin(x * 0.0031 + t * 0.13) * 1.7 +
    Math.cos(y * 0.0038 - t * 0.1) * 1.7
  );
}

interface HeroStageProps {
  content: HeroContent;
  /** Short service labels shown in the hero ribbon. */
  capabilities: string[];
}

/**
 * Light Current.
 *
 * Hundreds of motes ride a slowly turning current on a persistent canvas, each
 * leaving a hairline streak that dissolves. The pointer bends the current
 * around itself and lights the motes brand pink, so moving the cursor carves
 * bright channels through the silk. Idle visitors get a slow automatic drift.
 */
export function HeroStage({ content, capabilities }: HeroStageProps) {
  const reduce = useReducedMotion();
  const { isReady } = useSiteReady();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let lastMove = -Infinity;
    const target = { x: 0, y: 0 };
    const focus = { x: 0, y: 0 };
    let particles: Particle[] = [];

    const spawn = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      life: 0,
      max: 120 + Math.random() * 260,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#0a0a0c";
      ctx.fillRect(0, 0, width, height);
      ctx.lineCap = "round";
      particles = Array.from({ length: COUNT }, spawn);
    };

    const step = (t: number, interactive: boolean) => {
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        const angle = angleAt(p.x, p.y, t);
        let vx = Math.cos(angle) * 1.5;
        let vy = Math.sin(angle) * 1.5;

        let e = 0;
        if (interactive) {
          const dx = p.x - focus.x;
          const dy = p.y - focus.y;
          const distance = Math.hypot(dx, dy) || 1;
          if (distance < INFLUENCE) {
            e = (1 - distance / INFLUENCE) ** 2;
            // Swirl around the pointer rather than simply pushing away.
            const push = (e * 3.4) / distance;
            vx += dx * push - dy * push * 0.8;
            vy += dy * push + dx * push * 0.8;
          }
        }

        const px = p.x;
        const py = p.y;
        p.x += vx;
        p.y += vy;
        p.life += 1;

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(p.x, p.y);
        ctx.lineWidth = 0.8 + e * 1.6;
        // Cool white in the calm, brand pink where the pointer stirs it.
        ctx.strokeStyle = `rgba(${Math.round(245 + (254 - 245) * e)},${Math.round(
          245 - (245 - 47) * e,
        )},${Math.round(247 - (247 - 148) * e)},${(0.1 + 0.5 * e).toFixed(3)})`;
        ctx.stroke();

        if (
          p.life > p.max ||
          p.x < -40 ||
          p.x > width + 40 ||
          p.y < -40 ||
          p.y > height + 40
        ) {
          particles[i] = spawn();
        }
      }

      ctx.globalCompositeOperation = "source-over";
    };

    const render = (time: number) => {
      const t = time / 1000;
      if (time - lastMove > 2000) {
        target.x = width / 2 + Math.cos(t * 0.33) * width * 0.32;
        target.y = height / 2 + Math.sin(t * 0.47) * height * 0.28;
      }
      focus.x += (target.x - focus.x) * 0.08;
      focus.y += (target.y - focus.y) * 0.08;

      ctx.fillStyle = `rgba(10,10,12,${FADE})`;
      ctx.fillRect(0, 0, width, height);
      step(t, true);

      frame = requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      target.x = event.clientX - rect.left;
      target.y = event.clientY - rect.top;
      lastMove = performance.now();
    };

    resize();
    focus.x = target.x = width / 2;
    focus.y = target.y = height / 2;

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    if (reduce) {
      // One still frame of the same drawing, with no motion.
      for (let i = 0; i < 140; i += 1) step(0, false);
    } else {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      frame = requestAnimationFrame(render);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(frame);
    };
  }, [reduce]);

  // "Bringing Brands to Life" -> two balanced lines, the last one in pink.
  const words = content.headline.split(" ");
  const breakAt = Math.ceil(words.length / 2);
  const lines = [
    words.slice(0, breakAt).join(" "),
    words.slice(breakAt).join(" "),
  ].filter(Boolean);

  const animate = isReady ? "visible" : "hidden";
  const hasSubheadline = content.subheadline.trim().length > 0;

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      // Sits above the fixed tagline bar (2.25rem) so the ribbon stays clear.
      className="relative flex min-h-[calc(100svh-2.25rem)] flex-col items-center justify-center overflow-hidden px-5 pb-28 pt-36 text-center sm:px-8"
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 -z-30 h-full w-full [mask-image:radial-gradient(125%_105%_at_50%_50%,black_42%,transparent_92%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(38%_32%_at_50%_46%,rgba(10,10,12,0.78),rgba(10,10,12,0.24)_66%,transparent_88%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-48 bg-gradient-to-b from-transparent to-black"
      />

      <h1
        id="hero-heading"
        className="font-display font-semibold leading-[0.94] tracking-[-0.045em] text-fg [text-shadow:0_4px_40px_rgba(10,10,12,0.85)]"
        style={{ fontSize: "clamp(2.6rem, 7.2vw, 6rem)" }}
      >
        <span className="sr-only">{content.headline}</span>
        <span aria-hidden>
          {lines.map((line, index) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                initial="hidden"
                animate={animate}
                variants={{
                  hidden: { y: reduce ? 0 : "110%", opacity: reduce ? 0 : 1 },
                  visible: {
                    y: "0%",
                    opacity: 1,
                    transition: {
                      duration: reduce ? 0.3 : 1,
                      ease: EASE_BRAND,
                      delay: reduce ? 0 : 0.12 + index * 0.11,
                    },
                  },
                }}
              >
                {index === lines.length - 1 ? (
                  <span className="text-gradient-brand">{line}</span>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </span>
      </h1>

      {hasSubheadline ? (
        <motion.p
          initial="hidden"
          animate={animate}
          variants={{
            hidden: { opacity: 0, y: reduce ? 0 : 16 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: EASE_BRAND, delay: 0.5 },
            },
          }}
          className="mt-8 max-w-2xl text-balance text-sm leading-relaxed text-fg-muted sm:text-base"
        >
          {content.subheadline}
        </motion.p>
      ) : null}

      <motion.div
        initial="hidden"
        animate={animate}
        variants={{
          hidden: { opacity: 0, y: reduce ? 0 : 16 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: EASE_BRAND, delay: 0.62 },
          },
        }}
        className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
      >
        <ButtonLink href={content.primaryCta.href} size="lg">
          {content.primaryCta.label}
          <ArrowUpRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink
          href={content.secondaryCta.href}
          size="lg"
          variant="secondary"
        >
          {content.secondaryCta.label}
        </ButtonLink>
      </motion.div>

      {/* Capability ribbon -------------------------------------------------- */}
      <motion.div
        initial="hidden"
        animate={animate}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.8, delay: 0.85 } },
        }}
        className="absolute inset-x-0 bottom-0 border-t border-white/[0.07] bg-black/80 backdrop-blur-sm"
      >
        <div className="container-page flex items-center gap-6 py-4">
          <a
            href="#about"
            aria-label="Scroll to Who We Are"
            className="hidden shrink-0 items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-fg-subtle transition-colors duration-300 hover:text-fg sm:inline-flex"
          >
            <ArrowDown
              className="h-3.5 w-3.5 motion-safe:animate-bounce"
              aria-hidden
            />
            Scroll
          </a>
          <div className="mask-fade-x relative flex-1 overflow-hidden">
            <ul className="flex w-max items-center gap-8 motion-safe:animate-[marquee_38s_linear_infinite]">
              {[...capabilities, ...capabilities].map((label, index) => (
                <li
                  key={`${label}-${index}`}
                  aria-hidden={index >= capabilities.length}
                  className="flex shrink-0 items-center gap-8 whitespace-nowrap text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-fg-subtle"
                >
                  {label}
                  <span
                    aria-hidden
                    className="h-1 w-1 rounded-full bg-brand-pink/70"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
