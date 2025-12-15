/**
 * FAQ Section Component for AI Bot Optimization (GEO)
 * 
 * Uses semantic HTML (<details> and <summary>) to help AI bots
 * understand and extract FAQ content for snippets.
 */

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  /**
   * Array of FAQ items
   */
  faqs: FAQItem[]
  
  /**
   * Optional title for the FAQ section
   */
  title?: string
  
  /**
   * Optional className for styling
   */
  className?: string
}

/**
 * FAQ Section Component
 * 
 * This component uses semantic HTML (<details> and <summary>) which
 * is preferred by AI search engines like ChatGPT and Perplexity for
 * extracting FAQ content.
 * 
 * @example
 * ```tsx
 * <FAQSection
 *   title="자주 묻는 질문"
 *   faqs={[
 *     {
 *       question: "이 테스트는 무료인가요?",
 *       answer: "네, 모든 테스트는 완전 무료로 이용하실 수 있습니다."
 *     }
 *   ]}
 * />
 * ```
 */
export function FAQSection({ faqs, title = "자주 묻는 질문", className = "" }: FAQSectionProps) {
  if (!faqs || faqs.length === 0) {
    return null
  }

  return (
    <section className={`faq-section ${className}`} aria-label="자주 묻는 질문">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="faq-item border rounded-lg p-4 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow"
          >
            <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
              <span className="flex-1">{faq.question}</span>
              <span className="text-gray-400 ml-4">▼</span>
            </summary>
            <div className="mt-4 pt-4 border-t text-gray-700 leading-relaxed">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}

