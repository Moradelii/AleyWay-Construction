import React, { useState, useEffect } from 'react';
import { Maximize2, Filter } from 'lucide-react';
import { mediaService } from '../../services/mediaService';
import { MediaItem } from '../../types';
import { Lightbox } from '../ui/Lightbox';
import { trackEvent } from '../../utils/analytics';

interface GalleryGridProps {
  isFullPage?: boolean;
  limit?: number;
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({
  isFullPage = false,
  limit,
}) => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    setItems(mediaService.getImages());
    const unsub = mediaService.subscribe(() => {
      setItems(mediaService.getImages());
    });
    return () => unsub();
  }, []);

  const categories = [
    { label: 'All Details', value: 'all' },
    { label: 'Exteriors', value: 'exterior' },
    { label: 'Interiors', value: 'interior' },
    { label: 'Kitchen & Living', value: 'kitchen' },
    { label: 'Craftsmanship & Framing', value: 'craftsmanship' },
  ];

  const filteredItems = items.filter((item) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'kitchen') return item.category === 'kitchen' || item.category === 'living';
    if (selectedCategory === 'craftsmanship') return item.category === 'craftsmanship' || item.category === 'framing';
    return item.category === selectedCategory;
  });

  const displayItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    trackEvent('gallery_open', { imageId: displayItems[index]?.id });
  };

  const closeLightbox = () => setLightboxIndex(null);

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev !== null ? (prev + 1) % displayItems.length : 0));
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev !== null ? (prev - 1 + displayItems.length) % displayItems.length : 0));
    }
  };

  return (
    <div className="w-full">
      {/* Editorial Filter Bar (on full gallery page) */}
      {isFullPage && (
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12 pb-6 border-b border-white/10">
          <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#8e9099]">
            <Filter className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>Filter Archive:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3.5 py-1.5 text-[11px] uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
                  selectedCategory === cat.value
                    ? 'bg-[#c5a880] text-[#0e0f12] border-[#c5a880] font-medium'
                    : 'bg-white/5 text-[#a8a9b0] border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-[#6e7078] tracking-widest uppercase">
            Showing {displayItems.length} of {items.length} captures
          </div>
        </div>
      )}

      {/* Grid: 3 columns x 6 rows desktop, 2 cols tablet, 1 col mobile as per Section 22 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {displayItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => openLightbox(index)}
            className="group relative bg-[#121317] border border-white/5 overflow-hidden cursor-pointer aspect-[3/2] transition-all duration-500 hover:border-[#c5a880]/40"
          >
            {/* Image with fallback and smooth hover scaling */}
            <img
              src={item.fallbackUrl || item.url}
              alt={item.alt}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 select-none"
              onError={(e) => {
                if (item.fallbackUrl && (e.target as HTMLImageElement).src !== item.fallbackUrl) {
                  (e.target as HTMLImageElement).src = item.fallbackUrl;
                }
              }}
            />

            {/* Hover overlay with architectural metadata */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#c5a880] font-medium px-2 py-0.5 bg-black/50 border border-white/10 backdrop-blur-sm">
                  {item.category}
                </span>
                <div className="p-1.5 bg-black/60 border border-white/10 text-white hover:text-[#c5a880] transition-colors">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <p className="text-sm font-serif text-[#f5f2eb] leading-snug mb-1">
                  {item.caption}
                </p>
                {item.project && (
                  <p className="text-[10px] tracking-wider uppercase text-[#a8a9b0]">
                    {item.project}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Accessible Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && (
        <Lightbox
          items={displayItems}
          currentIndex={lightboxIndex}
          isOpen={lightboxIndex !== null}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </div>
  );
};
