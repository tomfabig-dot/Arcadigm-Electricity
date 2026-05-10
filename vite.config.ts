import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

const SITE_URL = "https://arcadigm.com.au";

type SitemapRoute = {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
};

// Single source of truth for the sitemap.
// When you publish a new public route, add it here. Auth-only routes
// (/portal, /sign-in, /sign-up) are intentionally excluded.
const sitemapRoutes: SitemapRoute[] = [
  { path: "/",             changefreq: "weekly",  priority: 1.0 },
  { path: "/why-us",       changefreq: "monthly", priority: 0.9 },
  { path: "/process",      changefreq: "monthly", priority: 0.8 },
  { path: "/track-record", changefreq: "monthly", priority: 0.8 },
  { path: "/about",        changefreq: "monthly", priority: 0.6 },
  { path: "/contact",      changefreq: "yearly",  priority: 0.6 },
];

function sitemapPlugin(): Plugin {
  return {
    name: "arcadigm-sitemap",
    apply: "build",
    generateBundle() {
      const today = new Date().toISOString().split("T")[0];
      const body = sitemapRoutes
        .map((r) => {
          const cf = r.changefreq ? `\n    <changefreq>${r.changefreq}</changefreq>` : "";
          const pr = r.priority != null ? `\n    <priority>${r.priority.toFixed(1)}</priority>` : "";
          return `  <url>\n    <loc>${SITE_URL}${r.path}</loc>\n    <lastmod>${today}</lastmod>${cf}${pr}\n  </url>`;
        })
        .join("\n");
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), sitemapPlugin()],
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          charts: ["recharts"],
          icons: ["lucide-react"],
        },
      },
    },
  },
});
