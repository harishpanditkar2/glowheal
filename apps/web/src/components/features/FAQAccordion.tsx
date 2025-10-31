'use client';

import { useState } from 'react';
import { SchemaRenderer } from '@/components/schema/SchemaRenderer';
import { buildFAQPageSchema } from '@/lib/schema-builders';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
  title?: string;
  description?: string;
}

/**
 * FAQAccordion component with JSON-LD schema for SEO
 * Automatically injects FAQPage structured data for rich results in Google
 */
export function FAQAccordion({ faqs, title, description }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate FAQ schema for SEO
  const faqSchema = buildFAQPageSchema(faqs);

  return (
    <div className="w-full">
      {/* Inject FAQ Schema */}
      <SchemaRenderer schema={faqSchema} />

      {/* Section Header */}
      {(title || description) && (
        <div className="text-center mb-8">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold font-display text-forest-700 mb-4">
              {title}
            </h2>
          )}
          {description && <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>}
        </div>
      )}

      {/* FAQ Items */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-2 border-mist-200 rounded-lg overflow-hidden transition-all duration-300 hover:border-jade-300"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-jade-50 transition-colors"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="font-semibold text-forest-700 pr-4">{faq.question}</span>
              <svg
                className={`w-5 h-5 text-jade-600 flex-shrink-0 transform transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              id={`faq-answer-${index}`}
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="p-5 pt-0 bg-gray-50">
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
