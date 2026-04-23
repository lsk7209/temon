import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/client";
import { pageVisits, testStarts } from "@/lib/db/schema";
import { z } from "zod";
import { createHash } from "node:crypto";

const trackSchema = z.object({
  type: z.enum(["page_view", "test_start"]),
  payload: z.object({}).passthrough(),
});

/**
 * IP 식별자 해시. 원본 IP는 절대 저장하지 않음 (개인정보보호법 제19조 최소수집 원칙).
 * - salt(IP_HASH_SALT env)와 결합 → SHA-256 → 16자 prefix만 보관
 * - salt가 없으면 "anonymous" 상수 반환 (추적성 포기하고 안전 우선)
 */
function hashIp(ip: string | null | undefined): string {
  if (!ip || ip === "unknown") return "anonymous";
  const salt = process.env.IP_HASH_SALT;
  if (!salt) return "anonymous";
  // 프록시 체인의 첫 IP만 사용
  const first = ip.split(",")[0]?.trim() || "unknown";
  return createHash("sha256")
    .update(`${salt}|${first}`)
    .digest("hex")
    .slice(0, 16);
}

function parseUserAgent(ua: string) {
  const browser = /chrome|crios/i.test(ua)
    ? "Chrome"
    : /firefox|fxios/i.test(ua)
      ? "Firefox"
      : /safari/i.test(ua) && !/chrome|crios/i.test(ua)
        ? "Safari"
        : /edg/i.test(ua)
          ? "Edge"
          : "Other";

  const os = /windows/i.test(ua)
    ? "Windows"
    : /macintosh|mac os x/i.test(ua)
      ? "macOS"
      : /linux/i.test(ua)
        ? "Linux"
        : /android/i.test(ua)
          ? "Android"
          : /ios|iphone|ipad|ipod/i.test(ua)
            ? "iOS"
            : "Other";

  const device = /mobile/i.test(ua)
    ? "Mobile"
    : /tablet|ipad/i.test(ua)
      ? "Tablet"
      : "Desktop";

  return { browser, os, device };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = trackSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 },
      );
    }
    const { type, payload } = parsed.data as {
      type: string;
      payload: Record<string, any>;
    };
    const userAgent = request.headers.get("user-agent") || "";
    const ipRaw = request.headers.get("x-forwarded-for") || "unknown";
    const ip = hashIp(ipRaw); // 해시된 식별자만 DB에 저장 (PIPA 최소수집)
    const { browser, os, device } = parseUserAgent(userAgent);

    const db = getDb();

    if (type === "page_view") {
      const { path, referrer, searchKeyword } = payload;
      await db.insert(pageVisits).values({
        id: crypto.randomUUID(),
        path: path || "/",
        referrer: referrer || null,
        searchKeyword: searchKeyword || null,
        ipAddress: ip,
        userAgent: userAgent,
        deviceType: device,
        browser: browser,
        os: os,
        createdAt: new Date(),
      });
    } else if (type === "test_start") {
      const { testId } = payload;
      await db.insert(testStarts).values({
        id: crypto.randomUUID(),
        testId: testId,
        createdAt: new Date(),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Tracking error:", error);
    return NextResponse.json({ error: "Tracking failed" }, { status: 500 });
  }
}
