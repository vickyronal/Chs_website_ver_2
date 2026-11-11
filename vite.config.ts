import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

// https://vite.dev/config/
// The reactRouter() plugin handles React, routing, code-splitting and prerendering.
export default defineConfig({
  plugins: [reactRouter()],
});
