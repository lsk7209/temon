"use client"

import { JsonLd, createFAQSchema } from "@/components/json-ld"
import { getTopicResultFAQs } from "@/lib/quiz-topic-copy"

interface ResultFaqSchemaProps {
  quizTitle: string
  resultName: string
}

export function ResultFaqSchema({ quizTitle, resultName }: ResultFaqSchemaProps) {
  return <JsonLd id={`${quizTitle}-result-faq`} data={createFAQSchema(getTopicResultFAQs(quizTitle, resultName))} />
}
