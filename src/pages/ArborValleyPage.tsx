import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import { VideoSection } from '../components/videos/VideoSection';
import { FAQSection } from '../components/sections/FAQSection';
import { FinalCTA } from '../components/sections/FinalCTA';
import { MapPin, Check, Layers, Compass, ArrowRight, ShieldCheck, Home } from 'lucide-react';
import { projects } from '../data/projects';
import { contentService } from '../services/contentService';
import { Project } from '../types';

export const ArborValleyPage: React.FC = () => {
  const fallback = projects.find((p) => p.slug === 'arbor-valley')!;
  const [arborValley, setArborValley] = useState<Project>(() => 
    contentService.getProjectBySlug('arbor-valley') || fallback
  );

  useEffect(() => {
    const unsub = contentService.subscribe(() => {
      const updated = contentService.getProjectBySlug('arbor-valley');
      if (updated) setArborValley(updated);
    });
    return () => unsub();
  }, []);

  const foundationOptions = [
    {
      title: 'Engineered Full Basement',
      desc: 'Poured concrete foundation engineered with deep structural steel reinforcement, integrated safe room options, and daylight egress windows for expansive lower-level living space.',
    },
    {
      title: 'Daylight / Walkout Foundation',
      desc: 'Optimized for contoured lots across Arbor Valley, providing walk-out patio access directly into private backyards with full-height daylight glazing.',
    },
    {
      title: 'High-Performance Slab-on-Grade',
      desc: 'Zero-step entry living tailored for effortless accessibility, engineered with thickened edges and moisture vapor barriers designed specifically for Sedgwick County clay soils.',
    },
  ];

  const lotsOverview = [
    { label: 'Total Enclave Size', value: '20+ Custom Homesites' },
    { label: 'Average Lot Sizing', value: '~0.50 Acre Each' },
    { label: 'Outbuildings Permitted', value: 'Detached Shops / Pool Cabanas (per HOA guidelines)' },
    { label: 'Utilities', value: 'Underground Electric, Municipal Water, Natural Gas & Fiber' },
    { label: 'School District', value: 'Valley Center USD 262' },
  ];

  return (
    <div className="pt-24 sm:pt-28">
      <SEOHead
        title="New Homes in Valley Center, KS | Arbor Valley"
        description="Discover Arbor Valley by Aley Way Construction in Valley Center, KS. 20+ custom homes on half-acre lots with versatile basement and slab foundation options."
        canonicalPath="/projects/arbor-valley/"
        breadcrumbs={[
          { name: 'Projects', path: '/projects/' },
          { name: 'Arbor Valley', path: '/projects/arbor-valley/' },
        ]}
      />

      {/* Header */}
      <section className="py-16 sm:py-24 bg-[#0d0e11] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <Breadcrumbs
            items={[
              { label: 'Projects', href: '/projects/' },
              { label: 'Arbor Valley' },
            ]}
          />

          <div className="max-w-3xl mt-6">
            <div className="flex items-center space-x-2 text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase mb-3">
              <MapPin className="w-4 h-4 text-[#c5a880]" />
              <span>Valley Center, Kansas</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-tight text-[#f5f2eb] mb-3">
              Arbor Valley
            </h1>

            <h2 className="text-xl sm:text-2xl font-light text-[#c5a880] mb-6">
              New Homes in Valley Center, Kansas
            </h2>

            <p className="text-base sm:text-lg font-light text-[#8e9099] leading-relaxed mb-8">
              A serene neighborhood enclave combining half-acre countryside homesites with architectural covenants that preserve enduring beauty and investment value.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button href="/contact/" variant="primary" size="lg" className="group">
                <span>Request Lot Map &amp; Pricing</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button href="#foundations" variant="secondary" size="lg">
                Foundation Options
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview & Hero Image */}
      <section className="py-20 bg-[#0a0b0d]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
            <div className="lg:col-span-7">
              <div className="border border-white/10 overflow-hidden aspect-[16/10] bg-[#121317]">
                <img
                  src={arborValley.heroImage}
                  alt="Arbor Valley custom home elevation in Valley Center, Kansas"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-5">
              <span className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-3">
                Overview &amp; Vision
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl text-[#f5f2eb] mb-5">
                Spacious Living Just Minutes from Wichita.
              </h3>
              <p className="text-sm font-light text-[#8e9099] leading-relaxed mb-6">
                {arborValley.longDescription}
              </p>
              <ul className="space-y-3 text-xs text-[#d8d9de]">
                {arborValley.highlights.map((h, i) => (
                  <li key={i} className="flex items-start space-x-2.5">
                    <Check className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Lots Specs */}
          <div className="border-t border-white/10 pt-16 mb-20">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-3">
              Homesites &amp; Infrastructure
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#f5f2eb] mb-8">
              Community Site Specifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {lotsOverview.map((item) => (
                <div key={item.label} className="p-6 bg-[#111216] border border-white/5">
                  <span className="text-[11px] uppercase tracking-wider text-[#6e7078] block mb-1">
                    {item.label}
                  </span>
                  <span className="text-sm sm:text-base font-medium text-[#f5f2eb]">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Foundation Options */}
          <div id="foundations" className="border-t border-white/10 pt-16 mb-20">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-3">
              Structural Versatility
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl text-[#f5f2eb] mb-4">
              Multiple Foundation Options
            </h3>
            <p className="text-sm font-light text-[#8e9099] max-w-2xl mb-10">
              Unlike subdivisions restricted to cookie-cutter foundations, Arbor Valley supports site-engineered basements, daylight designs, and accessible slabs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {foundationOptions.map((f) => (
                <div key={f.title} className="p-8 bg-[#121317] border border-white/5 hover:border-[#c5a880]/30 transition-all">
                  <Layers className="w-6 h-6 text-[#c5a880] mb-4" />
                  <h4 className="font-serif text-xl text-[#f5f2eb] mb-3">
                    {f.title}
                  </h4>
                  <p className="text-xs text-[#8e9099] leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Feature */}
      <VideoSection />

      {/* Gallery Subset */}
      <section className="py-20 bg-[#0e0f12] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-12">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-2">
              Photography
            </span>
            <h3 className="font-serif text-3xl text-[#f5f2eb]">
              Arbor Valley Architectural Details
            </h3>
          </div>
          <GalleryGrid limit={6} />
        </div>
      </section>

      {/* Arbor Valley FAQ */}
      <FAQSection categoryFilter="arbor_valley" />

      {/* CTA */}
      <FinalCTA />
    </div>
  );
};
