export interface ListingItem {
  href: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
}

export function uniqueListingItems<T extends ListingItem>(items: T[]): T[] {
  const byHref = new Map<string, T>();
  for (const item of items) {
    if (!byHref.has(item.href)) byHref.set(item.href, item);
  }
  return [...byHref.values()];
}

export function filterListingItems<T extends ListingItem>(items: T[], query: string, category: string): T[] {
  const keyword = query.trim().toLocaleLowerCase();
  return items.filter((item) =>
    (category === "전체" || item.category === category) &&
    (!keyword || [item.title, item.description, ...item.tags]
      .some((value) => value.toLocaleLowerCase().includes(keyword))),
  );
}

export function firstParam(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) || "";
}

export function normalizeQuery(value: string | string[] | undefined): string {
  return firstParam(value).trim().slice(0, 100);
}

export function normalizeCategory(value: string | string[] | undefined, categories: string[]): string {
  const candidate = firstParam(value);
  return categories.includes(candidate) ? candidate : "전체";
}

export function parseListingPage(value: string | string[] | undefined): number {
  const candidate = firstParam(value);
  if (!/^[1-9]\d*$/.test(candidate)) return 1;
  const page = Number(candidate);
  return Number.isSafeInteger(page) ? page : 1;
}

export function listingHref(query: string, category: string, page: number): string {
  const params = new URLSearchParams();
  if (query.trim()) params.set("q", query.trim());
  if (category !== "전체") params.set("category", category);
  if (page > 1) params.set("page", String(page));
  return `/tests${params.size ? `?${params}` : ""}#tests-list`;
}
