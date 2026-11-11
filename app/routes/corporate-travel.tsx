import type { Route } from "./+types/corporate-travel";
import { PageStub } from "../components/layout/PageStub";
import { buildMeta } from "../lib/seo";

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: "Corporate Travel",
    description: "Corporate group tours and business travel planned by CHS Tours.",
    path: "/corporate-travel",
  });

export default function CorporateTravel() {
  return <PageStub title="Corporate Travel" intro="Group tours, offsites and business travel for companies." phase={5} />;
}
