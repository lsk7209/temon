import { describe, it, expect } from "vitest";
import {
  getNTRPLevelInfo,
  normalizeToBandKey,
  mapLevelToBaseProfile,
} from "@/lib/ntrpMath";

describe("getNTRPLevelInfo", () => {
  it("유효한 레벨에 대해 올바른 메타데이터를 반환해야 한다", () => {
    const levels = ["1.0", "1.5", "2.0", "2.5", "3.0", "3.5", "4.0", "4.5", "5.0", "5.0+"];
    for (const lvl of levels) {
      const info = getNTRPLevelInfo(lvl);
      expect(info.level).toBe(lvl);
      expect(info.title).toBeTruthy();
      expect(info.desc).toBeTruthy();
      expect(info.color).toMatch(/^#[0-9a-fA-F]{6}$/);
    }
  });

  it("미등록 레벨 요청 시 기본값(3.0)을 반환해야 한다", () => {
    const fallback = getNTRPLevelInfo("99.9");
    expect(fallback.level).toBe("3.0");
  });
});

describe("normalizeToBandKey", () => {
  it("1.0은 1.5로, 2.0은 2.5로 매핑하고 나머지는 그대로 유지해야 한다", () => {
    expect(normalizeToBandKey("1.0")).toBe("1.5");
    expect(normalizeToBandKey("2.0")).toBe("2.5");
    expect(normalizeToBandKey("3.0")).toBe("3.0");
    expect(normalizeToBandKey("3.5")).toBe("3.5");
    expect(normalizeToBandKey("4.0")).toBe("4.0");
  });
});

describe("mapLevelToBaseProfile", () => {
  const levels = ["1.5", "2.5", "3.0", "3.5", "4.0", "4.5", "5.0+"];

  it("모든 항목의 값이 0 이상 100(MAX) 이하를 만족해야 한다 (F04 invariant)", () => {
    for (const lvl of levels) {
      const profile = mapLevelToBaseProfile(lvl);
      expect(profile).toHaveLength(6);
      for (const item of profile) {
        expect(item.max).toBe(100);
        expect(item.value).toBeGreaterThanOrEqual(0);
        expect(item.value).toBeLessThanOrEqual(100);
        expect(Number.isFinite(item.value)).toBe(true);
      }
    }
  });

  it("5.0+ 레벨의 안정성 항목도 max(100)를 초과하지 않아야 한다 (clamp 검증)", () => {
    const profile = mapLevelToBaseProfile("5.0+");
    const stability = profile.find((p) => p.key === "안정성");
    expect(stability).toBeDefined();
    expect(stability!.value).toBe(100); // 95 + 10 clamped to 100
  });

  it("레이더 항목 6개 키(파워, 컨트롤, 스핀, 안정성, 풋워크, 멘탈)가 포함되어야 한다", () => {
    const profile = mapLevelToBaseProfile("3.0");
    const keys = profile.map((p) => p.key);
    expect(keys).toEqual(["파워", "컨트롤", "스핀", "안정성", "풋워크", "멘탈"]);
  });
});
