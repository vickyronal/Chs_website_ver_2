import type { Route } from "./+types/faq";
import { PageStub } from "../components/layout/PageStub";
import { buildMeta } from "../lib/seo";

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: "Frequently Asked Questions",
    description: "Answers to common questions about booking a CHS Tours holiday.",
    path: "/faq",
  });

export default function Faq() {
  return <PageStub title="Frequently Asked Questions" intro="Common questions about packages, payments and travel." phase={5} />;
}
