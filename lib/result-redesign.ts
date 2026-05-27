export interface ResultShareConfig {
  testId: string;
  testPath: string;
  resultType: string;
  resultId?: string;
  title: string;
  description: string;
}

export interface ResultViewModel {
  testId: string;
  testTitle: string;
  testPath: string;
  resultName: string;
  resultCode: string;
  summary: string;
  traits: string[];
  interpretation: string[];
  actionTips: string[];
  compareSignals: string[];
  useCases: string[];
  faqItems: Array<{ question: string; answer: string }>;
  keywords: string[];
  share: ResultShareConfig;
}

export const resultTocItems = [
  { id: "result-summary", label: "결과 요약" },
  { id: "result-traits", label: "핵심 특징" },
  { id: "result-action", label: "활용 가이드" },
  { id: "result-faq", label: "자주 묻는 질문" },
  { id: "result-related", label: "추천 테스트" },
];

export function normalizeTextList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }

  if (typeof value !== "string" || value.trim().length === 0) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
}

export function buildKeywords(items: string[], fallback: string): string[] {
  const words = items
    .flatMap((item) => item.split(/[,\s·/]+/))
    .map((item) => item.replace(/[^\w가-힣]/g, "").trim())
    .filter((item) => item.length >= 2);

  return Array.from(new Set([fallback, ...words])).slice(0, 5);
}

export function buildInterpretation(
  resultName: string,
  traits: string[],
): string[] {
  const first =
    traits[0] || "반복되는 선택 기준이 비교적 선명하게 드러납니다.";
  const second =
    traits[1] || "상황이 달라도 비슷한 판단 흐름을 유지하는 편입니다.";

  return [
    `${resultName} 결과는 단순한 성격 딱지가 아니라 선택 순간에 자주 드러나는 판단 기준을 요약한 프로필입니다.`,
    first,
    second,
    "결과가 완전히 고정된 성향을 뜻하지는 않습니다. 최근 상황과 컨디션에 따라 달라질 수 있으니 참고 지표로 활용해 주세요.",
  ];
}

export function buildCompareSignals(
  resultName: string,
  recommendations: string[] = [],
): string[] {
  const readableRecommendations = recommendations
    .filter((item) => item.trim().length > 0)
    .slice(0, 2)
    .join(", ");

  return [
    `${resultName} 유형은 강점이 분명한 대신 같은 방식을 반복할 때 피로가 쌓일 수 있습니다.`,
    readableRecommendations
      ? `가까운 유형과 비교할 때는 ${readableRecommendations} 유형과의 차이를 함께 보면 더 선명합니다.`
      : "가까운 유형과 비교할 때는 선택 속도, 판단 기준, 사람과 상황 중 무엇을 먼저 보는지가 차이를 만듭니다.",
    "친구와 함께 결과를 비교하면 서로 다른 판단 기준이 더 분명하게 보입니다.",
  ];
}

export function buildResultUseCases(resultName: string): string[] {
  return [
    `${resultName} 결과가 실제 행동과 얼마나 맞는지 최근 선택 장면과 비교해 볼 때 유용합니다.`,
    "친구나 연인과 결과를 공유해 서로 다른 판단 기준을 가볍게 이야기하기 좋습니다.",
    "비슷한 주제의 테스트를 이어서 해보면 같은 패턴이 다른 상황에서도 반복되는지 확인할 수 있습니다.",
  ];
}
