import { describe, it, expect } from "vitest";
import {
  generateQuizSchemas,
  getDefaultQuizFAQs,
  generateQuizMetadata,
  type QuizSEOConfig,
} from "@/lib/quiz-seo-utils";

describe("getDefaultQuizFAQs", () => {
  it("기본 FAQ 4개를 생성하고 퀴즈 제목을 올바르게 보간해야 한다", () => {
    const title = "커피 MBTI 테스트";
    const faqs = getDefaultQuizFAQs(title);

    expect(faqs).toHaveLength(4);
    expect(faqs[0].question).toContain(title);
    expect(faqs[0].answer).toContain("12개의 간단한 질문");
    expect(faqs[1].question).toContain(title);
    expect(faqs[1].answer).toContain("16가지 유형");
    expect(faqs[2].question).toContain("무료");
    expect(faqs[3].question).toContain("공유");
  });
});

describe("generateQuizSchemas", () => {
  const sampleConfig: QuizSEOConfig = {
    quizId: "coffee-mbti",
    title: "커피 MBTI 테스트",
    shortDescription: "커피 취향으로 알아보는 나의 성격",
    fullDescription: "커피 MBTI 테스트로 나의 16가지 커피 성향을 알아보세요.",
    keywords: "커피, MBTI",
    canonical: "/tests/coffee-mbti",
    questionCount: 12,
    duration: "PT3M",
  };

  it("Quiz와 Breadcrumb JSON-LD 스키마를 유효한 Schema.org 포맷으로 생성해야 한다", () => {
    const schemas = generateQuizSchemas(sampleConfig);

    expect(schemas.quiz).toBeDefined();
    expect(schemas.quiz["@context"]).toBe("https://schema.org");
    expect(schemas.quiz["@type"]).toBe("Quiz");
    expect(schemas.quiz.name).toBe(sampleConfig.title);
    expect(schemas.quiz.url).toBe(`https://temon.kr${sampleConfig.canonical}`);

    expect(schemas.breadcrumb).toBeDefined();
    expect(schemas.breadcrumb["@type"]).toBe("BreadcrumbList");
    expect(schemas.breadcrumb.itemListElement).toHaveLength(3);
    expect(schemas.breadcrumb.itemListElement[0].name).toBe("홈");
    expect(schemas.breadcrumb.itemListElement[1].name).toBe("테스트 모음");
    expect(schemas.breadcrumb.itemListElement[2].name).toBe(sampleConfig.title);
  });

  it("faqs가 제공되면 FAQPage 스키마를 포함해야 한다", () => {
    const faqs = [
      { question: "질문 1", answer: "답변 1" },
      { question: "질문 2", answer: "답변 2" },
    ];
    const schemas = generateQuizSchemas({ ...sampleConfig, faqs });

    expect(schemas.faq).toBeDefined();
    expect(schemas.faq!["@type"]).toBe("FAQPage");
    expect(schemas.faq!.mainEntity).toHaveLength(2);
    expect(schemas.faq!.mainEntity[0].name).toBe("질문 1");
    expect(schemas.faq!.mainEntity[0].acceptedAnswer.text).toBe("답변 1");
  });

  it("faqs가 없으면 faq 스키마 속성이 undefined여야 한다", () => {
    const schemas = generateQuizSchemas(sampleConfig);
    expect(schemas.faq).toBeUndefined();
  });
});

describe("generateQuizMetadata", () => {
  it("Next.js Metadata 규격에 맞는 canonical 및 OpenGraph 속성을 반환해야 한다", () => {
    const meta = generateQuizMetadata({
      quizId: "sample-quiz",
      title: "샘플 퀴즈",
      shortDescription: "짧은 설명",
      fullDescription: "상세한 설명입니다.",
      keywords: "샘플, 퀴즈",
      canonical: "/tests/sample-quiz",
    });

    expect(meta.title).toContain("샘플 퀴즈");
    expect(meta.description).toBe("짧은 설명");
    expect(meta.alternates?.canonical).toBe("/tests/sample-quiz");
    expect(meta.openGraph?.title).toContain("샘플 퀴즈");
    expect(meta.openGraph?.url).toBe("https://temon.kr/tests/sample-quiz");
  });
});
