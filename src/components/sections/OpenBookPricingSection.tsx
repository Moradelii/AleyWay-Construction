import React from 'react';
import { ArrowRight, CheckCircle2, Receipt, Scale, FileText } from 'lucide-react';
import { Button } from '../ui/Button';

export const OpenBookPricingSection: React.FC = () => {
  const points = [
    {
      icon: Receipt,
      title: 'Actual Subcontractor Bids',
      desc: 'You see the genuine quotes from excavators, electricians, framers, and tile artisans—not marked-up summaries.',
    },
    {
      icon: FileText,
      title: 'Real Supplier Invoices',
      desc: 'All lumber, millwork, and fixture bills are accessible. Any volume trade discounts are passed directly back to you.',
    },
    {
      icon: Scale,
      title: 'Fixed Builder Fee',
      desc: 'Our professional compensation is transparently defined upfront as an agreed fee, eliminating conflicts of interest.',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#0e0f12] text-[#f5f2eb] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Column */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative border border-white/10 p-2 sm:p-3 bg-[#131418]">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
                alt="Architectural plans and itemized construction documentation on work surface"
                className="w-full h-auto object-cover grayscale contrast-110"
                loading="lazy"
              />
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-[#0e0f12]/95 border border-white/10 backdrop-blur-md">
                <div className="flex items-center space-x-2 text-xs font-semibold tracking-[0.2em] text-[#c5a880] uppercase mb-1">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a880]" />
                  <span>100% Financial Transparency</span>
                </div>
                <p className="text-xs text-[#a8a9b0] font-light">
                  Line-by-line disbursement audit shared with you before any bank draw.
                </p>
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-3">
              Cost Transparency
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#f5f2eb] mb-6">
              Know Where Your Money Goes.
            </h2>
            <p className="text-base sm:text-lg font-light text-[#d8d9de] leading-relaxed mb-8">
              We believe homeowners deserve clarity throughout the building process. Our open-book approach helps you understand how your investment is being allocated.
            </p>

            <div className="space-y-6 mb-10">
              {points.map((pt) => {
                const Icon = pt.icon;
                return (
                  <div key={pt.title} className="flex items-start space-x-4">
                    <div className="p-2.5 bg-white/5 border border-white/10 text-[#c5a880] shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-[#f5f2eb] uppercase tracking-wider mb-1">
                        {pt.title}
                      </h3>
                      <p className="text-xs text-[#8e9099] leading-relaxed">
                        {pt.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button href="/open-book-pricing/" variant="primary" size="md" className="group">
              <span>Explore Open Book Pricing</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};
