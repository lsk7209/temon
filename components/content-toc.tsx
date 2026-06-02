import { ListChecks } from "lucide-react";

export type TocItem = {
  id: string;
  label: string;
};

interface ContentTocProps {
  items: TocItem[];
  title?: string;
  className?: string;
}

export function ContentToc({
  items,
  title = "목차",
  className = "",
}: ContentTocProps) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label={title}
      data-content-toc="manual"
      className={`rounded-lg border border-slate-200 bg-white/90 p-4 shadow-sm ${className}`}
    >
      <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-950">
        <ListChecks className="h-4 w-4 text-violet-600" aria-hidden="true" />
        <span>{title}</span>
      </div>
      <ol className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2 lg:grid-cols-1">
        {items.map((item, index) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="flex min-h-11 items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-violet-50 hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                {index + 1}
              </span>
              <span className="min-w-0 break-keep leading-snug">
                {item.label}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
