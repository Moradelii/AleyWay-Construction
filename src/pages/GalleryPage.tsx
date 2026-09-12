import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import { VideoSection } from '../components/videos/VideoSection';
import { FinalCTA } from '../components/sections/FinalCTA';
import { contentService } from '../services/contentService';

export const GalleryPage: React.FC = () => {
  const [data, setData] = useState(() => contentService.getPage('gallery'));

  useEffect(() => {
    const unsub = contentService.subscribe(() => {
      setData(contentService.getPage('gallery'));
    });
    return () => unsub();
  }, []);

  return (
    <div className="pt-24 sm:pt-28">
      <SEOHead
        title="Custom Home Gallery | Aley Way Construction"
        description="Explore 18 editorial captures of custom architectural homes, structural precision framing, gourmet kitchens, and luxury finishes across Wichita and Valley Center, KS."
        canonicalPath="/gallery/"
        breadcrumbs={[{ name: 'Gallery', path: '/gallery/' }]}
      />

      {/* Header */}
      <section className="py-16 sm:py-24 bg-[#0d0e11] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: 'Gallery' }]} />

          <div className="max-w-3xl mt-6">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-3">
              {data.heroEyebrow || 'Architectural Archive'}
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-tight text-[#f5f2eb] mb-6">
              {data.heroTitle || 'The Aley Way Gallery'}
            </h1>
            <p className="text-base sm:text-xl font-light text-[#8e9099] leading-relaxed">
              {data.heroSubtitle || 'Explore the spaces, details and craftsmanship behind the Aley Way experience. From rough structural framing to final hand-rubbed timber finishes.'}
            </p>
          </div>
        </div>
      </section>

      {/* Full Editorial Grid */}
      <section className="py-20 bg-[#0a0b0d]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <GalleryGrid isFullPage={true} />
        </div>
      </section>

      {/* Video Section directly below gallery */}
      <VideoSection />

      <FinalCTA />
    </div>
  );
};
