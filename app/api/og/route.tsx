import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const DEFAULT_TITLE = "테몬 성향 테스트";
const DEFAULT_DESCRIPTION = "나의 선택 기준과 생활 성향을 가볍게 확인해보세요";
const SITE_NAME = "테몬";

function clampText(value: string, maxLength: number) {
  const trimmed = value.trim().replace(/\s+/g, " ");
  return trimmed.length > maxLength ? `${trimmed.slice(0, maxLength - 1)}…` : trimmed;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = clampText(searchParams.get("title") || DEFAULT_TITLE, 42);
    const description = clampText(
      searchParams.get("desc") || DEFAULT_DESCRIPTION,
      58,
    );

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#111827",
            backgroundImage:
              "linear-gradient(135deg, #111827 0%, #312e81 52%, #be123c 100%)",
            padding: "52px 76px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 42,
              left: 52,
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "white",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                backgroundColor: "white",
                color: "#312e81",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                fontWeight: 900,
              }}
            >
              T
            </div>
            {SITE_NAME}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              maxWidth: 980,
            }}
          >
            <div
              style={{
                fontSize: title.length > 28 ? 56 : 64,
                fontWeight: 900,
                color: "white",
                lineHeight: 1.18,
                marginBottom: 26,
                wordBreak: "keep-all",
              }}
            >
              {title}
            </div>

            <div
              style={{
                fontSize: 30,
                color: "#fde68a",
                lineHeight: 1.45,
                fontWeight: 700,
                wordBreak: "keep-all",
              }}
            >
              {description}
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              right: 56,
              bottom: 42,
              fontSize: 24,
              color: "rgba(255, 255, 255, 0.72)",
              fontWeight: 700,
            }}
          >
            무료 성향 테스트
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (error: unknown) {
    console.error(error instanceof Error ? error.message : error);
    return new Response("Failed to generate the image", {
      status: 500,
    });
  }
}
