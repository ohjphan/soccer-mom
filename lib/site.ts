const origin = (process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://jessica.is").replace(/\/$/, "");
const base = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

export const SITE_ORIGIN = origin;

export function absoluteUrl(path: string): string {
  if (path === "/") return `${origin}${base}/`;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${base}${clean}`;
}
