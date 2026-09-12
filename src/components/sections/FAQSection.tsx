import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqs } from '../../data/faq';

interface FAQSectionProps {
  categoryFilter?: string;
  limit?: number;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ categoryFilter, limit }) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const filteredFaqs = categoryFilter
    ? faqs.filter((f) => f.category === categoryFilter)
    : faqs;

  const displayFaqs = limit ? filteredFaqs.slice(0, limit) : filteredFaqs;

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 bg-[#0e0f12] text-[#f5f2eb] border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center mb-16 pb-6 border-b border-white/10">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-3">
            Common Questions
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#f5f2eb]">
            Frequently Asked Questions.
          </h2>
          <p className="mt-3 text-sm font-light text-[#8e9099] max-w-lg mx-auto">
            Direct, factual answers about our open-book model, custom building phases, and South Central Kansas construction.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {displayFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="border border-white/5 bg-[#111216] transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between space-x-4 cursor-pointer hover:text-[#c5a880] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg sm:text-xl text-[#f5f2eb]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#c5a880] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-white/5">
                    {/* AEO Quick Snippet */}
                    <div className="mb-3 p-3 bg-white/5 border-l-2 border-[#c5a880] text-xs font-medium text-[#c5a880]">
                      {faq.shortAnswer}
                    </div>

                    {/* Detailed Answer */}
                    <p className="text-sm font-light text-[#8e9099] leading-relaxed">
                      {faq.fullAnswer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
