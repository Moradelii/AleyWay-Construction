import React from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { FinalCTA } from '../components/sections/FinalCTA';
import { FAQSection } from '../components/sections/FAQSection';
import { ArrowRight, HelpCircle, DollarSign, FileCheck, Landmark, AlertCircle } from 'lucide-react';

export const FinancingPage: React.FC = () => {
  const topics = [
    {
      icon: Landmark,
      title: 'Construction-to-Permanent Loans',
      desc: 'How single-close financing locks your permanent interest rate early while providing flexible progress draw disbursements during construction.',
    },
    {
      icon: DollarSign,
      title: 'Land Equity as Down Payment',
      desc: 'If you already own land or have equity in a parcel in Sedgwick County, lenders often credit that value toward your construction down payment.',
    },
    {
      icon: FileCheck,
      title: 'Detailed Itemized Draw Schedules',
      desc: 'Lenders disburse funds in stages (draws) based on verified physical milestones. We provide complete accounting packages to speed bank approvals.',
    },
  ];

  const lenderQuestions = [
    'Does this loan offer a single close (one-time closing costs) or separate construction and permanent closings?',
    'What is the interest rate during the construction period, and is there an option to float down if market rates drop?',
    'How does your inspection and draw disbursement schedule work, and what is the typical turnaround time?',
    'How do you calculate land equity toward the required down payment?',
    'What contingency reserve do you require in the budget for unforeseen changes?',
  ];

  return (
    <div className="pt-24 sm:pt-28">
      <SEOHead
        title="Custom Home Financing & Construction Loans | Aley Way Construction"
        description="Understanding construction-to-permanent loans, land equity, and open-book draw schedules for custom homes in Wichita and Valley Center, KS."
        canonicalPath="/financing/"
        breadcrumbs={[{ name: 'Financing', path: '/financing/' }]}
      />

      <section className="py-16 sm:py-24 bg-[#0d0e11] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: 'Financing' }]} />

          <div className="max-w-3xl mt-6">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-3">
              Investment Guidance
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-tight text-[#f5f2eb] mb-6">
              Planning the Investment Behind Your Home.
            </h1>
            <p className="text-base sm:text-xl font-light text-[#8e9099] leading-relaxed mb-8">
              Navigating custom home financing with clarity. We partner with local Kansas lenders who understand custom draws, open-book accounting, and land equity.
            </p>
            <Button href="/contact/" variant="primary" size="lg" className="group">
              <span>Talk About Your Project</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Core Topics */}
      <section className="py-24 bg-[#0a0b0d]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {topics.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.title} className="p-8 bg-[#111216] border border-white/5 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 text-[#c5a880] mb-6">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h2 className="font-serif text-2xl text-[#f5f2eb] mb-3">
                      {t.title}
                    </h2>
                    <p className="text-sm font-light text-[#8e9099] leading-relaxed">
                      {t.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Questions to Ask Lenders */}
          <div className="p-8 sm:p-12 bg-[#121317] border border-white/10 max-w-4xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-3">
              Homeowner Due Diligence
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#f5f2eb] mb-6">
              Essential Questions to Ask Construction Lenders
            </h3>
            <div className="space-y-4 text-xs sm:text-sm text-[#d8d9de]">
              {lenderQuestions.map((q, idx) => (
                <div key={idx} className="flex items-start space-x-3 pb-3 border-b border-white/5">
                  <span className="font-mono text-xs text-[#c5a880] font-medium shrink-0 mt-0.5">
                    0{idx + 1}
                  </span>
                  <span>{q}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Compliance Disclaimer per Blueprint */}
          <div className="p-6 bg-black/40 border border-white/10 text-xs text-[#8e9099] max-w-4xl mx-auto flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
            <span>
              Disclaimer: Aley Way Construction LLC is a licensed residential general contractor, not a mortgage lender or financial advisor. The information provided is for educational purposes only. Always consult a licensed mortgage broker or financial advisor for personalized loan options.
            </span>
          </div>
        </div>
      </section>

      <FAQSection categoryFilter="financing" />

      <FinalCTA />
    </div>
  );
};
