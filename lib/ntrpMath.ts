/**
 * NTRP 레벨 계산 유틸리티
 */

export interface NTRPLevel {
  level: string
  title: string
  desc: string
  color: string
}

/**
 * 점수로부터 NTRP 레벨을 계산합니다.
 * @deprecated raw score(총점) 기반 해석은 질문 화면이 보내는 "레벨" 단위와
 * 다르다 (F01). 신규 코드는 `getNTRPLevelInfo(level)`을 사용해야 한다.
 * legacy raw-score URL 호환은 `lib/ntrp-result.ts`의 `parseNtrpResult`가 전담한다.
 */
export function getNTRPLevel(score: number): NTRPLevel {
  if (score >= 71) {
    return {
      level: "5.0+",
      title: "엘리트",
      desc: "프로 수준의 기술과 전략을 구사하는 단계",
      color: "#0a3514",
    }
  } else if (score >= 65) {
    return {
      level: "4.5",
      title: "상위",
      desc: "높은 수준의 기술과 전략을 구사하는 단계",
      color: "#13481d",
    }
  } else if (score >= 55) {
    return {
      level: "4.0",
      title: "상급",
      desc: "다양한 기술과 전략을 구사할 수 있는 단계",
      color: "#1e5c27",
    }
  } else if (score >= 45) {
    return {
      level: "3.5",
      title: "중상",
      desc: "일관성 있는 플레이와 전술적 사고가 가능한 단계",
      color: "#2f6f33",
    }
  } else if (score >= 35) {
    return {
      level: "3.0",
      title: "중하",
      desc: "기본기가 탄탄하고 전술을 이해하기 시작하는 단계",
      color: "#4b8d45",
    }
  } else if (score >= 25) {
    return {
      level: "2.5",
      title: "초급",
      desc: "기본 스트로크가 안정화되기 시작하는 단계",
      color: "#63a250",
    }
  } else {
    return {
      level: "1.5",
      title: "입문",
      desc: "기초 스트로크 습득 단계",
      color: "#7bb661",
    }
  }
}

/**
 * NTRP 레벨 문자열(질문 화면이 실제로 만드는 1.0~5.0, 0.5 단위 + legacy 5.0+)로부터
 * 표시 정보를 직접 반환한다. raw score 재해석을 거치지 않아 F01 버그가 재발하지 않는다.
 * 설명 템플릿이 없는 레벨(1.0, 2.0)은 인접 밴드의 문구를 상속하지 않고 일반 안내를 쓴다.
 */
export function getNTRPLevelInfo(level: string): NTRPLevel {
  const known: Record<string, NTRPLevel> = {
    "1.0": {
      level: "1.0",
      title: "입문",
      desc: "기초 스트로크 습득 단계",
      color: "#8fc46f",
    },
    "1.5": {
      level: "1.5",
      title: "입문",
      desc: "기초 스트로크 습득 단계",
      color: "#7bb661",
    },
    "2.0": {
      level: "2.0",
      title: "초급",
      desc: "기본 스트로크가 안정화되기 시작하는 단계",
      color: "#6cac59",
    },
    "2.5": {
      level: "2.5",
      title: "초급",
      desc: "기본 스트로크가 안정화되기 시작하는 단계",
      color: "#63a250",
    },
    "3.0": {
      level: "3.0",
      title: "중하",
      desc: "기본기가 탄탄하고 전술을 이해하기 시작하는 단계",
      color: "#4b8d45",
    },
    "3.5": {
      level: "3.5",
      title: "중상",
      desc: "일관성 있는 플레이와 전술적 사고가 가능한 단계",
      color: "#2f6f33",
    },
    "4.0": {
      level: "4.0",
      title: "상급",
      desc: "다양한 기술과 전략을 구사할 수 있는 단계",
      color: "#1e5c27",
    },
    "4.5": {
      level: "4.5",
      title: "상위",
      desc: "높은 수준의 기술과 전략을 구사하는 단계",
      color: "#13481d",
    },
    "5.0": {
      level: "5.0",
      title: "상위",
      desc: "높은 수준의 기술과 전략을 구사하는 단계",
      color: "#0f3d18",
    },
    // legacy raw-score 링크 호환용 구분. 자기보고식 설문의 평균 채점 엔진은
    // 5.0을 넘는 값을 검증하지 않으므로, 공식 등급이나 "프로 수준"을 뜻하지 않는다.
    "5.0+": {
      level: "5.0+",
      title: "상위 (legacy)",
      desc: "과거 공유 링크와의 호환을 위한 표시입니다. 현재 설문은 5.0을 초과하는 값을 검증하지 않습니다.",
      color: "#0a3514",
    },
  }
  return known[level] || known["3.0"]
}

