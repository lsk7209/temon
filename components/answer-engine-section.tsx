"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type AnswerContent = {
  summary: string
  bestFor: string
  usefulSignal: string
  nextClicks: string[]
}

function getAnswerContent(quizTitle: string): AnswerContent {
  const lowerTitle = quizTitle.toLowerCase()

  if (lowerTitle.includes("drama")) {
    return {
      summary: `${quizTitle} is best used as a fast role-reading quiz. It works by translating how you handle tension, affection, pacing, and attention into a drama-style archetype that still feels grounded in real behavior.`,
      bestFor: "Visitors comparing themselves with friends, partners, or favorite relationship tropes.",
      usefulSignal: "Conflict style, emotional pacing, and how visible or subtle your social energy feels.",
      nextClicks: ["Compare with a lighter lifestyle quiz", "Share the result to test group chemistry", "Retake with weekday-life answers only"],
    }
  }

  if (lowerTitle.includes("idol") || lowerTitle.includes("k-pop")) {
    return {
      summary: `${quizTitle} works as a group-role decoder. Instead of testing fandom knowledge, it shows whether your natural lane is direction, visibility, atmosphere, momentum, or support.`,
      bestFor: "Visitors who want a quick answer about their role inside teams, chats, and friend groups.",
      usefulSignal: "Leadership preference, emotional tone, spotlight comfort, and group coordination style.",
      nextClicks: ["Compare with drama-style roles", "Use the result page to map real team behavior", "Click into another entertainment quiz while intent is hot"],
    }
  }

  if (lowerTitle.includes("pet")) {
    return {
      summary: `${quizTitle} is a soft self-reading quiz that turns attachment, comfort, stimulation, and recovery style into an animal metaphor. The metaphor keeps the result easy to understand and easy to share.`,
      bestFor: "Visitors who want a warmer personality result without heavy theory or long explanations.",
      usefulSignal: "Home rhythm, sensitivity, closeness needs, and social battery pattern.",
      nextClicks: ["Compare with food or study topics", "Use the result to describe routine needs", "Share with friends for easy contrast"],
    }
  }

  if (lowerTitle.includes("ramen") || lowerTitle.includes("food") || lowerTitle.includes("spice")) {
    return {
      summary: `${quizTitle} uses familiar food choices to surface routine, comfort, curiosity, and decision style. That is why it converts well from casual search traffic into deeper quiz browsing.`,
      bestFor: "Visitors who click for fun first but stay when the result feels recognizably personal.",
      usefulSignal: "Comfort zone, experiment tolerance, repeat behavior, and convenience preference.",
      nextClicks: ["Move into another food-topic quiz", "Compare the result with actual ordering habits", "Use related quizzes to extend session depth"],
    }
  }

  if (lowerTitle.includes("study")) {
    return {
      summary: `${quizTitle} is most useful when treated as a study-method checkpoint. It translates concentration, repetition, planning, and deadline response into a pattern you can actually use.`,
      bestFor: "Visitors trying to improve revision rhythm, note-taking, or exam prep habits.",
      usefulSignal: "Focus style, pressure response, review rhythm, and structure tolerance.",
      nextClicks: ["Apply one habit change from the result page", "Retake after an exam period", "Compare with a morning or phone habit quiz"],
    }
  }

  if (lowerTitle.includes("alarm") || lowerTitle.includes("wake")) {
    return {
      summary: `${quizTitle} works best as a routine-design quiz. It explains the loop behind wake-up friction rather than judging you as simply disciplined or lazy.`,
      bestFor: "Visitors trying to understand why mornings keep drifting or failing despite good intentions.",
      usefulSignal: "Alarm reaction pattern, first-action momentum, recovery speed, and morning system weakness.",
      nextClicks: ["Use the result page as a one-change action plan", "Compare weekday and weekend behavior", "Move into another habit quiz for pattern overlap"],
    }
  }

  return {
    summary: `${quizTitle} is designed to give a fast, low-friction answer that still maps back to a recognizable habit or personality pattern.`,
    bestFor: "Visitors who want a quick result, low effort, and an easy next click into related quizzes.",
    usefulSignal: "Default preference, energy direction, and repeat decision patterns.",
    nextClicks: ["Finish the quiz quickly", "Compare with the result page guidance", "Open a related quiz while intent is active"],
  }
}

export function AnswerEngineSection({ quizTitle }: { quizTitle: string }) {
  const content = getAnswerContent(quizTitle)

  return (
    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
      <CardContent className="p-8 md:p-12">
        <div className="space-y-6">
          <div className="space-y-3">
            <Badge variant="secondary">AI Quick Answer</Badge>
            <h2 className="text-2xl font-bold text-gray-900">What Search Visitors Usually Need First</h2>
            <p className="text-gray-600 leading-relaxed">{content.summary}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Best For</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{content.bestFor}</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Useful Signal</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{content.usefulSignal}</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Next Clicks</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {content.nextClicks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
