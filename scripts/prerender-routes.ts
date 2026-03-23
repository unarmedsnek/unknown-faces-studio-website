import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPageSeo, SEO_PATHS, type SeoPageId } from "../src/data/seo-pages";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");
const sourceIndexPath = path.join(distDir, "index.html");

if (!existsSync(sourceIndexPath)) {
  throw new Error(`Missing build artifact: ${sourceIndexPath}`);
}

const routeByPage = Object.entries(SEO_PATHS) as Array<[Exclude<SeoPageId, "notFound">, string]>;
const indexHtml = readFileSync(sourceIndexPath, "utf8");

function escapeHtmlAttribute(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function injectSeo(html: string, title: string, description: string) {
  const withTitle = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  const withDescription = withTitle.replace(
    /<meta\s+name=["']description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta name="description" content="${escapeHtmlAttribute(description)}" />`,
  );

  if (withDescription === html) {
    throw new Error("Failed to inject SEO tags: title/description placeholders were not found.");
  }

  return withDescription;
}

for (const [pageId, route] of routeByPage) {
  const { title, description } = getPageSeo(pageId, "en");
  const routeHtml = injectSeo(indexHtml, title, description);

  if (route === "/") {
    writeFileSync(sourceIndexPath, routeHtml, "utf8");
    continue;
  }

  const cleanRoute = route.replace(/^\/+|\/+$/g, "");
  const routeDir = path.join(distDir, cleanRoute);
  const routeIndexPath = path.join(routeDir, "index.html");

  mkdirSync(routeDir, { recursive: true });
  writeFileSync(routeIndexPath, routeHtml, "utf8");
}
