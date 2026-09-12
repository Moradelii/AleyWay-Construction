import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { contentService } from '../../services/contentService';

export const BrandIntro: React.FC = () => {
  const [data, setData] = useState(() => contentService.getPage('home').brandIntro);

  useEffect(() => {
    const unsub = contentService.subscribe(() => {
      setData(contentService.getPage('home').brandIntro);
    });
    return () => unsub();
  }, []);

  return (
    <section className="py-24 sm:py-32 bg-[#0e0f12] text-[#f5f2eb]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading & Architectural Statement */}
          <div className="lg:col-span-5">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-4">
              {data.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] text-[#f5f2eb]">
              {data.title}
            </h2>
            {data.quote && (
              <blockquote className="mt-6 border-l-2 border-[#c5a880] pl-4 italic text-sm text-[#c5a880]/90">
                {data.quote}
              </blockquote>
            )}
          </div>

          {/* Right Column: Narrative & Action */}
          <div className="lg:col-span-7 flex flex-col justify-center border-l border-white/10 lg:pl-16">
            <p className="text-lg sm:text-xl font-light text-[#d8d9de] leading-relaxed mb-6">
              {data.body1}
            </p>
            
            <p className="text-sm font-light text-[#8e9099] leading-relaxed mb-6 max-w-xl">
              {data.body2}
            </p>

            {data.foundersNote && (
              <p className="text-xs font-mono uppercase tracking-wider text-[#c5a880] mb-8">
                {data.foundersNote}
              </p>
            )}

            <div>
              <Button href="/about/" variant="secondary" size="md" className="group">
                <span>Meet Aley Way</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
