import { NextResponse } from 'next/server'
import { db } from '@/lib/db/client'
import { testQueue, tests, questions, resultTypes } from '@/lib/db/schema'
import { eq, sql } from 'drizzle-orm'
import { nanoid } from 'nanoid'
import { GoogleGenerativeAI } from '@google/generative-ai'

export const maxDuration = 60 // Vercel limit for free tier function is often 10s or 60s
export const dynamic = 'force-dynamic'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '')

export async function GET() {
  let queueItem = null;
  try {
    // 1. 대기열에서 처리할 항목 1개 조회
    queueItem = await db.select()
      .from(testQueue)
      .where(eq(testQueue.status, 'pending'))
      .limit(1)
      .get()

    if (!queueItem) {
      return NextResponse.json({ message: 'No pending items' })
    }

    // 2. 상태를 'processing'으로 변경
    await db.update(testQueue)
      .set({ status: 'processing', processedAt: new Date() })
      .where(eq(testQueue.id, queueItem.id))

    // 3. AI 생성 요청
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite-preview-02-05" })

    // 프롬프트: 퀴즈 구조 생성 (JSON Only)
    const prompt = `
      Create a fun MBTI-style personality test about "${queueItem.keyword}".
      Language: Korean (Natural, viral, fun tone).
      Output JSON format ONLY:
      {
        "title": "Main Title (catchy)",
        "description": "Short description (under 100 chars)",
        "slug": "english-slug-kebab-case",
        "questions": [
          {
            "text": "Question text (situation)",
            "choices": [
              { "text": "Choice 1", "tags": ["E", "S"] },
              { "text": "Choice 2", "tags": ["I", "N"] }
            ]
          }
        ],
        "results": [
           {
             "type": "ENFP", // MBTI type
             "label": "Result Name (fun nickname)",
             "summary": "Short summary",
             "traits": ["Trait 1", "Trait 2"],
             "tips": ["Tip 1", "Tip 2"]
           }
          {
            "type": "ISTJ",
            "label": "Fun Nickname",
            "summary": "One-line summary",
            "traits": ["Trait1", "Trait2", "Trait3"],
            "presets": {
               "key1": ["Value..."],
               "key2": ["Value..."],
               "key3": ["Value..."]
            },
            "pitfalls": ["ENFP"], // Worst match MBTI codes
            "recommend": ["ESTJ"] // Best match MBTI codes
          }
        ]
      }
    `

    const result = await model.generateContent(prompt)
    const responseText = result.response.text()
    const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim()

    let quizData;
    try {
      quizData = JSON.parse(cleanedText);
    } catch (e) {
      throw new Error("Failed to parse AI JSON response");
    }

    // Validation
    if (quizData.questions.length !== 12) throw new Error("Invalid question count");
    if (quizData.results.length !== 16) throw new Error("Invalid result count");

    // 4. DB 저장
    const testId = nanoid()

    // 1. Insert Test
    await db.insert(tests).values({
      id: testId,
      slug: `${quizData.slug}-${nanoid(4)}`,
      title: quizData.title,
      description: quizData.description,
      category: 'ai-generated',
      status: 'published', // Direct publish for now as per flow, or draft?
      questionCount: quizData.questions.length,
      resultTypeCount: quizData.results.length,
      publishedAt: new Date(),
    })

    // 2. Insert Questions
    const questionsData = quizData.questions.map((q: any, idx: number) => ({
      id: nanoid(),
      testId,
      questionOrder: idx + 1,
      questionText: q.text,
      choice1Text: q.choices[0].text,
      choice1Tags: JSON.stringify(q.choices[0].tags), // AI now ensures tags
      choice2Text: q.choices[1].text,
      choice2Tags: JSON.stringify(q.choices[1].tags),
    }))
    await db.insert(questions).values(questionsData)

    // 3. Insert Results
    const resultsData = quizData.results.map((r: any) => ({
      id: nanoid(),
      testId,
      typeCode: r.type, // e.g., ISTJ
      label: r.label,
      summary: r.summary,
      traits: JSON.stringify(r.traits),
      // Store dynamic presets in tips or specific column? 
      // Existing schema has 'tips', 'picks'. Let's map presets to 'tips' for now or 'picks'.
      // Looking at schema: tips, picks, match_types is text.
      // Let's us `picks` for the Presets JSON string.
      picks: JSON.stringify(r.presets),
      matchTypes: JSON.stringify({ best: r.recommend, worst: r.pitfalls }),
    }))
    await db.insert(resultTypes).values(resultsData)

    // 5. 대기열 상태 업데이트 (완료)
    await db.update(testQueue)
      .set({ status: 'completed', logs: 'Successfully generated v2' })
      .where(eq(testQueue.id, queueItem.id))

    return NextResponse.json({ success: true, testId, title: quizData.title })

  } catch (error: any) {
    console.error('Generation Error:', error)

    // 실패 상태 업데이트
    if (queueItem) { // queueItem is now accessible here
      await db.update(testQueue)
        .set({ status: 'failed', logs: error.message })
        .where(eq(testQueue.id, queueItem.id))
    }

    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
