/**
 * NTRP 결과 값 계약 (단일 소스).
 *
 * 배경: 질문 화면(app/tests/ntrp-test/test/page.tsx)은 15문항 평균을 0.5 단위로
 * 반올림한 "레벨"(1.0~5.0)을 만든다. 과거 결과 화면은 이 레벨을 총점(15~75)
 * 구간표로 재해석해 항상 최하위 등급(1.5)을 보여주는 버그가 있었다.
 * 이 파일은 신규 v2 링크와 기존에 배포된 legacy 링크(level/score/type)를
 * 문서화된 의미로만 해석하고, 결과 표시·공유·다운로드가 항상 같은 값을
 * 사용하도록 하는 유일한 parser/serializer다.
 *
 * 새 채점 규칙을 도입하지 않는다. 평균-반올림 레벨의 기존 의미를 보존한다.
 */

/** 질문 화면이 실제로 도달 가능한 레벨 집합 (0.5 단위, 1.0~5.0). */
export const NTRP_LEVELS = [
  "1.0",
  "1.5",
  "2.0",
  "2.5",
  "3.0",
  "3.5",
  "4.0",
  "4.5",
  "5.0",
] as const

export type NtrpLevel = (typeof NTRP_LEVELS)[number] | "5.0+"

/** legacy raw-score(총점) 링크에서만 쓰이는 유효 구간. 15~75. */
const LEGACY_RAW_SCORE_MIN = 15
const LEGACY_RAW_SCORE_MAX = 75

/** legacy raw-score → level 매핑에 쓰던 기존 구간표 (app/results 이전 로직과 동일 의미 유지). */
function legacyRawScoreToLevel(score: number): NtrpLevel {
  if (score >= 71) return "5.0+"
  if (score >= 65) return "4.5"
  if (score >= 55) return "4.0"
  if (score >= 45) return "3.5"
  if (score >= 35) return "3.0"
  if (score >= 25) return "2.5"
  return "1.5"
}

function isFiniteNumberString(raw: string): boolean {
  if (raw.trim() === "") return false
  // parseFloat가 "3.5abc"처럼 뒤에 문자가 붙은 값을 부분 허용하지 않도록 전체 문자열을 검사한다.
  return /^-?\d+(\.\d+)?$/.test(raw.trim())
}

function toFiniteNumber(raw: string): number | null {
  if (!isFiniteNumberString(raw)) return null
  const value = Number(raw)
  return Number.isFinite(value) ? value : null
}

function isKnownLevel(value: number): value is number {
  return NTRP_LEVELS.includes(value.toFixed(1) as (typeof NTRP_LEVELS)[number])
}

export type ParsedNtrpResult =
  | { ok: true; level: NtrpLevel; source: "v2" | "legacy-level" | "legacy-score" | "legacy-type" }
  | { ok: false; reason: "missing" | "invalid" | "conflicting" }

/**
 * URLSearchParams에서 NTRP 결과를 해석한다.
 *
 * 지원하는 입력:
 * - v2: `v=2&level=3.5` — 질문 화면이 만든 레벨을 그대로 사용
 * - legacy level: `level=3.5` (v 파라미터 없음) — 기존 질문 producer 값으로 해석
 * - legacy raw score: `level=45` 또는 `score=65` (15~75 범위 정수/소수) — 기존 총점 구간표로 해석
 * - legacy type: `type=4.0` — NTRP 공유 링크에서만 legacy 레벨로 허용
 *
 * `level`이 도달 가능한 레벨 값(1.0~5.0, 0.5 단위)이면 그 자체로 레벨로 해석하고,
 * 그 범위를 벗어나되 15~75 사이이면 legacy raw score로 해석한다. 두 해석이
 * 동시에 상충하는 경우(예: 서로 다른 값의 level과 score가 함께 오는 경우)는 conflicting.
 */
