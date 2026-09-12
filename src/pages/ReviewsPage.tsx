import React from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { testimonials } from '../data/testimonials';
import { Quote, ShieldAlert, Star } from 'lucide-react';
import { FinalCTA } from '../components/sections/FinalCTA';
import { Button } from '../components/ui/Button';

export const ReviewsPage: React.FC = () => {
  return (
    <div className="pt-24 sm:pt-28">
      <SEOHead
        title="Client Reviews & Testimonials | Aley Way Construction"
        description="Read verified client feedback and homeowner experiences working with Derek and Xiochil Blades at Aley Way Construction LLC in Wichita, KS."
        canonicalPath="/reviews/"
        breadcrumbs={[{ name: 'Reviews', path: '/reviews/' }]}
      />

      <section className="py-16 sm:py-24 bg-[#0d0e11] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: 'Reviews' }]} />

          <div className="max-w-3xl mt-6">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-3">
              Homeowner Perspectives
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-tight text-[#f5f2eb] mb-6">
              What Homeowners Say.
            </h1>
            <p className="text-base sm:text-xl font-light text-[#8e9099] leading-relaxed">
              We operate under an absolute integrity policy. Every testimonial published represents verified client feedback with explicit homeowner authorization.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0a0b0d]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Integrity Note */}
          <div className="p-4 bg-white/5 border border-white/10 text-xs text-[#a8a9b0] mb-12 flex items-center space-x-3 max-w-2xl">
            <ShieldAlert className="w-4 h-4 text-[#c5a880] shrink-0" />
            <span>
              Real Feedback Guarantee: We never generate fabricated testimonials, buy fake reviews, or use stock persona portraits.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="p-8 sm:p-10 bg-[#121317] border border-white/5 hover:border-[#c5a880]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-1 mb-4 text-[#c5a880]">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#c5a880]/30 mb-6" />
                  <p className="font-serif text-lg text-[#e5e5e0] italic leading-relaxed mb-6 font-light">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <div className="font-medium text-xs tracking-wider uppercase text-[#f5f2eb]">
                    {t.clientName}
                  </div>
                  <div className="text-[11px] text-[#c5a880] mt-0.5">
                    {t.projectType} &bull; {t.location}
                  </div>
                  {t.isPlaceholderNote && (
                    <div className="text-[10px] text-[#6e7078] mt-2 italic border-t border-white/5 pt-2">
                      {t.isPlaceholderNote}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button href="/contact/" variant="primary" size="md">
              Speak with Derek &amp; Xiochil Directly
            </Button>
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
};
