import { NextResponse } from "next/server";
import { getDb } from "@/lib/db/client";
import { testQueue, tests, questions, resultTypes } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import { buildDraftQuality } from "@/lib/draft-quality";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

function getGoogleAiClient() {
  const apiKey = process.env.GOOGLE_API_KEY || process.env.GOOGLE_GENERATIVE_AI_KEY;
  if (!apiKey) return null;
  return new GoogleGenerativeAI(apiKey);
}

// MBTI 타입 코드 (16개)
const MBTI_TYPES = [
  "ISTJ",
  "ISFJ",
  "INFJ",
  "INTJ",
  "ISTP",
  "ISFP",
  "INFP",
  "INTP",
  "ESTP",
  "ESFP",
  "ENFP",
  "ENTP",
  "ESTJ",
  "ESFJ",
  "ENFJ",
  "ENTJ",
] as const;

// AI 응답 Zod 스키마
const ChoiceSchema = z.object({
  text: z.string().min(1),
  tags: z.array(z.enum(["E", "I", "S", "N", "T", "F", "J", "P"])).min(1),
});

const QuestionSchema = z.object({
  text: z.string().min(1),
  choices: z
    .array(ChoiceSchema)
    .min(2)
    .transform((arr) => arr.slice(0, 2)),
});

const ResultSchema = z.object({
  type: z.enum(MBTI_TYPES),
  label: z.string().min(1),
  summary: z.string().min(1),
  traits: z.array(z.string()).min(1),
  presets: z.record(z.array(z.string())).optional(),
  pitfalls: z.array(z.string()).optional(),
  recommend: z.array(z.string()).optional(),
});

const QuizDataSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().optional(),
  description: z.string().min(1).max(300),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase kebab-case"),
  keywords: z.array(z.string()).optional(),
  questions: z.array(QuestionSchema).length(12),
  results: z.array(ResultSchema).length(16),
});

function parseQueueMetadata(value: string | null) {
  try {
    const parsed = JSON.parse(value || "{}");
    return parsed.metadata || parsed;
  } catch {
    return {};
  }
}

