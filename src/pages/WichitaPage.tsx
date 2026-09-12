import React from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { FinalCTA } from '../components/sections/FinalCTA';
import { FAQSection } from '../components/sections/FAQSection';
import { MapPin, ArrowRight, Check, Compass, Shield, Building } from 'lucide-react';

export const WichitaPage: React.FC = () => {
  return (
    <div className="pt-24 sm:pt-28">
      <SEOHead
        title="Custom Home Builder in Wichita, KS | Aley Way Construction"
        description="Aley Way Construction builds custom architectural homes in Wichita and Sedgwick County, KS with site-engineered foundations and open-book cost transparency."
        canonicalPath="/service-areas/wichita/"
        breadcrumbs={[
          { name: 'Service Areas', path: '/service-areas/' },
          { name: 'Wichita', path: '/service-areas/wichita/' },
        ]}
      />

      <section className="py-16 sm:py-24 bg-[#0d0e11] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <Breadcrumbs
            items={[
              { label: 'Service Areas', href: '/service-areas/' },
              { label: 'Wichita, KS' },
            ]}
          />

          <div className="max-w-3xl mt-6">
            <div className="flex items-center space-x-2 text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase mb-3">
              <MapPin className="w-4 h-4 text-[#c5a880]" />
              <span>Sedgwick County &bull; Kansas</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-tight text-[#f5f2eb] mb-6">
              Custom Home Builder in Wichita, Kansas.
            </h1>

            <p className="text-base sm:text-xl font-light text-[#8e9099] leading-relaxed mb-8">
              From in-fill parcels in established neighborhoods to perimeter acreage lots, we craft distinct custom residences with open-book pricing and hands-on craftsmanship.
            </p>

            <Button href="/contact/" variant="primary" size="lg" className="group">
              <span>Plan Your Wichita Build</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0a0b0d]">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-16">
          <div className="p-8 sm:p-12 bg-[#111216] border border-white/5">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#f5f2eb] mb-4">
              Building in the Wichita Metropolitan Area
            </h2>
            <p className="text-sm font-light text-[#8e9099] leading-relaxed mb-6">
              Wichita offers a diverse spectrum of building environments, from established communities in East Wichita to expanding developments on the west side near Maize, Kechi, and surrounding rural expanses. Building here requires a deep familiarity with the Wichita-Sedgwick County Metropolitan Area Building and Construction Department (MABCD) requirements, specific water table variations, and soil composition.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#d8d9de] pt-4 border-t border-white/5">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#c5a880]" />
                <span>Full MABCD permitting coordination</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#c5a880]" />
                <span>Site-specific soil testing &amp; footings</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#c5a880]" />
                <span>Storm shelter &amp; safe room integration</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#c5a880]" />
                <span>Direct coordination with Derek Blades</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection categoryFilter="custom_homes" />

      <FinalCTA />
    </div>
  );
};
