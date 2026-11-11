import type { Route } from "./+types/privacy-policy";
import { PageStub } from "../components/layout/PageStub";
import { buildMeta } from "../lib/seo";

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: "Privacy Policy",
    description: "How CHS Tours collects and uses your personal information.",
    path: "/privacy-policy",
  });

export default function PrivacyPolicy() {
  return <PageStub title="Privacy Policy" intro="Policy text to be supplied by CHS." phase={5} />;
}
