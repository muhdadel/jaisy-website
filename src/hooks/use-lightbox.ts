"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Lightbox state + keyboard navigation (Esc to close, arrows to page through).
 */
export function useLightbox(total: number) {
  const [index, setIndex] = useState<number | null>(null);
  const isOpen = index !== null;

  const open = useCallback((next: number) => setIndex(next), []);
  const close = useCallback(() => setIndex(null), []);

  const next = useCallback(() => {
    setIndex((current) =>
      current === null || total === 0 ? current : (current + 1) % total,
    );
  }, [total]);

  const previous = useCallback(() => {
    setIndex((current) =>
      current === null || total === 0
        ? current
        : (current - 1 + total) % total,
    );
  }, [total]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        previous();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close, next, previous]);

  return { index, isOpen, open, close, next, previous };
}
