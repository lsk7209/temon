import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-cyan-50">
      <section className="relative overflow-hidden pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <p className="mb-6 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-6 py-2 text-lg font-semibold text-white">
            무료 테스트 사이트
          </p>
          <h1 className="mb-6 text-5xl font-black leading-tight text-gray-950 md:text-7xl">
            성격 테스트 모음
          </h1>
          <p className="max-w-3xl text-xl font-medium leading-8 text-gray-700 md:text-2xl">
            무료 MBTI 테스트, 성격 테스트, 취향 테스트를 한곳에서 골라보세요. 관심 주제별로 빠르게 찾고 결과를 친구와 공유할 수 있습니다.
          </p>
        </div>
      </section>

      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="mb-3 text-2xl font-bold text-gray-950">
              테스트 목록을 불러오는 중입니다
            </h2>
            <p className="mb-5 leading-7 text-gray-700">
              테몬은 음식, 연애, 생활, 디지털, 공부, 취향 같은 일상 주제의 무료 테스트를 모아 제공합니다. 각 카드는 참여 시간, 주제, 결과 공유 가능 여부를 기준으로 고를 수 있게 구성됩니다.
            </p>
            <div className="flex flex-col gap-6">
              <Skeleton className="h-12 w-full rounded-full" />
              <div className="border-t pt-4 space-y-3">
                <Skeleton className="h-5 w-24 rounded" />
                <div className="flex gap-2 overflow-hidden">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-10 w-20 rounded-full flex-shrink-0" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-950">
              주제별 무료 MBTI 테스트
            </h2>
            <p className="mt-2 leading-7 text-gray-700">
              처음 방문했다면 짧은 문항으로 끝나는 인기 테스트부터 시작하고, 관심사가 분명하다면 카테고리와 검색어로 원하는 테스트를 찾으면 됩니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/90 backdrop-blur-sm rounded-xl border p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <Skeleton className="h-14 w-14 rounded-2xl" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-7 w-3/4 rounded" />
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-2/3 rounded" />
                </div>
                <div className="pt-4 border-t flex justify-between items-center">
                  <div className="flex gap-3">
                    <Skeleton className="h-4 w-12 rounded" />
                    <Skeleton className="h-4 w-12 rounded" />
                  </div>
                  <Skeleton className="h-9 w-24 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
