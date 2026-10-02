import { describe, it, expect } from "vitest";
import { parseNtrpResult, buildNtrpResultUrl, NTRP_LEVELS } from "@/lib/ntrp-result";

describe("parseNtrpResult", () => {
  it("v2 표준 포맷(v=2&level=X)을 정확히 파싱해야 한다", () => {
    for (const level of NTRP_LEVELS) {
      const params = new URLSearchParams(`v=2&level=${level}`);
      const result = parseNtrpResult(params);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.level).toBe(level);
        expect(result.source).toBe("v2");
      }
    }
  });

  it("legacy level 파라미터(v 파라미터 없음)를 정확히 파싱해야 한다", () => {
    for (const level of NTRP_LEVELS) {
      const params = new URLSearchParams(`level=${level}`);
      const result = parseNtrpResult(params);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.level).toBe(level);
        expect(result.source).toBe("legacy-level");
      }
    }
  });

  it("범위를 벗어나거나 잘못된 level 값은 ok: false를 반환해야 한다", () => {
    const invalidValues = ["0.5", "6.0", "-1.0", "abc", "3.2", ""];
    for (const val of invalidValues) {
      const params = new URLSearchParams(`v=2&level=${val}`);
      const result = parseNtrpResult(params);
      expect(result.ok).toBe(false);
    }
  });

  it("legacy score 파라미터(15~75)를 올바른 NTRP 레벨로 변환해야 한다", () => {
    const testCases: [string, string][] = [
      ["75", "5.0+"],
      ["71", "5.0+"],
      ["65", "4.5"],
      ["55", "4.0"],
      ["45", "3.5"],
      ["35", "3.0"],
      ["25", "2.5"],
      ["15", "1.5"],
    ];

    for (const [score, expectedLevel] of testCases) {
      const params = new URLSearchParams(`score=${score}`);
      const result = parseNtrpResult(params);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.level).toBe(expectedLevel);
        expect(result.source).toBe("legacy-score");
      }
    }
  });

  it("legacy score가 15 미만 또는 75 초과인 경우 ok: false를 반환해야 한다", () => {
    for (const score of ["14", "76", "0", "-5"]) {
      const params = new URLSearchParams(`score=${score}`);
      const result = parseNtrpResult(params);
      expect(result.ok).toBe(false);
    }
  });

  it("v2에 score 파라미터가 혼용되면 conflicting 에러를 반환해야 한다", () => {
    const params = new URLSearchParams("v=2&level=3.5&score=50");
    const result = parseNtrpResult(params);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe("conflicting");
    }
  });
});

describe("buildNtrpResultUrl", () => {
  it("정규화된 v2 표준 NTRP 결과 URL을 생성해야 한다", () => {
    const url = buildNtrpResultUrl("3.5", "https://temon.kr");
    expect(url).toBe("https://temon.kr/results/ntrp-test?v=2&level=3.5");
  });

  it("기본 baseOrigin이 없어도 상대 경로 형태로 안전하게 생성해야 한다", () => {
    const url = buildNtrpResultUrl("4.0");
    expect(url).toContain("/results/ntrp-test?v=2&level=4.0");
  });
});
