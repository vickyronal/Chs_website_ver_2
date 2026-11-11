import type { Route } from "./+types/terms";
import { PageStub } from "../components/layout/PageStub";
import { buildMeta } from "../lib/seo";

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: "Terms & Conditions",
    description: "Terms and conditions for CHS Tours bookings.",
    path: "/terms",
  });

export default function Terms() {
  return <PageStub title="Terms & Conditions" intro="Terms text to be supplied by CHS." phase={5} />;
}
