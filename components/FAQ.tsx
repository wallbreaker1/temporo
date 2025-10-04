"use client";

import { useState } from "react";

interface FAQProps {
  title: string;
  faqs: {
    question: string;
    answer: string;
  }[];
}

export default function FAQ({ title, faqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 lg:py-24 bg-black">
      <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-[#D2A55D] mb-6">
            {title}
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group border-4 border-[#D2A55D] bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden"
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 lg:p-8 text-left flex items-center justify-between hover:bg-black/20 transition-colors duration-300"
              >
                <h3 className="text-lg lg:text-xl font-bold text-[#D2A55D] group-hover:text-[#E6B96A] transition-colors duration-300 pr-4">
                  {faq.question}
                </h3>

                {/* Accordion Icon */}
                <div className="flex-shrink-0">
                  <div
                    className={`w-8 h-8 flex items-center justify-center transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  >
                    <svg
                      className="w-6 h-6 text-[#D2A55D] group-hover:text-[#E6B96A] transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Answer */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <div className="px-6 lg:px-8 pb-6 lg:pb-8">
                  <div className="border-t border-[#D2A55D]/30 pt-6">
                    <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
