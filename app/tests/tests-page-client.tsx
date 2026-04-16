"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Search, Star, Users, ChevronLeft, ChevronRight, TestTube } from "lucide-react"
import { useState, useEffect } from "react"
import { trackClick, trackSearch } from "@/lib/analytics"
import { getAllTests, CATEGORIES, ALL_TESTS, Test } from "@/lib/tests-config"
import { Sparkles } from "lucide-react"
import { shouldShowParticipants, formatParticipants } from "@/lib/format-participants"

const TESTS_PER_PAGE = 12

interface DynamicTest {
  id: string
  title: string
  description: string
  slug: string
  category: string
}

interface TestsPageClientProps {
  dynamicTests?: DynamicTest[]
}

export default function TestsPageClient({ dynamicTests = [] }: TestsPageClientProps) {
  // Map dynamic tests to the Test interface
  const mappedDynamicTests: Test[] = dynamicTests.map(t => ({
    id: t.id,
    title: t.title,
    description: t.description || "",
    icon: Sparkles,
    href: `/tests/${t.slug}`,
    color: "from-violet-500 to-fuchsia-500",
    participants: "0",
    rating: 5.0,
    badge: "AI",
    category: t.category || "기타",
    tags: ["AI", "New", t.title],
    new: true
  }))

  const allTests = [...mappedDynamicTests, ...getAllTests()]
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [currentPage, setCurrentPage] = useState(1)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    setCurrentPage(1)
    if (term.length > 0) {
      trackSearch(term)
    }
  }

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
    trackClick(`category_${category}`, window.location.pathname)
  }

  const handleTestClick = (testId: string) => {
    trackClick(`test_card_${testId}`, window.location.pathname)
  }

  // 필터링된 테스트 (중복 제거 및 정렬)
  const filteredTests = allTests
    .filter(test => {
      const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === "전체" || test.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    // id 기준으로 정렬하여 일관성 유지 (중복 방지)
    .sort((a, b) => {
      if (a.id < b.id) return -1
      if (a.id > b.id) return 1
      return 0
    })
    // href 기준으로도 중복 제거 (혹시 모를 href 중복 방지)
    .filter((test, index, self) =>
      index === self.findIndex(t => t.href === test.href)
    )

  // 페이지네이션
  const totalPages = Math.ceil(filteredTests.length / TESTS_PER_PAGE)
  const startIndex = (currentPage - 1) * TESTS_PER_PAGE
  const paginatedTests = filteredTests.slice(startIndex, startIndex + TESTS_PER_PAGE)

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-cyan-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-gradient-to-r from-violet-500 to-pink-500 text-white border-0 px-6 py-2 text-lg">
            ✨ 모든 테스트를 한눈에!
          </Badge>

          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-violet-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
            MBTI 테스트 모음
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto font-medium">
            나를 찾는 재밌는 테스트들을 만나보세요! 💜
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col gap-6">
              {/* 검색바 */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="관심 있는 테스트를 검색해보세요..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-12 h-12 text-lg rounded-full border-gray-200 focus-visible:ring-violet-500 bg-white/50 backdrop-blur-sm transition-all hover:bg-white"
                />
              </div>

              {/* 카테고리 필터 */}
              <div className="border-t pt-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3 px-1">
                  <span className="font-semibold">카테고리</span>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-400">
                    좌우로 스크롤하여 확인하세요
                  </span>
                </div>
                <ScrollArea className="w-full whitespace-nowrap rounded-lg">
                  <div className="flex w-max space-x-2 p-1">
                    <Button
                      variant={selectedCategory === "전체" ? "default" : "outline"}
                      onClick={() => handleCategoryFilter("전체")}
                      className={`rounded-full px-6 transition-all ${selectedCategory === "전체"
                          ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white border-0 shadow-md transform scale-105"
                          : "hover:bg-violet-50 hover:text-violet-600 border-gray-200"
                        }`}
                    >
                      전체
                    </Button>
                    {CATEGORIES.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        onClick={() => handleCategoryFilter(category)}
                        className={`rounded-full px-5 transition-all ${selectedCategory === category
                            ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white border-0 shadow-md transform scale-105"
                            : "hover:bg-violet-50 hover:text-violet-600 border-gray-200"
                          }`}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" className="invisible sm:visible" />
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Tests */}
      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <TestTube className="w-6 h-6 text-cyan-500" />
              전체 테스트 ({filteredTests.length}개)
            </h2>
          </div>

          {paginatedTests.length === 0 ? (
            <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
              <p className="text-xl text-gray-600 mb-4">검색 결과가 없습니다.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("전체")
                }}
              >
                필터 초기화
              </Button>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {paginatedTests.map((test) => {
                  const TestIcon = test.icon
                  return (
                    <Link key={test.href} href={test.href} onClick={() => handleTestClick(test.id)}>
                      <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-white/90 backdrop-blur-sm border-2 border-transparent hover:border-violet-500 overflow-hidden">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-2xl bg-gradient-to-br ${test.color} shadow-lg`}>
                              <TestIcon className="w-8 h-8 text-white" />
                            </div>
                            {test.badge && (
                              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 font-bold">
                                {test.badge}
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-2xl font-bold group-hover:text-violet-600 transition-colors">
                            {test.title}
                          </CardTitle>
                          <CardDescription className="text-base text-gray-600">{test.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between pt-4 border-t">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold">{test.rating}</span>
                            </div>
                            {shouldShowParticipants(test.participants) && (
                              <div className="flex items-center gap-1 text-gray-600">
                                <Users className="w-4 h-4" />
                                <span className="text-sm">{test.participants}</span>
                              </div>
                            )}
                          </div>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white rounded-full"
                          >
                            시작하기 →
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  )
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    이전
                  </Button>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? "bg-gradient-to-r from-violet-500 to-pink-500" : ""}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    다음
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}

