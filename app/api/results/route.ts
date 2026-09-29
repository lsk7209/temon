/**
 * 테스트 결과 API
 * POST /api/results - 결과 저장
 * GET /api/results?id={id} - 결과 조회
 */

export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { saveTestResult, getPublicTestResult, ResultSaveError } from "@/lib/db/queries/results";
import { ATTEMPT_ID_PATTERN } from "@/lib/db/queries/result-attempts";
import { hashIp } from "@/lib/hash-ip";
import { z } from "zod";

const MAX_BODY_BYTES = 64 * 1024;
class BodyTooLargeError extends Error {}

async function readLimitedBody(request: NextRequest) {
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) throw new BodyTooLargeError();
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  return Buffer.concat(chunks).toString("utf8");
}

const resultInput = z.object({
  testId: z.string().trim().min(1).max(100),
  resultType: z.string().trim().min(1).max(100),
  answers: z.record(z.string().max(512)).refine(
    (answers) => Object.keys(answers).length > 0 && Object.keys(answers).length <= 100 &&
      Object.keys(answers).every((key) => /^(0|[1-9]\d{0,5}|[A-Za-z0-9_-]{1,100})$/.test(key)),
  ),
  attemptId: z.string().regex(ATTEMPT_ID_PATTERN).optional(),
}).strict();

/**
 * CORS 헤더 설정
 */
function getCorsHeaders() {
  return {
    "Access-Control-Allow-Origin":
      process.env.NEXT_PUBLIC_APP_URL || "https://temon.kr",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

/**
 * 입력 검증
 */
function errorResponse(code: string, status: number) {
  return NextResponse.json({ error: code, code }, { status, headers: getCorsHeaders() });
}

/**
 * OPTIONS 핸들러 (CORS preflight)
 */
export async function OPTIONS() {
  return NextResponse.json({}, { headers: getCorsHeaders() });
}

/**
 * POST /api/results - 테스트 결과 저장
 */
export async function POST(request: NextRequest) {
  try {
    // 요청 본문 파싱 및 검증
    let body: unknown;
    try {
      body = JSON.parse(await readLimitedBody(request));
    } catch (error) {
      if (error instanceof BodyTooLargeError) return errorResponse("BODY_TOO_LARGE", 413);
      return errorResponse("INVALID_JSON", 400);
    }

    const validated = resultInput.safeParse(body);
    if (!validated.success) {
      return errorResponse("INVALID_RESULT_INPUT", 400);
    }

    const { testId, resultType, answers, attemptId } = validated.data;

    // 클라이언트 정보 추출
    const userAgent = request.headers.get("user-agent") || undefined;
    const ipRaw =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // 결과 저장 (원본 IP는 저장하지 않고 해시된 식별자만 저장 — PIPA 최소수집)
    // 같은 attemptId 재시도는 기존 결과 ID를 200으로 돌려준다.
    const saved = await saveTestResult({
      testId,
      resultType,
      answers,
      attemptId,
      userAgent,
      userIp: hashIp(ipRaw),
    });

    return NextResponse.json(
      { id: saved.id, success: true, replayed: saved.replayed },
      { status: saved.replayed ? 200 : 201, headers: getCorsHeaders() },
    );
  } catch (error) {
    if (error instanceof ResultSaveError) {
      return errorResponse(error.code, error.status);
    }
    console.error("Error saving test result:", error);

    return errorResponse("RESULT_SAVE_FAILED", 500);
  }
}

/**
 * GET /api/results?id={id} - 테스트 결과 조회
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id || id.trim().length === 0) {
      return NextResponse.json(
        { error: "Missing or empty id parameter" },
        { status: 400, headers: getCorsHeaders() },
      );
    }

    // UUID 형식 검증 (간단한 검증) (길이 및 하이픈 체크)
    if (id.length > 50) {
      // 너무 긴 ID 방어
      return NextResponse.json(
        { error: "Invalid id format" },
        { status: 400, headers: getCorsHeaders() },
      );
    }

    const result = await getPublicTestResult(id);

    if (!result) {
      return NextResponse.json(
        { error: "Result not found" },
        { status: 404, headers: getCorsHeaders() },
      );
    }

    return NextResponse.json(result, { headers: getCorsHeaders() });
  } catch (error) {
    console.error("Error fetching test result:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: getCorsHeaders() },
    );
  }
}
