import type { Route } from "./+types/cancellation-policy";
import { PageStub } from "../components/layout/PageStub";
import { buildMeta } from "../lib/seo";

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: "Cancellation Policy",
    description: "CHS Tours cancellation and refund policy.",
    path: "/cancellation-policy",
  });

export default function CancellationPolicy() {
  return <PageStub title="Cancellation Policy" intro="Policy text to be supplied by CHS." phase={5} />;
}
