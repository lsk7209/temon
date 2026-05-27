import type React from "react";
import { AlertCircle, CheckCircle2, Compass, Sparkles } from "lucide-react";

interface ResultSummaryCardsProps {
  traits: string[];
  actionTips: string[];
  compareSignals: string[];
}

export function ResultSummaryCards({
  traits,
  actionTips,
  compareSignals,
}: ResultSummaryCardsProps) {
  const visibleTraits = traits.slice(0, 6);

  return (
    <>
      <section
        id="result-traits"
        className="scroll-mt-24 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="mb-5 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-violet-600" aria-hidden="true" />
          <h2 className="text-xl font-bold text-slate-950">핵심 특징</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visibleTraits.map((trait) => (
            <div
              key={trait}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4"
            >
              <CheckCircle2
                className="mb-3 h-5 w-5 text-emerald-600"
                aria-hidden="true"
              />
              <p className="break-keep text-sm leading-7 text-slate-700">
                {trait}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="result-action"
        className="scroll-mt-24 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="mb-5 flex items-center gap-2">
          <Compass className="h-5 w-5 text-blue-600" aria-hidden="true" />
          <h2 className="text-xl font-bold text-slate-950">활용 가이드</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <GuideBlock
            icon={<CheckCircle2 className="h-5 w-5 text-emerald-600" />}
            title="바로 해볼 것"
            items={actionTips}
          />
          <GuideBlock
            icon={<AlertCircle className="h-5 w-5 text-amber-600" />}
            title="비교해서 볼 것"
            items={compareSignals}
          />
        </div>
      </section>
    </>
  );
}

function GuideBlock({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <h3 className="mb-3 flex items-center gap-2 font-bold text-slate-950">
        {icon}
        {title}
      </h3>
      <ul className="space-y-3">
        {items.slice(0, 4).map((item) => (
          <li key={item} className="break-keep text-sm leading-7 text-slate-700">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
