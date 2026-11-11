import type { Route } from "./+types/destinations";
import { PageStub } from "../components/layout/PageStub";
import { buildMeta } from "../lib/seo";

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: "Destinations",
    description: "Explore holiday destinations in India and around the world.",
    path: "/destinations",
  });

export default function Destinations() {
  return <PageStub title="Destinations" intro="India and international destinations, grouped by region." phase={4} />;
}
