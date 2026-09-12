import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { FinalCTA } from '../components/sections/FinalCTA';
import { FAQSection } from '../components/sections/FAQSection';
import { Check, ArrowRight, Receipt, FileSpreadsheet, Eye, Scale, HelpCircle } from 'lucide-react';
import { contentService } from '../services/contentService';

export const OpenBookPricingPage: React.FC = () => {
  const [data, setData] = useState(() => contentService.getPage('openBookPricing'));

  useEffect(() => {
    const unsub = contentService.subscribe(() => {
      setData(contentService.getPage('openBookPricing'));
    });
    return () => unsub();
  }, []);

  const sections = data.pillars || [];
  const questionsToAsk = data.auditQuestions || [];

  return (
    <div className="pt-24 sm:pt-28">
      <SEOHead
        title="Open Book Pricing Explained | Aley Way Construction"
        description="Learn how Aley Way's open-book pricing works: raw subcontractor bids, real invoices, transparent allowances, and fixed builder management fees in Wichita, KS."
        canonicalPath="/open-book-pricing/"
        breadcrumbs={[{ name: 'Open Book Pricing', path: '/open-book-pricing/' }]}
      />

      <section className="py-16 sm:py-24 bg-[#0d0e11] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: 'Open Book Pricing' }]} />

          <div className="max-w-3xl mt-6">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-3">
              {data.heroEyebrow || 'Total Financial Transparency'}
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-tight text-[#f5f2eb] mb-6">
              {data.heroTitle}
            </h1>
            <p className="text-base sm:text-xl font-light text-[#8e9099] leading-relaxed mb-8">
              {data.heroSubtitle}
            </p>
            <Button href="/contact/" variant="primary" size="lg" className="group">
              <span>Discuss Your Project</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Core Elements Grid */}
      <section className="py-24 bg-[#0a0b0d]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {sections.map((sec, i) => (
              <div key={sec.title} className="p-8 sm:p-10 bg-[#111216] border border-white/5 hover:border-[#c5a880]/30 transition-all">
                <span className="text-xs font-semibold tracking-[0.2em] text-[#c5a880] uppercase block mb-2">
                  Principle 0{i + 1}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#f5f2eb] mb-4">
                  {sec.title}
                </h2>
                <p className="text-sm font-light text-[#8e9099] leading-relaxed">
                  {sec.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Due Diligence Questions */}
          {questionsToAsk.length > 0 && (
            <div className="p-8 sm:p-12 bg-[#121317] border border-white/10 max-w-4xl mx-auto">
              <div className="flex items-center space-x-2 text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase mb-3">
                <HelpCircle className="w-4 h-4 text-[#c5a880]" />
                <span>Consumer Checklist</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#f5f2eb] mb-6">
                Questions to Ask Any Custom Builder Before Signing
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-[#d8d9de]">
                {questionsToAsk.map((q, idx) => (
                  <div key={idx} className="flex items-start space-x-3 pb-3 border-b border-white/5">
                    <span className="font-mono text-xs text-[#c5a880] font-medium shrink-0 mt-0.5">
                      0{idx + 1}
                    </span>
                    <span>{q}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <FAQSection categoryFilter="pricing" />

      <FinalCTA />
    </div>
  );
};
