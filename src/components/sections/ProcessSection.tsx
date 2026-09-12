import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export const ProcessSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      num: '01',
      title: 'DISCOVER',
      subtitle: 'Vision, Land & Alignment',
      desc: 'We walk your land or review Arbor Valley homesites, clarify lifestyle goals, review family space requirements, and evaluate your realistic target investment range.',
      deliverable: 'Site evaluation & initial viability brief',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80',
    },
    {
      num: '02',
      title: 'DESIGN',
      subtitle: 'Architectural Expression',
      desc: 'Collaborative architectural sketching, elevation refinement, daylight orientation analysis, and 3D space planning tailored to your aesthetic tastes.',
      deliverable: 'Custom architectural floorplans & elevations',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
    },
    {
      num: '03',
      title: 'PLAN',
      subtitle: 'Open-Book Budgeting',
      desc: 'Complete transparency: trade subcontractor bids compiled, finish allowances specified without guesswork, and fixed builder fee established.',
      deliverable: 'Line-by-line itemized budget & firm timeline',
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1000&q=80',
    },
    {
      num: '04',
      title: 'BUILD',
      subtitle: 'Meticulous Execution',
      desc: 'Daily jobsite supervision by Derek Blades, regular digital photo walkthroughs, strict tolerance inspections, and celebration on key delivery day.',
      deliverable: 'Move-in ready custom residence with full warranty',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#0e0f12] text-[#f5f2eb] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10">
          <div>
            <span className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-3">
              The Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#f5f2eb]">
              From Idea to Home.
            </h2>
          </div>
          <div className="mt-6 md:mt-0">
            <Button href="/our-process/" variant="outline" size="sm" className="group">
              <span>See How We Build</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        {/* 4 Stages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((stage, idx) => {
            const isActive = activeStage === idx;
            return (
              <div
                key={stage.num}
                onClick={() => setActiveStage(idx)}
                className={`relative overflow-hidden p-8 border transition-all duration-300 flex flex-col justify-between cursor-pointer group ${
                  isActive
                    ? 'bg-[#15161c] border-[#c5a880]'
                    : 'bg-[#111216] border-white/5 hover:border-white/20'
                }`}
              >
                {/* Subtle stage background */}
                <div
                  className={`absolute inset-0 bg-cover bg-center transition-all duration-700 pointer-events-none ${
                    isActive ? 'opacity-20 scale-105' : 'opacity-5 group-hover:opacity-15'
                  }`}
                  style={{ backgroundImage: `url('${stage.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111216] via-[#111216]/90 to-[#111216]/70 pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl font-light text-[#c5a880]">
                      {stage.num}
                    </span>
                    {isActive && (
                      <span className="text-[10px] tracking-widest uppercase bg-[#c5a880]/20 text-[#c5a880] px-2 py-0.5 border border-[#c5a880]/40">
                        Selected Stage
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#f5f2eb] mb-1">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-[#c5a880] font-medium tracking-wide uppercase mb-4">
                    {stage.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm font-light text-[#8e9099] leading-relaxed mb-6">
                    {stage.desc}
                  </p>
                </div>

                <div className="relative z-10 pt-6 border-t border-white/5">
                  <div className="text-[11px] text-[#6e7078] uppercase tracking-wider mb-1">
                    Key Outcome
                  </div>
                  <div className="text-xs text-[#d8d9de] font-medium">
                    {stage.deliverable}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic preview image based on selected stage */}
        <div className="mt-8 border border-white/10 bg-[#121317] p-2 sm:p-4">
          <div className="relative h-64 sm:h-96 w-full overflow-hidden">
            <img
              src={stages[activeStage].image}
              alt={`Stage ${stages[activeStage].num}: ${stages[activeStage].title} - ${stages[activeStage].subtitle}`}
              className="w-full h-full object-cover grayscale contrast-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f12] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#c5a880] block mb-1">
                  Active Walkthrough
                </span>
                <p className="font-serif text-xl sm:text-2xl text-[#f5f2eb]">
                  Stage {stages[activeStage].num}: {stages[activeStage].title} — {stages[activeStage].subtitle}
                </p>
              </div>
              <Button href="/our-process/" variant="secondary" size="sm" className="mt-3 sm:mt-0">
                Detailed Timeline
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