function parseScheduledAt(value: unknown): Date | null {
  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const genAI = getGoogleAiClient();
  if (!genAI) {
    return NextResponse.json(
      { success: false, error: "Google Generative AI key is not configured" },
      { status: 503 },
    );
  }

  const db = getDb(); // 한 번만 생성하여 재사용
  let queueItem: typeof testQueue.$inferSelect | null = null;

  try {
    // 1. 대기열에서 처리할 항목 1개 조회
    queueItem =
      (await db
        .select()
        .from(testQueue)
        .where(eq(testQueue.status, "pending"))
        .limit(1)
        .get()) ?? null;

    if (!queueItem) {
      return NextResponse.json({ message: "No pending items" });
    }

    const queueMetadata = parseQueueMetadata(queueItem.logs);
    const scheduledAt = parseScheduledAt(queueMetadata.scheduledAt);

    // 2. Optimistic Locking: 상태가 여전히 'pending'일 때만 'processing'으로 변경
    const lockResult = await db
      .update(testQueue)
      .set({ status: "processing", processedAt: new Date() })
      .where(
        and(
          eq(testQueue.id, queueItem.id),
          eq(testQueue.status, "pending"), // Race condition 방지
        ),
      );

    // 다른 프로세스가 먼저 처리 중이면 종료
    if (lockResult.rowsAffected === 0) {
      return NextResponse.json({
        message: "Item already being processed by another job",
      });
    }

    // 3. AI 생성 요청
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const prompt = `
당신은 한국의 심리테스트 전문가입니다. "${queueItem.keyword}"에 관한 MBTI 유형 심리테스트를 만들어주세요.

【필수 요구사항】
- 언어: 자연스럽고 재미있는 한국어 (MZ세대 말투, 공감 유발)
- 질문 12개 (E/I, S/N, T/F, J/P 각 3문항씩 균형 있게)
- 각 질문마다 정확히 선택지 2개 (많거나 적으면 안 됨)
- 결과 16개 (MBTI 16개 유형 각각 1개, 빠짐없이)
- JSON 형식만 출력. 앞뒤 설명 텍스트 절대 금지.

【SEO/콘텐츠 품질 요구사항】
- title: 검색에 잘 걸리는 제목 (예: "나의 OO 스타일 테스트", "OO 유형 알아보기")
- subtitle: 공유하고 싶게 만드는 한 줄 부제 (감성·유머 포함, 30자 이내)
- description: 150~250자. 이 테스트로 뭘 알 수 있는지 + 검색 키워드 자연 포함
- keywords: 네이버·구글 검색에 노출될 핵심 키워드 5~8개 배열 (예: ["MBTI 테스트", "성격 유형", "OO 스타일"])
- slug: 영어 소문자 kebab-case (예: "meeting-style-test")
- 질문: 실제 상황 묘사로 공감 유발 ("이런 상황 너무 공감돼..."), 30~60자
- 선택지: 짧고 명확하게, 어느 쪽이 맞는지 확실히 구분 (10~25자)
- result label: 재미있는 별명/닉네임 (예: "📋 꼼꼼한 플래너형")
- result summary: 2~3문장. 이 유형의 핵심 특징 + 실생활 예시 (공유욕 유발)
- result traits: 3~5개. 이 유형을 가장 잘 설명하는 특성
- result presets: 3가지 키 (이 주제 관련 상황별 행동 패턴)

【출력 JSON 구조】
{
  "title": "제목",
  "subtitle": "부제목",
  "description": "150~250자 설명",
  "slug": "english-kebab-slug",
  "keywords": ["키워드1", "키워드2", "..."],
  "questions": [
    {
      "text": "질문 텍스트 (상황 묘사)",
      "choices": [
        { "text": "선택지 A", "tags": ["E"] },
        { "text": "선택지 B", "tags": ["I"] }
      ]
    }
  ],
  "results": [
    {
      "type": "ENFP",
      "label": "이모지 포함 재미있는 별명",
      "summary": "2~3문장 상세 설명. 특징 + 실생활 예시.",
      "traits": ["특성1", "특성2", "특성3"],
      "presets": {
        "상황1": ["행동패턴 설명"],
        "상황2": ["행동패턴 설명"],
        "상황3": ["행동패턴 설명"]
      },
      "pitfalls": ["ISTJ"],
      "recommend": ["INFJ"]
    }
  ]
}
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const cleanedText = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let rawData;
    try {
      rawData = JSON.parse(cleanedText);
    } catch (e) {
      throw new Error("Failed to parse AI JSON response");
    }

    // Zod 검증 (타입 안전 + 상세 에러 메시지)
    const parseResult = QuizDataSchema.safeParse(rawData);
    if (!parseResult.success) {
      const errorMessages = parseResult.error.issues
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join("; ");
      throw new Error(`AI response validation failed: ${errorMessages}`);
    }

    const quizData = parseResult.data;

    // 4. 트랜잭션으로 DB 저장 (All-or-Nothing)
    const testId = nanoid();
    const finalSlug = `${quizData.slug}-${nanoid(4)}`;
    const keywords = quizData.keywords ?? [];
    const qualityMetadata = {
      keywords,
      mainKeyword: keywords[0] ?? queueItem.keyword,
      expandedKeywords: keywords.slice(0, 8),
      copyQuality: "ai-generated-v1",
      resultCopyQuality: "ai-generated-v1",
      seoOptimized: true,
      scheduledAt: queueMetadata.scheduledAt ?? null,
      wave: queueMetadata.wave ?? null,
    };
    const questionsData = quizData.questions.map((q, idx) => ({
      id: nanoid(),
      testId,
      questionOrder: idx + 1,
      questionText: q.text,
      choice1Text: q.choices[0]?.text ?? "",
      choice1Tags: JSON.stringify(q.choices[0]?.tags ?? []),
      choice2Text: q.choices[1]?.text ?? "",
      choice2Tags: JSON.stringify(q.choices[1]?.tags ?? []),
    }));
    const resultsData = quizData.results.map((r) => ({
      id: nanoid(),
      testId,
      typeCode: r.type,
      label: r.label,
      summary: r.summary,
      traits: JSON.stringify(r.traits ?? []),
      picks: JSON.stringify(r.presets ?? {}),
      matchTypes: JSON.stringify({
        best: r.recommend ?? [],
        worst: r.pitfalls ?? [],
      }),
    }));
    const quality = buildDraftQuality(
      {
        title: quizData.title,
        description: quizData.description,
        questionCount: quizData.questions.length,
        resultTypeCount: quizData.results.length,
      },
      qualityMetadata,
      questionsData,
      resultsData,
    );

    await db.transaction(async (tx) => {
      // Insert Test
      await tx.insert(tests).values({
        id: testId,
        slug: finalSlug,
        title: quizData.title,
        subtitle: quizData.subtitle ?? null,
        description: quizData.description,
        category: queueMetadata.category || "ai-generated",
        status: "draft",
        publishedAt: scheduledAt,
        questionCount: quizData.questions.length,
        resultTypeCount: quizData.results.length,
        metadata: {
          ...qualityMetadata,
          quality,
        },
      });

      // Insert Questions
      await tx.insert(questions).values(questionsData);

      // Insert Results
      await tx.insert(resultTypes).values(resultsData);

      // 큐 상태 업데이트 (트랜잭션 내에서)
      await tx
        .update(testQueue)
        .set({
          status: "completed",
          logs: JSON.stringify({
            message: "Generated",
            testId,
            metadata: queueMetadata,
          }),
        })
        .where(eq(testQueue.id, queueItem!.id));
    });

    return NextResponse.json({ success: true, testId, title: quizData.title });
  } catch (error: unknown) {
    console.error("Generation Error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    // 실패 상태 업데이트 (동일한 db 인스턴스 사용)
    if (queueItem) {
      try {
        await db
          .update(testQueue)
          .set({ status: "failed", logs: errorMessage.slice(0, 500) })
          .where(eq(testQueue.id, queueItem.id));
      } catch (updateError) {
        console.error("Failed to update queue status:", updateError);
      }
    }

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
