import type { Route } from "./+types/destination-detail";
import { PageStub } from "../components/layout/PageStub";
import { buildMeta } from "../lib/seo";

// Phase 4: the destination will be looked up by slug and show its packages.
export const meta: Route.MetaFunction = ({ params }) =>
  buildMeta({
    title: "Destination",
    description: "Destination guide and holiday packages.",
    path: `/destinations/${params.destinationSlug}`,
  });

export default function DestinationDetail({ params }: Route.ComponentProps) {
  return <PageStub title="Destination Details" intro={`Destination: “${params.destinationSlug}”`} phase={4} />;
}
