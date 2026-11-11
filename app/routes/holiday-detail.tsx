import type { Route } from "./+types/holiday-detail";
import { PageStub } from "../components/layout/PageStub";
import { buildMeta } from "../lib/seo";

// Phase 4: the package will be looked up by slug from app/content, and an
// unknown slug will show the 404 page. Title/description will come from the package data.
export const meta: Route.MetaFunction = ({ params }) =>
  buildMeta({
    title: "Holiday Package",
    description: "Holiday package details, itinerary, inclusions and enquiry.",
    path: `/holidays/${params.packageSlug}`,
  });

export default function HolidayDetail({ params }: Route.ComponentProps) {
  return <PageStub title="Package Details" intro={`Package: “${params.packageSlug}”`} phase={4} />;
}
