"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Sparkles,
  Star,
  TestTube,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trackClick, trackSearch } from "@/lib/analytics";
import {
  CATEGORIES,
  type Test,
  getAllTests,
} from "@/lib/tests-config";
import {
  formatParticipants,
  shouldShowParticipants,
} from "@/lib/format-participants";

const TESTS_PER_PAGE = 12;
const ALL_CATEGORY = "전체";

interface DynamicTest {
  id: string;
  title: string;
  description: string;
  slug: string;
  category: string;
}

interface TestsPageClientProps {
  dynamicTests?: DynamicTest[];
}

function toTestCard(test: DynamicTest): Test {
  return {
    id: test.id,
    title: test.title,
    description: test.description || "",
    icon: Sparkles,
    href: `/tests/${test.slug}`,
    color: "from-violet-500 to-fuchsia-500",
    participants: "0",
    rating: 5.0,
    badge: "AI",
    category: test.category || "기타",
    tags: ["AI", "New", test.title],
    new: true,
  };
}

function uniqueByHref(tests: Test[]): Test[] {
  const byHref = new Map<string, Test>();
  for (const test of tests) {
    if (!byHref.has(test.href)) byHref.set(test.href, test);
  }
  return Array.from(byHref.values());
}

export default function TestsPageClient({
  dynamicTests = [],
}: TestsPageClientProps) {
  const allTests = uniqueByHref([
    ...dynamicTests.map(toTestCard),
    ...getAllTests(),
  ]);
  const categoryOptions = CATEGORIES.filter(
    (category, index) => index > 0 && category,
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
    if (term.trim()) trackSearch(term);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    trackClick(`category_${category}`, window.location.pathname);
  };

  const filteredTests = allTests.filter((test) => {
    const keyword = searchTerm.toLowerCase();
    const matchesSearch =
      test.title.toLowerCase().includes(keyword) ||
      test.description.toLowerCase().includes(keyword) ||
      test.tags.some((tag) => tag.toLowerCase().includes(keyword));
    const matchesCategory =
      selectedCategory === ALL_CATEGORY || test.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.max(1, Math.ceil(filteredTests.length / TESTS_PER_PAGE));
  const startIndex = (currentPage - 1) * TESTS_PER_PAGE;
  const paginatedTests = filteredTests.slice(
    startIndex,
    startIndex + TESTS_PER_PAGE,
  );
  const visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (page) =>
      page === 1 ||
      page === totalPages ||
      Math.abs(page - currentPage) <= 1,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-cyan-50">
      <section className="px-4 pb-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-sm">
            <div className="flex flex-col gap-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="관심 있는 테스트를 검색해보세요"
                  value={searchTerm}
                  onChange={(event) => handleSearch(event.target.value)}
                  className="h-12 rounded-full border-gray-200 bg-white/50 pl-12 text-lg backdrop-blur-sm transition-all hover:bg-white focus-visible:ring-violet-500"
                />
              </div>

              <div className="border-t pt-4">
                <div className="mb-3 flex items-center gap-2 px-1 text-sm text-gray-500">
                  <span className="font-semibold">카테고리</span>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                    좌우로 스크롤해 확인
                  </span>
                </div>
                <div className="w-full overflow-x-auto rounded-lg pb-2">
                  <div className="flex min-w-max space-x-2 p-1">
                    <Button
                      variant={
                        selectedCategory === ALL_CATEGORY ? "default" : "outline"
                      }
                      onClick={() => handleCategoryFilter(ALL_CATEGORY)}
                      className={`rounded-full px-6 transition-all ${
                        selectedCategory === ALL_CATEGORY
                          ? "scale-105 border-0 bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-md"
                          : "border-gray-200 hover:bg-violet-50 hover:text-violet-600"
                      }`}
                    >
                      전체
                    </Button>
                    {categoryOptions.map((category) => (
                      <Button
                        key={category}
                        variant={
                          selectedCategory === category ? "default" : "outline"
                        }
                        onClick={() => handleCategoryFilter(category)}
                        className={`rounded-full px-5 transition-all ${
                          selectedCategory === category
                            ? "scale-105 border-0 bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-md"
                            : "border-gray-200 hover:bg-violet-50 hover:text-violet-600"
                        }`}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tests-list" className="scroll-mt-24 px-4 pb-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-3xl font-bold">
              <TestTube className="h-6 w-6 text-cyan-500" />
              전체 테스트 ({filteredTests.length}개)
            </h2>
          </div>

          {paginatedTests.length === 0 ? (
            <div className="rounded-2xl bg-white/80 py-12 text-center shadow-lg backdrop-blur-sm">
              <p className="mb-4 text-xl text-gray-600">검색 결과가 없습니다.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory(ALL_CATEGORY);
                }}
              >
                필터 초기화
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {paginatedTests.map((test) => {
                  const TestIcon = test.icon;
                  return (
                    <Link
                      key={test.href}
                      href={test.href}
                      onClick={() =>
                        trackClick(`test_card_${test.id}`, window.location.pathname)
                      }
                    >
                      <Card className="group cursor-pointer overflow-hidden border-2 border-transparent bg-white/90 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-violet-500 hover:shadow-2xl">
                        <CardHeader>
                          <div className="mb-4 flex items-center justify-between">
                            <div
                              className={`rounded-2xl bg-gradient-to-br ${test.color} p-3 shadow-lg`}
                            >
                              <TestIcon className="h-8 w-8 text-white" />
                            </div>
                            {test.badge && (
                              <Badge className="border-0 bg-gradient-to-r from-orange-500 to-red-500 font-bold text-white">
                                {test.badge}
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-2xl font-bold transition-colors group-hover:text-violet-600">
                            {test.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-3 text-base text-gray-600">
                            {test.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between border-t pt-4">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold">{test.rating}</span>
                            </div>
                            {shouldShowParticipants(test.participants) && (
                              <div className="flex items-center gap-1 text-gray-600">
                                <Users className="h-4 w-4" />
                                <span className="text-sm">
                                  {formatParticipants(test.participants)}
                                </span>
                              </div>
                            )}
                          </div>
                          <Button
                            size="sm"
                            className="rounded-full bg-gradient-to-r from-violet-500 to-pink-500 text-white hover:from-violet-600 hover:to-pink-600"
                          >
                            시작하기
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    이전
                  </Button>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {visiblePages.map((page, index) => {
                      const previous = visiblePages[index - 1];
                      const hasGap = previous && page - previous > 1;
                      return (
                        <div key={page} className="flex items-center gap-2">
                          {hasGap && (
                            <span className="px-1 text-sm text-gray-400">...</span>
                          )}
                          <Button
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className={
                              currentPage === page
                                ? "bg-gradient-to-r from-violet-500 to-pink-500"
                                : ""
                            }
                          >
                            {page}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    다음
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
