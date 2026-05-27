"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ListChecks } from "lucide-react";

const MAX_TOC_ITEMS = 8;
type AutoTocItem = {
  index: number;
  label: string;
};

function shouldShowToc(pathname: string | null): boolean {
  if (!pathname?.startsWith("/tests/")) return false;
  if (/^\/tests\/[^/]+\/test(\/|$)/.test(pathname)) return false;
  return true;
}

export default function AutoContentToc() {
  const pathname = usePathname();
  const [items, setItems] = useState<AutoTocItem[]>([]);

  useEffect(() => {
    if (!shouldShowToc(pathname)) {
      setItems([]);
      return;
    }

    const hasManualToc = document.querySelector('[data-content-toc="manual"]');
    if (hasManualToc) {
      setItems([]);
      return;
    }

    const headings = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main h2:not([data-toc-skip])",
      ),
    )
      .filter((heading) => heading.textContent?.trim())
      .slice(0, MAX_TOC_ITEMS);

    const nextItems = headings.map((heading, index) => {
      const label = heading.textContent?.trim() || `섹션 ${index + 1}`;
      return { index, label };
    });

    setItems(nextItems.length >= 2 ? nextItems : []);
  }, [pathname]);

  if (items.length === 0) return null;

  const scrollToHeading = (index: number) => {
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>("main h2:not([data-toc-skip])"),
    );
    headings[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pt-6">
      <nav
        aria-label="목차"
        className="rounded-lg border border-slate-200 bg-white/90 p-4 shadow-sm"
      >
        <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900">
          <ListChecks className="h-4 w-4 text-violet-600" aria-hidden="true" />
          <span>목차</span>
        </div>
        <ol className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
          {items.map((item, index) => (
            <li key={`${item.index}-${item.label}`}>
              <button
                type="button"
                onClick={() => scrollToHeading(item.index)}
                className="flex min-h-9 w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-violet-50 hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                  {index + 1}
                </span>
                <span className="min-w-0 break-keep leading-snug">
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
