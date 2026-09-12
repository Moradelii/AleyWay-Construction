import React from 'react';

export const VisualBreak: React.FC = () => {
  return (
    <section className="relative w-full min-h-[60vh] sm:min-h-[75vh] flex items-center justify-center overflow-hidden bg-[#07080a]">
      {/* Background Architectural Texture */}
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85"
        alt="Architectural residence exterior with expansive glass and stone texture"
        className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-25 select-none"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-radial from-transparent via-[#0d0e11]/70 to-[#0d0e11]" />

      {/* Editorial Typographic Statement */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
        <span className="text-xs font-semibold tracking-[0.35em] text-[#c5a880] uppercase block mb-6">
          Architectural Purity
        </span>
        <h2 className="font-serif text-4xl sm:text-7xl md:text-8xl font-light tracking-tight text-[#f5f2eb] leading-tight">
          Built with <span className="italic text-[#c5a880] font-normal">intention.</span>
        </h2>
        <p className="mt-8 text-sm sm:text-base font-light text-[#8e9099] tracking-widest uppercase max-w-md mx-auto">
          Every joint, every lightwell, every square foot.
        </p>
      </div>
    </section>
  );
};
