/**
 * 404 페이지
 */

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Home, Search } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-pink-50 to-cyan-50 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center">
            <Search className="w-8 h-8 text-violet-600" />
          </div>
          <CardTitle className="text-3xl">404</CardTitle>
          <CardDescription className="mt-2 text-lg">
            페이지를 찾을 수 없습니다
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
          <div className="flex flex-col gap-2">
            <Button asChild className="w-full">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                홈으로 돌아가기
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/tests">
                테스트 둘러보기
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

