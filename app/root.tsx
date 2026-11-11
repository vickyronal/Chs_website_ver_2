import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse } from "react-router";
import type { ReactNode } from "react";
import type { Route } from "./+types/root";

// Self-hosted fonts (no Google Fonts request → faster + more private)
import "@fontsource-variable/fraunces";
import "@fontsource-variable/manrope";
import "./styles/global.css";

import { PageStub } from "./components/layout/PageStub";

/**
 * Layout = the HTML document shell shared by EVERY page.
 * <Meta/> and <Links/> output each page's title/description/canonical tags.
 * <Outlet/> (in App below) is where the current page renders.
 */
export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1a1a1a" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <Meta />
        <Links />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {/* Header goes here in Phase 3 */}
        <main id="main">{children}</main>
        {/* Footer + sticky WhatsApp bar go here in Phase 3 */}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

/** Shown if something breaks while rendering a page. */
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <PageStub title="Page not found" intro="The page you’re looking for doesn’t exist or has moved." />;
  }

  const details = import.meta.env.DEV && error instanceof Error ? error.message : undefined;
  return <PageStub title="Something went wrong" intro="Please refresh the page or try again shortly." note={details} />;
}
