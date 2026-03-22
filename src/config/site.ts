/** Production site origin (no trailing slash). Override with VITE_SITE_URL in .env */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL as string | undefined
)?.replace(/\/$/, "") || "https://unknownfacesstudio.lt";

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
