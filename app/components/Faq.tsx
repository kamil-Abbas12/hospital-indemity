"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What is Hospital Indemnity Insurance?",
    a: "It is a supplemental insurance plan that pays a cash benefit when you are admitted to a hospital for a covered stay. The money is paid directly to you unless otherwise assigned.",
  },
  {
    q: "Do I need health insurance to qualify?",
    a: "Eligibility requirements vary by plan and state. A licensed insurance specialist can help you understand your options.",
  },
  {
    q: "Is there any obligation?",
    a: "No. Requesting information is 100% free and you are under no obligation to purchase a plan.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <h2 className="font-display font-semibold text-navy text-2xl sm:text-3xl text-center">
        Frequently Asked Questions
      </h2>
      <div className="w-16 h-1 bg-gold mx-auto mt-3 mb-10 rounded-full" />

      <div className="grid md:grid-cols-3 gap-4">
        {faqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={item.q}
              className="bg-white border border-gray-200 rounded-xl p-5"
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-start justify-between gap-3 text-left"
              >
                <span className="font-bold text-navy text-sm sm:text-base">
                  {item.q}
                </span>
                <span className="shrink-0 w-6 h-6 rounded-full bg-teal text-white flex items-center justify-center">
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