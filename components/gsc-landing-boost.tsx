import Link from "next/link";
import { ContentToc } from "@/components/content-toc";

type GuideItem = {
  title: string;
  description: string;
};

type RelatedLink = {
  href: string;
  label: string;
};

type GscLandingBoostProps = {
  title: string;
  summary: string;
  guides: GuideItem[];
  relatedLinks: RelatedLink[];
  tone?: "orange" | "green" | "indigo" | "red" | "pink" | "blue";
};

const toneClass = {
  orange: "border-orange-100 bg-orange-50/80 text-orange-800",
  green: "border-emerald-100 bg-emerald-50/80 text-emerald-800",
  indigo: "border-indigo-100 bg-indigo-50/80 text-indigo-800",
  red: "border-red-100 bg-red-950/40 text-red-100",
  pink: "border-pink-100 bg-pink-50/80 text-pink-800",
  blue: "border-blue-100 bg-blue-50/80 text-blue-800",
};

export function GscLandingBoost({
  title,
  summary,
  guides,
  relatedLinks,
  tone = "indigo",
}: GscLandingBoostProps) {
  const tocItems = [
    { id: "gsc-search-intent", label: "검색 의도" },
    { id: "gsc-guide", label: "테스트 활용법" },
    { id: "gsc-related", label: "함께 보기" },
  ];

  return (
    <section className="article-content mt-10 text-left">
      <ContentToc items={tocItems} />

      <div
        id="gsc-search-intent"
        className={`scroll-mt-24 rounded-lg border p-6 shadow-sm ${toneClass[tone]}`}
      >
        <h2 className="text-2xl font-black">{title}</h2>
        <p className="mt-3 leading-7">{summary}</p>
      </div>

      <div id="gsc-guide" className="mt-5 grid gap-4 md:grid-cols-3">
        {guides.map((item) => (
          <article
            key={item.title}
            className="rounded-lg border border-slate-200 bg-white p-5 text-slate-800 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            <h3 className="text-lg font-bold">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {item.description}
            </p>
          </article>
        ))}
      </div>

      <div
        id="gsc-related"
        className="mt-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
      >
        <h2 className="text-xl font-black text-slate-950 dark:text-white">
          함께 보면 좋은 테스트
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {relatedLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-bold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
