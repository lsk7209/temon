"use client"

import { Card, CardContent } from "@/components/ui/card"

type LandingConversionContent = {
  comparePoints: string[]
  stayReasons: string[]
}

function getLandingConversionContent(quizTitle: string): LandingConversionContent {
  const lowerTitle = quizTitle.toLowerCase()

  if (lowerTitle.includes("drama")) {
    return {
      comparePoints: [
        "This topic reads romance pacing and conflict energy better than a generic personality label.",
        "Visitors usually compare this result with partners, close friends, and favorite character archetypes.",
        "Share value is high because the label is instantly recognizable even to casual drama viewers.",
      ],
      stayReasons: [
        "People stay when the page explains why a fun archetype still maps back to real social behavior.",
        "Completion improves when the next click path leads into adjacent entertainment or relationship quizzes.",
      ],
    }
  }

  if (lowerTitle.includes("idol") || lowerTitle.includes("k-pop")) {
    return {
      comparePoints: [
        "This landing works best when visitors can quickly tell whether they are the leader, mood maker, center, or support role.",
        "Unlike pure fandom trivia, the result is anchored to how you behave inside real group dynamics.",
        "The strongest comparison target is another entertainment quiz with a different framing but similar social-role logic.",
      ],
      stayReasons: [
        "Visitors stay longer when the page makes the role contrast obvious before they start the quiz.",
        "Post-result clicks improve when the landing already frames the quiz as a shareable group comparison tool.",
      ],
    }
  }

  if (lowerTitle.includes("pet")) {
    return {
      comparePoints: [
        "Pet metaphors make emotional style easier to explain than a dry personality label.",
        "This landing converts well when visitors understand that pet ownership is not required to get a useful result.",
        "The best comparison path is into other soft lifestyle topics like food, routine, or comfort-style quizzes.",
      ],
      stayReasons: [
        "Visitors stay when the page reassures them that the result is about attachment and rhythm, not literal animal matching.",
        "Session depth rises when related quizzes continue the same emotional-self-reading pattern.",
      ],
    }
  }

  if (lowerTitle.includes("ramen") || lowerTitle.includes("food")) {
    return {
      comparePoints: [
        "Food-topic traffic starts casual, so the landing must quickly prove the result is still personally recognizable.",
        "Ramen-style choices reveal comfort zone, curiosity, and repeat behavior faster than longer lifestyle quizzes.",
        "The best compare path is into another food or habit quiz while the visitor is still in low-friction mode.",
      ],
      stayReasons: [
        "Visitors stay when the page links taste choices to decision style instead of treating the quiz as pure novelty.",
        "Page depth improves when the result page naturally chains into more food and lifestyle topics.",
      ],
    }
  }

  return {
    comparePoints: [
      "The best landing pages explain how a simple theme maps back to a real pattern quickly.",
      "Visitors convert better when they can compare this quiz with a related one immediately.",
      "The strongest quiz landings remove friction and make the next click obvious.",
    ],
    stayReasons: [
      "People stay when the value of the result is explained before they start.",
      "Related quiz paths usually improve both page views and completion depth.",
    ],
  }
}

export function LandingConversionSection({ quizTitle }: { quizTitle: string }) {
  const content = getLandingConversionContent(quizTitle)

  return (
    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
      <CardContent className="p-8 md:p-12">
        <div className="space-y-8">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">Why This Landing Should Win The Click</h2>
            <p className="text-gray-600 leading-relaxed">
              Strong quiz landings need both an immediate answer and an obvious next action. This section is tuned to keep search visitors reading instead of bouncing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Comparison Angles</h3>
              <div className="space-y-3">
                {content.comparePoints.map((item) => (
                  <div key={item} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                    <p className="text-sm text-gray-600 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Why Visitors Stay</h3>
              <div className="space-y-3">
                {content.stayReasons.map((item) => (
                  <div key={item} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                    <p className="text-sm text-gray-600 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
