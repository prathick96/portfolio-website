/** Prefix a public asset path with Vite's base URL so it works under /portfolio-website/. */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${path.replace(/^\//, '')}`;
}
