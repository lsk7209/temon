import type { Metadata } from "next"
import { FAQSection } from "@/components/faq-section"
import { JsonLd, createBreadcrumbSchema, createFAQSchema, createItemListSchema } from "@/components/json-ld"
import TestsPageClient from "./tests-page-client"
import { ALL_TESTS } from "@/lib/tests-config"
import { getDb, isDbAvailable } from "@/lib/db/client"
import { tests } from "@/lib/db/schema"
import { eq, desc } from "drizzle-orm"
import { getListingFAQs } from "@/lib/quiz-seo-utils"

const baseUrl = "https://temon.kr"

const shortDescription =
  "Free personality quizzes and MBTI-style tests on food, habits, sleep, study, and relationships."
const fullDescription =
  "Browse Temon's quiz collection to find short, shareable personality tests across food, habits, relationships, study, sleep, and more. Most quizzes finish in a few minutes and are designed for repeat visits and easy sharing."

export const metadata: Metadata = {
  title: "Quiz Collection | Free Personality Tests | Temon",
  description: shortDescription,
  keywords: "quiz collection, personality test, free quiz, MBTI quiz, temon",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/tests",
  },
  openGraph: {
    title: "Quiz Collection | Free Personality Tests | Temon",
    description: fullDescription,
    type: "website",
    url: `${baseUrl}/tests`,
    siteName: "Temon",
    locale: "ko_KR",
    images: [
      {
        url: `${baseUrl}/og-tests.png`,
        width: 1200,
        height: 630,
        alt: "Temon quiz collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quiz Collection | Free Personality Tests | Temon",
    description: fullDescription,
    images: [`${baseUrl}/og-tests.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default async function TestsPage() {
  let dynamicTests: {
    id: string
    title: string
    description: string | null
    slug: string
    category: string | null
  }[] = []

  if (isDbAvailable()) {
    try {
      const db = getDb()
      const dbTestsData = await db
        .select({
          id: tests.id,
          title: tests.title,
          description: tests.description,
          slug: tests.slug,
          category: tests.category,
        })
        .from(tests)
        .where(eq(tests.status, "published"))
        .orderBy(desc(tests.createdAt))
        .all()

      dynamicTests = dbTestsData
    } catch (error) {
      console.error("Failed to fetch dynamic tests:", error)
    }
  }

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "Quiz Collection", url: `${baseUrl}/tests` },
  ])

  const allTestsForSchema = [
    ...dynamicTests.map((test) => ({
      title: test.title,
      description: test.description || "",
      href: `/tests/${test.slug}`,
      id: test.id,
    })),
    ...ALL_TESTS,
  ]

  const itemListItems = allTestsForSchema.slice(0, 20).map((test) => ({
    name: test.title,
    description: test.description,
    url: `${baseUrl}${test.href}`,
    image: `${baseUrl}/og-tests/${test.id}.png`,
  }))

  const itemListSchema = createItemListSchema(itemListItems)
  const listingFaqs = getListingFAQs()
  const faqSchema = createFAQSchema(listingFaqs)

  return (
    <>
      <JsonLd id="tests-breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="tests-itemlist-schema" data={itemListSchema} />
      <JsonLd id="tests-faq-schema" data={faqSchema} />

      <TestsPageClient
        dynamicTests={dynamicTests.map((test) => ({
          ...test,
          description: test.description || "",
          category: test.category || "other",
        }))}
      />

      <section className="container max-w-4xl mx-auto px-4 pb-16">
        <div className="rounded-3xl bg-white/80 p-8 shadow-lg backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How To Use The Quiz Collection</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Start with a topic you already care about, then compare completion, share, and repeat behavior.
            Short quizzes with clear themes usually perform best for both search entry and social circulation.
          </p>
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Search Landing</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Topic-driven quiz pages work best when the title, intro, and result page all match the same intent.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Fast Completion</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Most quizzes finish quickly, which helps mobile visitors complete, share, and continue to a second quiz.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Repeat Visits</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                The strongest growth comes from moving visitors between related themes such as food, habits, study, and relationships.
              </p>
            </div>
          </div>
          <FAQSection faqs={listingFaqs} className="max-w-none" />
        </div>
      </section>
    </>
  )
}
