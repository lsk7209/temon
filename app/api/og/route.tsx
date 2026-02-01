import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || '테몬 MBTI'
    const description = searchParams.get('desc') || '나의 성향을 알아보세요!'

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: 'linear-gradient(to bottom right, #4F46E5, #9333EA)',
            padding: '40px 80px',
            textAlign: 'center',
          }}
        >
          {/* Branding Badge */}
          <div
            style={{
              position: 'absolute',
              top: 40,
              left: 40,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: '#fff',
                marginRight: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
              }}
            >
              🧪
            </div>
            <span
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: 'white',
                letterSpacing: '-0.02em',
              }}
            >
              테몬 MBTI
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 20,
              padding: '40px 60px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            }}
          >
            <div
              style={{
                fontSize: 60,
                fontWeight: 900,
                color: 'white',
                lineHeight: 1.2,
                marginBottom: 20,
                textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                wordBreak: 'keep-all',
              }}
            >
              {title}
            </div>

            <div
              style={{
                fontSize: 30,
                color: '#E9D5FF',
                lineHeight: 1.5,
                fontWeight: 500,
              }}
            >
              {description}
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: 40,
              fontSize: 20,
              color: 'rgba(255, 255, 255, 0.6)',
            }}
          >
            지금 바로 무료로 테스트해보세요! 👉
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
