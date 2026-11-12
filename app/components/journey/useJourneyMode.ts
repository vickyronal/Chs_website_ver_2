import { useReducedMotion } from "motion/react";
import { useHydrated } from "../../lib/useHydrated";
import { useMediaQuery } from "../../lib/useMediaQuery";

export type JourneyMode = "route" | "static" | "bar" | null;

/** Decides which journey experience this device gets. null until hydrated. */
export function useJourneyMode(): JourneyMode {
  const hydrated = useHydrated();
  const wide = useMediaQuery("(min-width: 1024px) and (pointer: fine)");
  const reduce = useReducedMotion();
  if (!hydrated) return null;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  const lowPower = (navigator.hardwareConcurrency ?? 8) <= 2 || nav.connection?.saveData === true;
  if (!wide || lowPower) return reduce ? null : "bar";
  return reduce ? "static" : "route";
}

