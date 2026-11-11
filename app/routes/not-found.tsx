import type { Route } from "./+types/not-found";
import { PageStub } from "../components/layout/PageStub";

export const meta: Route.MetaFunction = () => [
  { title: "Page not found | CHS Tours" },
  { name: "robots", content: "noindex" },
];

/** Catch-all route: any URL not listed in app/routes.ts lands here. */
export default function NotFound() {
  return <PageStub title="Page not found" intro="The page you’re looking for doesn’t exist or has moved." />;
}
