import { useSyncExternalStore } from "react";

/**
 * true/false for a CSS media query, kept in sync as the window changes.
 * Always false during pre-rendering, so the first render matches the built HTML.
 */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
