"use client"

import { JsonLd, createFAQSchema } from "@/components/json-ld"
import { getDefaultResultFAQs } from "@/lib/quiz-seo-utils"

interface ResultFaqSchemaProps {
  quizTitle: string
  resultName: string
}

export function ResultFaqSchema({ quizTitle, resultName }: ResultFaqSchemaProps) {
  return <JsonLd id={`${quizTitle}-result-faq`} data={createFAQSchema(getDefaultResultFAQs(quizTitle, resultName))} />
}
