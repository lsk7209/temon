
import { getDb } from "@/lib/db/client"
import { questions, tests } from "@/lib/db/schema"
import { eq, or, asc } from "drizzle-orm"
import { notFound } from "next/navigation"
import ClientRunner from "./client-runner"

export const dynamic = 'force-dynamic'

// Fetch test and questions
// Fetch test and questions
async function getQuizData(slugOrId: string) {
    const db = getDb()

    // 1. Get Test ID first (if slug provided)
    // Use proper type assertion or ensure schema match. 
    // Using db.query to match working Intro page pattern
    const test = await db.query.tests.findFirst({
        where: or(eq(tests.slug, slugOrId), eq(tests.id, slugOrId))
    })

    if (!test) return null

    // 2. Get Questions
    // 2. Get Questions
    const questionsList = await db.select()
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

    // Simplify questions for client
    const clientQuestions = data.questions.map(q => {
        const mapped = {
            id: q.id,
            questionOrder: q.questionOrder,
            questionText: q.questionText,
            choice1Text: q.choice1Text,
            choice2Text: q.choice2Text,
            choice1Tags: q.choice1Tags,
            choice2Tags: q.choice2Tags
        }
        // console.log(`[QuizDebug] Mapped Q${mapped.questionOrder}:`, mapped)
        return mapped
    })

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="flex-1 flex flex-col justify-center">
                <ClientRunner apiTestId={data.test.id} routeTestId={params.testId} questions={clientQuestions} />
            </div>
        </div>
    )
}
