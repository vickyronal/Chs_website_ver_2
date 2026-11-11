import type { Route } from "./+types/holidays";
import { PageStub } from "../components/layout/PageStub";
import { buildMeta } from "../lib/seo";

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: "Holiday Packages",
    description: "Browse fixed holiday packages across India and international destinations.",
    path: "/holidays",
  });

export default function Holidays() {
  return <PageStub title="Holiday Packages" intro="All CHS Tours packages, with filters for destination, holiday type and duration." phase={4} />;
}
