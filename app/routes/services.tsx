import type { Route } from "./+types/services";
import { PageStub } from "../components/layout/PageStub";
import { buildMeta } from "../lib/seo";

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: "Travel Services",
    description: "Travel services offered by CHS Tours.",
    path: "/services",
  });

export default function Services() {
  return <PageStub title="Travel Services" intro="Supporting travel services (to be confirmed by CHS)." phase={5} />;
}
