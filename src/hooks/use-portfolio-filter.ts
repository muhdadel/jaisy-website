"use client";

import { useMemo } from "react";
import {
  useWorkFilter,
  type PortfolioFilter,
} from "@/components/sections/portfolio/work-filter-context";
import type { PortfolioItem } from "@/lib/content/types";

/**
 * Derives the visible portfolio items and per-category counts from the shared
 * work filter. Kept separate from the markup so it can be unit tested.
 */
export function usePortfolioFilter(items: PortfolioItem[]) {
  const { filter, setFilter } = useWorkFilter();

  const filtered = useMemo(
    () =>
      filter === "all"
        ? items
        : items.filter((item) => item.category === filter),
    [items, filter],
  );

  const counts = useMemo(() => {
    const map = new Map<PortfolioFilter, number>([["all", items.length]]);
    for (const item of items) {
      map.set(item.category, (map.get(item.category) ?? 0) + 1);
    }
    return map;
  }, [items]);

  return { filter, select: setFilter, filtered, counts };
}
