const DEFAULT_SITE_URL = "https://temon.kr";

export function getSiteUrl() {
  const rawUrl = process.env.NEXT_PUBLIC_APP_URL || DEFAULT_SITE_URL;
  const trimmed = rawUrl.trim().replace(/\/+$/, "");

  return trimmed || DEFAULT_SITE_URL;
}

export function toSiteUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${getSiteUrl()}${normalizedPath}`;
}
