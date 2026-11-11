import type { Route } from "./+types/experience-detail";
import { PageStub } from "../components/layout/PageStub";
import { buildMeta } from "../lib/seo";

// Phase 4: shows packages filtered by this theme (e.g. honeymoon, family).
export const meta: Route.MetaFunction = ({ params }) =>
  buildMeta({
    title: "Travel Experience",
    description: "Holiday packages for this type of trip.",
    path: `/experiences/${params.themeSlug}`,
  });

export default function ExperienceDetail({ params }: Route.ComponentProps) {
  return <PageStub title="Travel Experience" intro={`Theme: “${params.themeSlug}”`} phase={4} />;
}
