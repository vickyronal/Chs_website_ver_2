import type { Route } from "./+types/about";
import { PageStub } from "../components/layout/PageStub";
import { buildMeta } from "../lib/seo";

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: "About CHS Tours",
    description: "About CHS Tours, the team and how we plan your holidays.",
    path: "/about",
  });

export default function About() {
  return <PageStub title="About CHS Tours" intro="The CHS Tours story (content to be supplied by CHS)." phase={5} />;
}
