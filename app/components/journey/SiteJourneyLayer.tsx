import { SiteJourney } from "./SiteJourney";
import { useJourneyMode } from "./useJourneyMode";

/** Mounted once in the root layout: the desktop route (or nothing on other devices). */
export function SiteJourneyLayer() {
  const mode = useJourneyMode();
  return <SiteJourney mode={mode} />;
}
