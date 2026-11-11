import type { Route } from "./+types/thank-you";
import { PageStub } from "../components/layout/PageStub";
import { buildMeta } from "../lib/seo";

// Only reached after the server CONFIRMS an enquiry was saved (Phase 6).
// Hidden from search engines.
export const meta: Route.MetaFunction = () => [
  ...buildMeta({
    title: "Thank you",
    description: "Your enquiry has been received.",
    path: "/thank-you",
  }),
  { name: "robots", content: "noindex" },
];

export default function ThankYou() {
  return <PageStub title="Thank you" intro="Confirmation page — wired up with the enquiry form." phase={6} />;
}
