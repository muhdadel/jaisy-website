"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface SiteReadyValue {
  /** True once the preloader has finished (or was skipped). */
  isReady: boolean;
  markReady: () => void;
}

const SiteReadyContext = createContext<SiteReadyValue>({
  isReady: true,
  markReady: () => {},
});

export function SiteReadyProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const markReady = useCallback(() => setIsReady(true), []);
  const value = useMemo(() => ({ isReady, markReady }), [isReady, markReady]);

  return (
    <SiteReadyContext.Provider value={value}>
      {children}
    </SiteReadyContext.Provider>
  );
}

/**
 * Lets the hero start its entrance the moment the preloader wipes away, so the
 * two read as one continuous motion instead of two disconnected animations.
 */
export function useSiteReady() {
  return useContext(SiteReadyContext);
}
