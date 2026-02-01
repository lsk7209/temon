
import { db } from "@/lib/db/client"
import { questions, tests } from "@/lib/db/schema"
import { eq, or, asc } from "drizzle-orm"
import { notFound } from "next/navigation"
import ClientRunner from "./client-runner"

// Fetch test and questions
// Fetch test and questions
async function getQuizData(slugOrId: string) {
    console.log(`[QuizDebug] Fetching quiz data for: ${slugOrId}`)

    // 1. Get Test ID first (if slug provided)
    // Use proper type assertion or ensure schema match. 
    // Using db.query to match working Intro page pattern
    const test = await db.query.tests.findFirst({
        where: or(eq(tests.slug, slugOrId), eq(tests.id, slugOrId))
    })

    console.log(`[QuizDebug] Test found:`, test ? `${test.title} (${test.id})` : "NO TEST FOUND")

    if (!test) return null

    // 2. Get Questions
    const questionsList = await db.select()
        .from(questions)
        .where(eq(questions.testId, test.id))
        .orderBy(asc(questions.questionOrder))
        .all()

    console.log(`[QuizDebug] Questions found: ${questionsList.length} for test ${test.id}`)

    return { test, questions: questionsList }
}

export default async function QuizPage({ params }: { params: { testId: string } }) {
    console.log(`[QuizDebug] Page params:`, params)
    const data = await getQuizData(params.testId)

    if (!data || data.questions.length === 0) {
        console.log(`[QuizDebug] 404 Triggered. Data: ${!!data}, Questions: ${data?.questions?.length}`)
        notFound()
    }

    // Simplify questions for client
    const clientQuestions = data.questions.map(q => {
        const mapped = {
            id: q.id,
            questionOrder: q.questionOrder,
            questionText: q.questionText,
            choice1Text: q.choice1Text,
            choice2Text: q.choice2Text
        }
        // console.log(`[QuizDebug] Mapped Q${mapped.questionOrder}:`, mapped)
        return mapped
    })

    console.log(`[QuizDebug] First Question Data:`, JSON.stringify(clientQuestions[0], null, 2))

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="flex-1 flex flex-col justify-center">
                <ClientRunner testId={data.test.id} questions={clientQuestions} />
                {/* Debug output removed */}
            </div>
        </div>
    )
}
