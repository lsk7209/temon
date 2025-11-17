/**
 * 퀴즈 색상 스키마 유틸리티
 * 각 퀴즈별 색상 클래스를 정의
 */

import type { QuizColorClasses } from "@/components/quiz/quiz-container"

export const quizColorSchemes: Record<string, QuizColorClasses> = {
  "blue-green": {
    selectedBorder: "border-blue-500",
    selectedBg: "bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950",
    hoverBorder: "hover:border-blue-300 dark:hover:border-blue-600",
    hoverBg: "hover:bg-blue-50/50 dark:hover:bg-blue-950/50",
    focusRing: "focus-visible:ring-blue-500",
    radioSelected: "border-blue-500 bg-blue-500",
    questionNumberBg: "bg-gradient-to-br from-blue-400 to-green-500",
  },
  "blue-purple": {
    selectedBorder: "border-blue-500",
    selectedBg: "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950",
    hoverBorder: "hover:border-blue-300 dark:hover:border-blue-600",
    hoverBg: "hover:bg-blue-50/50 dark:hover:bg-blue-950/50",
    focusRing: "focus-visible:ring-blue-500",
    radioSelected: "border-blue-500 bg-blue-500",
    questionNumberBg: "bg-gradient-to-br from-blue-400 to-purple-500",
  },
  "orange-red": {
    selectedBorder: "border-orange-500",
    selectedBg: "bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950",
    hoverBorder: "hover:border-orange-300 dark:hover:border-orange-600",
    hoverBg: "hover:bg-orange-50/50 dark:hover:bg-orange-950/50",
    focusRing: "focus-visible:ring-orange-500",
    radioSelected: "border-orange-500 bg-orange-500",
    questionNumberBg: "bg-gradient-to-br from-orange-400 to-red-500",
  },
  "yellow-orange": {
    selectedBorder: "border-yellow-500",
    selectedBg: "bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950",
    hoverBorder: "hover:border-yellow-300 dark:hover:border-yellow-600",
    hoverBg: "hover:bg-yellow-50/50 dark:hover:bg-yellow-950/50",
    focusRing: "focus-visible:ring-yellow-500",
    radioSelected: "border-yellow-500 bg-yellow-500",
    questionNumberBg: "bg-gradient-to-br from-yellow-400 to-orange-500",
  },
  "green-emerald": {
    selectedBorder: "border-green-500",
    selectedBg: "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950",
    hoverBorder: "hover:border-green-300 dark:hover:border-green-600",
    hoverBg: "hover:bg-green-50/50 dark:hover:bg-green-950/50",
    focusRing: "focus-visible:ring-green-500",
    radioSelected: "border-green-500 bg-green-500",
    questionNumberBg: "bg-gradient-to-br from-green-400 to-emerald-500",
  },
  "blue-indigo": {
    selectedBorder: "border-blue-500",
    selectedBg: "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950",
    hoverBorder: "hover:border-blue-300 dark:hover:border-blue-600",
    hoverBg: "hover:bg-blue-50/50 dark:hover:bg-blue-950/50",
    focusRing: "focus-visible:ring-blue-500",
    radioSelected: "border-blue-500 bg-blue-500",
    questionNumberBg: "bg-gradient-to-br from-blue-400 to-indigo-500",
  },
  "amber-yellow": {
    selectedBorder: "border-amber-500",
    selectedBg: "bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950 dark:to-yellow-950",
    hoverBorder: "hover:border-amber-300 dark:hover:border-amber-600",
    hoverBg: "hover:bg-amber-50/50 dark:hover:bg-amber-950/50",
    focusRing: "focus-visible:ring-amber-500",
    radioSelected: "border-amber-500 bg-amber-500",
    questionNumberBg: "bg-gradient-to-br from-amber-400 to-yellow-500",
  },
  "blue-cyan": {
    selectedBorder: "border-blue-500",
    selectedBg: "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950",
    hoverBorder: "hover:border-blue-300 dark:hover:border-blue-600",
    hoverBg: "hover:bg-blue-50/50 dark:hover:bg-blue-950/50",
    focusRing: "focus-visible:ring-blue-500",
    radioSelected: "border-blue-500 bg-blue-500",
    questionNumberBg: "bg-gradient-to-br from-blue-400 to-cyan-500",
  },
}

export function getQuizColorScheme(schemeName: string): QuizColorClasses {
  return quizColorSchemes[schemeName] || quizColorSchemes["blue-green"]
}

