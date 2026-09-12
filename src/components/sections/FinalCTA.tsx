import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '../ui/Button';
import { siteConfig } from '../../data/site';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#090a0c] text-[#f5f2eb] border-t border-white/10 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center relative z-10">
        <span className="text-xs font-semibold tracking-[0.3em] text-[#c5a880] uppercase block mb-4">
          Begin Your Build
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#f5f2eb] mb-6">
          Ready to Build a Home That&rsquo;s <span className="italic text-[#c5a880]">Truly Yours?</span>
        </h2>

        <p className="text-base sm:text-lg font-light text-[#8e9099] max-w-2xl mx-auto mb-10 leading-relaxed">
          Whether you own acreage in Sedgwick County, desire a half-acre homesite in Arbor Valley, or are exploring design feasibility, Derek and Xiochil Blades are ready to consult.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Button href="/contact/" variant="primary" size="lg" className="w-full sm:w-auto group">
            <span>{siteConfig.primaryCta}</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>

          <Button
            href={`tel:${siteConfig.phone.replace(/[^0-9]/g, '')}`}
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto flex items-center justify-center space-x-2"
          >
            <Phone className="w-4 h-4 text-[#c5a880]" />
            <span>Call {siteConfig.phone}</span>
          </Button>
        </div>

        <p className="mt-8 text-xs text-[#6e7078] tracking-widest uppercase">
          Wichita &bull; Valley Center &bull; Sedgwick County &bull; Open Book Pricing
        </p>
      </div>
    </section>
  );
};
