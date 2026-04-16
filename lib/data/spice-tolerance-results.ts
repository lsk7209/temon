import type { MbtiResultRecord } from "@/components/quiz/mbti-result-page"

const MBTI_TYPES = [
  "ISTJ",
  "ISFJ",
  "INFJ",
  "INTJ",
  "ISTP",
  "ISFP",
  "INFP",
  "INTP",
  "ESTP",
  "ESFP",
  "ENFP",
  "ENTP",
  "ESTJ",
  "ESFJ",
  "ENFJ",
  "ENTJ",
] as const

function buildSpiceToleranceResult(mbti: string): MbtiResultRecord {
  const [energy, style, decision, habit] = mbti.split("")

  return {
    mbti,
    name: `${energy === "E" ? "Bold" : "Measured"} ${style === "S" ? "Heat" : "Adventure"} ${decision === "T" ? "Planner" : "Chaser"} ${habit === "J" ? "Keeper" : "Mixer"}`,
    summary: "Your spice tolerance is less about pure heat and more about how you approach risk, flavor, and recovery.",
    traits: [
      energy === "E" ? "Treats spicy food as a shareable challenge." : "Focuses on their own pace and threshold.",
      style === "S" ? "Prefers stable spice levels they can trust." : "Enjoys unusual pepper profiles and new menus.",
      decision === "T" ? "Separates heat from flavor quality." : "Likes the emotional rush that spice creates.",
      habit === "J" ? "Keeps a controlled heat routine." : "Adjusts intensity based on mood and curiosity.",
    ],
    presets: {
      orderStyle: [
        style === "S" ? "Returns to proven menus." : "Explores rotating challenge menus.",
        decision === "T" ? "Judges the dish by flavor architecture." : "Judges the dish by excitement and payoff.",
      ],
      recovery: [
        habit === "J" ? "Has a fixed cooldown sequence ready." : "Improvises sides and drinks on the fly.",
      ],
      sharing: [
        energy === "E" ? "Turns spicy food into a group event." : "Prefers a smaller, quieter tasting rhythm.",
      ],
    },
    pitfalls: [
      style === "N" ? "Can chase novelty harder than quality." : "Can underrate creative menus too quickly.",
      habit === "P" ? "May overshoot tolerance by following the moment." : "May get stuck in a narrow comfort zone.",
    ],
    recommend: [
      decision === "T" ? "Best with places that balance heat and depth." : "Best with places that make spice feel memorable.",
      energy === "E" ? "Works well with challenge-driven dining." : "Works well with focused tasting and repeat visits.",
    ],
  }
}

export const SPICE_TOLERANCE_RESULTS: Record<string, MbtiResultRecord> = Object.fromEntries(
  MBTI_TYPES.map((mbti) => [mbti, buildSpiceToleranceResult(mbti)])
)
