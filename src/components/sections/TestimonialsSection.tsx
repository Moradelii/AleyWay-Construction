import React from 'react';
import { Quote, ShieldAlert } from 'lucide-react';
import { testimonials } from '../../data/testimonials';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#0a0b0d] text-[#f5f2eb] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-16 pb-6 border-b border-white/10">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-3">
            Client Perspectives
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#f5f2eb]">
            What Homeowners Say.
          </h2>
          <p className="mt-4 text-xs sm:text-sm font-light text-[#8e9099] flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-[#c5a880]" />
            <span>
              Real client feedback policy: Aley Way Construction publishes verified testimonials with explicit client permission.
            </span>
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-8 sm:p-10 bg-[#121317] border border-white/5 flex flex-col justify-between hover:border-[#c5a880]/30 transition-all duration-300 relative group"
            >
              <div>
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
      </div>
    </section>
  );
};
