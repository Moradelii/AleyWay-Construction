import React from 'react';
import { Compass, Hammer, Users2, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const CustomHomesSection: React.FC = () => {
  const concepts = [
    {
      icon: Compass,
      title: 'Custom Design',
      tagline: 'Homes designed around how you live.',
      description: 'We do not ask you to conform your life to a pre-drawn cookie cutter plan. Every ceiling height, sightline, daylight angle, and storage zone is tailored to your real daily routines.',
    },
    {
      icon: Hammer,
      title: 'Thoughtful Construction',
      tagline: 'Quality construction from foundation to finish.',
      description: 'From Kansas-engineered soil preparations and 2x6 advanced framing to precision flashings and high-efficiency thermal envelopes, we obsess over what goes behind the drywall.',
    },
    {
      icon: Users2,
      title: 'Personal Guidance',
      tagline: 'Clear communication throughout the process.',
      description: 'Eliminating the confusion of traditional contracting. You collaborate directly with founders Derek and Xiochil Blades, with weekly photo updates and schedule visibility.',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#0a0b0d] border-t border-white/5 text-[#f5f2eb]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 pb-8 border-b border-white/10">
          <div>
            <span className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-3">
              Residential Craftsmanship
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#f5f2eb]">
              Designed Around Your Life.
            </h2>
          </div>
          <div className="mt-6 md:mt-0">
            <Button href="/custom-homes/" variant="outline" size="sm" className="group">
              <span>Explore Custom Homes</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {concepts.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="p-8 sm:p-10 bg-[#121317] border border-white/5 flex flex-col justify-between hover:border-[#c5a880]/30 transition-all duration-300 group"
              >
                <div>
                  <div className="w-12 h-12 flex items-center justify-center border border-white/10 bg-white/5 mb-8 text-[#c5a880] group-hover:border-[#c5a880]/40 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-serif text-2xl font-normal text-[#f5f2eb] mb-3">
                    {c.title}
                  </h3>

                  <p className="text-sm font-medium text-[#c5a880] mb-4 tracking-wide">
                    {c.tagline}
                  </p>

                  <p className="text-sm font-light text-[#8e9099] leading-relaxed">
                    {c.description}
                  </p>
                </div>

                <div className="pt-8 mt-8 border-t border-white/5 flex items-center text-xs tracking-wider uppercase text-[#a8a9b0] group-hover:text-white transition-colors">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-2 text-[#c5a880]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
