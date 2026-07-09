import Link from "next/link"

interface TestQualitySignalsProps {
  title: string
  category?: string | null
  questionCount?: number | null
  avgMinutes?: number | null
  resultCount?: number | null
}

export function TestQualitySignals({
  title,
  category,
  questionCount,
  avgMinutes,
  resultCount,
}: TestQualitySignalsProps) {
  const safeCategory = category?.trim() || "성격"
  const safeQuestionCount = questionCount || 12
  const safeMinutes = avgMinutes || 3
  const safeResultCount = resultCount || 16

  const reviewPoints = [
    {
      label: "문항 기준",
      value: `${safeQuestionCount}개 문항`,
      description: "한두 문항보다 전체 응답 흐름을 기준으로 결과를 해석합니다.",
    },
    {
      label: "소요 시간",
      value: `약 ${safeMinutes}분`,
      description: "짧은 테스트라도 최근 기분보다 평소 선택에 가깝게 답하는 것이 좋습니다.",
    },
    {
      label: "결과 폭",
      value: `${safeResultCount}개 유형`,
      description: "단일 점수보다 가까운 유형과 다른 유형의 차이를 함께 봅니다.",
    },
  ]

  return (
    <section
      id="test-quality-signals"
      className="mt-10 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="max-w-3xl">
        <p className="text-sm font-semibold text-violet-700">해석 가이드</p>
        <h2 className="mt-2 text-2xl font-bold tracking-normal text-slate-950">
          {title} 결과를 읽기 전에 확인할 기준
        </h2>
        <p className="mt-3 text-base leading-7 text-slate-700">
          {safeCategory} 테스트는 정답을 맞히는 검사가 아니라 선택 패턴을 정리해
          보는 콘텐츠입니다. 결과 화면의 유형명만 보지 말고 문항 수, 응답
          일관성, 가까운 유형과의 차이를 함께 확인하면 해석 품질이 높아집니다.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {reviewPoints.map((point) => (
          <div
            key={point.label}
            className="rounded-lg border border-slate-200 bg-slate-50 p-4"
          >
            <p className="text-sm font-semibold text-slate-600">{point.label}</p>
            <p className="mt-1 text-lg font-bold text-slate-950">{point.value}</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {point.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg bg-violet-50 p-4">
        <h3 className="text-base font-bold text-slate-950">테몬 편집 기준</h3>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
          <li>결과는 자기 이해와 대화 소재로 활용할 수 있도록 구성합니다.</li>
          <li>특정 성격, 직업, 관계 상태를 단정하거나 과장하지 않습니다.</li>
          <li>
            비슷한 주제는{" "}
            <Link
              href="/tests"
              className="font-semibold text-violet-700 underline-offset-4 hover:underline"
            >
              전체 테스트
            </Link>
            에서 비교할 수 있습니다.
          </li>
        </ul>
      </div>
    </section>
  )
}
