import React from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { FinalCTA } from '../components/sections/FinalCTA';
import { FAQSection } from '../components/sections/FAQSection';
import { MapPin, ArrowRight, Check, Trees, Home, Shield } from 'lucide-react';

export const ValleyCenterPage: React.FC = () => {
  return (
    <div className="pt-24 sm:pt-28">
      <SEOHead
        title="Custom Home Builder in Valley Center, KS | Aley Way Construction"
        description="Aley Way Construction crafts custom homes in Valley Center, KS, including our premier Arbor Valley neighborhood enclave on half-acre lots."
        canonicalPath="/service-areas/valley-center/"
        breadcrumbs={[
          { name: 'Service Areas', path: '/service-areas/' },
          { name: 'Valley Center', path: '/service-areas/valley-center/' },
        ]}
      />

      <section className="py-16 sm:py-24 bg-[#0d0e11] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <Breadcrumbs
            items={[
              { label: 'Service Areas', href: '/service-areas/' },
              { label: 'Valley Center, KS' },
            ]}
          />

          <div className="max-w-3xl mt-6">
            <div className="flex items-center space-x-2 text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase mb-3">
              <MapPin className="w-4 h-4 text-[#c5a880]" />
              <span>Valley Center &bull; Sedgwick County</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-tight text-[#f5f2eb] mb-6">
              Custom Home Builder in Valley Center, Kansas.
            </h1>

            <p className="text-base sm:text-xl font-light text-[#8e9099] leading-relaxed mb-8">
              Home to our signature Arbor Valley community, Valley Center offers top-rated schools (USD 262), quiet country skies, and spacious half-acre properties just 15 minutes north of Wichita.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button href="/projects/arbor-valley/" variant="primary" size="lg" className="group">
                <span>Explore Arbor Valley</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button href="/contact/" variant="secondary" size="lg">
                Build on Private Land
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0a0b0d]">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-16">
          <div className="p-8 sm:p-12 bg-[#111216] border border-white/5">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#f5f2eb] mb-4">
              Why Homeowners Choose Valley Center
            </h2>
            <p className="text-sm font-light text-[#8e9099] leading-relaxed mb-6">
              Valley Center balances close-knit community warmth with exceptional civic planning. Families gravitate here for the renowned Valley Center public schools (USD 262), sprawling park systems, and the ability to build on half-acre to multi-acre parcels without sacrificing convenience to Wichita job centers.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#d8d9de] pt-4 border-t border-white/5">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#c5a880]" />
                <span>Valley Center USD 262 school district</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#c5a880]" />
                <span>Arbor Valley half-acre homesites available</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#c5a880]" />
                <span>Private acreage and outbuilding friendly</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#c5a880]" />
                <span>15 minutes to downtown Wichita via I-135</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection categoryFilter="arbor_valley" />

      <FinalCTA />
    </div>
  );
};
