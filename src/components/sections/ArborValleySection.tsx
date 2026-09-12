import React from 'react';
import { ArrowRight, MapPin, Check, Layers } from 'lucide-react';
import { Button } from '../ui/Button';

export const ArborValleySection: React.FC = () => {
  const verifiedStats = [
    { label: 'Community Size', value: '20+ Custom Homes' },
    { label: 'Homesite Acreage', value: '~0.50 Acre Lots' },
    { label: 'Foundations', value: 'Basement, Daylight & Slab' },
    { label: 'Location', value: 'Valley Center, KS (USD 262)' },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#0a0b0d] text-[#f5f2eb] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Col */}
          <div className="lg:col-span-6">
            <div className="flex items-center space-x-2 text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase mb-4">
              <MapPin className="w-4 h-4 text-[#c5a880]" />
              <span>Valley Center, Kansas</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#f5f2eb] mb-6">
              Arbor Valley
            </h2>

            <p className="text-base sm:text-lg font-light text-[#d8d9de] leading-relaxed mb-6">
              Aley Way Construction&rsquo;s signature custom community in Valley Center, designed for homeowners who desire spacious country living paired with modern neighborhood refinement.
            </p>

            <p className="text-sm font-light text-[#8e9099] leading-relaxed mb-8">
              Offering generous half-acre lots with ample room for outbuildings or private pool sanctuaries, Arbor Valley provides flexible architectural freedom backed by site-engineered foundation designs.
            </p>

            {/* Verified Data Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-10 border-y border-white/10 py-6">
              {verifiedStats.map((stat) => (
                <div key={stat.label}>
                  <span className="text-[11px] font-sans tracking-widest text-[#7e8088] uppercase block mb-1">
                    {stat.label}
                  </span>
                  <span className="text-base sm:text-lg font-medium text-[#f5f2eb]">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            <Button href="/projects/arbor-valley/" variant="primary" size="md" className="group">
              <span>Explore Arbor Valley</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Right Image Col */}
          <div className="lg:col-span-6">
            <div className="relative border border-white/10 bg-[#121317]">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                alt="Arbor Valley custom home elevation in Valley Center, Kansas"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="p-6 bg-[#0e0f12] border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-3 text-xs text-[#a8a9b0]">
                  <Layers className="w-4 h-4 text-[#c5a880]" />
                  <span>Now Securing Homesites for Upcoming Build Cycles</span>
                </div>
                <span className="text-[11px] uppercase tracking-wider text-[#c5a880] font-medium">
                  Phase I
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
