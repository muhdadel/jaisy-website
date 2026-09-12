/**
 * Prefix a root-relative public asset so it resolves under GitHub Pages
 * (`/jaisy-website/...`). No-op on localhost and on a custom domain.
 */
export function withBasePath(path: string): string {
  if (!path || /^(https?:|data:|blob:)/.test(path)) return path;

  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!base) return path;
  if (path === base || path.startsWith(`${base}/`)) return path;

  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
}
