"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_BRAND, VIEWPORT_ONCE } from "@/lib/utils/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel distance in px (ignored under reduced motion). */
  y?: number;
  as?: "div" | "section" | "li" | "span" | "article" | "header";
}

/** Scroll-triggered fade + rise. Degrades to a plain fade for reduced motion. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0.3 : 0.7,
        ease: reduce ? "linear" : EASE_BRAND,
        delay: reduce ? 0 : delay,
      },
    },
  };

  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={variants}
    >
      {children}
    </Comp>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: "div" | "ul" | "ol" | "section";
}

/** Parent that staggers any nested <RevealItem> children. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  as = "div",
}: RevealGroupProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as];

  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduce ? 0.02 : stagger,
            delayChildren: reduce ? 0 : delay,
          },
        },
      }}
    >
      {children}
    </Comp>
  );
}

interface RevealItemProps {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: "div" | "li" | "article" | "span";
}

export function RevealItem({
  children,
  className,
  y = 22,
  as = "div",
}: RevealItemProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as];

  return (
    <Comp
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : y },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: reduce ? 0.25 : 0.6,
            ease: reduce ? "linear" : EASE_BRAND,
          },
        },
      }}
    >
      {children}
    </Comp>
  );
}
