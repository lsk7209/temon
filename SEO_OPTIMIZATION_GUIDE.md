# SEO/AEO/GEO Optimization Guide

This guide outlines the standard procedure for optimizing test introduction pages for Search Engines (SEO), Answer Engines (AEO), and Generative Engines (GEO).

## 🎯 Optimization Goals
1.  **SEO (Search Engine Optimization)**: Rank higher in traditional search results.
2.  **AEO (Answer Engine Optimization)**: Appear in "People also ask" and voice search answers.
3.  **GEO (Generative Engine Optimization)**: Be cited by AI models (ChatGPT, Gemini, Perplexity).

## 📋 Checklist for Each Test Page

### 1. Imports
Ensure the following components are imported:
```tsx
import Script from "next/script"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ExternalLink } from "lucide-react"
```

### 2. Schema Markup (JSON-LD)
Add `FAQPage` schema to the component body. This helps Google understand the Q&A structure.
```tsx
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Question 1?",
      "acceptedAnswer": { "@type": "Answer", "text": "Answer 1" }
    },
    // Add 2-3 relevant questions
  ]
}
```
Inject it using `next/script`:
```tsx
<Script
  id="faq-schema"
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
/>
```

### 3. FAQ UI Section
Add a visible FAQ section using the `Accordion` component. This improves user engagement and provides content for crawlers.
```tsx
<div className="bg-white rounded-2xl shadow-xl p-8 mt-8 text-left">
  <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ 자주 묻는 질문</h2>
  <Accordion type="single" collapsible className="w-full">
    {/* Accordion Items matching the Schema */}
  </Accordion>
</div>
```

### 4. Outlinks (E-E-A-T)
Add at least one external link to a high-authority domain (Wikipedia, Namuwiki, Academic source) related to the topic. This signals "Trust" to search engines.
```tsx
<div className="mt-8 pt-6 border-t border-gray-200">
  <h3 className="text-lg font-semibold text-gray-900 mb-2">관련 정보</h3>
  <a 
    href="https://ko.wikipedia.org/wiki/TOPIC" 
    target="_blank" 
    rel="noopener noreferrer"
    className="inline-flex items-center text-blue-600 hover:underline"
  >
    Learn more about TOPIC <ExternalLink className="ml-1 h-4 w-4" />
  </a>
</div>
```

### 5. Meta Tags
Ensure `metadata` export includes:
- **Title**: "[Test Name] - [Keywords] | [Brand]"
- **Description**: Compelling summary with keywords at the start.
- **Keywords**: Comma-separated list.
- **Canonical**: `alternates: { canonical: "/tests/..." }`

## 🚀 Applied Pages (Examples)
- `coffee-mbti`
- `kdrama-mbti`
- `snowwhite-mbti`
- `ramen-mbti`
- `pet-mbti`
- `study-mbti`

Use these files as templates for updating the remaining tests.
