import { getDb } from "@/lib/db/client"
import { questions, tests } from "@/lib/db/schema"
import { eq, or, asc } from "drizzle-orm"
import { notFound } from "next/navigation"
import ClientRunner from "./client-runner"

export const dynamic = "force-dynamic"

async function getQuizData(slugOrId: string) {
  const db = getDb()

  const test = await db.query.tests.findFirst({
    where: or(eq(tests.slug, slugOrId), eq(tests.id, slugOrId)),
  })

  if (!test) return null

  const questionsList = await db
    .select()
    .from(questions)
    .where(eq(questions.testId, test.id))
    .orderBy(asc(questions.questionOrder))
    .all()

  return { test, questions: questionsList }
}

export default async function QuizPage({ params }: { params: { testId: string } }) {
  const data = await getQuizData(params.testId)

  if (!data || data.questions.length === 0) {
    notFound()
  }

  const clientQuestions = data.questions.map((q) => ({
    id: q.id,
    questionOrder: q.questionOrder,
    questionText: q.questionText,
    choice1Text: q.choice1Text,
    choice2Text: q.choice2Text,
    choice1Tags: q.choice1Tags,
    choice2Tags: q.choice2Tags,
  }))

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex flex-col justify-center">
        <ClientRunner testId={data.test.id} questions={clientQuestions} />
      </div>
    </div>
  )
}
