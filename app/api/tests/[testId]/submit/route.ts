import { NextResponse } from "next/server";
import { getDb } from "@/lib/db/client";
import { tests, questions, resultTypes, testResults } from "@/lib/db/schema";
import { and, eq, or, sql } from "drizzle-orm";
import { nanoid } from "nanoid";

export const dynamic = "force-dynamic";

export async function POST(
  req: Request,
  { params }: { params: { testId: string } },
) {
  try {
    const { answers } = (await req.json()) as {
      answers: Record<string, number>;
    };

    const db = getDb();

    // 0. Resolve slug or id → actual tests.id (AI-generated tests use nanoid id, not slug)
    const test = await db
      .select()
      .from(tests)
      .where(
        and(
          or(eq(tests.id, params.testId), eq(tests.slug, params.testId)),
          eq(tests.status, "published"),
        ),
      )
      .get();

    if (!test) {
      return NextResponse.json({ error: "Test not found" }, { status: 404 });
    }

    const resolvedTestId = test.id;

    // 1. Fetch all questions for this test to calculate scores
    const allQuestions = await db
      .select()
      .from(questions)
      .where(eq(questions.testId, resolvedTestId))
      .all();

    // 2. Calculate MBTI Scores
    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    allQuestions.forEach((q) => {
      const answer = answers[q.id]; // 0 (choice1) or 1 (choice2)

      let tags: string[] = [];
      if (answer === 0) {
        try {
          tags = JSON.parse(q.choice1Tags);
        } catch (e) {}
      } else if (answer === 1) {
        try {
          tags = JSON.parse(q.choice2Tags);
        } catch (e) {}
      }

      tags.forEach((t) => {
        if (scores[t as keyof typeof scores] !== undefined) {
          scores[t as keyof typeof scores]++;
        }
      });
    });

    // 3. Determine Type
    const mbti = [
      scores.E >= scores.I ? "E" : "I",
      scores.S >= scores.N ? "S" : "N",
      scores.T >= scores.F ? "T" : "F",
      scores.J >= scores.P ? "J" : "P",
    ].join(""); // e.g., "ENFP"

    // 4. Find Result ID
    const resultType = await db
      .select()
      .from(resultTypes)
      .where(
        sql`${resultTypes.testId} = ${resolvedTestId} AND ${resultTypes.typeCode} = ${mbti}`,
      )
      .limit(1)
      .get();

    let finalResultId = resultType?.id;

    if (!finalResultId) {
      const firstResult = await db
        .select()
        .from(resultTypes)
        .where(eq(resultTypes.testId, resolvedTestId))
        .limit(1)
        .get();
      finalResultId = firstResult?.id;
    }

    if (!finalResultId) {
      return NextResponse.json(
        { error: "Result calculation failed" },
        { status: 500 },
      );
    }

    // 5. Save Result (Analytics)
    const newResultId = nanoid();
    await db.insert(testResults).values({
      id: newResultId,
      testId: resolvedTestId,
      resultType: mbti,
      answers: JSON.stringify(answers),
      userIp: "anonymous",
      userAgent: req.headers.get("user-agent"),
    });

    return NextResponse.json({ resultId: newResultId });
  } catch (error: unknown) {
    console.error("Submit Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
