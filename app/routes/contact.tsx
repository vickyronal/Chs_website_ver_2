import type { Route } from "./+types/contact";
import { PageStub } from "../components/layout/PageStub";
import { buildMeta } from "../lib/seo";

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: "Contact",
    description: "Contact CHS Tours on WhatsApp, by phone or with the enquiry form.",
    path: "/contact",
  });

export default function Contact() {
  return <PageStub title="Contact" intro="WhatsApp, phone and enquiry form." phase={6} />;
}
