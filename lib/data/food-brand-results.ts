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

const energyLabels = {
  E: { name: "Social", trait: "Talks through choices with people around them." },
  I: { name: "Solo", trait: "Prefers a quiet comparison pass before deciding." },
}

const styleLabels = {
  S: { name: "Classic", trait: "Trusts familiar flavors and proven brands." },
  N: { name: "Discovery", trait: "Likes testing new menus and unexpected releases." },
}

const decisionLabels = {
  T: { name: "Value", trait: "Compares price, quality, and consistency first." },
  F: { name: "Story", trait: "Cares about mood, memory, and brand identity." },
}

const habitLabels = {
  J: { name: "Loyalist", trait: "Returns to favorite brands with a stable routine." },
  P: { name: "Floater", trait: "Switches brands freely depending on the moment." },
}

function buildFoodBrandResult(mbti: string): MbtiResultRecord {
  const [energy, style, decision, habit] = mbti.split("") as [
    keyof typeof energyLabels,
    keyof typeof styleLabels,
    keyof typeof decisionLabels,
    keyof typeof habitLabels,
  ]

  return {
    mbti,
    name: `${energyLabels[energy].name} ${styleLabels[style].name} ${decisionLabels[decision].name} ${habitLabels[habit].name}`,
    summary: "Your food brand preference follows a repeatable pattern across taste, mood, and buying habit.",
    traits: [
      energyLabels[energy].trait,
      styleLabels[style].trait,
      decisionLabels[decision].trait,
      habitLabels[habit].trait,
    ],
    presets: {
      favoriteMenu: [
        style === "S" ? "Keeps a shortlist of safe best-sellers." : "Rotates seasonal and limited-time menus.",
        decision === "T" ? "Checks value before adding extras." : "Adds items that feel memorable or fun.",
      ],
      shoppingStyle: [
        energy === "E" ? "Shares recommendations quickly." : "Builds a personal ranking quietly.",
        habit === "J" ? "Uses the same ordering path each time." : "Adapts to coupons, mood, and timing.",
      ],
      loyalty: [
        habit === "J" ? "High loyalty when quality stays stable." : "Loyal only while the brand stays interesting.",
      ],
    },
    pitfalls: [
      decision === "F" ? "Can overvalue brand image over actual repeat satisfaction." : "Can dismiss good brands too quickly if the first order feels average.",
      habit === "J" ? "May miss better options by repeating the same order." : "May never settle on a reliable favorite.",
    ],
    recommend: [
      energy === "E" ? "Best with brands that reward sharing and group orders." : "Best with brands that make reordering simple and predictable.",
      style === "N" ? "Needs a menu pipeline that keeps novelty alive." : "Needs consistency more than hype.",
    ],
  }
}

export const FOOD_BRAND_RESULTS: Record<string, MbtiResultRecord> = Object.fromEntries(
  MBTI_TYPES.map((mbti) => [mbti, buildFoodBrandResult(mbti)])
)