export function parseNtrpResult(params: URLSearchParams): ParsedNtrpResult {
  const vParam = params.get("v")
  const levelParam = params.get("level")
  const scoreParam = params.get("score")
  const typeParam = params.get("type")

  const providedCount = [levelParam, scoreParam, typeParam].filter((value) => value !== null).length
  if (providedCount === 0) {
    return { ok: false, reason: "missing" }
  }

  // v2 계약: level만 허용하고, 그 값은 반드시 도달 가능한 레벨이어야 한다 (raw score 금지).
  if (vParam === "2") {
    if (scoreParam !== null || typeParam !== null) {
      return { ok: false, reason: "conflicting" }
    }
    if (levelParam === null) return { ok: false, reason: "missing" }
    const num = toFiniteNumber(levelParam)
    if (num === null || !isKnownLevel(num)) return { ok: false, reason: "invalid" }
    return { ok: true, level: num.toFixed(1) as NtrpLevel, source: "v2" }
  }

  // 여러 매개변수가 동시에 오고 서로 다른 값을 가리키면 상충으로 처리한다.
  if (providedCount > 1) {
    const resolved = new Set<string>()
    if (levelParam !== null) {
      const num = toFiniteNumber(levelParam)
      if (num !== null) {
        resolved.add(isKnownLevel(num) ? num.toFixed(1) : legacyRawScoreLevelOrInvalid(num))
      }
    }
    if (scoreParam !== null) {
      const num = toFiniteNumber(scoreParam)
      if (num !== null) resolved.add(legacyRawScoreLevelOrInvalid(num))
    }
    if (typeParam !== null) {
      const num = toFiniteNumber(typeParam)
      if (num !== null && isKnownLevel(num)) resolved.add(num.toFixed(1))
    }
    resolved.delete("invalid")
    if (resolved.size > 1) return { ok: false, reason: "conflicting" }
    if (resolved.size === 0) return { ok: false, reason: "invalid" }
    // 단일 값으로 합의되면 아래 개별 분기로 계속 진행 (levelParam 우선순위로 처리).
  }

  // legacy level: 도달 가능한 레벨이면 그대로, 15~75 범위 raw score면 구간표로 해석.
  if (levelParam !== null) {
    const num = toFiniteNumber(levelParam)
    if (num === null) return { ok: false, reason: "invalid" }
    if (isKnownLevel(num)) {
      return { ok: true, level: num.toFixed(1) as NtrpLevel, source: "legacy-level" }
    }
    if (num >= LEGACY_RAW_SCORE_MIN && num <= LEGACY_RAW_SCORE_MAX) {
      return { ok: true, level: legacyRawScoreToLevel(num), source: "legacy-score" }
    }
    return { ok: false, reason: "invalid" }
  }

  // legacy score: 명시적 raw score 파라미터. 15~75 범위만 허용.
  if (scoreParam !== null) {
    const num = toFiniteNumber(scoreParam)
    if (num === null || num < LEGACY_RAW_SCORE_MIN || num > LEGACY_RAW_SCORE_MAX) {
      return { ok: false, reason: "invalid" }
    }
    return { ok: true, level: legacyRawScoreToLevel(num), source: "legacy-score" }
  }

  // legacy type: 공통 공유 링크의 `type`. NTRP에서만 legacy 레벨로 허용.
  if (typeParam !== null) {
    const num = toFiniteNumber(typeParam)
    if (num === null || !isKnownLevel(num)) return { ok: false, reason: "invalid" }
    return { ok: true, level: num.toFixed(1) as NtrpLevel, source: "legacy-type" }
  }

  return { ok: false, reason: "missing" }
}

function legacyRawScoreLevelOrInvalid(num: number): string {
  if (num >= LEGACY_RAW_SCORE_MIN && num <= LEGACY_RAW_SCORE_MAX) {
    return legacyRawScoreToLevel(num)
  }
  return "invalid"
}

/** 검증된 레벨로부터 신규 공유/결과 URL을 만든다 (v2 계약, 불필요한 매개변수 없음). */
export function buildNtrpResultUrl(level: NtrpLevel, origin = ""): string {
  const url = new URL("/results/ntrp-test", origin || "https://temon.kr")
  url.searchParams.set("v", "2")
  url.searchParams.set("level", level)
  if (!origin) return `${url.pathname}?${url.searchParams.toString()}`
  return url.toString()
}
