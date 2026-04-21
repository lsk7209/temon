/**
 * Quiz Page SEO Utilities
 * Reusable functions for generating SEO metadata and structured data for quiz pages
 */

import type { Metadata } from "next";
import {
  createQuizSchema,
  createBreadcrumbSchema,
  createFAQSchema,
} from "@/components/json-ld";

const baseUrl = "https://temon.kr";

export interface QuizSEOConfig {
  quizId: string;
  title: string;
  shortDescription: string; // Naver-optimized (under 80 chars)
  fullDescription: string; // Full description for Google/AI
  keywords: string;
  canonical: string;
  questionCount?: number;
  duration?: string;
  image?: string;
  faqs?: Array<{ question: string; answer: string }>;
}

/**
 * Generate metadata for quiz pages
 */
export function generateQuizMetadata(config: QuizSEOConfig): Metadata {
  const fullUrl = `${baseUrl}${config.canonical}`;
  const ogImage =
    config.image ||
    `${baseUrl}/api/og?title=${encodeURIComponent(config.title)}&desc=${encodeURIComponent(config.shortDescription)}`;

  return {
    title: `${config.title} | 무료 성격 테스트 | 테몬`,
    description: config.shortDescription, // Naver-optimized
    keywords: config.keywords,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: config.canonical,
    },
    openGraph: {
      title: `${config.title} | 무료 성격 테스트`,
      description: config.fullDescription, // Full description for OG
      type: "website",
      url: fullUrl,
      siteName: "테몬",
      locale: "ko_KR",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${config.title} | 무료 성격 테스트`,
      description: config.fullDescription,
      images: [ogImage],
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
  };
}

/**
 * Generate structured data schemas for quiz pages
 */
export function generateQuizSchemas(config: QuizSEOConfig): {
  quiz: Record<string, any>;
  breadcrumb: Record<string, any>;
  faq?: Record<string, any>;
} {
  const fullUrl = `${baseUrl}${config.canonical}`;

  const quizSchema = createQuizSchema({
    name: config.title,
    description: config.fullDescription,
    url: fullUrl,
    questionCount: config.questionCount,
    duration: config.duration || "PT3M",
    image: config.image || `${baseUrl}/og-tests/${config.quizId}.png`,
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "홈", url: baseUrl },
    { name: "테스트 모음", url: `${baseUrl}/tests` },
    { name: config.title, url: fullUrl },
  ]);

  const schemas: {
    quiz: Record<string, any>;
    breadcrumb: Record<string, any>;
    faq?: Record<string, any>;
  } = {
    quiz: quizSchema,
    breadcrumb: breadcrumbSchema,
  };

  // Add FAQ schema if FAQs are provided
  if (config.faqs && config.faqs.length > 0) {
    schemas.faq = createFAQSchema(config.faqs);
  }

  return schemas;
}

/**
 * Default FAQ items for quiz pages
 */
export function getDefaultQuizFAQs(
  quizTitle: string,
): Array<{ question: string; answer: string }> {
  return [
    {
      question: `${quizTitle}는 어떻게 진행되나요?`,
      answer: `12개의 간단한 질문에 답변하시면 됩니다. 각 질문은 일상적인 선택 상황을 제시하며, 솔직하게 답변하시면 더 정확한 결과를 얻을 수 있습니다. 소요 시간은 약 3분입니다.`,
    },
    {
      question: `${quizTitle} 결과는 몇 가지 유형이 있나요?`,
      answer: `총 16가지 유형이 있습니다. 각 유형은 MBTI의 16가지 성격 유형을 기반으로 하며, 당신의 선택에 따라 나의 성격 특성을 재미있게 알아볼 수 있습니다.`,
    },
    {
      question: "이 테스트는 무료인가요?",
      answer:
        "네, 모든 테스트는 완전 무료로 이용하실 수 있습니다. 회원가입이나 결제 없이 바로 시작하실 수 있습니다.",
    },
    {
      question: "테스트 결과를 공유할 수 있나요?",
      answer:
        "네, 테스트 결과는 SNS(카카오톡, 페이스북, 트위터 등)를 통해 공유하실 수 있습니다. 친구들과 함께 재미있는 결과를 비교해보세요!",
    },
  ];
}

export function getIntroHighlights(quizTitle: string): string[] {
  return [
    `${quizTitle}는 회원가입·결제 없이 빠르게 완료할 수 있어요.`,
    "실제 습관을 기반으로 답하면 이상적인 자아보다 더 정확한 결과를 얻을 수 있어요.",
    "나중에 다시 해보면 상황·기분·타이밍에 따라 성향이 어떻게 달라지는지 확인할 수 있어요.",
  ];
}

export function getIntroUseCases(quizTitle: string): string[] {
  return [
    `${quizTitle}는 명확한 주제와 빠른 결과를 원하는 분께 딱 맞아요.`,
    "결과를 친구·파트너와 공유하며 비교해보고 싶을 때도 유용해요.",
    "다른 테스트와 비교해서 같은 성향 패턴이 반복되는지 확인하는 데도 좋아요.",
  ];
}

export function getIntroLandingParagraphs(quizTitle: string): string[] {
  const lowerTitle = quizTitle.toLowerCase();

  if (lowerTitle.includes("k-drama") || lowerTitle.includes("드라마")) {
    return [
      "드라마 캐릭터 유형이 실제 사회적 행동과 어떻게 연결되는지 알고 싶은 분께 최적이에요.",
      "갈등·연애·그룹 상황에서 나의 반응을 비교하는 게 가장 강력한 활용 방법이에요. 단순한 팬덤 레이블이 아닌 행동 패턴에 가까운 결과를 얻을 수 있어요.",
    ];
  }

  if (
    lowerTitle.includes("idol") ||
    lowerTitle.includes("아이돌") ||
    lowerTitle.includes("k-pop")
  ) {
    return [
      "팀·친구 모임 속에서 내가 자연스럽게 맡는 역할을 빠르게 알고 싶은 분께 잘 맞아요.",
      "셀럽 팬덤이 아닌 실제 그룹 내 에너지 방향이 포인트예요. 리더·비주얼·퍼포머·분위기 메이커 중 어디에 해당하는지 확인해보세요.",
    ];
  }

  if (lowerTitle.includes("pet") || lowerTitle.includes("반려")) {
    return [
      "감정 스타일·루틴 성향·동행 욕구를 동물 매칭으로 가볍게 파악하고 싶을 때 유용해요.",
      "실제 일상 리듬·감수성·원하는 상호작용 수준과 비교할수록 더 가치 있는 결과가 나와요.",
    ];
  }

  if (lowerTitle.includes("ramen") || lowerTitle.includes("라면")) {
    return [
      "익숙한 음식 선택 패턴과 성격 해석을 연결하는 테스트예요.",
      "메뉴 자체보다 어떻게 커스텀하고, 단순화하고, 반복하는가가 핵심 신호예요. 그 부분에서 결과가 실용적으로 연결돼요.",
    ];
  }

  if (lowerTitle.includes("study") || lowerTitle.includes("공부")) {
    return [
      "집중·반복·필기·시험 준비에 실제로 적용할 수 있는 공부 스타일 분석을 원하는 분께 딱이에요.",
      "이상적인 모습이 아닌 실제 학습 루틴과 비교할 때 가장 유용한 결과를 얻을 수 있어요.",
    ];
  }

  if (lowerTitle.includes("alarm") || lowerTitle.includes("기상")) {
    return [
      "알람 습관을 단순한 의지력 문제가 아닌 루틴 설계 관점에서 이해하는 데 도움이 돼요.",
      "알람 방식·기상 후 첫 행동·저녁 마무리 습관을 하나의 루프로 비교해보면 더 실용적인 결과를 얻을 수 있어요.",
    ];
  }

  return [
    `${quizTitle}는 짧은 선택지를 통해 나만의 습관·성격 패턴을 빠르게 파악하는 테스트예요.`,
    "결과는 현재 나의 선호 패턴을 실용적으로 해석하는 도구로 활용하세요. 이상적인 자아보다 실제 반복 행동에 기반해 답할 때 더 정확해요.",
  ];
}

export function getListingFAQs(): Array<{ question: string; answer: string }> {
  return [
    {
      question: "Which quiz topics perform best on Temon?",
      answer:
        "Short quizzes with strong daily-life topics such as food, habits, sleep, study, and relationships usually perform best for both search entry and social sharing.",
    },
    {
      question: "Are the quizzes on the tests page free?",
      answer:
        "Yes. The quiz collection can be browsed and started immediately without payment, and most quizzes are designed to finish within a few minutes.",
    },
    {
      question: "How should I choose my first quiz?",
      answer:
        "Start from a topic you already care about. Strong topic relevance usually improves completion rate, result sharing, and repeat visits.",
    },
  ];
}

export function getDefaultResultFAQs(
  quizTitle: string,
  resultName: string,
): Array<{ question: string; answer: string }> {
  return [
    {
      question: `What does ${resultName} mean in ${quizTitle}?`,
      answer: `${resultName} describes the dominant preference pattern detected by the quiz. It should be used as a practical interpretation aid, not a fixed identity label.`,
    },
    {
      question: "Can this result change if I retake the quiz?",
      answer:
        "Yes. Changes in mood, context, or decision criteria can change the result. That is useful signal about situational preference, not necessarily inconsistency.",
    },
    {
      question: "How should I use this result page?",
      answer:
        "Use the traits, watchouts, and recommendations as a quick reference. The best next step is to compare the result with your real behavior and share it with someone who knows you well.",
    },
  ];
}

export function generateMbtiResultMetadata(config: {
  quizTitle: string;
  resultName: string;
  resultCode: string;
  summary: string;
  canonical: string;
}): Metadata {
  const fullUrl = `${baseUrl}${config.canonical}`;
  const title = `${config.quizTitle} Result: ${config.resultName} (${config.resultCode}) | Temon`;

  return {
    title,
    description: config.summary,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: config.canonical,
    },
    openGraph: {
      title,
      description: config.summary,
      type: "website",
      url: fullUrl,
      siteName: "Temon",
      locale: "ko_KR",
      images: [
        {
          url: `${baseUrl}/api/og?title=${encodeURIComponent(config.resultName)}&desc=${encodeURIComponent(config.resultCode)}`,
          width: 1200,
          height: 630,
          alt: config.resultName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: config.summary,
      images: [
        `${baseUrl}/api/og?title=${encodeURIComponent(config.resultName)}&desc=${encodeURIComponent(config.resultCode)}`,
      ],
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
  };
}

export function generateGenericResultMetadata(config: {
  quizTitle: string;
  title: string;
  description: string;
  canonical: string;
}): Metadata {
  const fullUrl = `${baseUrl}${config.canonical}`;

  return {
    title: `${config.quizTitle} Result | ${config.title} | Temon`,
    description: config.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: config.canonical,
    },
    openGraph: {
      title: `${config.quizTitle} Result | ${config.title} | Temon`,
      description: config.description,
      type: "website",
      url: fullUrl,
      siteName: "Temon",
      locale: "ko_KR",
      images: [
        {
          url: `${baseUrl}/api/og?title=${encodeURIComponent(config.quizTitle)}&desc=${encodeURIComponent(config.title)}`,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${config.quizTitle} Result | ${config.title} | Temon`,
      description: config.description,
      images: [
        `${baseUrl}/api/og?title=${encodeURIComponent(config.quizTitle)}&desc=${encodeURIComponent(config.title)}`,
      ],
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
  };
}

