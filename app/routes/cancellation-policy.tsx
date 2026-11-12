import type { Route } from "./+types/cancellation-policy";
import { LegalBody } from "../components/sections/InfoSections";
import { PageHero } from "../components/sections/PageHero";
import { getLegalPage } from "../lib/content";
import { buildMeta } from "../lib/seo";

export const meta: Route.MetaFunction = ({ loaderData }) => [
  ...buildMeta({
    title: loaderData?.title ?? "Policy",
    description: "How cancellations, changes and refunds work for CHS Tours bookings.",
    path: "/cancellation-policy",
  }),
  // Not indexed until CHS supplies the real policy text
  { name: "robots", content: "noindex" },
];

export async function loader() {
  return getLegalPage("cancellation-policy");
}

export default function CancellationPolicy({ loaderData: page }: Route.ComponentProps) {
  return (
    <>
      <PageHero crumbs={[{ label: "Home", to: "/" }, { label: page.title }]} eyebrow="Legal" title={page.title} />
      <LegalBody sections={page.sections} />
    </>
  );
}
