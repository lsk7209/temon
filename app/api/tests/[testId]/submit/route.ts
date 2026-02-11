
import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db/client'
import { tests, questions, resultTypes, testResults } from '@/lib/db/schema'
import { eq, sql } from 'drizzle-orm'
import { nanoid } from 'nanoid'

export const dynamic = 'force-dynamic'

export async function POST(
    req: Request,
    { params }: { params: { testId: string } }
) {
    try {
        const body = await req.json()
        const { answers } = body // { questionId: "choice1" | "choice2" }

        // 1. Fetch all questions for this test to calculate scores
        const db = getDb()
        const allQuestions = await db.select()
            .from(questions)
            .where(eq(questions.testId, params.testId))
            .all()

        // 2. Calculate MBTI Scores
        const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }

        allQuestions.forEach(q => {
            const answer = answers[q.id] // 0 (choice1) or 1 (choice2)

            let tags: string[] = []
            if (answer === 0) {
                try { tags = JSON.parse(q.choice1Tags) } catch (e) { }
            } else if (answer === 1) {
                try { tags = JSON.parse(q.choice2Tags) } catch (e) { }
            }

            tags.forEach(t => {
                if (scores[t as keyof typeof scores] !== undefined) {
                    scores[t as keyof typeof scores]++
                }
            })
        })

        // 3. Determine Type
        const mbti = [
            scores.E >= scores.I ? 'E' : 'I',
            scores.S >= scores.N ? 'S' : 'N',
            scores.T >= scores.F ? 'T' : 'F',
            scores.J >= scores.P ? 'J' : 'P'
        ].join('') // e.g., "ENFP"

        // 4. Find Result ID
        const resultType = await db.select()
            .from(resultTypes)
            .where(sql`${resultTypes.testId} = ${params.testId} AND ${resultTypes.typeCode} = ${mbti}`)
            .limit(1)
            .get()

        // If exact match missing (e.g. 4-type test), fallback logic needed.
        // For now, assuming 16-type generation. If missing, maybe random or default?
        let finalResultId = resultType?.id

        if (!finalResultId) {
            // Fallback: Pick first result
            const firstResult = await db.select().from(resultTypes).where(eq(resultTypes.testId, params.testId)).limit(1).get()
            finalResultId = firstResult?.id
        }

        if (!finalResultId) {
            return NextResponse.json({ error: 'Result calculation failed' }, { status: 500 })
        }

        // 5. Save Result (Analytics)
        const newResultId = nanoid()
        await db.insert(testResults).values({
            id: newResultId,
            testId: params.testId,
            resultType: mbti,
            answers: JSON.stringify(answers),
            userIp: 'anonymous', // Privacy
            userAgent: req.headers.get('user-agent'),
        })

        return NextResponse.json({ resultId: newResultId })

    } catch (error: any) {
        console.error('Submit Error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
