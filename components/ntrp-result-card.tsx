"use client"

import { forwardRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface NTRPResultCardProps {
  level: string
  title: string
  slogan: string
  color: string
  personaTheme?: string
}

export const NTRPResultCard = forwardRef<HTMLDivElement, NTRPResultCardProps>(
  ({ level, title, slogan, color, personaTheme }, ref) => {
    const themeColor = personaTheme || color

    return (
      <div ref={ref} className="w-full max-w-md mx-auto">
        <Card
          className="rounded-2xl shadow-xl border-2 overflow-hidden"
          style={{
            borderColor: themeColor,
            backgroundColor: "white",
          }}
        >
          <div
            className="h-32 flex items-center justify-center"
            style={{ backgroundColor: themeColor }}
          >
            <div className="text-center text-white">
              <div className="text-6xl mb-2">🎾</div>
              <Badge className="text-lg px-4 py-2 bg-white/20 text-white border-white/30">
                NTRP {level}
              </Badge>
            </div>
          </div>
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-2" style={{ color: themeColor }}>
              {title}
            </h2>
            <p className="text-lg text-gray-600 mb-4">{slogan}</p>
            <div className="text-sm text-gray-500">
              테몬 MBTI - NTRP 테스트
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
)

NTRPResultCard.displayName = "NTRPResultCard"

