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
 * 점수로부터 레벨 밴드를 반환합니다.
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

  const baseValue = baseValues[level] || 50

  return [
    { key: "파워", value: baseValue, max: 100 },
    { key: "컨트롤", value: baseValue + (level.includes("3") ? 5 : 0), max: 100 },
    { key: "스핀", value: baseValue - (level.includes("1") || level.includes("2") ? 10 : 0), max: 100 },
    { key: "안정성", value: baseValue + (level.includes("4") || level.includes("5") ? 10 : 0), max: 100 },
    { key: "풋워크", value: baseValue - (level.includes("1") ? 15 : 0), max: 100 },
    { key: "멘탈", value: baseValue + (level.includes("4") || level.includes("5") ? 5 : 0), max: 100 },
  ]
}

