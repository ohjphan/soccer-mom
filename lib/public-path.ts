export function publicPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!base || base === "/") return path;
  return `${base}${path}`;
}
