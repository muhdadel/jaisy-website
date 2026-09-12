"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { CornerBrackets } from "@/components/ui/corner-brackets";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section";
import type { CtaBandContent } from "@/lib/content/types";

const FADE = 0.022;
const COUNT = 500;
const INFLUENCE = 280;

interface Particle {
  x: number;
  y: number;
  life: number;
  max: number;
}

function angleAt(x: number, y: number, t: number) {
  return (
    Math.sin(x * 0.0031 + t * 0.13) * 1.7 +
    Math.cos(y * 0.0038 - t * 0.1) * 1.7
  );
}

export function CtaSection({ content }: { content: CtaBandContent }) {
  const reduce = useReducedMotion();
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
      ctx.fillStyle = "#000000";
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
      ctx.fillStyle = `rgba(0,0,0,${FADE})`;
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

  return (
    <section
      id="start"
      aria-labelledby="cta-heading"
      className="relative isolate overflow-hidden py-24 sm:py-32"
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 -z-10 h-full w-full [mask-image:radial-gradient(125%_105%_at_50%_50%,black_42%,transparent_92%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(38%_32%_at_50%_46%,rgba(0,0,0,0.6),rgba(0,0,0,0.15)_66%,transparent_88%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-pink/60 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-pink/50 to-transparent"
      />

      <CornerBrackets size={48} color="border-brand-pink/50" />

      <div className="container-page relative flex flex-col items-center text-center">
        <Reveal>
          <Eyebrow>{content.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={0.08}>
          <h2
            id="cta-heading"
            className="mt-6 max-w-4xl text-[clamp(2.3rem,7vw,5rem)] font-bold leading-[0.95]"
          >
            {content.heading}
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
            {content.body}
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="mt-10">
            <ButtonLink href={content.buttonHref} size="lg">
              {content.buttonLabel}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
