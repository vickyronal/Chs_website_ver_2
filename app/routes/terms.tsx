import type { Route } from "./+types/terms";
import { LegalBody } from "../components/sections/InfoSections";
import { PageHero } from "../components/sections/PageHero";
import { getLegalPage } from "../lib/content";
import { buildMeta } from "../lib/seo";

export const meta: Route.MetaFunction = ({ loaderData }) => [
  ...buildMeta({
    title: loaderData?.title ?? "Policy",
    description: "Terms and conditions for CHS Tours quotes, bookings and travel.",
    path: "/terms",
  }),
  // Not indexed until CHS supplies the real policy text
  { name: "robots", content: "noindex" },
];

export async function loader() {
  return getLegalPage("terms");
}

export default function Terms({ loaderData: page }: Route.ComponentProps) {
  return (
    <>
      <PageHero crumbs={[{ label: "Home", to: "/" }, { label: page.title }]} eyebrow="Legal" title={page.title} />
      <LegalBody sections={page.sections} />
    </>
  );
}
