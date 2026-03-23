import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createRequire } from "node:module";

// `vite-plugin-prerender` has an ESM entry issue in some environments.
// Loading it through CJS keeps the setup stable without changing app architecture.
const require = createRequire(import.meta.url);
const prerender = require("vite-plugin-prerender");

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Build-time static prerender for SPA routes.
    // This emits HTML files for each route listed below.
    prerender({
      // Dist directory used by Vite after `vite build`.
      staticDir: path.join(__dirname, "dist"),
      // English is the default language in `index.html` (`<html lang="en">`),
      // so prerendered HTML is generated in English by default.
      routes: ["/", "/booking", "/faq", "/about", "/location", "/rules", "/privacy"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
