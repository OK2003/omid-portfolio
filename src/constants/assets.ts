const GITHUB_PAGES_BASE_PATH =
  process.env.GITHUB_ACTIONS === "true" ? "/omid-portfolio" : "";

export function assetPath(path: string): string {
  return `${GITHUB_PAGES_BASE_PATH}/${path.replace(/^\/+/, "")}`;
}
