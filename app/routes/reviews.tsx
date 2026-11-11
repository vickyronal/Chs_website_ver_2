import type { Route } from "./+types/reviews";
import { PageStub } from "../components/layout/PageStub";
import { buildMeta } from "../lib/seo";

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: "Reviews",
    description: "What travellers say about their CHS Tours holidays.",
    path: "/reviews",
  });

export default function Reviews() {
  return <PageStub title="Reviews" intro="Real traveller reviews only — added once supplied by CHS." phase={5} />;
}
