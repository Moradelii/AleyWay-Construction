import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { MediaItem } from '../../types';

interface LightboxProps {
  items: MediaItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}) => {
  const currentItem = items[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      }
    },
    [isOpen, onClose, onNext, onPrev]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !currentItem) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox viewer"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Top action bar */}
      <div className="absolute top-0 inset-x-0 flex items-center justify-between p-6 z-10">
        <div className="text-xs tracking-[0.2em] uppercase text-[#a8a9b0]">
          <span className="text-[#c5a880]">{currentIndex + 1}</span> / {items.length}
          {currentItem.project && (
            <span className="ml-4 pl-4 border-l border-white/20 text-[#e5e5e0]">
              {currentItem.project}
            </span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close image viewer"
          className="p-2 text-[#a8a9b0] hover:text-white transition-colors cursor-pointer rounded-none border border-transparent hover:border-white/20"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image View */}
      <div
        className="relative max-w-6xl w-full h-[80vh] mx-auto px-4 sm:px-12 flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentItem.fallbackUrl || currentItem.url}
          alt={currentItem.alt}
          className="max-h-[72vh] max-w-full object-contain select-none shadow-2xl transition-transform duration-300"
          onError={(e) => {
            // fallback if local file fails
            if (currentItem.fallbackUrl && (e.target as HTMLImageElement).src !== currentItem.fallbackUrl) {
              (e.target as HTMLImageElement).src = currentItem.fallbackUrl;
            }
          }}
        />

        {/* Caption & Metadata */}
        <div className="w-full text-center mt-4 max-w-2xl">
          <p className="text-sm font-light text-[#f5f2eb] font-editorial tracking-wide">
            {currentItem.caption}
          </p>
          <p className="text-[11px] text-[#888990] tracking-wider uppercase mt-1">
            Category: {currentItem.category} • Aley Way Portfolio Archive
          </p>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous photograph"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-[#f5f2eb]/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer border border-white/10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next photograph"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-[#f5f2eb]/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer border border-white/10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};
