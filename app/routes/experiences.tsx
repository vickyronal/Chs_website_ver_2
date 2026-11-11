import type { Route } from "./+types/experiences";
import { PageStub } from "../components/layout/PageStub";
import { buildMeta } from "../lib/seo";

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: "Travel Experiences",
    description: "Find holidays by type: family, honeymoon, group and more.",
    path: "/experiences",
  });

export default function Experiences() {
  return <PageStub title="Travel Experiences" intro="Holidays grouped by the kind of trip you want." phase={4} />;
}
