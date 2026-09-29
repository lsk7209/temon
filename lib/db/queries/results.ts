import { eq, or } from "drizzle-orm";
import { getDb, getDbClient } from "../client";
import { questions, resultTypes, testResults, tests } from "../schema";
import { calculateMBTI } from "../../utils/mbti-calculator";
import { insertResultIdempotent } from "./result-attempts";

export type ResultSaveErrorCode =
  | "ATTEMPT_CONFLICT"
  | "TEST_NOT_FOUND"
  | "TEST_NOT_PUBLIC"
  | "AMBIGUOUS_TEST_ID"
  | "TEST_DEFINITION_UNAVAILABLE"
  | "UNSUPPORTED_RESULT_ENGINE"
  | "INVALID_RESULT_TYPE"
  | "INVALID_ANSWERS";

export class ResultSaveError extends Error {
  constructor(public readonly code: ResultSaveErrorCode, public readonly status: number) {
    super(code);
  }
}

export async function saveTestResult(data: {
  testId: string;
  resultType: string;
  answers: Record<string, string>;
  userIp?: string;
  userAgent?: string;
  attemptId?: string;
}): Promise<{ id: string; replayed: boolean }> {
  const db = getDb();
  const matches = await db.select({
    id: tests.id,
    status: tests.status,
    publishedAt: tests.publishedAt,
  }).from(tests).where(or(eq(tests.id, data.testId), eq(tests.slug, data.testId))).all();

  if (matches.length === 0) throw new ResultSaveError("TEST_NOT_FOUND", 404);
  if (matches.length > 1) throw new ResultSaveError("AMBIGUOUS_TEST_ID", 409);
  const test = matches[0];
  if (test.status !== "published" || (test.publishedAt && test.publishedAt > new Date())) {
    throw new ResultSaveError("TEST_NOT_PUBLIC", 404);
  }

  const types = await db.select({ code: resultTypes.typeCode }).from(resultTypes)
    .where(eq(resultTypes.testId, test.id)).all();
  const testQuestions = await db.select({
    id: questions.id,
    choice1Tags: questions.choice1Tags,
    choice2Tags: questions.choice2Tags,
  }).from(questions).where(eq(questions.testId, test.id)).orderBy(questions.questionOrder).all();
  if (types.length === 0 || testQuestions.length === 0) {
    throw new ResultSaveError("TEST_DEFINITION_UNAVAILABLE", 422);
  }
  if (!types.some((type) => type.code === data.resultType)) {
    throw new ResultSaveError("INVALID_RESULT_TYPE", 422);
  }

  const mbtiTag = /^[EISNTFJP]$/;
  const mbtiType = /^[EI][SN][TF][JP]$/;
  const choices = testQuestions.map((question) =>
    [question.choice1Tags, question.choice2Tags].map((raw) => {
      try {
        const tags: unknown = JSON.parse(raw);
        return Array.isArray(tags) && tags.length > 0 &&
          tags.every((tag) => typeof tag === "string" && mbtiTag.test(tag))
          ? tags as string[] : null;
      } catch {
        return null;
      }
    }),
  );
  const definedTags = choices.flat(2).filter((tag): tag is string => typeof tag === "string");
  const hasAllAxes = ["EI", "SN", "TF", "JP"].every((axis) =>
    [...axis].some((tag) => definedTags.includes(tag)));
  if (!types.every((type) => mbtiType.test(type.code)) ||
      choices.some((pair) => pair.some((tags) => tags === null)) || !hasAllAxes) {
    throw new ResultSaveError("UNSUPPORTED_RESULT_ENGINE", 422);
  }

  const entries = Object.entries(data.answers);
  if (entries.length !== testQuestions.length) {
    throw new ResultSaveError("INVALID_ANSWERS", 422);
  }
  const answerKeys = new Set(entries.map(([key]) => key));
  const indexKeys = testQuestions.every((_, index) => answerKeys.has(String(index)));
  const idKeys = testQuestions.every((question) => answerKeys.has(question.id));
  if (!indexKeys && !idKeys) throw new ResultSaveError("INVALID_ANSWERS", 422);

  const selectedTags: string[][] = [];
  for (const [index, question] of testQuestions.entries()) {
    const answer = data.answers[indexKeys ? String(index) : question.id];
    const selectedIndex = choices[index].findIndex((tags, choiceIndex) =>
      tags !== null && (answer === (choiceIndex === 0 ? question.choice1Tags : question.choice2Tags) ||
        answer === JSON.stringify(tags) || (tags.length === 1 && answer === tags[0])));
    if (selectedIndex === -1) throw new ResultSaveError("INVALID_ANSWERS", 422);
    selectedTags.push(choices[index][selectedIndex] as string[]);
  }
  if (calculateMBTI(selectedTags) !== data.resultType) {
    throw new ResultSaveError("INVALID_RESULT_TYPE", 422);
  }

  const outcome = await insertResultIdempotent(getDbClient(), {
    id: crypto.randomUUID(),
    testId: test.id,
    resultType: data.resultType,
    answers: data.answers,
    userIp: data.userIp,
    userAgent: data.userAgent,
  }, data.attemptId);
  if (outcome.kind === "conflict") throw new ResultSaveError("ATTEMPT_CONFLICT", 409);
  return { id: outcome.id, replayed: outcome.kind === "replayed" };
}

export async function getPublicTestResult(id: string) {
  const db = getDb();
  return db.select({
    id: testResults.id,
    testId: testResults.testId,
    resultType: testResults.resultType,
  }).from(testResults).where(eq(testResults.id, id)).get();
}
