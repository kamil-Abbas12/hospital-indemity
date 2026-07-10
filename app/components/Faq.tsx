"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What is Hospital Indemnity Insurance?",
    a: "Hospital Indemnity Insurance is a supplemental insurance plan that pays a fixed cash benefit when you're admitted to a hospital for a covered stay. Unlike major medical insurance, the cash is paid directly to you and can be used for deductibles, copays, rent, groceries, or any other expense.",
  },
  {
    q: "Do I need existing health insurance to qualify?",
    a: "Eligibility for hospital indemnity plans varies by carrier and state. Many plans are available whether or not you currently have major medical coverage. A licensed insurance specialist can walk you through exact eligibility requirements for your situation.",
  },
  {
    q: "How much does hospital indemnity insurance cost?",
    a: "Hospital indemnity insurance plans are typically priced to be affordable supplements to existing coverage, with monthly premiums that vary based on age, state, and benefit level. Get a free, personalized quote to see exact pricing.",
  },
  

];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="text-center mb-12">
        <span className="text-teal font-bold text-xs tracking-widest uppercase">
          Got Questions?
        </span>
        <h2 className="font-display font-semibold text-navy text-2xl sm:text-3xl mt-2">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={item.q}
              className={`bg-white border rounded-xl px-5 py-4 transition-colors ${
                isOpen ? "border-teal shadow-md" : "border-gray-200"
              }`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-3 text-left"
              >
                <span className="font-bold text-navy text-sm sm:text-base">
                  {item.q}
                </span>
                <span
                  className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                    isOpen ? "bg-teal text-white" : "bg-navy/5 text-navy"
                  }`}
                >
                  {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </span>
              </button>
              {isOpen && (
                <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                  {item.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}