"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ServiceSlug } from "@/lib/content/types";

export type PortfolioFilter = ServiceSlug | "all";

interface WorkFilterValue {
  filter: PortfolioFilter;
  setFilter: (next: PortfolioFilter) => void;
}

const WorkFilterContext = createContext<WorkFilterValue | null>(null);

/**
 * Shared so a "View related work" link inside a service card can drive the
 * portfolio grid further down the page without prop-drilling through the
 * server-rendered section tree.
 */
export function WorkFilterProvider({ children }: { children: ReactNode }) {
  const [filter, setFilterState] = useState<PortfolioFilter>("all");
  const setFilter = useCallback(
    (next: PortfolioFilter) => setFilterState(next),
    [],
  );
  const value = useMemo(() => ({ filter, setFilter }), [filter, setFilter]);

  return (
    <WorkFilterContext.Provider value={value}>
      {children}
    </WorkFilterContext.Provider>
  );
}

export function useWorkFilter(): WorkFilterValue {
  const context = useContext(WorkFilterContext);
  if (!context) {
    throw new Error("useWorkFilter must be used within a WorkFilterProvider");
  }
  return context;
}
