import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { FinalCTA } from '../components/sections/FinalCTA';
import { ArrowRight, ChevronDown, CheckCircle2 } from 'lucide-react';
import { contentService } from '../services/contentService';

export const ProcessPage: React.FC = () => {
  const [data, setData] = useState(() => contentService.getPage('process'));

  useEffect(() => {
    const unsub = contentService.subscribe(() => {
      setData(contentService.getPage('process'));
    });
    return () => unsub();
  }, []);

  const steps = (data as any)?.phases || (data as any)?.steps || [];
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="pt-24 sm:pt-28">
      <SEOHead
        title="Custom Home Building Process | Aley Way Construction"
        description="Learn our step-by-step custom homebuilding roadmap: from discovery and land analysis to open-book budgeting, framing, and final walk-through."
        canonicalPath="/our-process/"
        breadcrumbs={[{ name: 'Our Process', path: '/our-process/' }]}
      />

      {/* Header with architectural backdrop */}
      <section className="relative py-20 sm:py-28 bg-[#0d0e11] border-b border-white/5 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url('${(data as any)?.heroBgImage || (data as any)?.bgImage || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=85'}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0e11] via-[#0d0e11]/90 to-[#0d0e11]/50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e11] via-transparent to-[#0d0e11]/60 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: 'Our Process' }]} />

          <div className="max-w-3xl mt-6">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-3">
              {data.heroEyebrow || 'Transparent Methodology'}
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-tight text-[#f5f2eb] mb-6">
              {data.heroTitle}
            </h1>
            <p className="text-base sm:text-xl font-light text-[#8e9099] leading-relaxed mb-8">
              {data.heroSubtitle}
            </p>
            <Button href="/contact/" variant="primary" size="lg" className="group">
              <span>Plan Your Project</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Detailed Timeline Sequence */}
      <section className="py-24 bg-[#0a0b0d]">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-12">
          {steps.map((s, idx) => (
            <div
              key={s.num}
              className="relative overflow-hidden p-8 sm:p-10 bg-[#111216] border border-white/10 hover:border-[#c5a880]/50 transition-all duration-300 group"
            >
              {/* Subtle architectural background image for each stage */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 group-hover:scale-105 transition-all duration-700 pointer-events-none"
                style={{ backgroundImage: `url('${s.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#111216] via-[#111216]/95 to-[#111216]/80 pointer-events-none" />

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center space-x-4">
                  <span className="font-serif text-3xl sm:text-4xl text-[#c5a880] font-light">
                    {s.num}
                  </span>
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#f5f2eb]">
                      {s.title}
                    </h2>
                    <span className="text-xs text-[#c5a880] tracking-wider uppercase font-medium">
                      {s.subtitle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 self-start sm:self-auto">
                  <span className="text-[10px] tracking-widest uppercase bg-white/5 px-3 py-1 text-[#8e9099] border border-white/10">
                    Stage {idx + 1} of 9
                  </span>
                </div>
              </div>

              {/* 4 Essential Fields as mandated in Master Blueprint */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 text-xs sm:text-sm">
                <div className="p-4 bg-black/60 backdrop-blur-sm border border-white/5">
                  <span className="text-[11px] font-semibold tracking-wider text-[#c5a880] uppercase block mb-1.5">
                    What Happens
                  </span>
                  <p className="font-light text-[#d8d9de] leading-relaxed">
                    {s.happens}
                  </p>
                </div>

                <div className="p-4 bg-black/60 backdrop-blur-sm border border-white/5">
                  <span className="text-[11px] font-semibold tracking-wider text-[#c5a880] uppercase block mb-1.5">
                    What You Decide
                  </span>
                  <p className="font-light text-[#d8d9de] leading-relaxed">
                    {s.decide}
                  </p>
                </div>

                <div className="p-4 bg-black/60 backdrop-blur-sm border border-white/5">
                  <span className="text-[11px] font-semibold tracking-wider text-[#c5a880] uppercase block mb-1.5">
                    What Aley Way Handles
                  </span>
                  <p className="font-light text-[#d8d9de] leading-relaxed">
                    {s.handles}
                  </p>
                </div>

                <div className="p-4 bg-black/60 backdrop-blur-sm border border-white/5">
                  <span className="text-[11px] font-semibold tracking-wider text-[#c5a880] uppercase block mb-1.5">
                    What Happens Next
                  </span>
                  <p className="font-light text-[#d8d9de] leading-relaxed">
                    {s.next}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <FinalCTA />
    </div>
  );
};
