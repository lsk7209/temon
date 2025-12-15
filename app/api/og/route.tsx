/**
 * Dynamic Open Graph Image Generation API Route
 * 
 * Generates dynamic OG images for better social media sharing
 * and SEO optimization.
 * 
 * Usage: /api/og?title=커피 MBTI&subtitle=커피 취향으로 알아보는 성격 유형
 */

import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Extract parameters from query string
    const title = searchParams.get('title') || '테몬 MBTI'
    const subtitle = searchParams.get('subtitle') || '무료 성격 테스트'
    const testId = searchParams.get('testId') || ''
    const difficulty = searchParams.get('difficulty') || ''
    const participants = searchParams.get('participants') || ''
    
    // Font configuration (using system fonts for edge runtime)
    // In production, you might want to use custom fonts via @vercel/og
    
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
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '80px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {/* Main Title */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              width: '100%',
            }}
          >
            <h1
              style={{
                fontSize: title.length > 20 ? 64 : 80,
                fontWeight: 900,
                color: 'white',
                marginBottom: '20px',
                lineHeight: 1.2,
                textShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
            >
              {title}
            </h1>
            
            {/* Subtitle */}
            {subtitle && (
              <p
                style={{
                  fontSize: 32,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.95)',
                  marginBottom: '40px',
                  maxWidth: '900px',
                }}
              >
                {subtitle}
              </p>
            )}
            
            {/* Metadata Row */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '40px',
                alignItems: 'center',
                marginTop: '40px',
              }}
            >
              {/* Difficulty Badge */}
              {difficulty && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    fontSize: 24,
                    color: 'white',
                    fontWeight: 600,
                  }}
                >
                  난이도: {difficulty}
                </div>
              )}
              
              {/* Participants Count */}
              {participants && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    fontSize: 24,
                    color: 'white',
                    fontWeight: 600,
                  }}
                >
                  참여자: {participants}
                </div>
              )}
            </div>
            
            {/* Brand Footer */}
            <div
              style={{
                position: 'absolute',
                bottom: '60px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: 'white',
                  textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                }}
              >
                테몬 MBTI
              </div>
              <div
                style={{
                  fontSize: 20,
                  color: 'rgba(255,255,255,0.8)',
                }}
              >
                무료 성격 테스트
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.error('OG Image generation failed:', e.message)
    
    // Return a fallback image
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontSize: 48,
            fontWeight: 700,
          }}
        >
          테몬 MBTI
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  }
}