/**
 * Generate metadata for test pages (/test/page.tsx)
 * These are client component pages, so we need a server wrapper
 */
export function generateTestPageMetadata(config: {
  quizId: string;
  quizTitle: string;
  shortDescription: string;
  fullDescription: string;
  keywords: string;
  canonical: string;
}): Metadata {
  const baseUrl = "https://temon.kr";
  const fullUrl = `${baseUrl}${config.canonical}`;

  return {
    title: `${config.quizTitle} 테스트 진행 | 무료 성격 테스트 | 테몬`,
    description: config.shortDescription,
    keywords: config.keywords,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: config.canonical,
    },
    openGraph: {
      title: `${config.quizTitle} 테스트 진행`,
      description: config.fullDescription,
      type: "website",
      url: fullUrl,
      siteName: "테몬",
      locale: "ko_KR",
      images: [
        {
          url: `${baseUrl}/api/og?title=${encodeURIComponent(config.quizTitle)}&desc=${encodeURIComponent("지금 바로 테스트를 시작해보세요!")}`,
          width: 1200,
          height: 630,
          alt: config.quizTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${config.quizTitle} 테스트 진행`,
      description: config.fullDescription,
      images: [
        `${baseUrl}/api/og?title=${encodeURIComponent(config.quizTitle)}&desc=${encodeURIComponent("지금 바로 테스트를 시작해보세요!")}`,
      ],
    },
    robots: {
      index: false, // 테스트 진행 페이지는 인덱싱하지 않음
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
  };
}

/**
 * Generate metadata for result pages (/test/result/page.tsx)
 */
export function generateResultPageMetadata(config: {
  quizId: string;
  quizTitle: string;
  resultType?: string;
  shortDescription: string;
  fullDescription: string;
  keywords: string;
  canonical: string;
}): Metadata {
  const baseUrl = "https://temon.kr";
  const fullUrl = `${baseUrl}${config.canonical}`;
  const title = config.resultType
    ? `${config.quizTitle} 결과 - ${config.resultType} 유형 | 테몬`
    : `${config.quizTitle} 결과 | 무료 성격 테스트 | 테몬`;

  return {
    title,
    description: config.shortDescription,
    keywords: config.keywords,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: config.canonical,
    },
    openGraph: {
      title,
      description: config.fullDescription,
      type: "website",
      url: fullUrl,
      siteName: "테몬",
      locale: "ko_KR",
      images: [
        {
          url: `${baseUrl}/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent("나의 결과는?")}`,
          width: 1200,
          height: 630,
          alt: `${config.quizTitle} 결과`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: config.fullDescription,
      images: [
        `${baseUrl}/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent("나의 결과는?")}`,
      ],
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
  };
}

/**
 * Generate unique title and description for test pages
 * Prevents duplicate title/description issues in Naver Webmaster Tools
 */
export function generateUniqueTestMetadata(config: {
  testName: string;
  testCategory: string;
  testDescription: string;
  keywords: string;
  canonical: string;
}): Metadata {
  const baseUrl = "https://temon.kr";
  const fullUrl = `${baseUrl}${config.canonical}`;

  // 고유한 제목 생성 (40-60자 최적화)
  const uniqueTitle = `${config.testName} - ${config.testCategory}으로 알아보는 성격 유형 | 테몬`;

  // Naver 최적화: 80자 이하 설명
  let shortDescription = config.testDescription;
  if (shortDescription.length > 80) {
    shortDescription = shortDescription.substring(0, 77) + "...";
  }

  // 전체 설명 (140-160자 최적화, OpenGraph용)
  let fullDescription = `${config.testName} 테스트로 알아보는 나의 성격 유형. ${config.testDescription} 12문항, 약 3분 소요, 결과 공유 이미지 자동 생성.`;
  if (fullDescription.length < 140) {
    fullDescription = `${config.testName} 테스트로 알아보는 나의 성격 유형. ${config.testDescription} 12개의 질문에 답변하여 16가지 성격 유형 중 당신의 유형을 알아보세요. 약 3분 소요되며, 결과를 친구들과 공유할 수 있습니다.`;
  } else if (fullDescription.length > 160) {
    fullDescription = fullDescription.substring(0, 157) + "...";
  }

  return {
    title: uniqueTitle,
    description: shortDescription,
    keywords: config.keywords,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: config.canonical,
    },
    openGraph: {
      title: uniqueTitle,
      description: fullDescription,
      type: "website",
      url: fullUrl,
      siteName: "테몬",
      locale: "ko_KR",
      images: [
        {
          url: `${baseUrl}/api/og?title=${encodeURIComponent(config.testName)}&desc=${encodeURIComponent(shortDescription)}`,
          width: 1200,
          height: 630,
          alt: config.testName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: uniqueTitle,
      description: fullDescription,
      images: [
        `${baseUrl}/api/og?title=${encodeURIComponent(config.testName)}&desc=${encodeURIComponent(shortDescription)}`,
      ],
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
  };
}
