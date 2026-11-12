import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * false while the pre-rendered HTML is being "hydrated" (taken over by React),
 * true once the page is running in the browser.
 * Use it when the browser knows something the pre-built HTML couldn't
 * (e.g. filters in the URL), so the first render matches the HTML exactly.
 */
export function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