/**
 * 레벨 문자열을 참고 프로필용 band key로 정규화한다 (levelBands/drills/kpis 등의 키).
 * 1.0→1.5, 2.0→2.5로 인접 밴드에 매핑해 콘텐츠가 없는 레벨에서도 참고 자료를 보여준다.
 * 표시되는 레벨 숫자 자체는 바꾸지 않고, 콘텐츠 조회 키만 정규화한다.
 */
export function normalizeToBandKey(level: string): string {
  if (level === "1.0") return "1.5"
  if (level === "2.0") return "2.5"
  return level
}

/**
 * 점수로부터 레벨 밴드를 반환합니다.
 * @deprecated raw score 기반. `getNTRPLevelInfo`/`normalizeToBandKey`를 사용하라.
 */
export function mapScoreToLevelBand(score: number): { band: [number, number]; level: string } {
  if (score >= 71) {
    return { band: [71, 75], level: "5.0+" }
  } else if (score >= 65) {
    return { band: [65, 70], level: "4.5" }
  } else if (score >= 55) {
    return { band: [55, 64], level: "4.0" }
  } else if (score >= 45) {
    return { band: [45, 54], level: "3.5" }
  } else if (score >= 35) {
    return { band: [35, 44], level: "3.0" }
  } else if (score >= 25) {
    return { band: [25, 34], level: "2.5" }
  } else {
    return { band: [15, 24], level: "1.5" }
  }
}

/**
 * 레벨로부터 레이더 차트 기본 프로필을 생성합니다.
 *
 * 참고용 템플릿 값이며 응답별 개별 측정값이 아니다 (호출부에서 "개별 능력
 * 측정값이 아닙니다" 고지와 함께 표시해야 한다, T03).
 *
 * 모든 값은 0 <= value <= max, 유한수를 보장한다. 이전 구현은 5.0+ 레벨의
 * "안정성" 항목이 base(95) + delta(10) = 105로 선언된 max(100)를 초과했다 (F04).
 */
export function mapLevelToBaseProfile(level: string): Array<{ key: string; value: number; max: number }> {
  const baseValues: Record<string, number> = {
    "1.5": 20,
    "2.5": 35,
    "3.0": 50,
    "3.5": 65,
    "4.0": 75,
    "4.5": 85,
    "5.0+": 95,
  }

  const MAX = 100
  const baseValue = baseValues[level] ?? 50
  const clamp = (value: number) => Math.min(MAX, Math.max(0, value))

  return [
    { key: "파워", value: clamp(baseValue), max: MAX },
    { key: "컨트롤", value: clamp(baseValue + (level.includes("3") ? 5 : 0)), max: MAX },
    { key: "스핀", value: clamp(baseValue - (level.includes("1") || level.includes("2") ? 10 : 0)), max: MAX },
    { key: "안정성", value: clamp(baseValue + (level.includes("4") || level.includes("5") ? 10 : 0)), max: MAX },
    { key: "풋워크", value: clamp(baseValue - (level.includes("1") ? 15 : 0)), max: MAX },
    { key: "멘탈", value: clamp(baseValue + (level.includes("4") || level.includes("5") ? 5 : 0)), max: MAX },
  ]
}

