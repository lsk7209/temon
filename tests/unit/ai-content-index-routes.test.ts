import { beforeEach, describe, expect, it, vi } from "vitest";
import * as llms from "@/app/llms.txt/route";
import * as llmsFull from "@/app/llms-full.txt/route";
import * as aiIndex from "@/app/ai-index.json/route";

const getAiIndexTests = vi.hoisted(() => vi.fn());
vi.mock("@/lib/ai-content-index", () => ({
  getAiIndexTests,
  getAiIndexCategories: (items: { category: string }[]) => [...new Set(items.map((item) => item.category))],
  toAbsoluteUrl: (path: string) => `https://temon.kr${path}`,
}));
vi.mock("@/lib/blog-posts", () => ({ getAllBlogPosts: () => [] }));
vi.mock("@/lib/site-url", () => ({ getSiteUrl: () => "https://temon.kr" }));

const first = { id: "one", title: "첫 테스트", description: "첫 설명", category: "성격", url: "/tests/one" };
const second = { id: "two", title: "운영 DB 테스트", description: "새 설명", category: "관계", url: "/tests/two" };

beforeEach(() => {
  getAiIndexTests.mockReset();
  getAiIndexTests.mockResolvedValueOnce([first]).mockResolvedValueOnce([first, second]);
});

describe.each([
  ["llms.txt", llms],
  ["llms-full.txt", llmsFull],
  ["ai-index.json", aiIndex],
] as const)("%s", (_name, route) => {
  it("renders the current index at request time", async () => {
    expect(route.dynamic).toBe("force-dynamic");
    const initial = await route.GET();
    const updated = await route.GET();
    expect(getAiIndexTests).toHaveBeenCalledTimes(2);
    expect(await initial.text()).not.toContain("운영 DB 테스트");
    expect(await updated.text()).toContain("운영 DB 테스트");
  });
});
