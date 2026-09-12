import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { serviceAreas } from '../data/serviceAreas';
import { MapPin, ArrowRight, Check } from 'lucide-react';
import { FinalCTA } from '../components/sections/FinalCTA';

export const ServiceAreasPage: React.FC = () => {
  return (
    <div className="pt-24 sm:pt-28">
      <SEOHead
        title="Custom Homes in Wichita & Sedgwick County | Aley Way Construction"
        description="Aley Way Construction builds custom homes across Wichita, Valley Center, and Sedgwick County, KS with site-engineered foundations and open-book pricing."
        canonicalPath="/service-areas/"
        breadcrumbs={[{ name: 'Service Areas', path: '/service-areas/' }]}
      />

      <section className="py-16 sm:py-24 bg-[#0d0e11] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: 'Service Areas' }]} />

          <div className="max-w-3xl mt-6">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-3">
              Regional Geographic Focus
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-tight text-[#f5f2eb] mb-6">
              Building Homes in the Wichita Area.
            </h1>
            <p className="text-base sm:text-xl font-light text-[#8e9099] leading-relaxed">
              We focus our craftsmanship where we have intimate knowledge of local Kansas soil conditions, zoning regulations, and trusted trade partnerships.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0a0b0d]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {serviceAreas.map((area) => (
              <div
                key={area.slug}
                className="p-8 sm:p-12 bg-[#111216] border border-white/5 hover:border-[#c5a880]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-2 text-xs uppercase tracking-wider text-[#c5a880] mb-3">
                    <MapPin className="w-4 h-4 text-[#c5a880]" />
                    <span>{area.county}</span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl text-[#f5f2eb] mb-4">
                    {area.name}
                  </h2>

                  <p className="text-sm font-light text-[#8e9099] leading-relaxed mb-6">
                    {area.description}
                  </p>

                  <div className="space-y-2 mb-8 pt-4 border-t border-white/5">
                    <span className="text-[11px] uppercase tracking-wider text-[#6e7078] block mb-2">
                      Primary Service Corridors:
                    </span>
                    {area.subdivisions.map((sub, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-[#d8d9de]">
                        <Check className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
                        <span>{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Link
                    to={`/service-areas/${area.slug}/`}
                    className="inline-flex items-center text-xs tracking-widest uppercase font-medium text-[#c5a880] hover:text-white transition-colors"
                  >
                    <span>Explore {area.name} Custom Building</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
};
