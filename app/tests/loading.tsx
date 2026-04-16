import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-cyan-50">
      {/* Hero Section Skeleton */}
      <section className="relative overflow-hidden pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <Skeleton className="h-10 w-48 mb-6 rounded-full" />
          <Skeleton className="h-20 w-3/4 max-w-2xl mb-6 rounded-xl" />
          <Skeleton className="h-8 w-1/2 max-w-lg mb-8 rounded-lg" />
        </div>
      </section>

      {/* Search and Filter Skeleton */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8">
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

      {/* Grid Skeleton */}
      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-8 w-40 rounded" />
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
