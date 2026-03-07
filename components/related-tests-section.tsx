"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getRelatedTests } from "@/lib/related-tests"

interface RelatedTestsSectionProps {
  testId: string
  title?: string
}

export function RelatedTestsSection({
  testId,
  title = "Related Quizzes You May Also Like",
}: RelatedTestsSectionProps) {
  const relatedTests = getRelatedTests(testId)

  if (relatedTests.length === 0) {
    return null
  }

  return (
    <Card className="border-0 shadow-xl bg-white/90 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {relatedTests.map((test) => (
          <div key={test.id} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-3">
              <div className={`inline-flex rounded-full bg-gradient-to-r ${test.color} px-3 py-1 text-xs font-semibold text-white`}>
                {test.category}
              </div>
            </div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">{test.title}</h3>
            <p className="mb-4 text-sm leading-relaxed text-gray-600">{test.description}</p>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href={test.href}>View quiz</Link>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
