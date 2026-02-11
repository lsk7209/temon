import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db/client'
import { testQueue, tests, questions, resultTypes } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { nanoid } from 'nanoid'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { z } from 'zod'

export const maxDuration = 60
export const dynamic = 'force-dynamic'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '')

// MBTI 타입 코드 (16개)
const MBTI_TYPES = [
  'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
  'ISTP', 'ISFP', 'INFP', 'INTP',
  'ESTP', 'ESFP', 'ENFP', 'ENTP',
  'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
] as const

// AI 응답 Zod 스키마
const ChoiceSchema = z.object({
  text: z.string().min(1),
  tags: z.array(z.enum(['E', 'I', 'S', 'N', 'T', 'F', 'J', 'P'])).min(1)
})

const QuestionSchema = z.object({
  text: z.string().min(1),
  choices: z.array(ChoiceSchema).min(2).transform(arr => arr.slice(0, 2))
})

const ResultSchema = z.object({
  type: z.enum(MBTI_TYPES),
  label: z.string().min(1),
  summary: z.string().min(1),
  traits: z.array(z.string()).min(1),
  presets: z.record(z.array(z.string())).optional(),
  pitfalls: z.array(z.string()).optional(),
  recommend: z.array(z.string()).optional()
})

const QuizDataSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1).max(200),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase kebab-case'),
  questions: z.array(QuestionSchema).length(12),
  results: z.array(ResultSchema).length(16)
})

export async function GET() {
  const db = getDb() // 한 번만 생성하여 재사용
  let queueItem: typeof testQueue.$inferSelect | null = null

  try {
    // 1. 대기열에서 처리할 항목 1개 조회
    queueItem = await db.select()
      .from(testQueue)
      .where(eq(testQueue.status, 'pending'))
      .limit(1)
      .get() ?? null

    if (!queueItem) {
      return NextResponse.json({ message: 'No pending items' })
    }

    // 2. Optimistic Locking: 상태가 여전히 'pending'일 때만 'processing'으로 변경
    const lockResult = await db.update(testQueue)
      .set({ status: 'processing', processedAt: new Date() })
      .where(
        and(
          eq(testQueue.id, queueItem.id),
          eq(testQueue.status, 'pending') // Race condition 방지
        )
      )

    // 다른 프로세스가 먼저 처리 중이면 종료
    if (lockResult.rowsAffected === 0) {
      return NextResponse.json({ message: 'Item already being processed by another job' })
    }

    // 3. AI 생성 요청
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" })

    const prompt = `
      Create a fun MBTI-style personality test about "${queueItem.keyword}".
      Language: Korean (Natural, viral, fun tone).
      Requirements:
      - 12 unique questions (E/I, S/N, T/F, J/P balanced)
      - Exactly 2 choices for each question. (No more, no less)
      - 16 unique results (one for each MBTI type: ISTJ, ISFJ, INFJ, INTJ, ISTP, ISFP, INFP, INTP, ESTP, ESFP, ENFP, ENTP, ESTJ, ESFJ, ENFJ, ENTJ)
      - Output JSON format ONLY. Do not include extra text.
      
      Output structure:
      {
        "title": "Main Title (catchy)",
        "description": "Short description (under 100 chars)",
        "slug": "english-slug-kebab-case",
        "questions": [
          {
            "text": "Question text (situation)",
            "choices": [
              { "text": "Choice 1", "tags": ["E"] },
              { "text": "Choice 2", "tags": ["I"] }
            ]
          }
        ],
        "results": [
           {
             "type": "ENFP",
             "label": "Result Name (fun nickname)",
             "summary": "Short summary",
             "traits": ["Trait 1", "Trait 2"],
             "presets": {
                "key1": ["Value..."],
                "key2": ["Value..."],
                "key3": ["Value..."]
             },
             "pitfalls": ["ENFP"],
             "recommend": ["ESTJ"]
           }
        ]
      }
    `

    const result = await model.generateContent(prompt)
    const responseText = result.response.text()
    const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim()

    let rawData
    try {
      rawData = JSON.parse(cleanedText)
    } catch (e) {
      throw new Error("Failed to parse AI JSON response")
    }

    // Zod 검증 (타입 안전 + 상세 에러 메시지)
    const parseResult = QuizDataSchema.safeParse(rawData)
    if (!parseResult.success) {
      const errorMessages = parseResult.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ')
      throw new Error(`AI response validation failed: ${errorMessages}`)
    }

    const quizData = parseResult.data

    // 4. 트랜잭션으로 DB 저장 (All-or-Nothing)
    const testId = nanoid()
    const finalSlug = `${quizData.slug}-${nanoid(4)}`

    await db.transaction(async (tx) => {
      // Insert Test
      await tx.insert(tests).values({
        id: testId,
        slug: finalSlug,
        title: quizData.title,
        description: quizData.description,
        category: 'ai-generated',
        status: 'draft',
        questionCount: quizData.questions.length,
        resultTypeCount: quizData.results.length,
      })

      // Insert Questions
      const questionsData = quizData.questions.map((q, idx) => ({
        id: nanoid(),
        testId,
        questionOrder: idx + 1,
        questionText: q.text,
        choice1Text: q.choices[0]?.text ?? '',
        choice1Tags: JSON.stringify(q.choices[0]?.tags ?? []),
        choice2Text: q.choices[1]?.text ?? '',
        choice2Tags: JSON.stringify(q.choices[1]?.tags ?? []),
      }))
      await tx.insert(questions).values(questionsData)

      // Insert Results
      const resultsData = quizData.results.map((r) => ({
        id: nanoid(),
        testId,
        typeCode: r.type,
        label: r.label,
        summary: r.summary,
        traits: JSON.stringify(r.traits ?? []),
        picks: JSON.stringify(r.presets ?? {}),
        matchTypes: JSON.stringify({ best: r.recommend ?? [], worst: r.pitfalls ?? [] }),
      }))
      await tx.insert(resultTypes).values(resultsData)

      // 큐 상태 업데이트 (트랜잭션 내에서)
      await tx.update(testQueue)
        .set({ status: 'completed', logs: `Generated: ${testId}` })
        .where(eq(testQueue.id, queueItem!.id))
    })

    return NextResponse.json({ success: true, testId, title: quizData.title })

  } catch (error: any) {
    console.error('Generation Error:', error)

    // 실패 상태 업데이트 (동일한 db 인스턴스 사용)
    if (queueItem) {
      try {
        await db.update(testQueue)
          .set({ status: 'failed', logs: error.message?.slice(0, 500) })
          .where(eq(testQueue.id, queueItem.id))
      } catch (updateError) {
        console.error('Failed to update queue status:', updateError)
      }
    }

    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
