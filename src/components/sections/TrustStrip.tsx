import React from 'react';

export const TrustStrip: React.FC = () => {
  const items = [
    'WICHITA',
    'VALLEY CENTER',
    'CUSTOM HOMES',
    'NEW CONSTRUCTION',
    'OPEN BOOK PRICING',
  ];

  return (
    <section
      id="trust-strip"
      className="w-full bg-[#0e0f12] border-y border-white/10 py-7 px-6 overflow-hidden"
      aria-label="Core Capabilities and Service Areas"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-8 text-[#a8a9b0]">
          {items.map((item, index) => (
            <div key={item} className="flex items-center space-x-6">
              <span className="text-xs sm:text-sm font-medium tracking-[0.24em] text-[#e5e5e0] uppercase">
                {item}
              </span>
              {index < items.length - 1 && (
                <span className="hidden md:inline-block w-1.5 h-1.5 bg-[#c5a880]/60 rounded-full" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
