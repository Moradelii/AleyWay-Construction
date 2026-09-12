import React from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { CinematicHero } from '../components/hero/CinematicHero';
import { TrustStrip } from '../components/sections/TrustStrip';
import { BrandIntro } from '../components/sections/BrandIntro';
import { CustomHomesSection } from '../components/sections/CustomHomesSection';
import { OpenBookPricingSection } from '../components/sections/OpenBookPricingSection';
import { ArborValleySection } from '../components/sections/ArborValleySection';
import { ProcessSection } from '../components/sections/ProcessSection';
import { VisualBreak } from '../components/sections/VisualBreak';
import { FeaturedProjectsSection } from '../components/sections/FeaturedProjectsSection';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { FAQSection } from '../components/sections/FAQSection';
import { FinalCTA } from '../components/sections/FinalCTA';
import { Button } from '../components/ui/Button';
import { ArrowRight } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Custom Home Builder in Wichita, KS | Aley Way Construction"
        description="Aley Way Construction LLC crafts custom architectural homes in Wichita and Valley Center, KS with thoughtful design, open-book transparent pricing, and personal craftsmanship."
        canonicalPath="/"
      />

      {/* Blueprint Section 9 Hierarchy */}
      
      {/* 1. Hero */}
      <CinematicHero />

      {/* 2. Trust Strip */}
      <TrustStrip />

      {/* 3. Brand Introduction */}
      <BrandIntro />

      {/* 4. Custom Homes */}
      <CustomHomesSection />

      {/* 5. Open Book Pricing */}
      <OpenBookPricingSection />

      {/* 6. Arbor Valley */}
      <ArborValleySection />

      {/* 7. Process */}
      <ProcessSection />

      {/* 8. Visual Break */}
      <VisualBreak />

      {/* 9. Featured Projects */}
      <FeaturedProjectsSection />

      {/* 10. Gallery Preview */}
      <section className="py-24 sm:py-32 bg-[#0e0f12] text-[#f5f2eb] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10">
            <div>
              <span className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-3">
                Visual Archive
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#f5f2eb]">
                The Aley Way Gallery.
              </h2>
            </div>
            <div className="mt-6 md:mt-0">
              <Button href="/gallery/" variant="outline" size="sm" className="group">
                <span>View Full Gallery (18 Captures)</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          <GalleryGrid limit={6} />
        </div>
      </section>

      {/* 11. Testimonials */}
      <TestimonialsSection />

      {/* 12. FAQ */}
      <FAQSection limit={5} />

      {/* 13. Final CTA */}
      <FinalCTA />
    </>
  );
};
