import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { FAQSection } from '../components/sections/FAQSection';
import { FinalCTA } from '../components/sections/FinalCTA';
import { ArrowRight, Check, Sparkles, Compass, Layers, Shield, PhoneCall } from 'lucide-react';
import { contentService } from '../services/contentService';

export const CustomHomesPage: React.FC = () => {
  const [data, setData] = useState(() => contentService.getPage('customHomes'));

  useEffect(() => {
    const unsub = contentService.subscribe(() => {
      setData(contentService.getPage('customHomes'));
    });
    return () => unsub();
  }, []);

  const customSections = data.sections;

  return (
    <div className="pt-24 sm:pt-28">
      <SEOHead
        title="Custom Home Builder in Wichita, KS | Aley Way Construction"
        description="Explore bespoke custom residential construction in Wichita & Valley Center, KS. Individual architectural design, open-book cost transparency, and principal-led building."
        canonicalPath="/custom-homes/"
        breadcrumbs={[{ name: 'Custom Homes', path: '/custom-homes/' }]}
      />

      {/* Hero Header */}
      <section className="py-16 sm:py-24 bg-[#0d0e11] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: 'Custom Homes' }]} />

          <div className="max-w-3xl mt-6">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-3">
              {data.heroEyebrow || 'Residential Architecture'}
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-tight text-[#f5f2eb] mb-6">
              {data.heroTitle}
            </h1>
            <p className="text-base sm:text-xl font-light text-[#8e9099] leading-relaxed mb-8">
              {data.heroSubtitle}
            </p>
            <Button href="/contact/" variant="primary" size="lg" className="group">
              <span>Plan Your Home</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Structured Sections */}
      <section className="py-24 bg-[#0a0b0d]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-24">
          {customSections.map((sec, index) => {
            const isEven = index % 2 === 1;
            return (
              <div
                key={sec.id || sec.title}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : ''}`}>
                  <span className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-2">
                    0{index + 1} &bull; {sec.tagline}
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f5f2eb] mb-5">
                    {sec.title}
                  </h2>
                  <p className="text-sm sm:text-base font-light text-[#8e9099] leading-relaxed mb-6">
                    {sec.description}
                  </p>
                  <div className="pt-4 border-t border-white/5 flex items-center space-x-2 text-xs text-[#c5a880] font-medium tracking-wider uppercase">
                    <Check className="w-4 h-4 text-[#c5a880]" />
                    <span>Included in every Aley Way contract</span>
                  </div>
                </div>

                <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : ''}`}>
                  <div className="border border-white/10 bg-[#121317] overflow-hidden aspect-[4/3]">
                    <img
                      src={sec.image}
                      alt={sec.title}
                      className="w-full h-full object-cover grayscale contrast-105"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ specific to custom homes */}
      <FAQSection categoryFilter="custom_homes" />

      {/* CTA */}
      <FinalCTA />
    </div>
  );
};
